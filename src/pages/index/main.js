import { baseUrl } from '@/utils';
import axios from 'axios';
import Vue from 'vue';
import App from './App';
import { router} from './router';
import store from '@/store'

import '@bpmn/bpmn-js/dist/assets/diagram-js.css';
// import '@bpmn/bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn/bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import '@bpmn/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn/customPalette/app.css';
import '@bpmn/customPalette/provider/custom.css'
import 'ant-design-vue/dist/antd.less';
import '@/assets/font/iconfont.css'
import '@bpmn/diagram/style/style.less'

// 组件
import message from 'ant-design-vue/lib/message'
import Form from 'ant-design-vue/lib/form'
import Icon from 'ant-design-vue/lib/icon'
import Row from 'ant-design-vue/lib/row'
import Col from 'ant-design-vue/lib/col'
import Input from 'ant-design-vue/lib/input'
import Button from 'ant-design-vue/lib/button'
import Modal from 'ant-design-vue/lib/modal'

Vue.use(Icon)
Vue.use(Form)
Vue.use(Col)
Vue.use(Row)
Vue.use(Input)
Vue.use(Button)
Vue.use(Modal)
Vue.prototype.$message = message;

Vue.prototype.bus = new Vue();
Vue.config.productionTip = false

Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$axios = axios

new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: '<App/>',
})

