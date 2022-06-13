<template>
  <button  class="my-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style scoped>
 .my-button {
  background-color: orange;
  color: #fff;
 }
</style>
