if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchComponent_Params {
<<<<<<< HEAD
=======
    searchKeyword?: string;
    onSearchChange?: (keyword: string) => void;
    onSearch?: () => void;
    inputValue?: string;
    textInputKey?: number;
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
export default class SearchComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
<<<<<<< HEAD
=======
        this.__searchKeyword = new SynchedPropertySimpleOneWayPU(params.searchKeyword, this, "searchKeyword");
        this.onSearchChange = undefined;
        this.onSearch = undefined;
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.textInputKey = 0;
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchComponent_Params) {
<<<<<<< HEAD
    }
    updateStateVars(params: SearchComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/SearchComponent.ets(26:5)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
            Row.margin({ top: { "id": 16777275, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777320, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/SearchComponent.ets(27:7)", "entry");
            Image.width({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777274, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777299, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/SearchComponent.ets(34:7)", "entry");
            Text.fontSize({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            Text.opacity(Const.SIXTY_OPACITY);
            Text.fontWeight(FontWeight.Normal);
        }, Text);
        Text.pop();
=======
        if (params.searchKeyword === undefined) {
            this.__searchKeyword.set('');
        }
        if (params.onSearchChange !== undefined) {
            this.onSearchChange = params.onSearchChange;
        }
        if (params.onSearch !== undefined) {
            this.onSearch = params.onSearch;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.textInputKey !== undefined) {
            this.textInputKey = params.textInputKey;
        }
    }
    updateStateVars(params: SearchComponent_Params) {
        this.__searchKeyword.reset(params.searchKeyword);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchKeyword.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchKeyword: SynchedPropertySimpleOneWayPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private onSearchChange?: (keyword: string) => void;
    private onSearch?: () => void;
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private textInputKey: number;
    aboutToAppear() {
        this.inputValue = this.searchKeyword;
    }
    aboutToUpdate() {
        // 只在外部值被清空时才同步，避免打断用户输入
        if (this.searchKeyword === '' && this.inputValue !== '') {
            this.inputValue = '';
            // 通过改变key来强制重新创建TextInput，实现清空
            this.textInputKey++;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/SearchComponent.ets(45:5)", "entry");
            Row.width(Const.FULL_WIDTH);
            Row.height({ "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
            Row.margin({ top: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            Row.padding({ left: { "id": 16777280, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, right: { "id": 16777281, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/SearchComponent.ets(46:7)", "entry");
            Image.width({ "id": 16777285, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.height({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Image.margin({
                left: { "id": 16777280, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                right: { "id": 16777281, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777300, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/SearchComponent.ets(53:7)", "entry");
            TextInput.key(this.textInputKey.toString());
            TextInput.layoutWeight(1);
            TextInput.type(InputType.Normal);
            TextInput.fontSize({ "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            TextInput.fontColor(Color.Black);
            TextInput.placeholderColor(Color.Gray);
            TextInput.placeholderFont({ size: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, weight: FontWeight.Normal });
            TextInput.onChange((value: string) => {
                // 不绑定text属性，让TextInput自己管理状态，避免打断输入法
                this.inputValue = value;
                if (this.onSearchChange) {
                    this.onSearchChange(value);
                }
            });
            TextInput.onSubmit(() => {
                if (this.onSearch) {
                    this.onSearch();
                }
            });
            TextInput.maxLength(50);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.inputValue.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/SearchComponent.ets(75:9)", "entry");
                        Image.width({ "id": 16777285, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.height({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
                        Image.margin({ right: { "id": 16777281, "type": 10002, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
                        Image.onClick(() => {
                            this.inputValue = '';
                            // 通过改变key来强制重新创建TextInput，实现清空
                            this.textInputKey++;
                            if (this.onSearchChange) {
                                this.onSearchChange('');
                            }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
>>>>>>> c370204f5125b100f0718948c2e7d4cf123029c8
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
