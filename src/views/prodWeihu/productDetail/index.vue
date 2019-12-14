<template>
<div class="container prodet" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <!-- 商品详情.on -->
    <div class="det_info section  fix" >
        <!--图片显示-->
        <div class="showView" id="showView">
            <div class="bigView imgBox">
                <img v-if="mainImg" :src="mainImg" alt="">
                <img v-else src="@/assets/default_images/pro_img_default.jpg" />
            </div>
            <div class="preView">
              <i class="el-icon-arrow-left toLeft"  @click="topNavMove(-1)"></i>
               <i class="el-icon-arrow-right toRight" @click="topNavMove(1)"></i>
                <div class="li_box"  >
                  <div class="li_con" ref="toNav" :style="{right:topNavSite+'px'}">            
                      <el-radio-group class="tranList" v-model="curImgSmall" @change="curImgChange">
                          <el-radio class="imgBox" border v-for="item in prodImgs" :key="item.label" :label="item.label" >                              
                            <img :src="item.src" :alt="item.name">                           
                          </el-radio>                       
                      </el-radio-group> 
                    </div>                  
                </div>
            </div>
        </div>
        <!--商品信息-->
        <div class="phoneInfo">
            <div class="info_t">
                <h4>{{product.tittle}}</h4>
                <p>{{product.metaWord}}</p>
            </div>
            <!--价格-->
            <div class="box-bg">
                <div class="de_act Price">
                    <div class="de_name">
                        进货价：
                    </div>
                    <p>
                        <span class="price-n">￥{{buy.price}}</span>
                    <span class="stock-min"><i>{{buy.minCount}}</i>件起批</span>
                    </p>
                </div> 
                <div class="de_act send">
                    <div class="de_name">
                        库  存：
                    </div>
                    <p>
                        {{buy.count}}
                    </p>
                </div>             
            </div>
            <!--网络-->
            <div class="de_act" v-for="(proClass, index) in productAttr.name" :key="proClass">
                <div class="de_name">
                    {{proClass + "："}}
                </div>
                <div class="check_a">                    
                    <el-radio-group v-model="productAttr[proClass].selected" class="pro-attr"
                     @change="selectAttr(proClass, index)">
                      <el-radio border 
                        v-for="item in productAttr[proClass].name" 
                        :key="proClass+item" 
                        :label="productAttr[proClass][item].label" 
                        :disabled="productAttr[proClass][item].disabled"
                      >{{item}}</el-radio>                      
                    </el-radio-group>
                </div>
            </div>          
            <!--服务-->
            <div class="de_act">
                <div class="de_name">
                    服务：
                </div>
                <p>本商品售前售后服务由购买的代理商提供</p>
            </div>
            <!--数量-->
            <div class="de_act num">
                <div class="de_name">
                    数量：
                </div>
                <div class="num_act">
                    <el-input-number disabled v-model="buy.tCartCount" class="h40" :min="buy.minCount" ></el-input-number>                                 
                </div>
            </div>
            <!-- 操作 -->
            <div class="de_act butn">
                <el-row>
                    <el-button type="danger" class="submit-160w42" disabled>立即进货</el-button>
                    <el-button v-loading="btn_loading" type="warning" class="submit-160w42" disabled>加入进货架</el-button>
                </el-row>
            </div>
            <!--保证-->
            <div class="ensure fix">
                <a class="sureType">
                    <i>邮</i>
                    <span>全国包邮</span>
                </a>
                <a class="sureType">
                    <i>送</i>
                    <span>同城配送</span>
                </a>
                <a class="sureType">
                    <i>退</i>
                    <span>质量问题免费退换</span>
                </a>
            </div>
        </div>
    </div>
    <!-- 商品详情.end -->
    <div class="fix">
    <!-- 店铺信息.on -->
    <div class="section shop-w fl">
        <h3 class="shop-name">{{product.shopName}}</h3>
        <div class="info-list">
            <div class="item">
                <label>卖  家：<span></span></label>
                <div class="disc">{{product.shopName}}</div>
            </div>
            <div class="item">
                <label>所 在 地：<span></span></label>
                <div class="disc">{{product.address}}</div>
            </div>        
        </div>        
    </div>
    <!-- 店铺信息.end -->
    <!-- 商品详情 -->
    <div class="section prod-detail" >
      <div v-html="product.content">
      </div>
    </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getProductDetailby, fullname } from '@/api/product' 
