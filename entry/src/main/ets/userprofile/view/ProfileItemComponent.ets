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

import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { ProfileMenuItem } from '../model/UserInfo';

/**
 * Profile menu item component.
 */
@Component
export default struct ProfileItemComponent {
  /**
   * Menu item data.
   */
  menuItem: ProfileMenuItem = new ProfileMenuItem();

  /**
   * Click callback.
   */
  onItemClick?: (actionType: string) => void;

  build() {
    Row() {
      // Icon with background circle
      if (this.menuItem.icon) {
        Stack({ alignContent: Alignment.Center }) {
          Circle({ width: $r('app.float.profile_menu_icon_bg_size'), height: $r('app.float.profile_menu_icon_bg_size') })
            .fill($r('app.color.profile_menu_icon_bg'))
          Image(this.menuItem.icon)
            .width($r('app.float.profile_menu_icon_size'))
            .height($r('app.float.profile_menu_icon_size'))
        }
        .margin({ right: $r('app.float.profile_menu_icon_margin_right') })
      }

      // Title
      Text(this.menuItem.title)
        .fontSize($r('app.float.profile_menu_font_size'))
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Medium)
        .layoutWeight(1)

      // Arrow
      if (this.menuItem.showArrow) {
        Image($r('app.media.ic_more'))
          .width($r('app.float.profile_menu_arrow_size'))
          .height($r('app.float.profile_menu_arrow_size'))
          .fillColor($r('app.color.profile_text_secondary'))
      }
    }
    .width(Const.FULL_WIDTH)
    .height($r('app.float.profile_menu_item_height'))
    .padding({
      left: $r('app.float.profile_padding_horizontal'),
      right: $r('app.float.profile_padding_horizontal')
    })
    .alignItems(VerticalAlign.Center)
    .backgroundColor(Color.White)
    .onClick(() => {
      if (this.onItemClick) {
        this.onItemClick(this.menuItem.actionType);
      }
    })
  }
}

