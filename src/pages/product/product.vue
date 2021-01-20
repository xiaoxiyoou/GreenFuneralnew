<template>
  <div class="container col j-b" v-wechat-title="orginfo.orgname" :style="{'background-color':color}">
    <div class="bannerWrapper">
      <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img :src="image" v-if="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="avertwraper row a-c " @click="personalCenter">
        <img :src="userinfo.headimgurl" alt="">
        <div>{{userinfo.nickname}}</div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="personalCenter" :style="{'background-color':color}">点击进入个人中心</div>
    </div>
    <div class="item-wrapper row f-w j-c a-c">
      <div class="item col j-c a-c " @click="menu(index,item.link)" v-for="(item,index) in list" :key="index">
        <img :src="item.icon" alt="">
        <div>{{item.name}}</div>
      </div>

    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c" :style="{'background-color':orginfo.bgcolor}">
      <img :src="orginfo.logo" v-if="orginfo.logo" alt="">
      <img src="./btm.png" v-else alt="">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getuserinfo, selfDetail, productInfo } from 'api/index'
export default {
  data() {
    return {
      userinfo: '',
      banner: '',
      list: [],
      orginfo: '',
      color: localStorage.getItem("color")

    }
  },
  mounted() {
    this._selfDetail()
    this._productInfo()

  },
  methods: {
    menu(index, link) {
      console.log(link)
      let linkRouter = this.getCaption(link)
      this.$router.push({ path: linkRouter })

    },
    // 获取字符串#后面的值
    getCaption(obj) {
      var index = obj.lastIndexOf("#");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    },
    _productInfo() {
      productInfo().then(res => {
        console.log('功能', res)
        this.info = res.data.info
        this.list = res.data.list
        this.banner = this.info.banner
        this.orginfo = res.data.orginfo
         localStorage.setItem("color", this.orginfo.color||"#52aa5e" )

      })
    },
    _selfDetail() {
      selfDetail().then(res => {
        console.log('信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
        } else {
          this.$router.push({
            path: '/login',
          })
        }

      })

    },
    _getuserinfo() {
      getuserinfo().then(res => {
        console.log('用户信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.userinfo
        } else {
          this.$router.push({
            path: '/login',
          })
        }
      })

    },
    funeral() {
      this.$router.push({ path: '/funeral' })
    },
    burial() {
      this.$router.push({ path: '/burial' })
    },
    piety() {
      this.$router.push({ path: '/piety' })
    },
    box() {
      this.$router.push({ path: '/box' })
    },
    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },

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
  background-color #52aa5e
  .bannerWrapper
    position relative
    .banner
      width 100%
      height 590px
      vertical-align bottom
      img
        width 100%
        height 590px
    .avertwraper
      position absolute
      color #ffffff
      bottom 40px
      left 43px
      z-index 1
      font-size 35px
      img
        border-radius 50%
        width 139px
        height 139px
        border 1px solid #ffffff
        margin-right 16px
    .shadow
      position absolute
      height 141px
      background rgba(0, 0, 0, 0.5)
      bottom 0
      width 100%
    .center
      position absolute
      width 270px
      height 50px
      background-color #5aa967
      border-radius 25px
      right 13px
      bottom 25px
      color #ffffff
      font-size 30px
  .item-wrapper
    color #ffffff
    font-size 30px
    height 500px
    .border-right
      border-right 2px solid rgba(255, 255, 255, 0.2)
    .border-bottom
      border-bottom 2px solid rgba(255, 255, 255, 0.2)
    .item
      width 48%
      height 100px
      img
        width 53px
        margin-bottom 15px
  .bar
    width 100%
    height 96px
  .btm
    background-color #329440
    position fixed
    bottom 0
    width 100%
    height 96px
    img
      width 200px
</style>
