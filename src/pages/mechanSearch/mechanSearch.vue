<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入你要搜索的内容" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="info">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="top row a-c j-b" @click="mechanDeatil(item.id)" v-for="(item,index) in list" :key="index">
          <div class="personDetail row a-c">
            <img class="person" :src="item.imgurl" alt="">
            <div class="item col j-b">
              <div class="name">{{item.companyname}}</div>
              <div class="startWrapper row  a-c">
                <div class="tip">服务指数</div>
                <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" color="#1ead55" size="15" />
                <div class="grade">{{item.score}}分</div>
              </div>
              <div class="personbtm row a-c">
                <img src="./../../assets/img/dingwei.png" alt="">
                <div class="des row j-c a-c" v-if="item.address">{{item.address}}</div>
                <div class="des row j-c a-c" v-else>暂未完善</div>
              </div>
            </div>
          </div>
          <div class="phoneWrapper col j-c a-c">
            <img class="phone" src="./../../assets/img/phoneBig.png" alt="" @click.stop="callPhone(item.telephone)">
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
import { companyapiList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      value: '',
      list: [],
      noinfoShow: false,
      finishedtext: '',
      dropdown: false,
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      key: '',



    }
  },
  mounted() {




  },
  methods: {
    // 分页
    onLoad() {
      setTimeout(() => {

        this._companyapiList(this.key)

        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _companyapiList(key) {
      companyapiList({
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
    onSearch(val) {
      this.loadState()
      console.log(val);
      this.key = val
      this._companyapiList(val)
    },
    onCancel() {
      // Toast('取消');
    },
    jion() {
      this.$router.push({
        path: './jion'
      })

    },
    mechanDeatil(id) {
      this.$router.push({
        path: './mechanDeatil',
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
    padding-bottom 100px
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
            width 350px
            overflow hidden
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
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
          .personbtm
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