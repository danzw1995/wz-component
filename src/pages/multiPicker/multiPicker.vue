<template>
  <view>
    <h2>datePicker</h2>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-multi-picker
      :visible="visible"
      :default-value="defaultValue"
      @hide="hide"
      @confirm="confirm"
      @cancel="cancel">
      <view>确定</view>
    </wz-multi-picker>
  </view>
</template>

<script>
import WzMultiPicker from 'components/multiPicker/multiPicker'
export default {
  data () {
    return {
      visible: false,
      defaultValue: ['广东省', '广州市', '天河区']
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
    WzMultiPicker
  }
}
</script>

<style lang="scss">

</style>
