
# Global Api

## createApp
> 创建一个应用实例。
### type
```js
function createApp(rootComponent: Component, rootProps?: object): App
```
### Details
第一个参数是 root组件, 第二个可选参数是要传递给根组件的 props

## app.mount()
> 加载应用实例在容器元素上
### type
```js
interface App {
  mount(rootContainer: Element | string): ComponentPublicInstance
}
```
### Details
参数可以是一个实际的DOM元素也可以是一个 CSS 选择器（第一个被匹配的元素将会被使用），返回 root 组件实例
如果组件拥有一个 template 标签或是一个 render 方法，它将替换容器内的任何现有DOM节点。因此，如果运行编译器可用，容器的 innerHTML 将会被用作 模版

## Application Config
每个 Vue 应用都会暴露一个包含其配置项的 config 对象，在挂载应用之前可以修改其配置

```js
// 添加一个在任何当前实例挂载的组件中都可以被访问的全局属性，
// vue2 
// Vue.prototype.utils = utils
// vue3
const app = createApp(App)
app.config.globalProperties.utils = utils
app.mount('#app')
```

在组件中通过 getCurrentInstance 获取当前应用实例

```js
import { getCurrentInstance, onMounted } from 'vue'
export default {
  setup() {

    onMounted( () => {
      const { proxy } = getCurrentInstance()
      console.log(proxy.utils)  
    })
  }
}
```

**优先级**
添加一个全局的属性能够在任意的组件实例中使用。组件的属性将会覆盖掉实例的 key

```vue
  <GlobalProperty :utils="{a: 1, b: 2}"/>
```
<!- -->
```js
import { getCurrentInstance, onMounted } from 'vue'
export default {
  props: {
    utils: {
      type: Object
    }
  },
  setup() {

    onMounted( () => {
      const { proxy } = getCurrentInstance()
      console.log(proxy.utils)   // 此时 proxy 打印 {a: 1, b: 2} 而并不是曾经配置的全局工具
    })
  }
}
```

