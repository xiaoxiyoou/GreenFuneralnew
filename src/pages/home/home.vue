<template>
  <div class="container" v-wechat-title="orginfo.orgname">
    <img class="banner" src="./banner.png" alt="">
    <div class="info-wrap row a-c j-b">
      <div class="info-cont row a-c ">
        <img :src="userinfo.headimgurl" alt="">
        <div>{{userinfo.nickname}}</div>
      </div>
      <div class="center  row a-c j-c" @click="personalCenter">个人中心</div>
    </div>
    <div class="nav-wrap row j-b">
      <div class="nav" :class="{'textHover':isActive == index}" v-for="(item,index) in navlist" :key="index" @click="activeNav(index)">{{item.name}}</div>
    </div>
    <img v-if="part1" class="banner1" src="./banner1.png" alt="">
    <img v-if="part2" class="banner1" src="./banner2.png" alt="">
    <img v-if="part3" class="banner1" src="./banner3.png" alt="">
    <div class="item-con" v-if="part1">
      <div class="item-title">公示</div>
      <div class="item-wrap row f-w j-b">
        <div class="item-cont" @click="infoDetail()">
          <div class="item-list row a-c">
            <div class="item-name">政策公示</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_1.png">
        </div>
        <div class="item-cont" @click="person()">
          <div class="item-list row a-c ">
            <div class="item-name">人员公示</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_2.png">
        </div>
        <div class="item-cont" @click="mechan()">
          <div class="item-list row a-c ">
            <div class="item-name">机构公示</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_3.png">
        </div>
        <div class="item-cont" @click="comment()">
          <div class="item-list row a-c ">
            <div class="item-name">评价公示</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_4.png">
        </div>
      </div>
    </div>
    <div class="item-con" v-if="part2">
      <div class="item-title">服务</div>
      <div class="item-wrap row f-w j-b">
        <div class="item-cont" @click="burialPlanning()">
          <div class="item-list row a-c">
            <div class="item-name">安葬策划</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_5.png">
        </div>
        <div class="item-cont" @click="funeralPlanning()">
          <div class="item-list row a-c ">
            <div class="item-name">殡仪策划</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_6.png">
        </div>
        <div class="item-cont" @click="deathbed()">
          <div class="item-list row a-c ">
            <div class="item-name">临终关怀</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_7.png">
        </div>
        <div class="item-cont" @click="recall()">
          <div class="item-list row a-c ">
            <div class="item-name">线上追思</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_8.png">
        </div>
      </div>
    </div>
    <div class="item-con" v-if="part3">
      <div class="item-title">用品</div>
      <div class="item-wrap row f-w j-b">
        <!-- <div class="item-cont" @click="box()">
          <div class="item-list row a-c">
            <div class="item-name">知名品牌</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_9.png">
        </div> -->
        <div class="item-cont" @click="funeral()">
          <div class="item-list row a-c ">
            <div class="item-name">殡仪用品</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_10.png">
        </div>
        <div class="item-cont" @click="burial()">
          <div class="item-list row a-c ">
            <div class="item-name">安葬用品</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_11.png">
        </div>
        <div class="item-cont" @click="piety()">
          <div class="item-list row a-c ">
            <div class="item-name">孝道用品</div>
            <van-icon name="arrow" />
          </div>
          <img class="item-icon" src="./icon_12.png">
        </div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { selfDetail, serviceInfo } from 'api/index'
export default {
  data() {
    return {
      userinfo: '',
      navlist: [{ name: "公示" }, { name: "服务" }, { name: "用品" },],
      isActive: sessionStorage.getItem("homeHover") || 0,
      part1: true,
      part2: false,
      part3: false,
      orginfo: ''

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._selfDetail()
     this._serviceInfo()
    if (sessionStorage.getItem("homeHover")) {
      this.activeNav(sessionStorage.getItem("homeHover"))
    }

  },
  methods: {
    infoDetail() {
      this.$router.push({ path: '/info' })
    },
    person() {
      this.$router.push({ path: '/person' })
    },
    mechan() {
      this.$router.push({ path: '/mechan' })
    },
    comment() {
      this.$router.push({ path: '/comment' })
    },
    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },
    burialPlanning() {
      this.$router.push({ path: '/burialPlanning' })
    },
    funeralPlanning() {
      this.$router.push({ path: '/funeralPlanning' })
    },
    deathbed() {
      this.$router.push({ path: '/deathbed' })
    },
    box() {
      this.$router.push({ path: '/box' })
    },
    recall() {
      this.$router.push({ path: '/recall' })
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
    _serviceInfo() {
      serviceInfo().then(res => {
        console.log('功能', res)
 
        this.orginfo = res.data.orginfo
        localStorage.setItem("color", this.orginfo.color)
      

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
    activeNav(flag) {
      this.isActive = flag
      sessionStorage.setItem("homeHover", flag)
      if (flag == 0) {
        this.part1 = true
        this.part2 = false
        this.part3 = false
      } else if (flag == 1) {
        this.part1 = false
        this.part2 = true
        this.part3 = false
      } else {
        this.part1 = false
        this.part2 = false
        this.part3 = true
      }
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
  bottom 0
  color #ffffff
  background #f5f5f5
  z-index -2
  .banner
    position absolute
    top 0
    width 100%
    z-index -1
  .info-wrap
    padding 0 29px
    margin-top 15px
    .info-cont
      img
        width 82px
        height 82px
        border-radius 50%
        margin-right 20px
    .center
      width 136px
      height 44px
      border-radius 22px
      color #52aa5e
      background #ffffff
      font-size 24px
  .nav-wrap
    padding 0 82px
    font-size 28px
    margin-top 37px
  .textHover
    font-size 32px
    font-weight 700
    border-bottom 2px solid #ffffff
  .nav
    padding 0 4px 6px
  .banner1
    width 696px
    margin 30px auto
    display block
    border-radius 10px
  .item-con
    margin 0 auto
    width 696px
    background-color #ffffff
    border-radius 10px
    padding 23px
    .item-title
      color #696969
      font-size 28px
      margin-bottom 19px
    .item-wrap
      .item-cont
        background #52aa5e
        width 318px
        height 149px
        border-radius 5px
        position relative
        margin-bottom 26px
        font-size 30px
        .item-list
          height 149px
          margin-left 35px
        .item-icon
          width 127px
          height 121px
          position absolute
          right 0
          bottom 5px
</style>