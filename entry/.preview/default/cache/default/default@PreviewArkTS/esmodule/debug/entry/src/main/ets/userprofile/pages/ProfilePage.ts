if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    viewModel?: ProfileViewModel;
    topRectHeight?: number;
    isLoggedIn?: boolean;
    isLoading?: boolean;
    quickIcons?: string[];
    context?;
    dbManager?: DatabaseManager;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import { ProfileViewModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import type { QuickEntryModel, RecentOrderModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import ProfileHeaderComponent from "@bundle:com.huawei.waterflow/entry/ets/userprofile/view/ProfileHeaderComponent";
import { DatabaseManager } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/database/DatabaseManager";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
const TAG = 'ProfilePage';
class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__viewModel = new ObservedPropertyObjectPU(new ProfileViewModel(), this, "viewModel");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__isLoggedIn = new ObservedPropertySimplePU(false, this, "isLoggedIn");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.quickIcons = ['👛', '🎫', '🎁', '🎧'];
        this.context = getContext(this) as common.UIAbilityContext;
        this.dbManager = DatabaseManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.isLoggedIn !== undefined) {
            this.isLoggedIn = params.isLoggedIn;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.quickIcons !== undefined) {
            this.quickIcons = params.quickIcons;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dbManager !== undefined) {
            this.dbManager = params.dbManager;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__viewModel.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__viewModel.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
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
    private __isLoggedIn: ObservedPropertySimplePU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    // 快捷入口图标
    private quickIcons: string[];
    private context;
    private dbManager: DatabaseManager;
    async aboutToAppear(): Promise<void> {
        try {
            // 初始化数据库
            await this.dbManager.initDatabase(this.context);
            // 检查登录状态
            const currentUser = await this.dbManager.getCurrentUser();
            this.isLoggedIn = currentUser !== null;
            if (this.isLoggedIn) {
                // 加载用户信息
                await this.viewModel.initUserInfo();
            }
            else {
                // 未登录，跳转到登录页
                router.replaceUrl({
                    url: 'userprofile/pages/LoginPage'
                }).catch((err: Error) => {
                    Logger.error(TAG, `跳转登录页失败: ${err.message}`);
                });
                return;
            }
            this.viewModel.initMenuItems();
            this.viewModel.initQuickEntries();
            this.viewModel.initRecentOrders();
        }
        catch (err) {
            const error = err as Error;
            Logger.error(TAG, `页面初始化失败: ${error.message}`);
        }
        finally {
            this.isLoading = false;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 加载中状态
                        Column.create();
                        Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(80:7)", "entry");
                        // 加载中状态
                        Column.width('100%');
                        // 加载中状态
                        Column.height('100%');
                        // 加载中状态
                        Column.justifyContent(FlexAlign.Center);
                        // 加载中状态
                        Column.backgroundColor('#F6F6F6');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(81:9)", "entry");
                        LoadingProgress.width(50);
                        LoadingProgress.height(50);
                        LoadingProgress.color('#FF6B00');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(85:9)", "entry");
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 16 });
                    }, Text);
                    Text.pop();
                    // 加载中状态
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildContent.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    buildContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(101:5)", "entry");
            Stack.backgroundColor('#F6F6F6');
            Stack.padding({ top: this.getUIContext().px2vp(this.topRectHeight) });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 渐变背景
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(103:7)", "entry");
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
            List.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(112:7)", "entry");
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(115:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(116:11)", "entry");
                    Row.width('100%');
                    Row.padding({ left: 16, right: 16, top: 12 });
                    Row.alignItems(VerticalAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(117:13)", "entry");
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
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(118:15)", "entry");
                    Text.fontSize(18);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('返回');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(122:15)", "entry");
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ left: 4 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                    Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(135:13)", "entry");
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('⚙️');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(136:13)", "entry");
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(146:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(147:11)", "entry");
                    Column.width('100%');
                    Column.padding({ left: 16, right: 16, bottom: 20 });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 1. 用户基本信息组件
                            ProfileHeaderComponent(this, { userInfo: this.viewModel.userInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/userprofile/pages/ProfilePage.ets", line: 149, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    userInfo: this.viewModel.userInfo
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                userInfo: this.viewModel.userInfo
                            });
                        }
                    }, { name: "ProfileHeaderComponent" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 2. 黑金会员卡片
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(152:13)", "entry");
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
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(154:15)", "entry");
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('💎');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(155:17)", "entry");
                    Text.fontSize(18);
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(159:17)", "entry");
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('钻石会员 Lv.5');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(160:19)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#FFE4B5');
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('本月已省 88 元');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(164:19)", "entry");
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
                    Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(172:15)", "entry");
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 右侧：查看权益
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(175:15)", "entry");
                    // 右侧：查看权益
                    Row.backgroundColor('rgba(255,255,255,0.1)');
                    // 右侧：查看权益
                    Row.padding({ left: 10, right: 8, top: 4, bottom: 4 });
                    // 右侧：查看权益
                    Row.borderRadius(12);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('查看权益');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(176:17)", "entry");
                    Text.fontSize(12);
                    Text.fontColor('#FFE4B5');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(' ›');
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(179:17)", "entry");
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(206:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(207:11)", "entry");
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
                this.buildStatItem.bind(this)({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '12', { "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(209:13)", "entry");
                    Divider.vertical(true);
                    Divider.height(24);
                    Divider.color('#F1F3F5');
                }, Divider);
                this.buildStatItem.bind(this)({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '85', { "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(211:13)", "entry");
                    Divider.vertical(true);
                    Divider.height(24);
                    Divider.color('#F1F3F5');
                }, Divider);
                this.buildStatItem.bind(this)({ "id": 16777356, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '2041', { "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(222:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(223:11)", "entry");
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
                this.buildSectionTitle.bind(this)({ "id": 16777348, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(225:13)", "entry");
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
                                GridItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(227:17)", "entry");
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(228:19)", "entry");
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
                                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(229:21)", "entry");
                                    Text.fontSize(32);
                                    Text.margin({ bottom: 8 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(232:21)", "entry");
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(257:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(258:11)", "entry");
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
                this.buildSectionTitle.bind(this)({ "id": 16777349, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(260:13)", "entry");
                    Column.margin({ top: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(262:17)", "entry");
                            Row.width('100%');
                            Row.padding({ top: 12, bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Rect.create();
                            Rect.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(263:19)", "entry");
                            Rect.width(40);
                            Rect.height(40);
                            Rect.radius(4);
                            Rect.fill('#F5F5F5');
                            Rect.margin({ right: 12 });
                        }, Rect);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(264:19)", "entry");
                            Column.layoutWeight(1);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(265:21)", "entry");
                            Text.fontSize(15);
                            Text.fontColor(Color.Black);
                            Text.fontWeight(FontWeight.Medium);
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.date);
                            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(266:21)", "entry");
                            Text.fontSize(12);
                            Text.fontColor('#999');
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(269:19)", "entry");
                            Column.alignItems(HorizontalAlign.End);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.price);
                            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(270:21)", "entry");
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor('#E95B27');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.status);
                            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(271:21)", "entry");
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
                                        Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(276:71)", "entry");
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(286:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(287:11)", "entry");
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
                this.buildMenuItem.bind(this)({ "id": 16777343, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '138****0000', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(289:13)", "entry");
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777337, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '我的收货地址', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(291:13)", "entry");
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777350, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '', true);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(293:13)", "entry");
                    Divider.color('#F1F3F5');
                    Divider.margin({ left: 44 });
                }, Divider);
                this.buildMenuItem.bind(this)({ "id": 16777352, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, '', true);
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
                ListItem.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(302:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(303:11)", "entry");
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
            Column.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(329:5)", "entry");
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(330:7)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(334:7)", "entry");
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
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(344:5)", "entry");
            Row.width('100%');
            Row.padding({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(345:7)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(349:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (showMore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(351:9)", "entry");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(352:11)", "entry");
                        Text.fontSize(13);
                        Text.fontColor('#999');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(355:11)", "entry");
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
            Row.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(368:5)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 24, height: 24 });
            Circle.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(369:7)", "entry");
            Circle.fill('#FFF5EC');
            Circle.margin({ right: 12 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(373:7)", "entry");
            Text.fontSize(15);
            Text.fontColor('#333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(377:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (value) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(value);
                        Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(380:9)", "entry");
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
                        Text.debugLine("entry/src/main/ets/userprofile/pages/ProfilePage.ets(387:9)", "entry");
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
