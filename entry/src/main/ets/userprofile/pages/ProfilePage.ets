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
import { common } from '@kit.AbilityKit';
import { ProfileViewModel, QuickEntryModel, RecentOrderModel } from '../viewmodel/ProfileViewModel';
import { ProfileMenuItem } from '../model/UserInfo';
import ProfileHeaderComponent from '../view/ProfileHeaderComponent';
import ProfileItemComponent from '../view/ProfileItemComponent';
import { DatabaseManager } from '../database/DatabaseManager';
import Logger from '../../common/utils/Logger';

const TAG = 'ProfilePage';

@Entry
@Component
struct ProfilePage {
  @State viewModel: ProfileViewModel = new ProfileViewModel();
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  @State isLoggedIn: boolean = false;
  @State isLoading: boolean = true;

  private quickIcons: string[] = ['📦', '🎟️', '📬', '🎧'];
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  @Styles cardStyle() {
    .width('100%')
    .backgroundColor(Color.White)
    .borderRadius(16)
    .shadow({
      radius: 20,
      color: '#0D000000',
      offsetX: 0,
      offsetY: 4
    })
    .padding(16)
  }

  async aboutToAppear(): Promise<void> {
    await this.loadData();
  }

  async onPageShow(): Promise<void> {
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      await this.dbManager.initDatabase(this.context);
      const currentUser = await this.dbManager.getCurrentUser();
      this.isLoggedIn = currentUser !== null;

      if (this.isLoggedIn) {
        await this.viewModel.initUserInfo();
      } else {
        router.replaceUrl({
          url: 'userprofile/pages/LoginPage'
        }).catch((err: Error) => {
          Logger.error(TAG, `跳转登录页失败 ${err.message}`);
        });
        return;
      }

      this.viewModel.initMenuItems();
      this.viewModel.initQuickEntries();
      await this.viewModel.initRecentOrders();
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `页面初始化失败 ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }

  build() {
    if (this.isLoading) {
      Column() {
        LoadingProgress()
          .width(50)
          .height(50)
          .color('#FF6B00')
        Text('加载中...')
          .fontSize(16)
          .fontColor('#999999')
          .margin({ top: 16 })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
      .backgroundColor('#F6F6F6')
    } else {
      this.buildContent();
    }
  }

  @Builder
  buildContent() {
    Stack({ alignContent: Alignment.Top }) {
      Column()
        .width('100%')
        .height(340)
        .linearGradient({
          angle: 180,
          colors: [['#FF8A3C', 0.0], ['#FFB36B', 1.0]]
        })
        .borderRadius({ bottomLeft: 24, bottomRight: 24 })

      List({ space: 12 }) {
        // 顶部导航
        ListItem() {
          Row() {
            Row() {
              Text('←')
                .fontSize(20)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
                .margin({ right: 6 })
              Text('返回')
                .fontSize(16)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Medium)
            }
            .padding({ left: 12, right: 16, top: 8, bottom: 8 })
            .backgroundColor('rgba(255,255,255,0.2)')
            .borderRadius(20)
            .backdropBlur(10)
            .onClick(() => {
              try { router.back(); } catch (err) {}
            })
            Blank()
            Text('⚙️')
              .fontSize(22)
              .fontColor(Color.White)
              .onClick(() => this.viewModel.onMenuItemClick('account'))
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 12 })
          .alignItems(VerticalAlign.Center)
        }

        // 头像 / 数据 / 会员卡
        ListItem() {
          Column() {
            ProfileHeaderComponent({ userInfo: this.viewModel.userInfo })

            Row() {
              this.buildStatItem($r('app.string.profile_stat_orders'), this.viewModel.orderCount.toString(), '#FF8A3C')
              this.buildStatItem($r('app.string.profile_stat_favorites'), this.viewModel.favoriteCount.toString(), '#FF8A3C')
              this.buildStatItem('积分', this.viewModel.points.toString(), '#FF8A3C')
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceEvenly)
            .padding({ top: 12, bottom: 12 })
            .margin({ top: 12 })
            .backgroundColor('rgba(255,255,255,0.16)')
            .borderRadius(14)

            Column() {
              Row() {
                Column() {
                  Text('会员专属')
                    .fontSize(14)
                    .fontColor('#8A5A1F')
                    .margin({ bottom: 6 })
                  Text(`${this.viewModel.memberLevel}  Lv.${this.viewModel.memberLevelNum}`)
                    .fontSize(18)
                    .fontWeight(FontWeight.Bold)
                    .fontColor('#2B1A0B')
                  Text(`本月已省 ${this.viewModel.monthlySaved.toFixed(0)} 元`)
                    .fontSize(12)
                    .fontColor('#A36C2B')
                    .margin({ top: 4 })
                }
                .layoutWeight(1)
                .alignItems(HorizontalAlign.Start)

                Column() {
                  Button('权益中心')
                    .type(ButtonType.Capsule)
                    .backgroundColor('#FDF7F0')
                    .fontColor('#8A5A1F')
                    .border({ width: 1, color: '#E0C7A8' })
                    .height(36)
                    .padding({ left: 14, right: 14 })
                    .onClick(() => {
                      router.pushUrl({ url: 'userprofile/pages/MemberBenefitPage' }).catch(() => {});
                    })
                  Text(`积分 ${this.viewModel.points}`)
                    .fontSize(12)
                    .fontColor('#8A5A1F')
                    .margin({ top: 8 })
                }
                .alignItems(HorizontalAlign.End)
              }

              Row() {
                Text('等级成长 · 每日秒杀 · 专属礼包')
                  .fontSize(12)
                  .fontColor('#9B6D38')
                  .layoutWeight(1)
                Text('去看看  ›')
                  .fontSize(12)
                  .fontColor('#9B6D38')
                  .onClick(() => {
                    router.pushUrl({ url: 'userprofile/pages/MemberBenefitPage' }).catch(() => {});
                  })
              }
              .width('100%')
              .margin({ top: 10 })
            }
            .padding({ left: 18, right: 18, top: 14, bottom: 14 })
            .width('100%')
            .backgroundColor('#F2E6D9')
            .linearGradient({
              angle: 120,
              colors: [['#F5E7D9', 0.0], ['#ECD5BD', 1.0]]
            })
            .borderRadius(18)
            .margin({ top: 16 })
            .shadow({ radius: 12, color: '#1A000000', offsetY: 5 })
          }
          .width('100%')
          .padding({ left: 16, right: 16, bottom: 8 })
        }

        // 快捷入口
        ListItem() {
          Column() {
            this.buildSectionTitle($r('app.string.profile_quick_title'), false)
            Grid() {
              ForEach(this.viewModel.quickEntries, (item: QuickEntryModel, index: number) => {
                GridItem() {
                  Column() {
                    Stack({ alignContent: Alignment.Center }) {
                      Circle({ width: 44, height: 44 })
                        .fill('#FFF2E6')
                        .shadow({ radius: 8, color: '#14000000', offsetY: 2 })
                      Text(this.quickIcons[index % this.quickIcons.length])
                        .fontSize(20)
                    }
                    .margin({ bottom: 8 })
                    Text(item.title)
                      .fontSize(14)
                      .fontColor('#333')
                      .margin({ top: 10 })
                  }
                  .alignItems(HorizontalAlign.Center)
                  .justifyContent(FlexAlign.Center)
                  .onClick(() => this.viewModel.onMenuItemClick(item.actionType))
                }
              })
            }
            .columnsTemplate('1fr 1fr 1fr 1fr')
            .rowsGap(16)
            .height(110)
            .margin({ top: 12 })
          }
          .cardStyle()
        }
        .padding({ left: 16, right: 16 })

        // 最近订单 / 收藏
        ListItem() {
          Column() {
            this.buildSectionTitle($r('app.string.profile_recent_title'), true)
            Column() {
              ForEach(this.viewModel.recentOrders, (item: RecentOrderModel, index: number) => {
                Row() {
                  Image($r('app.media.ic_holder_pad'))
                    .width(44)
                    .height(44)
                    .borderRadius(8)
                    .objectFit(ImageFit.Cover)
                    .margin({ right: 12 })
                  Column() {
                    Text(item.name)
                      .fontSize(15)
                      .fontColor(Color.Black)
                      .fontWeight(FontWeight.Medium)
                      .maxLines(1)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })
                    Text(item.date)
                      .fontSize(12)
                      .fontColor('#999')
                      .margin({ top: 4 })
                  }
                  .layoutWeight(1)
                  .alignItems(HorizontalAlign.Start)
                  Column() {
                    Text(item.price)
                      .fontSize(16)
                      .fontWeight(FontWeight.Bold)
                      .fontColor('#E95B27')
                    Text(item.status)
                      .fontSize(12)
                      .fontColor('#999')
                      .margin({ top: 4 })
                  }
                  .alignItems(HorizontalAlign.End)
                }
                .width('100%')
                .padding({ top: 12, bottom: 12 })
                if (index < this.viewModel.recentOrders.length - 1) {
                  Divider().color('#F1F3F5')
                }
              })
            }
            .margin({ top: 8 })
          }
          .cardStyle()
        }
        .padding({ left: 16, right: 16 })

        // 常用菜单
        ListItem() {
          Column() {
            this.buildSectionTitle('个人中心', false)
            Column() {
              ForEach(this.viewModel.menuItems, (item: ProfileMenuItem, index: number) => {
                ProfileItemComponent({
                  menuItem: item,
                  onItemClick: (action: string) => this.viewModel.onMenuItemClick(action)
                })
                if (index < this.viewModel.menuItems.length - 1) {
                  Divider().color('#F1F3F5').margin({ left: 16 })
                }
              })
            }
            .backgroundColor(Color.Transparent)
          }
          .cardStyle()
          .padding({ top: 0, bottom: 0, left: 0, right: 0 })
        }
        .padding({ left: 16, right: 16 })

        // 退出登录
        ListItem() {
          Text($r('app.string.profile_settings_logout'))
            .width('100%')
            .textAlign(TextAlign.Center)
            .fontSize(16)
            .fontColor('#FF4040')
            .fontWeight(FontWeight.Medium)
            .padding(14)
            .backgroundColor(Color.White)
            .borderRadius(16)
            .onClick(() => { this.viewModel.onMenuItemClick('logout'); })
        }
        .padding({ left: 16, right: 16, bottom: 30 })
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
    }
    .backgroundColor('#F6F6F6')
    .padding({ top: this.getUIContext().px2vp(this.topRectHeight) })
  }

  @Builder
  buildStatItem(title: ResourceStr, value: string, iconColor: ResourceColor) {
    Column() {
      Text(value)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333')
      Text(title)
        .fontSize(12)
        .fontColor('#999')
        .margin({ top: 4 })
    }
    .alignItems(HorizontalAlign.Center)
  }

  @Builder
  buildSectionTitle(title: ResourceStr, showMore: boolean = false) {
    Row() {
      Text(title)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333')
      Blank()
      if (showMore) {
        Row() {
          Text($r('app.string.profile_action_more'))
            .fontSize(13)
            .fontColor('#999')
          Text('›')
            .fontSize(18)
            .fontColor('#999')
            .margin({ left: 2, bottom: 2 })
        }
      }
    }
    .width('100%')
    .padding({ bottom: 8 })
    .onClick(() => {
      if (showMore) {
        router.pushUrl({ url: 'userprofile/pages/OrderListPage' }).catch(() => {});
      }
    })
  }

  @Builder
  buildMenuItem(title: ResourceStr, value: string, showArrow: boolean) {
    Row() {
      Circle({ width: 24, height: 24 })
        .fill('#FFF5EC')
        .margin({ right: 12 })

      Text(title)
        .fontSize(15)
        .fontColor('#333')

      Blank()

      if (value) {
        Text(value)
          .fontSize(14)
          .fontColor('#999')
          .margin({ right: 4 })
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }

      if (showArrow) {
        Text('›')
          .fontSize(20)
          .fontColor('#CCC')
      }
    }
    .width('100%')
    .height(56)
    .alignItems(VerticalAlign.Center)
  }
}
