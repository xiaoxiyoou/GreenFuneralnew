<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967" v-if="banner[0]">
      <div v-for="(image, index) in info.banner" :key="index">
        <van-swipe-item v-if="image">
          <img :src="image" />
        </van-swipe-item>
      </div>
    </van-swipe>
    <img class="banner" src="./../../assets/img/nopic.jpg" v-if="!banner[0]" />
    <div class="titleWrapper col">
      <div class="row j-b a-c" style="width:100%">
        <div>
          <div class="name">{{info.companyname}}</div>
          <div class="startWrapper row  a-c">
            <div class="tip">服务指数</div>
            <van-rate v-model="star" allow-half void-icon="star" void-color="#eee" :color=color size="15" readonly/>
            <div class="grade" :style="{'color':color}">{{star}}分</div>
          </div>
        </div>
        <img class="phone" style="width:30px;height:30px" src="../../assets/img/phone.png" alt="" @click.stop="callPhone" :style="{'background-color':color}">
      </div>
      <div class="btmWrapper row a-c j-b">
        <div class="address row a-c">
          <img src="../../assets/img/dingwei.png" alt="" :style="{'background-color':color}">
          <div class="des row j-c a-c" @click="address()">{{info.address}}</div>
        </div>
        <div class="distance">{{info.distance}}</div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="detail">
      <div class="item row">
        <div class="title">法人姓名</div>
        <div class="des">{{info.legalperson? info.legalperson:'暂无数据'}}</div>
      </div>
      <div class="item row">
        <div class="title">成立时间</div>
        <div class="des">{{info.establishdate? info.establishdate:'暂无数据'}}</div>
      </div>
      <div class="item row">
        <div class="title">职员人数</div>
        <div class="des">{{info.personnel? info.personnel:'暂无数据'}}</div>
      </div>
    </div>
    <div class="detail">
      <div class="item row">
        <div class="title">经营内容</div>
        <div class="des">{{info.intro? info.intro:'暂无数据'}}</div>
      </div>
    </div>
    <div class="btm row j-c a-c" @click="commentDetail">
      <img class="" src="../../assets/img/message.png" alt="" :style="{'background-color':color}">
      <div :style="{'color':color}">市民评价</div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { companyapiDetail } from 'api/index'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      star: 0.1,
      score: '',
      info: [],
      banner: [],
       color:localStorage.getItem("color") 




    }
  },
  mounted() {
    this._companyapiDetail()



  },
  methods: {
    // 地址
    address() {
      wx.openLocation({
        latitude:this.info.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: this.info.lon, // 经度，浮点数，范围为180 ~ -180。
        name: '机构位置', // 位置名
        address: this.info.address, // 地址详情说明
        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    // 详情
    _companyapiDetail() {
      companyapiDetail({
        id: this.$route.query.id
      }).then(res => {
        console.log('机构详情', res)
        this.info = res.data.info
        this.banner = this.info.banner
        this.score = this.info.score
        this.star = parseFloat(this.info.score)

      })
    },
    commentDetail() {
      this.$router.push({
        path: './commentDetail',
        query: {
          mid: this.$route.query.id,
          title: this.info.companyname,
          type: 1
        }
      })

    },
    callPhone() {
      window.location.href = 'tel:' + this.info.mobile
    }

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #f5f5f5
  .banner
    width 100%
    height 417px
    img
      width 100%
      height 417px
  .titleWrapper
    background-color #ffffff
    padding 16px 32px 0px
    .name
      color #111111
      font-size 31px
    .startWrapper
      margin 10px 0
      font-size 27px
      .tip
        color #919191
        margin-right 5px
      img
        width 29px
        height 27px
        margin-left 5px
      .grade
        color #1ead55
        margin-left 5px
    .btmWrapper
      height 72px
      border-top 1px solid #f5f5f5
      color #919191
      font-size 27px
      padding 20px 0
      height 100%
      .address
        color #919191
        img
          width 24px
          height 28px
        .des
          margin-left 15px
          margin-right 40px
      .phoneWrapper
        color #919191
        .phone
          width 40px
          height 40px
          margin-right 18px
      .distance
        white-space nowrap
  .bar
    width 100%
    height 11px
    background-color #f5f5f5
  .detail
    padding 25px
    background-color #ffffff
    margin-top 1px
    border-top 1px solid #f5f5f5
    .item
      font-size 30px
      margin-bottom 25px
      .title
        color #919191
        white-space nowrap
      .des
        color #252525
        margin-left 42px
  .btm
    color #5aa967
    font-size 31px
    height 99px
    background-color #ffffff
    margin 17px auto
    img
      width 31px
      margin-right 15px
      margin-top 5px
</style>