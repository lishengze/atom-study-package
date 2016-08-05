# Atom and Monitor Package.
## monitor-login: 客户端登录模块
  * 通讯机制.
    1. 将数据传输从渲染进程中用子进程的方式独立开来，减少数据传输对于客户端页面渲染的影响。子父进程的交互通过[nodejs](https://nodejs.org/docs/latest-v0.12.x/api/)自带的[process](https://nodejs.org/docs/latest-v0.12.x/api/process.html)模块完成，子父进程间数据的传输是同步的。
    2. 使用nodejs的[https](https://nodejs.org/docs/latest-v0.12.x/api/https.html)模块建立代理服务器用于连接客户端与真正的后台。
    3. 使用[socketio](http://socket.io/)连接客户端与代理服务器。通过socketio的消息机制来发送请求和接受数据。
  * 登录模块的交互设计。
    1. 页面设计。
    2. 登录异常处理。

## monitor-treeView: 客户端目录的树形结构设计与数据内容的图形图表展示的页面交互设计
* 使用[kendoui](http://www.kendoui.io/)的treeview插件开发树形结构
  1. 数据的请求、接受、绑定。
  2. 页面的自动生成。
* 数据展示与交互
  1. 数据的图表展示，主要使用[highchart](http://www.highcharts.com/demo/), 需要进行优化达到性能与交互效果的最佳。
  2. 整个页面布局的交互设计，达到用户体验最佳。

## monitor-sidebar: treeview 模块需要用到的package

## space-pen-master, atom-space-pen-views-master
* atom进行页面设计的基础类，需要好好学习.

## test
* 测试各种功能的package.
