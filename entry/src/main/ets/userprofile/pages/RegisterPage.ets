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
import { UserInfo } from '../model/UserInfo';
import { MemberInfo } from '../model/MemberInfo';
import { Order } from '../model/Order';
import Logger from '../../common/utils/Logger';

const TAG = 'RegisterPage';

@Entry
@Component
struct RegisterPage {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
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
        Text('创建账户')
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
          .margin({ bottom: 8 })
        Text('注册新账户，开启精彩之旅')
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

      // 注册表单区域
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
        .margin({ bottom: 16 })

        // 确认密码输入框
        Column() {
          Row() {
            Text('🔒')
              .fontSize(20)
              .margin({ right: 12 })
            TextInput({ placeholder: '请再次输入密码', text: this.confirmPassword })
              .layoutWeight(1)
              .type(InputType.Password)
              .fontSize(16)
              .backgroundColor(Color.Transparent)
              .onChange((value: string) => {
                this.confirmPassword = value;
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

        // 注册按钮
        Button() {
          if (this.isLoading) {
            LoadingProgress()
              .color(Color.White)
              .width(20)
              .height(20)
          } else {
            Text('注册')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor(Color.White)
          }
        }
        .width('100%')
        .height(50)
        .backgroundColor(this.canRegister() ? '#FF6B00' : '#FFD9B3')
        .borderRadius(25)
        .enabled(this.canRegister() && !this.isLoading)
        .onClick(() => {
          this.handleRegister();
        })
        .margin({ bottom: 16 })

        // 登录链接
        Row() {
          Text('已有账户？')
            .fontSize(14)
            .fontColor('#999999')
          Text('立即登录')
            .fontSize(14)
            .fontColor('#FF6B00')
            .fontWeight(FontWeight.Medium)
            .onClick(() => {
              router.back();
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

  canRegister(): boolean {
    return this.username.trim().length > 0 &&
           this.password.trim().length >= 6 &&
           this.password === this.confirmPassword;
  }

  async handleRegister(): Promise<void> {
    if (!this.canRegister()) {
      if (this.password !== this.confirmPassword) {
        promptAction.showToast({ message: '两次输入的密码不一致', duration: 2000 });
      } else if (this.password.trim().length < 6) {
        promptAction.showToast({ message: '密码长度至少6位', duration: 2000 });
      } else {
        promptAction.showToast({ message: '请填写完整信息', duration: 2000 });
      }
      return;
    }

    this.isLoading = true;
    try {
      const userId = await this.dbManager.registerUser(this.username.trim(), this.password.trim());
      
      // 创建默认用户信息
      const defaultUserInfo = new UserInfo();
      defaultUserInfo.userName = this.username.trim();
      defaultUserInfo.phone = '';
      defaultUserInfo.email = '';
      defaultUserInfo.address = '';
      defaultUserInfo.gender = '';
      defaultUserInfo.birthday = '';
      defaultUserInfo.signature = '这个人很懒，什么都没有留下';
      
      await this.dbManager.saveUserInfo(userId, defaultUserInfo);
      
      // 创建默认会员信息
      const defaultMemberInfo = new MemberInfo();
      defaultMemberInfo.userId = userId;
      defaultMemberInfo.level = 1;
      defaultMemberInfo.levelName = '普通会员';
      defaultMemberInfo.points = 100; // 新用户赠送100积分
      defaultMemberInfo.monthlySaved = 0;
      await this.dbManager.saveMemberInfo(userId, defaultMemberInfo);
      
      // 创建一些示例订单数据
      const sampleOrders: Order[] = [
        {
          orderId: 0,
          userId: userId,
          productName: '小米无线鼠标',
          price: '￥79',
          status: '进行中',
          orderDate: new Date().toISOString().split('T')[0],
          createTime: Date.now() - 2 * 24 * 60 * 60 * 1000 // 2天前
        },
        {
          orderId: 0,
          userId: userId,
          productName: '台灯阅读灯',
          price: '￥129',
          status: '待发货',
          orderDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createTime: Date.now() - 4 * 24 * 60 * 60 * 1000 // 4天前
        },
        {
          orderId: 0,
          userId: userId,
          productName: '咖啡豆 500g',
          price: '￥89',
          status: '已完成',
          orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createTime: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7天前
        }
      ];
      
      for (const order of sampleOrders) {
        await this.dbManager.saveOrder(userId, order);
      }
      
      promptAction.showToast({ message: '注册成功', duration: 2000 });
      
      // 自动登录
      const userAccount = await this.dbManager.loginUser(this.username.trim(), this.password.trim());
      if (userAccount) {
        setTimeout(() => {
          router.replaceUrl({
            url: 'pages/HomePage'
          }).catch((err: Error) => {
            Logger.error(TAG, `跳转首页失败: ${err.message}`);
          });
        }, 500);
      }
    } catch (err) {
      const error = err as Error;
      promptAction.showToast({ message: `注册失败: ${error.message}`, duration: 2000 });
      Logger.error(TAG, `注册失败: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }
}

