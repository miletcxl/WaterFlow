import { UserInfo } from '../model/UserInfo';

@Component
export default struct ProfileHeaderComponent {
  // 接收父组件传来的用户信息
  @ObjectLink userInfo: UserInfo;

  build() {
    Row() {
      // --- 头像区域 ---
      Stack({ alignContent: Alignment.BottomEnd }) {
        // 1. 头像图片
        // 如果报错 "Unknown resource name"，请确保 resources/base/media 下有 ic_avatar.png
        // 或者暂时改回 $r('app.media.app_icon')
        Image($r('app.media.ic_avatar'))
          .width(64)
          .height(64)
          .borderRadius(32) // 圆形
          .objectFit(ImageFit.Cover) // 保持比例填充
          .border({ width: 2, color: Color.White }) // 白色边框
          .backgroundColor('#CCCCCC') // 加载失败时的底色

        // 2. 右下角编辑小图标
        Text('✏️')
          .fontSize(12)
          .textAlign(TextAlign.Center)
          .width(20)
          .height(20)
          .backgroundColor('#333333')
          .fontColor(Color.White)
          .borderRadius(10)
          .border({ width: 1, color: Color.White })
          .margin({ bottom: 0, right: 0 })
        // .visibility(Visibility.Hidden) // 如果想显示就注释掉这行
      }
      .margin({ right: 16 })

      // --- 文字信息区域 ---
      Column() {
        // 昵称
        Text(this.userInfo.userName || '张三')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 6 })

        // 个人简介或ID
        Row() {
          // 【修复点】去掉 this.userInfo.userId，直接显示固定 ID
          // 因为你的 UserInfo 类里没有定义 userId 字段
          Text('ID: 888888')
            .fontSize(12)
            .fontColor('rgba(255,255,255,0.8)')
            .margin({ right: 8 })

          // 复制图标
          Text('❐')
            .fontSize(12)
            .fontColor('rgba(255,255,255,0.8)')
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1) // 占满剩余空间
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }
}