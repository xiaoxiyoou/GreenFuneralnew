<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入你要搜索的内容" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="info">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="personWraper row f-w j-b">
          <div class="item col a-c" @click="personDetail(item.id)" v-for="(item,index) in list" :key="index">
            <img class="phone" src="./phone.png" alt="" @click.stop="callPhone(item.telephone)">
            <img class="person" :src="item.headimgurl" alt="">
            <div class="name">{{item.name}}</div>
            <div class="des row j-c a-c">{{item.qualification}}</div>
            <div class="startWrapper row j-c a-c">
              <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" color="#1ead55" size="15" />
              <div class="grade">{{item.score}}分</div>
            </div>
          </div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </van-list>
    </div>
    <div class="btm row j-c a-c" @click="jion">申请加入公示人员/机构</div>
    <div class="bar"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { emceeapiList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      finishedtext: '',
      dropdown: false,
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      key: '',
      count: '',
      value: '',
      list: [],
      noinfoShow: false,



    }
  },
  mounted() {




  },
  methods: {
    // 分页
    onLoad() {
      setTimeout(() => {

        this._emceeapiList(this.key)

        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _emceeapiList(key) {
      console.log('this.page', this.page)
      emceeapiList({
        key: key,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('列表', res)
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
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    //搜索
    onSearch(val) {
      this.loadState()
      console.log(val);
      this.key = val
      this._emceeapiList(val)
    },
    onCancel() {
      // Toast('取消');
    },
    jion() {
      this.$router.push({
        path: './jion'
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

  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
.van-search__content
  height 39px
  border-radius 10px
  display flex
  flex-direction row
  align-items center
.container
  position absolute
  background-color #ffffff
  top 0px
  width 100%
  height 100%
  bottom 0
  .info
    background-color #ffffff
    margin-bottom 100px
    .personWraper
      padding 0 32px 10px
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
  .btm
    position fixed
    bottom 15px
    background-color #5aa967
    width 690px
    height 90px
    border-radius 10px
    color #ffffff
    left 50%
    transform translate(-50%, 0%)
    z-index 100
  .bar
    position fixed
    bottom 0
    height 15px
    background-color #ffffff
    width 690px
    left 50%
    transform translate(-50%, 0%)
    z-index 100
</style>