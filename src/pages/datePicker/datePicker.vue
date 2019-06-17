<template>
  <view>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-date-picker :visible="visible" @hide-popup="hide">
      <view>确定</view>
    </wz-date-picker>
  </view>
</template>

<script>
import WzDatePicker from 'components/datePicker/datePicker'
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    }
  },
  components: {
    WzDatePicker
  }
}
</script>

<style lang="scss">

</style>
