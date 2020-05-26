<template>
  <div class="container">
    <div class="title row van-hairline--bottom a-c">
      <div class="text">总体打分</div>
      <div class="startWrapper row  a-c">
        <van-rate v-model="value" :size="20" color="#5aa967" void-icon="star" void-color="#eee" @change="onChange" />

      </div>
    </div>
    <textarea class="textarea" placeholder="人员服务怎么样？机构环境怎么样？" v-model="intro" @blur="getHeight"></textarea>
    <div class="bar"></div>
    <div class="upImg row a-c j-b" @click="goodImg">
      <div class="text">上传照片</div>
      <img src="./add.png" alt="">
    </div>
    <div class="lifeImg row f-w">
      <div class="item" v-for="(item,index) in lifeImg" :key="index">
        <img class="delect" src="./delect.png" alt="" @click="delect(index)">
        <img class="" :src="item" alt="">
        <!-- <img class="" src="http://cdn.fuyulove.com/Upload/userimg/2020/4/20/04c78b8d960844848c4bea5505182ae8.jpg" alt=""> -->
      </div>
    </div>
    <div class="btm row j-c a-c" @click="publish">发表</div>
  </div>
</template>
<script type="text/ecmascript-6">
import { commentapiAdd } from 'api/index'
var wx = require('weixin-js-sdk')
import axios from 'axios'
import { Toast } from 'vant'
export default {
  data() {
    return {
      value: 5,
      score: 5,
      intro: '',
      lifeImg: [],
      imglist:''



    }
  },
  mounted() {



  },
  methods: {

    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 选择评分
    onChange(value) {
      this.score = value
    },
    publish() {
      this._commentapiAdd()


    },
      // 删除{美好回忆图片
    delect(flag) {
      this.lifeImg.splice(flag, 1)

    },
    // 美好回忆
    goodImg() {
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log('微信返回', res)
          let localIds = res.localIds;
          console.log(localIds.length)
          for (var i = 0; i < localIds.length; i++) {
            this.syncUpload(localIds[i]);

          }
        }
      });
    },
    syncUpload(localId) {
      wx.uploadImage({
        localId: localId,
        success: (res) => {
          console.log('微信上传', res)
          this.wxImgDown(res.serverId);

        }
      });

    },
    wxImgDown(id) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/action/wxImgDown.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          media_id: id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log('本地下载', res)
        this.lifeImg = this.lifeImg.concat(res.data.msg)
        console.log('this.lifeImg', this.lifeImg)
      }).catch(function (error) {
        console.log(error);
      });

    },
    _commentapiAdd() {
      this.imglist = this.lifeImg.join("|")
      if (this.intro == '') {
        Toast('请输入您的评价')
        return false
      } else {

        commentapiAdd({
          mid: this.$route.query.mid,
          type: this.$route.query.type,
          title: this.$route.query.title,
          intro: this.intro,
          imglist: this.imglist,
          score: this.score
        }).then(res => {
          console.log('评论', res)
          if (res.code == 0) {
            Toast('评论成功')
            // setTimeout(() => {
            //   this.$router.replace({
            //     path: './commentDetail',
            //     query: {
            //       mid: this.$route.query.mid,
            //       title: this.$route.query.title,
            //       type: this.$route.query.type,
            //     }
            //   })
            // }, "1000");
            window.history.go(-1)

          }

        })

      }
    },

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
  bottom 0
  background-color #ffffff
  .title
    height 114px
    padding 0 30px
    .text
      font-size 30px
      color #424242
      margin-right 5px
    .startWrapper
      img
        width 40px
        height 38px
        margin-left 5px
  .textarea
    height 252px
    width 100%
    padding 20px 30px
    font-size 28px
  .bar
    width 100%
    height 17px
    background-color #f5f5f5
  .upImg
    height 162px
    padding 0 30px
    color #424242
    font-size 30px
    img
      width 122px
      height 122px
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
<style scoped>
.lifeImg {
  padding: 30px;
}
.lifeImg > .item {
  width: 200px;
  height:200px;
  border: 1px solid #f5f5f5;
  position: relative;
  margin-bottom: 25px;
  margin-right: 30px;
}
.lifeImg > .item > .delect {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  display: block;
}
.lifeImg > .item > img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>