import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import promptAction from '@ohos.promptAction';
import { DatabaseManager } from '../database/DatabaseManager';
import { Favorite } from '../model/Favorite';
import Logger from '../../common/utils/Logger';

const TAG = 'FavoriteListPage';

@Entry
@Component
struct FavoriteListPage {
  @State favorites: Favorite[] = [];
  @State isLoading: boolean = true;
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
    await this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    try {
      const user = await this.dbManager.getCurrentUser();
      if (!user) {
        promptAction.showToast({ message: '请先登录', duration: 2000 });
        router.replaceUrl({ url: 'userprofile/pages/LoginPage' }).catch(() => {});
        return;
      }
      this.userId = user.userId;
      this.favorites = await this.dbManager.getFavorites(user.userId, 100);
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `loadFavorites failed: ${error.message}`);
      promptAction.showToast({ message: '收藏加载失败', duration: 2000 });
    } finally {
      this.isLoading = false;
    }
  }

  private async removeFavorite(id: number): Promise<void> {
    if (!this.userId) {
      return;
    }
    try {
      await this.dbManager.deleteFavorite(this.userId, id);
      await this.loadFavorites();
    } catch (err) {
      const error = err as Error;
      Logger.error(TAG, `removeFavorite failed: ${error.message}`);
      promptAction.showToast({ message: '取消收藏失败', duration: 2000 });
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
      Text('收藏')
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
  buildFavoriteItem(item: Favorite) {
    Row() {
      Image(item.productImage || $r('app.media.ic_more'))
        .width(56)
        .height(56)
        .backgroundColor('#F5F5F5')
        .borderRadius(8)
        .objectFit(ImageFit.Cover)
        .margin({ right: 12 })

      Column() {
        Text(item.productName)
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .fontColor(Color.Black)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(item.price || '')
          .fontSize(14)
          .fontColor('#E95B27')
          .margin({ top: 6 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)

      Button('移除')
        .type(ButtonType.Normal)
        .backgroundColor('#FFF2E5')
        .fontColor('#FF6B00')
        .borderRadius(12)
        .height(32)
        .onClick(async () => { await this.removeFavorite(item.favoriteId); })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 8, color: '#08000000', offsetY: 2 })
  }

  @Builder
  buildContent() {
    if (this.isLoading) {
      Column() {
        LoadingProgress().width(40).height(40).color('#FF6B00')
        Text('加载中...').fontSize(14).fontColor('#999999').margin({ top: 12 })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    } else if (this.favorites.length === 0) {
      Column() {
        Text('还没有收藏').fontSize(16).fontColor('#999999')
        Button('去逛逛')
          .type(ButtonType.Capsule)
          .backgroundColor('#FF8A3C')
          .fontColor(Color.White)
          .margin({ top: 16 })
          .onClick(() => router.replaceUrl({ url: 'pages/HomePage' }).catch(() => {}))
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    } else {
      List({ space: 12 }) {
        ForEach(this.favorites, (item: Favorite, index: number) => {
          ListItem() {
            this.buildFavoriteItem(item)
          }
        }, (_item: Favorite, index: number) => `fav-${index}`)
      }
      .width('100%')
      .padding({ top: 12, left: 16, right: 16, bottom: 16 })
      .edgeEffect(EdgeEffect.Spring)
    }
  }

  build() {
    Column() {
      this.buildHeader()
      this.buildContent()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F6F6F6')
  }
}
