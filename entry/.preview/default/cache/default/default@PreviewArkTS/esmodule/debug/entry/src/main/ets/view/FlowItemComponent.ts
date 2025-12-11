if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FlowItemComponent_Params {
    item?: ProductItem;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import type ProductItem from '../viewmodel/ProductItem';
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
export default class FlowItemComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.item = waterFlowData[0];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FlowItemComponent_Params) {
        if (params.item !== undefined) {
            this.item = params.item;
        }
    }
    updateStateVars(params: FlowItemComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private item: ProductItem;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(29:5)", "entry");
            Column.borderRadius({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            Column.padding({
                left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.item?.image_url);
            Image.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(30:7)", "entry");
            Image.width({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            Image.margin({
                top: { "id": 16777325, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777324, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item?.name);
            Text.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(38:7)", "entry");
            Text.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Normal);
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item?.discount);
            Text.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(43:7)", "entry");
            Text.fontSize({ "id": 16777316, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Normal);
            Text.opacity(Const.SIXTY_OPACITY);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({
                bottom: { "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item?.price);
            Text.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(52:7)", "entry");
            Text.fontSize({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor({ "id": 16777218, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Normal);
            Text.alignSelf(ItemAlign.Start);
            Text.lineHeight({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(58:7)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.item?.promotion) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.item?.promotion}`);
                        Text.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(60:11)", "entry");
                        Text.height({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.White);
                        Text.borderRadius({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.backgroundColor({ "id": 16777218, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.padding({
                            left: { "id": 16777304, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            right: { "id": 16777305, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                        });
                        Text.margin({
                            top: { "id": 16777303, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            right: { "id": 16777302, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                        });
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
            if (this.item?.bonus_points) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.item?.bonus_points}`);
                        Text.debugLine("entry/src/main/ets/view/FlowItemComponent.ets(76:11)", "entry");
                        Text.height({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777218, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.borderRadius({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.borderWidth({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.borderColor({ "id": 16777218, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.padding({
                            left: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            right: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
                        });
                        Text.margin({ top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
