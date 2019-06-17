<template>
  <wz-popup :visible="visible" @hide-popup="hide" :bottom="true">
    <view class="wz-picker">
      <view class="wz-picker__btns">
        <view class="wz-picker__btns--cancel" @click="cancel">{{ cancelText }}</view>
        <view class="wz-picker__btns--confirm" @click="confirm">{{ confirmText }}</view>
      </view>
      <view class="wz-picker__view">
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
      </view>
    </view>
  </wz-popup>
</template>

<script>
import WzPopup from 'components/popup/popup'

const NOW_DATE = new Date()
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
    mode: {
      type: String,
      default: 'dat'
    },
    startTime: {
      type: String,
      default: '2018-06-10'
    },
    endTime: {
      type: String,
      default: '2022-09-24'
    }
  },
  computed: {
    start () {
      let [year, month, day] = this.startTime.split('-')
      return {
        year,
        month,
        day
      }
    },
    end () {
      let [year, month, day] = this.endTime.split('-')
      return {
        year,
        month,
        day
      }
    }
  },
  data () {
    return {
      pickerData: {},
      current: {},
      value: [0, 0, 0, 0]
    }
  },
  methods: {
    bindChange (e) {
      let value = e.detail.value
      let current = this.format(value)

      this.pickerData.months = this.initMonth(current, true)
      this.pickerData.days = this.initDay(current, true)
      this.$nextTick(() => {
        this.value = value
        this.current = current
      })
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
      this.$emit('hide-popup')
    },
    cancel () {
      this.$emit('cancel', this.current)
    },
    confirm () {
      this.$emit('confirm', this.current)
    },
    initPicker () {
     
      let years = this.initYear(this.start.year, this.end.year)
      let months = this.initMonth(this.start)
      let days = this.initDay(this.start)
      let times = this.initTime()

      
      this.pickerData = {
        years,
        months,
        days,
        times
      }

      // 默认值设置，目前有问题
      // let defTime = this.dealNowTime()
      // console.log(defTime)
      // let value = this.find(defTime)
      // this.$nextTick(() => {
      //   this.value = value
      //   this.current = defTime
      // })
    },
    initYear (startYear, endYear) {
      let years = []
      for (let year = startYear; year <= endYear; year ++) {
        years.push(`${year}`)
      }
      return years
    },
    initMonth (current, flag) {
      let months = []
      let startMonth
      let endMonth
      if (flag) {
        // picker改变时的渲染 
        // 1.当前所选时间的年份等于开始时间的年份 则取开始时间的月份
        // 2.当前所选时间的年份等于结束时间的年份 则却结束时间的月份
        startMonth = current.year === this.start.year ? Number(this.start.month) : 1
        endMonth = current.year === this.end.year ? Number(this.end.month) : 12
      } else {
        // 初始渲染
        startMonth = Number(current.month)
        endMonth = 12
      }
      for (let month = startMonth; month <= endMonth; month ++) {
        months.push(this.padZero(month))
      }
      return months
    },
    initDay (current, flag) {
      let days = []
      let startDay
      let endDay
      if (flag) {
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
      } else {
        startDay = current.day
        endDay = new Date(current.year, current.month, 0).getDate()
      }
      
      for (let day = startDay; day <= endDay; day ++) {
        days.push(this.padZero(day))
      }
      return days
    },
    initTime () {
      return ['上午', '下午']
    },
    dealNowTime () {
      let year = `${NOW_DATE.getFullYear()}`
      let month = `${this.padZero(NOW_DATE.getMonth() + 1)}`
      let day = `${NOW_DATE.getDate()}`
      return {
        year,
        month,
        day,
        time: '上午',
        date: `${year}-${month}-${day}:上午`
      }
    },
    find (defTime) {
      let yearIndex = this.pickerData.years.findIndex((year => year === defTime.year))
      let monthIndex = this.pickerData.months.findIndex((month => month === defTime.month))
      let dayIndex = this.pickerData.days.findIndex((day => day === defTime.day))
      let timeIndex = 0
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
    WzPopup
  }
}
</script>

<style lang="scss">
  @import 'common/styles/mixin.scss';
  @import 'common/styles/variable.scss';
  .wz-picker {

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
			height: 320upx;
			padding-bottom: 80upx;
			color: #000;
			picker-view {
				height: 100%;
				font-size: 36upx;
			}
			picker-view-column {
				text-align: center;
				view {
					height: 68upx;
					line-height: 68upx;
				}
			}
		}
</style>
