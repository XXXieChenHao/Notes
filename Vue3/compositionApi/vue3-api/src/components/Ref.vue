<template>
  <div>
 
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    count.value = 2
    console.log(count)

    const obj = ref({a: 1, b: 2})
    console.log(obj)

  }
}
</script>
