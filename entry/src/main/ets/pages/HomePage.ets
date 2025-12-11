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
import ClassifyComponent from '../view/ClassifyComponent';
import SearchComponent from '../view/SearchComponent';
import SwiperComponent from '../view/SwiperComponent';
import WaterFlowComponent from '../view/WaterFlowComponent';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import { IProductItem } from '../viewmodel/ProductItem';

/**
 * The home page consists of four components: search component,
 * classify component, swiper component, and waterfall flow component.
 * How to use: These four components are invoked where the control is used.
 */
@Entry
@Component
struct HomePage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  @State searchKeyword: string = '';
  @State filteredData: IProductItem[] = waterFlowData;

  aboutToAppear() {
    this.filteredData = waterFlowData;
  }

  /**
   * Filter products based on search keyword.
   */
  private filterProducts(keyword: string): void {
    if (!keyword || keyword.trim().length === 0) {
      this.filteredData = waterFlowData;
      return;
    }
    const lowerKeyword = keyword.toLowerCase().trim();
    this.filteredData = waterFlowData.filter((item: IProductItem) => {
      return item.name.toLowerCase().includes(lowerKeyword) ||
        item.price.toLowerCase().includes(lowerKeyword) ||
        (item.discount && item.discount.toLowerCase().includes(lowerKeyword)) ||
        (item.promotion && item.promotion.toLowerCase().includes(lowerKeyword));
    });
  }

  /**
   * Handle search keyword change.
   */
  private onSearchChange(keyword: string): void {
    this.searchKeyword = keyword;
    this.filterProducts(keyword);
  }

  /**
   * Handle search submit.
   */
  private onSearch(): void {
    this.filterProducts(this.searchKeyword);
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      Image($r('app.media.ic_app_background'))
        .width(Const.FULL_WIDTH)
        .height($r('app.float.image_background_height'))
        .objectFit(ImageFit.Cover)
      Column() {
        SearchComponent({
          searchKeyword: this.searchKeyword,
          onSearchChange: (keyword: string) => {
            this.onSearchChange(keyword);
          },
          onSearch: () => {
            this.onSearch();
          }
        })
        ClassifyComponent()
        SwiperComponent()
        WaterFlowComponent({ productData: this.filteredData })
      }
      .padding({
        left: $r('app.float.home_margin_left'),
        right: $r('app.float.home_margin_right'),
        top: this.getUIContext().px2vp(this.topRectHeight)
      })
    }
    .backgroundColor($r('app.color.home_background_color'))
  }
}