<template>
  <wz-popup :visible="visible" @hide="hide">
    <view class="wz-dialog">
      <view class="wz-dialog__header">{{ header }}</view>
      <view class="wz-dialog__content">
        <slot />
      </view>
      <view class="wz-dialog__footer">
        <view class="wz-dialog__btns wz-dialog__btns--cancel" v-if="showCancel" @click="cancel">{{ cancelText }}</view>
        <view class="wz-dialog__btns wz-dialog__btns--confirm" @click="confirm">{{ confirmText }}</view>
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
    header: {
      type: String,
      default: '温馨提示'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WzPopup
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
  @import 'common/styles/mixin.scss';
  @import 'common/styles/variable.scss';
  .wz-dialog {
    width: 650upx;
    border-radius: 10upx;
    background: #fff;
  }
  .wz-dialog__header {
    height: 50upx;
    padding-top: 30upx;
    line-height: 50upx;
    font-size: 38upx;
    text-align: center;
  }
  .wz-dialog__content {
    padding: 30upx;
    text-align: center;
  }
  .wz-dialog__footer {
    @include flex();
    border-top: $dialog-border;
  }
  .wz-dialog__btns {
    @include flex();
    height: 100upx;
    flex: 1;
  }
  .wz-dialog__btns + .wz-dialog__btns {
    border-left: $dialog-border;
  }
  .wz-dialog__btns--cancel {
    color: #ccc;
  }
  .wz-dialog__btns--confirm {
    color: $themeColor;
  }
</style>
