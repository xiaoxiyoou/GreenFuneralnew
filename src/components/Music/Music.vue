<template>
  <div class="page">
    <div class="music-wrapper">
      <img ref="musicImg" class="music Rotation" src="./music.png" alt="" @click="switchPlay">
      <audio id="audio" ref="audio" :src="musicSrc" controls autoplay="autoplay" hidden="true"></audio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      musicStatus: false
    }
  },
  props: {
    musicSrc: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.automation();
    })
  },
  methods: {
    automation() {
      document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('WeixinJSBridgeReady', () => {
          this.$nextTick(() => {
            console.log(this.musicSrc)
            this.musicStatus = true
            this.$refs.audio.src = this.musicSrc
            this.$refs.audio.load()
            this.$refs.audio.play()
          })
        }, false)
      })
    },
    // 滑动播放
    touchstart() {
      document.addEventListener('touchstart', () => {
        if (!this.musicStatus) {
          this.musicStatus = true
          this.$refs.audio.load()
          this.$refs.audio.play()

        }
      });
    },
    switchPlay() {
      if (!this.musicStatus) {
        this.musicStatus = true
        this.$refs.audio.src = this.musicSrc
        this.$refs.musicImg.classList.add('Rotation')
        this.$refs.audio.load()
        this.$refs.audio.play()
      } else {
        this.musicStatus = false
        this.$refs.musicImg.classList.remove('Rotation')
        this.$refs.audio.pause()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@keyframes rotation
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
.music-wrapper
  .music
    width 44px
    height 44px
&.Rotation
  animation rotation 2s linear infinite
  -moz-animation rotation 2s linear infinite
  -webkit-animation rotation 2s linear infinite
  -o-animation rotation 2s linear infinite
</style>
