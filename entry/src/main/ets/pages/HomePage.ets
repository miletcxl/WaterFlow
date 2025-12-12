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
import { common } from '@kit.AbilityKit';
import ClassifyComponent from '../view/ClassifyComponent';
import SearchComponent from '../view/SearchComponent';
import SwiperComponent from '../view/SwiperComponent';
import WaterFlowComponent from '../view/WaterFlowComponent';
import UserIconComponent from '../userprofile/view/UserIconComponent';
import { DatabaseManager } from '../userprofile/database/DatabaseManager';
import Logger from '../common/utils/Logger';

const TAG = 'HomePage';

/**
 * The home page consists of four components: search component,
 * classify component, swiper component, and waterfall flow component.
 * How to use: These four components are invoked where the control is used.
 */
@Entry
@Component
struct HomePage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  async aboutToAppear(): Promise<void> {
    // 初始化数据库
    try {
      await this.dbManager.initDatabase(this.context);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `数据库初始化失败: ${error.message}`);
    }
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      // 背景图片
      Image($r('app.media.ic_app_background'))
        .width(Const.FULL_WIDTH)
        .height($r('app.float.image_background_height'))
        .objectFit(ImageFit.Cover)
        .align(Alignment.TopStart) // 顶部对齐
      
      // 主要内容区域
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
          .onClick(async () => {
            try {
              // 检查登录状态
              const currentUser = await this.dbManager.getCurrentUser();
              if (currentUser) {
                // 已登录，跳转到个人信息页
                router.pushUrl({
                  url: 'userprofile/pages/ProfilePage'
                }).catch((err: Error) => {
                  Logger.error(TAG, `跳转个人信息页失败: ${err.message}`);
                });
              } else {
                // 未登录，跳转到登录页
                router.pushUrl({
                  url: 'userprofile/pages/LoginPage'
                }).catch((err: Error) => {
                  Logger.error(TAG, `跳转登录页失败: ${err.message}`);
                });
              }
            } catch (err) {
              const error = err as Error;
              Logger.error(TAG, `检查登录状态失败: ${error.message}`);
              // 出错时也跳转到登录页
              router.pushUrl({
                url: 'userprofile/pages/LoginPage'
              }).catch((err: Error) => {
                Logger.error(TAG, `跳转登录页失败: ${err.message}`);
              });
            }
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
      .align(Alignment.TopStart) // 顶部对齐
      .width('100%')
      .height('100%')
      
      // AI客服按钮（位于右下角）
      Column() {
        Text('💬')
          .fontSize(24)
      }
      .width(56)
      .height(56)
      .backgroundColor('#FF8A3C')
      .borderRadius(28)
      .shadow({
        radius: 8,
        color: 'rgba(255,138,60,0.4)',
        offsetX: 0,
        offsetY: 4
      })
      .justifyContent(FlexAlign.Center)
      .align(Alignment.BottomEnd) // 在 Stack 中定位到右下角
      .margin({ right: 16, bottom: 16 })
      .onClick(() => {
        router.pushUrl({
          url: 'userprofile/pages/AiServicePage'
        }).catch((err: Error) => {
          Logger.error(TAG, `跳转AI客服页面失败: ${err.message}`);
        });
      })
      .zIndex(100)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.home_background_color'))
  }
}