<template>
  <div id="hello">
    <el-row :gutter="0" class="top-head">
      <el-col :span="18">
        <el-col :span="6">
          <div class="top-logo"><i></i></div>
        </el-col>
        <el-col :span="18">
          <div class="top-text">打开京东App,购物更轻松</div>
        </el-col>
      </el-col>
      <el-col :span="6">
        <div class="top-btn">立刻打开</div>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="head">
      <el-col :span="4">
        <i class="head-menu"></i>
      </el-col>
      <el-col :span="16">
        <div class="head-input">
          <el-input type="text" placeholder="蓝月亮洗手液"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <i class="head-info"></i>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <div class="block">
          <el-carousel height="250px" :autoplay="false">
            <el-carousel-item v-for="(item,index) in 4" :key="item">
              <div :class="{img0:index===0,img1:index===1,img2:index===2,img3:index===3}"
                   style="width:100%;height:100%;"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="4" :offset="2">
        <div>
          <div class="msite0 msite"></div>
          <p>京东超市</p>
        </div>
        <div>
          <div class="msite1 msite"></div>
          <p>拼购</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <div class="msite2 msite"></div>
          <p>充值</p>
        </div>
        <div>
          <div class="msite3 msite"></div>
          <p>京东到家</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <div class="msite4 msite"></div>
          <p>财富</p>
        </div>
        <div>
          <div class="msite5 msite"></div>
          <p>生鲜</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <div class="msite6 msite"></div>
          <p>唯品会</p>
        </div>
        <div>
          <div class="msite7 msite"></div>
          <p>京东物流</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div>
          <div class="msite8 msite"></div>
          <p>优惠券</p>
        </div>
        <div>
          <div class="msite9 msite"></div>
          <p>京东服饰</p>
        </div>
      </el-col>
    </el-row>
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
      },
      carouselStyle(index) {
        debugger
        return {
          backgroundImage: 'url(../assets/img/' + index + '.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      }
    }
  }
</script>
<style scoped>
  .img0 {
    background: url('../assets/img/0.jpg') center no-repeat;
    background-size: cover;
  }

  .img1 {
    background: url('../assets/img/1.jpg') center no-repeat;
    background-size: cover;
  }

  .img2 {
    background: url('../assets/img/2.jpg') center no-repeat;
    background-size: cover;
  }

  .img3 {
    background: url('../assets/img/3.jpg') center no-repeat;
    background-size: cover;
  }

  .msite {
    width: 50px;
    height: 50px;
    display: inline-block;
  }
  .msite + p {
    font-size: 12px;
  }

  .msite0 {
    background: url('../assets/img/chaoshi.png') center no-repeat;
    background-size: cover;
  }

  .msite1 {
    background: url('../assets/img/pingou.png') center no-repeat;
    background-size: cover;
  }

  .msite2 {
    background: url('../assets/img/chongzhi.png') center no-repeat;
    background-size: cover;
  }

  .msite3 {
    background: url('../assets/img/jingdongdaojia.png') center no-repeat;
    background-size: cover;
  }

  .msite4 {
    background: url('../assets/img/caifu.png') center no-repeat;
    background-size: cover;
  }

  .msite5 {
    background: url('../assets/img/shengxian.png') center no-repeat;
    background-size: cover;
  }

  .msite6 {
    background: url('../assets/img/weipinhui.png') center no-repeat;
    background-size: cover;
  }

  .msite7 {
    background: url('../assets/img/wuliu.png') center no-repeat;
    background-size: cover;
  }

  .msite8 {
    background: url('../assets/img/zhaiquan.png') center no-repeat;
    background-size: cover;
  }

  .msite9 {
    background: url('../assets/img/yiwu.png') center no-repeat;
    background-size: cover;
  }

  .top-head {
    height: 40px;
    line-height: 40px;
  }

  .top-logo {
    height: 40px;
    background: #000;
    position: relative;
  }

  .top-logo i {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../assets/img/top-jdlogo.png') no-repeat center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }

  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .top-text {
    background: #000;
    color: #fff;
  }

  .top-btn {
    background: red;
  }

  .head {
    background: red;
    height: 60px;
  }

  .head-menu {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 20px auto;
    background: url('../assets/img/head-menu.png') no-repeat center;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }

  .head-input {
    margin: 10px auto;
  }

  .head-input input {
    height: 40px;
    line-height: 40px;
  }

  .head-info {
    display: inline-block;
    width: 25px;
    height: 40px;
    margin: 10px auto;
    background: url('../assets/img/下载.png') no-repeat center;
    background-size: 100%;
    -webkit-background-size: 100%;
    -moz-background-size: 100%;
    -o-background-size: 100%;
  }
</style>
