<template>
  <view>
    <button @click="show">确定</button>
    <button @click="hide">隐藏</button>
    <wz-dialog :visible="visible" @hide-popup="hide">
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
    }
  },
  components: {
    WzDialog
  }
}
</script>

<style lang="scss">

</style>
