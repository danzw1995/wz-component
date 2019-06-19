<template>
  <view>
    <button
      v-for="(item, index) in btns"
      :key="index"
      @click="navTo(item)">{{ item.label }}</button>
      <picker
        class="reserve-form-picker"
        @change="locationChange"
        :value="defaultProvinceInfo"
        mode="region">
        <view v-if="location">{{ location }}</view>
        <view v-else>gdgdf</view>
      </picker>
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
        { label: 'regionPicker', url: '../regionPicker/regionPicker' }
      ],
      location: null,
      defaultProvinceInfo: ['广东省', '广州市', '天河区']
    }
  },
  methods: {
    navTo (item) {
      uni.navigateTo({ url: item.url })
    },
    locationChange (e) {
      this.location = e.detail.value.join('-')
    }
  }
}
</script>

<style lang="scss">

</style>
