<template>
  <view>
    <h2>dialog</h2>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-dialog
      :visible="visible"
      @hide="hide"
      @confirm="confirm"
      @cancel="cancel"
      :show-cancel="true">
      <!-- <template name="footer"> -->
        <view>确定</view>
      <!-- </template> -->
    </wz-dialog>
  </view>
</template>

<script>
import WzDialog from 'components/dialog/dialog'
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
    confirm () {
      this.hide()
      console.log('confirm')
    },
    cancel () {
      this.hide()
      console.log('cancel')
    }
  },
  components: {
    WzDialog
  }
}
</script>

<style lang="scss">

</style>
