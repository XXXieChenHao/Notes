<template>
  <div>
    <h1>{{attrs.title}}</h1>
    <h1>{{ count }}</h1>
    <button @click="handleClick">增加</button>
  </div>
</template>

<script>
import { watch, watchEffect, toRefs } from 'vue'
export default {
  name: 'App',
  props: {
    title: String,
    count: Number
  },
  // props 使用与监听
  // setup(props) {
  //   // watchEffect(() => {
  //   //   console.log(props.title)
  //   // })

  //   watch(() => {
  //     return props.title
  //   }, (newVal) => {
  //     console.log(newVal)
  //   })
  // }
    

  // 结构赋值
  // setup({title}) {
  //   watchEffect(() => {
  //     console.log(title) // title 变更后不会再打印
  //   })
  // }

  // 第二个参数
  setup(props, context) {

    const handleClick = () => {
      context.emit('handleChange', 1) 
    }

    return {
      handleClick,
      // ...toRefs(context.attrs)
       attrs: context.attrs
    }
  }
  // setup(props, {attrs, emit, slots}) {
    
  // }
}
</script>

<style scoped lang=''>
 
</style>
