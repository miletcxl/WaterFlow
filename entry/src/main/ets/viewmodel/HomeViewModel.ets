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

export interface IClassifyTab {
  title: Resource;
  /**
   * 0: 首页/全部, 1: 手机, 2: 电脑, 3: 食品, 4: 男装, 5: 生鲜, 6: 家具
   */
  category: number;
}

/**
 * Home page classify title data.
 */
const classifyTabs: IClassifyTab[] = [
  { title: $r('app.string.title_bar_homepage'), category: 0 },
  { title: $r('app.string.title_bar_phone'), category: 1 },
  { title: $r('app.string.title_bar_computer'), category: 2 },
  { title: $r('app.string.title_bar_foods'), category: 3 },
  { title: $r('app.string.title_bar_men_wear'), category: 4 },
  { title: $r('app.string.title_bar_fresh'), category: 5 },
  { title: $r('app.string.title_bar_furniture_kitchenware'), category: 6 }
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
const waterFlowData: IProductItem[] = [
  // 手机类 (category: 1) - 11个商品
  {
    image_url: $r('app.media.phone_Mate_80_Pro'),
    name: 'HUAWEI Mate 80 Pro',
    discount: '限时省500',
    price: '¥8999',
    promotion: '限时',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Mate_80'),
    name: 'HUAWEI Mate 80',
    discount: '',
    price: '¥6999',
    promotion: '',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Pura_80_Ultra'),
    name: 'HUAWEI Pura 80 Ultra',
    discount: '限时省800',
    price: '¥9999',
    promotion: '限时',
    bonus_points: '赠送积分',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Pura_80_Pro_Plus'),
    name: 'HUAWEI Pura 80 Pro Plus',
    discount: '',
    price: '¥8499',
    promotion: '',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Pura_80_Pro'),
    name: 'HUAWEI Pura 80 Pro',
    discount: '限时省300',
    price: '¥7499',
    promotion: '限时',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Pura_80'),
    name: 'HUAWEI Pura 80',
    discount: '',
    price: '¥5999',
    promotion: '',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Mate_X7'),
    name: 'HUAWEI Mate X7',
    discount: '限时省1000',
    price: '¥12999',
    promotion: '限时',
    bonus_points: '赠送积分',
    category: 1
  },
  {
    image_url: $r('app.media.phone_Mate_XTs_Ultimate'),
    name: 'HUAWEI Mate XTs Ultimate',
    discount: '',
    price: '¥14999',
    promotion: '',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_nova_14'),
    name: 'HUAWEI nova 14',
    discount: '限时省200',
    price: '¥2999',
    promotion: '限时',
    bonus_points: '',
    category: 1
  },
  {
    image_url: $r('app.media.phone_HUAWEI_Enjoy_80'),
    name: 'HUAWEI Enjoy 80',
    discount: '',
    price: '¥1999',
    promotion: '',
    bonus_points: '',
    category: 1
  },
  // 电脑类 (category: 2) - 5个商品
  {
    image_url: $r('app.media.laptop_MateBook_X_Pro_Core_Ultra'),
    name: 'HUAWEI MateBook X Pro Core Ultra',
    discount: '限时省1000',
    price: '¥12999',
    promotion: '限时',
    bonus_points: '赠送积分',
    category: 2
  },
  {
    image_url: $r('app.media.laptop_MateBook_Pro'),
    name: 'HUAWEI MateBook Pro',
    discount: '',
    price: '¥9999',
    promotion: '',
    bonus_points: '',
    category: 2
  },
  {
    image_url: $r('app.media.laptop_MateBook_Fold_Ultimate'),
    name: 'HUAWEI MateBook Fold Ultimate',
    discount: '限时省1500',
    price: '¥14999',
    promotion: '限时',
    bonus_points: '',
    category: 2
  },
  {
    image_url: $r('app.media.laptop_MateBook_D_14'),
    name: 'HUAWEI MateBook D 14',
    discount: '限时省500',
    price: '¥4999',
    promotion: '限时',
    bonus_points: '',
    category: 2
  },
  {
    image_url: $r('app.media.laptop_Hi_MateBook_14_Ryzen_200'),
    name: 'Hi-MateBook 14 Ryzen 200',
    discount: '',
    price: '¥4499',
    promotion: '',
    bonus_points: '',
    category: 2
  },
  // 食品类 (category: 3) - 4个商品
  {
    image_url: $r('app.media.food_Egg_yolk_pie'),
    name: '蛋黄派',
    discount: '限时省5',
    price: '¥15',
    promotion: '限时',
    bonus_points: '',
    category: 3
  },
  {
    image_url: $r('app.media.food_Lays_Potato_chips'),
    name: '乐事薯片',
    discount: '',
    price: '¥12',
    promotion: '',
    bonus_points: '',
    category: 3
  },
  {
    image_url: $r('app.media.food_Pork_jerky'),
    name: '猪肉脯',
    discount: '限时省3',
    price: '¥28',
    promotion: '限时',
    bonus_points: '',
    category: 3
  },
  {
    image_url: $r('app.media.food_Xizhilang_jelly'),
    name: '喜之郎果冻',
    discount: '',
    price: '¥18',
    promotion: '',
    bonus_points: '',
    category: 3
  },
  // 智能家居类 (category: 6) - 5个商品
  {
    image_url: $r('app.media.Smart_furniture_Huawei_Smart_TV_MateTV'),
    name: '华为智慧屏 MateTV',
    discount: '限时省2000',
    price: '¥7999',
    promotion: '限时',
    bonus_points: '赠送积分',
    category: 6
  },
  {
    image_url: $r('app.media.Smart_furniture_Yunjing_Robot'),
    name: '云鲸智能扫托一体机器人',
    discount: '',
    price: '¥3999',
    promotion: '',
    bonus_points: '',
    category: 6
  },
  {
    image_url: $r('app.media.Smart_furniture_Huawei_Smart_Speaker'),
    name: '华为智能音箱',
    discount: '限时省200',
    price: '¥799',
    promotion: '限时',
    bonus_points: '',
    category: 6
  },
  {
    image_url: $r('app.media.Smart_furniture_Huawei_Smart_Lock'),
    name: '华为智能门锁',
    discount: '',
    price: '¥2499',
    promotion: '',
    bonus_points: '',
    category: 6
  },
  {
    image_url: $r('app.media.Smart_furniture_Huawei_Smart_Gateway'),
    name: '华为全屋智能蓝牙网关',
    discount: '限时省300',
    price: '¥699',
    promotion: '限时',
    bonus_points: '',
    category: 6
  }
];

export { classifyTabs, swiperImage, waterFlowData };
