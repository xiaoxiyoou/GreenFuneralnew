<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
      <van-swipe-item v-for="(image, index) in info.banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="item " :class="idx==index?'hoverItem':''" @click="cate(item,idx,item.act)" v-for="(item,idx) in menu" :key="idx">{{item.name}}</div>
        <img src="./select.png" alt="">
      </div>
      <img src="./search.png" alt="" @click="searchBar">
    </div>
    <div class="dropdown col a-c" v-if="dropdown">
      <div class="item col a-c" @click="personList(item.id)" v-for="(item,index) in catlist" :key="index">{{item.name}}</div>
    </div>
    <van-list v-model="loading" :finished="finished"  :finished-text="finishedtext" @load="onLoad">
      <div class="personWraper row f-w j-b">
        <div class="item col a-c" @click="personDetail(item.id)" v-for="(item,index) in list" :key="index">
          <img class="phone" src="./phone.png" alt="" @click.stop="callPhone(item.mobile)">
          <img class="person" :src="item.headimgurl" alt="">
          <div class="name">{{item.name}}</div>
          <div class="des row j-c a-c" v-if="item.qualification">{{item.qualification}}</div>
          <div class="des row j-c a-c" v-else>暂无资质</div>
          <div class="startWrapper row j-c a-c">
            <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" color="#1ead55" size="15" />
            <div class="grade">{{item.score}}分</div>
          </div>
        </div>
      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import { emceeapi, emceeapiList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      finishedtext: '',
      noinfoShow: false,
      value: 4.9,
      list: [],
      info: '',
      catlist: [],
      menu: [{ name: '全部人员', act: '' }, { name: '智能推荐', act: 'recom' }, { name: '好评优先', act: 'praise' }, { name: '资质筛选', act: '' }],
      index: 0,
      dropdown: false,
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      count: '',
      catid: '',
      act: 'recom'
    }
  },
  mounted() {
    this._emceeapi()
    this._emceeapiList()



  },
  methods: {
    // 分页
    onLoad() {
      setTimeout(() => {

        console.log('this.page', this.page)
        // this.page++

        if (this.index == 3) {
          this._emceeapiList(this.catid)
        } else {
          this._emceeapiList('', this.act)
        }
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    // 执宾
    _emceeapi() {
      emceeapi({
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('执宾', res)
        this.catlist = res.data.catlist
        this.info = res.data.info


      })
    },
    // 执宾列表
    _emceeapiList(catid, act) {
      emceeapiList({
        catid: catid,
        act: act,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('执宾列表', res)
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
    // 详情

    personDetail(id) {
      this.$router.push({
        path: './personDetail',
        query: {
          id: id,
        }
      })

    },
    // 搜索
    searchBar() {
      this.$router.push({
        path: './personSearch'
      })

    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    // 分类列表
    personList(catid) {
      this.loadState()
      this.catid = catid
      this.dropdown = false
      this._emceeapiList(catid)
    },
    // 切换
    cate(item, idx, act) {
      this.index = idx;
      this.act = act

      if (idx == 3) {
        this.dropdown = true
      } else {
        this.loadState()
        this._emceeapiList('', this.act)
        this.dropdown = false
      }
    },
    // 拨打电话
    callPhone(telephone) {
      window.location.href = 'tel:' + telephone
    },

  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
>>>.van-rate__item:not(:last-child)
  padding-right 0 !important
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #ffffff
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
  .dropdown
    position absolute
    right 83px
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .personWraper
    padding 0 32px 100px
    background-color #ffffff
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
      .person
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
</style>