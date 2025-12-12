if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterPage_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    isLoading?: boolean;
    context?;
    dbManager?: DatabaseManager;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import type { BusinessError as BusinessError } from "@ohos:base";
import promptAction from "@ohos:promptAction";
import { DatabaseManager } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/database/DatabaseManager";
import { UserInfo } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
const TAG = 'RegisterPage';
class RegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.context = getContext(this) as common.UIAbilityContext;
        this.dbManager = DatabaseManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
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
    updateStateVars(params: RegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
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
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
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
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(39:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部装饰区域
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(41:7)", "entry");
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
            Text.create('创建账户');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(42:9)", "entry");
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册新账户，开启精彩之旅');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(47:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.9)');
        }, Text);
        Text.pop();
        // 顶部装饰区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册表单区域
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(61:7)", "entry");
            // 注册表单区域
            Column.width('100%');
            // 注册表单区域
            Column.padding({ left: 24, right: 24 });
            // 注册表单区域
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(63:9)", "entry");
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
            Row.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(64:11)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('👤');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(65:13)", "entry");
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入用户名', text: this.username });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(68:13)", "entry");
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
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(88:9)", "entry");
            // 密码输入框
            Column.width('100%');
            // 密码输入框
            Column.height(56);
            // 密码输入框
            Column.backgroundColor('#F5F5F5');
            // 密码输入框
            Column.borderRadius(12);
            // 密码输入框
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(89:11)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔒');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(90:13)", "entry");
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入密码', text: this.password });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(93:13)", "entry");
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
            // 确认密码输入框
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(114:9)", "entry");
            // 确认密码输入框
            Column.width('100%');
            // 确认密码输入框
            Column.height(56);
            // 确认密码输入框
            Column.backgroundColor('#F5F5F5');
            // 确认密码输入框
            Column.borderRadius(12);
            // 确认密码输入框
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(115:11)", "entry");
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔒');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(116:13)", "entry");
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请再次输入密码', text: this.confirmPassword });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(119:13)", "entry");
            TextInput.layoutWeight(1);
            TextInput.type(InputType.Password);
            TextInput.fontSize(16);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
                this.confirmPassword = value;
            });
        }, TextInput);
        Row.pop();
        // 确认密码输入框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册按钮
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(140:9)", "entry");
            // 注册按钮
            Button.width('100%');
            // 注册按钮
            Button.height(50);
            // 注册按钮
            Button.backgroundColor(this.canRegister() ? '#FF6B00' : '#FFD9B3');
            // 注册按钮
            Button.borderRadius(25);
            // 注册按钮
            Button.enabled(this.canRegister() && !this.isLoading);
            // 注册按钮
            Button.onClick(() => {
                this.handleRegister();
            });
            // 注册按钮
            Button.margin({ bottom: 16 });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(142:13)", "entry");
                        LoadingProgress.color(Color.White);
                        LoadingProgress.width(20);
                        LoadingProgress.height(20);
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('注册');
                        Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(147:13)", "entry");
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // 注册按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录链接
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(164:9)", "entry");
            // 登录链接
            Row.width('100%');
            // 登录链接
            Row.justifyContent(FlexAlign.Center);
            // 登录链接
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已有账户？');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(165:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('立即登录');
            Text.debugLine("entry/src/main/ets/userprofile/pages/RegisterPage.ets(168:11)", "entry");
            Text.fontSize(14);
            Text.fontColor('#FF6B00');
            Text.fontWeight(FontWeight.Medium);
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        // 登录链接
        Row.pop();
        // 注册表单区域
        Column.pop();
        Column.pop();
    }
    canRegister(): boolean {
        return this.username.trim().length > 0 &&
            this.password.trim().length >= 6 &&
            this.password === this.confirmPassword;
    }
    async handleRegister(): Promise<void> {
        if (!this.canRegister()) {
            if (this.password !== this.confirmPassword) {
                promptAction.showToast({ message: '两次输入的密码不一致', duration: 2000 });
            }
            else if (this.password.trim().length < 6) {
                promptAction.showToast({ message: '密码长度至少6位', duration: 2000 });
            }
            else {
                promptAction.showToast({ message: '请填写完整信息', duration: 2000 });
            }
            return;
        }
        this.isLoading = true;
        try {
            const userId = await this.dbManager.registerUser(this.username.trim(), this.password.trim());
            // 创建默认用户信息
            const defaultUserInfo = new UserInfo();
            defaultUserInfo.userName = this.username.trim();
            defaultUserInfo.phone = '';
            defaultUserInfo.email = '';
            defaultUserInfo.address = '';
            defaultUserInfo.gender = '';
            defaultUserInfo.birthday = '';
            defaultUserInfo.signature = '这个人很懒，什么都没有留下';
            await this.dbManager.saveUserInfo(userId, defaultUserInfo);
            promptAction.showToast({ message: '注册成功', duration: 2000 });
            // 自动登录
            const userAccount = await this.dbManager.loginUser(this.username.trim(), this.password.trim());
            if (userAccount) {
                setTimeout(() => {
                    router.replaceUrl({
                        url: 'pages/HomePage'
                    }).catch((err: Error) => {
                        Logger.error(TAG, `跳转首页失败: ${err.message}`);
                    });
                }, 500);
            }
        }
        catch (err) {
            const error = err as Error;
            promptAction.showToast({ message: `注册失败: ${error.message}`, duration: 2000 });
            Logger.error(TAG, `注册失败: ${error.message}`);
        }
        finally {
            this.isLoading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RegisterPage";
    }
}
registerNamedRoute(() => new RegisterPage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/RegisterPage", pageFullPath: "entry/src/main/ets/userprofile/pages/RegisterPage", integratedHsp: "false", moduleType: "followWithHap" });
