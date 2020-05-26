<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="item " :class="index==defalutindex?'hoverItem':''" @click="son(item.id,index)" v-for="(item,index) in catlist" :key="index">{{item.name}}</div>
      </div>
      <img src="./search.png" alt="" @click="searchBar">
    </div>
    <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
      <div class="info">
        <div class="item van-hairline--bottom" @click="InfoDetail(item.id)" v-for="(item,index) in list" :key="index">
          <div class="tltle">{{item.title}}</div>
          <div class="imgWrapper row f-w" v-if="item.img">
            <img class="comImg" :src="itemImg" alt="" v-for="(itemImg,indexImg) in item.img.slice(0, 3)" :key="indexImg">
          </div>
          <div class="date">{{item.updatetime}}</div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </div>
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { artica, articaList } from 'api/index'
export default {
  data() {
    return {
      finishedtext: '',
      defalutindex: 0,
      catlist: [],
      info: [],
      list: [],
      noinfoShow: false,
      banner: [],
      dropdown: false,
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      catid: 1,
      count: '',
    }
  },
  mounted() {
    this._artica()



  },
  methods: {
    onLoad() {
      setTimeout(() => {
        console.log('this.page', this.page)
        console.log('执行')
        // 加载状态结束
        this._articaList(this.catid)
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _artica() {
      artica().then(res => {
        console.log('文章', res)
        this.catlist = res.data.catlist
        this.info = res.data.info
        this.catid = this.catlist[0].id
        this._articaList(this.catid)
        this.banner = this.info.banner
        console.log('this.banner ', this.banner)


      })
    },
    _articaList(catid) {
      articaList({
        catid: catid,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('文章列表', res)
        this.list = this.list.concat(res.data.list)
        this.count = res.data.count
        this.page = res.data.page
        if (this.count == 0) {
          this.noinfoShow = true
          this.finishedtext = ''
        } else {
          this.noinfoShow = false
          this.finishedtext = '没有更多数据了'
        }
      })
    },
    son(catid, index) {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false
      this.defalutindex = index;
      this.catid = catid

    },
    searchBar() {
      this.$router.push({
        path: './search'
      })

    },
    InfoDetail(id) {
      this.$router.push({
        path: './InfoDetail',
        query: {
          id: id,
        }
      })
    }

  },
  components: {
    noMessage

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
      width 663px
      padding-left 32px
      height 57px
      border-right 1px solid #f5f5f5
      padding-right 10px
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
  .info
    background-color #ffffff
    .item
      margin 33px 27px 0px 31px
      padding-bottom 26px
      .date
        color #919191
        font-size 25px
        margin-top 5px
      .tltle
        color #252525
        font-size 33px
        margin-top 15px
        padding-bottom 15px
      .imgWrapper
        .comImg
          margin-bottom 15px
          width 226px
          height 150px
          margin-right 4px
</style>