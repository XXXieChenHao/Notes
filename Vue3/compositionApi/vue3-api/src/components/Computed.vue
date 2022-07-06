<template>
  <div>{{superSentence}}</div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'Computed',
  setup() {
    // const sentence = ref('这是一句话')

    // const superSentence = computed(() => {
    //   return 'computed' + sentence.value
    // })

    // return {
    //   superSentence
    // }

    const sentence = ref('这是一句话')
    const superSentence = computed({
      get() {
        return '这是get' + sentence.value
      },
      set() {
        sentence.value = '我修改了这句话'
      },
    })

    setTimeout(() => {
      superSentence.value = 1
    }, 1000);

  return {
      superSentence
    }
  }
} 
</script>

<style scoped>
 
</style>
