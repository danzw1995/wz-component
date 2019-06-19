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
        <view v-for="(item, index) in provinces" :key="index">{{ item[prop] }}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in cityList" :key="index">{{ item[prop] }}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in areaList" :key="index">{{ item[prop] }}</view>
      </picker-view-column>
    </picker-view>
  </wz-base-picker>
</template>

<script>
/**
 * label 展示的属性key
 * childrenKey 子列表属性key
 * defaultValue 默认值 仅支持 ['广东省', '广州市', '天河区'] 这种形式
 * 
 */

import WzBasePicker from '../basePicker/basePicker'
import provinces from 'common/js/provinces'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    label: {
      type: String,
      default: ''
    },
    childrenKey: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      provinces,
      current: {},
      value: [0, 0, 0]
    }
  },
  computed: {
    cityList () {
      return this.provinces[this.value[0]][this.children] || []
    },
    areaList () {
      let cityList = this.value[1]
      return this.cityList[cityList] && this.cityList[cityList][this.children] || []
    },
    prop () {
      return this.label || 'name'
    },
    children () {
      return this.childrenKey || 'sub'
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel', this.current)
    },
    hide () {
      this.$emit('hide')
    },
    confirm () {
      this.$emit('confirm', this.current)
    },
    bindChange (e) {
      this.value = e.detail.value
      this.format(this.value)
    },
    // 格式化
    format () {
      let [provinceIndex, cityIndex, areaIndex] = this.value
      let province = this.provinces[provinceIndex][this.prop]
      let city = this.cityList[cityIndex] && this.cityList[cityIndex][this.prop]
      let area = this.areaList[areaIndex] && this.areaList[areaIndex][this.prop]
      this.current =  {
        province,
        city,
        area,
        value: this.value,
        text: [province, city, area]
      }
    },
    initPicker () {
      let defaultValue = this.defaultValue
      if (!defaultValue.length) {
        this.value = [0, 0, 0]
      } else {
        this.value = this.find(this.defaultValue)
      }
      this.format(this.value)
    },
    // 有默认值情况下的处理
    find (defaultValue) {
      let [province, city, area] = defaultValue

      let provinceIndex = this.findIndex(this.provinces, province)

      let cityList = this.provinces[provinceIndex][this.children]

      let cityIndex = this.findIndex(cityList, city)

      let areaList = cityList[cityIndex][this.children]

      let areaIndex = this.findIndex(areaList, area)

      return [provinceIndex, cityIndex, areaIndex]
    },
    findIndex (list, value) {
      // 找到则返回所在的索引，否则返回0
      return Math.max(list.findIndex(item => item[this.prop] === value), 0)
    }
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
