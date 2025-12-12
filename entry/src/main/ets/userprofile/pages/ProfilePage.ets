/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * ...
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

  // 快捷入口图标
  private quickIcons: string[] = ['👛', '🎫', '🎁', '🎧'];
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
    // 页面显示时重新加载数据（从编辑页面返回时）
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      // 初始化数据库
      await this.dbManager.initDatabase(this.context);
      
      // 检查登录状态
      const currentUser = await this.dbManager.getCurrentUser();
      this.isLoggedIn = currentUser !== null;
      
      if (this.isLoggedIn) {
        // 加载用户信息
        await this.viewModel.initUserInfo();
      } else {
        // 未登录，跳转到登录页
        router.replaceUrl({
          url: 'userprofile/pages/LoginPage'
        }).catch((err: Error) => {
          Logger.error(TAG, `跳转登录页失败: ${err.message}`);
        });
        return;
      }
      
      this.viewModel.initMenuItems();
      this.viewModel.initQuickEntries();
      await this.viewModel.initRecentOrders();
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `页面初始化失败: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }

  build() {
    if (this.isLoading) {
      // 加载中状态
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
      this.buildContent()
    }
  }

  @Builder
  buildContent() {
    Stack({ alignContent: Alignment.Top }) {
      // 1. 渐变背景
      Column()
        .width('100%')
        .height(320)
        .linearGradient({
          angle: 180,
          colors: [['#FF8A3C', 0.0], ['#FFB36B', 1.0]]
        })
        .borderRadius({ bottomLeft: 24, bottomRight: 24 })

      List({ space: 12 }) {

        // --- 顶部导航栏 ---
        ListItem() {
          Row() {
            Row() {
              Text('❮')
                .fontSize(18)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
              Text('返回')
                .fontSize(16)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Medium)
                .margin({ left: 4 })
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
              .fontSize(24)
              .onClick(() => this.viewModel.onMenuItemClick('account'))
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 12 })
          .alignItems(VerticalAlign.Center)
        }

        // --- 用户头像与信息 + 黑金会员卡 ---
        ListItem() {
          Column() {
            // 1. 用户基本信息组件
            ProfileHeaderComponent({ userInfo: this.viewModel.userInfo })

            // 2. 黑金会员卡片
            Row() {
              // 左侧：等级与图标
              Row() {
                Text('💎')
                  .fontSize(18)
                  .margin({ right: 8 })

                Column() {
                  Text(`${this.viewModel.memberLevel} Lv.${this.viewModel.memberLevelNum}`)
                    .fontSize(14)
                    .fontColor('#FFE4B5') // 浅金色
                    .fontWeight(FontWeight.Bold)
                  Text(`本月已省 ${this.viewModel.monthlySaved.toFixed(0)} 元`)
                    .fontSize(10)
                    .fontColor('rgba(255,228,181, 0.7)') // 半透明金
                    .margin({ top: 2 })
                }
                .alignItems(HorizontalAlign.Start)
              }

              Blank()

              // 右侧：查看权益
              Row() {
                Text('查看权益')
                  .fontSize(12)
                  .fontColor('#FFE4B5')
                Text(' ›')
                  .fontSize(18)
                  .fontColor('#FFE4B5')
                  .margin({ bottom: 2 })
              }
              .backgroundColor('rgba(255,255,255,0.1)') // 按钮背景微亮
              .padding({ left: 10, right: 8, top: 4, bottom: 4 })
              .borderRadius(12)
            }
            .width('100%')
            .height(60)
            // 黑金渐变背景
            .linearGradient({
              angle: 90,
              colors: [['#333333', 0.0], ['#454545', 1.0]]
            })
            .borderRadius(16)
            .padding({ left: 16, right: 16 })
            .alignItems(VerticalAlign.Center)
            .margin({ top: 16 })
            .shadow({ radius: 10, color: 'rgba(0,0,0,0.15)', offsetY: 4 })
          }
          .width('100%')
          .padding({ left: 16, right: 16, bottom: 20 })
        }

        // --- 悬浮统计卡片 ---
        ListItem() {
          Row() {
            this.buildStatItem($r('app.string.profile_stat_orders'), this.viewModel.orderCount.toString(), $r('app.color.profile_stat_icon_1'))
            Divider().vertical(true).height(24).color('#F1F3F5')
            this.buildStatItem($r('app.string.profile_stat_favorites'), this.viewModel.favoriteCount.toString(), $r('app.color.profile_stat_icon_2'))
            Divider().vertical(true).height(24).color('#F1F3F5')
            this.buildStatItem($r('app.string.profile_stat_points'), this.viewModel.points.toString(), $r('app.color.profile_stat_icon_3'))
          }
          .cardStyle()
          .justifyContent(FlexAlign.SpaceEvenly)
          .height(90)
        }
        .padding({ left: 16, right: 16 })
        .margin({ top: -30 })

        // --- 快捷入口 ---
        ListItem() {
          Column() {
            this.buildSectionTitle($r('app.string.profile_quick_title'))
            Grid() {
              ForEach(this.viewModel.quickEntries, (item: QuickEntryModel, index: number) => {
                GridItem() {
                  Column() {
                    Text(this.quickIcons[index % this.quickIcons.length])
                      .fontSize(32)
                      .margin({ bottom: 8 })
                    Text(item.title)
                      .fontSize(13)
                      .fontColor('#333333')
                  }
                  .width('100%')
                  .onClick(() => {
                    if (item.actionType === 'service') {
                      try { router.pushUrl({ url: 'userprofile/pages/AiServicePage' }); } catch (e) {}
                      return;
                    }
                    this.viewModel.onMenuItemClick(item.actionType);
                  })
                }
              })
            }
            .columnsTemplate('1fr 1fr 1fr 1fr')
            .rowsGap(16)
            .height(90)
            .margin({ top: 12 })
          }
          .cardStyle()
        }
        .padding({ left: 16, right: 16 })

        // --- 最近订单 ---
        ListItem() {
          Column() {
            this.buildSectionTitle($r('app.string.profile_recent_title'), true)
            Column() {
              ForEach(this.viewModel.recentOrders, (item: RecentOrderModel, index: number) => {
                Row() {
                  Rect().width(40).height(40).radius(4).fill('#F5F5F5').margin({ right: 12 })
                  Column() {
                    Text(item.name).fontSize(15).fontColor(Color.Black).fontWeight(FontWeight.Medium).maxLines(1).textOverflow({ overflow: TextOverflow.Ellipsis })
                    Text(item.date).fontSize(12).fontColor('#999').margin({ top: 4 })
                  }
                  .layoutWeight(1).alignItems(HorizontalAlign.Start)
                  Column() {
                    Text(item.price).fontSize(16).fontWeight(FontWeight.Bold).fontColor('#E95B27')
                    Text(item.status).fontSize(12).fontColor(item.status === '进行中' ? '#E95B27' : '#999').margin({ top: 4 })
                  }
                  .alignItems(HorizontalAlign.End)
                }
                .width('100%').padding({ top: 12, bottom: 12 })
                if (index < this.viewModel.recentOrders.length - 1) { Divider().color('#F1F3F5') }
              })
            }
            .margin({ top: 8 })
          }
          .cardStyle()
        }
        .padding({ left: 16, right: 16 })

        // --- 常用菜单 ---
        ListItem() {
          Column() {
            Row() {
              this.buildMenuItem($r('app.string.profile_phone'), this.viewModel.userInfo.phone || '未设置', true)
            }
            .width('100%')
            .onClick(() => {
              router.pushUrl({
                url: 'userprofile/pages/EditProfilePage'
              }).catch((err: Error) => {
                Logger.error(TAG, `跳转编辑页失败: ${err.message}`);
              });
            })
            Divider().color('#F1F3F5').margin({ left: 44 })
            Row() {
              this.buildMenuItem($r('app.string.profile_address'), this.viewModel.userInfo.address || '未设置', true)
            }
            .width('100%')
            .onClick(() => {
              router.pushUrl({
                url: 'userprofile/pages/EditProfilePage'
              }).catch((err: Error) => {
                Logger.error(TAG, `跳转编辑页失败: ${err.message}`);
              });
            })
            Divider().color('#F1F3F5').margin({ left: 44 })
            Row() {
              this.buildMenuItem('编辑个人信息', '', true)
            }
            .width('100%')
            .onClick(() => {
              router.pushUrl({
                url: 'userprofile/pages/EditProfilePage'
              }).catch((err: Error) => {
                Logger.error(TAG, `跳转编辑页失败: ${err.message}`);
              });
            })
            Divider().color('#F1F3F5').margin({ left: 44 })
            this.buildMenuItem($r('app.string.profile_settings_notify'), '', true)
          }
          .cardStyle()
          .padding({ top: 0, bottom: 0, left: 16, right: 16 })
        }
        .padding({ left: 16, right: 16 })

        // --- 退出登录 ---
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

  // --- 修复部分：将 Builders 展开为正确的格式 ---

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