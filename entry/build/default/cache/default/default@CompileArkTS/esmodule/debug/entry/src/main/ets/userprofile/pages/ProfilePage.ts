if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    viewModel?: ProfileViewModel;
    topRectHeight?: number;
    quickIcons?: string[];
}
import router from "@ohos:router";
import { ProfileViewModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import type { QuickEntryModel, RecentOrderModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import ProfileHeaderComponent from "@bundle:com.huawei.waterflow/entry/ets/userprofile/view/ProfileHeaderComponent";
class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__viewModel = new ObservedPropertyObjectPU(new ProfileViewModel(), this, "viewModel");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.quickIcons = ['👛', '🎫', '🎁', '🎧'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.quickIcons !== undefined) {
            this.quickIcons = params.quickIcons;
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
    private __viewModel: ObservedPropertyObjectPU<ProfileViewModel>;
    get viewModel() {
        return this.__viewModel.get();
    }
    set viewModel(newValue: ProfileViewModel) {
        this.__viewModel.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    // 快捷入口图标
    private quickIcons: string[];
    aboutToAppear(): void {
        this.viewModel.initUserInfo();
        this.viewModel.initMenuItems();
        this.viewModel.initQuickEntries();
        this.viewModel.initRecentOrders();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.backgroundColor('#F6F6F6');
            Stack.padding({ top: this.getUIContext().px2vp(this.topRectHeight) });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 渐变背景
            Column.create();
            // 1. 渐变背景
            Column.width('100%');
            // 1. 渐变背景
            Column.height(320);
            // 1. 渐变背景
            Column.linearGradient({
                angle: 180,
                colors: [['#FF8A3C', 0.0], ['#FFB36B', 1.0]]
            });
            // 1. 渐变背景
            Column.borderRadius({ bottomLeft: 24, bottomRight: 24 });
        }, Column);
        // 1. 渐变背景
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.width('100%');
            List.height('100%');
            List.scrollBar(BarState.Off);
            List.edgeEffect(EdgeEffect.Spring);
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 顶部导航栏 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 12 });
                    Row.alignItems(VerticalAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.padding({ left: 12, right: 16, top: 8, bottom: 8 });
                    Row.backgroundColor('rgba(255,255,255,0.2)');
                    Row.borderRadius(20);
                    Row.backdropBlur(10);
                    Row.onClick(() => {
                        try {
                            router.back();
                        }
                        catch (err) { }
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('❮');
                    Text.fontSize(18);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('返回');
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ left: 4 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('⚙️');
                    Text.fontSize(24);
                    Text.onClick(() => this.viewModel.onMenuItemClick('account'));
                }, Text);
                Text.pop();
                Row.pop();
                // --- 顶部导航栏 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 顶部导航栏 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 用户头像与信息 + 黑金会员卡 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding({ left: 16, right: 16, bottom: 20 });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 1. 用户基本信息组件
                            ProfileHeaderComponent(this, { userInfo: this.viewModel.userInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 92, col: 13 });
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
                    // 2. 黑金会员卡片
                    Row.create();
                    // 2. 黑金会员卡片
                    Row.width('100%');
                    // 2. 黑金会员卡片
                    Row.height(60);
                    // 2. 黑金会员卡片
                    Row.linearGradient({
                        angle: 90,
                        colors: [['#333333', 0.0], ['#454545', 1.0]]
                    });
                    // 2. 黑金会员卡片
                    Row.borderRadius(16);
                    // 2. 黑金会员卡片
                    Row.padding({ left: 16, right: 16 });
                    // 2. 黑金会员卡片
                    Row.alignItems(VerticalAlign.Center);
                    // 2. 黑金会员卡片
                    Row.margin({ top: 16 });
                    // 2. 黑金会员卡片
                    Row.shadow({ radius: 10, color: 'rgba(0,0,0,0.15)', offsetY: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 左侧：等级与图标
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('💎');
                    Text.fontSize(18);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('钻石会员 Lv.5');
                    Text.fontSize(14);
                    Text.fontColor('#FFE4B5');
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('本月已省 88 元');
                    Text.fontSize(10);
                    Text.fontColor('rgba(255,228,181, 0.7)');
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
                // 左侧：等级与图标
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 右侧：查看权益
                    Row.create();
                    // 右侧：查看权益
                    Row.backgroundColor('rgba(255,255,255,0.1)');
                    // 右侧：查看权益
                    Row.padding({ left: 10, right: 8, top: 4, bottom: 4 });
                    // 右侧：查看权益
                    Row.borderRadius(12);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('查看权益');
                    Text.fontSize(12);
                    Text.fontColor('#FFE4B5');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(' ›');
                    Text.fontSize(18);
                    Text.fontColor('#FFE4B5');
                    Text.margin({ bottom: 2 });
                }, Text);
                Text.pop();
                // 右侧：查看权益
                Row.pop();
                // 2. 黑金会员卡片
                Row.pop();
                Column.pop();
                // --- 用户头像与信息 + 黑金会员卡 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 用户头像与信息 + 黑金会员卡 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 悬浮统计卡片 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // --- 悬浮统计卡片 ---
                ListItem.padding({ left: 16, right: 16 });
                // --- 悬浮统计卡片 ---
                ListItem.margin({ top: -30 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.backgroundColor(Color.White);
                    Row.borderRadius(16);
                    Row.shadow({
                        radius: 20,
                        color: '#0D000000',
                        offsetX: 0,
                        offsetY: 4
                    });
                    Row.padding(16);
                    Row.justifyContent(FlexAlign.SpaceEvenly);
                    Row.height(90);
                }, Row);
                this.buildStatItem.bind(this)({ "id": 16777324, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '12', { "id": 16777337, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.vertical(true);
                    Divider.height(24);
                    Divider.color('#F1F3F5');
                }, Divider);
                this.buildStatItem.bind(this)({ "id": 16777323, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '85', { "id": 16777338, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.vertical(true);
                    Divider.height(24);
                    Divider.color('#F1F3F5');
                }, Divider);
                this.buildStatItem.bind(this)({ "id": 16777325, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '2041', { "id": 16777339, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                Row.pop();
                // --- 悬浮统计卡片 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 悬浮统计卡片 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 快捷入口 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // --- 快捷入口 ---
                ListItem.padding({ left: 16, right: 16 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.backgroundColor(Color.White);
                    Column.borderRadius(16);
                    Column.shadow({
                        radius: 20,
                        color: '#0D000000',
                        offsetX: 0,
                        offsetY: 4
                    });
                    Column.padding(16);
                }, Column);
                this.buildSectionTitle.bind(this)({ "id": 16777317, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.columnsTemplate('1fr 1fr 1fr 1fr');
                    Grid.rowsGap(16);
                    Grid.height(90);
                    Grid.margin({ top: 12 });
                }, Grid);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.onClick(() => {
                                        if (item.actionType === 'service') {
                                            try {
                                                router.pushUrl({ url: 'userprofile/pages/AiServicePage' });
                                            }
                                            catch (e) { }
                                            return;
                                        }
                                        this.viewModel.onMenuItemClick(item.actionType);
                                    });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.quickIcons[index % this.quickIcons.length]);
                                    Text.fontSize(32);
                                    Text.margin({ bottom: 8 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                    Text.fontSize(13);
                                    Text.fontColor('#333333');
                                }, Text);
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.viewModel.quickEntries, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
                Column.pop();
                // --- 快捷入口 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 快捷入口 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 最近订单 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // --- 最近订单 ---
                ListItem.padding({ left: 16, right: 16 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.backgroundColor(Color.White);
                    Column.borderRadius(16);
                    Column.shadow({
                        radius: 20,
                        color: '#0D000000',
                        offsetX: 0,
                        offsetY: 4
                    });
                    Column.padding(16);
                }, Column);
                this.buildSectionTitle.bind(this)({ "id": 16777318, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin({ top: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({ top: 12, bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Rect.create();
                            Rect.width(40);
                            Rect.height(40);
                            Rect.radius(4);
                            Rect.fill('#F5F5F5');
                            Rect.margin({ right: 12 });
                        }, Rect);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.layoutWeight(1);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.fontSize(15);
                            Text.fontColor(Color.Black);
                            Text.fontWeight(FontWeight.Medium);
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.date);
                            Text.fontSize(12);
                            Text.fontColor('#999');
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.End);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.price);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor('#E95B27');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.status);
                            Text.fontSize(12);
                            Text.fontColor(item.status === '进行中' ? '#E95B27' : '#999');
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index < this.viewModel.recentOrders.length - 1) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.color('#F1F3F5');
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
                Column.pop();
                // --- 最近订单 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 最近订单 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 常用菜单 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // --- 常用菜单 ---
                ListItem.padding({ left: 16, right: 16 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.backgroundColor(Color.White);
                    Column.borderRadius(16);
                    Column.shadow({
                        radius: 20,
                        color: '#0D000000',
                        offsetX: 0,
                        offsetY: 4
                    });
                    Column.padding(16);
                    Column.padding({ top: 0, bottom: 0, left: 16, right: 16 });
                }, Column);
                this.buildMenuItem.bind(this)({ "id": 16777312, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '138****0000', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777306, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '我的收货地址', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777319, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777321, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '', true);
                Column.pop();
                // --- 常用菜单 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 常用菜单 ---
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // --- 退出登录 ---
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // --- 退出登录 ---
                ListItem.padding({ left: 16, right: 16, bottom: 30 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777320, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.fontSize(16);
                    Text.fontColor('#FF4040');
                    Text.fontWeight(FontWeight.Medium);
                    Text.padding(14);
                    Text.backgroundColor(Color.White);
                    Text.borderRadius(16);
                    Text.onClick(() => { this.viewModel.onMenuItemClick('logout'); });
                }, Text);
                Text.pop();
                // --- 退出登录 ---
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // --- 退出登录 ---
            ListItem.pop();
        }
        List.pop();
        Stack.pop();
    }
    // --- 修复部分：将 Builders 展开为正确的格式 ---
    buildStatItem(title: ResourceStr, value: string, iconColor: ResourceColor, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(12);
            Text.fontColor('#999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    buildSectionTitle(title: ResourceStr, showMore: boolean = false, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (showMore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777305, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontSize(13);
                        Text.fontColor('#999');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(18);
                        Text.fontColor('#999');
                        Text.margin({ left: 2, bottom: 2 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    buildMenuItem(title: ResourceStr, value: string, showArrow: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 24, height: 24 });
            Circle.fill('#FFF5EC');
            Circle.margin({ right: 12 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(15);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (value) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(value);
                        Text.fontSize(14);
                        Text.fontColor('#999');
                        Text.margin({ right: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (showArrow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(20);
                        Text.fontColor('#CCC');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProfilePage";
    }
}
registerNamedRoute(() => new ProfilePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/ProfilePage", pageFullPath: "entry/src/main/ets/userprofile/pages/ProfilePage", integratedHsp: "false", moduleType: "followWithHap" });
