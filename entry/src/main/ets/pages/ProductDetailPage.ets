/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import ProductItem, { IProductItem } from '../viewmodel/ProductItem';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import { DatabaseManager } from '../userprofile/database/DatabaseManager';
import { Favorite } from '../userprofile/model/Favorite';
import { Order } from '../userprofile/model/Order';
import promptAction from '@ohos.promptAction';

interface SpecItem {
  label: string;
  value: string;
}

const TAG = 'ProductDetailPage';

/**
 * Product detail page.
 */
@Entry
@Component
struct ProductDetailPage {
  @State product: ProductItem | null = null;
  @State isFavorite: boolean = false;
  @State isOrdering: boolean = false;
  private favoriteId: number = 0;
  private readonly bullet: string = '*';
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  async aboutToAppear(): Promise<void> {
    try {
      await this.dbManager.initDatabase(this.context);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `????????: ${error.message}`);
    }

    // ????????????
    const params = router.getParams() as Record<string, IProductItem>;
    if (params && params['product']) {
      // ???????? ProductItem ??
      this.product = new ProductItem(params['product']);
      Logger.info(TAG, `????????????: ${this.product.name}`);
      await this.loadFavoriteStatus();
    } else {
      Logger.error(TAG, '????????');
    }
  }

  build(): void {
    Column() {
      if (!this.product) {
        this.buildEmptyState()
      } else {
        // 顶部导航栏
        Row() {
          Text('←')
            .fontSize(24)
            .fontColor(Color.Black)
            .width(40)
            .height(40)
            .textAlign(TextAlign.Center)
            .padding({ top: 6 })
            .onClick(() => {
              router.back();
            })
          Blank()
          Text('商品详情')
            .fontSize(18)
            .fontColor(Color.Black)
            .fontWeight(FontWeight.Medium)
          Blank()
          Blank()
            .width(40)
        }
        .width('100%')
        .height(56)
        .padding({ left: 16, right: 16, top: 35, bottom: 6 })
        .alignItems(VerticalAlign.Center)
        .justifyContent(FlexAlign.Start)
        .backgroundColor(Color.White)
        .shadow({
          radius: 4,
          color: '#1F000000',
          offsetX: 0,
          offsetY: 2
        })

        // 商品内容区域
        Scroll() {
          Column() {
            // 商品图片
            Image(this.product.image_url)
              .width('100%')
              .height(400)
              .objectFit(ImageFit.Cover)
              .backgroundColor('#F5F5F5')

            // 商品信息
            Column() {
              // 商品名称
              Text(this.product.name)
                .fontSize(20)
                .fontColor(Color.Black)
                .fontWeight(FontWeight.Bold)
                .margin({ top: 16, bottom: 8 })
                .width('100%')

              // 价格信息
              Text(this.product.price)
                .fontSize(28)
                .fontColor($r('app.color.focus_color'))
                .fontWeight(FontWeight.Bold)
                .width('100%')
                .margin({ bottom: 16 })

              // 促销与积分信息
              Column() {
                if (this.product.promotion && this.product.promotion.length > 0) {
                  Row() {
                    Text('优惠')
                      .fontSize(12)
                      .fontColor('#FF5722')
                      .backgroundColor('#FFF2EC')
                      .padding({ left: 6, right: 6, top: 2, bottom: 2 })
                      .borderRadius(8)
                    Text(`${this.product.promotion}进行中`)
                      .fontSize(14)
                      .fontColor('#FF5722')
                      .margin({ left: 8 })
                  }
                  .margin({ bottom: 8 })
                }
                if (this.product.bonus_points && this.product.bonus_points.length > 0) {
                  Row() {
                    Text('积分')
                      .fontSize(12)
                      .fontColor('#3F51B5')
                      .backgroundColor('#EEF0FF')
                      .padding({ left: 6, right: 6, top: 2, bottom: 2 })
                      .borderRadius(8)
                    Text(`${this.product.bonus_points}，下单即享`)
                      .fontSize(14)
                      .fontColor('#3F51B5')
                      .margin({ left: 8 })
                  }
                }
              }
              .width('100%')
              .margin({ bottom: 12 })

              // 服务标签
              Row() {
                ForEach(this.getServiceBadges(), (badge: string, index: number) => {
                  Text(badge)
                    .fontSize(12)
                    .fontColor('#4CAF50')
                    .backgroundColor('#E8F5E9')
                    .padding({ left: 8, right: 8, top: 4, bottom: 4 })
                    .borderRadius(10)
                    .margin({ right: 8, bottom: 8 })
                }, (badge: string, index: number) => `${badge}-${index}`)
              }
              .width('100%')

              // 配送与承诺
              Column() {
                Text('配送与服务')
                  .fontSize(16)
                  .fontColor(Color.Black)
                  .fontWeight(FontWeight.Medium)
                  .margin({ bottom: 8 })
                Text(this.getDeliveryInfo())
                  .fontSize(14)
                  .fontColor('#666666')
                  .lineHeight(22)
              }
              .width('100%')
              .margin({ top: 8, bottom: 16 })

              Divider()
                .color('#F0F0F0')
                .margin({ top: 16, bottom: 16 })

              // 商品详情标题
              Text('商品详情')
                .fontSize(18)
                .fontColor(Color.Black)
                .fontWeight(FontWeight.Medium)
                .width('100%')
                .margin({ bottom: 12 })

              // 商品描述
              Text(`这是一款优质的${this.product.name}，具有出色的性能和品质。无论是日常使用还是专业需求，都能满足您的期望。`)
                .fontSize(14)
                .fontColor('#666666')
                .lineHeight(24)
                .width('100%')
                .margin({ bottom: 24 })

              // 商品规格
              Column() {
                Text('商品规格')
                  .fontSize(16)
                  .fontColor(Color.Black)
                  .fontWeight(FontWeight.Medium)
                  .width('100%')
                  .margin({ bottom: 12 })

                ForEach(this.getSpecsByCategory(this.product.category, this.product.name), (item: SpecItem, index: number) => {
                  Row() {
                    Text(`${item.label}：`)
                      .fontSize(14)
                      .fontColor('#666666')
                      .width(110)
                    Text(item.value)
                      .fontSize(14)
                      .fontColor(Color.Black)
                      .layoutWeight(1)
                  }
                  .width('100%')
                  .margin({ bottom: 8 })
                }, (_item: SpecItem, index: number) => `spec-${index}`)
              }
              .width('100%')
              .padding({ top: 16, bottom: 16 })
              .backgroundColor('#FAFAFA')
              .borderRadius(8)
              .margin({ bottom: 24 })

              // 包装清单
              Column() {
                Text('包装清单')
                  .fontSize(16)
                  .fontColor(Color.Black)
                  .fontWeight(FontWeight.Medium)
                  .margin({ bottom: 8 })
                ForEach(this.getPackageList(this.product.category), (item: string, index: number) => {
                  Row() {
                    Text(this.bullet)
                      .fontSize(14)
                      .fontColor('#666666')
                      .margin({ right: 6 })
                    Text(item)
                      .fontSize(14)
                      .fontColor(Color.Black)
                  }
                  .width('100%')
                  .margin({ bottom: 4 })
                }, (item: string, index: number) => `pkg-${index}`)
              }
              .width('100%')
              .padding({ top: 12, bottom: 20, left: 12, right: 12 })
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
              .shadow({ radius: 6, color: '#08000000', offsetX: 0, offsetY: 2 })
              .margin({ bottom: 24 })

              // 售后服务
              Column() {
                Text('售后与保障')
                  .fontSize(16)
                  .fontColor(Color.Black)
                  .fontWeight(FontWeight.Medium)
                  .margin({ bottom: 8 })
                Text('支持七天无理由退换、质保两年，平台售后客服在线答疑。若您在收货后发现商品或配件缺失，请在 24 小时内联系客服处理。')
                  .fontSize(14)
                  .fontColor('#666666')
                  .lineHeight(22)
              }
              .width('100%')
              .padding({ top: 12, bottom: 16, left: 12, right: 12 })
              .backgroundColor('#FFFFFF')
              .borderRadius(8)
            }
            .width('100%')
            .padding({ left: 16, right: 16 })
            .backgroundColor(Color.White)
          }
          .width('100%')
        }
        .layoutWeight(1)
        .scrollBar(BarState.Auto)

        // 底部操作栏
        Row() {
          Button(this.isFavorite ? '取消收藏' : '收藏')
            .type(ButtonType.Capsule)
            .backgroundColor(this.isFavorite ? '#FFE1D6' : '#FFF2E5')
            .fontColor('#FF6B00')
            .fontSize(16)
            .layoutWeight(1)
            .height(48)
            .enabled(!this.isOrdering)
            .onClick(async () => {
              await this.toggleFavorite();
            })
            .margin({ right: 12 })
          Button(this.isOrdering ? '处理中...' : '立即购买')
            .type(ButtonType.Capsule)
            .backgroundColor($r('app.color.focus_color'))
            .fontColor(Color.White)
            .fontSize(16)
            .layoutWeight(1)
            .height(48)
            .enabled(!this.isOrdering)
            .onClick(async () => {
              await this.handleBuyNow();
            })
        }
        .width('100%')
        .height(64)
        .padding({ left: 16, right: 16, top: 8, bottom: 8 })
        .backgroundColor(Color.White)
        .shadow({
          radius: 8,
          color: '#1F000000',
          offsetX: 0,
          offsetY: -2
        })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  @Builder
  buildEmptyState() {
    Column() {
      Text('商品信息加载失败')
        .fontSize(16)
        .fontColor('#999999')
        .margin({ bottom: 16 })
      
      Button('返回')
        .type(ButtonType.Capsule)
        .onClick(() => {
          router.back();
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }

  /**
   * 获取分类名称
   */
  getCategoryName(category: number): string {
    const categoryMap: Record<number, string> = {
      0: '全部',
      1: '手机',
      2: '电脑',
      3: '食品',
      6: '智能家居',
      7: '耳机音箱',
      8: '智慧屏'
    };
    return categoryMap[category] || '未知';
  }

  /**
   * 根据分类生成规格参数
   */
  getSpecsByCategory(category: number, name: string): SpecItem[] {
    const baseSpecs: SpecItem[] = [
      { label: '商品类别', value: this.getCategoryName(category) },
      { label: '商品编号', value: `PROD-${name.substring(0, 3).toUpperCase()}-001` },
      { label: '适用场景', value: '日常家用 / 办公 / 旅行' }
    ];

    switch (category) {
      case 1: // 手机
        return baseSpecs.concat([
          { label: '操作系统', value: 'HarmonyOS 4' },
          { label: '屏幕', value: '6.7 英寸 OLED 高刷屏' },
          { label: '影像', value: '超感知影像系统，支持夜景/人像' },
          { label: '续航', value: '5000mAh 大电池，66W 有线快充' }
        ]);
      case 2: // 电脑
        return baseSpecs.concat([
          { label: '处理器', value: '酷睿 / Ryzen 旗舰芯片' },
          { label: '内存硬盘', value: '16GB + 512GB 标配，可选 1TB SSD' },
          { label: '屏幕', value: '2.5K 护眼屏，100% sRGB' },
          { label: '重量', value: '约 1.3kg，便携轻薄' }
        ]);
      case 3: // 食品
        return baseSpecs.concat([
          { label: '保质期', value: '见包装（建议尽快食用）' },
          { label: '存储条件', value: '阴凉干燥处，避免阳光直射' },
          { label: '产地', value: '国产严选供应商' }
        ]);
      case 6: // 智能家居
        return baseSpecs.concat([
          { label: '连接方式', value: 'Wi-Fi / 蓝牙 / 智能家居联动' },
          { label: '特色', value: '语音/APP 远程控制，场景自动化' },
          { label: '适配', value: '兼容鸿蒙生态及主流智能家电' }
        ]);
      case 7: // 耳机音箱
        return baseSpecs.concat([
          { label: '音频特性', value: '主动降噪，LDAC 高清音频' },
          { label: '续航', value: '单次 6-8 小时，配充电盒 24+ 小时' },
          { label: '连接', value: '蓝牙 5.x，多设备快速切换' }
        ]);
      case 8: // 智慧屏
        return baseSpecs.concat([
          { label: '显示', value: '4K 超高清，HDR，120Hz 高刷' },
          { label: '音频', value: '多单元音响，沉浸式立体声' },
          { label: '交互', value: '智慧投屏，多设备协同' }
        ]);
      default:
        return baseSpecs;
    }
  }

  /**
   * 包装清单
   */
  getPackageList(category: number): string[] {
    const baseList: string[] = ['主机/本体', '快速入门指南', '保修卡'];
    switch (category) {
      case 1:
        return baseList.concat(['原装充电器与数据线', '卡针/保护膜（部分机型）']);
      case 2:
        return baseList.concat(['原装充电适配器', '便携收纳袋（部分机型）']);
      case 6:
        return baseList.concat(['安装配件/底座（视型号而定）', '备用耗材包（部分型号）']);
      case 7:
        return baseList.concat(['充电线/耳套套装（耳机）', '收纳盒或便携袋（音箱/耳机）']);
      case 8:
        return baseList.concat(['电源线/支架组件', '遥控器与电池']);
      default:
        return baseList;
    }
  }

  /**
   * 服务徽章
   */
  getServiceBadges(): string[] {
    return ['官方直发', '24 小时内发货', '七天无理由', '两年质保'];
  }

  /**
   * 配送信息
   */
  getDeliveryInfo(): string {
    return '默认选择距您最近的仓发货，支持预约/加急配送，偏远地区时效略有差异。';
  }
  /**
   * Load favorite status for current user
   */
  private async loadFavoriteStatus(): Promise<void> {
    if (!this.product) {
      return;
    }
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        this.isFavorite = false;
        this.favoriteId = 0;
        return;
      }
      const favorite = await this.dbManager.getFavoriteByName(user.userId, this.product.name);
      if (favorite) {
        this.isFavorite = true;
        this.favoriteId = favorite.favoriteId;
      } else {
        this.isFavorite = false;
        this.favoriteId = 0;
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `loadFavoriteStatus failed: ${error.message}`);
    }
  }

  /**
   * Toggle favorite state
   */
  private async toggleFavorite(): Promise<void> {
    if (!this.product) {
      return;
    }
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        promptAction.showToast({ message: 'Please log in first', duration: 2000 });
        router.pushUrl({ url: 'userprofile/pages/LoginPage' }).catch(() => {});
        return;
      }
      if (!this.isFavorite) {
        const favorite = new Favorite();
        favorite.productName = this.product.name;
        // image_url 是 Resource，这里存字符串占位，实际可用静态映射
        favorite.productImage = '';
        favorite.price = this.product.price;
        const insertId = await this.dbManager.saveFavorite(user.userId, favorite);
        this.favoriteId = insertId;
        this.isFavorite = true;
        promptAction.showToast({ message: 'Added to favorites', duration: 2000 });
      } else {
        const targetId = this.favoriteId ||
          (await this.dbManager.getFavoriteByName(user.userId, this.product.name))?.favoriteId || 0;
        if (targetId) {
          await this.dbManager.deleteFavorite(user.userId, targetId);
        }
        this.isFavorite = false;
        this.favoriteId = 0;
        promptAction.showToast({ message: 'Favorite removed', duration: 2000 });
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `toggleFavorite failed: ${error.message}`);
      promptAction.showToast({ message: 'Operation failed', duration: 2000 });
    }
  }

  /**
   * Save order when buying now
   */
  private async handleBuyNow(): Promise<void> {
    if (!this.product || this.isOrdering) {
      return;
    }
    this.isOrdering = true;
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        promptAction.showToast({ message: 'Please log in before buying', duration: 2000 });
        router.pushUrl({ url: 'userprofile/pages/LoginPage' }).catch(() => {});
        return;
      }
      const order = new Order();
      order.productName = this.product.name;
      order.price = this.product.price;
      order.status = 'pending';
      order.orderDate = this.formatToday();
      await this.dbManager.saveOrder(user.userId, order);
      promptAction.showToast({ message: 'Order placed', duration: 2000 });
      Logger.info(TAG, `Order placed: ${this.product.name}`);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `handleBuyNow failed: ${error.message}`);
      promptAction.showToast({ message: 'Order failed', duration: 2000 });
    } finally {
      this.isOrdering = false;
    }
  }

  private formatToday(): string {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  }

}
