if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileHeaderComponent_Params {
    /**
     * User information.
     */
    userInfo?: UserInfo;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { UserInfo } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
export default class ProfileHeaderComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.userInfo = new UserInfo();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileHeaderComponent_Params) {
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
    }
    updateStateVars(params: ProfileHeaderComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * User information.
     */
    private userInfo: UserInfo;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(31:5)", "entry");
            Column.width(Const.FULL_WIDTH);
            Column.padding({
                left: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Avatar with border and shadow
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(33:7)", "entry");
            // Avatar with border and shadow
            Stack.margin({ top: { "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.userInfo.avatar) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.userInfo.avatar);
                        Image.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(35:11)", "entry");
                        Image.width({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.height({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.borderRadius({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.objectFit(ImageFit.Cover);
                        Image.border({
                            width: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            color: Color.White
                        });
                        Image.shadow({
                            radius: { "id": 16777261, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            color: { "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            offsetX: 0,
                            offsetY: 4
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Default avatar placeholder with gradient
                        Column.create();
                        Column.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(52:11)", "entry");
                        // Default avatar placeholder with gradient
                        Column.width({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        // Default avatar placeholder with gradient
                        Column.height({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        // Default avatar placeholder with gradient
                        Column.borderRadius({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        // Default avatar placeholder with gradient
                        Column.linearGradient({
                            angle: 135,
                            colors: [[{ "id": 16777223, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 0.0], [{ "id": 16777222, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, 1.0]]
                        });
                        // Default avatar placeholder with gradient
                        Column.border({
                            width: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            color: Color.White
                        });
                        // Default avatar placeholder with gradient
                        Column.shadow({
                            radius: { "id": 16777261, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            color: { "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            offsetX: 0,
                            offsetY: 4
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.userInfo.userName.length > 0 ? this.userInfo.userName.charAt(0) : 'U');
                        Text.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(53:13)", "entry");
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    // Default avatar placeholder with gradient
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // Avatar with border and shadow
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // User name
            Text.create(this.userInfo.userName || { "id": 16777338, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(80:7)", "entry");
            // User name
            Text.fontSize({ "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // User name
            Text.fontColor(Color.White);
            // User name
            Text.fontWeight(FontWeight.Bold);
            // User name
            Text.margin({ top: { "id": 16777285, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Text);
        // User name
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Signature
            if (this.userInfo.signature) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.userInfo.signature);
                        Text.debugLine("entry/src/main/ets/userprofile/view/ProfileHeaderComponent.ets(88:9)", "entry");
                        Text.fontSize({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.White);
                        Text.opacity(0.9);
                        Text.margin({ top: { "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                        Text.maxLines(2);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
