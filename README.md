### webpack4 + vue 
可打包单入口，多入口
config/index.js中，mutiplePages属性为true，则为多页面打包

├── build                                       // webpack配置文件
├── config                                      // 项目打包路径和参数配置
├── src                                         // 源码目录
│   ├── components                              // 组件
│   |—— errorPage                              // 错误页面
│   |—— pages                              // 页面
│   |—— style                              // 样式
│   |—— utils                              // 公共方法


``` npm install ```

```npm run dev ```

```npm run build```