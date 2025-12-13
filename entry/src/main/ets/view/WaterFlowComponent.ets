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

import ProductItem from '../viewmodel/ProductItem';
import { WaterFlowDataSource } from '../viewmodel/WaterFlowDataSource';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import FlowItemComponent from '../view/FlowItemComponent';
import { IProductItem } from '../viewmodel/ProductItem';
import Logger from '../common/utils/Logger';

const TAG = 'WaterFlowComponent';

/**
 * Water flow component.
 *
 * Usage: Directly reference WaterFlowComponent().
 */
@Component
export default struct WaterFlowComponent {
  @StorageLink('bottomRectHeight') bottomRectHeight: number = 0;
  @Prop productData: IProductItem[] = waterFlowData;
  private datasource: WaterFlowDataSource = new WaterFlowDataSource();
  private lastDataLength: number = -1;
  private lastFirstItemName: string = '';

  private updateDataSourceIfNeeded(): void {
    const currentFirstItemName = this.productData.length > 0 ? this.productData[0].name : '';
    if (this.lastDataLength !== this.productData.length ||
        this.lastFirstItemName !== currentFirstItemName) {
      Logger.info(TAG, `同步数据源，商品数量: ${this.productData.length}`);
      this.lastDataLength = this.productData.length;
      this.lastFirstItemName = currentFirstItemName;
      this.datasource.setDataArray(this.productData);
      Logger.info(TAG, `数据源已更新，总数: ${this.datasource.totalCount()}`);
    }
  }

  aboutToAppear() {
    Logger.info(TAG, `WaterFlowComponent aboutToAppear, 商品数量: ${this.productData.length}`);
    // 初次同步数据
    this.updateDataSourceIfNeeded();
  }

  aboutToUpdate() {
    Logger.info(TAG, `WaterFlowComponent aboutToUpdate 被调用`);
    Logger.info(TAG, `上次数据长度: ${this.lastDataLength}, 当前数据长度: ${this.productData.length}`);

    if (this.productData.length === 0) {
      if (this.lastDataLength !== 0) {
        this.datasource.setDataArray([]);
        this.lastDataLength = 0;
        this.lastFirstItemName = '';
      }
    } else {
      this.updateDataSourceIfNeeded();
    }
  }

  @Builder
  buildWaterFlow() {
    WaterFlow({ footer: (): void => this.itemFoot() }) {
      LazyForEach(this.datasource, (item: ProductItem) => {
        FlowItem() {
          FlowItemComponent({ item: item })
        }
      }, (item: ProductItem) => JSON.stringify(item))
    }
    .layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT)
    .layoutDirection(FlexDirection.Column)
    .columnsTemplate(Const.WATER_FLOW_COLUMNS_TEMPLATE)
    .columnsGap($r('app.float.water_flow_columns_gap'))
    .rowsGap($r('app.float.water_flow_row_gap'))
  }

  @Builder
  buildEmptyState() {
    Column() {
      Text($r('app.string.no_search_result'))
        .fontColor(Color.Gray)
        .fontSize($r('app.float.footer_text_size'))
        .textAlign(TextAlign.Center)
        .margin({ top: $r('app.float.water_flow_row_gap') })
    }
    .width(Const.FULL_WIDTH)
    .layoutWeight(Const.WATER_FLOW_LAYOUT_WEIGHT)
  }

  build() {
    // 使用 Column 作为单一根节点，根据条件调用不同的 Builder
    Column() {
      if (this.productData.length > 0) {
        this.buildWaterFlow()
      } else {
        this.buildEmptyState()
      }
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  itemFoot() {
    if (this.productData.length > 0) {
      Column() {
        Text($r('app.string.footer_text'))
          .fontColor(Color.Gray)
          .fontSize($r('app.float.footer_text_size'))
          .width(Const.FULL_WIDTH)
          .height($r('app.float.footer_text_height'))
          .textAlign(TextAlign.Center)
      }
      .margin({
        top: $r('app.float.water_flow_row_gap'),
        bottom: this.getUIContext().px2vp(this.bottomRectHeight)
      })
    }
  }
}
