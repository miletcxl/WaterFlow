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
import { waterFlowData } from '../viewmodel/HomeViewModel';
import { IProductItem } from '../viewmodel/ProductItem';

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
  @State selectedCategoryIndex: number = 0;
  @State filteredProductData: IProductItem[] = waterFlowData;
  private lastCategoryIndex: number = -1; // 跟踪上一次的分类索引
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
    // 初始化商品数据
    this.lastCategoryIndex = this.selectedCategoryIndex;
    this.updateFilteredProducts(this.selectedCategoryIndex);
  }

  aboutToUpdate(): void {
    // 只在 selectedCategoryIndex 真正变化时才更新过滤后的商品数据
    if (this.lastCategoryIndex !== this.selectedCategoryIndex) {
      Logger.info(TAG, `分类索引从 ${this.lastCategoryIndex} 变为 ${this.selectedCategoryIndex}`);
      this.lastCategoryIndex = this.selectedCategoryIndex;
      this.updateFilteredProducts(this.selectedCategoryIndex);
    }
  }

  /**
   * 根据当前选中的分类索引更新过滤后的商品数据
   */
  updateFilteredProducts(categoryIndex?: number): void {
    const targetIndex = categoryIndex !== undefined ? categoryIndex : this.selectedCategoryIndex;
    Logger.info(TAG, `更新过滤商品，分类索引: ${targetIndex}`);
    Logger.info(TAG, `更新前 filteredProductData 长度: ${this.filteredProductData.length}`);
    
    let newData: IProductItem[];
    
    if (targetIndex === 0) {
      // 显示全部商品
      newData = [...waterFlowData];
      Logger.info(TAG, `显示全部商品，共 ${newData.length} 个`);
    } else {
      // 根据分类过滤商品
      // 分类索引映射：1-手机(category:1), 2-电脑(category:2), 3-食品(category:3), 6-家具(category:6)
      // 注意：索引4和5（男装、生鲜）没有商品，所以直接返回空数组
      if (targetIndex === 4 || targetIndex === 5) {
        newData = [];
        Logger.info(TAG, `分类 ${targetIndex} 没有商品`);
      } else {
        const filtered = waterFlowData.filter((item: IProductItem) => {
          const match = item.category === targetIndex;
          if (match) {
            Logger.info(TAG, `匹配商品: ${item.name}, category: ${item.category}`);
          }
          return match;
        });
        newData = [...filtered];
        Logger.info(TAG, `分类 ${targetIndex} 过滤后共 ${newData.length} 个商品`);
      }
    }
    
    // 强制创建新数组引用，确保 ArkTS 检测到变化
    this.filteredProductData = newData;
    Logger.info(TAG, `更新后 filteredProductData 长度: ${this.filteredProductData.length}`);
    Logger.info(TAG, `数组引用是否改变: ${newData !== waterFlowData}`);
  }

  build() {
    Stack() {
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
        ClassifyComponent({ 
          selectedCategoryIndex: $selectedCategoryIndex,
          onCategoryChange: (index: number) => {
            Logger.info(TAG, `分类变化回调，索引: ${index}, 当前selectedCategoryIndex: ${this.selectedCategoryIndex}`);
            // 同步状态并立刻按最新索引过滤，避免读到旧值
            this.selectedCategoryIndex = index;
            this.updateFilteredProducts(index);
          }
        })
        SwiperComponent()
        WaterFlowComponent({ productData: this.filteredProductData })
          .layoutWeight(1)
      }
      .padding({
        left: $r('app.float.home_margin_left'),
        right: $r('app.float.home_margin_right'),
        top: this.getUIContext().px2vp(this.topRectHeight)
      })
      .align(Alignment.TopStart) // 顶部对齐
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Start)
      
      // AI客服按钮（固定在窗口右下角）
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
      .alignItems(HorizontalAlign.Center)
      .position({ x: '100%', y: '100%' }) // 绝对定位到右下角
      .markAnchor({ x: 56 + 16, y: 56 + 16 }) // 锚点偏移：宽度+右边距, 高度+下边距
      .zIndex(999) // 提高层级，确保在最上层
      .onClick(() => {
        router.pushUrl({
          url: 'userprofile/pages/AiServicePage'
        }).catch((err: Error) => {
          Logger.error(TAG, `跳转AI客服页面失败: ${err.message}`);
        });
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.home_background_color'))
  }
}
