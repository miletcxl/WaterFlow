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
import { router } from '@kit.ArkUI';
import ClassifyComponent from '../view/ClassifyComponent';
import SearchComponent from '../view/SearchComponent';
import SwiperComponent from '../view/SwiperComponent';
import WaterFlowComponent from '../view/WaterFlowComponent';
import UserIconComponent from '../userprofile/view/UserIconComponent';

/**
 * The home page consists of four components: search component,
 * classify component, swiper component, and waterfall flow component.
 * How to use: These four components are invoked where the control is used.
 */
@Entry
@Component
struct HomePage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;

  build() {
    Stack({ alignContent: Alignment.Top }) {
      Image($r('app.media.ic_app_background'))
        .width(Const.FULL_WIDTH)
        .height($r('app.float.image_background_height'))
        .objectFit(ImageFit.Cover)
      Column() {
        // 顶部导航栏：搜索框和个人信息入口
        Row() {
          SearchComponent()
            .layoutWeight(1)
          // 个人信息入口按钮 - 圆形图标加文字
          UserIconComponent({
            iconColor: $r('app.color.profile_icon_color'),
            iconSize: 40,
            text: '我'
          })
          .shadow({
            radius: 4,
            color: '#15000000',
            offsetX: 0,
            offsetY: 2
          })
          .margin({ left: $r('app.float.profile_icon_margin_left') })
          .onClick(() => {
            router.pushUrl({
              url: 'userprofile/pages/ProfilePage'
            }).catch((err: Error) => {
              console.error(`Failed to navigate to profile page. Code: ${err.message}`);
            });
          })
        }
        .width(Const.FULL_WIDTH)
        .alignItems(VerticalAlign.Center)
        ClassifyComponent()
        SwiperComponent()
        WaterFlowComponent()
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