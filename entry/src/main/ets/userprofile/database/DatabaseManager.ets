/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { relationalStore } from '@kit.ArkData';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
import { UserInfo } from '../model/UserInfo';
import { UserAccount } from '../model/UserAccount';
import { Order } from '../model/Order';
import { Favorite } from '../model/Favorite';
import { MemberInfo } from '../model/MemberInfo';
import Logger from '../../common/utils/Logger';
import { ProductSeed } from '../../viewmodel/ProductSeeds';

export interface ProductRow {
  name: string;
  price: string;
  discount: string;
  promotion: string;
  bonus_points: string;
  category: number;
  imageKey: string;
}

const TAG = 'DatabaseManager';
const STORE_CONFIG: relationalStore.StoreConfig = {
  name: 'WaterFlowDB.db',
  securityLevel: relationalStore.SecurityLevel.S1
};

/**
 * 数据库管理类
 */
export class DatabaseManager {
  private static instance: DatabaseManager | null = null;
  private rdbStore: relationalStore.RdbStore | null = null;
  private context: common.UIAbilityContext | null = null;

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * 初始化数据库
   */
  async initDatabase(context: common.UIAbilityContext): Promise<void> {
    this.context = context;
    try {
      const rdbStore = await relationalStore.getRdbStore(context, STORE_CONFIG);
      this.rdbStore = rdbStore;
      await this.createTables();
      Logger.info(TAG, '数据库初始化成功');
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `数据库初始化失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 创建数据表
   */
  private async createTables(): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    // 商品表
    const productTable = `
      CREATE TABLE IF NOT EXISTS products (
        productId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        discount TEXT,
        promotion TEXT,
        bonus_points TEXT,
        category INTEGER NOT NULL,
        imageKey TEXT NOT NULL
      )
    `;

    // 创建用户账户表
    const userAccountTable = `
      CREATE TABLE IF NOT EXISTS user_account (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createTime INTEGER NOT NULL,
        isLoggedIn INTEGER DEFAULT 0
      )
    `;

    // 创建用户信息表
    const userInfoTable = `
      CREATE TABLE IF NOT EXISTS user_info (
        userId INTEGER PRIMARY KEY,
        userName TEXT,
        avatar TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        gender TEXT,
        birthday TEXT,
        signature TEXT,
        FOREIGN KEY (userId) REFERENCES user_account(userId) ON DELETE CASCADE
      )
    `;

    // 创建订单表
    const orderTable = `
      CREATE TABLE IF NOT EXISTS orders (
        orderId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        productName TEXT NOT NULL,
        price TEXT NOT NULL,
        status TEXT NOT NULL,
        orderDate TEXT NOT NULL,
        createTime INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user_account(userId) ON DELETE CASCADE
      )
    `;

    // 创建收藏表
    const favoriteTable = `
      CREATE TABLE IF NOT EXISTS favorites (
        favoriteId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        productName TEXT NOT NULL,
        productImage TEXT,
        price TEXT,
        createTime INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user_account(userId) ON DELETE CASCADE
      )
    `;

    // 创建会员信息表
    const memberInfoTable = `
      CREATE TABLE IF NOT EXISTS member_info (
        userId INTEGER PRIMARY KEY,
        level INTEGER DEFAULT 1,
        levelName TEXT DEFAULT '普通会员',
        points INTEGER DEFAULT 0,
        monthlySaved REAL DEFAULT 0,
        updateTime INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user_account(userId) ON DELETE CASCADE
      )
    `;

    await this.rdbStore.executeSql(productTable);
    await this.rdbStore.executeSql(userAccountTable);
    await this.rdbStore.executeSql(userInfoTable);
    await this.rdbStore.executeSql(orderTable);
    await this.rdbStore.executeSql(favoriteTable);
    await this.rdbStore.executeSql(memberInfoTable);
    Logger.info(TAG, '数据表创建成功');
  }

  /**
   * 商品行模型
   */
  public static readonly ProductRowKeys = ['name', 'price', 'discount', 'promotion', 'bonus_points', 'category', 'imageKey'];

  /**
   * 商品行类型
   */
  public static createProductRow(): ProductRow {
    return {
      name: '',
      price: '',
      discount: '',
      promotion: '',
      bonus_points: '',
      category: 0,
      imageKey: ''
    };
  }

  /**
   * 初始化商品数据（仅在表为空时插入种子数据）
   */
  async initProducts(seedData: ProductSeed[]): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    // 每次启动都刷新种子商品，避免旧版本数据导致搜索/分类缺少新商品
    await this.rdbStore.executeSql('DELETE FROM products');

    for (const item of seedData) {
      const valueBucket: relationalStore.ValuesBucket = {
        name: item.name,
        price: item.price,
        discount: item.discount,
        promotion: item.promotion,
        bonus_points: item.bonus_points,
        category: item.category,
        imageKey: item.imageKey
      };
      await this.rdbStore.insert('products', valueBucket);
    }
    Logger.info(TAG, `商品种子数据初始化完成，共插入 ${seedData.length} 条`);
  }

  /**
   * 获取商品列表，可按分类/关键词过滤
   */
  async getProducts(category?: number, keyword?: string): Promise<ProductRow[]> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    const predicates = new relationalStore.RdbPredicates('products');
    if (category !== undefined && category !== 0) {
      predicates.equalTo('category', category);
    }
    if (keyword && keyword.trim().length > 0) {
      predicates.like('name', `%${keyword.trim()}%`);
    }

    const result = await this.rdbStore.query(predicates);
    const products: ProductRow[] = [];

    while (result.goToNextRow()) {
      const row: ProductRow = DatabaseManager.createProductRow();
      row.name = result.getString(result.getColumnIndex('name')) || '';
      row.price = result.getString(result.getColumnIndex('price')) || '';
      row.discount = result.getString(result.getColumnIndex('discount')) || '';
      row.promotion = result.getString(result.getColumnIndex('promotion')) || '';
      row.bonus_points = result.getString(result.getColumnIndex('bonus_points')) || '';
      row.category = result.getLong(result.getColumnIndex('category'));
      row.imageKey = result.getString(result.getColumnIndex('imageKey')) || '';
      products.push(row);
    }
    return products;
  }

  /**
   * 注册用户
   */
  async registerUser(username: string, password: string): Promise<number> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      // 检查用户名是否已存在
      const predicates = new relationalStore.RdbPredicates('user_account');
      predicates.equalTo('username', username);
      const result = await this.rdbStore.query(predicates, ['userId']);
      if (result.rowCount > 0) {
        throw new Error('用户名已存在');
      }

      // 插入新用户
      const valueBucket: relationalStore.ValuesBucket = {
        username: username,
        password: password, // 实际应用中应该加密
        createTime: Date.now(),
        isLoggedIn: 0
      };

      const insertId = await this.rdbStore.insert('user_account', valueBucket);
      Logger.info(TAG, `用户注册成功，ID: ${insertId}`);
      return insertId;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `用户注册失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 用户登录
   */
  async loginUser(username: string, password: string): Promise<UserAccount | null> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('user_account');
      predicates.equalTo('username', username);
      predicates.equalTo('password', password);

      const result = await this.rdbStore.query(predicates);
      if (result.rowCount === 0) {
        return null;
      }

      // 更新登录状态
      await result.goToFirstRow();
      const userId = result.getLong(result.getColumnIndex('userId'));
      
      // 将所有用户设为未登录
      const updatePredicates = new relationalStore.RdbPredicates('user_account');
      const updateValues: relationalStore.ValuesBucket = { isLoggedIn: 0 };
      await this.rdbStore.update(updateValues, updatePredicates);

      // 设置当前用户为已登录
      const loginPredicates = new relationalStore.RdbPredicates('user_account');
      loginPredicates.equalTo('userId', userId);
      const loginValues: relationalStore.ValuesBucket = { isLoggedIn: 1 };
      await this.rdbStore.update(loginValues, loginPredicates);

      const userAccount = new UserAccount();
      userAccount.userId = userId;
      userAccount.username = result.getString(result.getColumnIndex('username'));
      userAccount.password = result.getString(result.getColumnIndex('password'));
      userAccount.createTime = result.getLong(result.getColumnIndex('createTime'));
      userAccount.isLoggedIn = true;

      Logger.info(TAG, `用户登录成功: ${username}`);
      return userAccount;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `用户登录失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 获取当前登录用户
   */
  async getCurrentUser(): Promise<UserAccount | null> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('user_account');
      predicates.equalTo('isLoggedIn', 1);
      const result = await this.rdbStore.query(predicates);
      
      if (result.rowCount === 0) {
        return null;
      }

      await result.goToFirstRow();
      const userAccount = new UserAccount();
      userAccount.userId = result.getLong(result.getColumnIndex('userId'));
      userAccount.username = result.getString(result.getColumnIndex('username'));
      userAccount.password = result.getString(result.getColumnIndex('password'));
      userAccount.createTime = result.getLong(result.getColumnIndex('createTime'));
      userAccount.isLoggedIn = true;

      return userAccount;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取当前用户失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 退出登录
   */
  async logoutUser(): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('user_account');
      const values: relationalStore.ValuesBucket = { isLoggedIn: 0 };
      await this.rdbStore.update(values, predicates);
      Logger.info(TAG, '用户退出登录成功');
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `退出登录失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 保存用户信息
   */
  async saveUserInfo(userId: number, userInfo: UserInfo): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      // 检查用户信息是否存在
      const checkPredicates = new relationalStore.RdbPredicates('user_info');
      checkPredicates.equalTo('userId', userId);
      const checkResult = await this.rdbStore.query(checkPredicates);

      const valueBucket: relationalStore.ValuesBucket = {
        userId: userId,
        userName: userInfo.userName,
        avatar: userInfo.avatar,
        phone: userInfo.phone,
        email: userInfo.email,
        address: userInfo.address,
        gender: userInfo.gender,
        birthday: userInfo.birthday,
        signature: userInfo.signature
      };

      if (checkResult.rowCount > 0) {
        // 更新
        const updatePredicates = new relationalStore.RdbPredicates('user_info');
        updatePredicates.equalTo('userId', userId);
        await this.rdbStore.update(valueBucket, updatePredicates);
        Logger.info(TAG, `用户信息更新成功: ${userId}`);
      } else {
        // 插入
        await this.rdbStore.insert('user_info', valueBucket);
        Logger.info(TAG, `用户信息保存成功: ${userId}`);
      }
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `保存用户信息失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(userId: number): Promise<UserInfo | null> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('user_info');
      predicates.equalTo('userId', userId);
      const result = await this.rdbStore.query(predicates);

      if (result.rowCount === 0) {
        return null;
      }

      await result.goToFirstRow();
      const userInfo = new UserInfo();
      userInfo.userId = result.getLong(result.getColumnIndex('userId'));
      userInfo.userName = result.getString(result.getColumnIndex('userName')) || '';
      userInfo.avatar = result.getString(result.getColumnIndex('avatar')) || '';
      userInfo.phone = result.getString(result.getColumnIndex('phone')) || '';
      userInfo.email = result.getString(result.getColumnIndex('email')) || '';
      userInfo.address = result.getString(result.getColumnIndex('address')) || '';
      userInfo.gender = result.getString(result.getColumnIndex('gender')) || '';
      userInfo.birthday = result.getString(result.getColumnIndex('birthday')) || '';
      userInfo.signature = result.getString(result.getColumnIndex('signature')) || '';

      return userInfo;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取用户信息失败: ${error.message}`);
      return null;
    }
  }

  /**
   * 保存订单
   */
  async saveOrder(userId: number, order: Order): Promise<number> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const valueBucket: relationalStore.ValuesBucket = {
        userId: userId,
        productName: order.productName,
        price: order.price,
        status: order.status,
        orderDate: order.orderDate,
        createTime: order.createTime || Date.now()
      };

      const insertId = await this.rdbStore.insert('orders', valueBucket);
      Logger.info(TAG, `订单保存成功: ${insertId}`);
      return insertId;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `保存订单失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 获取用户的订单列表
   */
  async getOrders(userId: number, limit: number = 10): Promise<Order[]> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('orders');
      predicates.equalTo('userId', userId);
      predicates.orderByDesc('createTime');
      const result = await this.rdbStore.query(predicates);

      const orders: Order[] = [];
      if (result.rowCount > 0) {
        let count = 0;
        while (result.goToNextRow() && count < limit) {
          const order = new Order();
          order.orderId = result.getLong(result.getColumnIndex('orderId'));
          order.userId = result.getLong(result.getColumnIndex('userId'));
          order.productName = result.getString(result.getColumnIndex('productName'));
          order.price = result.getString(result.getColumnIndex('price'));
          order.status = result.getString(result.getColumnIndex('status'));
          order.orderDate = result.getString(result.getColumnIndex('orderDate'));
          order.createTime = result.getLong(result.getColumnIndex('createTime'));
          orders.push(order);
          count++;
        }
      }
      return orders;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取订单列表失败: ${error.message}`);
      return [];
    }
  }

  /**
   * 获取用户订单数量
   */
  async getOrderCount(userId: number): Promise<number> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('orders');
      predicates.equalTo('userId', userId);
      const result = await this.rdbStore.query(predicates);
      return result.rowCount;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取订单数量失败: ${error.message}`);
      return 0;
    }
  }

  /**
   * 保存收藏
   */
  async saveFavorite(userId: number, favorite: Favorite): Promise<number> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      // 检查是否已收藏
      const checkPredicates = new relationalStore.RdbPredicates('favorites');
      checkPredicates.equalTo('userId', userId);
      checkPredicates.equalTo('productName', favorite.productName);
      const checkResult = await this.rdbStore.query(checkPredicates);
      
      if (checkResult.rowCount > 0) {
        // 已收藏，返回现有ID
        await checkResult.goToFirstRow();
        return checkResult.getLong(checkResult.getColumnIndex('favoriteId'));
      }

      const valueBucket: relationalStore.ValuesBucket = {
        userId: userId,
        productName: favorite.productName,
        productImage: favorite.productImage || '',
        price: favorite.price || '',
        createTime: favorite.createTime || Date.now()
      };

      const insertId = await this.rdbStore.insert('favorites', valueBucket);
      Logger.info(TAG, `收藏保存成功: ${insertId}`);
      return insertId;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `保存收藏失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 获取用户的收藏列表
   */
  async getFavorites(userId: number, limit: number = 10): Promise<Favorite[]> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('favorites');
      predicates.equalTo('userId', userId);
      predicates.orderByDesc('createTime');
      const result = await this.rdbStore.query(predicates);

      const favorites: Favorite[] = [];
      if (result.rowCount > 0) {
        let count = 0;
        while (result.goToNextRow() && count < limit) {
          const favorite = new Favorite();
          favorite.favoriteId = result.getLong(result.getColumnIndex('favoriteId'));
          favorite.userId = result.getLong(result.getColumnIndex('userId'));
          favorite.productName = result.getString(result.getColumnIndex('productName'));
          favorite.productImage = result.getString(result.getColumnIndex('productImage')) || '';
          favorite.price = result.getString(result.getColumnIndex('price')) || '';
          favorite.createTime = result.getLong(result.getColumnIndex('createTime'));
          favorites.push(favorite);
          count++;
        }
      }
      return favorites;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取收藏列表失败: ${error.message}`);
      return [];
    }
  }

  /**
   * Get favorite count by user.
   */
  async getFavoriteCount(userId: number): Promise<number> {
    if (!this.rdbStore) {
      throw new Error('Database not initialized');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('favorites');
      predicates.equalTo('userId', userId);
      const result = await this.rdbStore.query(predicates);
      return result.rowCount;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `getFavoriteCount failed: ${error.message}`);
      return 0;
    }
  }

  /**
   * Find favorite by product name for the current user.
   */
  async getFavoriteByName(userId: number, productName: string): Promise<Favorite | null> {
    if (!this.rdbStore) {
      throw new Error('Database not initialized');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('favorites');
      predicates.equalTo('userId', userId);
      predicates.equalTo('productName', productName);
      const result = await this.rdbStore.query(predicates);

      if (result.rowCount === 0) {
        return null;
      }

      await result.goToFirstRow();
      const favorite = new Favorite();
      favorite.favoriteId = result.getLong(result.getColumnIndex('favoriteId'));
      favorite.userId = result.getLong(result.getColumnIndex('userId'));
      favorite.productName = result.getString(result.getColumnIndex('productName'));
      favorite.productImage = result.getString(result.getColumnIndex('productImage')) || '';
      favorite.price = result.getString(result.getColumnIndex('price')) || '';
      favorite.createTime = result.getLong(result.getColumnIndex('createTime'));
      return favorite;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `getFavoriteByName failed: ${error.message}`);
      return null;
    }
  }


  /**
   * 删除收藏
   */
  async deleteFavorite(userId: number, favoriteId: number): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('favorites');
      predicates.equalTo('userId', userId);
      predicates.equalTo('favoriteId', favoriteId);
      await this.rdbStore.delete(predicates);
      Logger.info(TAG, `收藏删除成功: ${favoriteId}`);
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `删除收藏失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 保存或更新会员信息
   */
  async saveMemberInfo(userId: number, memberInfo: MemberInfo): Promise<void> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const checkPredicates = new relationalStore.RdbPredicates('member_info');
      checkPredicates.equalTo('userId', userId);
      const checkResult = await this.rdbStore.query(checkPredicates);

      const valueBucket: relationalStore.ValuesBucket = {
        userId: userId,
        level: memberInfo.level,
        levelName: memberInfo.levelName,
        points: memberInfo.points,
        monthlySaved: memberInfo.monthlySaved,
        updateTime: memberInfo.updateTime || Date.now()
      };

      if (checkResult.rowCount > 0) {
        // 更新
        const updatePredicates = new relationalStore.RdbPredicates('member_info');
        updatePredicates.equalTo('userId', userId);
        await this.rdbStore.update(valueBucket, updatePredicates);
        Logger.info(TAG, `会员信息更新成功: ${userId}`);
      } else {
        // 插入
        await this.rdbStore.insert('member_info', valueBucket);
        Logger.info(TAG, `会员信息保存成功: ${userId}`);
      }
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `保存会员信息失败: ${error.message}`);
      throw new Error(error.message);
    }
  }

  /**
   * 获取会员信息
   */
  async getMemberInfo(userId: number): Promise<MemberInfo | null> {
    if (!this.rdbStore) {
      throw new Error('数据库未初始化');
    }

    try {
      const predicates = new relationalStore.RdbPredicates('member_info');
      predicates.equalTo('userId', userId);
      const result = await this.rdbStore.query(predicates);

      if (result.rowCount === 0) {
        return null;
      }

      await result.goToFirstRow();
      const memberInfo = new MemberInfo();
      memberInfo.userId = result.getLong(result.getColumnIndex('userId'));
      memberInfo.level = result.getLong(result.getColumnIndex('level'));
      memberInfo.levelName = result.getString(result.getColumnIndex('levelName')) || '普通会员';
      memberInfo.points = result.getLong(result.getColumnIndex('points'));
      memberInfo.monthlySaved = result.getDouble(result.getColumnIndex('monthlySaved'));
      memberInfo.updateTime = result.getLong(result.getColumnIndex('updateTime'));

      return memberInfo;
    } catch (err) {
      const error = err as BusinessError;
      Logger.error(TAG, `获取会员信息失败: ${error.message}`);
      return null;
    }
  }
}
