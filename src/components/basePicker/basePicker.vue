<template>
  <wz-popup
    :visible="visible"
    @hide="hide"
    :bottom="true"
    :mask-closable="true">
    <view class="wz-picker">
      <view class="wz-picker__btns">
        <view class="wz-picker__btns--cancel" @click="cancel">{{ cancelText }}</view>
        <view class="wz-picker__btns--confirm" @click="confirm">{{ confirmText }}</view>
      </view>
      <view class="wz-picker__view">
        <slot />
      </view>
    </view>
  </wz-popup>
</template>

<script>
import WzPopup from 'components/popup/popup'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default () {
        return []
      }
    },
    rangeKey: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
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
    },
  },
  components: {
    WzPopup
  }
}
</script>

<style lang="scss">
  @import 'common/styles/mixin.scss';
  @import 'common/styles/variable.scss';
  .wz-picker {
    background: #fff;
    animation: popup 0.4s;
  }
  @keyframes popup {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .wz-picker__btns {
    @include flex($justifyContent: space-between);
    padding: 0 20upx;
    font-size: 34upx;
    height: 70upx;
  }
  .wz-picker__btns--cancel {
    color: #ccc;
  }
  .wz-picker__btns--confirm {
    color: $themeColor;
  }
  .wz-picker__view {
    height: 300upx;
    padding-top: 40upx;
    padding-bottom: 80upx;
    color: #000;
    picker-view {
      height: 100%;
      font-size: 26upx;
    }
    picker-view-column {
      text-align: center;
      transition: all 1s;
      view {
        height: 68upx;
        line-height: 68upx;
      }
    }
  }
</style>
