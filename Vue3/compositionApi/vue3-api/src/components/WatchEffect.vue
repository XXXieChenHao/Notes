<template>
  <div>
 
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const count = ref(0)

    const stop = watchEffect(() => {
      console.log(count.value)
    })

    setTimeout(() => {
      count.value = 1
    }, 1000);
    setTimeout(() => {
      stop()
      count.value = 2
    }, 2000);

  }
}
</script>

<style scoped lang=''>
 
</style>
