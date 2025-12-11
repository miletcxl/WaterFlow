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

/**
 * Search component.
 *
 * Usage: Directly reference SearchComponent().
 */
@Component
export default struct SearchComponent {
  @Prop searchKeyword: string = '';
  onSearchChange?: (keyword: string) => void;
  onSearch?: () => void;
  @State private inputValue: string = '';
  private textInputKey: number = 0;

  aboutToAppear() {
    this.inputValue = this.searchKeyword;
  }

  aboutToUpdate() {
    // 只在外部值被清空时才同步，避免打断用户输入
    if (this.searchKeyword === '' && this.inputValue !== '') {
      this.inputValue = '';
      // 通过改变key来强制重新创建TextInput，实现清空
      this.textInputKey++;
    }
  }

  build() {
    Row() {
      Image($r('app.media.ic_search'))
        .width($r('app.float.search_width'))
        .height($r('app.float.search_height'))
        .margin({
          left: $r('app.float.search_margin_left'),
          right: $r('app.float.search_margin_right')
        })
      TextInput({ placeholder: $r('app.string.search_placeholder') })
        .key(this.textInputKey.toString())
        .layoutWeight(1)
        .type(InputType.Normal)
        .fontSize($r('app.float.small_font_size'))
        .fontColor(Color.Black)
        .placeholderColor(Color.Gray)
        .placeholderFont({ size: $r('app.float.small_font_size'), weight: FontWeight.Normal })
        .onChange((value: string) => {
          // 不绑定text属性，让TextInput自己管理状态，避免打断输入法
          this.inputValue = value;
          if (this.onSearchChange) {
            this.onSearchChange(value);
          }
        })
        .onSubmit(() => {
          if (this.onSearch) {
            this.onSearch();
          }
        })
        .maxLength(50)
      if (this.inputValue.length > 0) {
        Image($r('app.media.ic_more'))
          .width($r('app.float.search_width'))
          .height($r('app.float.search_height'))
          .margin({ right: $r('app.float.search_margin_right') })
          .onClick(() => {
            this.inputValue = '';
            // 通过改变key来强制重新创建TextInput，实现清空
            this.textInputKey++;
            if (this.onSearchChange) {
              this.onSearchChange('');
            }
          })
      }
    }
    .width(Const.FULL_WIDTH)
    .height($r('app.float.search_swiper_height'))
    .borderRadius($r('app.float.search_radius'))
    .backgroundColor(Color.White)
    .margin({ top: $r('app.float.search_margin_top') })
    .padding({ left: $r('app.float.search_margin_left'), right: $r('app.float.search_margin_right') })
  }
}