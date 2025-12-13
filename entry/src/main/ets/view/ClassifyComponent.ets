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

import { classifyTabs, IClassifyTab } from '../viewmodel/HomeViewModel';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';

const TAG = 'ClassifyComponent';

/**
 * Classify component.
 * Usage: Directly reference ClassifyComponent().
 */
@Component
export default struct ClassifyComponent {
  @Link selectedCategory: number;
  onCategoryChange?: (category: number) => void;

  private handleSelect(category: number): void {
    this.selectedCategory = category;
    Logger.info(TAG, `selectedCategory 更新为: ${this.selectedCategory}`);
    if (this.onCategoryChange) {
      this.onCategoryChange(category);
    }
  }

  @Builder
  private buildChip(tab: IClassifyTab) {
    Row() {
      Text(tab.title)
        .fontSize($r('app.float.smaller_font_size'))
        .fontColor(this.selectedCategory === tab.category ? $r('app.color.focus_color') : '#243144')
        .fontWeight(this.selectedCategory === tab.category ? Const.FONT_WEIGHT_FIVE : FontWeight.Normal)
    }
    .padding({ left: 6, right: 6, top: 4, bottom: 4 })
    .backgroundColor(this.selectedCategory === tab.category ? '#FFF2EC' : '#F3F5F7')
    .borderRadius(10)
    .shadow(this.selectedCategory === tab.category ? { radius: 8, color: '#1A000000', offsetX: 0, offsetY: 2 } : {
      radius: 0, color: Color.Transparent, offsetX: 0, offsetY: 0
    })
    .margin({ right: 6 })
    .onClick(() => this.handleSelect(tab.category))
  }

  build() {
    Row() {
      ForEach(classifyTabs, (tab: IClassifyTab) => {
        this.buildChip(tab);
      }, (tab: IClassifyTab) => tab.category.toString())
    }
    .justifyContent(FlexAlign.Start)
    .alignItems(VerticalAlign.Center)
    .width(Const.FULL_WIDTH)
    .backgroundColor('#FDFDFD')
    .borderRadius(18)
    .padding({ left: 8, right: 8, top: 6, bottom: 6 })
    .margin({ top: $r('app.float.classify_title_margin') })
    .shadow({ radius: 12, color: '#14000000', offsetX: 0, offsetY: 4 })
  }
}
