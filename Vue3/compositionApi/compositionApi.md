# Vue Composition API

CompostionApi 不是用户层面上的，是 Vue 框架上的， 将 hook 组合起来 形成了 Vue3.0 的框架设计模式。
不在外部使用一些方法，全部都变成了 vue 当中的 每一个钩子（hook），在 setup 的作用域中使用
（vue2 使用的是 options API 的模式）
{
  a: 1,
  watch:() {

  },
  data() {

  }
}


一个 vue 是由多个 hook 组合而成的框架，叫做 compositionApi

## setup
`setup` 是新的组件选项，是为了在使用 compositionAPI 而在组件内部所创建的组件选项。

### 调用时机
`setup` 被调用在当一个组件实例被创建，在初始化属性完成之后。在生命周期的角度来说在 `beforeCreate` 之前。

### 生命周期
在 2.0 中生命周期全部都是选项，在 3.0除了 `setup` 外全部都要在 `setup` 中使用, 其中 `beforeCreate` 和 `created` 被删除，见相当于 `setup`
```
beforeCreate   ——>   setup()
created   ——>  setup()
beforeMount   ——>  onBeforeMount
mounted   ——>  onMounted
beforeUpdate   ——>  onBeforeUpdate
updated   ——>  onUpdated
beforeDestroy   ——>  onBeforeUnmount
destroyed   ——>  onUnmounted
activated   ——>  onActivated
deactivated   ——>  onDeactivated
errorCaptured   ——>  onErrorCaptured
```

### 在 Template 中使用
如果 `setup` 返回一个对象，对象的属性将会被合并到**执行机上下文(render context)**以提供于组件的 template 使用
```vue
<template>
  <div>
    {{count}},
    {{object.count}}
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  setup() {
    const count = ref(0)
    const object = reactive({
      count: 1
    })
    return {
      count,
      object,
    }
  }
}
</script>
```
响应式在 `setup` 中返回时被自动拆分,所以在后续 template 中获取时不需要使用 `.value` 取值。
*ref 会生成一个响应式对象，*
f
### render 函数
```js
  import { h } from 'vue'
  const count = ref(0)
  return () => h('h1', [count.value])
```
setup 也能返回一个 render 函数，可以直接将响应式代码描述在相同的作用域中。

### 参数

**props**

setup 方法接收了一个被解析过的 props 作为第一个参数
```vue
<template>
  <div>
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    title: String
  },
  setup(props) {
    console.log(props)
  }

}
</script>
```
props 对象是响应式的，如果 props 更新了会传递一个新的 props 进来，并且会被响应式系统 `watch` 和 `watchEffect` 观察
不要将 props 对象解构，否则将失去响应式
```js
setup({title}) {
  watchEffect(() => {
    console.log(title) // title 变更后不会再打印
  })
}
```
props 中的数据是只读的，不可以更改。想在子组件中更改，只能调用父组件方法进行修改。

**context 执行期上下文**
- 第二个参数是一个选项列表，抛出一些 2.xApi 中的一些 this 上的属性。
  - attrs
  - slots
  - emit

attrs 和 slots 都是当前组件实例中被代理后的结果。这确保了总是抛出最新的值，及时在更新以后，所以不用担心访问到一个旧的值。也可以说 attrs 和 slots 本身就是响应式对戏那个，所以可以解构赋值。


attrs 多是为了在使用组件时属性值过多时使用，如果属性值过多时则应考虑是否是组件封装不合理。
```js
setup(props, context) {
//setup(props, {attrs, emit, slots})

return {
  // 在 template 中可以使用对应的属性，并且会随着父组件变化而变化，但是会警告，期待一个被 reactive 包裹的对象
  // ...toRefs(context.attrs)
  
  // 在 template 中使用 attrs. 属性
  // attrs: context.attrs
}
}
```

emit 意在指代 2.x 中 this.$emit 调用父组件的方法，在 setup 中没有 this，所以将其挂载到 context 上.
```vue
// 子组件
<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="handleClick">增加</button>
  </div>
</template>
<script>
export default {
  props: {
    count: Number,
    setup(props, context) {

      const handleClick = () => {
        // this.$emit('functionName', 'arguments')
        context.emit('handleChange', 1) 
      }

      return {
        handleClick,
      }
    }
  },
}
</script>

// 父组件
<template>
  <div>
    <Arguments :count="count" @handleChange="handleChange"/>
  </div>
</template>

<script>
import Arguments from './components/Arguments.vue'
import { ref } from 'vue'
export default {
  components: {
    Arguments
  },
  setup() {

    const count = ref(-)

    const handleChange = (num) => {
      count.value += num
    }

    return {
      count,
      handleChange
    }
  }
}
</script>
```

为什么 props 要单独作为一个参数而不包含道 context 中呢？
1. props 是比其他属性更频繁被使用的属性，多数情况下组件中只使用 props
2. 可以单独给 props 设置类型推断


### 使用 this
setup 中没有 this，因为 setup() 是在 2.x选项参数被解析完成之前调用，this 在 setup 与 2.x 选项中的 this 是不一样的，如果 this 有效可能会在 setup 与 2.x 选项中使用时出现一些混乱，并且初学者很难避免在 setup 中造成混乱。


