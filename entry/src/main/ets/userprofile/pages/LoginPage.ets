/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import promptAction from '@ohos.promptAction';
import { DatabaseManager } from '../database/DatabaseManager';
import Logger from '../../common/utils/Logger';

const TAG = 'LoginPage';

@Entry
@Component
struct LoginPage {
  @State username: string = '';
  @State password: string = '';
  @State isLoading: boolean = false;
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  aboutToAppear(): void {
    // 初始化数据库
    this.dbManager.initDatabase(this.context).catch((err: BusinessError | Error) => {
      const error = err as Error;
      Logger.error(TAG, `数据库初始化失败: ${error.message}`);
    });
  }

  build() {
    Column() {
      // 顶部装饰区域
      Column() {
        Text('欢迎回来')
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
          .margin({ bottom: 8 })
        Text('登录您的账户以继续')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.9)')
      }
      .width('100%')
      .height(200)
      .justifyContent(FlexAlign.Center)
      .linearGradient({
        angle: 180,
        colors: [['#FF8A3C', 0.0], ['#FFB36B', 1.0]]
      })
      .borderRadius({ bottomLeft: 30, bottomRight: 30 })

      // 登录表单区域
      Column() {
        // 用户名输入框
        Column() {
          Row() {
            Text('👤')
              .fontSize(20)
              .margin({ right: 12 })
            TextInput({ placeholder: '请输入用户名', text: this.username })
              .layoutWeight(1)
              .fontSize(16)
              .backgroundColor(Color.Transparent)
              .onChange((value: string) => {
                this.username = value;
              })
          }
          .width('100%')
          .height(50)
          .padding({ left: 16, right: 16 })
          .alignItems(VerticalAlign.Center)
        }
        .width('100%')
        .height(56)
        .backgroundColor('#F5F5F5')
        .borderRadius(12)
        .margin({ top: 40, bottom: 16 })

        // 密码输入框
        Column() {
          Row() {
            Text('🔒')
              .fontSize(20)
              .margin({ right: 12 })
            TextInput({ placeholder: '请输入密码', text: this.password })
              .layoutWeight(1)
              .type(InputType.Password)
              .fontSize(16)
              .backgroundColor(Color.Transparent)
              .onChange((value: string) => {
                this.password = value;
              })
          }
          .width('100%')
          .height(50)
          .padding({ left: 16, right: 16 })
          .alignItems(VerticalAlign.Center)
        }
        .width('100%')
        .height(56)
        .backgroundColor('#F5F5F5')
        .borderRadius(12)
        .margin({ bottom: 24 })

        // 登录按钮
        Button() {
          if (this.isLoading) {
            LoadingProgress()
              .color(Color.White)
              .width(20)
              .height(20)
          } else {
            Text('登录')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor(Color.White)
          }
        }
        .width('100%')
        .height(50)
        .backgroundColor(this.canLogin() ? '#FF6B00' : '#FFD9B3')
        .borderRadius(25)
        .enabled(this.canLogin() && !this.isLoading)
        .onClick(() => {
          this.handleLogin();
        })
        .margin({ bottom: 16 })

        // 注册链接
        Row() {
          Text('还没有账户？')
            .fontSize(14)
            .fontColor('#999999')
          Text('立即注册')
            .fontSize(14)
            .fontColor('#FF6B00')
            .fontWeight(FontWeight.Medium)
            .onClick(() => {
              router.pushUrl({
                url: 'userprofile/pages/RegisterPage'
              }).catch((err: Error) => {
                Logger.error(TAG, `跳转注册页失败: ${err.message}`);
              });
            })
        }
        .width('100%')
        .justifyContent(FlexAlign.Center)
        .margin({ top: 20 })
      }
      .width('100%')
      .padding({ left: 24, right: 24 })
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }

  canLogin(): boolean {
    return this.username.trim().length > 0 && this.password.trim().length > 0;
  }

  async handleLogin(): Promise<void> {
    if (!this.canLogin()) {
      promptAction.showToast({ message: '请输入用户名和密码' });
      return;
    }

    this.isLoading = true;
    try {
      const userAccount = await this.dbManager.loginUser(this.username.trim(), this.password.trim());
      if (userAccount) {
        promptAction.showToast({ message: '登录成功', duration: 2000 });
        // 延迟跳转，让用户看到成功提示
        setTimeout(() => {
          router.replaceUrl({
            url: 'pages/HomePage'
          }).catch((err: Error) => {
            Logger.error(TAG, `跳转首页失败: ${err.message}`);
          });
        }, 500);
      } else {
        promptAction.showToast({ message: '用户名或密码错误', duration: 2000 });
      }
    } catch (err) {
      const error = err as Error;
      promptAction.showToast({ message: `登录失败: ${error.message}`, duration: 2000 });
      Logger.error(TAG, `登录失败: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }
}

