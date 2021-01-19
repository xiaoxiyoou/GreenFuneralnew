<template>
  <div class="container" v-wechat-title="detailInfo.title">
    <div class="title-con">
      <div class="title">{{detailInfo.title}}</div>
      <div class="date" v-if="detailInfo.updatetime">发布时间：{{detailInfo.updatetime}}</div>
      <div class="content">
        <div class="condetail" v-html="detailInfo.contents">
        </div>
      </div>
      <div class="date" v-if="detailInfo.look" style="padding-bottom:80px;padding-top:10px">阅读  {{detailInfo.look}}</div>
    </div>
    <!-- <div class="btm row a-c j-b">
      <div class="btm-item" :class="{ btmItemHover: prov }" @click="nextContent(prov)">
        <p class="btm-prev">上一篇</p>
      </div>
      <div class="btm-item " :class="{ btmItemHover: next }" @click="nextContent(next)">
        <p class="btm-text">下一篇</p>
      </div>
    </div> -->
  </div>
</template>
<script type="text/ecmascript-6">
import { articaDetail } from 'api/index'
import { Toast } from 'vant'
import { share } from 'assets/js/shareDetail.js'
export default {
  data() {
    return {
      detailInfo: '',
      prov: '',
      next: '',
      flag: true




    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    this._articaDetail(this.$route.query.id)
  },
  methods: {
    // 切换下一篇

    nextContent(id) {
      console.log('id', id)
      if (id) {

        this._articaDetail(id)
      } else {
        Toast('暂无内容')
      }

    },

    _articaDetail(id) {
      articaDetail({
        id: id
      }).then(res => {
        console.log('文章详情', res)
        this.detailInfo = res.data.info
        share(res.data.info.title, 'http://b.fuyulove.com/wisdom/#/InfoDetail?id=' + res.data.info.id, '', 'http://b.fuyulove.com/wisdom/img/share.jpg')
        if (this.$route.query.id == res.data.prov) {
          this.prov = ""
        } else {
          this.prov = res.data.prov
        }
        if (this.$route.query.id == res.data.next) {
          this.next = ""
        } else {
          this.next = res.data.next
        }
        console.log(this.$route.query.id)
        console.log(this.next)
        console.log(this.prov)


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
  top 0px
  width 100%
  height 100%
  padding 0 30px
  background #ffffff
  .title-con
    height 100%
  .title
    font-size 40px
    line-height 55px
    margin-top 30px
    color rgb(34, 34, 34)
    font-weight 700
  .date
    font-size 28px
    margin-top 27px
    color #a4a4a4
  .content
    width 100%
    line-height 50px
    margin-top 40px
    font-size 34px
    word-break break-all
    .condetail
      background-color #ffffff
      >>>img
        max-width 100%
        height auto !important
  .btm
    width 100%
    padding 0 30px
    left 0
    padding-top 20px
    background #ffffff
    z-index 20
    position fixed
    padding-bottom 50px
    bottom 0
    .btm-item
      display flex
      flex-direction row
      width 330px
      height 80px
      justify-content center
      align-items center
      background #d1d1d1
      color #ffffff
      border-radius 8px
      font-size 35px
      .btm-img-left
        width 42px
        height 42px
        margin-right 10px
      .btm-img-riht
        width 42px
        height 42px
        margin-left 10px
    .btmItemHover
      background #5aa967
</style>