import { UserInfo } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import type { ProfileMenuItem } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import promptAction from "@ohos:promptAction";
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
                title: { "id": 16777324, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                icon: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'order',
                showArrow: true
            },
            {
                title: { "id": 16777323, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                icon: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'favorite',
                showArrow: true
            },
            {
                title: '收货地址',
                icon: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'address',
                showArrow: true
            },
            {
                title: '设置',
                icon: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
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
            this.createQuickEntry({ "id": 16777315, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'order'),
            this.createQuickEntry({ "id": 16777314, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'coupon'),
            this.createQuickEntry({ "id": 16777313, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'address'),
            this.createQuickEntry({ "id": 16777316, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'service')
        ];
    }
    /**
     * Initialize recent orders/collections preview.
     */
    initRecentOrders(): void {
        this.recentOrders = [
            this.createRecentOrder('小米无线鼠标', '￥79', { "id": 16777310, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-21'),
            this.createRecentOrder('台灯阅读灯', '￥129', { "id": 16777311, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-19'),
            this.createRecentOrder('咖啡豆 500g', '￥89', { "id": 16777309, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-16')
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
