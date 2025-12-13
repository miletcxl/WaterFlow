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

import { IProductItem } from './ProductItem';
import { seedProductsAsItems } from './ProductSeeds';

export interface IClassifyTab {
  title: Resource;
  /**
   * 0: 首页/全部, 1: 手机, 2: 电脑, 3: 食品(含粮油酒水), 6: 智能家居, 7: 音频设备, 8: 智慧屏
   */
  category: number;
}

/**
 * Home page classify title data.
 */
const classifyTabs: IClassifyTab[] = [
  { title: $r("app.string.title_bar_homepage"), category: 0 },
  { title: $r("app.string.title_bar_phone"), category: 1 },
  { title: $r("app.string.title_bar_computer"), category: 2 },
  { title: $r("app.string.title_bar_foods"), category: 3 },
  { title: $r("app.string.title_bar_audio"), category: 7 },
  { title: $r("app.string.title_bar_smart_screen"), category: 8 },
  { title: $r("app.string.title_bar_furniture_kitchenware"), category: 6 }
];

/**
 * Home page swiper image data.
 */
const swiperImage: Resource[] = [
  $r('app.media.ic_home_appliances_special'),
  $r('app.media.ic_coupons'),
  $r('app.media.ic_internal_purchase_price')
];


/**
 * Home page water flow item init data.
 * 根据 CATEGORY_MAPPING.md 中的分类信息组织商品数据
 */
const waterFlowData: IProductItem[] = seedProductsAsItems();

export { classifyTabs, swiperImage, waterFlowData };
