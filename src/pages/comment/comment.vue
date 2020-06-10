<template>
  <div class="container">
    <img class="banner" src="./banner.png" alt="">
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="item " :class="idx==index?'hoverItem':''" @click="son(item,idx)" v-for="(item,idx) in menu" :key="idx">{{item}}</div>
      </div>
      <img src="./search.png" alt="" @click="searchBar">
    </div>
    <div class="conmmetWrapper">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="item row" v-for="(item,index) in list" :key="index">
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
            <div class="tip van-hairline--top" @click="personList(item.mid)" v-if="item.type==0">对执宾 <span>{{item.title}}</span> 的评价</div>
            <div class="tip van-hairline--top" @click="mechanDeatil(item.mid)" v-if="item.type==1">对机构 <span>{{item.title}}</span> 的评价</div>
          </div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </van-list>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { commentapiList } from 'api/index'
import { ImagePreview } from 'vant';
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      finishedtext: '',
      menu: ['全部评价', '优质评价', '机构评价', '执宾评价'],
      index: 0,
      list: [],
      count: '',
      noinfoShow: false,
      dropdown: false,
      loading: false,
      finished: false,
      page: 1,
      size: 10,



    }
  },
  mounted() {
    this._commentapiList()


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
    // 分页
    onLoad() {
      setTimeout(() => {

        console.log('this.page', this.page)
        // this.page++

        if (this.index == 0) {
          this._commentapiList()
        } else if (this.index == 1) {
          this._commentapiList('', "praise")
        } else if (this.index == 2) {
          this._commentapiList(1)
        } else if (this.index == 3) {
          this._commentapiList(0)
        }
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _commentapiList(type, act) {
      commentapiList({
        type: type,
        act: act,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('获取评论', res)
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
    son(item, idx) {
      this.index = idx;
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false
      if (this.index == 0) {
        this._commentapiList()
      } else if (this.index == 1) {
        this._commentapiList('', "praise")
      } else if (this.index == 2) {
        this._commentapiList(1)
      } else if (this.index == 3) {
        this._commentapiList(0)
      }

    },
    searchBar() {
      this.$router.push({
        path: './commentSearch'
      })
    },
    personList(id) {
      this.$router.push({
        path: './personDetail',
        query: {
          id: id,
        }
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
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 237px
  .itemWrapper
    height 90px
    border-bottom 1px solid #f5f5f5
    padding-right 29px
    background-color #ffffff
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
  .conmmetWrapper
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
</style>