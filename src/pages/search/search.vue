<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入你要搜索的内容" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="info">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
        <div class="item van-hairline--bottom" @click="InfoDetail(item.id)" v-for="(item,index) in list" :key="index">
          <div class="tltle">{{item.title}}</div>
          <div class="imgWrapper row f-w" v-if="item.img">
            <img class="comImg" :src="itemImg" alt="" v-for="(itemImg,indexImg) in item.img.slice(0, 3)" :key="indexImg">
          </div>
          <div class="date">{{item.updatetime}}</div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </van-list>
    </div>
    <div class="btm row j-c a-c" @click="jion">申请加入公示人员/机构</div>
  </div>

</template>
<script type="text/ecmascript-6">
// import { Toast } from 'vant';
import { articaList } from 'api/index'
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
      count: '',



    }
  },
  mounted() {




  },
  methods: {
    // 分页
    onLoad() {
      setTimeout(() => {

        this._articaList(this.key)

        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _articaList(key) {
      articaList({
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
    //搜索
    onSearch(val) {
      this.loadState()
      console.log(val);
      this.key = val
      this._articaList(val)
    },
    onCancel() {
      // Toast('取消');
    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    jion() {
      this.$router.push({
        path: './jion'
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
    .item
      margin 33px 27px 0px 31px
      padding-bottom 26px
      .date
        color #919191
        font-size 25px
        margin-top 5px
      .tltle
        color #252525
        font-size 35px
        margin-top 15px
        padding-bottom 15px
      .imgWrapper
        .comImg
          margin-bottom 15px
          width 226px
          height 150px
          margin-right 4px
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
</style>