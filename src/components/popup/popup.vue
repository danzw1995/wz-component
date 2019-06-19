<template>
  <view class="wz-popup" :style="{ display: visible ? 'block': 'none'}">
    <view class="wz-popup__mask" @click="maskClick"></view>
    <view class="wz-popup__container" :class="[ dClass ]">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dClass () {
      return this.bottom ? 'wz-popup__container--bottom' : 'wz-popup__container--default'
    }
  },
  methods: {
    maskClick () {
      this.maskClosable && this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
  .wz-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .wz-popup__mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .wz-popup__container {
    position: absolute;
    // background: #fff;
  }
  .wz-popup__container--default {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .wz-popup__container--bottom {
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
