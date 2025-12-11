if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterFlowComponent_Params {
    bottomRectHeight?: number;
<<<<<<< HEAD
=======
    productData?: IProductItem[];
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
    datasource?: WaterFlowDataSource;
}
import type ProductItem from '../viewmodel/ProductItem';
import { WaterFlowDataSource } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/WaterFlowDataSource";
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import FlowItemComponent from "@bundle:com.huawei.waterflow/entry/ets/view/FlowItemComponent";
<<<<<<< HEAD
=======
import type { IProductItem } from '../viewmodel/ProductItem';
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
export default class WaterFlowComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
<<<<<<< HEAD
=======
        this.__productData = new SynchedPropertyObjectOneWayPU(params.productData, this, "productData");
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
        this.datasource = new WaterFlowDataSource();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterFlowComponent_Params) {
<<<<<<< HEAD
=======
        if (params.productData === undefined) {
            this.__productData.set(waterFlowData);
        }
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
        if (params.datasource !== undefined) {
            this.datasource = params.datasource;
        }
    }
    updateStateVars(params: WaterFlowComponent_Params) {
<<<<<<< HEAD
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bottomRectHeight.aboutToBeDeleted();
=======
        this.__productData.reset(params.productData);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__productData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bottomRectHeight.aboutToBeDeleted();
        this.__productData.aboutToBeDeleted();
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
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
<<<<<<< HEAD
    private datasource: WaterFlowDataSource;
    aboutToAppear() {
        this.datasource.setDataArray(waterFlowData);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            WaterFlow.create({ footer: (): void => this.itemFoot() });
            WaterFlow.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(37:5)", "entry");
            WaterFlow.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
            WaterFlow.layoutDirection(FlexDirection.Column);
            WaterFlow.columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE);
            WaterFlow.columnsGap({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            WaterFlow.rowsGap({ "id": 16777290, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, WaterFlow);
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    FlowItem.create();
                    FlowItem.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(39:9)", "entry");
                }, FlowItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FlowItemComponent(this, { item: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/WaterFlowComponent.ets", line: 40, col: 11 });
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
    }
    itemFoot(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(54:5)", "entry");
            Column.margin({
                top: { "id": 16777290, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: this.getUIContext().px2vp(this.bottomRectHeight)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777293, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(55:7)", "entry");
            Text.fontColor(Color.Gray);
            Text.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.width(Const.FULL_WIDTH);
            Text.height({ "id": 16777231, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
=======
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
                        WaterFlow.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(44:7)", "entry");
                        WaterFlow.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
                        WaterFlow.layoutDirection(FlexDirection.Column);
                        WaterFlow.columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE);
                        WaterFlow.columnsGap({ "id": 16777294, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        WaterFlow.rowsGap({ "id": 16777297, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    }, WaterFlow);
                    {
                        const __lazyForEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                FlowItem.create();
                                FlowItem.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(46:11)", "entry");
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
                        Column.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(58:7)", "entry");
                        Column.width(Const.FULL_WIDTH);
                        Column.layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777299, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(59:9)", "entry");
                        Text.fontColor(Color.Gray);
                        Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.textAlign(TextAlign.Center);
                        Text.margin({ top: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
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
                        Column.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(73:7)", "entry");
                        Column.margin({
                            top: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            bottom: this.getUIContext().px2vp(this.bottomRectHeight)
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/view/WaterFlowComponent.ets(74:9)", "entry");
                        Text.fontColor(Color.Gray);
                        Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Text.width(Const.FULL_WIDTH);
                        Text.height({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
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
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
    }
    rerender() {
        this.updateDirtyElements();
    }
}
