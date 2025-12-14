import { router } from '@kit.ArkUI';

@Entry
@Component
struct ActivityPage {
  build() {
    Column() {
      this.buildTopBar()
      Scroll() {
        Column() {
          this.buildHeroSection()
          this.buildBenefitBanner()
          this.buildTabs()
          this.buildColorSelector()
          this.buildConfigTags()
          this.buildPriceBlock()
          this.buildTitle()
          this.buildBenefitList()
          this.buildBottomActions()
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F6F7FB')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  buildTopBar() {
    Row() {
      Text('←')
        .fontSize(22)
        .fontColor('#111')
        .onClick(() => router.back())
      Blank().layoutWeight(1)
      Row({ space: 12 }) {
        Text('🔍').fontSize(18)
        Text('↗').fontSize(18)
      }
    }
    .width('100%')
    .height(52)
    .padding({ left: 12, right: 12 })
    .backgroundColor(Color.White)
  }

  @Builder
  buildHeroSection() {
    Row() {
      // 左侧促销卡
      Column() {
        Text('12·12')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FF2E3D')
        Text('华为年终好价节')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FF2E3D')
          .margin({ bottom: 10 })
        Text('购机赠蓝牙耳机')
          .fontSize(14)
          .fontColor('#B00000')
        Text('享12期免息')
          .fontSize(14)
          .fontColor('#B00000')
          .margin({ bottom: 12 })
        Button('立即享福利')
          .type(ButtonType.Capsule)
          .backgroundColor('#FF2E3D')
          .fontColor(Color.White)
          .height(34)
          .padding({ left: 12, right: 12 })
      }
      .width(190)
      .padding({ left: 12, right: 12, top: 14, bottom: 14 })
      .backgroundColor('#FFF0EE')
      .borderRadius({ topLeft: 18, bottomLeft: 18 })

      // 右侧产品图
      Image($r('app.media.phone_Mate_80'))
        .width('100%')
        .height(210)
        .objectFit(ImageFit.Contain)
        .padding({ left: 20, right: 200 })
    }
    .width('100%')
    .height(230)
    .backgroundColor('#FFFFFF')
    .borderRadius(18)
    .shadow({ radius: 12, color: '#12000000', offsetY: 4 })
    .margin({ left: 12, right: 12, top: 10 })
  }

  @Builder
  buildBenefitBanner() {
    Row() {
      Text('新品上市 365天只换不修 + 1年屏保 + 2年电量宝')
        .fontSize(14)
        .fontColor(Color.White)
        .layoutWeight(1)
      Text('立即领取').fontSize(14).fontColor(Color.White)
    }
    .padding({ left: 14, right: 14, top: 10, bottom: 10 })
    .backgroundColor('#FF3B30')
    .borderRadius(14)
    .margin({ left: 12, right: 12, top: 12 })
  }

  @Builder
  buildTabs() {
    Row({ space: 8 }) {
      this.buildTab('概览(1/10)', true)
      this.buildTab('服务', false)
      this.buildTab('搭配购', false)
      this.buildTab('详情', false)
    }
    .padding({ left: 12, right: 12, top: 12 })
  }

  @Builder
  buildTab(label: string, active: boolean) {
    Text(label)
      .fontSize(13)
      .fontWeight(active ? FontWeight.Bold : FontWeight.Normal)
      .fontColor(active ? '#222' : '#888')
      .padding({ left: 10, right: 10, top: 6, bottom: 6 })
      .backgroundColor(active ? '#EDF2FF' : '#F5F5F5')
      .borderRadius(14)
  }

  @Builder
  buildColorSelector() {
    Column() {
      Row({ space: 10 }) {
        this.buildTag('海蓝宝', true)
        this.buildTag('曜石黑', false)
        this.buildTag('月光银', false)
        this.buildTag('星光粉', false)
      }
      .margin({ bottom: 8 })
      Row({ space: 10 }) {
        this.buildTag('官方标配', true)
        this.buildTag('以旧换新', false)
        this.buildTag('高补贴1200', false)
      }
    }
    .padding({ left: 12, right: 12, top: 10 })
  }

  @Builder
  buildConfigTags() {
    Column() {
      Row({ space: 8 }) {
        this.buildChip('国补15%')
        this.buildChip('1元得199元赠品券')
        this.buildChip('抢购')
        this.buildChip('专享')
        this.buildChip('优惠')
      }
    }
    .padding({ left: 12, right: 12, top: 8 })
  }

  @Builder
  buildChip(label: string) {
    Text(label)
      .fontSize(12)
      .fontColor('#007AFF')
      .padding({ left: 10, right: 10, top: 6, bottom: 6 })
      .backgroundColor('#E8F2FF')
      .borderRadius(14)
  }

  @Builder
  buildPriceBlock() {
    Column() {
      Row() {
        Text('国补后约 ¥3699')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor('#0B9B00')
        Text('¥4088')
          .fontSize(14)
          .fontColor('#FFFFFF')
          .opacity(0.8)
          .margin({ left: 10 })
      }
      Text('12期免息 低至 ¥349.92*12期')
        .fontSize(12)
        .fontColor('#F8FFE6')
        .margin({ top: 6 })
    }
    .padding({ left: 14, right: 14, top: 12, bottom: 12 })
    .backgroundColor('#1CAE00')
    .borderRadius(14)
    .margin({ left: 12, right: 12, top: 12 })
  }

  @Builder
  buildTitle() {
    Text('HUAWEI P50 Pro 16GB+512GB 海蓝宝 双卡 全网通版')
      .fontSize(16)
      .fontWeight(FontWeight.Bold)
      .fontColor('#222')
      .margin({ left: 12, right: 12, top: 14 })
  }

  @Builder
  buildBenefitList() {
    Column() {
      Row() {
        Text('国家补贴').fontSize(12).fontColor('#0B9B00')
          .padding({ left: 10, right: 10, top: 6, bottom: 6 })
          .backgroundColor('#E4F7E2')
          .borderRadius(12)
        Text('国家补贴15%，至高补贴500元')
          .fontSize(12)
          .fontColor('#333')
          .margin({ left: 8 })
        Blank()
        Text('立即领取').fontSize(12).fontColor('#0B9B00')
      }
      .margin({ bottom: 12 })

      Text('【新品上市】①购新品1元权益包得199元礼盒赠品券②退换货免运费③支持省心换颜色服务④站内+小额外免息…')
        .fontSize(12)
        .fontColor('#B00000')
        .lineHeight(18)
    }
    .padding({ left: 12, right: 12, top: 10 })
  }

  @Builder
  buildBottomActions() {
    Row() {
      Button('加入购物车')
        .type(ButtonType.Capsule)
        .backgroundColor('#FF9500')
        .fontColor(Color.White)
        .height(44)
        .layoutWeight(1)
      Button('立即购买')
        .type(ButtonType.Capsule)
        .backgroundColor('#007AFF')
        .fontColor(Color.White)
        .height(44)
        .layoutWeight(1)
        .margin({ left: 12 })
    }
    .padding({ left: 12, right: 12, top: 16, bottom: 30 })
  }

  @Builder
  buildTag(label: string, active: boolean) {
    Text(label)
      .fontSize(13)
      .fontColor(active ? '#007AFF' : '#555')
      .padding({ left: 12, right: 12, top: 8, bottom: 8 })
      .backgroundColor(active ? '#E8F2FF' : '#F5F5F5')
      .borderRadius(16)
  }
}
