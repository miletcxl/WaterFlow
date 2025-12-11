if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BackIconComponent_Params {
    iconColor?: ResourceColor;
    iconSize?: number;
}
export default class BackIconComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.iconColor = Color.White;
        this.iconSize = 24;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BackIconComponent_Params) {
        if (params.iconColor !== undefined) {
            this.iconColor = params.iconColor;
        }
        if (params.iconSize !== undefined) {
            this.iconSize = params.iconSize;
        }
    }
    updateStateVars(params: BackIconComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private iconColor: ResourceColor;
    private iconSize: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.debugLine("entry/src/main/ets/userprofile/view/BackIconComponent.ets(25:5)", "entry");
            Stack.width(this.iconSize);
            Stack.height(this.iconSize);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.create();
            Path.debugLine("entry/src/main/ets/userprofile/view/BackIconComponent.ets(27:7)", "entry");
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.width(this.iconSize);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.height(this.iconSize);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.commands(`M${this.iconSize * 0.7} ${this.iconSize * 0.25} L${this.iconSize * 0.3} ${this.iconSize * 0.5} L${this.iconSize * 0.7} ${this.iconSize * 0.75}`);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.strokeWidth(3);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.stroke(this.iconColor);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.fill(Color.Transparent);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.strokeLineCap(LineCapStyle.Round);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.strokeLineJoin(LineJoinStyle.Round);
            // 使用Path绘制精美的返回箭头，更粗更清晰
            Path.antiAlias(true);
        }, Path);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
