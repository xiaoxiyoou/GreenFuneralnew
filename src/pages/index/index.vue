<template>
  <div class="container col j-b" v-wechat-title="orginfo.orgname" :style="{'background-color':color}">
    <div class="bannerWrapper">
      <van-swipe class="banner" :autoplay="3000" indicator-color=color>
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

      <div class="item col j-c a-c " @click="person(index,item.link)" v-for="(item,index) in list" :key="index">
        <img :src="item.icon" alt="">
        <div>{{item.name}}</div>
      </div>

    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c" :style="{'background-color':orginfo.bgcolor}">
      <img :src="orginfo.logo" v-if="orginfo.logo" alt="">
      <img src="./btm.png" v-else alt="">
    </div>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" :columns-num="2" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>

  </div>
</template>
<script type="text/ecmascript-6">
import { indexInfo, selfDetail } from 'api/index'
import area from 'assets/js/area';
export default {
  data() {
    return {
      areaShow: false,
      areaList: area,
      position: sessionStorage.getItem('position') || '辽宁省 沈阳市',
      info: [],
      list: [],
      banner: [],
      routers: ['/info', '/person', '/mechan', '/comment'],
      userinfo: '',
      orginfo: '',
      color: localStorage.getItem("color")


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._indexInfo()
    this._selfDetail()


  },
  methods: {
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
      }).join(" ");
      this.position = result
      sessionStorage.setItem('position', this.position)
      this.areaShow = false
    },
    _indexInfo() {
      indexInfo().then(res => {
        console.log('功能', res)
        this.info = res.data.info
        this.list = res.data.list
        this.orginfo = res.data.orginfo
        this.banner = this.info.banner
        localStorage.setItem("color", this.orginfo.color || "#52aa5e")
        // localStorage.setItem("color", this.orginfo.color || "#0567a6")
      })
    },
    person(index, link) {
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

    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },
    // _getuserinfo() {
    //   getuserinfo().then(res => {
    //     console.log('用户信息', res)
    //     if (res.code == 0) {
    //       this.userinfo = res.data.userinfo
    //     } else {
    //       this.$router.push({
    //         path: '/login',
    //       })
    //     }
    //   })

    // },
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
    // mechan() {
    //   this.$router.push({ path: '/mechan' })
    // },
    // comment() {
    //   this.$router.push({ path: '/comment' })
    // },
    // infoDetail() {
    //   this.$router.push({ path: '/info' })
    // },


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
    .positon-wrapper
      position absolute
      z-index 2
      left 22px
      top 24px
      color #ffffff
      font-size 24px
      .positon-img
        width 25px
        height 30px
        margin-right 10px
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
    .item:nth-of-type(odd)
      border-right 2px solid rgba(255, 255, 255, 0.2)
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