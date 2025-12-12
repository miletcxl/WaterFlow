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

import { UserInfo, ProfileMenuItem } from '../model/UserInfo';
import { DatabaseManager } from '../database/DatabaseManager';
import { MemberInfo } from '../model/MemberInfo';
import { router } from '@kit.ArkUI';
import promptAction from '@ohos.promptAction';
import Logger from '../../common/utils/Logger';

const TAG = 'ProfileViewModel';

export class QuickEntryModel {
  title: ResourceStr = '';
  actionType: string = '';
}

export class RecentOrderModel {
  name: string = '';
  price: string = '';
  status: ResourceStr = '';
  date: string = '';
}

/**
 * Profile view model for managing user profile data.
 */
export class ProfileViewModel {
  /**
   * Current user information.
   */
  userInfo: UserInfo = new UserInfo();

  /**
   * Profile menu items list.
   */
  menuItems: ProfileMenuItem[] = [];

  /**
   * Quick entry list.
   */
  quickEntries: QuickEntryModel[] = [];

  /**
   * Recent order/collect preview list.
   */
  recentOrders: RecentOrderModel[] = [];

  /**
   * 订单数量
   */
  orderCount: number = 0;

  /**
   * 收藏数量
   */
  favoriteCount: number = 0;

  /**
   * 积分
   */
  points: number = 0;

  /**
   * 会员等级信息
   */
  memberLevel: string = '普通会员';
  memberLevelNum: number = 1;
  monthlySaved: number = 0;

  /**
   * Database manager instance.
   */
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  /**
   * Initialize user information from database.
   */
  async initUserInfo(): Promise<void> {
    try {
      const currentUser = await this.dbManager.getCurrentUser();
      if (currentUser) {
        const userInfo = await this.dbManager.getUserInfo(currentUser.userId);
        if (userInfo) {
          this.userInfo = userInfo;
          this.userInfo.userId = currentUser.userId;
        } else {
          // 如果没有用户信息，使用默认值
          this.userInfo.userId = currentUser.userId;
          this.userInfo.userName = currentUser.username;
          this.userInfo.avatar = '';
          this.userInfo.phone = '';
          this.userInfo.email = '';
          this.userInfo.address = '';
          this.userInfo.gender = '';
          this.userInfo.birthday = '';
          this.userInfo.signature = '这个人很懒，什么都没有留下';
          // 保存默认信息到数据库
          await this.dbManager.saveUserInfo(currentUser.userId, this.userInfo);
        }
        
        // 加载统计数据
        await this.loadStatistics(currentUser.userId);
      } else {
        // 未登录，使用默认值
        this.userInfo.userName = '未登录';
        this.userInfo.avatar = '';
        this.userInfo.phone = '';
        this.userInfo.email = '';
        this.userInfo.address = '';
        this.userInfo.gender = '';
        this.userInfo.birthday = '';
        this.userInfo.signature = '';
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `初始化用户信息失败: ${error.message}`);
      // 使用默认值
      this.userInfo.userName = '未登录';
    }
  }

  /**
   * Save user information to database.
   */
  async saveUserInfo(): Promise<void> {
    try {
      if (this.userInfo.userId > 0) {
        await this.dbManager.saveUserInfo(this.userInfo.userId, this.userInfo);
        promptAction.showToast({ message: '保存成功', duration: 2000 });
      } else {
        Logger.warn(TAG, '用户未登录，无法保存信息');
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `保存用户信息失败: ${error.message}`);
      promptAction.showToast({ message: `保存失败: ${error.message}`, duration: 2000 });
    }
  }

  /**
   * Initialize menu items.
   */
  initMenuItems(): void {
    this.menuItems = [
      {
        title: $r('app.string.profile_stat_orders'),
        icon: $r('app.media.ic_more'),
        actionType: 'order',
        showArrow: true
      },
      {
        title: $r('app.string.profile_stat_favorites'),
        icon: $r('app.media.ic_more'),
        actionType: 'favorite',
        showArrow: true
      },
      {
        title: '收货地址',
        icon: $r('app.media.ic_more'),
        actionType: 'address',
        showArrow: true
      },
      {
        title: '设置',
        icon: $r('app.media.ic_more'),
        actionType: 'settings',
        showArrow: true
      }
    ];
  }

  /**
   * Initialize quick entries.
   */
  initQuickEntries(): void {
    this.quickEntries = [
      this.createQuickEntry($r('app.string.profile_quick_orders'), 'order'),
      this.createQuickEntry($r('app.string.profile_quick_coupons'), 'coupon'),
      this.createQuickEntry($r('app.string.profile_quick_address'), 'address'),
      this.createQuickEntry($r('app.string.profile_quick_service'), 'service')
    ];
  }

