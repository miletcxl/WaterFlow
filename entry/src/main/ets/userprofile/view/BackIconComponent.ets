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
 * Back icon component - draws a beautiful left arrow.
 */
@Component
export default struct BackIconComponent {
  iconColor: ResourceColor = Color.White;
  iconSize: number = 24;

  build() {
    Stack({ alignContent: Alignment.Center }) {
      // 使用Path绘制精美的返回箭头，更粗更清晰
      Path()
        .width(this.iconSize)
        .height(this.iconSize)
        .commands(`M${this.iconSize * 0.7} ${this.iconSize * 0.25} L${this.iconSize * 0.3} ${this.iconSize * 0.5} L${this.iconSize * 0.7} ${this.iconSize * 0.75}`)
        .strokeWidth(3)
        .stroke(this.iconColor)
        .fill(Color.Transparent)
        .strokeLineCap(LineCapStyle.Round)
        .strokeLineJoin(LineJoinStyle.Round)
        .antiAlias(true)
    }
    .width(this.iconSize)
    .height(this.iconSize)
  }
}

