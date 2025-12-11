if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterFlowComponent_Params {
    bottomRectHeight?: number;
    productData?: IProductItem[];
    datasource?: WaterFlowDataSource;
}
import type ProductItem from '../viewmodel/ProductItem';
import { WaterFlowDataSource } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/WaterFlowDataSource";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import FlowItemComponent from "@bundle:com.huawei.waterflow/entry/ets/view/FlowItemComponent";
import type { IProductItem } from '../viewmodel/ProductItem';
export default class WaterFlowComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.__productData = new SynchedPropertyObjectOneWayPU(params.productData, this, "productData");
        this.datasource = new WaterFlowDataSource();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterFlowComponent_Params) {
        if (params.productData === undefined) {
            this.__productData.set(waterFlowData);
        }
        if (params.datasource !== undefined) {
            this.datasource = params.datasource;
        }
    }
    updateStateVars(params: WaterFlowComponent_Params) {
        this.__productData.reset(params.productData);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__productData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bottomRectHeight.aboutToBeDeleted();
        this.__productData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    private __productData: SynchedPropertySimpleOneWayPU<IProductItem[]>;
    get productData() {
        return this.__productData.get();
    }
    set productData(newValue: IProductItem[]) {
        this.__productData.set(newValue);
    }
    private datasource: WaterFlowDataSource;
    aboutToAppear() {
        this.datasource.setDataArray(this.productData);
    }
    aboutToUpdate() {
        this.datasource.setDataArray(this.productData);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.productData.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        WaterFlow.create({ footer: (): void => this.itemFoot() });
                        WaterFlow.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
                        WaterFlow.layoutDirection(FlexDirection.Column);
                        WaterFlow.columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE);
                        WaterFlow.columnsGap({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        WaterFlow.rowsGap({ "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    }, WaterFlow);
                    {
                        const __lazyForEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                FlowItem.create();
                            }, FlowItem);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new FlowItemComponent(this, { item: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/WaterFlowComponent.ets", line: 47, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                item: item
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "FlowItemComponent" });
                            }
                            FlowItem.pop();
                        };
                        const __lazyForEachItemIdFunc = (item: ProductItem) => JSON.stringify(item);
                        LazyForEach.create("1", this, this.datasource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                        LazyForEach.pop();
                    }
                    WaterFlow.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(Const.FULL_WIDTH);
                        Column.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.Gray);
                        Text.fontSize({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.textAlign(TextAlign.Center);
                        Text.margin({ top: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
    }
    itemFoot(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.productData.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({
                            top: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            bottom: this.getUIContext().px2vp(this.bottomRectHeight)
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.fontColor(Color.Gray);
                        Text.fontSize({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.width(Const.FULL_WIDTH);
                        Text.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
