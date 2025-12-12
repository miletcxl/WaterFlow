if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    username?: string;
    password?: string;
    isLoading?: boolean;
    context?;
    dbManager?: DatabaseManager;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import type { BusinessError as BusinessError } from "@ohos:base";
import promptAction from "@ohos:promptAction";
import { DatabaseManager } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/database/DatabaseManager";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
const TAG = 'LoginPage';
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.context = getContext(this) as common.UIAbilityContext;
        this.dbManager = DatabaseManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dbManager !== undefined) {
            this.dbManager = params.dbManager;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private context;
    private dbManager: DatabaseManager;
    aboutToAppear(): void {
        // 初始化数据库
        this.dbManager.initDatabase(this.context).catch((err: BusinessError | Error) => {
            const error = err as Error;
            Logger.error(TAG, `数据库初始化失败: ${error.message}`);
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(37:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰区域
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(39:7)", "entry");
            // 顶部装饰区域
            Column.width('100%');
            // 顶部装饰区域
            Column.height(200);
            // 顶部装饰区域
            Column.justifyContent(FlexAlign.Center);
            // 顶部装饰区域
            Column.linearGradient({
                angle: 180,
                colors: [['#FF8A3C', 0.0], ['#FFB36B', 1.0]]
            });
            // 顶部装饰区域
            Column.borderRadius({ bottomLeft: 30, bottomRight: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('欢迎回来');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(40:9)", "entry");
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录您的账户以继续');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(45:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.9)');
        }, Text);
        Text.pop();
        // 顶部装饰区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录表单区域
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(59:7)", "entry");
            // 登录表单区域
            Column.width('100%');
            // 登录表单区域
            Column.padding({ left: 24, right: 24 });
            // 登录表单区域
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(61:9)", "entry");
            // 用户名输入框
            Column.width('100%');
            // 用户名输入框
            Column.height(56);
            // 用户名输入框
            Column.backgroundColor('#F5F5F5');
            // 用户名输入框
            Column.borderRadius(12);
            // 用户名输入框
            Column.margin({ top: 40, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(62:11)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('👤');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(63:13)", "entry");
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入用户名', text: this.username });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(66:13)", "entry");
            TextInput.layoutWeight(1);
            TextInput.fontSize(16);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
                this.username = value;
            });
        }, TextInput);
        Row.pop();
        // 用户名输入框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(86:9)", "entry");
            // 密码输入框
            Column.width('100%');
            // 密码输入框
            Column.height(56);
            // 密码输入框
            Column.backgroundColor('#F5F5F5');
            // 密码输入框
            Column.borderRadius(12);
            // 密码输入框
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(87:11)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔒');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(88:13)", "entry");
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入密码', text: this.password });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(91:13)", "entry");
            TextInput.layoutWeight(1);
            TextInput.type(InputType.Password);
            TextInput.fontSize(16);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        Row.pop();
        // 密码输入框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(112:9)", "entry");
            // 登录按钮
            Button.width('100%');
            // 登录按钮
            Button.height(50);
            // 登录按钮
            Button.backgroundColor(this.canLogin() ? '#FF6B00' : '#FFD9B3');
            // 登录按钮
            Button.borderRadius(25);
            // 登录按钮
            Button.enabled(this.canLogin() && !this.isLoading);
            // 登录按钮
            Button.onClick(() => {
                this.handleLogin();
            });
            // 登录按钮
            Button.margin({ bottom: 16 });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(114:13)", "entry");
                        LoadingProgress.color(Color.White);
                        LoadingProgress.width(20);
                        LoadingProgress.height(20);
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('登录');
                        Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(119:13)", "entry");
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // 登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册链接
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(136:9)", "entry");
            // 注册链接
            Row.width('100%');
            // 注册链接
            Row.justifyContent(FlexAlign.Center);
            // 注册链接
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('还没有账户？');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(137:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('立即注册');
            Text.debugLine("entry/src/main/ets/userprofile/pages/LoginPage.ets(140:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#FF6B00');
            Text.fontWeight(FontWeight.Medium);
            Text.onClick(() => {
                router.pushUrl({
                    url: 'userprofile/pages/RegisterPage'
                }).catch((err: Error) => {
                    Logger.error(TAG, `跳转注册页失败: ${err.message}`);
                });
            });
        }, Text);
        Text.pop();
        // 注册链接
        Row.pop();
        // 登录表单区域
        Column.pop();
        Column.pop();
    }
    canLogin(): boolean {
        return this.username.trim().length > 0 && this.password.trim().length > 0;
    }
    async handleLogin(): Promise<void> {
        if (!this.canLogin()) {
            promptAction.showToast({ message: '请输入用户名和密码' });
            return;
        }
        this.isLoading = true;
        try {
            const userAccount = await this.dbManager.loginUser(this.username.trim(), this.password.trim());
            if (userAccount) {
                promptAction.showToast({ message: '登录成功', duration: 2000 });
                // 延迟跳转，让用户看到成功提示
                setTimeout(() => {
                    router.replaceUrl({
                        url: 'pages/HomePage'
                    }).catch((err: Error) => {
                        Logger.error(TAG, `跳转首页失败: ${err.message}`);
                    });
                }, 500);
            }
            else {
                promptAction.showToast({ message: '用户名或密码错误', duration: 2000 });
            }
        }
        catch (err) {
            const error = err as Error;
            promptAction.showToast({ message: `登录失败: ${error.message}`, duration: 2000 });
            Logger.error(TAG, `登录失败: ${error.message}`);
        }
        finally {
            this.isLoading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/LoginPage", pageFullPath: "entry/src/main/ets/userprofile/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
