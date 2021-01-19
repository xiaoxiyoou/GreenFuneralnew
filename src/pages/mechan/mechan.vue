<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
      <van-swipe-item v-for="(image, index) in info.banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="item " :class="idx==index?'hoverItem':''" @click="son(item.act,idx)" v-for="(item,idx,) in menu" :key="idx">{{item.name}}</div>
        <img src="./select.png" alt="">
      </div>
      <img src="./search.png" alt="" @click="searchBar">
    </div>
    <div class="dropdown col a-c" v-if="dropdown">
      <div class="item col a-c" @click="personDetail(item.id)" v-for="(item,index) in catlist" :key="index">{{item.name}}</div>
    </div>
    <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
      <div class="top row a-c j-b" @click="mechanDeatil(item.id)" v-for="(item,index) in list" :key="index">
        <div class="personDetail row a-c">
          <img class="person" :src="item.imgurl" alt="">
          <div class="item col j-b">
            <div class="name">{{item.companyname}}</div>
            <div class="startWrapper row  a-c">
              <div class="tip">服务指数</div>
              <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" :color="color" size="15" readonly/>
        
              <div class="grade" :style="{'color':color}">{{item.score}}分</div>
            </div>
            <div class="btm row a-c">
              <img src="./../../assets/img/dingwei.png" alt="" :style="{'background-color':color}">
              <div class="des row j-c a-c" v-if="item.address">{{item.address}}</div>
              <div class="des row j-c a-c" v-else>暂未完善</div>
            </div>
          </div>
        </div>
        <div class="phoneWrapper col j-c a-c">
          <img class="phone" src="./../../assets/img/phoneBig.png" alt="" @click.stop="callPhone(item.mobile)" :style="{'background-color':color}">
          <!-- <div>{{item.distance}}</div> -->
        </div>
      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import { companyapi, companyapiList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      color:localStorage.getItem("color"),
      finishedtext: '',
      noinfoShow: false,
      info: '',
      catlist: [],
      menu: [{ name: '附近机构', act: 'nearby' }, { name: '智能推荐', act: 'recom' }, { name: '好评优先', act: 'praise' }, { name: '资质筛选', act: '' }],
      index: 0,
      dropdown: false,
      list: [],
      act: 'nearby',
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      count: '',
      catid: '',





    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._companyapi()
    this._companyapiList('', this.act)

  },
  methods: {
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        if (this.index == 3) {
          this._companyapiList(this.catid)
        } else {
          this._companyapiList('', this.act)
        }
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _companyapi() {
      companyapi().then(res => {
        console.log('机构', res)
        this.catlist = res.data.catlist
        this.info = res.data.info

      })
    },
    _companyapiList(catid, act) {
      companyapiList({
        catid: catid,
        act: act,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('机构列表', res)
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

    callPhone(telephone) {
      console.log(telephone)
      window.location.href = 'tel:' + telephone
    },
    mechanDeatil(id) {
      this.$router.push({
        path: './mechanDeatil',
        query: {
          id: id,
        }
      })

    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    // 选择分类
    personDetail(catid) {
      this.loadState()
      this.dropdown = false
      this.catid = catid
      this._companyapiList(catid)
    },
    // 切换导航
    son(act, idx) {
      this.index = idx;
      this.act = act

      if (idx == 3) {
        this.dropdown = true
      } else {
        this.loadState()
        this.dropdown = false
        this._companyapiList('', this.act)
      }

    },
    searchBar() {
      this.$router.push({
        path: './mechanSearch'
      })

    },

  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
>>>.van-list
  background-color #f5f5f5
.container
  position absolute
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
    background-color #ffffff
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
        // color #1ead55
        font-size 32px
        font-weight 700
        // border-bottom 3px solid #1ead55
        padding-bottom 2px
      img
        width 22px
        height 11px
        position relative
        right 20px
    img
      width 29px
      height 29px
  .dropdown
    position absolute
    right 83px
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    // padding 10px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .top
    padding 25px 28px 25px 18px
    background-color #ffffff
    margin-bottom 9px
    .personDetail
      .person
        width 139px
        height 139px
      .item
        margin-left 19px
        min-height 139px
        width 450px
        .name
          color #111111
          font-size 30px
        .startWrapper, .tip
          color #919191
          font-size 27px
          margin-right 5px
        img
          width 29px
          height 27px
          margin-left 2px
        .grade
          color #1ead55
          margin-left 2px
        .btm
          img
            width 24px
            height 28px
          .des
            color #919191
            font-size 27px
            margin-left 10px
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
    .phoneWrapper
      color #919191
      font-size 27px
      .phone
        width 75px
        height 75px
        margin-bottom 20px
</style>