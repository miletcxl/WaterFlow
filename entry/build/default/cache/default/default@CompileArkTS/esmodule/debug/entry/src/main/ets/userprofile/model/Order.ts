/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * 订单数据模型
 */
export class Order {
    /**
     * 订单ID（主键）
     */
    orderId: number = 0;
    /**
     * 用户ID（外键）
     */
    userId: number = 0;
    /**
     * 商品名称
     */
    productName: string = '';
    /**
     * 商品价格
     */
    price: string = '';
    /**
     * 订单状态（进行中、待发货、已完成等）
     */
    status: string = '';
    /**
     * 订单日期
     */
    orderDate: string = '';
    /**
     * 创建时间
     */
    createTime: number = Date.now();
}
