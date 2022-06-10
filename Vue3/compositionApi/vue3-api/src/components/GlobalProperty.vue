
<template>
  <div>
 
  </div>
</template>

<script>
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
      console.log(proxy.utils)  
    })
  }
}
</script>

<style scoped lang=''>
 
</style>
