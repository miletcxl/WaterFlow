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
import { UserInfo } from '../model/UserInfo';

/**
 * Profile header component.
 * Displays user avatar, name, and signature.
 */
@Component
export default struct ProfileHeaderComponent {
  /**
   * User information.
   */
  userInfo: UserInfo = new UserInfo();

  build() {
    Column() {
      // Avatar with border and shadow
      Stack({ alignContent: Alignment.Center }) {
        if (this.userInfo.avatar) {
          Image(this.userInfo.avatar)
            .width($r('app.float.profile_avatar_size'))
            .height($r('app.float.profile_avatar_size'))
            .borderRadius($r('app.float.profile_avatar_radius'))
            .objectFit(ImageFit.Cover)
            .border({
              width: $r('app.float.profile_avatar_border_width'),
              color: Color.White
            })
            .shadow({
              radius: $r('app.float.profile_avatar_shadow_radius'),
              color: $r('app.color.profile_avatar_shadow_color'),
              offsetX: 0,
              offsetY: 4
            })
        } else {
          // Default avatar placeholder with gradient
          Column() {
            Text(this.userInfo.userName.length > 0 ? this.userInfo.userName.charAt(0) : 'U')
              .fontSize($r('app.float.profile_avatar_text_size'))
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
          }
          .width($r('app.float.profile_avatar_size'))
          .height($r('app.float.profile_avatar_size'))
          .borderRadius($r('app.float.profile_avatar_radius'))
          .linearGradient({
            angle: 135,
            colors: [[$r('app.color.profile_avatar_gradient_start'), 0.0], [$r('app.color.profile_avatar_gradient_end'), 1.0]]
          })
          .border({
            width: $r('app.float.profile_avatar_border_width'),
            color: Color.White
          })
          .shadow({
            radius: $r('app.float.profile_avatar_shadow_radius'),
            color: $r('app.color.profile_avatar_shadow_color'),
            offsetX: 0,
            offsetY: 4
          })
        }
      }
      .margin({ top: $r('app.float.profile_header_margin_top') })

      // User name
      Text(this.userInfo.userName || $r('app.string.profile_default_name'))
        .fontSize($r('app.float.profile_name_font_size'))
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ top: $r('app.float.profile_name_margin_top') })

      // Signature
      if (this.userInfo.signature) {
        Text(this.userInfo.signature)
          .fontSize($r('app.float.profile_signature_font_size'))
          .fontColor(Color.White)
          .opacity(0.9)
          .margin({ top: $r('app.float.profile_signature_margin_top') })
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }
    }
    .width(Const.FULL_WIDTH)
    .padding({
      left: $r('app.float.profile_padding_horizontal'),
      right: $r('app.float.profile_padding_horizontal'),
      bottom: $r('app.float.profile_header_padding_bottom')
    })
    .alignItems(HorizontalAlign.Center)
  }
}

