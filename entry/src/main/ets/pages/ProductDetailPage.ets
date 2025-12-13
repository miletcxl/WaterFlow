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
import ProductItem, { IProductItem } from '../viewmodel/ProductItem';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';

const TAG = 'ProductDetailPage';

/**
 * Product detail page.
 */
@Entry
@Component
struct ProductDetailPage {
  @State product: ProductItem | null = null;

  aboutToAppear() {
    // 从路由参数中获取商品信息
    const params = router.getParams() as Record<string, IProductItem>;
    if (params && params['product']) {
      // 将接口对象转换为 ProductItem 实例
      this.product = new ProductItem(params['product']);
      Logger.info(TAG, `商品详情页加载，商品名称: ${this.product.name}`);
    } else {
      Logger.error(TAG, '未获取到商品信息');
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

                Row() {
                  Text('商品类别：')
                    .fontSize(14)
                    .fontColor('#666666')
                  Text(this.getCategoryName(this.product.category))
                    .fontSize(14)
                    .fontColor(Color.Black)
                }
                .width('100%')
                .margin({ bottom: 8 })

                Row() {
                  Text('商品编号：')
                    .fontSize(14)
                    .fontColor('#666666')
                  Text(`PROD-${this.product.name.substring(0, 3).toUpperCase()}-001`)
                    .fontSize(14)
                    .fontColor(Color.Black)
                }
                .width('100%')
              }
              .width('100%')
              .padding({ top: 16, bottom: 16 })
              .backgroundColor('#FAFAFA')
              .borderRadius(8)
              .margin({ bottom: 24 })
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
          Button('立即购买')
            .type(ButtonType.Capsule)
            .backgroundColor($r('app.color.focus_color'))
            .fontColor(Color.White)
            .fontSize(16)
            .layoutWeight(1)
            .height(48)
            .onClick(() => {
              Logger.info(TAG, `点击立即购买: ${this.product?.name}`);
              // TODO: 实现购买逻辑
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
      4: '男装',
      5: '生鲜',
      6: '家具厨具'
    };
    return categoryMap[category] || '未知';
  }
}
