# Parakeet-RS Desktop

暂时停更。

目前并没有一个能让我真正满意 GUI 框架。

要么如 GTK 4 一样，在 Windows 11 下画了个简单窗口，还啥都没干就花了 400MB 内存；
要么就是和基于 winit 的自绘框架，连个编辑框右键菜单、CJK 渲染字体选择、可访问性都一团糟。

至于 QT，找到一堆包，但我也分不清哪一个可能下一个月就没人维护了。

Tauri 算是矮个里拔高个了，但是这胶水代码写得太难受了。前端、后端各一个状态管理，然后做同步。

项目刚初始化就得先下好几百个依赖，让我怀疑这是一个 node 项目（虽然基本也是 JS 相关了）。

还是回去用 C++ 吧，不安全就不安全吧，反正写起来舒服。

库还是会维护的，毕竟有一个 CLI 工具凑合着用。

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Run in dev mode

```sh
yarn tauri dev
```

## Produce production build

```sh
yarn tauri build
```
