if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditProfilePage_Params {
    userName?: string;
    phone?: string;
    email?: string;
    address?: string;
    gender?: string;
    birthday?: string;
    signature?: string;
    isLoading?: boolean;
    isSaving?: boolean;
    context?;
    dbManager?: DatabaseManager;
    viewModel?: ProfileViewModel;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import promptAction from "@ohos:promptAction";
import { DatabaseManager } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/database/DatabaseManager";
import { ProfileViewModel } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/viewmodel/ProfileViewModel";
import Logger from "@bundle:com.huawei.waterflow/entry/ets/common/utils/Logger";
const TAG = 'EditProfilePage';
class EditProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userName = new ObservedPropertySimplePU('', this, "userName");
        this.__phone = new ObservedPropertySimplePU('', this, "phone");
        this.__email = new ObservedPropertySimplePU('', this, "email");
        this.__address = new ObservedPropertySimplePU('', this, "address");
        this.__gender = new ObservedPropertySimplePU('', this, "gender");
        this.__birthday = new ObservedPropertySimplePU('', this, "birthday");
        this.__signature = new ObservedPropertySimplePU('', this, "signature");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__isSaving = new ObservedPropertySimplePU(false, this, "isSaving");
        this.context = getContext(this) as common.UIAbilityContext;
        this.dbManager = DatabaseManager.getInstance();
        this.viewModel = new ProfileViewModel();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditProfilePage_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.address !== undefined) {
            this.address = params.address;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
        }
        if (params.birthday !== undefined) {
            this.birthday = params.birthday;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.isSaving !== undefined) {
            this.isSaving = params.isSaving;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.dbManager !== undefined) {
            this.dbManager = params.dbManager;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
    }
    updateStateVars(params: EditProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__address.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__birthday.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__isSaving.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userName.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__address.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__birthday.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__isSaving.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __address: ObservedPropertySimplePU<string>;
    get address() {
        return this.__address.get();
    }
    set address(newValue: string) {
        this.__address.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __birthday: ObservedPropertySimplePU<string>;
    get birthday() {
        return this.__birthday.get();
    }
    set birthday(newValue: string) {
        this.__birthday.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __isSaving: ObservedPropertySimplePU<boolean>;
    get isSaving() {
        return this.__isSaving.get();
    }
    set isSaving(newValue: boolean) {
        this.__isSaving.set(newValue);
    }
    private context;
    private dbManager: DatabaseManager;
    private viewModel: ProfileViewModel;
    async aboutToAppear(): Promise<void> {
        try {
            await this.dbManager.initDatabase(this.context);
            await this.viewModel.initUserInfo();
            // 加载当前用户信息
            this.userName = this.viewModel.userInfo.userName || '';
            this.phone = this.viewModel.userInfo.phone || '';
            this.email = this.viewModel.userInfo.email || '';
            this.address = this.viewModel.userInfo.address || '';
            this.gender = this.viewModel.userInfo.gender || '';
            this.birthday = this.viewModel.userInfo.birthday || '';
            this.signature = this.viewModel.userInfo.signature || '';
        }
        catch (err) {
            const error = err as Error;
            Logger.error(TAG, `页面初始化失败: ${error.message}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F6F6F6');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部导航栏
            Row.backgroundColor('#FF6B00');
            // 顶部导航栏
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 顶部导航栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.onClick(() => {
                router.back();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('❮');
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编辑个人信息');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.type(ButtonType.Normal);
            Button.backgroundColor(this.isSaving ? '#FFD9B3' : '#FF6B00');
            Button.borderRadius(20);
            Button.padding({ left: 20, right: 20, top: 8, bottom: 8 });
            Button.enabled(!this.isSaving);
            Button.onClick(() => {
                this.handleSave();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isSaving) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.color(Color.White);
                        LoadingProgress.width(16);
                        LoadingProgress.height(16);
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('保存');
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Button.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单内容
            Scroll.create();
            // 表单内容
            Scroll.layoutWeight(1);
            // 表单内容
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 20 });
        }, Column);
        // 用户名
        this.buildInputItem.bind(this)('👤', '用户名', this.userName, (value: string) => {
            this.userName = value;
        });
        // 手机号
        this.buildInputItem.bind(this)('📱', '手机号', this.phone, (value: string) => {
            this.phone = value;
        });
        // 邮箱
        this.buildInputItem.bind(this)('📧', '邮箱', this.email, (value: string) => {
            this.email = value;
        });
        // 地址
        this.buildInputItem.bind(this)('📍', '地址', this.address, (value: string) => {
            this.address = value;
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 性别选择
            Column.create();
            // 性别选择
            Column.width('100%');
            // 性别选择
            Column.backgroundColor(Color.White);
            // 性别选择
            Column.borderRadius(12);
            // 性别选择
            Column.margin({ top: 16, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚧️');
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('性别');
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, bottom: 16 });
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.buildGenderButton.bind(this)('男', this.gender === '男');
        this.buildGenderButton.bind(this)('女', this.gender === '女');
        this.buildGenderButton.bind(this)('保密', this.gender === '保密' || this.gender === '');
        Row.pop();
        // 性别选择
        Column.pop();
        // 生日
        this.buildInputItem.bind(this)('🎂', '生日（格式：YYYY-MM-DD）', this.birthday, (value: string) => {
            this.birthday = value;
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 个人签名
            Column.create();
            // 个人签名
            Column.width('100%');
            // 个人签名
            Column.backgroundColor(Color.White);
            // 个人签名
            Column.borderRadius(12);
            // 个人签名
            Column.margin({ top: 16, bottom: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✍️');
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('个人签名');
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请输入个人签名', text: this.signature });
            TextArea.width('100%');
            TextArea.height(100);
            TextArea.fontSize(15);
            TextArea.backgroundColor('#F5F5F5');
            TextArea.borderRadius(8);
            TextArea.padding(12);
            TextArea.onChange((value: string) => {
                this.signature = value;
            });
        }, TextArea);
        // 个人签名
        Column.pop();
        Column.pop();
        // 表单内容
        Scroll.pop();
        Column.pop();
    }
    buildInputItem(icon: string, label: string, value: string, onChange: (value: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(56);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 16, right: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: `请输入${label}`, text: value });
            TextInput.layoutWeight(1);
            TextInput.fontSize(16);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange(onChange);
        }, TextInput);
        Row.pop();
        Column.pop();
    }
    buildGenderButton(label: string, isSelected: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(label);
            Button.type(ButtonType.Normal);
            Button.fontSize(15);
            Button.fontColor(isSelected ? Color.White : '#666666');
            Button.backgroundColor(isSelected ? '#FF6B00' : '#F5F5F5');
            Button.borderRadius(20);
            Button.width(100);
            Button.height(40);
            Button.onClick(() => {
                this.gender = label;
            });
        }, Button);
        Button.pop();
    }
    async handleSave(): Promise<void> {
        this.isSaving = true;
        try {
            const currentUser = await this.dbManager.getCurrentUser();
            if (!currentUser) {
                promptAction.showToast({ message: '用户未登录', duration: 2000 });
                return;
            }
            // 更新用户信息
            this.viewModel.userInfo.userName = this.userName.trim();
            this.viewModel.userInfo.phone = this.phone.trim();
            this.viewModel.userInfo.email = this.email.trim();
            this.viewModel.userInfo.address = this.address.trim();
            this.viewModel.userInfo.gender = this.gender;
            this.viewModel.userInfo.birthday = this.birthday.trim();
            this.viewModel.userInfo.signature = this.signature.trim();
            // 保存到数据库
            await this.viewModel.saveUserInfo();
            promptAction.showToast({ message: '保存成功', duration: 2000 });
            // 延迟返回，让用户看到成功提示
            setTimeout(() => {
                router.back();
            }, 500);
        }
        catch (err) {
            const error = err as Error;
            promptAction.showToast({ message: `保存失败: ${error.message}`, duration: 2000 });
            Logger.error(TAG, `保存失败: ${error.message}`);
        }
        finally {
            this.isSaving = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EditProfilePage";
    }
}
registerNamedRoute(() => new EditProfilePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/EditProfilePage", pageFullPath: "entry/src/main/ets/userprofile/pages/EditProfilePage", integratedHsp: "false", moduleType: "followWithHap" });
