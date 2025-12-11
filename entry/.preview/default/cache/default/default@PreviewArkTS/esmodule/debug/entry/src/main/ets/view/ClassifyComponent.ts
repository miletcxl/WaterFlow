if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClassifyComponent_Params {
    titleIndex?: number;
}
import { classifyTitle } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
export default class ClassifyComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__titleIndex = new ObservedPropertySimplePU(0, this, "titleIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClassifyComponent_Params) {
        if (params.titleIndex !== undefined) {
            this.titleIndex = params.titleIndex;
        }
    }
    updateStateVars(params: ClassifyComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __titleIndex: ObservedPropertySimplePU<number>;
    get titleIndex() {
        return this.__titleIndex.get();
    }
    set titleIndex(newValue: number) {
        this.__titleIndex.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(28:5)", "entry");
            Flex.width(Const.FULL_WIDTH);
            Flex.margin({ top: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number | undefined) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index !== undefined) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item);
                                Text.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(31:11)", "entry");
                                Text.fontSize({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                                Text.opacity(this.titleIndex === index ? Const.FULL_OPACITY : Const.EIGHTY_OPACITY);
                                Text.fontWeight(this.titleIndex === index ? Const.FONT_WEIGHT_FIVE : FontWeight.Normal);
                                Text.fontColor(Color.White);
                                Text.onClick(() => {
                                    this.titleIndex = index;
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
            };
            this.forEachUpdateFunction(elmtId, classifyTitle, forEachItemGenFunction, (item: Resource) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(42:7)", "entry");
            Row.onClick(() => {
                this.titleIndex = Const.INVALID_INDEX;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777380, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(43:9)", "entry");
            Image.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777378, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(46:9)", "entry");
            Image.width({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777359, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/ClassifyComponent.ets(53:9)", "entry");
            Text.fontSize({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.White);
            Text.opacity(this.titleIndex === Const.INVALID_INDEX ? Const.FULL_OPACITY : Const.EIGHTY_OPACITY);
            Text.fontWeight(this.titleIndex === Const.INVALID_INDEX ? Const.FONT_WEIGHT_FIVE : FontWeight.Normal);
        }, Text);
        Text.pop();
        Row.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
