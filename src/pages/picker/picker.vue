<template>
  <view>
    <h2>picker</h2>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-picker
      :visible="visible"
      @hide="hide"
      @confirm="confirm"
      @cancel="cancel"
      :range="range"
      :default-value="defaultValue">
      <view>确定</view>
    </wz-picker>
  </view>
</template>

<script>
import WzPicker from 'components/picker/picker'
export default {
  data () {
    return {
      visible: false,
      range: [1, 2, 3, 4, 5],
      defaultValue: 2
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
      this.hide(value)
      console.log('cancel', value)
    }
  },
  components: {
    WzPicker
  }
}
</script>

<style lang="scss">

</style>
