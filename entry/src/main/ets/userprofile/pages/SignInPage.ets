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
        Text('←')
          .fontSize(22)
          .fontColor('#333')
          .onClick(() => router.back())
        Row() {
          Text('¥')
            .fontSize(14)
            .fontColor('#D58B00')
            .margin({ right: 4 })
          Text('约0.16元')
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
    Column() {
      Text(`${this.today.getMonth() + 1} 月`)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .padding({ left: 20, right: 20, top: 10, bottom: 10 })
        .backgroundColor('#E23532')
        .borderRadius({ topLeft: 16, topRight: 16 })
        .width('100%')
        .textAlign(TextAlign.Center)

      Column() {
        Text(`${this.today.getDate()} 日`)
          .fontSize(42)
          .fontWeight(FontWeight.Bold)
          .fontColor('#111')
          .padding({ left: 24, right: 24, top: 12, bottom: 12 })
          .backgroundColor('#FFB54C')
          .borderRadius(12)
          .margin({ top: 14, bottom: 12 })
        Text('连续签到5天额外奖励 🎁')
          .fontSize(14)
          .fontColor('#444')
          .margin({ bottom: 20 })
        Button('领今日积分')
          .type(ButtonType.Capsule)
          .backgroundColor('#FF4B4B')
          .fontColor(Color.White)
          .fontSize(16)
          .padding({ left: 30, right: 30, top: 10, bottom: 10 })
          .onClick(() => {
            promptAction.showToast({ message: '签到成功，积分+8', duration: 1500 });
          })
      }
      .width('100%')
      .backgroundColor(Color.White)
      .borderRadius({ bottomLeft: 16, bottomRight: 16 })
      .padding({ bottom: 20 })
      .shadow({ radius: 10, color: '#11000000', offsetY: 4 })
      .margin({ left: 16, right: 16 })
    }
    .width('90%')
    .alignItems(HorizontalAlign.Center)
    .padding({ left: 12, right: 12, top: 12, bottom: 12 })
    .margin({ left: 16, right: 16, top: 8 })
  }

  @Builder
  buildTasks() {
    Column() {
      Text('做任务 赚积分')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#111')
        .margin({ bottom: 12, left: 4 })

      this.buildTaskRow('👜', '浏览商详页', '浏览10秒', '+2')
      this.buildTaskRow('👑', '浏览排行榜', '浏览10秒', '+2')
      this.buildTaskRow('🎮', '参与小游戏', '完成可得', '+2')
      this.buildTaskRow('🤖', '体验智能导购', '浏览10秒', '+2')
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

      Button('去完成')
        .type(ButtonType.Capsule)
        .backgroundColor('#FFB300')
        .fontColor(Color.White)
        .height(34)
        .padding({ left: 12, right: 12 })
        .onClick(() => {
          promptAction.showToast({ message: '请在实际场景接入任务跳转', duration: 1200 });
        })
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    Divider().color('#F3F3F3')
  }
}
