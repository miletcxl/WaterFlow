import { IProductItem } from './ProductItem';

export interface ProductSeed {
  imageKey: string;
  name: string;
  discount: string;
  price: string;
  promotion: string;
  bonus_points: string;
  category: number;
}

export function getProductImage(imageKey: string): Resource {
  switch (imageKey) {
    case 'phone_Mate_80_Pro': return $r('app.media.phone_Mate_80_Pro');
    case 'phone_Mate_80': return $r('app.media.phone_Mate_80');
    case 'phone_Pura_80_Ultra': return $r('app.media.phone_Pura_80_Ultra');
    case 'phone_Pura_80_Pro_Plus': return $r('app.media.phone_Pura_80_Pro_Plus');
    case 'phone_Pura_80_Pro': return $r('app.media.phone_Pura_80_Pro');
    case 'phone_Pura_80': return $r('app.media.phone_Pura_80');
    case 'phone_Mate_X7': return $r('app.media.phone_Mate_X7');
    case 'phone_Mate_XTs_Ultimate': return $r('app.media.phone_Mate_XTs_Ultimate');
    case 'phone_nova_14': return $r('app.media.phone_nova_14');
    case 'phone_HUAWEI_Enjoy_80': return $r('app.media.phone_HUAWEI_Enjoy_80');
    case 'laptop_MateBook_X_Pro_Core_Ultra': return $r('app.media.laptop_MateBook_X_Pro_Core_Ultra');
    case 'laptop_MateBook_Pro': return $r('app.media.laptop_MateBook_Pro');
    case 'laptop_MateBook_Fold_Ultimate': return $r('app.media.laptop_MateBook_Fold_Ultimate');
    case 'laptop_MateBook_D_14': return $r('app.media.laptop_MateBook_D_14');
    case 'laptop_Hi_MateBook_14_Ryzen_200': return $r('app.media.laptop_Hi_MateBook_14_Ryzen_200');
    case 'food_Egg_yolk_pie': return $r('app.media.food_Egg_yolk_pie');
    case 'food_Lays_Potato_chips': return $r('app.media.food_Lays_Potato_chips');
    case 'food_Pork_jerky': return $r('app.media.food_Pork_jerky');
    case 'food_Xizhilang_jelly': return $r('app.media.food_Xizhilang_jelly');
    case 'Smart_furniture_Huawei_Smart_TV_MateTV': return $r('app.media.Smart_furniture_Huawei_Smart_TV_MateTV');
    case 'Smart_furniture_Yunjing_Robot': return $r('app.media.Smart_furniture_Yunjing_Robot');
    case 'Smart_furniture_Huawei_Smart_Speaker': return $r('app.media.Smart_furniture_Huawei_Smart_Speaker');
    case 'Smart_furniture_Huawei_Smart_Lock': return $r('app.media.Smart_furniture_Huawei_Smart_Lock');
    case 'Smart_furniture_Huawei_Smart_Gateway': return $r('app.media.Smart_furniture_Huawei_Smart_Gateway');
    default: return $r('app.media.ic_holder_computer');
  }
}