  /**
   * Initialize recent orders/collections preview.
   */
  async initRecentOrders(): Promise<void> {
    try {
      const currentUser = await this.dbManager.getCurrentUser();
      if (currentUser) {
        const orders = await this.dbManager.getOrders(currentUser.userId, 3);
        this.recentOrders = orders.map(order => {
          return this.createRecentOrder(
            order.productName,
            order.price,
            this.getStatusResource(order.status),
            this.formatDate(order.orderDate)
          );
        });
        
        // 如果没有订单，使用默认数据
        if (this.recentOrders.length === 0) {
          this.recentOrders = [
            this.createRecentOrder('小米无线鼠标', '￥79', $r('app.string.profile_order_pending'), '08-21'),
            this.createRecentOrder('台灯阅读灯', '￥129', $r('app.string.profile_order_shipping'), '08-19'),
            this.createRecentOrder('咖啡豆 500g', '￥89', $r('app.string.profile_order_finished'), '08-16')
          ];
        }
      } else {
        // 未登录，使用默认数据
        this.recentOrders = [
          this.createRecentOrder('小米无线鼠标', '￥79', $r('app.string.profile_order_pending'), '08-21'),
          this.createRecentOrder('台灯阅读灯', '￥129', $r('app.string.profile_order_shipping'), '08-19'),
          this.createRecentOrder('咖啡豆 500g', '￥89', $r('app.string.profile_order_finished'), '08-16')
        ];
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `初始化订单列表失败: ${error.message}`);
      // 使用默认数据
      this.recentOrders = [
        this.createRecentOrder('小米无线鼠标', '￥79', $r('app.string.profile_order_pending'), '08-21'),
        this.createRecentOrder('台灯阅读灯', '￥129', $r('app.string.profile_order_shipping'), '08-19'),
        this.createRecentOrder('咖啡豆 500g', '￥89', $r('app.string.profile_order_finished'), '08-16')
      ];
    }
  }

  /**
   * 加载统计数据（订单数、收藏数、积分等）
   */
  private async loadStatistics(userId: number): Promise<void> {
    try {
      // 获取订单数量
      this.orderCount = await this.dbManager.getOrderCount(userId);
      
      // 获取收藏数量
      this.favoriteCount = await this.dbManager.getFavoriteCount(userId);
      
      // 获取会员信息
      const memberInfo = await this.dbManager.getMemberInfo(userId);
      if (memberInfo) {
        this.points = memberInfo.points;
        this.memberLevel = memberInfo.levelName;
        this.memberLevelNum = memberInfo.level;
        this.monthlySaved = memberInfo.monthlySaved;
      } else {
        // 如果没有会员信息，创建默认会员信息
        const defaultMemberInfo = new MemberInfo();
        defaultMemberInfo.userId = userId;
        defaultMemberInfo.level = 1;
        defaultMemberInfo.levelName = '普通会员';
        defaultMemberInfo.points = 0;
        defaultMemberInfo.monthlySaved = 0;
        await this.dbManager.saveMemberInfo(userId, defaultMemberInfo);
        this.points = 0;
        this.memberLevel = '普通会员';
        this.memberLevelNum = 1;
        this.monthlySaved = 0;
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `加载统计数据失败: ${error.message}`);
    }
  }

  /**
   * 将订单状态转换为资源字符串
   */
  private getStatusResource(status: string): ResourceStr {
    if (status.includes('进行中') || status.includes('pending')) {
      return $r('app.string.profile_order_pending');
    } else if (status.includes('发货') || status.includes('shipping')) {
      return $r('app.string.profile_order_shipping');
    } else if (status.includes('完成') || status.includes('finished')) {
      return $r('app.string.profile_order_finished');
    }
    return $r('app.string.profile_order_pending');
  }

  /**
   * 格式化日期
   */
  private formatDate(dateStr: string): string {
    // 如果日期格式是 YYYY-MM-DD，转换为 MM-DD
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length >= 2) {
        return `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
      }
    }
    return dateStr;
  }

  /**
   * Handle menu item click.
   */
  onMenuItemClick(actionType: string): void {
    let message: string = '';
    switch (actionType) {
      case 'order':
        message = '打开订单页面（占位）';
        break;
      case 'favorite':
        message = '打开收藏页面（占位）';
        break;
      case 'address':
        message = '打开收货地址页面（占位）';
        break;
      case 'settings':
        message = '打开设置页面（占位）';
        break;
      case 'account':
        message = '打开账号与安全页面（占位）';
        break;
      case 'notify':
        message = '打开通知设置页面（占位）';
        break;
      case 'logout':
        this.handleLogout();
        return;
      case 'coupon':
        message = '打开优惠券页面（占位）';
        break;
      case 'service':
        // 导航由页面处理，这里仅提示
        message = '正在为您连接 AI 客服…';
        break;
      default:
        message = `点击：${actionType}`;
    }
    promptAction.showToast({ message: message });
  }

  private createQuickEntry(title: ResourceStr, actionType: string): QuickEntryModel {
    let entry = new QuickEntryModel();
    entry.title = title;
    entry.actionType = actionType;
    return entry;
  }

  private createRecentOrder(name: string, price: string, status: ResourceStr, date: string): RecentOrderModel {
    let order = new RecentOrderModel();
    order.name = name;
    order.price = price;
    order.status = status;
    order.date = date;
    return order;
  }

  /**
   * Handle logout.
   */
  private async handleLogout(): Promise<void> {
    try {
      await this.dbManager.logoutUser();
      promptAction.showToast({ message: '已退出登录', duration: 2000 });
      // 跳转到登录页
      setTimeout(() => {
        router.replaceUrl({
          url: 'userprofile/pages/LoginPage'
        }).catch((err: Error) => {
          Logger.error(TAG, `跳转登录页失败: ${err.message}`);
        });
      }, 500);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `退出登录失败: ${error.message}`);
      promptAction.showToast({ message: `退出登录失败: ${error.message}`, duration: 2000 });
    }
  }
}

