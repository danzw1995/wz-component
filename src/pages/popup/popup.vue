<template>
  <view>
    <h2>popup</h2>
    <button @click="show">展示</button>
    <button @click="hide">隐藏</button>
    <wz-popup :visible="showPopup" @hide="hide" :mask-closable="true">
      <view style="background: #fff">hello world</view>
    </wz-popup>
  </view>
</template>

<script>
import WzPopup from 'components/popup/popup'
export default {
  data () {
    return {
      showPopup: false
    }
  },
  methods: {
    hide () {
      this.showPopup = false
    },
    show () {
      this.showPopup = true
    }
  },
  components: {
    WzPopup
  }
}
</script>

<style lang="scss">

</style>
