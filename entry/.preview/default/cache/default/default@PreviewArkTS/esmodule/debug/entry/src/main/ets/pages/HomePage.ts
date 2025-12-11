if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    topRectHeight?: number;
<<<<<<< HEAD
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import router from "@ohos:router";
=======
    searchKeyword?: string;
    filteredData?: IProductItem[];
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
import ClassifyComponent from "@bundle:com.huawei.waterflow/entry/ets/view/ClassifyComponent";
import SearchComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SearchComponent";
import SwiperComponent from "@bundle:com.huawei.waterflow/entry/ets/view/SwiperComponent";
import WaterFlowComponent from "@bundle:com.huawei.waterflow/entry/ets/view/WaterFlowComponent";
<<<<<<< HEAD
import UserIconComponent from "@bundle:com.huawei.waterflow/entry/ets/userprofile/view/UserIconComponent";
=======
import { waterFlowData } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
import type { IProductItem } from '../viewmodel/ProductItem';
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
<<<<<<< HEAD
=======
        this.__searchKeyword = new ObservedPropertySimplePU('', this, "searchKeyword");
        this.__filteredData = new ObservedPropertyObjectPU(waterFlowData, this, "filteredData");
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
<<<<<<< HEAD
=======
        if (params.searchKeyword !== undefined) {
            this.searchKeyword = params.searchKeyword;
        }
        if (params.filteredData !== undefined) {
            this.filteredData = params.filteredData;
        }
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
<<<<<<< HEAD
    }
    aboutToBeDeleted() {
        this.__topRectHeight.aboutToBeDeleted();
=======
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__filteredData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__topRectHeight.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        this.__filteredData.aboutToBeDeleted();
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
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
<<<<<<< HEAD
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/pages/HomePage.ets(35:5)", "entry");
            Stack.backgroundColor({ "id": 16777219, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777308, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/HomePage.ets(36:7)", "entry");
            Image.width(Const.FULL_WIDTH);
            Image.height({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
=======
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
            Stack.debugLine("entry/src/main/ets/pages/HomePage.ets(73:5)", "entry");
            Stack.backgroundColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/HomePage.ets(74:7)", "entry");
            Image.width(Const.FULL_WIDTH);
            Image.height({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
<<<<<<< HEAD
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(40:7)", "entry");
            Column.padding({
                left: { "id": 16777233, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777234, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                top: this.getUIContext().px2vp(this.topRectHeight)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏：搜索框和个人信息入口
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(42:9)", "entry");
            // 顶部导航栏：搜索框和个人信息入口
            Row.width(Const.FULL_WIDTH);
            // 顶部导航栏：搜索框和个人信息入口
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 43, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SearchComponent" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.shadow({
                radius: 4,
                color: '#15000000',
                offsetX: 0,
                offsetY: 2
            });
            __Common__.margin({ left: { "id": 16777324, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            __Common__.onClick(() => {
                router.pushUrl({
                    url: 'userprofile/pages/ProfilePage'
                }).catch((err: Error) => {
                    console.error(`Failed to navigate to profile page. Code: ${err.message}`);
                });
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 个人信息入口按钮 - 圆形图标加文字
                    UserIconComponent(this, {
                        iconColor: { "id": 16777360, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                        iconSize: 40,
                        text: '我'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 46, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            iconColor: { "id": 16777360, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                            iconSize: 40,
                            text: '我'
=======
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(78:7)", "entry");
            Column.padding({
                left: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
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
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
<<<<<<< HEAD
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "UserIconComponent" });
        }
        __Common__.pop();
        // 顶部导航栏：搜索框和个人信息入口
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ClassifyComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 68, col: 9 });
=======
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
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
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
<<<<<<< HEAD
                    let componentCall = new SwiperComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 69, col: 9 });
=======
                    let componentCall = new SwiperComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 89, col: 9 });
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
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
<<<<<<< HEAD
                    let componentCall = new WaterFlowComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 70, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
=======
                    let componentCall = new WaterFlowComponent(this, { productData: this.filteredData }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HomePage.ets", line: 90, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            productData: this.filteredData
                        };
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
<<<<<<< HEAD
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
=======
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        productData: this.filteredData
                    });
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
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
