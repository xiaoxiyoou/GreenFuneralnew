<template>
  <div class="container">
    <div class="titleCon row j-b a-c">
      <div class="title">市民评价</div>
      <div class="num" v-if="count">{{count}}</div>
    </div>
    <noMessage :noinfoShow="noinfoShow" />
    <div class="conmmetWrapper">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="item row van-hairline--bottom" v-for="(item,index) in list" :key="index">
          <div>
            <img class="avatar" :src="item.headimgurl" alt="">
          </div>
          <div class="content">
            <div class="person row j-b">
              <div class="name">{{item.nickname}}</div>
              <div class="startWrapper row  a-c">
                <div class="text">打分</div>
                <div v-if="item.score!=0">
                  <img src="./../../assets/img/xing.png" alt="" v-for="(itemscore,indexxing) in parseInt(item.score)" :key="indexxing">
                </div>
                <div v-if=" 5 - item.score!=0">
                  <img src="./../../assets/img/hui.png" alt="" v-for="(itemscore,indexscore) in 5 - item.score" :key="indexscore">
                </div>
                <div class="grade">{{item.score}}分</div>
              </div>
            </div>
            <div class="date">{{item.createdate}}</div>
            <div class="des">{{item.intro}}</div>
            <div class="imgWrapper row f-w" v-if="item.imglist.length && item.imglist[0]!= ''">
              <img class="comImg" :src="itemImg" alt="" v-for="(itemImg,index) in item.imglist.slice(0, 3)" :key="index" @click="imgPrew(item.imglist.slice(0, 3),index)">
            </div>
          </div>
          <div class="bar"></div>
        </div>
      </van-list>
    </div>
    <div class="btm row j-c a-c" @click="toComment">写评价</div>
    <div class="bar"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { commentapiList } from 'api/index'
import { ImagePreview } from 'vant';
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      menu: ['全部评价', '优质评价', '好评优先', '执宾评价'],
      index: 0,
      list: [],
      count: '',
      noinfoShow: false,
      dropdown: false,
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      finishedtext: '没有更多数据了'




    }
  },
  mounted() {
    this._commentapiList()


  },
  methods: {
    // 图片预览
    imgPrew(flag, index) {
      ImagePreview({
        images: flag,
        closeable: true,
        startPosition: index,
        closeOnPopstate:true
      });
    },
    // 分页
    onLoad() {
      setTimeout(() => {

        console.log('this.page', this.page)
        this.page++

        this._commentapiList()
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);
    },
    _commentapiList() {
      commentapiList({
        mid: this.$route.query.mid,
        type: this.$route.query.type,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('获取评论', res)
        this.list = this.list.concat(res.data.list)
        this.count = res.data.count
        if (this.count == 0) {
          this.noinfoShow = true
          this.finishedtext = ''
        } else {
          this.noinfoShow = false
          this.finishedtext = '没有更多数据了'
        }

      })
    },
    son(item, idx) {
      this.index = idx;

    },
    toComment() {
      this.$router.push({
        path: './toComment',
        query: {
          mid: this.$route.query.mid,
          title: this.$route.query.title,
          type: this.$route.query.type,
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
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #ffffff
  .titleCon
    background-color #ffffff
    padding 25px 25px 0 25px
    .title
      font-weight 700
      font-size 27px
    .num
      color #a9a9a9
      font-size 27px
  .conmmetWrapper
    margin-bottom 150px
    // background-color #f5f5f5
    .item
      padding 47px 23px 20px 20px
      // margin-bottom 15px
      background-color #ffffff
      font-size 27px
      .bar
        background-color #f5f5f5
        height 15px
        width 100%
      .avatar
        width 69px
        height 69px
        border-radius 50%
        display block
      .content
        margin-left 17px
        width 100%
        .person
          .name
            color #5d5d5d
            font-size 31px
          .startWrapper
            .text
              color #919191
              margin-right 3px
            img
              width 29px
              height 27px
              margin-left 4px
            .grade
              margin-left 3px
              color #1ead55
        .date
          color #a9a9a9
          margin-top 5px
        .des
          color #5d5d5d
          font-size 26px
          margin-top 15px
          padding-bottom 15px
        .imgWrapper
          .comImg
            margin-bottom 15px
            width 200px
            height 136px
            margin-right 5px
        .tip
          color #919191
          padding-top 15px
          span
            color #1ead55
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
    // background-color #ffffff
    width 690px
    left 50%
    transform translate(-50%, 0%)
    z-index 100
</style>