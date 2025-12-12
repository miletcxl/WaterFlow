/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * 收藏数据模型
 */
export class Favorite {
    /**
     * 收藏ID（主键）
     */
    favoriteId: number = 0;
    /**
     * 用户ID（外键）
     */
    userId: number = 0;
    /**
     * 商品名称
     */
    productName: string = '';
    /**
     * 商品图片URL
     */
    productImage: string = '';
    /**
     * 商品价格
     */
    price: string = '';
    /**
     * 收藏时间
     */
    createTime: number = Date.now();
}
