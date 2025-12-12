import { UserInfo } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import type { ProfileMenuItem } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import { DatabaseManager } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/database/DatabaseManager";
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
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
                }
                else {
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
            }
            else {
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
        }
        catch (err) {
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
            }
            else {
                Logger.warn(TAG, '用户未登录，无法保存信息');
            }
        }
        catch (err) {
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
                title: { "id": 16777355, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'order',
                showArrow: true
            },
            {
                title: { "id": 16777354, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'favorite',
                showArrow: true
            },
            {
                title: '收货地址',
                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                actionType: 'address',
                showArrow: true
            },
            {
                title: '设置',
                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
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
            this.createQuickEntry({ "id": 16777346, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'order'),
            this.createQuickEntry({ "id": 16777345, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'coupon'),
            this.createQuickEntry({ "id": 16777344, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'address'),
            this.createQuickEntry({ "id": 16777347, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 'service')
        ];
    }
    /**
     * Initialize recent orders/collections preview.
     */
    initRecentOrders(): void {
        this.recentOrders = [
            this.createRecentOrder('小米无线鼠标', '￥79', { "id": 16777341, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-21'),
            this.createRecentOrder('台灯阅读灯', '￥129', { "id": 16777342, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-19'),
            this.createRecentOrder('咖啡豆 500g', '￥89', { "id": 16777340, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '08-16')
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
        }
        catch (err) {
            const error = err as Error;
            Logger.error(TAG, `退出登录失败: ${error.message}`);
            promptAction.showToast({ message: `退出登录失败: ${error.message}`, duration: 2000 });
        }
    }
}
