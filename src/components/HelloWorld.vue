<template>
  <div class="hello" id="hello">
    <h1>{{ msg }}</h1>
    <!--<count-down :endTime="endTime" :callback="callback" endText="已经结束了"></count-down>-->
    <!--<div>-->
      <!--<div class="time-clock">-->
        <!--<span class="num" :style="note"></span>-->
        <!--<span class="num" :style="note"></span>-->
        <!--<span>:</span>-->
        <!--<span class="num" :style="note"></span>-->
        <!--<span class="num" :style="note"></span>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import img from '../assets/nums.png'
  import CountDown from '../components/common/count-down.vue'
  import {dateUtil} from '../util/dateUtil'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '你好,陈思,很高兴认识你',
        note: {
          backgroundImage: "url(" + img + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0px 0px",
        },
        callback: {},
        endTime: ''
      }
    },
    components: {
      'count-down': CountDown
    },
    mounted() {
      this.renderData()
    },
    methods: {
      renderData() {
        let self = this
        self.endTime = dateUtil.addDate(new Date(), 'd', 1).getTime()
        setInterval(() => {
          console.log(new Date().getHours())
        }, 1000)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time-clock {
    display: inline-block;
    margin: 0 auto;
  }

  .time-clock span {
    display: inline-block;
    border: 1px solid #ccc;
    width: 21px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    float: left;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    -moz-transition: all 0.5s;
  }
</style>
