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
    case 'food_Baijiu': return $r('app.media.food_Baijiu');
    case 'food_Red_Wine': return $r('app.media.food_Red_Wine');
    case 'food_Rice_Oil': return $r('app.media.food_Rice_Oil');
    case 'Smart_furniture_AI_Care_Sensor_WiFi': return $r('app.media.Smart_furniture_AI_Care_Sensor_WiFi');
    case 'Smart_furniture_LBest_Drying_Rack_Q1': return $r('app.media.Smart_furniture_LBest_Drying_Rack_Q1');
    case 'Smart_furniture_Yadu_Humidifier_TJK600': return $r('app.media.Smart_furniture_Yadu_Humidifier_TJK600');
    case 'Smart_furniture_Narwal_Robot_J4': return $r('app.media.Smart_furniture_Narwal_Robot_J4');
    case 'Smart_furniture_Yunjing_Robot': return $r('app.media.Smart_furniture_Yunjing_Robot');
    case 'Smart_furniture_Huawei_Smart_Lock': return $r('app.media.Smart_furniture_Huawei_Smart_Lock');
    case 'Smart_furniture_Huawei_Smart_Gateway': return $r('app.media.Smart_furniture_Huawei_Smart_Gateway');
    case 'Smart_screen_S6_55': return $r('app.media.Smart_screen_S6_55');
    case 'Smart_screen_V5_Pro_75': return $r('app.media.Smart_screen_V5_Pro_75');
    case 'Smart_screen_Vision_4_New_75': return $r('app.media.Smart_screen_Vision_4_New_75');
    case 'Smart_screen_Vision_5_Pro_65': return $r('app.media.Smart_screen_Vision_5_Pro_65');
    case 'Smart_screen_Vision_5_SE_75': return $r('app.media.Smart_screen_Vision_5_SE_75');
    case 'Headphone_speaker_FreeBuds_5i': return $r('app.media.Headphone_speaker_FreeBuds_5i');
    case 'Headphone_speaker_FreeBuds_7i': return $r('app.media.Headphone_speaker_FreeBuds_7i');
    case 'Headphone_speaker_FreeBuds_Pro_5': return $r('app.media.Headphone_speaker_FreeBuds_Pro_5');
    case 'Headphone_speaker_FreeBuds_SE_2': return $r('app.media.Headphone_speaker_FreeBuds_SE_2');
    case 'Headphone_speaker_FreeBuds_SE_3': return $r('app.media.Headphone_speaker_FreeBuds_SE_3');
    case 'Headphone_speaker_Sound_Joy_2': return $r('app.media.Headphone_speaker_Sound_Joy_2');
    case 'Headphone_speaker_Sound_X4': return $r('app.media.Headphone_speaker_Sound_X4');
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
  { imageKey: 'food_Baijiu', name: '白酒', discount: '', price: '￥199', promotion: '限时', bonus_points: '', category: 3 },
  { imageKey: 'food_Red_Wine', name: '红葡萄酒', discount: '', price: '￥299', promotion: '', bonus_points: '', category: 3 },
  { imageKey: 'food_Rice_Oil', name: '甄选米油', discount: '', price: '￥89', promotion: '', bonus_points: '', category: 3 },
  { imageKey: 'Smart_furniture_Narwal_Robot_J4', name: '云鲸智能拖扫机器人 J4', discount: '', price: '￥4599', promotion: '限时', bonus_points: '赠送积分', category: 6 },
  { imageKey: 'Smart_furniture_Yunjing_Robot', name: '云鲸智能扫拖机器人', discount: '', price: '￥3999', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_LBest_Drying_Rack_Q1', name: '晾霸智能晾衣机 Q1 烘干版', discount: '', price: '￥2699', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Yadu_Humidifier_TJK600', name: '亚都纯净型加湿器 TJK600', discount: '', price: '￥899', promotion: '限时', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_AI_Care_Sensor_WiFi', name: 'AI辅助康养传感器 Wi-Fi 版', discount: '', price: '￥599', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Huawei_Smart_Lock', name: '华为智能门锁', discount: '', price: '￥2499', promotion: '', bonus_points: '', category: 6 },
  { imageKey: 'Smart_furniture_Huawei_Smart_Gateway', name: '华为全屋智能蓝牙网关', discount: '', price: '￥699', promotion: '限时', bonus_points: '', category: 6 },
  { imageKey: 'Smart_screen_S6_55', name: '华为智慧屏 S6 55', discount: '', price: '￥3999', promotion: '', bonus_points: '', category: 8 },
  { imageKey: 'Smart_screen_V5_Pro_75', name: '华为智慧屏 V5 Pro 75', discount: '', price: '￥8999', promotion: '限时', bonus_points: '赠送积分', category: 8 },
  { imageKey: 'Smart_screen_Vision_4_New_75', name: 'Vision智慧屏 4 New 75', discount: '', price: '￥5999', promotion: '', bonus_points: '', category: 8 },
  { imageKey: 'Smart_screen_Vision_5_Pro_65', name: 'Vision智慧屏 5 Pro 65', discount: '', price: '￥6999', promotion: '', bonus_points: '', category: 8 },
  { imageKey: 'Smart_screen_Vision_5_SE_75', name: 'Vision智慧屏 5 SE 75', discount: '', price: '￥6499', promotion: '', bonus_points: '', category: 8 },
  { imageKey: 'Headphone_speaker_FreeBuds_5i', name: 'HUAWEI FreeBuds 5i', discount: '', price: '￥599', promotion: '', bonus_points: '', category: 7 },
  { imageKey: 'Headphone_speaker_FreeBuds_7i', name: 'HUAWEI FreeBuds 7i', discount: '', price: '￥799', promotion: '限时', bonus_points: '', category: 7 },
  { imageKey: 'Headphone_speaker_FreeBuds_Pro_5', name: 'HUAWEI FreeBuds Pro 5', discount: '', price: '￥1299', promotion: '限时', bonus_points: '赠送积分', category: 7 },
  { imageKey: 'Headphone_speaker_FreeBuds_SE_2', name: 'HUAWEI FreeBuds SE 2', discount: '', price: '￥299', promotion: '', bonus_points: '', category: 7 },
  { imageKey: 'Headphone_speaker_FreeBuds_SE_3', name: 'HUAWEI FreeBuds SE 3', discount: '', price: '￥349', promotion: '', bonus_points: '', category: 7 },
  { imageKey: 'Headphone_speaker_Sound_Joy_2', name: 'HUAWEI Sound Joy 2', discount: '', price: '￥1299', promotion: '限时', bonus_points: '', category: 7 },
  { imageKey: 'Headphone_speaker_Sound_X4', name: 'HUAWEI Sound X4', discount: '', price: '￥2499', promotion: '', bonus_points: '赠送积分', category: 7 }
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
