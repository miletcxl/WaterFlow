import { router } from '@kit.ArkUI';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct SignInPage {
  @State today: Date = new Date();

  build() {
    Column() {
      this.buildTopBar()
      Scroll() {
        Column() {
          this.buildCalendarCard()
          this.buildTasks()
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#FDF2E6')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FDF2E6')
  }

  @Builder
  buildTopBar() {
    Row() {
      Row() {
        Text('\u2190')
          .fontSize(22)
          .fontColor('#333')
          .onClick(() => router.back())
        Row() {
          Text('\u00a5')
            .fontSize(14)
            .fontColor('#D58B00')
            .margin({ right: 4 })
          Text('\u7ea60.16\u5143')
            .fontSize(14)
            .fontColor('#7B6336')
        }
        .padding({ left: 10, right: 12, top: 4, bottom: 4 })
        .backgroundColor('#EFE1C9')
        .borderRadius(16)
        .margin({ left: 8 })
      }
      .alignItems(VerticalAlign.Center)
      .padding({ left: 12 })
      Blank()
    }
    .width('100%')
    .height(52)
    .alignItems(VerticalAlign.Center)
    .padding({ left: 8, right: 8, top: 6 })
  }

  @Builder
  buildCalendarCard() {
    Stack({ alignContent: Alignment.Center }) {
      Column() {
        Text(`${this.today.getMonth() + 1} \u6708`)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .padding({ left: 20, right: 20, top: 10, bottom: 10 })
          .backgroundColor('#E23532')
          .borderRadius({ topLeft: 16, topRight: 16 })
          .width('100%')
          .textAlign(TextAlign.Center)

        Column() {
          Text(`${this.today.getDate()} \u65e5`)
            .fontSize(38)
            .fontWeight(FontWeight.Bold)
            .fontColor('#111')
            .margin({ bottom: 6, top: 10 })
          Text('\u8fde\u7eed\u7b7e\u52305\u5929\u989d\u5916\u5956\u52b1 \ud83c\udf81')
            .fontSize(14)
            .fontColor('#444')
            .margin({ bottom: 12 })
          Column()
            .width(120)
            .height(80)
            .linearGradient({
              angle: 180,
              colors: [['#FF8358', 0.0], ['#FFDB7D', 1.0]]
            })
            .borderRadius(12)
            .margin({ bottom: 14 })
          Button('\u9886\u4eca\u65e5\u79ef\u5206')
            .type(ButtonType.Capsule)
            .backgroundColor('#FF4B4B')
            .fontColor(Color.White)
            .fontSize(16)
            .padding({ left: 30, right: 30, top: 10, bottom: 10 })
            .onClick(() => {
              promptAction.showToast({ message: '\u7b7e\u5230\u6210\u529f\uff0c\u79ef\u5206+8', duration: 1500 });
            })
        }
        .width('100%')
        .backgroundColor(Color.White)
        .borderRadius({ bottomLeft: 16, bottomRight: 16 })
        .padding({ bottom: 18 })
        .shadow({ radius: 10, color: '#11000000', offsetY: 4 })
      }
      .width('90%')
      .backgroundColor(Color.Transparent)
      .alignItems(HorizontalAlign.Center)
      .padding({ left: 12, right: 12, top: 12, bottom: 12 })
      .margin({ left: 16, right: 16, top: 8 })

      Column({ space: 18 }) {
        this.buildBubble('+2', '\u6d4f\u89c8\u6709\u5956\u52b1')
        this.buildBubble('8', '\u4eca\u65e5\u7b7e\u5230')
      }
      .width('100%')
      .alignItems(HorizontalAlign.End)
      .padding({ right: 24, top: 22 })

      Row() {
        Text('\ud83d\udc37')
          .fontSize(48)
          .margin({ left: 28 })
      }
      .width('100%')
      .alignItems(VerticalAlign.Bottom)
      .padding({ bottom: 26 })
    }
  }

  @Builder
  buildTasks() {
    Column() {
      Text('\u505a\u4efb\u52a1 \u8d5a\u79ef\u5206')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#111')
        .margin({ bottom: 12, left: 4 })

      this.buildTaskRow('\ud83d\udec2', '\u6d4f\u89c8\u5546\u8be6\u9875', '\u6d4f\u89c810\u79d2', '+2')
      this.buildTaskRow('\ud83d\udc51', '\u6d4f\u89c8\u6392\u884c\u699c', '\u6d4f\u89c810\u79d2', '+2')
      this.buildTaskRow('\ud83c\udfae', '\u53c2\u4e0e\u5c0f\u6e38\u620f', '\u5b8c\u6210\u53ef\u5f97', '+2')
      this.buildTaskRow('\ud83e\udd16', '\u4f53\u9a8c\u667a\u80fd\u5bfc\u8d2d', '\u6d4f\u89c810\u79d2', '+2')
    }
    .width('100%')
    .backgroundColor(Color.White)
    .borderRadius({ topLeft: 18, topRight: 18 })
    .padding({ left: 16, right: 16, top: 16, bottom: 24 })
  }

  @Builder
  buildTaskRow(iconText: string, title: string, desc: string, reward: string) {
    Row() {
      Stack({ alignContent: Alignment.Center }) {
        Circle({ width: 46, height: 46 })
          .fill('#FFF2D8')
        Text(iconText)
          .fontSize(22)
      }
      .margin({ right: 12 })

      Column() {
        Text(title)
          .fontSize(15)
          .fontWeight(FontWeight.Medium)
          .fontColor('#222')
        Row() {
          Text(desc)
            .fontSize(12)
            .fontColor('#888')
          Text(reward)
            .fontSize(12)
            .fontColor('#D58B00')
            .margin({ left: 8 })
            .backgroundColor('#FFF6E1')
            .padding({ left: 8, right: 8, top: 2, bottom: 2 })
            .borderRadius(10)
        }
        .margin({ top: 4 })
      }
      .layoutWeight(1)

      Button('\u53bb\u5b8c\u6210')
        .type(ButtonType.Capsule)
        .backgroundColor('#FFB300')
        .fontColor(Color.White)
        .height(34)
        .padding({ left: 12, right: 12 })
        .onClick(() => {
          promptAction.showToast({ message: '\u8bf7\u5728\u5b9e\u9645\u573a\u666f\u63a5\u5165\u4efb\u52a1\u8df3\u8f6c', duration: 1200 });
        })
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    Divider().color('#F3F3F3')
  }

  @Builder
  buildBubble(numberText: string, desc: string) {
    Column() {
      Stack({ alignContent: Alignment.Center }) {
        Circle({ width: 64, height: 64 })
          .fill('#FFA432')
          .shadow({ radius: 8, color: '#22000000', offsetY: 4 })
        Text(numberText.startsWith('+') ? numberText : `+${numberText}`)
          .fontSize(18)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
      }
      Text(desc)
        .fontSize(12)
        .fontColor('#915400')
        .margin({ top: 6 })
    }
  }
}
