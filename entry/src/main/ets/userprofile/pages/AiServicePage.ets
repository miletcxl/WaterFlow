/*
 * AI Customer Service Page (mock chat)
 */
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import promptAction from '@ohos.promptAction';
import { router } from '@kit.ArkUI';

class ChatMessage {
  content: string = '';
  isSelf: boolean = false;
}

@Entry
@Component
struct AiServicePage {
  @State messages: ChatMessage[] = [];
  @State inputText: string = '';

  build() {
    Column() {
      // Header
      Row() {
        Text($r('app.string.ai_service_title'))
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .fontColor(Color.Black)
        Blank()
        Text('关闭')
          .fontSize(14)
          .fontColor($r('app.color.profile_text_secondary'))
          .onClick(() => {
            router.back();
          })
      }
      .width(Const.FULL_WIDTH)
      .padding({ left: 16, right: 16, top: 12, bottom: 8 })

      // Messages
      List() {
        ForEach(this.messages, (item: ChatMessage, index: number) => {
          ListItem() {
            Row() {
              if (!item.isSelf) {
                Text('AI')
                  .fontSize(12)
                  .fontColor(Color.White)
                  .padding({ left: 8, right: 8, top: 4, bottom: 4 })
                  .backgroundColor('#5B7BFA')
                  .borderRadius(12)
                  .margin({ right: 8 })
              }
              Column() {
                Text(item.content)
                  .fontSize(14)
                  .fontColor(Color.Black)
                  .backgroundColor(item.isSelf ? '#E9EDFF' : '#F6F7FB')
                  .padding({ left: 12, right: 12, top: 10, bottom: 10 })
                  .borderRadius(12)
              }
              .alignItems(ItemAlign.Start)
              if (item.isSelf) {
                Blank()
              }
            }
            .width(Const.FULL_WIDTH)
            .padding({ left: 16, right: 16, top: 6, bottom: 6 })
            .justifyContent(item.isSelf ? FlexAlign.End : FlexAlign.Start)
          }
        })
      }
      .layoutWeight(1)

      // Input bar
      Row() {
        TextInput({ text: this.inputText, placeholder: $r('app.string.ai_service_placeholder') })
          .width('70%')
          .height(40)
          .backgroundColor(Color.White)
          .borderRadius(12)
          .padding({ left: 12, right: 12 })
          .onChange((value: string) => {
            this.inputText = value;
          })
        Blank()
        Text('发送')
          .fontSize(14)
          .fontColor(Color.White)
          .padding({ left: 14, right: 14, top: 10, bottom: 10 })
          .backgroundColor('#5B7BFA')
          .borderRadius(12)
          .onClick(() => {
            this.sendMessage();
          })
      }
      .width(Const.FULL_WIDTH)
      .padding({ left: 16, right: 16, top: 10, bottom: 12 })
      .backgroundColor('#F6F7FB')
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .backgroundColor('#F6F7FB')
  }

  private sendMessage(): void {
    if (!this.inputText || this.inputText.trim().length === 0) {
      promptAction.showToast({ message: $r('app.string.ai_service_empty') });
      return;
    }
    // Append self message
    const selfMsg: ChatMessage = { content: this.inputText.trim(), isSelf: true };
    this.messages.push(selfMsg);
    // Mock AI reply
    const aiMsg: ChatMessage = { content: $r('app.string.ai_service_mock_reply') as unknown as string, isSelf: false };
    this.messages.push(aiMsg);
    this.inputText = '';
  }
}


