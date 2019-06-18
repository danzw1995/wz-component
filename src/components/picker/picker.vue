<template>
  <wz-base-picker
    :visible="visible"
    @hide="hide"
    @cancel="cancel"
    @confirm="confirm"
    :bottom="true"
    :cancel-text="cancelText"
    :confirm-text="confirmText">
    <picker-view :value="value" @change="bindChange">
      <picker-view-column>
        <view v-for="(item, index) in range" :key="index">{{ rangeKey ? item[rangeKey] : item }}</view>
      </picker-view-column>
    </picker-view>
  </wz-base-picker>
</template>

<script>
import WzBasePicker from 'components/basePicker/basePicker'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [Number, String],
      default: '' 
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
  data () {
    return {
      current: {},
      value: []
    }
  },
  methods: {
    bindChange (e) {
      let value = e.detail.value
      this.$nextTick(() => {
        this.value = value
      })
    },
    initPicker () {
      let index = Math.max(0,
        this.range.findIndex(item => this.rangeKey
          ? item[this.rangeKey] === this.defaultValue
          : item === this.defaultValue
        )
      )
      this.current = {
        index,
        value: this.range[index]
      }
      this.value = [index]
    },
    hide () {
      this.$emit('hide')
    },
    cancel () {
      this.$emit('cancel', this.current)
    },
    confirm () {
      this.$emit('confirm', this.current)
    },
  },
  onReady () {
    this.initPicker()
  },
  components: {
    WzBasePicker
  }
}
</script>

<style lang="scss">

</style>
