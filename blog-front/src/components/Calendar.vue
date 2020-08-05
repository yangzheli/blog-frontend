<template>
  <div class="calendar-container">
    <div class="calendar">
      <div class="title">
        <div class="arrow" @click="changeMonth('pre')"> <</div>
        <div class="year_month">{{year}}年{{month}}月</div>
        <div class="arrow" @click="changeMonth('next')"> ></div>
      </div>
      <ul class="week">
        <li v-for="(val,index) in week" :key="index">{{val}}</li>
      </ul>
      <ul class="date">
        <li v-for="pre in preDay" :key="pre" style="color: #999999">{{getLastMonthSize()-preDay+pre}}</li>
        <li v-bind:class="{'sign_success':judge(count)}" v-for="count in total_days" :key="preDay+count">
          <!--@click="sign()">-->
          {{count}}
        </li>
        <li v-for="next in nextDay" :key="preDay+total_days+next" style="color: #999999">{{next}}</li>
      </ul>
    </div>
    <div class="event">
      <div class="remark_title">
        <div class="time">{{year}}/{{month}}/{{day}}</div>
        <div class="sign"><img src="@/assets/sign.png" @click="sign()"></div>
        <div class="add"><img src="@/assets/add.png" @click="dialogVisible=true"></div>
        <Dialog v-bind:dialogVisible.sync=dialogVisible title="添加日程"></Dialog>
      </div>
      <div class="remark">备注</div>
    </div>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog.vue'

  export default {
    name: "Record",
    components: {
      Dialog
    },
    data() {
      return {
        year: 0,
        month: 0,
        day: 0,
        preDay: 0,
        nextDay: 0,
        week: ['日', '一', '二', '三', '四', '五', '六'],
        monthSize: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        total_days: 0, //某月的总天数
        sign_information: [],//记录所有的签到信息
        // index: -1,
        msg: [],//记录所有的备注信息
        dialogVisible: false,
      }
    },
    created() {
      this.init();
      this.getLastMonthSize();
      this.getNextMonthSize();
    },
    watch: {
      year(newVal, oldVal) {
        this.getLastMonthSize();
        this.getNextMonthSize();
      },
      month(newVal, oldVal) {
        this.getLastMonthSize();
        this.getNextMonthSize();
      }
    },
    methods: {
      init(data) {
        //获取当前时间
        let date;
        if (data !== undefined && date !== null) {
          date = data;
        } else {
          date = new Date();
        }
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        //判断该年是否是闰年
        if (this.year % 4 === 0 && this.year % 100 !== 0) {
          this.monthSize[1] = 29;
        }
        this.total_days = this.monthSize[this.month - 1];
        //初始化时为当天设置不同的样式
        // this.index = this.day;
      },
      //切换月份
      changeMonth(p) {
        if (p === 'pre') {
          this.init(new Date(this.year, this.month - 2));
        } else {
          this.init(new Date(this.year, this.month));
        }
      },
      //获取上个月天数
      getLastMonthSize() {
        //本月第一天是星期几
        const first_day = new Date(this.year, this.month - 1, 1).getDay();  //注意new Date()的参数
        //显示在一号前的上月天数
        this.preDay = (first_day === 7) ? 0 : first_day;
        return this.month === 1 ? 31 : this.monthSize[this.month - 2];
      },
      //获取下个月天数
      getNextMonthSize() {
        //本月最后一天是星期几
        const last_day = new Date(this.year, this.month - 1, this.total_days).getDay();
        this.nextDay = (last_day === 7) ? 6 : 6 - last_day;
        return this.month === 12 ? 31 : this.monthSize[this.month];
      },
      //签到
      sign() {
        const cur = this.year + '/' + this.month + '/' + this.day;
        this.sign_information[cur] = true;
        this.$message({
          text: '签到成功',
          type: 'success',
        });
      },
      //判断某天是否签到
      judge(index) {
        const cur = this.year + '/' + this.month + '/' + index;
        return this.sign_information[cur] === true;
      },
      //添加备注
      remark(index) {
        //将当前日期改为鼠标选定的日期
        this.day = count;
      },
      //
      // closeDialog(val) {
      //   this.dialogVisible = val;
      // }
    }
  }
</script>

<style scoped>
  .calendar-container {
    float: left;
    width: 25%;
    height: 700px;
    border: 1px solid #c8c8c8;
    border-radius: 5px;
  }

  .title {
    font-size: 20px;
    letter-spacing: 3px;
    display: flex;
    justify-content: space-between;
    /*background-color: #ed8079;*/
    background-color: rgba(0, 159, 232, 0.6);
    color: #ffffff;
  }

  .arrow {
    padding: 20px;
    cursor: pointer;
  }

  .year_month {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .week {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
  }

  .week li {
    display: inline-block;
    text-align: center;
  }

  .date {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .date li {
    display: inline-block;
    width: 14.2%;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    cursor: pointer;
  }

  .active {
    background-color: #FFE69F;
  }

  .sign_success {
    background: url(../assets/image/icon-sign-success.png) no-repeat 50% 35%;
    background-size: 35px;
  }

  .remark_title {
    height: 50px;
    display: flex;
  }

  .time {
    width: 110px;
    font-size: 20px;
    letter-spacing: 2px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .sign img {
    width: 30px;
    margin: 7px 0 0 150px;
    cursor: pointer;
  }

  .add img {
    width: 30px;
    margin: 7px 0 0 20px;
    cursor: pointer;
  }

  .remark {
    float: left;
    text-align: left;
    padding-left: 15px;
  }

</style>
