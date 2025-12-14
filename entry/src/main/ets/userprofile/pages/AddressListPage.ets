import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import promptAction from '@ohos.promptAction';
import { DatabaseManager } from '../database/DatabaseManager';
import { UserInfo } from '../model/UserInfo';
import Logger from '../../common/utils/Logger';

const TAG = 'AddressListPage';

@Entry
@Component
struct AddressListPage {
  @State userName: string = '';
  @State phone: string = '';
  @State address: string = '';
  @State isSaving: boolean = false;

  private userId: number = 0;
  private context = getContext(this) as common.UIAbilityContext;
  private dbManager: DatabaseManager = DatabaseManager.getInstance();

  async aboutToAppear(): Promise<void> {
    try {
      await this.dbManager.initDatabase(this.context);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `init db failed: ${error.message}`);
    }
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        promptAction.showToast({ message: '请先登录', duration: 2000 });
        router.replaceUrl({ url: 'userprofile/pages/LoginPage' }).catch(() => {});
        return;
      }
      this.userId = user.userId;
      const info = await this.dbManager.getUserInfo(user.userId);
      if (info) {
        this.userName = info.userName || '';
        this.phone = info.phone || '';
        this.address = info.address || '';
      } else {
        this.userName = user.username;
      }
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `loadData failed: ${error.message}`);
    }
  }

  private async handleSave(): Promise<void> {
    if (!this.userId || this.isSaving) {
      return;
    }
    this.isSaving = true;
    try {
      const info = (await this.dbManager.getUserInfo(this.userId)) ?? new UserInfo();
      info.userId = this.userId;
      info.userName = this.userName;
      info.phone = this.phone;
      info.address = this.address;
      await this.dbManager.saveUserInfo(this.userId, info);
      promptAction.showToast({ message: '地址已保存', duration: 2000 });
      router.back();
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `save address failed: ${error.message}`);
      promptAction.showToast({ message: '保存失败', duration: 2000 });
    } finally {
      this.isSaving = false;
    }
  }

  @Builder
  buildHeader() {
    Row() {
      Text('<')
        .fontSize(22)
        .fontColor(Color.White)
        .padding({ right: 8 })
        .onClick(() => router.back())
      Text('收货地址')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
    }
    .width('100%')
    .height(52)
    .padding({ left: 16, right: 16 })
    .backgroundColor('#FF8A3C')
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  buildInput(label: string, value: string, placeholder: string, onChange: (v: string) => void, type: InputType = InputType.Normal) {
    Column() {
      Text(label)
        .fontSize(14)
        .fontColor('#666666')
        .margin({ bottom: 6 })
      TextInput({ text: value, placeholder: placeholder })
        .type(type)
        .height(44)
        .backgroundColor('#F5F5F5')
        .borderRadius(10)
        .padding({ left: 12, right: 12 })
        .onChange((val: string) => onChange(val))
    }
    .width('100%')
  }

  build() {
    Column() {
      this.buildHeader()
      Scroll() {
        Column() {
          this.buildInput('联系人', this.userName, '请填写收货人', (v: string) => { this.userName = v; })
          Blank().height(16)
          this.buildInput('手机号', this.phone, '请填写联系电话', (v: string) => { this.phone = v; }, InputType.Number)
          Blank().height(16)
          this.buildInput('详细地址', this.address, '街道、门牌号', (v: string) => { this.address = v; })
          Blank().height(24)

          Button() {
            if (this.isSaving) {
              LoadingProgress().color(Color.White).width(20).height(20)
            } else {
              Text('保存地址')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor(Color.White)
            }
          }
          .type(ButtonType.Capsule)
          .width('100%')
          .height(48)
          .backgroundColor(this.isSaving ? '#FFD9B3' : '#FF6B00')
          .enabled(!this.isSaving)
          .onClick(async () => { await this.handleSave(); })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 16, bottom: 40 })
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}
