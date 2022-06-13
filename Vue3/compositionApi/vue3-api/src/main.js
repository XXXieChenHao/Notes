import { createApp } from 'vue'
import App from './App.vue'
import * as utils from './libs/utils';
import MyUi from './MyUi';

// config -> Object 包含 vue app 的全局的配置项 你可以在挂载组件前调整属性

const app = createApp(App)

app.use(MyUi, {
  components: [
    'MyButton'
  ]
})

// 添加一个在任何当前实例挂载的组件中都可以被访问的全局属性，
/**
 * vue2 
 * Vue.prototype.utils = utils
 * 
 * vue3
 * app.config.globalProperties.utils = utils
 */

app.config.globalProperties.utils = utils

// import { nextTick } from "@vue/runtime-core";
// // 这里是重点。 - 必须加nextTick,不然会有加载顺序问题，导致绑定失败
// nextTick(() => {
//   app.config.globalProperties.$foo = 'bar'
// })

app.mount('#app')
