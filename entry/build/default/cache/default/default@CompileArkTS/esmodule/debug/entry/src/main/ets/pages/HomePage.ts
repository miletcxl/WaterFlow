if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    topRectHeight?: number;
    searchKeyword?: string;
    filteredData?: IProductItem[];
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import ClassifyComponent from "@bundle:com.huawei.waterflow/entry/ets/view/ClassifyComponent";
import SearchComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SearchComponent";
import SwiperComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SwiperComponent";
import WaterFlowComponent from "@bundle:com.huawei.waterflow/entry/ets/view/WaterFlowComponent";
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import type { IProductItem } from '../viewmodel/ProductItem';
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__searchKeyword = new ObservedPropertySimplePU('', this, "searchKeyword");
        this.__filteredData = new ObservedPropertyObjectPU(waterFlowData, this, "filteredData");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.searchKeyword !== undefined) {
            this.searchKeyword = params.searchKeyword;
        }
        if (params.filteredData !== undefined) {
            this.filteredData = params.filteredData;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__filteredData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__topRectHeight.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        this.__filteredData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    private __searchKeyword: ObservedPropertySimplePU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private __filteredData: ObservedPropertyObjectPU<IProductItem[]>;
    get filteredData() {
        return this.__filteredData.get();
    }
    set filteredData(newValue: IProductItem[]) {
        this.__filteredData.set(newValue);
    }
    aboutToAppear() {
        this.filteredData = waterFlowData;
    }
    /**
     * Filter products based on search keyword.
     */
    private filterProducts(keyword: string): void {
        if (!keyword || keyword.trim().length === 0) {
            this.filteredData = waterFlowData;
            return;
        }
        const lowerKeyword = keyword.toLowerCase().trim();
        this.filteredData = waterFlowData.filter((item: IProductItem) => {
            return item.name.toLowerCase().includes(lowerKeyword) ||
                item.price.toLowerCase().includes(lowerKeyword) ||
                (item.discount && item.discount.toLowerCase().includes(lowerKeyword)) ||
                (item.promotion && item.promotion.toLowerCase().includes(lowerKeyword));
        });
    }
    /**
     * Handle search keyword change.
     */
    private onSearchChange(keyword: string): void {
        this.searchKeyword = keyword;
        this.filterProducts(keyword);
    }
    /**
     * Handle search submit.
     */
    private onSearch(): void {
        this.filterProducts(this.searchKeyword);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777285, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.width(Const.FULL_WIDTH);
            Image.height({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                left: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: this.getUIContext().px2vp(this.topRectHeight)
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchComponent(this, {
                        searchKeyword: this.searchKeyword,
                        onSearchChange: (keyword: string) => {
                            this.onSearchChange(keyword);
                        },
                        onSearch: () => {
                            this.onSearch();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 79, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            searchKeyword: this.searchKeyword,
                            onSearchChange: (keyword: string) => {
                                this.onSearchChange(keyword);
                            },
                            onSearch: () => {
                                this.onSearch();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        searchKeyword: this.searchKeyword
                    });
                }
            }, { name: "SearchComponent" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ClassifyComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 88, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ClassifyComponent" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SwiperComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 89, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SwiperComponent" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new WaterFlowComponent(this, { productData: this.filteredData }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 90, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            productData: this.filteredData
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        productData: this.filteredData
                    });
                }
            }, { name: "WaterFlowComponent" });
        }
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
