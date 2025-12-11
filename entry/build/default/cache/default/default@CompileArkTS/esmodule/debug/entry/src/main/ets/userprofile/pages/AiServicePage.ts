if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AiServicePage_Params {
    messages?: ChatMessage[];
    inputText?: string;
    scroller?: Scroller;
    topRectHeight?: number;
}
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import type { BusinessError as BusinessError } from "@ohos:base";
class ChatMessage {
    content: ResourceStr = '';
    isSelf: boolean = false;
    timestamp?: string;
}
class AiServicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([
            { content: '您好！我是您的专属AI客服，请问有什么可以帮您？', isSelf: false },
            { content: '我想查询一下我的会员积分明细。', isSelf: true },
            { content: '没问题，正在为您查询，请稍候...', isSelf: false }
        ], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.scroller = new Scroller();
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AiServicePage_Params) {
        if (params.messages !== undefined) {
            this.messages = params.messages;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: AiServicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 预置几条消息，避免进来空荡荡
    private __messages: ObservedPropertyObjectPU<ChatMessage[]>;
    get messages() {
        return this.__messages.get();
    }
    set messages(newValue: ChatMessage[]) {
        this.__messages.set(newValue);
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    // 滚动控制器，用于发送消息后自动滚到底部
    private scroller: Scroller;
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F2F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.create();
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.width('100%');
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.height(56);
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.backgroundColor(Color.White);
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.padding({ top: this.getUIContext().px2vp(this.topRectHeight) });
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.shadow({ radius: 2, color: 'rgba(0,0,0,0.05)', offsetY: 1 });
            // 1. 顶部导航栏 (仿微信/通用App风格)
            Row.zIndex(1);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Row.create();
            // 返回按钮
            Row.height('100%');
            // 返回按钮
            Row.aspectRatio(1);
            // 返回按钮
            Row.justifyContent(FlexAlign.Center);
            // 返回按钮
            Row.alignItems(VerticalAlign.Center);
            // 返回按钮
            Row.onClick(() => {
                try {
                    router.back();
                }
                catch (err) {
                    console.error(`Router back failed: ${(err as BusinessError).message}`);
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('❮');
            Text.fontSize(20);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 返回按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create({ "id": 16777304, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            // 标题
            Text.fontSize(18);
            // 标题
            Text.fontWeight(FontWeight.Medium);
            // 标题
            Text.fontColor('#333333');
            // 标题
            Text.layoutWeight(1);
            // 标题
            Text.textAlign(TextAlign.Center);
            // 标题
            Text.padding({ right: 40 });
        }, Text);
        // 标题
        Text.pop();
        // 1. 顶部导航栏 (仿微信/通用App风格)
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 2. 聊天内容列表
            List.create({ scroller: this.scroller, initialIndex: this.messages.length - 1 });
            // 2. 聊天内容列表
            List.layoutWeight(1);
            // 2. 聊天内容列表
            List.backgroundColor('#F2F3F5');
            // 2. 聊天内容列表
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({ left: 16, right: 16, top: 10, bottom: 10 });
                            Row.justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            // --- AI 的头像 (左侧) ---
                            if (!item.isSelf) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('🤖');
                                        Text.fontSize(24);
                                        Text.width(40);
                                        Text.height(40);
                                        Text.textAlign(TextAlign.Center);
                                        Text.backgroundColor(Color.White);
                                        Text.borderRadius(20);
                                        Text.margin({ right: 10 });
                                        Text.alignSelf(ItemAlign.Start);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 占位，保持布局平衡，或者直接不写
                                        Blank.create();
                                        // 占位，保持布局平衡，或者直接不写
                                        Blank.width(50);
                                    }, Blank);
                                    // 占位，保持布局平衡，或者直接不写
                                    Blank.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // --- 消息气泡 ---
                            Column.create();
                            // --- 消息气泡 ---
                            Column.backgroundColor(item.isSelf ? '#FF8A3C' : '#FFFFFF');
                            // --- 消息气泡 ---
                            Column.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                            // --- 消息气泡 ---
                            Column.borderRadius({
                                topLeft: item.isSelf ? 16 : 4,
                                topRight: item.isSelf ? 4 : 16,
                                bottomLeft: 16,
                                bottomRight: 16
                            });
                            // --- 消息气泡 ---
                            Column.shadow(item.isSelf ? undefined : {
                                radius: 4,
                                color: 'rgba(0,0,0,0.05)',
                                offsetY: 2
                            });
                            // --- 消息气泡 ---
                            Column.layoutWeight(1);
                            // --- 消息气泡 ---
                            Column.constraintSize({ maxWidth: '70%' });
                            // --- 消息气泡 ---
                            Column.alignItems(item.isSelf ? HorizontalAlign.End : HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.content);
                            Text.fontSize(15);
                            Text.fontColor(item.isSelf ? Color.White : '#333333');
                            Text.lineHeight(24);
                        }, Text);
                        Text.pop();
                        // --- 消息气泡 ---
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            // --- 用户的头像 (右侧) ---
                            if (item.isSelf) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('🤠');
                                        Text.fontSize(24);
                                        Text.width(40);
                                        Text.height(40);
                                        Text.textAlign(TextAlign.Center);
                                        Text.backgroundColor('#FFEFE2');
                                        Text.borderRadius(20);
                                        Text.margin({ left: 10 });
                                        Text.alignSelf(ItemAlign.Start);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Blank.create();
                                        Blank.width(50);
                                    }, Blank);
                                    Blank.pop();
                                });
                            }
                        }, If);
                        If.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.messages, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // 底部留白，防止最后一条消息被输入框遮挡
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // 底部留白，防止最后一条消息被输入框遮挡
                ListItem.height(20);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                // 底部留白，防止最后一条消息被输入框遮挡
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 底部留白，防止最后一条消息被输入框遮挡
            ListItem.pop();
        }
        // 2. 聊天内容列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 3. 底部输入栏
            Row.create();
            // 3. 底部输入栏
            Row.width('100%');
            // 3. 底部输入栏
            Row.padding({ left: 16, right: 16, top: 10, bottom: 20 });
            // 3. 底部输入栏
            Row.backgroundColor(Color.White);
            // 3. 底部输入栏
            Row.shadow({ radius: 10, color: 'rgba(0,0,0,0.05)', offsetY: -2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 输入框
            TextInput.create({
                text: this.inputText,
                placeholder: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }
            });
            // 输入框
            TextInput.layoutWeight(1);
            // 输入框
            TextInput.height(40);
            // 输入框
            TextInput.backgroundColor('#F7F8FA');
            // 输入框
            TextInput.borderRadius(20);
            // 输入框
            TextInput.padding({ left: 16, right: 16 });
            // 输入框
            TextInput.enterKeyType(EnterKeyType.Send);
            // 输入框
            TextInput.onChange((value: string) => {
                this.inputText = value;
            });
            // 输入框
            TextInput.onSubmit(() => {
                this.sendMessage();
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 发送按钮
            Button.createWithLabel('发送');
            // 发送按钮
            Button.type(ButtonType.Capsule);
            // 发送按钮
            Button.backgroundColor(this.inputText.trim().length > 0 ? '#E95B27' : '#FFCBA4');
            // 发送按钮
            Button.fontSize(14);
            // 发送按钮
            Button.height(36);
            // 发送按钮
            Button.width(70);
            // 发送按钮
            Button.margin({ left: 12 });
            // 发送按钮
            Button.enabled(this.inputText.trim().length > 0);
            // 发送按钮
            Button.onClick(() => {
                this.sendMessage();
            });
        }, Button);
        // 发送按钮
        Button.pop();
        // 3. 底部输入栏
        Row.pop();
        Column.pop();
    }
    private sendMessage(): void {
        if (!this.inputText || this.inputText.trim().length === 0) {
            try {
                promptAction.showToast({ message: { "id": 16777301, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            }
            catch (e) {
                // ignore
            }
            return;
        }
        // 1. 添加自己的消息
        const selfMsg: ChatMessage = { content: this.inputText.trim(), isSelf: true };
        this.messages.push(selfMsg);
        // 清空输入框
        this.inputText = '';
        // 2. 滚动到底部
        this.scrollToBottom();
        // 3. 模拟 AI 回复 (延迟一点点，更真实)
        setTimeout(() => {
            const aiMsg: ChatMessage = {
                content: { "id": 16777302, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" },
                isSelf: false
            };
            this.messages.push(aiMsg);
            this.scrollToBottom();
        }, 500);
    }
    private scrollToBottom() {
        // 使用 scroller 滚动到底部
        this.scroller.scrollEdge(Edge.Bottom);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AiServicePage";
    }
}
registerNamedRoute(() => new AiServicePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/AiServicePage", pageFullPath: "entry/src/main/ets/userprofile/pages/AiServicePage", integratedHsp: "false", moduleType: "followWithHap" });
