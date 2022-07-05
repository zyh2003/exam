<template>
  <div class=""></div>
</template>

<script>
import { getCaptcha } from '../api/user'
export default {
  setup(props, ctx) {
    getCaptcha().then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
