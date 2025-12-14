import { router } from '@kit.ArkUI';

type CouponStatus = 'available' | 'used' | 'expired';

interface CouponItem {
  title: string;
  amount: string;
  desc: string;
  status: CouponStatus;
  expire: string;
}

@Entry
@Component
struct CouponListPage {
  @State coupons: CouponItem[] = [
    { title: '新人礼', amount: '¥30', desc: '满199可用', status: 'available', expire: '有效期至 12-31' },
    { title: '满减券', amount: '¥50', desc: '满399可用', status: 'used', expire: '已使用' },
    { title: '家电专享', amount: '¥80', desc: '满999可用', status: 'expired', expire: '已过期' }
  ];

  private getStatusText(status: CouponStatus): string {
    switch (status) {
      case 'available':
        return '可用';
      case 'used':
        return '已使用';
      case 'expired':
        return '已过期';
      default:
        return '';
    }
  }

  private getStatusColor(status: CouponStatus): string {
    switch (status) {
      case 'available':
        return '#FF6B00';
      case 'used':
        return '#999999';
      case 'expired':
        return '#999999';
      default:
        return '#999999';
    }
  }

  @Builder
  buildHeader() {
    Row() {
      Text('<')
        .fontSize(22)
        .fontColor(Color.White)
        .padding({ right: 8 })
        .onClick(() => router.back())
      Text('优惠券')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
    }
    .width('100%')
    .height(52)
    .padding({ left: 16, right: 16 })
    .backgroundColor('#FF8A3C')
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  buildCoupon(item: CouponItem) {
    Row() {
      Column() {
        Text(item.amount)
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FF6B00')
        Text(item.title)
          .fontSize(14)
          .fontColor('#333333')
      }
      .width(100)

      Column() {
        Text(item.desc)
          .fontSize(14)
          .fontColor('#333333')
        Text(item.expire)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 6 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)

      Text(this.getStatusText(item.status))
        .fontSize(12)
        .fontColor(this.getStatusColor(item.status))
        .padding({ left: 10, right: 10, top: 4, bottom: 4 })
        .borderRadius(10)
        .backgroundColor('#0D000000')
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 8, color: '#08000000', offsetY: 2 })
  }

  build() {
    Column() {
      this.buildHeader()
      List({ space: 12 }) {
        ForEach(this.coupons, (item: CouponItem, index: number) => {
          ListItem() {
            this.buildCoupon(item)
          }
        }, (_item: CouponItem, index: number) => `coupon-${index}`)
      }
      .width('100%')
      .padding({ top: 12, left: 16, right: 16, bottom: 16 })
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F6F6F6')
  }
}
