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
 * User icon component - draws a circle with text.
 */
@Component
export default struct UserIconComponent {
  iconColor: ResourceColor = Color.Black;
  iconSize: number = 24;
  text: string = '我';

  build() {
    Stack({ alignContent: Alignment.Center }) {
      // 圆形背景
      Circle({ width: this.iconSize, height: this.iconSize })
        .fill(this.iconColor)
        .opacity(0.15)
      // 文字
      Text(this.text)
        .fontSize(this.iconSize * 0.5)
        .fontColor(this.iconColor)
        .fontWeight(FontWeight.Medium)
    }
    .width(this.iconSize)
    .height(this.iconSize)
  }
}

