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
/**
 * User information data model.
 */
export class UserInfo {
    /**
     * User name.
     */
    userName: string = '';
    /**
     * User avatar URL.
     */
    avatar: string = '';
    /**
     * User phone number.
     */
    phone: string = '';
    /**
     * User email.
     */
    email: string = '';
    /**
     * User address.
     */
    address: string = '';
    /**
     * User gender.
     */
    gender: string = '';
    /**
     * User birthday.
     */
    birthday: string = '';
    /**
     * User signature.
     */
    signature: string = '';
}
/**
 * Profile menu item data model.
 */
export class ProfileMenuItem {
    /**
     * Menu item title.
     */
    title: ResourceStr = '';
    /**
     * Menu item icon.
     */
    icon: ResourceStr = '';
    /**
     * Menu item action type.
     */
    actionType: string = '';
    /**
     * Whether show arrow.
     */
    showArrow: boolean = true;
}
