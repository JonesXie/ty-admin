<template>
    <el-dialog :visible.sync="popShow" class="no-title" append-to-body @close="closePop">
        <div class="preview-img" :id="'imgBox' + id"> 
            <img width="100%" :src="imgSrc" :style="{
                transform:`rotate(${imgStyle.rotate}deg) scale(${imgStyle.scale})`,
                top: `${imgStyle.top}px`,
                left: `${imgStyle.left}px`
                }"
                :id="'imgSee' + id"
            >
            <button class="rotate-btn" @click="setImgStyle('rotate', 90)">
                <svg-icon icon-class="icon-rotate" ></svg-icon>
            </button>
        </div>
    </el-dialog>   
</template>
<script>
export default {
    props:{
        pop: {
            type: Object,
            default:() => { return {} }
        },
        id: {
            default: ''
        }
    },
    data() {
        return {
            popShow:false,  
            imgSrc: '',
            imgStyle: {
                rotate: 0,
                scale: 1,
                top: 0,
                left: 0
            },
            move: {
                x: '',
                y: '',
                t: '',
                l: '',
                isDown: false
            }
        };
    },
    watch: {
        pop:{
            handler(value) {
                this.popShow = value.show;
                if (!value.show) return;
                this.imgSrc = value.data
                this.$nextTick(() => {
                    this.imgBox.addEventListener('wheel', this.handleScroll, true);  
                    this.imgSee.addEventListener('mousedown', this.handleDown, true);  
                    this.imgSee.addEventListener('mousemove', this.handlerMove, true);  
                    this.imgSee.addEventListener('mouseup', this.handlerUp, true);  
                })
            },
            deep: true
        }
    },
    computed: {
        imgBox() {
            return document.getElementById('imgBox' + this.id)
        },
        imgSee() {
            return document.getElementById('imgSee' + this.id)
        }
    },
    methods: {
        setImgStyle(key, val) {
            this.imgStyle[key] += val
        },
        closePop() {
            this.imgStyle = {
                rotate: 0,
                scale: 1,
                top: 0,
                left: 0
            }
            this.move = {
                x: '',
                y: '',
                t: '',
                l: '',
                isDown: false
            }
            this.$emit('closePop')
        },
        handleScroll(e) {
            let deltaY = e.deltaY;
            if (deltaY < 0) {
                if (this.imgStyle.scale > 5) return
                this.imgStyle.scale = this.imgStyle.scale * 1.1
            } else {
                if (this.imgStyle.scale < 0.5) return
                this.imgStyle.scale = this.imgStyle.scale / 1.1
            }
        },
        handleDown(e) {
            e.preventDefault()
            this.move.isDown = true;
            this.move.x = e.clientX;
            this.move.y = e.clientY;
            this.move.l = this.imgStyle.left;
            this.move.t = this.imgStyle.top;
        },
        handlerMove(e) {
            if (this.move.isDown === false) {
                return;
            }
            let nx = e.clientX;
            let ny = e.clientY;
            let nl = nx - (this.move.x - this.move.l);
            let nt = ny - (this.move.y - this.move.t);
            this.imgStyle.top = nt;
            this.imgStyle.left = nl;
        },
        handlerUp(e) {
            this.move.isDown = false;
        }
    }
  }
</script>
<style lang="scss" scoped>
.preview-img{
  width: 520px;
  height: 520px;
  margin:10px auto 50px;
  line-height: 520px;
  position: relative;
  &:hover{
     .rotate-btn{
        display:block;
        opacity:1;
     } 
  }
  img{
    cursor: move;
    position: relative;
    vertical-align: middle;
    max-width: 520px;
    max-height: 520px;
  }
  .rotate-btn{
      opacity:0;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top:-30px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;     
      font-size: 48px;
      background-color: rgba(100,100,100,.3);
      color: #fff;
  }
}
</style>
