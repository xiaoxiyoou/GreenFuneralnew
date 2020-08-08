<template>
  <div class="container">
    <!-- <img class="banner" src="./banner.png" alt=""> -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c">
        <div class="item " :class="defalutindex==index?'hoverItem':''" @click="cateList(item.id,index)" v-for="(item,index) in catelist" :key="index">{{item.name}}</div>
      </div>
    </div>
    <div class="search-wrap  row a-c j-c" @click="searchHall">
      <div class="search-cont row a-c j-c">
        <img class="search-img" src="./search.png" alt="">
        <div class="search-text">搜索</div>
      </div>
    </div>
    <div class="personDetail row f-w j-b">
      <div class="item col a-c" v-for="(item,index) in list" :key="index" @click="show(item.id)">
        <img class="" :src="item.imgurl" alt="">
        <div class="text">{{item.name}}</div>
      </div>

    </div>
    <div class="btm col a-c">
      <div class="created row a-c j-c" @click="create">创建追思纪念堂</div>
      <div class="myRecall row a-c j-c" @click="myRecall">我的追思纪念堂</div>

    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { fame, listbycate } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      defalutindex: 0,
      list: [],
      catelist: [],
      banner: []




    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    console.log('sid', this.$route.query.sid)
    sessionStorage.setItem('sid', this.$route.query.sid)
    this._fame()


  },
  methods: {
    searchHall() {
      this.$router.push(
        {
          path: '/searchHall',

        })
    },
    _fame() {
      fame({
        action: 'index',
        shopid: this.$route.query.sid
      }).then(res => {
        console.log('名人馆分类', res)
        let id = res.data.catelist[0].id
        console.log('id', id)
        this._listbycate(id)
        this.catelist = res.data.catelist
        this.banner = res.data.info.banner
      })
    },
    _listbycate(cate) {
      listbycate({
        cate: cate,
        shopid: this.$route.query.shopid,
      }).then(res => {
        console.log('名人馆详情', res)
        this.list = res.data.list
        setTimeout(() => {
          Toast.clear();
        }, "1000");
      })
    },

    cateList(cateid, index) {
      this.defalutindex = index;
      this._listbycate(cateid)
      Toast.loading({
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });


    },
    create() {
      this.$router.push(
        {
          path: '/create',
          query: {
            sid: this.$route.query.sid,

          }
        })
    },
    myRecall() {
      this.$router.push({
        path: '/myRecall',
        query: {
          sid: this.$route.query.sid,

        }
      })
    },
    show(carid) {
      this.$router.push({
        path: '/show',
        query: {
          carid: carid,
        }
      })
    }

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  background-color #ffffff
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 237px
    img
      width 100%
      height 237px
  .itemWrapper
    height 90px
    border-bottom 1px solid #f5f5f5
    padding-right 29px
    font-size 28px
    .itemContent
      margin-left 33px
      .item
        margin-right 70px
      .hoverItem
        color #1ead55
        font-size 32px
        border-bottom 3px solid #1ead55
        padding-bottom 2px
      img
        width 22px
        height 11px
        position relative
        right 20px
    img
      width 29px
      height 29px
  .search-wrap
    width 100%
    background-color #f5f5f5
    height 100px
    .search-cont
      width 709px
      height 64px
      border-radius 10px
      background-color #ffffff
      .search-img
        width 24px
        height 24px
        margin-right 5px
      .search-text
        color #b6b6b6
        font-size 28px
  .personDetail
    margin-bottom 300px
    padding 0 42px
    .item
      color #252525
      font-size 30px
      margin-top 25px
      // width 33%
      img
        width 209px
        height 245px
      .text
        margin-top 15px
  .btm
    position fixed
    bottom 10px
    width 100%
    font-size 35px
    // height 200px
  .created
    width 690px
    background-color #5aa967
    height 90px
    border-radius 10px
    color #fff
  .myRecall
    width 690px
    background-color #ffffff
    overflow hidden
    height 90px
    color #5aa967
    margin-top 14px
    border 1px solid #5aa967
    border-radius 10px
</style>