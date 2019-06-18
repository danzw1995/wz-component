<template>
  <wz-popup :visible="visible" @hide="hide">
    <view class="wz-dialog">
      <view class="wz-dialog__container">
        <view class="wz-dialog__header"></view>
        <view class="wz-dialog__content"></view>
        <view class="wz-dialog__footer">
          <slot></slot>
        </view>
      </view>
    </view>
  </wz-popup>
</template>

<script>
import WzPopup from '../popup/popup'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  components: {
    WzPopup
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
  @import 'common/styles/mixin.scss';
  @import 'common/styles/variable.scss';
  .wz-dialog {

  }
  .wz-dialog__header {}
  .wz-dialog__content {}
  .wz-dialog__footer {
    @include flex();
    border-top: $dialog-border;
    &:last-child {
      color: $themeColor;
    }
  }
</style>
