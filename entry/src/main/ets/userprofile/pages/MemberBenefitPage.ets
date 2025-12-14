import { router } from '@kit.ArkUI';

@Entry
@Component
struct MemberBenefitPage {
  private readonly accent: string = '#C89A57';
  private readonly lightBg: string = '#F6F0E7';
  private readonly couponBg: string = '#E9D7C3';

  build() {
    Column() {
      this.buildTopBar()
      Scroll() {
        Column() {
          this.buildTabs()
          this.buildCouponSection()
          this.buildEducationSection()
          this.buildEmailSection()
          this.buildProductShowcase()
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor(this.lightBg)
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.lightBg)
  }

  @Builder
  buildTopBar() {
    Row() {
      Text('←')
        .fontSize(22)
        .fontColor('#111')
        .onClick(() => router.back())
      Text('华为商城 | 会员频道')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#111')
        .margin({ left: 12 })
    }
    .width('100%')
    .height(54)
    .padding({ left: 12, right: 12 })
    .backgroundColor(this.lightBg)
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  buildTabs() {
    Row() {
      Column() {
        Text('专属礼包')
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor('#D2B586')
      }
      .width('50%')
      .height(46)
      .backgroundColor('#F3E7D6')
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)

      Column() {
        Text('教育优惠')
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor('#C89A57')
      }
      .width('50%')
      .height(46)
      .backgroundColor('#D7B27C')
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)
    }
  }

  @Builder
  buildCouponSection() {
    Column() {
      Text('会员专享优惠券包')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2B1A0B')
        .margin({ bottom: 8 })

      Grid() {
        GridItem() { this.buildCouponCard('免邮券', '限华为品牌指定产品可用', '2025.12.01 - 2025.12.31', '#CFA56E') }
        GridItem() { this.buildCouponCard('¥100', '限华为品牌指定商品可用', '2025.12.01 - 2025.12.31', '#B8894D') }
        GridItem() { this.buildCouponCard('¥50', '限华为品牌指定商品可用', '2025.12.01 - 2025.12.31', '#CFA56E') }
        GridItem() { this.buildCouponCard('¥5', '限华为品牌指定商品可用', '2025.12.01 - 2025.12.31', '#B8894D') }
      }
      .columnsTemplate('1fr 1fr')
      .rowsGap(8)
      .columnsGap(12)
      .width('100%')
    }
    .padding({ left: 14, right: 14, top: 12, bottom: 14 })
    .backgroundColor('#F9F4EC')
  }

  @Builder
  buildCouponCard(title: string, desc: string, date: string, color: string) {
    Row() {
      Column() {
        Text(title)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
        Text(date)
          .fontSize(10)
          .fontColor('#F6EBDD')
          .margin({ top: 4 })
      }
      .padding({ left: 10, right: 8, top: 8, bottom: 8 })
      .backgroundColor(color)
      .borderRadius({ topLeft: 12, bottomLeft: 12 })
      .width(78)
      .alignItems(HorizontalAlign.Start)

      Column() {
        Text(desc)
          .fontSize(11)
          .fontColor('#333')
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(date)
          .fontSize(10)
          .fontColor('#999')
          .margin({ top: 4 })
        Text('立即领取 >')
          .fontSize(11)
          .fontColor(this.accent)
          .margin({ top: 8 })
      }
      .padding({ left: 10, right: 10, top: 8, bottom: 8 })
      .backgroundColor(Color.White)
      .borderRadius({ topRight: 12, bottomRight: 12 })
      .layoutWeight(1)
    }
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 4, color: '#08000000', offsetY: 2 })
    .border({ width: 0.6, color: '#F0E6D8' })
  }

  @Builder
  buildEducationSection() {
    Column() {
      Text('教育认证优惠')
        .fontSize(17)
        .fontWeight(FontWeight.Bold)
        .fontColor('#1A1A1A')
        .margin({ bottom: 12 })

      Column() {
        Text('· 如何领取教育专享优惠 ·')
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor('#111')
          .margin({ bottom: 12 })

        Column() {
          Text('支付宝芝麻快速认证（推荐使用）')
            .fontSize(15)
            .fontWeight(FontWeight.Bold)
            .fontColor('#8A5A1F')
            .padding({ left: 12, right: 12, top: 12, bottom: 12 })
            .backgroundColor('#F5E3CD')
            .borderRadius(14)
          Text('秒级验证，快速高效')
            .fontSize(12)
            .fontColor('#999')
            .margin({ top: 6 })

          Row({ space: 12 }) {
            Button('学生认证入口')
              .type(ButtonType.Capsule)
              .backgroundColor('#FFFFFF')
              .fontColor('#8A5A1F')
              .border({ width: 1, color: '#E0C7A8' })
              .height(36)
              .padding({ left: 16, right: 16 })
            Button('教师认证入口')
              .type(ButtonType.Capsule)
              .backgroundColor('#FFFFFF')
              .fontColor('#8A5A1F')
              .border({ width: 1, color: '#E0C7A8' })
              .height(36)
              .padding({ left: 16, right: 16 })
          }
          .padding({ top: 12, bottom: 12 })
          .justifyContent(FlexAlign.Center)
        }
        .width('100%')
        .backgroundColor('#FDF7F0')
        .borderRadius(16)
        .shadow({ radius: 8, color: '#0D000000', offsetY: 3 })
        .padding({ left: 14, right: 14, top: 12, bottom: 12 })
        .alignItems(HorizontalAlign.Center)
      }
      .padding({ left: 12, right: 12 })
      .backgroundColor(Color.White)
      .borderRadius(18)
      .shadow({ radius: 8, color: '#0D000000', offsetY: 3 })
    }
    .padding({ left: 12, right: 12, top: 16 })
  }

  @Builder
  buildEmailSection() {
    Column() {
      Row() {
        Column() {
          Text('绑定EDU邮箱')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#222')
            .margin({ bottom: 6 })
          Text('绑定有效的EDU邮箱完成认证，即可享受指定商品教育优惠')
            .fontSize(12)
            .fontColor('#555')
            .maxLines(2)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }
        .layoutWeight(1)
        Button('进入认证入口')
          .type(ButtonType.Capsule)
          .backgroundColor('#FFFFFF')
          .fontColor('#8A5A1F')
          .border({ width: 1.2, color: '#8A5A1F' })
          .height(40)
          .padding({ left: 16, right: 16 })
      }
      .margin({ bottom: 12 })

      Row() {
        Column() {
          Text('1、账号登录-选择账号绑定')
            .fontSize(12)
            .fontColor('#444')
            .margin({ bottom: 6 })
          Text('2、选择【邮箱地址】绑定')
            .fontSize(12)
            .fontColor('#444')
            .margin({ bottom: 6 })
          Text('3、输入邮箱和邮箱验证码')
            .fontSize(12)
            .fontColor('#444')
            .margin({ bottom: 6 })
          Text('4、成为教育购用户享优惠')
            .fontSize(12)
            .fontColor('#444')
        }
        .layoutWeight(1)
      }
    }
    .padding({ left: 14, right: 14, top: 14, bottom: 14 })
    .backgroundColor('#FDF7F0')
    .borderRadius(16)
    .shadow({ radius: 8, color: '#0D000000', offsetY: 3 })
    .margin({ left: 12, right: 12, top: 16 })
  }

  @Builder
  buildProductShowcase() {
    Column() {
      Text('热门推荐')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#222')
        .margin({ bottom: 10 })

      Grid() {
        GridItem() { this.buildProductCard($r('app.media.phone_Pura_80'), 'Pura 80', '¥3699') }
        GridItem() { this.buildProductCard($r('app.media.phone_Mate_80'), 'Mate 80', '¥4199') }
      }
      .columnsTemplate('1fr 1fr')
      .columnsGap(10)
    }
    .padding({ left: 12, right: 12, top: 14, bottom: 24 })
  }

  @Builder
  buildProductCard(img: Resource, name: string, price: string) {
    Column() {
      Image(img)
        .width('100%')
        .height(120)
        .objectFit(ImageFit.Cover)
        .borderRadius(12)
      Text(name)
        .fontSize(14)
        .fontColor('#222')
        .margin({ top: 8 })
      Text(price)
        .fontSize(13)
        .fontColor(this.accent)
        .margin({ top: 4 })
    }
    .padding({ left: 10, right: 10, top: 10, bottom: 10 })
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 6, color: '#0D000000', offsetY: 2 })
  }
}
