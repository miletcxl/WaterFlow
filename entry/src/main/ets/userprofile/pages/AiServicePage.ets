/*
 * AI Customer Service Page (Modern Chat UI)
 */
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import promptAction from '@ohos.promptAction';
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

class ChatMessage {
  content: ResourceStr = '';
  isSelf: boolean = false;
  timestamp?: string;
}

@Entry
@Component
struct AiServicePage {
  // 预置几条消息，避免进来空荡荡
  @State messages: ChatMessage[] = [
    { content: '您好！我是您的专属AI客服，请问有什么可以帮您？', isSelf: false },
    { content: '我想查询一下我的会员积分明细。', isSelf: true },
    { content: '没问题，正在为您查询，请稍候...', isSelf: false }
  ];
  @State inputText: string = '';
  // 滚动控制器，用于发送消息后自动滚到底部
  private scroller: Scroller = new Scroller();

  @StorageLink('topRectHeight') topRectHeight: number = 0;

  build() {
    Column() {
      // 1. 顶部导航栏 (仿微信/通用App风格)
      Row() {
        // 返回按钮
        Row() {
          Text('❮') // Unicode 箭头替代图标
            .fontSize(20)
            .fontColor('#333333')
            .fontWeight(FontWeight.Bold)
        }
        .height('100%')
        .aspectRatio(1)
        .justifyContent(FlexAlign.Center)
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          try {
            router.back();
          } catch (err) {
            console.error(`Router back failed: ${(err as BusinessError).message}`);
          }
        })

        // 标题
        Text($r('app.string.ai_service_title')) // 确保 string.json 中有这个 key，或者直接写字符串 '智能客服'
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor('#333333')
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
          .padding({ right: 40 }) // 为了让标题视觉居中（抵消左侧返回键宽度）
      }
      .width('100%')
      .height(56)
      .backgroundColor(Color.White)
      .padding({ top: this.getUIContext().px2vp(this.topRectHeight) }) // 适配状态栏
      .shadow({ radius: 2, color: 'rgba(0,0,0,0.05)', offsetY: 1 }) // 底部加一点点阴影分割
      .zIndex(1) // 保证在最上层

      // 2. 聊天内容列表
      List({ scroller: this.scroller, initialIndex: this.messages.length - 1 }) {
        ForEach(this.messages, (item: ChatMessage, index: number) => {
          ListItem() {
            Row() {
              // --- AI 的头像 (左侧) ---
              if (!item.isSelf) {
                Text('🤖') // 用 Emoji 代替图片头像
                  .fontSize(24)
                  .width(40)
                  .height(40)
                  .textAlign(TextAlign.Center)
                  .backgroundColor(Color.White)
                  .borderRadius(20)
                  .margin({ right: 10 })
                  .alignSelf(ItemAlign.Start) // 头像顶对齐
              } else {
                // 占位，保持布局平衡，或者直接不写
                Blank().width(50)
              }

              // --- 消息气泡 ---
              Column() {
                Text(item.content)
                  .fontSize(15)
                  .fontColor(item.isSelf ? Color.White : '#333333')
                  .lineHeight(24)
              }
              .backgroundColor(item.isSelf ? '#FF8A3C' : '#FFFFFF') // 自己是品牌色，对方是白色
              .padding({ left: 16, right: 16, top: 12, bottom: 12 })
              // 气泡圆角处理：自己的右上角尖一点，对方的左上角尖一点
              .borderRadius({
                topLeft: item.isSelf ? 16 : 4,
                topRight: item.isSelf ? 4 : 16,
                bottomLeft: 16,
                bottomRight: 16
              })
              // 只有白色的气泡加阴影，橘色的不用
              .shadow(item.isSelf ? undefined : {
                radius: 4,
                color: 'rgba(0,0,0,0.05)',
                offsetY: 2
              })
              .layoutWeight(1) // 限制最大宽度
              .constraintSize({ maxWidth: '70%' }) // 气泡最大宽度占屏幕 70%
              .alignItems(item.isSelf ? HorizontalAlign.End : HorizontalAlign.Start)

              // --- 用户的头像 (右侧) ---
              if (item.isSelf) {
                Text('🤠') // 用 Emoji 代替用户头像
                  .fontSize(24)
                  .width(40)
                  .height(40)
                  .textAlign(TextAlign.Center)
                  .backgroundColor('#FFEFE2') // 淡橘色背景
                  .borderRadius(20)
                  .margin({ left: 10 })
                  .alignSelf(ItemAlign.Start)
              } else {
                Blank().width(50)
              }
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 10, bottom: 10 })
            // FlexAlign.End 让自己的消息靠右，Start 让对方消息靠左
            .justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start)
          }
        })
        // 底部留白，防止最后一条消息被输入框遮挡
        ListItem().height(20)
      }
      .layoutWeight(1)
      .backgroundColor('#F2F3F5') // 聊天背景通常使用浅灰色
      .scrollBar(BarState.Off)

      // 3. 底部输入栏
      Row() {
        // 输入框
        TextInput({
          text: this.inputText,
          placeholder: $r('app.string.ai_service_placeholder')
        })
          .layoutWeight(1)
          .height(40)
          .backgroundColor('#F7F8FA') // 浅灰背景，区别于底部的白
          .borderRadius(20)
          .padding({ left: 16, right: 16 })
          .enterKeyType(EnterKeyType.Send) // 键盘回车键变成发送
          .onChange((value: string) => {
            this.inputText = value;
          })
          .onSubmit(() => {
            this.sendMessage();
          })

        // 发送按钮
        Button('发送')
          .type(ButtonType.Capsule)
          .backgroundColor(this.inputText.trim().length > 0 ? '#E95B27' : '#FFCBA4') // 有字时深色，没字时浅色
          .fontSize(14)
          .height(36)
          .width(70)
          .margin({ left: 12 })
          .enabled(this.inputText.trim().length > 0) // 没字禁用
          .onClick(() => {
            this.sendMessage();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 10, bottom: 20 }) // 底部多留点白（适配HomeIndicator）
      .backgroundColor(Color.White)
      .shadow({ radius: 10, color: 'rgba(0,0,0,0.05)', offsetY: -2 }) // 顶部阴影
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F2F3F5')
  }

  private sendMessage(): void {
    if (!this.inputText || this.inputText.trim().length === 0) {
      try {
        promptAction.showToast({ message: $r('app.string.ai_service_empty') });
      } catch (e) {
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
        content: $r('app.string.ai_service_mock_reply'),
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
}