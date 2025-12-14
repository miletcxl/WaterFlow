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
import { DatabaseManager, ProductRow } from '../userprofile/database/DatabaseManager';
import Logger from '../common/utils/Logger';
import { waterFlowData } from '../viewmodel/HomeViewModel';
import { productSeeds, getProductImage, seedProductsAsItems } from '../viewmodel/ProductSeeds';
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
  @State selectedCategory: number = 0;
  @State filteredProductData: IProductItem[] = seedProductsAsItems();
  @State searchKeyword: string = '';
  private lastCategory: number = -1; // 跟踪上一次的分类
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  async aboutToAppear(): Promise<void> {
    // 初始化数据库
    try {
      await this.dbManager.initDatabase(this.context);
      await this.dbManager.initProducts(productSeeds);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `数据库初始化失败: ${error.message}`);
    }
    // 初始化商品数据
    this.lastCategory = this.selectedCategory;
    await this.updateFilteredProducts(this.selectedCategory);
  }

  aboutToUpdate(): void {
    // 只在分类真正变化时才更新过滤后的商品数据
    if (this.lastCategory !== this.selectedCategory) {
      Logger.info(TAG, `分类从 ${this.lastCategory} 变为 ${this.selectedCategory}`);
      this.lastCategory = this.selectedCategory;
      this.updateFilteredProducts(this.selectedCategory).catch((err: Error) => {
        Logger.error(TAG, `更新过滤商品失败: ${err.message}`);
      });
    }
  }

  /**
   * 根据当前选中的分类更新过滤后的商品数据
   */
  async updateFilteredProducts(categoryId?: number, keyword?: string): Promise<void> {
    const targetCategory = categoryId !== undefined ? categoryId : this.selectedCategory;
    Logger.info(TAG, `更新过滤商品，分类: ${targetCategory}, 关键词: ${keyword ?? ''}`);
    Logger.info(TAG, `更新前 filteredProductData 长度: ${this.filteredProductData.length}`);

    let newData: IProductItem[];

    try {
      const rows: ProductRow[] = await this.dbManager.getProducts(targetCategory, keyword);
      newData = rows.map((row: ProductRow): IProductItem => {
        const imageRes = getProductImage(row.imageKey);
        return {
          image_url: imageRes,
          name: row.name,
          discount: row.discount,
          price: row.price,
          promotion: row.promotion,
          bonus_points: row.bonus_points,
          category: row.category
        };
      });
      Logger.info(TAG, `DB 查询后共 ${newData.length} 个商品`);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `数据库查询失败: ${error.message}，回退到静态数据`);
      if (targetCategory === 0) {
        newData = [...waterFlowData];
      } else {
        newData = waterFlowData.filter((item: IProductItem) => item.category === targetCategory);
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
        .position({ x: 0, y: 0 }) // 贴顶展示背景
      
      // 主要内容区域
      Column() {
        // 顶部导航栏：搜索框和个人信息入口
        Row() {
          SearchComponent({
            onSearchChange: async (kw: string) => {
              this.searchKeyword = kw;
              await this.updateFilteredProducts(this.selectedCategory, this.searchKeyword);
            },
            onSearch: async () => {
              await this.updateFilteredProducts(this.selectedCategory, this.searchKeyword);
            }
          })
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
          selectedCategory: $selectedCategory,
          onCategoryChange: (category: number) => {
            Logger.info(TAG, `分类变化回调，分类: ${category}, 当前selectedCategory: ${this.selectedCategory}`);
            // 同步状态并立刻按最新分类过滤，避免读到旧值
            this.selectedCategory = category;
            this.updateFilteredProducts(category, this.searchKeyword);
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
  @Builder
  buildActivityBanner() {}

}
