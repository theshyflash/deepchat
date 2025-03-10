// 聚焦浏览器 实现复制功能
import { app, globalShortcut } from 'electron'
import { WindowPresenter } from './windowPresenter'
import { ConfigPresenter } from './configPresenter'
import * as process from 'node:process'
import { GlobalKeyboardListener } from 'node-global-key-listener'

export class ShortcutPresenter {
  private windowPresenter: WindowPresenter
  private readonly configPresenter: ConfigPresenter
  private isActive: boolean = false

  constructor(windowPresenter: WindowPresenter, configPresenter: ConfigPresenter) {
    this.windowPresenter = windowPresenter
    this.configPresenter = configPresenter
    console.log('ShortcutPresenter constructor', this.configPresenter)
  }

  registerShortcuts(): void {
    if (this.isActive) return

    // 隐藏窗口的快捷键
    globalShortcut.register(
      process.platform === 'darwin' ? 'Command+Shift+H' : 'Control+Shift+H',
      () => {
        if (this.windowPresenter.mainWindow?.isFocused()) {
          this.windowPresenter.hide()
        }
      }
    )

    let lastKeyPressTime = 0;
    const gap = 1000;
    const v = new GlobalKeyboardListener();
    v.addListener((e, down) => {
      const isMac = process.platform === 'darwin'; // 判断是否是 macOS
      const isCtrlOrCmdPressed = isMac
        ? down['LEFT META'] || down['RIGHT META']  // macOS 上按下 Command 键
        : down['LEFT CTRL'] || down['RIGHT CTRL'];     // Windows 上按下 Ctrl 键

      // 检查按下的是 Ctrl + C 或 Command + C
      if (e.state === 'DOWN' && e.name === 'C' && isCtrlOrCmdPressed) {
        try {
        } catch (error) {
          console.error('捕获了错误:', error);
        }
        const currentTime = Date.now();
        const timeGap = currentTime - lastKeyPressTime;
        // 判断是否按下的时间间隔小于设定的阈值
        if (timeGap < gap) {
          console.log("走到了这里");
          // 检查 windowPresenter 和 mainWindow 是否存在，且确保 mainWindow 没有聚焦
          if (this.windowPresenter && this.windowPresenter.mainWindow && !this  .windowPresenter.mainWindow.isFocused()) {
            this.windowPresenter.show();  // 唤醒软件
            console.log('唤醒软件');
          }
        }
        lastKeyPressTime = currentTime;
      }
    });



    // let lastKeyPressTime = 0 // 记录上一次按下 Ctrl+C 的时间
    // const gap = 280 // 两次按键的时间间隔
    // // 显示窗口的快捷键
    // globalShortcut.register(process.platform === 'darwin' ? 'Command+C' : 'Control+C', () => {
    //   const currentTime = Date.now()
    //   // 判断是否为快速连续按下两次 Ctrl+C
    //   if (currentTime - lastKeyPressTime < gap) {
    //     console.log(currentTime - lastKeyPressTime < gap)
    //     // 唤醒或启动窗口
    //     if (!this.windowPresenter.mainWindow?.isFocused()) {
    //       this.windowPresenter.show()
    //       console.log('唤醒软件')
    //     }
    //   }
    //   // 更新上一次按键时间
    //   lastKeyPressTime = currentTime
    // })

    // Command+Q 或 Ctrl+Q 退出程序
    globalShortcut.register(process.platform === 'darwin' ? 'Command+Q' : 'Control+Q', () => {
      app.quit()
    })

    this.isActive = true
  }

  unregisterShortcuts(): void {
    globalShortcut.unregisterAll()
    this.isActive = false
  }

  destroy(): void {
    this.unregisterShortcuts()
  }
}
