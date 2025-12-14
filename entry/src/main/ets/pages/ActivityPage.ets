import { router } from '@kit.ArkUI';

@Entry
@Component
struct ActivityPage {
  build() {
    Column() {
      // 顶部返回
      Row() {
        Text('<')
          .fontSize(20)
          .fontColor(Color.White)
          .padding({ right: 8 })
          .onClick(() => router.back())
        Text('畅享新生活')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
      }
      .width('100%')
      .height(52)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#6D4BFF')
      .alignItems(VerticalAlign.Center)

      // 活动内容
      Scroll() {
        Column() {
          Column() {
            Text('最高领500元大额券')
              .fontSize(22)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.White)
              .margin({ bottom: 8 })
            Text('下单立减、会员积分翻倍、每日秒杀…')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.9)')
              .lineHeight(22)
            Button('立即领取')
              .type(ButtonType.Capsule)
              .backgroundColor(Color.White)
              .fontColor('#6D4BFF')
              .height(38)
              .padding({ left: 16, right: 16 })
              .margin({ top: 16 })
          }
          .padding({ left: 20, right: 20, top: 24, bottom: 24 })
          .width('100%')
          .backgroundColor('#6D4BFF')
          .borderRadius({ bottomLeft: 20, bottomRight: 20 })

          Column() {
            Text('权益亮点')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333')
              .margin({ bottom: 12 })
            ForEach(['大额优惠券包', '会员积分翻倍', '精选商品限时秒杀'], (item: string, index: number) => {
              Row() {
                Text('•')
                  .fontSize(18)
                  .fontColor('#6D4BFF')
                  .margin({ right: 8 })
                Text(item)
                  .fontSize(14)
                  .fontColor('#333')
              }
              .margin({ bottom: 10 })
            })
          }
          .padding({ left: 20, right: 20, top: 20 })
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F6F6F6')
    }
    .width('100%')
    .height('100%')
  }
}
