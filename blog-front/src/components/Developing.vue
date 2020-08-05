<template>
  <div>
    <div class="slider-footer">
      <div class="region_and_temperature">
        <div class="location" @click="refresh_city()"></div>
        <div class="content">{{locationCity}}&nbsp;{{temperature}}℃</div>
      </div>
      <div class="date">{{date.split(' ')[0]}}</div>
      <div class="date">{{date.split(' ')[1]}}</div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date.js'
  import {map} from '@/utils/map.js'

  export default {
    name: "Developing",
    data() {
      return {
        timer: '',
        locationCity: '武汉',
        temperature: '0',
        weather_type: '', //天气类型
        date: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
      }
    },
    methods: {
      //刷新当前城市
      refresh_city() {
        map().then(BMap => {
          const geolocation = new BMap.Geolocation();
          var that = this;
          geolocation.getCurrentPosition(function getinfo(position) {
            let city = position.address.city;             //获取城市信息
            let province = position.address.province;    //获取省份信息
            that.locationCity = city
          }, function (e) {
            that.locationCity = "定位失败"
          }, {provider: 'baidu'});
        })
      },
      //刷新当前温度和天气
      refresh_temperature() {
        //this对象会发生改变，使用that指向原来的对象
        var that = this;
        this.$axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.locationCity).then(function (response) {
          that.temperature = response.data.data.wendu;
          that.weather_type = response.data.data.forecast[0].type;
        }).catch(function (error) {
        })
      }
    },
    created() {
      this.refresh_city();
      this.refresh_temperature();
    },
    mounted() {
      //使用定时器每秒更新当前时间
      this.timer = setInterval(() => {
        this.date = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      }, 1000)
    },
    beforeDestroy() {
      //清除定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  }
</script>

<style scoped>

  .region_and_temperature {
    width: 160px;
    height: 50px;
    margin: 0 auto;
  }

  .location {
    width: 25px;
    height: 25px;
    float: left;
    margin: 10px 5px 5px 5px;
    background: url("../assets/image/icon-location.png");
    background-size: 25px;
    cursor: pointer;
  }

  .location:hover {
  }

  .content {
    float: left;
    margin: 7px 0 0 5px;
    font-size: 20px;
    letter-spacing: 1px;
    cursor: pointer;
  }

  .date {
    height: 50px;
    font-size: 20px;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
