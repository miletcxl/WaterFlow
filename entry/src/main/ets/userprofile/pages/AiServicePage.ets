import { router, window } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { AiService } from '../../common/utils/AiService';

// 消息数据模型
class ChatMessage {
  content: string = '';
  isSelf: boolean = false;
}

@Entry
@Component
struct AiServicePage {
  @State messages: ChatMessage[] = [
    { content: '👋 您好！我是您的专属导购助手。', isSelf: false },
    { content: '有什么可以帮您？我可以为您查询订单📦、领取优惠券🎫或解答售后问题。', isSelf: false }
  ];
  @State inputText: string = '';
  @State isSending: boolean = false;

  // 【核心】手动控制键盘避让高度
  @State keyboardHeight: number = 0;
  // 【核心】状态栏高度（预设值，稍后会动态获取）
  @State statusBarHeight: number = 38;

  private scroller: Scroller = new Scroller();
  private readonly THEME_COLOR: string = '#FF6B00';
  private readonly BG_COLOR: string = '#F2F3F5';

  // 获取上下文
  private context = getContext(this) as common.UIAbilityContext;

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
      } catch (e) {
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

  build() {
    // 使用 Flex 容器，direction 设为 Column
    // Flex 在处理键盘挤压时表现更稳定
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Stretch }) {

      // ===============================================
      // 1. 顶部 Header 区域 (绝对固定，不受键盘影响)
      // ===============================================
      Column() {
        // 1.1 状态栏占位层 (高度动态适配)
        // 它的存在就是为了把标题栏“顶”下来，不遮挡电池信号
        Row().height(this.statusBarHeight).width('100%').backgroundColor(this.THEME_COLOR)

        // 1.2 真正的标题栏内容
        this.buildHeaderContent()
      }
      .width('100%')
      .backgroundColor(this.THEME_COLOR)
      .shadow({ radius: 4, color: '#1A000000', offsetY: 2 })
      .zIndex(99) // 保证层级最高

      // ===============================================
      // 2. 中间消息列表 (弹性伸缩)
      // ===============================================
      // flexGrow(1) 确保它占据剩余的所有空间
      Column() {
        List({ scroller: this.scroller, space: 16 }) {
          // 顶部的一点留白
          ListItem().height(10)

          // 安全提示
          ListItem() {
            Row() {
              Text('🛡️ 官方认证 · 信息加密传输中').fontSize(12).fontColor('#999999')
            }
            .width('100%').justifyContent(FlexAlign.Center)
          }

          // 消息循环
          ForEach(this.messages, (item: ChatMessage) => {
            ListItem() {
              this.buildMessageItem(item)
            }
          })

          // 底部留白，防止最后一条消息紧贴输入框
          ListItem().height(10)
        }
        .width('100%')
        .height('100%')
        .edgeEffect(EdgeEffect.Spring)
      }
      .width('100%')
      .flexGrow(1) // 关键：键盘出来时，Input变高，这个区域自动变矮
      .backgroundColor(this.BG_COLOR)

      // ===============================================
      // 3. 底部输入框区域 (随键盘起舞)
      // ===============================================
      Column() {
        this.buildInputArea()
      }
      .width('100%')
      .backgroundColor(Color.White)
      // 【终极方案核心】
      // 给底部容器加一个 paddingBottom，数值等于键盘高度。
      // 这样键盘在下面弹出来，我们就在 Input 下面垫高同样的距离。
      // 视觉上就是 Input 被键盘“顶”上来了。
      .padding({ bottom: this.keyboardHeight })
      // 加上动画，让垫高的过程丝滑流畅
      .animation({ duration: 250, curve: Curve.EaseOut })

    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.BG_COLOR)
    // 【重要】不使用系统的 expandSafeArea(KEYBOARD)
    // 防止系统把整个 Header 顶出屏幕
  }

  // --- 内部 UI 构建方法 ---

  @Builder
  buildHeaderContent() {
    Row() {
      // 返回按钮
      Row() {
        Text('<')
          .fontSize(22)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .margin({ top: -2 })
      }
      .width(36)
      .height(36)
      .justifyContent(FlexAlign.Center)
      .backgroundColor('rgba(255,255,255,0.2)')
      .borderRadius(18)
      .onClick(() => {
        router.back();
      })

      // 标题
      Column() {
        Text('智能客服')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
        Row() {
          Circle({ width: 6, height: 6 }).fill('#44FF99').margin({ right: 4 })
          Text('在线中')
            .fontSize(11)
            .fontColor('rgba(255,255,255,0.85)')
        }
        .margin({ top: 2 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .padding({ left: 12 })

      // 菜单
      Text('···')
        .fontSize(24)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .padding({ left: 8, right: 4 })
    }
    .width('100%')
    .height(50) // 标题栏内容固定高度
    .padding({ left: 12, right: 12 })
  }

  @Builder
  buildMessageItem(item: ChatMessage) {
    Row() {
      if (!item.isSelf) {
        // AI 头像
        Text('AI')
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.THEME_COLOR)
          .width(36)
          .height(36)
          .textAlign(TextAlign.Center)
          .backgroundColor(Color.White)
          .borderRadius(18)
          .margin({ right: 10 })
          .shadow({ radius: 4, color: '#0F000000', offsetY: 1 })
      }

      // 消息气泡
      Text(item.content)
        .fontSize(15)
        .fontColor(item.isSelf ? Color.White : '#333333')
        .lineHeight(24)
        .padding({ left: 14, right: 14, top: 11, bottom: 11 })
        .backgroundColor(item.isSelf ? this.THEME_COLOR : Color.White)
        .borderRadius({
          topLeft: 12,
          topRight: 12,
          bottomLeft: item.isSelf ? 12 : 2,
          bottomRight: item.isSelf ? 2 : 12
        })
        .constraintSize({ maxWidth: '72%' })
        .shadow({ radius: 2, color: '#0A000000', offsetY: 1 })

      if (item.isSelf) {
        // 用户头像
        Text('我')
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .width(36)
          .height(36)
          .textAlign(TextAlign.Center)
          .backgroundColor('#FFB300')
          .borderRadius(18)
          .margin({ left: 10 })
          .border({ width: 1.5, color: Color.White })
      }
    }
    .width('100%')
    .justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start)
    .alignItems(VerticalAlign.Top)
    .padding({ top: 8, bottom: 8 })
  }

  @Builder
  buildInputArea() {
    Row() {
      TextInput({ text: this.inputText, placeholder: '咨询宝贝详情...' })
        .placeholderColor('#999999')
        .caretColor(this.THEME_COLOR)
        .fontSize(15)
        .backgroundColor('#F7F8FA')
        .layoutWeight(1)
        .height(40)
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .enterKeyType(EnterKeyType.Send)
        .enabled(!this.isSending)
        .onChange((value) => {
          this.inputText = value;
        })
        .onSubmit(() => {
          this.sendMessage();
        })

      Button() {
        Text(this.isSending ? '发送中' : '发送')
          .fontSize(14)
          .fontWeight(FontWeight.Medium)
          .fontColor(Color.White)
      }
      .height(36)
      .width(64)
      .margin({ left: 10 })
      .backgroundColor((this.inputText.trim().length > 0 && !this.isSending) ? this.THEME_COLOR : '#FFD9B3')
      .borderRadius(18)
      .enabled(this.inputText.trim().length > 0 && !this.isSending)
      .onClick(() => {
        this.sendMessage();
      })
    }
    .width('100%')
    .padding({ left: 12, right: 12, top: 10, bottom: 12 })
    .shadow({ radius: 10, color: '#0D000000', offsetY: -2 })
  }

  // --- 业务逻辑 ---
  sendMessage() {
    const text = this.inputText.trim();
    if (!text || this.isSending) return;

    // 添加用户消息
    this.messages.push({ content: text, isSelf: true });
    this.inputText = '';
    this.isSending = true;
    
    // 延迟滚动
    setTimeout(() => { this.scroller.scrollEdge(Edge.Bottom); }, 50);

    // 添加一个空的 AI 消息，用于流式更新
    const aiMessageIndex = this.messages.length;
    this.messages.push({ content: '', isSelf: false });

    // 调用 AI 服务
    AiService.streamChat(
      text,
      // 内容回调 - 流式更新消息
      (content: string) => {
        this.messages[aiMessageIndex].content += content;
        setTimeout(() => { this.scroller.scrollEdge(Edge.Bottom); }, 50);
      },
      // 错误回调
      (error: string) => {
        this.messages[aiMessageIndex].content = `❌ ${error}`;
        this.isSending = false;
      },
      // 完成回调
      () => {
        this.isSending = false;
        setTimeout(() => { this.scroller.scrollEdge(Edge.Bottom); }, 50);
      }
    );
  }
}