import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import promptAction from '@ohos.promptAction';
import { DatabaseManager } from '../database/DatabaseManager';
import { Order } from '../model/Order';
import Logger from '../../common/utils/Logger';

const TAG = 'OrderListPage';

@Entry
@Component
struct OrderListPage {
  @State orders: Order[] = [];
  @State isLoading: boolean = true;
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  async aboutToAppear(): Promise<void> {
    try {
      await this.dbManager.initDatabase(this.context);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `init db failed: ${error.message}`);
    }
    await this.loadOrders();
  }

  private async loadOrders(): Promise<void> {
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        promptAction.showToast({ message: '请先登录', duration: 2000 });
        router.replaceUrl({ url: 'userprofile/pages/LoginPage' }).catch(() => {});
        return;
      }
      this.orders = await this.dbManager.getOrders(user.userId, 50);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `loadOrders failed: ${error.message}`);
      promptAction.showToast({ message: '订单加载失败', duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }

  private getStatusText(status: string): string {
    if (status.includes('pending') || status.includes('待')) {
      return '待发货';
    }
    if (status.includes('shipping') || status.includes('运')) {
      return '运输中';
    }
    if (status.includes('finished') || status.includes('完')) {
      return '已完成';
    }
    return status || '处理中';
  }

  private getStatusColor(status: string): string {
    if (status.includes('pending') || status.includes('待')) {
      return '#FF9800';
    }
    if (status.includes('shipping') || status.includes('运')) {
      return '#2196F3';
    }
    if (status.includes('finished') || status.includes('完')) {
      return '#4CAF50';
    }
    return '#999999';
  }

  @Builder
  buildHeader() {
    Row() {
      Text('<')
        .fontSize(22)
        .fontColor(Color.White)
        .padding({ right: 8 })
        .onClick(() => router.back())
      Text('订单')
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
  buildOrderItem(order: Order) {
    Row() {
      Column() {
        Text(order.productName)
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .fontColor(Color.Black)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(order.orderDate)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)

      Column() {
        Text(order.price)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#E95B27')
          .textAlign(TextAlign.End)
        Text(this.getStatusText(order.status))
          .fontSize(12)
          .fontColor(this.getStatusColor(order.status))
          .backgroundColor('#0D000000')
          .padding({ left: 8, right: 8, top: 4, bottom: 4 })
          .borderRadius(10)
          .margin({ top: 6 })
      }
      .alignItems(HorizontalAlign.End)
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 8, color: '#08000000', offsetY: 2 })
  }

  @Builder
  buildContent() {
    if (this.isLoading) {
      Column() {
        LoadingProgress().width(40).height(40).color('#FF6B00')
        Text('加载中...').fontSize(14).fontColor('#999999').margin({ top: 12 })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    } else if (this.orders.length === 0) {
      Column() {
        Text('暂无订单')
          .fontSize(16)
          .fontColor('#999999')
        Button('去首页逛逛')
          .type(ButtonType.Capsule)
          .backgroundColor('#FF8A3C')
          .fontColor(Color.White)
          .margin({ top: 16 })
          .onClick(() => {
            router.replaceUrl({ url: 'pages/HomePage' }).catch(() => {});
          })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    } else {
      List({ space: 12 }) {
        ForEach(this.orders, (order: Order, index: number) => {
          ListItem() {
            this.buildOrderItem(order)
          }
        }, (_order: Order, index: number) => `order-${index}`)
      }
      .width('100%')
      .padding({ top: 12, left: 16, right: 16, bottom: 16 })
      .edgeEffect(EdgeEffect.Spring)
    }
  }

  build() {
    Column() {
      this.buildHeader()
      this.buildContent()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F6F6F6')
  }
}