export const productSeeds: ProductSeed[] = [
  { imageKey: 'phone_Mate_80_Pro', name: 'HUAWEI Mate 80 Pro', discount: '', price: '￥8999', promotion: '限时', bonus_points: '', category: 1 },
  { imageKey: 'phone_Mate_80', name: 'HUAWEI Mate 80', discount: '', price: '￥6999', promotion: '', bonus_points: '', category: 1 },
  { imageKey: 'phone_Pura_80_Ultra', name: 'HUAWEI Pura 80 Ultra', discount: '', price: '￥9999', promotion: '限时', bonus_points: '赠送积分', category: 1 },
  { imageKey: 'phone_Pura_80_Pro_Plus', name: 'HUAWEI Pura 80 Pro Plus', discount: '', price: '￥8499', promotion: '', bonus_points: '', category: 1 },
  { imageKey: 'phone_Pura_80_Pro', name: 'HUAWEI Pura 80 Pro', discount: '', price: '￥7499', promotion: '限时', bonus_points: '', category: 1 },
  { imageKey: 'phone_Pura_80', name: 'HUAWEI Pura 80', discount: '', price: '￥5999', promotion: '', bonus_points: '', category: 1 },
  { imageKey: 'phone_Mate_X7', name: 'HUAWEI Mate X7', discount: '', price: '￥12999', promotion: '限时', bonus_points: '赠送积分', category: 1 },
  { imageKey: 'phone_Mate_XTs_Ultimate', name: 'HUAWEI Mate XTs Ultimate', discount: '', price: '￥14999', promotion: '', bonus_points: '', category: 1 },
  { imageKey: 'phone_nova_14', name: 'HUAWEI nova 14', discount: '', price: '￥2999', promotion: '限时', bonus_points: '', category: 1 },
  { imageKey: 'phone_HUAWEI_Enjoy_80', name: 'HUAWEI Enjoy 80', discount: '', price: '￥1999', promotion: '', bonus_points: '', category: 1 },
  { imageKey: 'laptop_MateBook_X_Pro_Core_Ultra', name: 'HUAWEI MateBook X Pro Core Ultra', discount: '', price: '￥12999', promotion: '限时', bonus_points: '赠送积分', category: 2 },
  { imageKey: 'laptop_MateBook_Pro', name: 'HUAWEI MateBook Pro', discount: '', price: '￥9999', promotion: '', bonus_points: '', category: 2 },
  { imageKey: 'laptop_MateBook_Fold_Ultimate', name: 'HUAWEI MateBook Fold Ultimate', discount: '', price: '￥14999', promotion: '限时', bonus_points: '', category: 2 },
  { imageKey: 'laptop_MateBook_D_14', name: 'HUAWEI MateBook D 14', discount: '', price: '￥4999', promotion: '限时', bonus_points: '', category: 2 },
  { imageKey: 'laptop_Hi_MateBook_14_Ryzen_200', name: 'Hi-MateBook 14 Ryzen 200', discount: '', price: '￥4499', promotion: '', bonus_points: '', category: 2 },
  { imageKey: 'food_Egg_yolk_pie', name: '蛋黄派', discount: '', price: '￥15', promotion: '限时', bonus_points: '', category: 3 },
  { imageKey: 'food_Lays_Potato_chips', name: '乐事薯片', discount: '', price: '￥12', promotion: '', bonus_points: '', category: 3 },
  { imageKey: 'food_Pork_jerky', name: '猪肉脯', discount: '', price: '￥28', promotion: '限时', bonus_points: '', category: 3 },
  { imageKey: 'food_Xizhilang_jelly', name: '喜之郎果冻', discount: '', price: '￥18', promotion: '', bonus_points: '', category: 3 },
  { imageKey: 'Smart_furniture_Huawei_Smart_TV_MateTV', name: '华为智慧屏 MateTV', discount: '', price: '￥7999', promotion: '限时', bonus_points: '赠送积分', category: 6 },
  { imageKey: 'Smart_furniture_Yunjing_Robot', name: '云鲸智能扫托一体机器人', discount: '', price: '￥3999', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Huawei_Smart_Speaker', name: '华为智能音箱', discount: '', price: '￥799', promotion: '限时', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Huawei_Smart_Lock', name: '华为智能门锁', discount: '', price: '￥2499', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Huawei_Smart_Gateway', name: '华为全屋智能蓝牙网关', discount: '', price: '￥699', promotion: '限时', bonus_points: '', category: 6 }
];

export function seedProductsAsItems(): IProductItem[] {
  const items: IProductItem[] = [];
  for (const item of productSeeds) {
    items.push({
      image_url: getProductImage(item.imageKey),
      name: item.name,
      discount: item.discount,
      price: item.price,
      promotion: item.promotion,
      bonus_points: item.bonus_points,
      category: item.category
    });
  }
  return items;
}
