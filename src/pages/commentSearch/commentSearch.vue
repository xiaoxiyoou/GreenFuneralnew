<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入你要搜索的内容" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="info">
      <div class="conmmetWrapper">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
          <div class="item row" v-for="(item,index) in list" :key="index">
            <img class="avatar" :src="item.headimgurl" alt="">
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
                <img class="comImg" :src="itemImg" alt="" v-for="(itemImg,index) in item.imglist.slice(0, 3)" :key="index"  @click="imgPrew(item.imglist.slice(0, 3),index)">
              </div>
              <div class="tip van-hairline--top" @click="personList(item.mid)" v-if="item.type==0">对执宾 <span>{{item.title}}</span> 的评价</div>
              <div class="tip van-hairline--top" @click="mechanDeatil(item.mid)" v-if="item.type==1">对机构 <span>{{item.title}}</span> 的评价</div>
            </div>
          </div>
          <noMessage :noinfoShow="noinfoShow" />
        </van-list>
      </div>
    </div>
    <div class="btm row j-c a-c" @click="jion">申请加入公示人员/机构</div>
    <div class="bar"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { commentapiList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      finishedtext: '',
      dropdown: false,
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      count: '',
      value: '',
      list: [],
      noinfoShow: false,
      key: ''



    }
  },
  mounted() {




  },
  methods: {
     // 图片预览
    imgPrew(flag,index) {
      ImagePreview({
        images: flag,
        closeable: true,
        startPosition:index,
        closeOnPopstate:true
        
      });
    },

    mechanDeatil(id) {
      this.$router.push({
        path: './mechanDeatil',
        query: {
          id: id,
        }
      })
    },
    // 分页
    onLoad() {
      setTimeout(() => {

        this._commentapiList(this.key)

        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _commentapiList(key) {
      commentapiList({
        key: key,
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
    onSearch(val) {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false
      console.log(val);
      this.key = val
      this._commentapiList(val)
    },
    onCancel() {
    },
    jion() {
      this.$router.push({
        path: './jion'
      })

    },
    // 详情
    personList(id) {
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
    .conmmetWrapper
      padding-bottom 150px
      .item
        padding 47px 23px 20px 20px
        margin-bottom 15px
        background-color #ffffff
        font-size 27px
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