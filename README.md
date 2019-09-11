### webpack4 + vue 
可打包单入口，多入口
config/index.js中，mutiplePages属性为true，则为多页面打包

**如果需要外部引入.bpmn文件来渲染流程图，需要安装raw-loader来处理**

## 文件结构
```
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径和参数配置
├── src                                         // 源码目录
    ├── components                              // 组件
        ├── bpmn                                //bpmn自定义文件
            ├── bpmn-js                         //bpmn-js
            ├── custom                         //自定义文件
                ├── custom-bpmn                        //自定义bpmn，自定义颜色，形状
                ├── custom-panel                        //自定义节点属性面板
                    ├── components                        //自定义节点属性面板的弹框组件
					├── index.js               //基于bpmn-js-properties-panel自定义的入口文件
					├── customPanel.js         //完全自定义节点属性面板的入口文件
    |—— errorPage                              // 错误页面
    |—— pages                              // 页面
        ├── index                           
            ├── router                        //路由 
            ├── views                        //页面组件 
            	├── index.vue                     //bpmn流程图，原始的，没有自定义的 
            	├── index-color.vue                        //bpmn流程图，自定义颜色
            	├── bpmn-shape.vue                        //bpmn流程图，自定义形状 
            	├── bpmn-properties2.vue                        //bpmn流程图，完全自定义的节点属性弹框 
            	├── bpmn-properties.vue                        //bpmn流程图，基于bpmn-js-properties-panel自定义的节点属性面板
    |—— style                              // 样式
    |—— utils                              // 公共方法
```

## 启动页面
- install
``` npm install ```

- development
```npm run dev ```

- production
```npm run build```

