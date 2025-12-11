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
import { router } from '@kit.ArkUI';
import { ProfileViewModel, QuickEntryModel, RecentOrderModel } from '../viewmodel/ProfileViewModel';
import { ProfileMenuItem } from '../model/UserInfo';
import ProfileHeaderComponent from '../view/ProfileHeaderComponent';
import ProfileItemComponent from '../view/ProfileItemComponent';

/**
 * Profile page for displaying user information.
 */
@Entry
@Component
struct ProfilePage {
  /**
   * Profile view model.
   */
  @State viewModel: ProfileViewModel = new ProfileViewModel();

  /**
   * Top rectangle height for status bar.
   */
  @StorageLink('topRectHeight') topRectHeight: number = 0;

  aboutToAppear(): void {
    this.viewModel.initUserInfo();
    this.viewModel.initMenuItems();
    this.viewModel.initQuickEntries();
    this.viewModel.initRecentOrders();
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
      // 渐变背景
      Column()
        .width(Const.FULL_WIDTH)
        .height($r('app.float.profile_header_bg_height'))
        .linearGradient({
          angle: 180,
          colors: [[$r('app.color.profile_gradient_start'), 0.0], [$r('app.color.profile_gradient_end'), 1.0]]
        })

      // 主要内容
      Scroll() {
        Column() {
          // 返回按钮 - 深色胶囊样式
          Row() {
            Text('返回')
              .fontSize(16)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Medium)
              .padding({ left: 18, right: 18, top: 10, bottom: 10 })
              .backgroundColor('#665B7BFA')
              .borderRadius(22)
              .shadow({
                radius: 8,
                color: '#33000000',
                offsetX: 0,
                offsetY: 3
              })
              .onClick(() => {
                router.back();
              })
          }
          .width(Const.FULL_WIDTH)
          .height(60)
          .padding({
            left: $r('app.float.profile_padding_horizontal'),
            right: $r('app.float.profile_padding_horizontal'),
            top: 12,
            bottom: 8
          })
          .justifyContent(FlexAlign.Start)
          .alignItems(VerticalAlign.Center)

          // Header section with gradient background
          ProfileHeaderComponent({ userInfo: this.viewModel.userInfo })
          // 标签与编辑
          Row() {
            Row() {
              Text('会员')
                .fontSize(12)
                .fontColor('#5B7BFA')
                .padding({ left: 10, right: 10, top: 6, bottom: 6 })
                .backgroundColor('#E9EDFF')
                .borderRadius(14)
              Text('积分 1024')
                .fontSize(12)
                .fontColor('#5B7BFA')
                .padding({ left: 10, right: 10, top: 6, bottom: 6 })
                .backgroundColor('#E9EDFF')
                .borderRadius(14)
                .margin({ left: 8 })
            }
            .alignItems(VerticalAlign.Center)
            Blank()
            Text('编辑资料')
              .fontSize(13)
              .fontColor(Color.White)
              .padding({ left: 12, right: 12, top: 6, bottom: 6 })
              .backgroundColor('#334A90E2')
              .borderRadius(16)
          }
          .width(Const.FULL_WIDTH)
          .padding({
            left: $r('app.float.profile_padding_horizontal'),
            right: $r('app.float.profile_padding_horizontal'),
            top: 4
          })

          // 统计信息卡片
          Row() {
            this.buildStatCard($r('app.string.profile_stat_orders'), '0', $r('app.color.profile_stat_icon_1'))
            this.buildStatCard($r('app.string.profile_stat_favorites'), '0', $r('app.color.profile_stat_icon_2'))
            this.buildStatCard($r('app.string.profile_stat_points'), '0', $r('app.color.profile_stat_icon_3'))
          }
          .width(Const.FULL_WIDTH)
          .height(100)
          .padding({
            left: $r('app.float.profile_padding_horizontal'),
            right: $r('app.float.profile_padding_horizontal')
          })
          .justifyContent(FlexAlign.SpaceEvenly)
          .margin({ top: $r('app.float.profile_stat_margin_top') })

          // 快捷入口
          Column() {
            Row() {
              Text($r('app.string.profile_quick_title'))
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor(Color.Black)
              Blank()
              Text($r('app.string.profile_action_more'))
                .fontSize(14)
                .fontColor($r('app.color.profile_text_secondary'))
            }
            .width(Const.FULL_WIDTH)
            .padding({
              left: $r('app.float.profile_padding_horizontal'),
              right: $r('app.float.profile_padding_horizontal'),
              top: 8,
              bottom: 8
            })

          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
            ForEach(this.viewModel.quickEntries, (item: QuickEntryModel) => {
              Text(item.title)
                .fontSize(14)
                .fontColor(Color.Black)
                .padding({ left: 14, right: 14, top: 10, bottom: 10 })
                .backgroundColor('#F6F7FB')
                .borderRadius(16)
                .margin({ right: 10, bottom: 10 })
                .onClick(() => {
                  if (item.actionType === 'service') {
                    router.pushUrl({ url: 'userprofile/pages/AiServicePage' });
                    return;
                  }
                  this.viewModel.onMenuItemClick(item.actionType);
                })
            })
          }
          .width(Const.FULL_WIDTH)
          .padding({
            left: $r('app.float.profile_padding_horizontal'),
            right: $r('app.float.profile_padding_horizontal'),
            bottom: 4
          })
          }
          .width(Const.FULL_WIDTH)
          .margin({ top: 8 })

          // Menu items section
          Column() {
            ForEach(this.viewModel.menuItems, (item: ProfileMenuItem, index: number) => {
              ProfileItemComponent({
                menuItem: item,
                onItemClick: (actionType: string) => {
                  this.viewModel.onMenuItemClick(actionType);
                }
              })
              if (index < this.viewModel.menuItems.length - 1) {
                Divider()
                  .color($r('app.color.profile_divider_color'))
                  .strokeWidth(0.5)
                  .margin({
                    left: $r('app.float.profile_padding_horizontal'),
                    right: $r('app.float.profile_padding_horizontal')
                  })
              }
            }, (item: ProfileMenuItem, index: number) => `${item.actionType}_${index}`)
          }
          .width(Const.FULL_WIDTH)
          .margin({ top: $r('app.float.profile_menu_margin_top') })
          .borderRadius($r('app.float.profile_menu_radius'))
          .backgroundColor(Color.White)
          .shadow({
            radius: 8,
            color: $r('app.color.profile_shadow_color'),
            offsetX: 0,
            offsetY: 2
          })

          // 最近订单 / 收藏
          Column() {
            Row() {
              Text($r('app.string.profile_recent_title'))
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor(Color.Black)
              Blank()
              Text($r('app.string.profile_action_more'))
                .fontSize(14)
                .fontColor($r('app.color.profile_text_secondary'))
            }
            .width(Const.FULL_WIDTH)
            .padding({
              left: $r('app.float.profile_padding_horizontal'),
              right: $r('app.float.profile_padding_horizontal'),
              top: 12,
              bottom: 8
            })

            Column() {
              ForEach(this.viewModel.recentOrders, (item: RecentOrderModel, index: number) => {
                Row() {
                  Column() {
                    Text(item.name)
                      .fontSize(15)
                      .fontColor(Color.Black)
                      .fontWeight(FontWeight.Medium)
                    Row() {
                      Text(item.status)
                        .fontSize(12)
                        .fontColor('#5B7BFA')
                        .padding({ left: 8, right: 8, top: 4, bottom: 4 })
                        .backgroundColor('#E9EDFF')
                        .borderRadius(12)
                      Text(item.date)
                        .fontSize(12)
                        .fontColor($r('app.color.profile_text_secondary'))
                        .margin({ left: 8 })
                    }
                    .margin({ top: 4 })
                  }
                  .layoutWeight(1)

                  Text(item.price)
                    .fontSize(15)
                    .fontWeight(FontWeight.Medium)
                    .fontColor($r('app.color.focus_color'))
                }
                .width(Const.FULL_WIDTH)
                .padding({
                  left: $r('app.float.profile_padding_horizontal'),
                  right: $r('app.float.profile_padding_horizontal'),
                  top: 10,
                  bottom: 10
                })

                if (index < this.viewModel.recentOrders.length - 1) {
                  Divider()
                    .color($r('app.color.profile_divider_color'))
                    .strokeWidth(0.5)
                    .margin({
                      left: $r('app.float.profile_padding_horizontal'),
                      right: $r('app.float.profile_padding_horizontal')
                    })
                }
              })
            }
          }
          .width(Const.FULL_WIDTH)
          .margin({ top: 12 })
          .borderRadius($r('app.float.profile_menu_radius'))
          .backgroundColor(Color.White)
          .shadow({
            radius: 8,
            color: $r('app.color.profile_shadow_color'),
            offsetX: 0,
            offsetY: 2
          })

          // User info details section
          Column() {
            ProfileItemComponent({
              menuItem: {
                title: $r('app.string.profile_phone'),
                icon: $r('app.media.ic_more'),
                actionType: 'phone',
                showArrow: true
              },
              onItemClick: (actionType: string) => {
                this.viewModel.onMenuItemClick(actionType);
              }
            })
            Divider()
              .color($r('app.color.profile_divider_color'))
              .strokeWidth(0.5)
              .margin({
                left: $r('app.float.profile_padding_horizontal'),
                right: $r('app.float.profile_padding_horizontal')
              })
            ProfileItemComponent({
              menuItem: {
                title: $r('app.string.profile_email'),
                icon: $r('app.media.ic_more'),
                actionType: 'email',
                showArrow: true
              },
              onItemClick: (actionType: string) => {
                this.viewModel.onMenuItemClick(actionType);
              }
            })
            Divider()
              .color($r('app.color.profile_divider_color'))
              .strokeWidth(0.5)
              .margin({
                left: $r('app.float.profile_padding_horizontal'),
                right: $r('app.float.profile_padding_horizontal')
              })
            ProfileItemComponent({
              menuItem: {
                title: $r('app.string.profile_address'),
                icon: $r('app.media.ic_more'),
                actionType: 'address',
                showArrow: true
              },
              onItemClick: (actionType: string) => {
                this.viewModel.onMenuItemClick(actionType);
              }
            })
          }
          .width(Const.FULL_WIDTH)
          .margin({ top: $r('app.float.profile_menu_margin_top') })
          .borderRadius($r('app.float.profile_menu_radius'))
          .backgroundColor(Color.White)
          .shadow({
            radius: 8,
            color: $r('app.color.profile_shadow_color'),
            offsetX: 0,
            offsetY: 2
          })
          .margin({ bottom: $r('app.float.profile_bottom_margin') })

          // 更多设置
          Column() {
            Row() {
              Text($r('app.string.profile_settings_title'))
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor(Color.Black)
            }
            .width(Const.FULL_WIDTH)
            .padding({
              left: $r('app.float.profile_padding_horizontal'),
              right: $r('app.float.profile_padding_horizontal'),
              top: 12,
              bottom: 6
            })

            Column() {
              ProfileItemComponent({
                menuItem: {
                  title: $r('app.string.profile_settings_account'),
                  icon: $r('app.media.ic_more'),
                  actionType: 'account',
                  showArrow: true
                },
                onItemClick: (actionType: string) => {
                  this.viewModel.onMenuItemClick(actionType);
                }
              })
              Divider()
                .color($r('app.color.profile_divider_color'))
                .strokeWidth(0.5)
                .margin({
                  left: $r('app.float.profile_padding_horizontal'),
                  right: $r('app.float.profile_padding_horizontal')
                })
              ProfileItemComponent({
                menuItem: {
                  title: $r('app.string.profile_settings_notify'),
                  icon: $r('app.media.ic_more'),
                  actionType: 'notify',
                  showArrow: true
                },
                onItemClick: (actionType: string) => {
                  this.viewModel.onMenuItemClick(actionType);
                }
              })
              Divider()
                .color($r('app.color.profile_divider_color'))
                .strokeWidth(0.5)
                .margin({
                  left: $r('app.float.profile_padding_horizontal'),
                  right: $r('app.float.profile_padding_horizontal')
                })
              ProfileItemComponent({
                menuItem: {
                  title: $r('app.string.profile_settings_logout'),
                  icon: $r('app.media.ic_more'),
                  actionType: 'logout',
                  showArrow: true
                },
                onItemClick: (actionType: string) => {
                  this.viewModel.onMenuItemClick(actionType);
                }
              })
            }
          }
          .width(Const.FULL_WIDTH)
          .margin({ top: 12, bottom: $r('app.float.profile_bottom_margin') })
          .borderRadius($r('app.float.profile_menu_radius'))
          .backgroundColor(Color.White)
          .shadow({
            radius: 8,
            color: $r('app.color.profile_shadow_color'),
            offsetX: 0,
            offsetY: 2
          })
        }
        .width(Const.FULL_WIDTH)
      }
      .width(Const.FULL_WIDTH)
      .height(Const.FULL_HEIGHT)
      .padding({
        top: this.getUIContext().px2vp(this.topRectHeight)
      })
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.home_background_color'))
  }

  @Builder
  buildStatCard(title: ResourceStr, value: string, iconColor: ResourceColor) {
    Column() {
      Stack({ alignContent: Alignment.Center }) {
        Circle({ width: 40, height: 40 })
          .fill(iconColor)
          .opacity(0.15)
        Circle({ width: 24, height: 24 })
          .fill(iconColor)
      }
      .margin({ bottom: $r('app.float.profile_stat_icon_margin_bottom') })

      Text(value)
        .fontSize($r('app.float.profile_stat_value_font_size'))
        .fontColor(Color.Black)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: $r('app.float.profile_stat_value_margin_bottom') })

      Text(title)
        .fontSize($r('app.float.profile_stat_title_font_size'))
        .fontColor($r('app.color.profile_text_secondary'))
    }
    .width($r('app.float.profile_stat_card_width'))
    .height($r('app.float.profile_stat_card_height'))
    .padding(12)
    .borderRadius($r('app.float.profile_stat_card_radius'))
    .backgroundColor(Color.White)
    .shadow({
      radius: $r('app.float.profile_shadow_radius'),
      color: $r('app.color.profile_shadow_color'),
      offsetX: 0,
      offsetY: 2
    })
  }
}

