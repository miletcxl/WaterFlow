if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserIconComponent_Params {
    iconColor?: ResourceColor;
    iconSize?: number;
    text?: string;
}
export default class UserIconComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.iconColor = Color.Black;
        this.iconSize = 24;
        this.text = '我';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserIconComponent_Params) {
        if (params.iconColor !== undefined) {
            this.iconColor = params.iconColor;
        }
        if (params.iconSize !== undefined) {
            this.iconSize = params.iconSize;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    updateStateVars(params: UserIconComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private iconColor: ResourceColor;
    private iconSize: number;
    private text: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("entry/src/main/ets/userprofile/view/UserIconComponent.ets(26:5)", "entry");
            Stack.width(this.iconSize);
            Stack.height(this.iconSize);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 圆形背景
            Circle.create({ width: this.iconSize, height: this.iconSize });
            Circle.debugLine("entry/src/main/ets/userprofile/view/UserIconComponent.ets(28:7)", "entry");
            // 圆形背景
            Circle.fill(this.iconColor);
            // 圆形背景
            Circle.opacity(0.15);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文字
            Text.create(this.text);
            Text.debugLine("entry/src/main/ets/userprofile/view/UserIconComponent.ets(32:7)", "entry");
            // 文字
            Text.fontSize(this.iconSize * 0.5);
            // 文字
            Text.fontColor(this.iconColor);
            // 文字
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        // 文字
        Text.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
