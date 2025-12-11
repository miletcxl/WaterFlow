if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfileItemComponent_Params {
    /**
     * Menu item data.
     */
    menuItem?: ProfileMenuItem;
    /**
     * Click callback.
     */
    onItemClick?: (actionType: string) => void;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { ProfileMenuItem } from "@bundle:com.huawei.waterflow/entry/ets/userprofile/model/UserInfo";
export default class ProfileItemComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.menuItem = new ProfileMenuItem();
        this.onItemClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfileItemComponent_Params) {
        if (params.menuItem !== undefined) {
            this.menuItem = params.menuItem;
        }
        if (params.onItemClick !== undefined) {
            this.onItemClick = params.onItemClick;
        }
    }
    updateStateVars(params: ProfileItemComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * Menu item data.
     */
    private menuItem: ProfileMenuItem;
    /**
     * Click callback.
     */
    private onItemClick?: (actionType: string) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.FULL_WIDTH);
            Row.height({ "id": 16777363, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.padding({
                left: { "id": 16777368, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777368, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
            Row.alignItems(VerticalAlign.Center);
            Row.backgroundColor(Color.White);
            Row.onClick(() => {
                if (this.onItemClick) {
                    this.onItemClick(this.menuItem.actionType);
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Icon with background circle
            if (this.menuItem.icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create({ alignContent: Alignment.Center });
                        Stack.margin({ right: { "id": 16777361, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: { "id": 16777360, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, height: { "id": 16777360, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                        Circle.fill({ "id": 16777335, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.menuItem.icon);
                        Image.width({ "id": 16777362, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.height({ "id": 16777362, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    }, Image);
                    Stack.pop();
                });
            }
            // Title
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title
            Text.create(this.menuItem.title);
            // Title
            Text.fontSize({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // Title
            Text.fontColor(Color.Black);
            // Title
            Text.fontWeight(FontWeight.Medium);
            // Title
            Text.layoutWeight(1);
        }, Text);
        // Title
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Arrow
            if (this.menuItem.showArrow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.width({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.fillColor({ "id": 16777340, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    }, Image);
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
}
