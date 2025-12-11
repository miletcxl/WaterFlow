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
import promptAction from '@ohos.promptAction';

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
   * Initialize user information.
   */
  initUserInfo(): void {
    this.userInfo.userName = '张三';
    this.userInfo.avatar = '';
    this.userInfo.phone = '138****8888';
    this.userInfo.email = 'zhangsan@example.com';
    this.userInfo.address = '北京市朝阳区';
    this.userInfo.gender = '男';
    this.userInfo.birthday = '1990-01-01';
    this.userInfo.signature = '这个人很懒，什么都没有留下';
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
  initRecentOrders(): void {
    this.recentOrders = [
      this.createRecentOrder('小米无线鼠标', '￥79', $r('app.string.profile_order_pending'), '08-21'),
      this.createRecentOrder('台灯阅读灯', '￥129', $r('app.string.profile_order_shipping'), '08-19'),
      this.createRecentOrder('咖啡豆 500g', '￥89', $r('app.string.profile_order_finished'), '08-16')
    ];
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
        message = '已退出登录（占位）';
        break;
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
}

