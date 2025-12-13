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

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import ProductItem from '../viewmodel/ProductItem';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import { router } from '@kit.ArkUI';
import Logger from '../common/utils/Logger';

const TAG = 'FlowItemComponent';

/**
 * Flow item component.
 * Usage: This component is used in FlowItem.
 */
@Component
export default struct FlowItemComponent {
  item: ProductItem = waterFlowData[0];

  build() {
    Column() {
      Image(this.item?.image_url)
        .width($r('app.float.product_image_size'))
        .height($r('app.float.product_image_size'))
        .objectFit(ImageFit.Contain)
        .margin({
          top: $r('app.float.water_flow_image_top'),
          bottom: $r('app.float.water_flow_image_bottom')
        })
      Text(this.item?.name)
        .fontSize($r('app.float.small_font_size'))
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Normal)
        .alignSelf(ItemAlign.Start)
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width(Const.FULL_WIDTH)
        .height(40)
        .margin({ bottom: 4 })
      if (this.item?.discount && this.item.discount.trim() !== '') {
        Text(this.item.discount)
          .fontSize($r('app.float.smaller_font_size'))
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Normal)
          .opacity(Const.SIXTY_OPACITY)
          .alignSelf(ItemAlign.Start)
          .height(18)
          .margin({
            bottom: $r('app.float.discount_text_bottom')
          })
      } else {
        Blank()
          .height(18)
          .margin({
            bottom: $r('app.float.discount_text_bottom')
          })
      }
      Text(this.item?.price)
        .fontSize($r('app.float.middle_font_size'))
        .fontColor($r('app.color.focus_color'))
        .fontWeight(FontWeight.Normal)
        .alignSelf(ItemAlign.Start)
        .lineHeight($r('app.float.piece_line_height'))
        .height(19)
    }
    .width(Const.FULL_WIDTH)
    .borderRadius($r('app.float.product_layout_radius'))
    .backgroundColor(Color.White)
    .padding({
      left: $r('app.float.product_layout_margin_left'),
      right: $r('app.float.product_layout_margin_right'),
      top: 0,
      bottom: $r('app.float.product_layout_margin_bottom')
    })
    .onClick(() => {
      Logger.info(TAG, `点击商品: ${this.item?.name}`);
      // 跳转到商品详情页，传递商品信息（转换为可序列化的对象）
      router.pushUrl({
        url: 'pages/ProductDetailPage',
        params: {
          product: {
            image_url: this.item.image_url,
            name: this.item.name,
            discount: this.item.discount,
            price: this.item.price,
            promotion: this.item.promotion,
            bonus_points: this.item.bonus_points,
            category: this.item.category
          }
        }
      }).catch((err: Error) => {
        Logger.error(TAG, `跳转商品详情页失败: ${err.message}`);
      });
    })
  }
}