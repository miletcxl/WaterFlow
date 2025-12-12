/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * 会员信息数据模型
 */
export class MemberInfo {
    /**
     * 用户ID（主键，关联user_account）
     */
    userId: number = 0;
    /**
     * 会员等级（1-5）
     */
    level: number = 1;
    /**
     * 会员等级名称
     */
    levelName: string = '普通会员';
    /**
     * 积分
     */
    points: number = 0;
    /**
     * 本月节省金额
     */
    monthlySaved: number = 0;
    /**
     * 更新时间
     */
    updateTime: number = Date.now();
}
