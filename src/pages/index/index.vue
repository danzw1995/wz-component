<template>
  <view>
    <button
      v-for="(item, index) in btns"
      :key="index"
      @click="navTo(item)">{{ item.label }}</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      btns: [
        { label: 'popup', url: '../popup/popup' },
        { label: 'dialog', url: '../dialog/dialog' },
        { label: 'picker', url: '../picker/picker' },
        { label: 'datePicker', url: '../datePicker/datePicker' },
        { label: 'multiPicker', url: '../multiPicker/multiPicker' }
      ]
    }
  },
  methods: {
    navTo (item) {
      uni.navigateTo({ url: item.url })
    }
  }
}
</script>

<style lang="scss">

</style>
