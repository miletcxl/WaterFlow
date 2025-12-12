if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AiServicePage_Params {
    messages?: ChatMessage[];
    inputText?: string;
    keyboardHeight?: number;
    statusBarHeight?: number;
    scroller?: Scroller;
    THEME_COLOR?: string;
    BG_COLOR?: string;
    context?;
}
import router from "@ohos:router";
import window from "@ohos:window";
import type common from "@ohos:app.ability.common";
// 消息数据模型
class ChatMessage {
    content: string = '';
    isSelf: boolean = false;
}
class AiServicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([
            { content: '👋 您好！我是您的专属导购助手。', isSelf: false },
            { content: '有什么可以帮您？我可以为您查询订单📦、领取优惠券🎫或解答售后问题。', isSelf: false }
        ], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__keyboardHeight = new ObservedPropertySimplePU(0, this, "keyboardHeight");
        this.__statusBarHeight = new ObservedPropertySimplePU(38, this, "statusBarHeight");
        this.scroller = new Scroller();
        this.THEME_COLOR = '#FF6B00';
        this.BG_COLOR = '#F2F3F5';
        this.context = getContext(this) as common.UIAbilityContext;
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
        if (params.keyboardHeight !== undefined) {
            this.keyboardHeight = params.keyboardHeight;
        }
        if (params.statusBarHeight !== undefined) {
            this.statusBarHeight = params.statusBarHeight;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.THEME_COLOR !== undefined) {
            this.THEME_COLOR = params.THEME_COLOR;
        }
        if (params.BG_COLOR !== undefined) {
            this.BG_COLOR = params.BG_COLOR;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: AiServicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__keyboardHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__statusBarHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__keyboardHeight.aboutToBeDeleted();
        this.__statusBarHeight.aboutToBeDeleted();
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
    // 【核心】手动控制键盘避让高度
    private __keyboardHeight: ObservedPropertySimplePU<number>;
    get keyboardHeight() {
        return this.__keyboardHeight.get();
    }
    set keyboardHeight(newValue: number) {
        this.__keyboardHeight.set(newValue);
    }
    // 【核心】状态栏高度（预设值，稍后会动态获取）
    private __statusBarHeight: ObservedPropertySimplePU<number>;
    get statusBarHeight() {
        return this.__statusBarHeight.get();
    }
    set statusBarHeight(newValue: number) {
        this.__statusBarHeight.set(newValue);
    }
    private scroller: Scroller;
    private readonly THEME_COLOR: string;
    private readonly BG_COLOR: string;
    // 获取上下文
    private context;
    aboutToAppear(): void {
        // 1. 获取当前窗口实例
        window.getLastWindow(this.context).then((win) => {
            // A. 开启全屏沉浸式（为了好看），但我们需要手动留出状态栏位置
            win.setWindowLayoutFullScreen(true);
            // B. 动态获取真实的状态栏高度 (避让刘海/挖孔)
            try {
                let area = win.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
                if (area.topRect.height > 0) {
                    this.statusBarHeight = px2vp(area.topRect.height);
                }
            }
            catch (e) {
                // 获取失败用默认值
            }
            // C. 【关键】监听键盘高度变化
            // 我们自己处理布局，不让系统乱动
            win.on('keyboardHeightChange', (data) => {
                let newHeight = px2vp(data);
                this.keyboardHeight = newHeight;
                // 键盘弹起时，列表滚到底部
                if (newHeight > 0) {
                    setTimeout(() => {
                        this.scroller.scrollEdge(Edge.Bottom);
                    }, 100);
                }
            });
        });
    }
    aboutToDisappear(): void {
        // 移除监听
        window.getLastWindow(this.context).then((win) => {
            win.off('keyboardHeightChange');
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用 Flex 容器，direction 设为 Column
            // Flex 在处理键盘挤压时表现更稳定
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Stretch });
            // 使用 Flex 容器，direction 设为 Column
            // Flex 在处理键盘挤压时表现更稳定
            Flex.width('100%');
            // 使用 Flex 容器，direction 设为 Column
            // Flex 在处理键盘挤压时表现更稳定
            Flex.height('100%');
            // 使用 Flex 容器，direction 设为 Column
            // Flex 在处理键盘挤压时表现更稳定
            Flex.backgroundColor(this.BG_COLOR);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===============================================
            // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
            // ===============================================
            Column.create();
            // ===============================================
            // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
            // ===============================================
            Column.width('100%');
            // ===============================================
            // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
            // ===============================================
            Column.backgroundColor(this.THEME_COLOR);
            // ===============================================
            // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
            // ===============================================
            Column.shadow({ radius: 4, color: '#1A000000', offsetY: 2 });
            // ===============================================
            // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
            // ===============================================
            Column.zIndex(99);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 1.1 状态栏占位层 (高度动态适配)
            // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
            Row.create();
            // 1.1 状态栏占位层 (高度动态适配)
            // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
            Row.height(this.statusBarHeight);
            // 1.1 状态栏占位层 (高度动态适配)
            // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
            Row.width('100%');
            // 1.1 状态栏占位层 (高度动态适配)
            // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
            Row.backgroundColor(this.THEME_COLOR);
        }, Row);
        // 1.1 状态栏占位层 (高度动态适配)
        // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
        Row.pop();
        // 1.2 真正的标题栏内容
        this.buildHeaderContent.bind(this)();
        // ===============================================
        // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
        // ===============================================
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===============================================
            // 2. 中间消息列表 (弹性伸缩)
            // ===============================================
            // flexGrow(1) 确保它占据剩余的所有空间
            Column.create();
            // ===============================================
            // 2. 中间消息列表 (弹性伸缩)
            // ===============================================
            // flexGrow(1) 确保它占据剩余的所有空间
            Column.width('100%');
            // ===============================================
            // 2. 中间消息列表 (弹性伸缩)
            // ===============================================
            // flexGrow(1) 确保它占据剩余的所有空间
            Column.flexGrow(1);
            // ===============================================
            // 2. 中间消息列表 (弹性伸缩)
            // ===============================================
            // flexGrow(1) 确保它占据剩余的所有空间
            Column.backgroundColor(this.BG_COLOR);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ scroller: this.scroller, space: 16 });
            List.width('100%');
            List.height('100%');
            List.edgeEffect(EdgeEffect.Spring);
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // 顶部的一点留白
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // 顶部的一点留白
                ListItem.height(10);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                // 顶部的一点留白
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 顶部的一点留白
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // 安全提示
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
                    Row.justifyContent(FlexAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('🛡️ 官方认证 · 信息加密传输中');
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                }, Text);
                Text.pop();
                Row.pop();
                // 安全提示
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 安全提示
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 消息循环
            ForEach.create();
            const forEachItemGenFunction = _item => {
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
                        this.buildMessageItem.bind(this)(item);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.messages, forEachItemGenFunction);
        }, ForEach);
        // 消息循环
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                if (!isInitialRender) {
                    // 底部留白，防止最后一条消息紧贴输入框
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                // 底部留白，防止最后一条消息紧贴输入框
                ListItem.height(10);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                // 底部留白，防止最后一条消息紧贴输入框
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            // 底部留白，防止最后一条消息紧贴输入框
            ListItem.pop();
        }
        List.pop();
        // ===============================================
        // 2. 中间消息列表 (弹性伸缩)
        // ===============================================
        // flexGrow(1) 确保它占据剩余的所有空间
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===============================================
            // 3. 底部输入框区域 (随键盘起舞)
            // ===============================================
            Column.create();
            Context.animation({ duration: 250, curve: Curve.EaseOut });
            // ===============================================
            // 3. 底部输入框区域 (随键盘起舞)
            // ===============================================
            Column.width('100%');
            // ===============================================
            // 3. 底部输入框区域 (随键盘起舞)
            // ===============================================
            Column.backgroundColor(Color.White);
            // ===============================================
            // 3. 底部输入框区域 (随键盘起舞)
            // ===============================================
            Column.padding({ bottom: this.keyboardHeight });
            Context.animation(null);
        }, Column);
        this.buildInputArea.bind(this)();
        // ===============================================
        // 3. 底部输入框区域 (随键盘起舞)
        // ===============================================
        Column.pop();
        // 使用 Flex 容器，direction 设为 Column
        // Flex 在处理键盘挤压时表现更稳定
        Flex.pop();
    }
    // --- 内部 UI 构建方法 ---
    buildHeaderContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(50);
            Row.padding({ left: 12, right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Row.create();
            // 返回按钮
            Row.width(36);
            // 返回按钮
            Row.height(36);
            // 返回按钮
            Row.justifyContent(FlexAlign.Center);
            // 返回按钮
            Row.backgroundColor('rgba(255,255,255,0.2)');
            // 返回按钮
            Row.borderRadius(18);
            // 返回按钮
            Row.onClick(() => {
                router.back();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('<');
            Text.fontSize(22);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: -2 });
        }, Text);
        Text.pop();
        // 返回按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Column.create();
            // 标题
            Column.layoutWeight(1);
            // 标题
            Column.alignItems(HorizontalAlign.Start);
            // 标题
            Column.padding({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('智能客服');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 6, height: 6 });
            Circle.fill('#44FF99');
            Circle.margin({ right: 4 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('在线中');
            Text.fontSize(11);
            Text.fontColor('rgba(255,255,255,0.85)');
        }, Text);
        Text.pop();
        Row.pop();
        // 标题
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 菜单
            Text.create('···');
            // 菜单
            Text.fontSize(24);
            // 菜单
            Text.fontColor(Color.White);
            // 菜单
            Text.fontWeight(FontWeight.Bold);
            // 菜单
            Text.padding({ left: 8, right: 4 });
        }, Text);
        // 菜单
        Text.pop();
        Row.pop();
    }
    buildMessageItem(item: ChatMessage, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start);
            Row.alignItems(VerticalAlign.Top);
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!item.isSelf) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // AI 头像
                        Text.create('AI');
                        // AI 头像
                        Text.fontSize(13);
                        // AI 头像
                        Text.fontWeight(FontWeight.Bold);
                        // AI 头像
                        Text.fontColor(this.THEME_COLOR);
                        // AI 头像
                        Text.width(36);
                        // AI 头像
                        Text.height(36);
                        // AI 头像
                        Text.textAlign(TextAlign.Center);
                        // AI 头像
                        Text.backgroundColor(Color.White);
                        // AI 头像
                        Text.borderRadius(18);
                        // AI 头像
                        Text.margin({ right: 10 });
                        // AI 头像
                        Text.shadow({ radius: 4, color: '#0F000000', offsetY: 1 });
                    }, Text);
                    // AI 头像
                    Text.pop();
                });
            }
            // 消息气泡
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 消息气泡
            Text.create(item.content);
            // 消息气泡
            Text.fontSize(15);
            // 消息气泡
            Text.fontColor(item.isSelf ? Color.White : '#333333');
            // 消息气泡
            Text.lineHeight(24);
            // 消息气泡
            Text.padding({ left: 14, right: 14, top: 11, bottom: 11 });
            // 消息气泡
            Text.backgroundColor(item.isSelf ? this.THEME_COLOR : Color.White);
            // 消息气泡
            Text.borderRadius({
                topLeft: 12,
                topRight: 12,
                bottomLeft: item.isSelf ? 12 : 2,
                bottomRight: item.isSelf ? 2 : 12
            });
            // 消息气泡
            Text.constraintSize({ maxWidth: '72%' });
            // 消息气泡
            Text.shadow({ radius: 2, color: '#0A000000', offsetY: 1 });
        }, Text);
        // 消息气泡
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.isSelf) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 用户头像
                        Text.create('我');
                        // 用户头像
                        Text.fontSize(13);
                        // 用户头像
                        Text.fontWeight(FontWeight.Bold);
                        // 用户头像
                        Text.fontColor('#FFFFFF');
                        // 用户头像
                        Text.width(36);
                        // 用户头像
                        Text.height(36);
                        // 用户头像
                        Text.textAlign(TextAlign.Center);
                        // 用户头像
                        Text.backgroundColor('#FFB300');
                        // 用户头像
                        Text.borderRadius(18);
                        // 用户头像
                        Text.margin({ left: 10 });
                        // 用户头像
                        Text.border({ width: 1.5, color: Color.White });
                    }, Text);
                    // 用户头像
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    buildInputArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 12, right: 12, top: 10, bottom: 12 });
            Row.shadow({ radius: 10, color: '#0D000000', offsetY: -2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.inputText, placeholder: '咨询宝贝详情...' });
            TextInput.placeholderColor('#999999');
            TextInput.caretColor(this.THEME_COLOR);
            TextInput.fontSize(15);
            TextInput.backgroundColor('#F7F8FA');
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.enterKeyType(EnterKeyType.Send);
            TextInput.onChange((value) => {
                this.inputText = value;
            });
            TextInput.onSubmit(() => {
                this.sendMessage();
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.height(36);
            Button.width(64);
            Button.margin({ left: 10 });
            Button.backgroundColor(this.inputText.trim().length > 0 ? this.THEME_COLOR : '#FFD9B3');
            Button.borderRadius(18);
            Button.enabled(this.inputText.trim().length > 0);
            Button.onClick(() => {
                this.sendMessage();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发送');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        Row.pop();
    }
    // --- 业务逻辑 ---
    sendMessage() {
        const text = this.inputText.trim();
        if (!text)
            return;
        this.messages.push({ content: text, isSelf: true });
        this.inputText = '';
        // 延迟滚动，确保键盘动画开始后再滚动
        setTimeout(() => { this.scroller.scrollEdge(Edge.Bottom); }, 50);
        // 模拟回复
        setTimeout(() => {
            this.messages.push({ content: '收到！正在为您连接人工客服...', isSelf: false });
            this.scroller.scrollEdge(Edge.Bottom);
        }, 600);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AiServicePage";
    }
}
registerNamedRoute(() => new AiServicePage(undefined, {}), "", { bundleName: "com.huawei.waterflow", moduleName: "entry", pagePath: "userprofile/pages/AiServicePage", pageFullPath: "entry/src/main/ets/userprofile/pages/AiServicePage", integratedHsp: "false", moduleType: "followWithHap" });
