import { router } from '@kit.ArkUI';

@Entry
@Component
struct MemberBenefitPage {
  build() {
    Column() {
      Row() {
        Text('<')
          .fontSize(20)
          .fontColor(Color.White)
          .padding({ right: 8 })
          .onClick(() => router.back())
        Text('会员权益')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
      }
      .width('100%')
      .height(52)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#333333')
      .alignItems(VerticalAlign.Center)

      Scroll() {
        Column() {
          Column() {
            Text('黑金会员')
              .fontSize(22)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.White)
            Text('享专属优惠券、会员日折扣、积分加速')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.9)')
              .margin({ top: 6 })
          }
          .padding({ left: 20, right: 20, top: 20, bottom: 20 })
          .width('100%')
          .linearGradient({
            angle: 120,
            colors: [['#3A3A3A', 0.0], ['#1F1F1F', 1.0]]
          })
          .borderRadius({ bottomLeft: 20, bottomRight: 20 })

          Column() {
            Text('权益列表')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333')
              .margin({ bottom: 12 })
            ForEach(['每月大额券', '积分加速 x2', '会员日专享价', '售后绿色通道'], (item: string, index: number) => {
              Row() {
                Text('✓')
                  .fontSize(18)
                  .fontColor('#6D4BFF')
                  .margin({ right: 8 })
                Text(item)
                  .fontSize(14)
                  .fontColor('#333')
              }
              .padding({ top: 10, bottom: 10 })
              Divider().color('#F1F3F5')
            })
          }
          .padding({ left: 20, right: 20, top: 12 })
        }
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F6F6F6')
    }
    .width('100%')
    .height('100%')
  }
}
