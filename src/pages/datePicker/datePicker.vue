<template>
  <view>
    <h2>datePicker</h2>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-date-picker
      :visible="visible"
      @hide="hide"
      @confirm="confirm"
      @cancel="cancel">
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
    },
    confirm (value) {
      this.hide()
      console.log('confirm', value)
    },
    cancel (value) {
      this.hide()
      console.log('cancel', value)
    }
  },
  components: {
    WzDatePicker
  }
}
</script>

<style lang="scss">

</style>
