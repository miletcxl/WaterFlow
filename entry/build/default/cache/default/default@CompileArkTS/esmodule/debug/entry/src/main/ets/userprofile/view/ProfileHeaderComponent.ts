if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileHeaderComponent_Params {
    userInfo?: UserInfo;
}
import router from "@ohos:router";
import type { UserInfo } from '../model/UserInfo';
export default class ProfileHeaderComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userInfo = new SynchedPropertyNesedObjectPU(params.userInfo, this, "userInfo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileHeaderComponent_Params) {
        this.__userInfo.set(params.userInfo);
    }
    updateStateVars(params: ProfileHeaderComponent_Params) {
        this.__userInfo.set(params.userInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 接收父组件传来的用户信息
    private __userInfo: SynchedPropertyNesedObjectPU<UserInfo>;
    get userInfo() {
        return this.__userInfo.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // --- 头像区域 ---
            Stack.create({ alignContent: Alignment.BottomEnd });
            // --- 头像区域 ---
            Stack.margin({ right: 16 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.create({ "id": 16777385, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.width(64);
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.height(64);
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.borderRadius(32);
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.objectFit(ImageFit.Cover);
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.border({ width: 2, color: Color.White });
            // 1. 头像图片
            // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
            // 或者暂时改回 $r('app.media.app_icon')
            Image.backgroundColor('#CCCCCC');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 2. 右下角编辑小图标
            Text.create('✏️');
            // 2. 右下角编辑小图标
            Text.fontSize(12);
            // 2. 右下角编辑小图标
            Text.textAlign(TextAlign.Center);
            // 2. 右下角编辑小图标
            Text.width(20);
            // 2. 右下角编辑小图标
            Text.height(20);
            // 2. 右下角编辑小图标
            Text.backgroundColor('#333333');
            // 2. 右下角编辑小图标
            Text.fontColor(Color.White);
            // 2. 右下角编辑小图标
            Text.borderRadius(10);
            // 2. 右下角编辑小图标
            Text.border({ width: 1, color: Color.White });
            // 2. 右下角编辑小图标
            Text.margin({ bottom: 0, right: 0 });
            // 2. 右下角编辑小图标
            Text.onClick(() => {
                router.pushUrl({
                    url: 'userprofile/pages/EditProfilePage'
                }).catch((err: Error) => {
                    console.error(`跳转编辑页失败: ${err.message}`);
                });
            });
        }, Text);
        // 2. 右下角编辑小图标
        Text.pop();
        // --- 头像区域 ---
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // --- 文字信息区域 ---
            Column.create();
            // --- 文字信息区域 ---
            Column.alignItems(HorizontalAlign.Start);
            // --- 文字信息区域 ---
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 昵称
            Text.create(this.userInfo.userName || '张三');
            // 昵称
            Text.fontSize(20);
            // 昵称
            Text.fontColor(Color.White);
            // 昵称
            Text.fontWeight(FontWeight.Bold);
            // 昵称
            Text.margin({ bottom: 6 });
        }, Text);
        // 昵称
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 个人简介或ID
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`ID: ${this.userInfo.userId || '未设置'}`);
            Text.fontSize(12);
            Text.fontColor('rgba(255,255,255,0.8)');
            Text.margin({ right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 复制图标
            Text.create('❐');
            // 复制图标
            Text.fontSize(12);
            // 复制图标
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        // 复制图标
        Text.pop();
        // 个人简介或ID
        Row.pop();
        // --- 文字信息区域 ---
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