## Reactivity APIs
响应性 API 包含以下部分：
- refs
- Computed 与 watch
- Effect 作用域 API

### 响应性基础 API

**reactive**
返回一个对象被 proxy 代理后的响应式副本，功能上与 2.x 中的 Vue.observable() 相似。

```js
const proxyobj = reactive({
  a: 1,
  b: {
    c: 2,
    d: [1,2,3,4,5,6],
    e: {
      f: 6,
      g: [2,3,4],
      h: {
        i: 5,
        j: 6
      }
    }
  })
```
Reactive 的绑定是深度的，它影响了对象内部的所有属性，返回的 proxy 对象不同于原有的对象，所以在开发中应使用被代理后的对象而避免使用原对象。

**readonly**
readonly 会将一个对象（响应式或者普通的）或者一个 ref 对象返回一个被代理后只读的对象，只读的响应式是深度的，任何一层属性都是只读的。

```js
const proxyobj = reactive({
  a: 1,
})
const readonlyObj = readonly(proxyobj)

proxyobj.a = 2
console.log(proxyobj.a) // 2

readonlyObj.a = 3
console.log(readonlyObj.a) // 2  Set operation on key "a" failed: target is readonly.
```
readonly 包裹只要改写就会被警告。

**ref**
返回一个内部的值和一个响应式可变的 ref 对象。

ref对象只有一个属性 .value，它会指向这个内部的值.访问和赋值都要通过 .value.

```js
const count = ref(0)
console.log(count)

count.value = 2
console.log(count.value)
/**
 * RefImpl: {
 *   dep: undefined
 *   __v_isRef: true
 *   __v_isShallow: false
 *   _rawValue: 0
 *   _value: 0
 *   value: 0      inner value
 * }
*/
```

如果将一个对象指定为一个 ref 的值，那么系统会将它通过 reactive 的方法创建一个深度的响应式数据。并且会将一个 Proxy 作为 inner value。
当一个 ref 对象作为一个属性在 render context(setup)中被返回，并且在 template 中使用，它将会自动将 inner value 取出，所以不需要再通过 .value 取值。

```js
const obj = ref({a: 1, b: 2})
console.log(obj)
/**
 * RefImpl: {
 *   dep: undefined
 *   __v_isRef: true
 *   __v_isShallow: false
 *   _rawValue: {a: 1, b: 2}
 *   _value: Proxy {a: 1, b: 2}  
 *   value: Proxy
 * }
 * 
 * 访问时需要 obj.value.a
*/
```

当一个可访问的 ref 对象或一个可变得值作为 reactive 对象的属性，它将会自然的将其内部值展开就像一个普通的属性一样。

```js
const count = ref(0)
const state = reactive({
  count
})

count.value = 1
console.log(state.count)  // 1
```

如果将一个新的 ref 对象作为属性赋值为已经存在的 ref，那么将会替换掉旧的 ref。
```js
const count = ref(0)
const otherCount = ref(3)

const state = reactive({
  count
})
state.count = otherCount
console.log(state.count)
console.log(count.value)
```


注意：reactive 仅当内部关联的是 ref 对象时才会自动展开，如果内部访问的值是一个数据或者原生类型如 Map 则不会自动展开.
```js
const arr = reactive([ref(0)])
console.log(arr[0].value)

const map = reactive(new Map([['foo', ref(0)]]))
console.log(map.get('foo').value)
```


**computed**
computed 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。
```vue
<template>
  <div>{{superSentence}}</div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'Computed',
  setup() {
    const sentence = ref('这是一句话')

    const superSentence = computed(() => {
      return 'computed' + sentence.value
    })

    return {
      superSentence
    }
  }
} 
</script>
```
或者，接受一个拥有 get 和 set 函数的对象，用来创建一个可写的 ref 对象，

```js
const sentence = ref('这是一句话')
const superSentence = computed({
  get() {
    return '这是get' + sentence.value
  },
  set(newValue) {
    sentence.value = '我修改了这句话'
  },
})

setTimeout(() => {
  superSentence.value = 1
}, 1000);

return {
  superSentence
}
```


**watchEffect**
watchEffect 会自动依赖收集，响应式监听内部依赖变化，并在依赖改变后立即重新运行一次该方法。
```js
const count = ref(0)

setTimeout(() => {
  count.value = 1
}, 1000);

watchEffect(() => {
  console.log(count.value)  // 0,1s后打印 1
})
```

*watcher 的停止*
当 watchEffect 在组件的setup()函数或生命周期钩子期间被调用, watcher 会与组件生命周期狗子联系起来，并且将会在组件卸载时自动的停止。
另外，watchEffect 会返回一个句柄函数很明确的停止 watcher
```js
const count = ref(0)

const stop = watchEffect(() => {
  console.log(count.value)  // 0, 1 只打印两次
})

setTimeout(() => {
  count.value = 1
}, 1000);
setTimeout(() => {
  stop()
}, 2000);
setTimeout(() => {
  count.value = 2
}, 3000);
```

*清除副作用*
  
 