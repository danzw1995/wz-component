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
        <view v-for="(item, index) in pickerData.years" :key="index">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in pickerData.months" :key="index">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in pickerData.days" :key="index">{{ item }}日</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in pickerData.times" :key="index">{{ item }}</view>
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
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    startTime: {
      type: String,
      default: '2018-06-10'
    },
    endTime: {
      type: String,
      default: '2022-09-24'
    },
    defaultTime: {
      type: [Date, String],
      default: null
    }
  },
  computed: {
    start () {
      return this.formatDate(this.startTime)
    },
    end () {
      return this.formatDate(this.endTime)
    }
  },
  data () {
    return {
      pickerData: {},
      current: {},
      value: [0, 0, 0, 0],
      now: new Date()
    }
  },
  methods: {
    bindChange (e) {
      let value = e.detail.value
      let current = this.format(value)

      // 更新月份
      this.pickerData.months = this.initMonth(current, true)

      // 更新天
      this.pickerData.days = this.initDay(current, true)
      this.$nextTick(() => {
        this.value = value
        this.current = current
      })
    },
    formatDate (timeStr) {
      let [year, month, day] = timeStr.split('-')
      return {
        year,
        month,
        day
      }
    },
    format (value) {
      let [yearIndex, monthIndex, dayIndex, timeIndex] = value
      let year = this.pickerData.years[yearIndex]
      let month = this.pickerData.months[monthIndex]
      let day = this.pickerData.days[dayIndex]
      let time = this.pickerData.times[timeIndex]
      return {
        year,
        month,
        day,
        time,
        date: `${year}-${month}-${day}:${time}`
      }
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
    initPicker () {
     
      // 处理当前时间
      let defTime = this.dealNowTime()

      let years = this.initYear(this.start.year, this.end.year)
      let months = this.initMonth(defTime)
      let days = this.initDay(defTime)
      let times = this.initTime()

      
      this.pickerData = {
        years,
        months,
        days,
        times
      }

      let value = this.find(defTime)
      // 一定要延时
      setTimeout(() => {
        this.value = value
      })
    },
    initYear (startYear, endYear) {
      let years = []
      for (let year = startYear; year <= endYear; year ++) {
        years.push(`${year}`)
      }
      return years
    },
    initMonth (current) {
      let months = []
      let startMonth
      let endMonth
      // picker改变时的渲染 
      // 1.当前所选时间的年份等于开始时间的年份 则取开始时间的月份
      // 2.当前所选时间的年份等于结束时间的年份 则却结束时间的月份
      startMonth = current.year === this.start.year ? Number(this.start.month) : 1
      endMonth = current.year === this.end.year ? Number(this.end.month) : 12
      for (let month = startMonth; month <= endMonth; month ++) {
        months.push(this.padZero(month))
      }
      return months
    },
    initDay (current, flag) {
      let days = []
      let startDay
      let endDay
      // 1. 当前所选时间的年份、月份与开始时间一致时 取开始时间的天
      // 2. 当前所选时间的年份、月份与结束时间一致时 取结束时间的天
      startDay = current.year === this.start.year 
        && current.month === this.start.month 
        ? Number(this.start.day)
        : 1
      endDay = current.year === this.end.year
        && current.month === this.end.month
        ? Number(this.end.day)
        : new Date(current.year, current.month, 0).getDate()
      
      for (let day = startDay; day <= endDay; day ++) {
        days.push(this.padZero(day))
      }
      return days
    },
    initTime () {
      return ['上午', '下午']
    },
    dealNowTime () {
      let defaultTime = this.defaultTime ? new Date(this.defaultTime) : this.now
      let year = `${defaultTime.getFullYear()}`
      let month = `${this.padZero(defaultTime.getMonth() + 1)}`
      let day = `${defaultTime.getDate()}`
      let time = defaultTime.getHours() >= 12 ? '下午' : '上午'
      return {
        year,
        month,
        day,
        time,
        date: `${year}-${month}-${day}:${time}`
      }
    },
    find (defTime) {
      let yearIndex = this.pickerData.years.findIndex(year => year === defTime.year)
      let monthIndex = this.pickerData.months.findIndex(month => month === defTime.month)
      let dayIndex = this.pickerData.days.findIndex(day => day === defTime.day)
      let timeIndex = this.pickerData.times.findIndex(time => time === defTime.time)
      return [yearIndex, monthIndex, dayIndex, timeIndex]
    },
    padZero (n) {
      return n >= 10 ? `${n}` : `0${n}` 
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
