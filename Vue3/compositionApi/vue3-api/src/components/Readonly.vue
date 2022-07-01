<template>
  <div>
    {{proxyobj}}
  </div>
</template>

<script>
import { reactive, readonly } from 'vue'
export default {
  name: 'Reactive',
  setup() {
    const proxyobj = reactive({
      a: 1,
    })
    const readonlyObj = readonly(proxyobj)

    proxyobj.a = 2
    console.log(proxyobj.a)

    readonlyObj.a = 3
    console.log(readonlyObj.a)
  }
} 
</script>

<style scoped>
 
</style>
