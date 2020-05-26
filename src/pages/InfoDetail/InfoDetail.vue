<template>
  <div class="container">
    <div class="title-con">
      <div class="title">{{detailInfo.title}}</div>
      <div class="date">{{detailInfo.updatetime}}</div>
      <div class="content">
        <div class="condetail" v-html="detailInfo.contents">
        </div>
      </div>

    </div>
    <div class="btm row a-c j-b">
      <div class="btm-item" :class="{ btmItemHover: prov }" @click="nextContent(prov)">
        <p class="btm-prev">上一篇</p>
      </div>
      <div class="btm-item " :class="{ btmItemHover: next }" @click="nextContent(next)">
        <p class="btm-text">下一篇</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { articaDetail } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      detailInfo: '',
      prov: '',
      next: ''




    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    this._articaDetail()
  },
  methods: {
    // 切换下一篇
    nextContent(id) {
      if (id) {
        this.$router.push({
          path: '/InfoDetail',
          query: {
            id: id,
          }
        })
      } else {
        Toast('暂无内容')
      }

    },
    prevContent() {

    },
    _articaDetail() {
      articaDetail({
        id: this.$route.query.id
      }).then(res => {
        console.log('文章详情', res)
        this.detailInfo = res.data.info
        this.prov = res.data.prov
        this.next = res.data.next

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
    font-size 36px
    line-height 50px
    letter-spacing 3px
    margin-top 30px
  .date
    font-size 30px
    margin-top 27px
    color #777777
  .content
    width 100%
    height 80%
    line-height 50px
    margin-top 40px
    text-align justify
    font-size 30px
    .condetail
      padding-bottom 150px
      background-color #ffffff
      >>>img
        max-width 100%
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