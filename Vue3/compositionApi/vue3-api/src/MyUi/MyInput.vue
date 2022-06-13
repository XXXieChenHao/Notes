<template>
<input type="text" class="my-input" :placeholder="placeholderText">
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    placeholderText: {
      type: String,
      default: 'this is my input'
    }
  }
}
</script>

<style scoped>
 .my-input {
  border: 1px solid blue;
 }
</style>
