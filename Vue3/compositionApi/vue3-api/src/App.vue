<template>
  <div>
    <!-- props 参数 -->
    <Arguments :title="title" :count="count" @handleChange="handleChange"/>
    <GlobalProperty :utils="utils"/>
  </div>
</template>

<script>
import { reactive, ref, h } from 'vue'
import Arguments from './components/Arguments.vue'
import GlobalProperty from './components/GlobalProperty.vue'
export default {
  name: 'App',
  components: {
    Arguments,
    GlobalProperty,
  },
  setup() {
    const utils = {
      a: 1,
      b: 2
    }
    // const count = ref(0)
    // const object = reactive({
    //   count: 1
    // })
    // return {
    //   count,
    //   object,
    // }

    // render(h) 函数
    // const count = ref(0)
    // return () => h('h1', [count.value])

    const title = ref('我是vue')

    const count = ref(0)

    setTimeout(() => {
        title.value="我是 Vue 3.0"
    }, 2000);

    const handleChange = (num) => {
      count.value += num
    }

    return {
      handleChange,
      count,
      title,
      utils
    }
  }
}
</script>