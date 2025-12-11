if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AiServicePage_Params {
    messages?: ChatMessage[];
    inputText?: string;
}
import { CommonConstants as Const } from "@bundle:com.huawei.waterflow/entry/ets/common/constants/CommonConstants";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
class ChatMessage {
    content: ResourceStr = '';
    isSelf: boolean = false;
}
class AiServicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
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
    }
    updateStateVars(params: AiServicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(20:5)", "entry");
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.backgroundColor('#F6F7FB');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(22:7)", "entry");
            // Header
            Row.width(Const.FULL_WIDTH);
            // Header
            Row.padding({ left: 16, right: 16, top: 12, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(23:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(27:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关闭');
            Text.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(28:9)", "entry");
            Text.fontSize(14);
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        // Header
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Messages
            List.create();
            List.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(39:7)", "entry");
            // Messages
            List.layoutWeight(1);
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
                        ListItem.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(41:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(42:13)", "entry");
                            Row.width(Const.FULL_WIDTH);
                            Row.padding({ left: 16, right: 16, top: 6, bottom: 6 });
                            Row.justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (!item.isSelf) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('AI');
                                        Text.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(44:17)", "entry");
                                        Text.fontSize(12);
                                        Text.fontColor(Color.White);
                                        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
                                        Text.backgroundColor('#5B7BFA');
                                        Text.borderRadius(12);
                                        Text.margin({ right: 8 });
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
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(52:15)", "entry");
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.content);
                            Text.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(53:17)", "entry");
                            Text.fontSize(14);
                            Text.fontColor(Color.Black);
                            Text.backgroundColor(item.isSelf ? '#E9EDFF' : '#F6F7FB');
                            Text.padding({ left: 12, right: 12, top: 10, bottom: 10 });
                            Text.borderRadius(12);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (item.isSelf) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Blank.create();
                                        Blank.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(62:17)", "entry");
                                    }, Blank);
                                    Blank.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
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
        // Messages
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Input bar
            Row.create();
            Row.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(74:7)", "entry");
            // Input bar
            Row.width(Const.FULL_WIDTH);
            // Input bar
            Row.padding({ left: 16, right: 16, top: 10, bottom: 12 });
            // Input bar
            Row.backgroundColor('#F6F7FB');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.inputText, placeholder: { "id": 16777331, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(75:9)", "entry");
            TextInput.width('70%');
            TextInput.height(40);
            TextInput.backgroundColor(Color.White);
            TextInput.borderRadius(12);
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((value: string) => {
                this.inputText = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(84:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发送');
            Text.debugLine("entry/src/main/ets/userprofile/pages/AiServicePage.ets(85:9)", "entry");
            Text.fontSize(14);
            Text.fontColor(Color.White);
            Text.padding({ left: 14, right: 14, top: 10, bottom: 10 });
            Text.backgroundColor('#5B7BFA');
            Text.borderRadius(12);
            Text.onClick(() => {
                this.sendMessage();
            });
        }, Text);
        Text.pop();
        // Input bar
        Row.pop();
        Column.pop();
    }
    private sendMessage(): void {
        if (!this.inputText || this.inputText.trim().length === 0) {
            promptAction.showToast({ message: { "id": 16777329, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" } });
            return;
        }
        // Append self message
        const selfMsg: ChatMessage = { content: this.inputText.trim(), isSelf: true };
        this.messages.push(selfMsg);
        // Mock AI reply
        const aiMsg: ChatMessage = { content: { "id": 16777330, "type": 10003, params: [], "bundleName": "com.huawei.waterflow", "moduleName": "entry" }, isSelf: false };
        this.messages.push(aiMsg);
        this.inputText = '';
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AiServicePage";
    }
}
registerNamedRoute(() => new AiServicePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/AiServicePage", pageFullPath: "entry/src/main/ets/userprofile/pages/AiServicePage", integratedHsp: "false", moduleType: "followWithHap" });
