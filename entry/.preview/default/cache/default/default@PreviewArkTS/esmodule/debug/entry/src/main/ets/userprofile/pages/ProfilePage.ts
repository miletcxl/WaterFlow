if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    viewModel?: ProfileViewModel;
    topRectHeight?: number;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import router from "@ohos:router";
import { ProfileViewModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import type { QuickEntryModel, RecentOrderModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import type { ProfileMenuItem } from '../model/UserInfo';
import ProfileHeaderComponent from "@bundle:com.huawei.waterflow/entry/ets/userprofile/view/ProfileHeaderComponent";
import ProfileItemComponent from "@bundle:com.huawei.waterflow/entry/ets/userprofile/view/ProfileItemComponent";
class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__viewModel = new ObservedPropertyObjectPU(new ProfileViewModel(), this, "viewModel");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__viewModel.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__viewModel.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * Profile view model.
     */
    private __viewModel: ObservedPropertyObjectPU<ProfileViewModel>;
    get viewModel() {
        return this.__viewModel.get();
    }
    set viewModel(newValue: ProfileViewModel) {
        this.__viewModel.set(newValue);
    }
    /**
     * Top rectangle height for status bar.
     */
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    aboutToAppear(): void {
        this.viewModel.initUserInfo();
        this.viewModel.initMenuItems();
        this.viewModel.initQuickEntries();
        this.viewModel.initRecentOrders();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(47:5)", "entry");
            Stack.width(Const.FULL_WIDTH);
            Stack.height(Const.FULL_HEIGHT);
            Stack.backgroundColor({ "id": 16777219, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 渐变背景
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(49:7)", "entry");
            // 渐变背景
            Column.width(Const.FULL_WIDTH);
            // 渐变背景
            Column.height({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 渐变背景
            Column.linearGradient({
                angle: 180,
                colors: [[{ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 0.0], [{ "id": 16777226, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 1.0]]
            });
        }, Column);
        // 渐变背景
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主要内容
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(58:7)", "entry");
            // 主要内容
            Scroll.width(Const.FULL_WIDTH);
            // 主要内容
            Scroll.height(Const.FULL_HEIGHT);
            // 主要内容
            Scroll.padding({
                top: this.getUIContext().px2vp(this.topRectHeight)
            });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(59:9)", "entry");
            Column.width(Const.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮 - 深色胶囊样式
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(61:11)", "entry");
            // 返回按钮 - 深色胶囊样式
            Row.width(Const.FULL_WIDTH);
            // 返回按钮 - 深色胶囊样式
            Row.height(60);
            // 返回按钮 - 深色胶囊样式
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: 12,
                bottom: 8
            });
            // 返回按钮 - 深色胶囊样式
            Row.justifyContent(FlexAlign.Start);
            // 返回按钮 - 深色胶囊样式
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('返回');
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(62:13)", "entry");
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.padding({ left: 18, right: 18, top: 10, bottom: 10 });
            Text.backgroundColor('#665B7BFA');
            Text.borderRadius(22);
            Text.shadow({
                radius: 8,
                color: '#33000000',
                offsetX: 0,
                offsetY: 3
            });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        // 返回按钮 - 深色胶囊样式
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Header section with gradient background
                    ProfileHeaderComponent(this, { userInfo: this.viewModel.userInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 91, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            userInfo: this.viewModel.userInfo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileHeaderComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标签与编辑
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(93:11)", "entry");
            // 标签与编辑
            Row.width(Const.FULL_WIDTH);
            // 标签与编辑
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: 4
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(94:13)", "entry");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('会员');
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(95:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#5B7BFA');
            Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
            Text.backgroundColor('#E9EDFF');
            Text.borderRadius(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('积分 1024');
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(101:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#5B7BFA');
            Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
            Text.backgroundColor('#E9EDFF');
            Text.borderRadius(14);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(110:13)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编辑资料');
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(111:13)", "entry");
            Text.fontSize(13);
            Text.fontColor(Color.White);
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#334A90E2');
            Text.borderRadius(16);
        }, Text);
        Text.pop();
        // 标签与编辑
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统计信息卡片
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(126:11)", "entry");
            // 统计信息卡片
            Row.width(Const.FULL_WIDTH);
            // 统计信息卡片
            Row.height(100);
            // 统计信息卡片
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
            // 统计信息卡片
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 统计信息卡片
            Row.margin({ top: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Row);
        this.buildStatCard.bind(this)({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '0', { "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        this.buildStatCard.bind(this)({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '0', { "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        this.buildStatCard.bind(this)({ "id": 16777356, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '0', { "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        // 统计信息卡片
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 快捷入口
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(141:11)", "entry");
            // 快捷入口
            Column.width(Const.FULL_WIDTH);
            // 快捷入口
            Column.margin({ top: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(142:13)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: 8,
                bottom: 8
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777348, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(143:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(147:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(148:15)", "entry");
            Text.fontSize(14);
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
            Flex.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(160:11)", "entry");
            Flex.width(Const.FULL_WIDTH);
            Flex.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: 4
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(162:15)", "entry");
                    Text.fontSize(14);
                    Text.fontColor(Color.Black);
                    Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
                    Text.backgroundColor('#F6F7FB');
                    Text.borderRadius(16);
                    Text.margin({ right: 10, bottom: 10 });
                    Text.onClick(() => {
                        if (item.actionType === 'service') {
                            router.pushUrl({ url: 'userprofile/pages/AiServicePage' });
                            return;
                        }
                        this.viewModel.onMenuItemClick(item.actionType);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.viewModel.quickEntries, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 快捷入口
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Menu items section
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(189:11)", "entry");
            // Menu items section
            Column.width(Const.FULL_WIDTH);
            // Menu items section
            Column.margin({ top: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            // Menu items section
            Column.borderRadius({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // Menu items section
            Column.backgroundColor(Color.White);
            // Menu items section
            Column.shadow({
                radius: 8,
                color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ProfileItemComponent(this, {
                                menuItem: item,
                                onItemClick: (actionType: string) => {
                                    this.viewModel.onMenuItemClick(actionType);
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 191, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    menuItem: item,
                                    onItemClick: (actionType: string) => {
                                        this.viewModel.onMenuItemClick(actionType);
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "ProfileItemComponent" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < this.viewModel.menuItems.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(198:17)", "entry");
                                Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Divider.strokeWidth(0.5);
                                Divider.margin({
                                    left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                    right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                                });
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.viewModel.menuItems, forEachItemGenFunction, (item: ProfileMenuItem, index: number) => `${item.actionType}_${index}`, true, true);
        }, ForEach);
        ForEach.pop();
        // Menu items section
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 最近订单 / 收藏
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(220:11)", "entry");
            // 最近订单 / 收藏
            Column.width(Const.FULL_WIDTH);
            // 最近订单 / 收藏
            Column.margin({ top: 12 });
            // 最近订单 / 收藏
            Column.borderRadius({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 最近订单 / 收藏
            Column.backgroundColor(Color.White);
            // 最近订单 / 收藏
            Column.shadow({
                radius: 8,
                color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(221:13)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: 12,
                bottom: 8
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777349, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(222:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(226:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(227:15)", "entry");
            Text.fontSize(14);
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(239:13)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(241:17)", "entry");
                    Row.width(Const.FULL_WIDTH);
                    Row.padding({
                        left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                        right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                        top: 10,
                        bottom: 10
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(242:19)", "entry");
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.name);
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(243:21)", "entry");
                    Text.fontSize(15);
                    Text.fontColor(Color.Black);
                    Text.fontWeight(FontWeight.Medium);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(247:21)", "entry");
                    Row.margin({ top: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.status);
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(248:23)", "entry");
                    Text.fontSize(12);
                    Text.fontColor('#5B7BFA');
                    Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
                    Text.backgroundColor('#E9EDFF');
                    Text.borderRadius(12);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.date);
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(254:23)", "entry");
                    Text.fontSize(12);
                    Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Text.margin({ left: 8 });
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.price);
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(263:19)", "entry");
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor({ "id": 16777218, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < this.viewModel.recentOrders.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(277:19)", "entry");
                                Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Divider.strokeWidth(0.5);
                                Divider.margin({
                                    left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                    right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                                });
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.viewModel.recentOrders, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        // 最近订单 / 收藏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // User info details section
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(300:11)", "entry");
            // User info details section
            Column.width(Const.FULL_WIDTH);
            // User info details section
            Column.margin({ top: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            // User info details section
            Column.borderRadius({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // User info details section
            Column.backgroundColor(Color.White);
            // User info details section
            Column.shadow({
                radius: 8,
                color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 2
            });
            // User info details section
            Column.margin({ bottom: { "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777343, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'phone',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 301, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777343, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'phone',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(312:13)", "entry");
            Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Divider.strokeWidth(0.5);
            Divider.margin({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Divider);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777339, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'email',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 319, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777339, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'email',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(330:13)", "entry");
            Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Divider.strokeWidth(0.5);
            Divider.margin({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Divider);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777337, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'address',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 337, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777337, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'address',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        // User info details section
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 更多设置
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(362:11)", "entry");
            // 更多设置
            Column.width(Const.FULL_WIDTH);
            // 更多设置
            Column.margin({ top: 12, bottom: { "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            // 更多设置
            Column.borderRadius({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 更多设置
            Column.backgroundColor(Color.White);
            // 更多设置
            Column.shadow({
                radius: 8,
                color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(363:13)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: 12,
                bottom: 6
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777353, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(364:15)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(377:13)", "entry");
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777350, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'account',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 378, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777350, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'account',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(389:15)", "entry");
            Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Divider.strokeWidth(0.5);
            Divider.margin({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Divider);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777352, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'notify',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 396, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777352, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'notify',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(407:15)", "entry");
            Divider.color({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Divider.strokeWidth(0.5);
            Divider.margin({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Divider);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ProfileItemComponent(this, {
                        menuItem: {
                            title: { "id": 16777351, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            actionType: 'logout',
                            showArrow: true
                        },
                        onItemClick: (actionType: string) => {
                            this.viewModel.onMenuItemClick(actionType);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 414, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            menuItem: {
                                title: { "id": 16777351, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                icon: { "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                                actionType: 'logout',
                                showArrow: true
                            },
                            onItemClick: (actionType: string) => {
                                this.viewModel.onMenuItemClick(actionType);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ProfileItemComponent" });
        }
        Column.pop();
        // 更多设置
        Column.pop();
        Column.pop();
        // 主要内容
        Scroll.pop();
        Stack.pop();
    }
    buildStatCard(title: ResourceStr, value: string, iconColor: ResourceColor, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(453:5)", "entry");
            Column.width({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Column.height({ "id": 16777290, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Column.padding(12);
            Column.borderRadius({ "id": 16777292, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            Column.shadow({
                radius: { "id": 16777287, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                color: { "id": 16777231, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 2
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(454:7)", "entry");
            Stack.margin({ bottom: { "id": 16777295, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 40, height: 40 });
            Circle.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(455:9)", "entry");
            Circle.fill(iconColor);
            Circle.opacity(0.15);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 24, height: 24 });
            Circle.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(458:9)", "entry");
            Circle.fill(iconColor);
        }, Circle);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(463:7)", "entry");
            Text.fontSize({ "id": 16777299, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(469:7)", "entry");
            Text.fontSize({ "id": 16777298, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProfilePage";
    }
}
registerNamedRoute(() => new ProfilePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/ProfilePage", pageFullPath: "entry/src/main/ets/userprofile/pages/ProfilePage", integratedHsp: "false", moduleType: "followWithHap" });
