# 商品图片添加指南

## 当前状态

目前项目使用占位图片（placeholder images）。为了使用真实的商品图片，您需要：

1. 下载对应的商品图片
2. 将图片添加到项目中
3. 更新图片资源引用

## 图片资源位置

所有商品图片应放置在：
```
entry/src/main/resources/base/media/
```

## 推荐的图片来源

### 1. 华为商城官网
- 访问：https://www.vmall.com/
- 搜索对应商品
- 右键保存商品主图

### 2. 免费图片资源网站
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Pixabay: https://pixabay.com/

### 3. 图片要求
- 格式：PNG 或 JPG
- 尺寸：建议 400x400 像素或更大
- 文件大小：建议小于 500KB
- 命名规范：使用有意义的名称，如 `product_phone_mate60.png`

## 按类别添加图片

### 手机类（phone）
建议图片：
- HUAWEI Mate 60 Pro
- HUAWEI Pura 70 Ultra
- HUAWEI nova 12 Pro
- HUAWEI Mate 50 Pro
- HUAWEI P50 Pro

### 电脑类（computer）
建议图片：
- HUAWEI MateBook X Pro
- HUAWEI MateBook 14s
- HUAWEI MateBook D 16
- HUAWEI MateBook 13

### 平板类（tablet）
建议图片：
- HUAWEI MatePad Pro 13.2"
- HUAWEI MatePad Pro 11"
- HUAWEI MatePad Air
- HUAWEI MatePad 11.5"
- HUAWEI MatePad SE

### 食品类（foods）
建议图片：
- 有机苹果
- 进口车厘子
- 新疆红枣
- 东北大米

### 男装类（men_wear）
建议图片：
- 商务休闲衬衫
- 经典款牛仔裤
- 休闲西装外套

### 生鲜类（fresh）
建议图片：
- 新鲜三文鱼
- 澳洲和牛
- 鲜活大闸蟹

### 家具厨具类（furniture）
建议图片：
- 北欧风格餐桌椅套装
- 智能电饭煲
- 不粘锅三件套

## 添加图片后的更新步骤

1. 将图片文件复制到 `entry/src/main/resources/base/media/` 目录
2. 在 `ProductImageMapper.ets` 中更新对应的图片资源引用
3. 例如：
   ```typescript
   static getPhoneImage(index: number): Resource {
     const images: Resource[] = [
       $r('app.media.product_phone_mate60'),  // 新添加的图片
       $r('app.media.product_phone_pura70'),
       // ...
     ];
     return images[index % images.length];
   }
   ```

## 图片命名建议

使用清晰的命名规范：
- 手机：`product_phone_mate60.png`, `product_phone_pura70.png`
- 电脑：`product_computer_matebook_xpro.png`
- 平板：`product_tablet_matepad_pro.png`
- 食品：`product_food_apple.png`, `product_food_cherry.png`
- 男装：`product_clothes_shirt.png`, `product_clothes_jeans.png`
- 生鲜：`product_fresh_salmon.png`, `product_fresh_beef.png`
- 家具：`product_furniture_table.png`, `product_furniture_rice_cooker.png`

## 注意事项

- 确保图片文件名不包含中文字符
- 图片资源需要在编译时可用
- 建议使用 PNG 格式以获得更好的透明度支持
- 图片尺寸应保持一致，以获得更好的视觉效果



