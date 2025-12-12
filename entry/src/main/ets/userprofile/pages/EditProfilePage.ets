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
import promptAction from '@ohos.promptAction';
import { DatabaseManager } from '../database/DatabaseManager';
import { ProfileViewModel } from '../viewmodel/ProfileViewModel';
import Logger from '../../common/utils/Logger';

const TAG = 'EditProfilePage';

@Entry
@Component
struct EditProfilePage {
  @State userName: string = '';
  @State phone: string = '';
  @State email: string = '';
  @State address: string = '';
  @State gender: string = '';
  @State birthday: string = '';
  @State signature: string = '';
  @State isLoading: boolean = false;
  @State isSaving: boolean = false;

  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();
  private viewModel: ProfileViewModel = new ProfileViewModel();

  async aboutToAppear(): Promise<void> {
    try {
      await this.dbManager.initDatabase(this.context);
      await this.viewModel.initUserInfo();
      
      // 加载当前用户信息
      this.userName = this.viewModel.userInfo.userName || '';
      this.phone = this.viewModel.userInfo.phone || '';
      this.email = this.viewModel.userInfo.email || '';
      this.address = this.viewModel.userInfo.address || '';
      this.gender = this.viewModel.userInfo.gender || '';
      this.birthday = this.viewModel.userInfo.birthday || '';
      this.signature = this.viewModel.userInfo.signature || '';
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `页面初始化失败: ${error.message}`);
    }
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Row() {
          Text('❮')
            .fontSize(22)
            .fontColor(Color.White)
            .fontWeight(FontWeight.Bold)
            .margin({ right: 8 })
          Text('编辑个人信息')
            .fontSize(18)
            .fontColor(Color.White)
            .fontWeight(FontWeight.Medium)
        }
        .onClick(() => {
          router.back();
        })
        Blank()
        Button() {
          if (this.isSaving) {
            LoadingProgress()
              .color(Color.White)
              .width(16)
              .height(16)
          } else {
            Text('保存')
              .fontSize(16)
              .fontColor(Color.White)
          }
        }
        .type(ButtonType.Normal)
        .backgroundColor(this.isSaving ? '#FFD9B3' : '#FF6B00')
        .borderRadius(20)
        .padding({ left: 20, right: 20, top: 8, bottom: 8 })
        .enabled(!this.isSaving)
        .onClick(() => {
          this.handleSave();
        })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#FF6B00')
      .justifyContent(FlexAlign.SpaceBetween)
      .alignItems(VerticalAlign.Center)

      // 表单内容
      Scroll() {
        Column() {
          // 用户名
          this.buildInputItem('👤', '用户名', this.userName, (value: string) => {
            this.userName = value;
          })

          // 手机号
          this.buildInputItem('📱', '手机号', this.phone, (value: string) => {
            this.phone = value;
          })

          // 邮箱
          this.buildInputItem('📧', '邮箱', this.email, (value: string) => {
            this.email = value;
          })

          // 地址
          this.buildInputItem('📍', '地址', this.address, (value: string) => {
            this.address = value;
          })

          // 性别选择
          Column() {
            Row() {
              Text('⚧️')
                .fontSize(20)
                .margin({ right: 12 })
              Text('性别')
                .fontSize(16)
                .fontColor('#333333')
                .layoutWeight(1)
            }
            .width('100%')
            .height(50)
            .padding({ left: 16, right: 16 })
            .alignItems(VerticalAlign.Center)

            Row() {
              this.buildGenderButton('男', this.gender === '男')
              this.buildGenderButton('女', this.gender === '女')
              this.buildGenderButton('保密', this.gender === '保密' || this.gender === '')
            }
            .width('100%')
            .padding({ left: 16, right: 16, bottom: 16 })
            .justifyContent(FlexAlign.SpaceEvenly)
          }
          .width('100%')
          .backgroundColor(Color.White)
          .borderRadius(12)
          .margin({ top: 16, bottom: 16 })

          // 生日
          this.buildInputItem('🎂', '生日（格式：YYYY-MM-DD）', this.birthday, (value: string) => {
            this.birthday = value;
          })

          // 个人签名
          Column() {
            Row() {
              Text('✍️')
                .fontSize(20)
                .margin({ right: 12 })
              Text('个人签名')
                .fontSize(16)
                .fontColor('#333333')
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 16 })
            .alignItems(VerticalAlign.Center)

            TextArea({ placeholder: '请输入个人签名', text: this.signature })
              .width('100%')
              .height(100)
              .fontSize(15)
              .backgroundColor('#F5F5F5')
              .borderRadius(8)
              .padding(12)
              .onChange((value: string) => {
                this.signature = value;
              })
          }
          .width('100%')
          .backgroundColor(Color.White)
          .borderRadius(12)
          .margin({ top: 16, bottom: 30 })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 20 })
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F6F6F6')
  }

  @Builder
  buildInputItem(icon: string, label: string, value: string, onChange: (value: string) => void) {
    Column() {
      Row() {
        Text(icon)
          .fontSize(20)
          .margin({ right: 12 })
        TextInput({ placeholder: `请输入${label}`, text: value })
          .layoutWeight(1)
          .fontSize(16)
          .backgroundColor(Color.Transparent)
          .onChange(onChange)
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .height(56)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .margin({ top: 16 })
  }

  @Builder
  buildGenderButton(label: string, isSelected: boolean) {
    Button(label)
      .type(ButtonType.Normal)
      .fontSize(15)
      .fontColor(isSelected ? Color.White : '#666666')
      .backgroundColor(isSelected ? '#FF6B00' : '#F5F5F5')
      .borderRadius(20)
      .width(100)
      .height(40)
      .onClick(() => {
        this.gender = label;
      })
  }

  async handleSave(): Promise<void> {
    this.isSaving = true;
    try {
      const currentUser = await this.dbManager.getCurrentUser();
      if (!currentUser) {
        promptAction.showToast({ message: '用户未登录', duration: 2000 });
        return;
      }

      // 更新用户信息
      this.viewModel.userInfo.userName = this.userName.trim();
      this.viewModel.userInfo.phone = this.phone.trim();
      this.viewModel.userInfo.email = this.email.trim();
      this.viewModel.userInfo.address = this.address.trim();
      this.viewModel.userInfo.gender = this.gender;
      this.viewModel.userInfo.birthday = this.birthday.trim();
      this.viewModel.userInfo.signature = this.signature.trim();

      // 保存到数据库
      await this.viewModel.saveUserInfo();
      
      promptAction.showToast({ message: '保存成功', duration: 2000 });
      
      // 延迟返回，让用户看到成功提示
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (err) {
      const error = err as Error;
      promptAction.showToast({ message: `保存失败: ${error.message}`, duration: 2000 });
      Logger.error(TAG, `保存失败: ${error.message}`);
    } finally {
      this.isSaving = false;
    }
  }
}

