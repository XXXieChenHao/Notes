<template>
  <div>
    {{proxyobj}}
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Reactive',
  setup() {
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
      }
    })
    setTimeout(() => {
      proxyobj.b.e.h.i = 10
      proxyobj.a = 3
    }, 3000);
    console.log(proxyobj)
    return {
      proxyobj
    }
  }
} 
</script>

<style scoped>
 
</style>
