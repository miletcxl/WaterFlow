if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SwiperComponent_Params {
    dotIndicator?: DotIndicator;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import { swiperImage } from "@bundle:com.huawei.waterflow/entry/ets/viewmodel/HomeViewModel";
export default class SwiperComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dotIndicator = new DotIndicator();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperComponent_Params) {
        if (params.dotIndicator !== undefined) {
            this.dotIndicator = params.dotIndicator;
        }
    }
    updateStateVars(params: SwiperComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dotIndicator: DotIndicator;
    aboutToAppear() {
<<<<<<< HEAD
        this.dotIndicator.selectedColor({ "id": 16777220, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
=======
        this.dotIndicator.selectedColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/view/SwiperComponent.ets(33:5)", "entry");
            Swiper.indicator(this.dotIndicator);
            Swiper.autoPlay(true);
            Swiper.itemSpace(0);
            Swiper.width(Const.FULL_WIDTH);
            Swiper.displayCount(1);
            Swiper.margin({
<<<<<<< HEAD
                top: { "id": 16777285, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
=======
                top: { "id": 16777292, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                bottom: { "id": 16777291, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
            });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item);
                    Image.debugLine("entry/src/main/ets/view/SwiperComponent.ets(35:9)", "entry");
                    Image.width(Const.FULL_WIDTH);
<<<<<<< HEAD
                    Image.height({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Image.borderRadius({ "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
=======
                    Image.height({ "id": 16777290, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                    Image.borderRadius({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
                    Image.backgroundColor(Color.White);
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, swiperImage, forEachItemGenFunction, (item: Resource) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