export default {
  name:"productDetail",
  data() {
    return {
      prodImgs:[],
      curImgSmall: '',
      mainImg: '',
      //产品信息
      product: '', 
      // 产品属性
      productAttr: {
        name: []
      },
      // 产品库存价格等
      kuCun:{
        name: []
      },
      // 选中购买信息
      buy: {
        count: 0,
        price: 0,
        selected: '', //判断选择
        tCartCount: 1,
        tCartProid: '',
        tCartSonproid: '',
        lackAttr:'' //提示选择
      },
      topNavSite: 0,
      loading: true,
      btn_loading: false
    };
  },
  computed: {
      ...mapGetters([
          'user'
      ])
  },
  created() {
      let ProId = this.$route.params && this.$route.params.id;
      getProductDetailby(ProId).then((res) => {
        let data = res.data;
        this.loading = false;
        this.applyPage(data);
        this.initSelected();
      }).catch(() => {
        this.loading = false
      })
  },
  mounted() {

  },
  methods: {
    curImgChange(inx) {
      if (this.prodImgs[inx]) this.mainImg = this.prodImgs[inx].src;
      else this.mainImg = '';
    },
    // 属性选择
    selectAttr(proClass, index) {
      let cont = this.buy.selected ? this.buy.selected.split('_') : this.foreachName().split('_');
      let val = this.productAttr[proClass].selected;
      cont[index] = val;
      let str = cont.join('_');
      let exist = this.kuCun.name.find((val) => {
        return val === str
      })
      // console.log(`${proClass}——${index} ——${str}——${exist}`)
      if (!exist) {
        this.buy.selected = "";  
        this.curImgSmall = 0;
        this.curImgChange(0)
      } else this.setBuy(str);
      this.productAttr.name.forEach((ele, inx) => {
        if (inx <= index) {
          this.foreachValue(ele, (name, n) => {
              this.productAttr[ele][name].disabled = false;
          })
        }
        if (inx > index && !exist) {
          this.productAttr[ele].selected = "";
          this.foreachValue(ele, (name, n) => {
              this.productAttr[ele][name].disabled = true;
          })
        }
        if (inx === index + 1 || inx === index) {
          let regStr = cont.slice(0, inx).join('_');
          this.foreachValue(ele, (name, n) => {
              let reg = '^' + regStr;
              // console.log(`${ele}——${name}——${this.productAttr[ele][name].label}——${regStr}`)
              reg += inx ? '_' + this.productAttr[ele][name].label : '' + this.productAttr[ele][name].label;
              reg = new RegExp(reg)
              let disabled = false;
              this.kuCun.name.find((val) => {
                //console.log(`${inx}-${index}——${reg}——${val}——${reg.test(val)}`)
                  if (disabled) return;
                  disabled = reg.test(val) || disabled;
              })
              // console.log(`${inx}-${index}——${disabled}`)
              if (inx === index) {
                  if (!disabled) this.productAttr[ele][name].disabled = true;
                  else this.productAttr[ele][name].disabled = false;
              } else {
                  if (disabled) this.productAttr[ele][name].disabled = false;
                  else this.productAttr[ele][name].disabled = true;
                  if (!exist) this.buy.lackAttr = ele;
              }
          })
        }
      })
        // console.log('==============' + this.buy.selected + '===============')
    },
    //循环读属性
    foreachName(fn) {
        let selected = '';
        this.productAttr.name.forEach((name, inx) => {
            if (this.productAttr[name].selected) {
              if (inx !== 0) selected += '_'
              selected += this.productAttr[name].selected;
            }
            if (fn) fn(name, inx)
        })
        return selected;
    },
    // 循环读属性值
    foreachValue(proClass, fn) {
      this.productAttr[proClass].name.forEach((name, n) => {
        fn(name, n)
      })
    },
    // setBuy
    setBuy(selected) {
      this.curImgSmall = '';
      this.mainImg = this.kuCun[selected].tProductSkuImg;
      if (!this.mainImg) this.curImgChange(0)
      this.buy.selected = selected;
      this.buy.count = this.kuCun[selected].count;
      this.buy.price = this.kuCun[selected].price;
      this.buy.tCartProid = this.kuCun[selected].tCartProid;
      this.buy.tCartSonproid = this.kuCun[selected].tCartSonproid;
      this.buy.tProductSkuImg = this.kuCun[selected].tProductSkuImg;
      this.buy.attr = this.kuCun[selected].attr;
      this.buy.minCount = this.kuCun[selected].minCount;
      this.buy.tCartCount = this.kuCun[selected].minCount;
    },
    // 初始化选择
    initSelected() {
      if (!this.kuCun.name[0]) return
      let cont = this.kuCun.name[0].split('_')
      let selected = this.kuCun.name[0];
      this.setBuy(selected);
      this.productAttr.name.forEach((name, inx) => {
          this.productAttr[name].selected = parseInt(cont[inx]);
          this.selectAttr(name, inx)
      })
      this.buy.userid = this.user.userId;
    },
    /* 小图切换 */
     topNavMove(val) {
      const n = 88;
      const a = 88 * this.prodImgs.length;
      const width = parseInt(window.getComputedStyle(this.$refs.toNav).width);
      this.topNavSite += 88 * val;
      this.topNavSite =
      this.topNavSite < a - width ? this.topNavSite : a - width;
      this.topNavSite = this.topNavSite > 0 ? this.topNavSite : 0;         
    },
    // 渲染页面
    applyPage(data) {
       //配置渲染
       if (!data.list) return;
       data.list.forEach(ele => {
          this.setAttr(ele)
       });
       this.productAttr = Object.assign({}, this.productAttr);
       //标题、图片等
       this.product = {
          tittle: data.tittle, //商品标题
          metaWord: data.metaWord, //商品简介
          content: data.content, //商品介绍
          proSmallpic: data.proSmallpic, //商品小图
          proimg: data.proimg.split(';'), //商品图片
          tProductSkuParentid: data.tProductSkuParentid, //产品id
          shopid: data.shopid, //店铺id
          shopName: data.shopName, //店铺名
          address: '' //店铺地址
       }
       this.product.proimg.forEach((src, inx) => {
          this.prodImgs.push({
            label: inx,
            src: src,
            name: ''
          })
       })
       this.getFullName(data.region)
    },
    setAttr(data) {
      // 设置商品库存价格信息
      this.traverseAttr(this.kuCun, data.skuid, (obj, elValue, exist) => {
            obj[exist].count = data.count;
            obj[exist].tCartSonproid = data.id;
            obj[exist].price = data.tProductSkuSaleprice;
            obj[exist].tCartProid = data.tProductSkuParentid;
            obj[exist].attr = this.txtAttr(data.list);
            obj[exist].tProductSkuImg = data.tProductSkuImg;
            obj[exist].minCount = data.minCount ? data.minCount : 1;
      })
      // 产品属性信息_JSON格式
      data.list.forEach(ele => {
          let name = this.traverseAttr(this.productAttr, ele.key.tAttributeName)
          this.traverseAttr(this.productAttr[name], ele.value.tAttributeValueName, (obj, elValue, exist) => {
              obj.selected = '';
              obj[exist].label = ele.value.id;
              obj[exist].disabled = false;
          })
      });
    },
    txtAttr(data) {
        let str = ''
        let length = data.length - 1;
        data.forEach((element, index) => {
            str += element.key.tAttributeName + ': ';
            str += element.value.tAttributeValueName;
            if (length !== index) str += ' / ';
        });
        return str
    },
    // JSON生成
    traverseAttr(obj, elValue, fn) {
        let exist;
        exist = obj.name.find((value, index, arr) => {
            return value === elValue
        });
        if (!exist) {
            exist = elValue;
            obj.name.push(exist);
            obj[exist] = {};
            if (fn) {
              fn(obj, elValue, exist)
            } else {
              obj[exist].name = [];
            }
        }
        return exist;
    },
    //获取地区名
    getFullName(regionCode) {
        fullname(regionCode).then((res) => {
          this.product.address = res.data
        })
    }
  }
};
</script>
<style lang="scss" scoped>
$--color-primary: #4c8afd;
$danger: #f73b42;
/*------------------------商品详情-----------------------*/
.prodet {
  .stock-filter {
    height: 62px;
    padding: 12px 30px;
    & > span {
      font-weight: 600;
      color: #333;
      padding-right: 15px;
    }
  }
  .detail {
    border-top: 1px solid #e5e5e5;

    a {
      &.btn_buy {
        display: inline-block;
        width: 160px;
        height: 40px;
        border-radius: 2px;
        text-align: center;
        line-height: 40px;
        background: #ff0000;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .det_info {
    padding: 30px;
    min-height: 702px;
    background-color: #fff;
    .showView {
      float: left;
      font-size: 0;
    }
    .bigView {
      width: 414px;
      height: 447px;
      margin-bottom: 27px;
      text-align: center;
      line-height: 447px;
      border: 1px solid #ededed;
    }
    .preView {
      position: relative;
      height: 80px;
    }
    .tranList {
      height: inherit;  
        
      li {
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
        margin-right: 10px;
        border: 1px solid #e7e7e7;
        overflow: hidden;
      }
    }
    .phoneInfo {
      margin-left: 490px;
    }
    .info_t {
      height: 76px;
      h4 {
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        color: #333333;
        margin-bottom: 11px;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        color: #999999;
        height: 40px;
        overflow: hidden;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .de_act {
      position: relative;
      padding-left: 120px;
      line-height: 40px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #666666;
      .el-button + .el-button {
        margin-left: 24px;
      }
      &.butn {
        height: 42px;
      }
      .check_a {
        & > a {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          padding: 0 30px;
          border-radius: 2px;
          border: 1px solid #c9c9c9;
          color: #333333;
          &.active {
            border-color: $--color-primary;
          }
        }
      }
      &.color {
        padding-bottom: 17px;
        margin-bottom: 19px;
        border-bottom: 1px solid #e5e5e5;
        .check_a {
          & > a {
            display: inline-block;
            height: 46px;
            line-height: 46px;
            font-size: 0;
            width: 128px;
            border: 1px solid #c9c9c9;
            text-align: center;
            border-radius: 2px;
            margin-right: 15px;
            margin-bottom: 15px;
            padding: 0;
            & > * {
              font-size: 12px;
              vertical-align: middle;
            }
            &.active {
              border-color: $--color-primary;
            }
          }
          .color-txt {
            display: inline-block;
            text-align: left;
            padding: 4px;
            line-height: 18px;
            & > span {
              vertical-align: middle;
              display: inline-block;
            }
            em {
              display: block;
              font-size: 12px;
            }
          }
        }
        span {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-right: 10px;
          &.tuhao {
            background: #d6bda4;
          }
          &.meigui {
            background: #e8b4be;
          }
          &.bing {
            background: #c4c4c4;
          }
          &.chinared {
            background: #da383b;
          }
        }
      }
      &.num {
        margin-bottom: 30px;
        .num_act {
          position: relative;
          height: 40px;
          font-size: 0;
        }
        .a_btn {
          display: block;
          position: absolute;
          width: 18px;
          height: 17px;
          text-align: center;
          font-size: 16px;
          line-height: 14px;
          background: none;
          border: 1px solid #bfbfbf;
          outline: none;
          left: 74px;
        }
        a {
          &.add {
            top: 1px;
          }
          &.reduce {
            top: 22px;
          }
          &.on {
            color: #cfcfcf;
            border-color: #cfcfcf;
            cursor: default;
          }
        }
        span {
          display: inline-block;
          margin-left: 20px;
          color: #ff0000;
          font-size: 14px;
        }
        .buyNum {
          display: inline-block;
          width: 68px;
          height: 38px;
          border: 1px solid #bfbfbf;
          font-size: 14px;
          text-align: center;
          line-height: 38px;
          margin-right: 45px;
        }
      }
    }
    .de_name {
      position: absolute;
      width: 100px;
      top: 0;
      left: 0;     
      line-height: 20px;
      font-size: 14px;
      color: #999;
      text-align: left;
      padding: 10px 10px 10px 12px;
    }

    .box-bg {
      padding: 11px 0 14px;
      background: #f5f5f5;
      margin-bottom: 32px;
      font-size: 14px;
      .Price {
        p {
          .price-n {
            font-size: 26px;
            color: $danger;
            width: 150px;
            display: inline-block;
          }
          .stock-min {
            color: #999;
            i {
              color: #333;
              padding: 5px;
            }
          }
          i.del {
            text-decoration: line-through;
            line-height: 14px;
            margin-left: 10px;
            color: #666666;
          }
        }
      }
      .send {
        span {
          color: #333;
          padding: 0 15px;
        }
        i {
          color: #999;
        }
      }
      .de_act {
        margin-bottom: 0;
      }
    }
    .ensure {
      font-size: 0;
      padding-left: 10px;
      height: 30px;
      padding-top: 20px;
    }
    .sureType {
      display: block;
      float: left;
      font-size: 14px;
      color: #b7b7b7;
      line-height: 30px;
      margin-right: 42px;
      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
        border-radius: 50%;
        font-weight: bold;
        border: 1px solid #a6a6a6;
      }
    }
  }
  .preView{   
    height: 80px;    
    overflow: hidden;
    position: relative;
    padding: 0 35px;
    width: 412px;
  .toRight,
  .toLeft {
    cursor: pointer;
    position: absolute;
    top: 27px;
    right: 0;
    width: 26px;
    height: 26px;
    line-height: 26px;
    background: #ccc;
    opacity: 0.33;
    border-radius: 13px;
    color: #333;
    text-align: center;
    font-size: 18px;
    &:hover {
      opacity: 0.5;
    }
  }
  .toLeft{
    left: 0;
  }
  }
  .li_box {
    position: relative;
    overflow: hidden;
    .li_con{
      white-space: nowrap;
       position: relative;             
      transition: all 1s ease;
    }
  }
  .det_info .tranList li:hover,
  .det_info .tranList li.active {
    border-color: $--color-primary;
  }
  /*商品信息*/
  /*价格*/
  /*颜色*/
  /*数量*/
  /*保证*/
  /*手机购买*/
  .det_com {
    .buyPhone {
      border-top: 1px solid #e5e5e5;
      padding-top: 88px;
      padding-bottom: 150px;
      text-align: center;
      font-size: 0;
      h4 {
        font-weight: 400;
        color: #333333;
        font-size: 36px;
        line-height: 36px;
        margin-bottom: 112px;
      }
      img {
        display: inline-block;
      }
    }
  }
  .shop-w {
    width: 320px;
    margin: 0;
    padding: 30px;
    color: #333;
    h3 {
      font-weight: 600;
      font-size: 16px;
      border-bottom: 1px dashed #dedede;
      padding-bottom: 15px;
    }
    .shop-service {
      color: #666;
      padding: 21px 0;
      border-bottom: 1px solid #e5e5e5;
      & > label {   
          height: 36px;
          line-height: 36px;                 
          color: #666;
          display: inline-block;
          width: 80px;
          text-align: justify;
          overflow: hidden;
          &>span{
            padding-left: 100%;
            display: inline-block;
          }
        }
    }
    .info-list {
      padding: 20px 0;
      .item {
        line-height: 30px;
        
        & > label {
          height: 30px;
          color: #666;
          float: left;
          width: 80px;
          text-align: justify;
          overflow: hidden;
          &>span{
            padding-left: 100%;
            display: inline-block;
          }
        }
      }
    }
    .goin-btn {
      width: 100%;
      height: 36px;
      line-height: 34px;
      color: #333;
      background-color: #f3f3f3;
      border-color: #dedede;
    }
  }
  
  
}
</style>
<style lang="scss">
.prodet {
    .prod-detail {
        margin-left: 335px;
        padding: 15px;
        img {
            max-width: 100%;
            display: inline-block;
            margin: 0 auto;
        }
    }
}
</style>



