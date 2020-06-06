<template>
  <div class="container">
    <!-- <img class="title" src="./../../assets/img/title.png" alt=""> -->
    <div class="swiperWrapper col a-c">
      <van-swipe :autoplay="3000" indicator-color="#b93662">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="navbar row j-a">
      <div class="item col a-c j-c" @click="box()">
        <img class="" src="./../../assets/img/box.png" alt="">
        <div class="text">知名品牌</div>
      </div>
      <div class="item col a-c j-c" @click="funeral()">
        <img class="" src="./../../assets/img/articles.png" alt="">
        <div class="text">殡仪用品</div>
      </div>
      <div class="item col a-c j-c" @click="burial()">
        <img class="" src="./../../assets/img/candle.png" alt="">
        <div class="text">安葬用品</div>
      </div>
      <div class="item col a-c j-c" @click="piety()">
        <img class="" src="./../../assets/img/heart.png" alt="">
        <div class="text">孝道用品</div>
      </div>
    </div>
    <img class="introTitle" src="./title.png" alt="">
    <div class="proWrapper row f-w j-b">
      <div class="item" v-for="(item,index) in newList" :key="index" @click="Detail(item.id,item.cat_id)">
        <img class="proImg" v-if="item.imgurl" :src="item.imgurl" alt="">
        <img class="proImg" v-else src="./../../assets/img/noMsg.png" alt="">
        <div class="title">{{item.title}}</div>
        <div class="des" v-if="item.describe">{{item.describe}}</div>
        <div class="des" v-else>{{item.title}}</div>
        <div class="value"><span class="price">￥</span>{{item.price}}</div>
      </div>
    </div>
    <img class="introTitle" src="./title2.png" alt="" style="margin-top:0" v-if="newList2.length">
    <div class="proWrapper row f-w j-b">
      <div class="item" v-for="(item,index) in newList2" :key="index" @click="Detail(item.id,item.cat_id)">
        <img class="proImg" v-if="item.imgurl" :src="item.imgurl" alt="">
        <img class="proImg" v-else src="./../../assets/img/noMsg.png" alt="">
        <div class="title">{{item.title}}</div>
        <div class="des" v-if="item.describe">{{item.describe}}</div>
        <div class="des" v-else>{{item.title}}</div>
        <div class="value"><span class="price">￥</span>{{item.price}}</div>
      </div>
    </div>
    <img class="introTitle" src="./title3.png" alt="" style="margin-top:0" v-if="newList3.length">
    <div class="proWrapper row f-w j-b">
      <div class="item" v-for="(item,index) in newList3" :key="index" @click="Detail(item.id,item.cat_id)">
        <img class="proImg" v-if="item.imgurl" :src="item.imgurl" alt="">
        <img class="proImg" v-else src="./../../assets/img/noMsg.png" alt="">
        <div class="title">{{item.title}}</div>
        <div class="des" v-if="item.describe">{{item.describe}}</div>
        <div class="des" v-else>{{item.title}}</div>
        <div class="value"><span class="price">￥</span>{{item.price}}</div>
      </div>
    </div>
    <div class="bar"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { goodsList } from 'api/index'
export default {
  data() {
    return {
      images: [
        require('./../../assets/img/indexBanner.png'),
        require('./../../assets/img/banner1.png'),
        require('./../../assets/img/banner2.png')
      ],
      newList: [

      ],
      newList2: [],
      newList3: [],



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._goodsList(1, 100, 1)
    this._goodsList2(1, 100, 7)
    this._goodsList3(1, 100, 8)

  },
  methods: {
    _goodsList(page, size, catid) {
      goodsList({
        page: page,
        size: size,
        catid: catid,
      }).then(res => {
        console.log('分类产品列表', res)
        this.newList = res.data.list
        if (this.newList.length == 0) {
          this.noInfo = true
        } else {
          this.noInfo = false
        }

      })
    },
    _goodsList2(page, size, catid) {
      goodsList({
        page: page,
        size: size,
        catid: catid,
      }).then(res => {
        console.log('分类产品列表', res)
        this.newList2 = res.data.list


      })
    },
    _goodsList3(page, size, catid) {
      goodsList({
        page: page,
        size: size,
        catid: catid,
      }).then(res => {
        console.log('分类产品列表', res)
        this.newList3 = res.data.list


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
    // detail() {
    //   this.$router.push({
    //     path: './detail',
    //   })
    // },
    Detail(id, catId) {
      this.$router.push({
        path: './detail',
        query: { id: id }
      })
      localStorage.setItem("catId", catId)
    },


  },
  components: {

  }
}
</script>
<style scoped>
</style>
<style scoped lang="stylus">
>>> html
  background-color #ffffff !important
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #ffffff
  bottom 0
  .title
    width 100%
    height auto
  .swiperWrapper
    width 100%
    // height 162px
    .van-swipe
      width 100%
      margin-bottom 10px
    .van-swipe-item
      img
        width 100%
        height 162px
  .navbar
    font-size 23px
    color #b8275d
    background-color #ffffff
    box-shadow 0px 0px 15px rgba(0, 0, 0, 0.2)
    border-radius 20px
    width 707px
    height 181px
    position relative
    top -5%
    left 50%
    transform translateX(-50%)
    .item
      img
        width 64px
        height 64px
        margin-bottom 20px
  .introTitle
    margin-top -15px
    width 200px
    // margin-bottom 16px
    left 50%
    transform translateX(-50%)
    position relative
  .proWrapper
    width 750px
    padding 0 32px
    padding-top 20px
    .noInfo
      width 100%
      height 446px
      margin 60px auto
    .item
      overflow hidden
      box-shadow 0px 0px 15px rgba(0, 0, 0, 0.2)
      height 100%
      margin-bottom 23px
      width 336px
      border-radius 10px
      background-color #ffffff
      .proImg
        width 341px
        height 341px
        border-top-left-radius 10px
        border-top-right-radius 10px
      .title
        color #111111
        font-size 25px
        padding-left 16px
        margin-bottom 15px
        margin-top 15px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .des
        color #919191
        font-size 22px
        padding-left 16px
        margin-bottom 15px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .value
        color #b93662
        font-size 33px
        padding-left 16px
        padding-bottom 15px
        .price
          font-size 20px
  .bar
    height 40px
    width 100%
    background-color #f5f5f5
</style>