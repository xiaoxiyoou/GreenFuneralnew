<template>
  <div class="container">
    <News :visitCon="visitCon" />
    <img class="bg" src="./bgTwo.png">
    <div class="top col a-c j-a">
      <img class="banner" src="./banner.png">
      <div class="num-wrapper row j-c">
        <div class="num col a-c j-c" v-for="(item,index) in total" :key="index">{{item}}</div>
      </div>
      <img class="play jump_pig_r" @click="videoPlay" src="./../../assets/img/play.png">
      <div class="text" @click="videoPlay">查看策划案详情</div>
    </div>
    <div class="content col a-c" ref="pronbit">
      <img class="title" src="./../../assets/img/free.png">
      <div class="item col a-c">
        <input class="name com" placeholder="请输入您的姓名" v-model="name" type="text">
        <input class="tel com" placeholder="请输入手机号码" type="number" v-model="mobile">
        <input class="address com" placeholder="请选择您所在的城市" v-model="address" @click="areaShowList" readonly="readonly">
        <div class="receive row a-c">
          <img class="" src="./../../assets/img/noselect.png" v-if="select" @click="selectShow(false)">
          <img class="" src="./../../assets/img/select1.png" v-if="!select" @click="selectShow(true)">
          <div class="text" v-if="select">我已阅读并接受《服务须知》《隐私政策》</div>
          <div class="text textHover" v-if="!select">我已阅读并接受《服务须知》《隐私政策》</div>
        </div>
        <div class="tip">为了您的权益，您的隐私将被严格保密。</div>
        <div class="textbtn row j-c a-c" @click="_serviceapi">立即申请</div>
      </div>
      <img class="process" src="./../../assets/img/process.png">
      <img class="pic" src="./pic1.png" alt="">
      <img class="pic" src="./pic2.png" alt="">
      <img class="pic" src="./pic3.png" alt="">
      <div class="servicetotalCon a-c" style="position:relative">
        <img class="pic" src="./pic41.png">
        <div class="servicetotal" style="">累计服务 <span class="num">{{servicetotal}}</span>位家属</div>
      </div>
      <div class="bar"></div>
    </div>
    <div class="btmFix row a-c j-c" v-if="showBtn">
    </div>
    <div class="btn row j-c a-c" @click="scrollIntoView" v-if="showBtn">立即申请</div>
    <!-- 视频 -->
    <video class="video" ref="video" controls src="http://edu.fg1413.com/webvideo/jzbsh.mp4" v-show="video"></video>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { serviceapi, serviceGetapply } from 'api/index'
import area from 'assets/js/area';
import { Toast } from 'vant'
import News from 'components/News/News'
export default {
  data() {
    return {
      servicetotal: "",
      total: "",
      visitCon: [

      ],
      areaShow: false,
      name: '',
      select: true,
      video: false,
      mobile: '',
      areaList: area,
      address: '',
      // 防止被弹起
      showBtn: true,
      clientHeight: document.documentElement.clientHeight,

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._serviceGetapply()
    // 防止被弹起
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }
  },
  methods: {
    _serviceGetapply() {
      serviceGetapply({
        type: 1
      }).then(res => {
        console.log('申请', res)
        this.visitCon = res.data.list
        this.servicetotal = res.data.servicetotal
        this.total = res.data.total.toString()

      })
    },

    areaShowList() {
      this.areaShow = true
    },
    adcancel() {
      this.areaShow = false
    },
    // 地址选择
    adConfirm(value) {
      console.log(value)
      let result = value.map(function (item) {
        return item.name;
      }).join("");
      this.address = result
      this.areaShow = false
    },
    _serviceapi() {
      if (this.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.mobile == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.mobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.address == '') {
        Toast('请选择您所在的城市')
        return false
      } else if (this.select) {
        Toast('请先阅读并接受《服务须知》《隐私政策》')
        return false
      } else {
        serviceapi({
          title: '殡仪策划',
          type: 1,
          name: this.name,
          mobile: this.mobile,
          address: this.address
        }).then(res => {
          console.log('申请', res)
          if (res.code == 0) {
            Toast('申请成功！')
            this._serviceGetapply()
          } else {
            Toast('申请失败，请重试！')
          }

        })
      }

    },
    scrollIntoView() {
      this.$refs.pronbit.scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block: "start"  // 上边框与视窗顶部平齐。默认值
      });

    },
    selectShow(flag) {
      this.select = flag
    },
    personList() {
      this.$router.push({
        path: './personList'
      })

    },
    callPhone() {
      window.location.href = 'tel:18302468380'
    },
    videoPlay() {
      this.$refs.video.play()

    }

  },
  components: {
    News

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
  background-color #52aa5e
  .bg
    position absolute
    width 100%
    height auto
  .top
    position relative
    z-index 10
    left 50%
    transform translateX(-50%)
    color #ffffff
    font-size 38px
    height 805px
    .banner
      width 600px
      height auto
      vertical-align bottom
    .play
      width 107px
      height 107px
.num-wrapper
  position absolute
  top 490px
  width 538px
  .num
    width 50px
    height 100px
    font-family swige
    background url('./numBg.png')
    background-position center center
    background-size contain
    background-repeat no-repeat
    font-size 58px
    color #ffffff
    padding-top 5px
    margin 0 5px
.servicetotalCon
  background-color #52aa5e
  .servicetotal
    position absolute
    z-index 10
    bottom 322px
    text-align center
    width 100%
    color #ffffff
    font-size 30px
    .num
      font-size 70px
      font-family swige
.content
  background-color #52aa5e
  .title
    width 535px
    margin 40px auto
  .item
    background-color #ffffff
    width 681px
    padding-bottom 20px
    .com
      width 592px
      height 78px
      border-radius 39px
      border 2px solid #52aa5e
      margin-top 40px
      padding-left 20px
      font-size 30px
    .receive
      color #e0e0e0
      margin-top 28px
      img
        width 30px
        height 30px
        margin-right 10px
      .text
        font-size 25px
      .textHover
        color #52aa5e
    .tip
      font-size 25px
      color #52aa5e
      margin-bottom 30px
      margin-top 30px
    .textbtn
      width 600px
      height 91px
      border-radius 10px
      background-color #52aa5e
      color #ffffff
      font-size 36px
  .process
    width 679px
    margin 40px auto
  .personWraper
    padding 0 32px 100px
    width 100%
    background-color #52aa5e
    .item
      width 336px
      position relative
      height 100%
      box-shadow 0px 0px 10px rgba(0, 0, 0, 0.28)
      border-radius 10px
      margin-top 22px
      overflow hidden
      .phone
        position absolute
        width 50px
        height 50px
        z-index 100
        right 11px
        top 9px
      .personImg
        width 100%
        height 331px
      .name
        color #111111
        font-size 31px
        margin-top 14px
      .des
        color #919191
        font-size 27px
        border 1px solid #919191
        border-radius 16px
        width 197px
        height 35px
        margin-top 8px
        white-space nowrap
      .startWrapper
        margin-top 10px
        margin-bottom 20px
        img
          width 29px
          height 27px
          margin-left 5px
        .grade
          color #1ead55
          font-size 27px
          margin-left 2px
  .pic
    width 100%
    height auto
.video
  width 100%
.btmFix
  position fixed
  bottom 0
  width 100%
  background-color #1ead54
  opacity 0.6
  height 136px
.btn
  position fixed
  bottom 18px
  width 600px
  height 91px
  border-radius 10px
  background-color #ffffff
  color #52aa5e
  font-size 36px
  font-weight 700
  left 50%
  transform translateX(-50%)
.bar
  height 200px
  background-color #e6e6e6
</style>