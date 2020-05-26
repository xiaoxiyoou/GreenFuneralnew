<template>
  <div class="container col j-b">
    <div class="bannerWrapper">
      <img class="banner" src="./banner.png" alt="" />
      <div class="avertwraper row a-c " @click="personalCenter">
        <img :src="userinfo.headimgurl" alt="">
        <div>{{userinfo.nickname}}</div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="personalCenter">点击进入个人中心</div>
    </div>
    <div class="item-wrapper row f-w j-c a-c">
      <div class="item col j-c a-c border-right" @click="box()">
        <img src="./icon.png" alt="" />
        <div>知名品牌</div>
      </div>
      <div class="item col j-c a-c  " @click="funeral()">
        <img src="./person.png" alt="" />
        <div>殡仪用品</div>
      </div>
      <div class="item col j-c a-c border-right" @click="burial()">
        <img src="./shop.png" alt="" />
        <div>安葬用品</div>
      </div>
      <div class="item col j-c a-c " @click="piety()">
        <img src="./comment.png" alt="" />
        <div>孝道用品</div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c">
      <img src="./btm.png" alt="" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getuserinfo, selfDetail } from 'api/index'
export default {
  data() {
    return {
      userinfo: ''


    }
  },
  mounted() {
    this._selfDetail()

  },
  methods: {
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
    background-color #52aa5e
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
