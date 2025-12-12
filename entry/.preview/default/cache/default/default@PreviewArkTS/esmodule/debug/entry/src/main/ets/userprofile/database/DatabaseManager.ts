import relationalStore from "@ohos:data.relationalStore";
import type { BusinessError as BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import { UserInfo } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import { UserAccount } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserAccount";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
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
    private constructor() { }
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
        }
        catch (err) {
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
        await this.rdbStore.executeSql(userAccountTable);
        await this.rdbStore.executeSql(userInfoTable);
        Logger.info(TAG, '数据表创建成功');
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
                password: password,
                createTime: Date.now(),
                isLoggedIn: 0
            };
            const insertId = await this.rdbStore.insert('user_account', valueBucket);
            Logger.info(TAG, `用户注册成功，ID: ${insertId}`);
            return insertId;
        }
        catch (err) {
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
        }
        catch (err) {
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
        }
        catch (err) {
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
        }
        catch (err) {
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
            }
            else {
                // 插入
                await this.rdbStore.insert('user_info', valueBucket);
                Logger.info(TAG, `用户信息保存成功: ${userId}`);
            }
        }
        catch (err) {
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
        }
        catch (err) {
            const error = err as BusinessError;
            Logger.error(TAG, `获取用户信息失败: ${error.message}`);
            return null;
        }
    }
}
