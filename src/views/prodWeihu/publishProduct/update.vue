<template>
  <div class="b-w">
    <div class="section section-top clearfix">
      <span class="fr red">*为必填项</span>
      <div class="sec-l">
        商品修改：
        <label style="padding-left:18px;">{{productInfo.pro.tProductTittle}}</label>
      </div>
    </div>
    <div class="back-wrap">
      <div class="prod-info-body">
        <h3>商品基本信息</h3>
        <el-form v-loading="loading" :rules="rules" ref="editProdInfoForm" :model="productInfo.pro">
          <el-form-item label="商品名称：" prop="tProductTittle">
            <el-input style="width:200px" v-model="productInfo.pro.tProductTittle"></el-input>
          </el-form-item>
          <el-form-item label="商品描述：" prop="metaword">
            <el-input style="width:200px" v-model="productInfo.pro.metaword"></el-input>
          </el-form-item>
          <el-form-item label="商品标价：" prop="tProductPrice">
            <el-input
              style="width:200px"
              type="number"
              v-model.number="productInfo.pro.tProductPrice"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品售价：" prop="tProductSaleprice">
            <el-input
              style="width:200px"
              type="number"
              v-model.number="productInfo.pro.tProductSaleprice"
            ></el-input>
          </el-form-item>
          <productPara :initData="productInfo.pro.info" @returnData="returnData('info', $event)"></productPara>
          <!-- 商品赠品 -->
          <el-form-item label="赠送商品：">
            <el-button
              type="success"
              style="width:120px;"
              round
              @click="chooseGift=!chooseGift"
            >选择赠送的商品</el-button>
          </el-form-item>
          <el-form-item label v-show="chooseGift">
            <setGift :userid="user.userId" :allGifts="allGifts" @returnGift="returnGift"></setGift>
          </el-form-item>
          <!-- 商品赠品end -->
          <el-form-item label="商品小图：" class="pro-img-up" prop="tProductSmallpic">
            <imgs
              :initData="initImgs(productInfo.pro.tProductSmallpic)"
              :only="true"
              @returnData="returnData('tProductSmallpic', $event)"
            ></imgs>
          </el-form-item>
          <el-form-item label="网页端商品类图片:" class="pro-img-up" prop="tProductProimg">
            <imgs
              :multiple="true"
              :initData="initImgs(productInfo.pro.tProductProimg)"
              @returnData="returnData('tProductProimg', $event)"
            ></imgs>
          </el-form-item>
          <sku
            :initData="productInfo.skus"
            :proAttr="proAttr"
            @returnData="returnData('skus', $event)"
          ></sku>
          <el-form-item label="商品描述：" class="elFormUEditor" prop="content">
            <div style="padding-left:140px;max-width:1200px;">
              <UEditor
                :id="'proUpdata' + proId"
                :initData="productInfo.pro.content"
                class="web-pane"
                @returnData="returnData('content', $event)"
              ></UEditor>
            </div>
          </el-form-item>
          <el-form-item label="手机端商品详情:" class="m-detail">
            <div class="m-detail-box">
              <imgs
                class="m-detail-body scroll-box"
                :initData="initImgs(productInfo.pro.phone_imgs)"
                :multiple="true"
                :numControl="false"
                @returnData="returnData('phone_imgs', $event)"
              ></imgs>
            </div>
          </el-form-item>
          <modelid :initData="productInfo.pro.modelid" @returnData="returnData('modelId', $event)"></modelid>
          <el-form-item class="submit-bt tc">
            <el-button type="primary" round class="submit-160w42" @click="toDo()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UEditor from "@/components/UEditor/index";
import productPara from "./productPara";
import imgs from "@/components/formUpImgs";
import sku from "./sku";
import modelid from "./modelid";
import setGift from "./setGift.vue";
import {
  getAttrbuteAndAttrbuteValuesByProClass,
  getproductInfo,
  updateProduct
} from "@/api/product";
export default {
  name: "updateProduct",
  components: {
    UEditor,
    productPara,
    imgs,
    sku,
    modelid,
    setGift
  },
  data() {
    return {
      productInfo: {
        pro: {},
        skus: []
      },
      chooseGift: false, //赠品
      allGifts: null, //赠品
      proId: "",
      proAttr: "",
      loading: false,
      rules: {
        tProductTittle: [
          { required: true, message: "商品名称不能为空", triggle: "blur" }
        ],
        metaword: [
          { required: true, message: "商品描述不能为空", triggle: "blur" }
        ],
        tProductPrice: [
          {
            required: true,
            type: "number",
            message: "商品标价不能为空",
            triggle: "blur"
          }
        ],
        tProductSaleprice: [
          {
            required: true,
            type: "number",
            message: "商品售价不能为空",
            triggle: "blur"
          }
        ],
        tProductSmallpic: [{ required: true, message: "商品小图不能为空" }],
        tProductProimg: [
          { required: true, message: "商品类图片不能为空", triggle: "change" }
        ],
        skus: [{ required: true, message: "商品规格不能为空" }],
        modelid: [{ required: true, message: "运费模板不能为空" }]
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.proId = this.$route.params.id;
    getproductInfo(this.user.userId, this.proId).then(res => {
      this.productInfo = Object.assign({}, res.data);
      this.productInfo.pro.info = JSON.parse(this.productInfo.pro.info);
      let freeGift = res.data.pro.freegift;
      if (!["", null, undefined].includes(freeGift)) {
        this.chooseGift = true;
        this.allGifts = freeGift;
      } //是否含有赠品
      this.initSetProAttr(this.productInfo.pro.tProductClass);
    });
  },
  methods: {
    initImgs(imgs) {
      if (!imgs) return [];
      const arry = imgs.split(";");
      const rtn = [];
      arry.forEach(img => {
        rtn.push({
          url: img
        });
      });
      return rtn;
    },
    initSetProAttr(proClass) {
      getAttrbuteAndAttrbuteValuesByProClass(proClass)
        .then(res => {
          this.proAttr = res.data;
          this.loading = false;
          if (this.proAttr.length === 0) {
            this.$alert(
              "当前类目没有添加分类规格，请前往设置-分类规格添加！",
              "提示"
            );
            return;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    checkSku(skuArry) {
      if (skuArry === "" || skuArry.length === 0) {
        this.$message.error("请勾选生成的宝贝规格信息！");
        return false;
      }
      for (const inx in skuArry) {
        if (!skuArry[inx].count) {
          this.$message.error("所选宝贝规格中 数量错误！");
          return false;
        }
        if (!skuArry[inx].tProductSkuPrice) {
          this.$message.error("所选宝贝规格中 标价错误！");
          return false;
        }
        if (!skuArry[inx].tProductSkuSaleprice) {
          this.$message.error("所选宝贝规格中 售价错误！");
          return false;
        }
        if (!skuArry[inx].tProductSkuImg) {
          this.$message.error("所选宝贝规格中 图片未上传！");
          return false;
        }
      }
      return true;
    },
    toDo() {
      this.$refs["editProdInfoForm"].validate((valid, errors) => {
        if (valid) {
          if (!this.checkSku(this.productInfo.skus)) return;
          this.toSubmit();
        } else {
          let str = "";
          for (const key in errors) {
            str +=
              '<div><i class="el-icon-circle-close"></i> ' +
              errors[key][0].message +
              "</div>";
          }
          this.$message({
            message: str,
            type: "error",
            customClass: "msgUserHtml",
            duration: 3000,
            showClose: true,
            dangerouslyUseHTMLString: true
          });
          return false;
        }
      });
    },
    toSubmit() {
      this.$confirm("确认修改商品？", "提示", { type: "warning" })
        .then(() => {
          const opt = {
            pro: Object.assign({}, this.productInfo.pro),
            skus: Object.assign([], this.productInfo.skus)
          };
          opt.pro.info = JSON.stringify(opt.pro.info);
          opt.userid = this.user.userId;
          this.loading = true;
          updateProduct(opt)
            .then(res => {
              this.loading = false;
              if (res.data.flag <= 0)
                return this.$message.error(res.data.msgInFo);
              this.$store.dispatch("delCachedView", "storageProductManage"); // 关闭缓存
              this.$message.success("操作成功！");
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    returnData(key, val) {
      if (key === "skus") this.productInfo.skus = val;
      else this.productInfo.pro[key] = val;
      if (
        key === "skus" ||
        key === "info" ||
        key === "content" ||
        key === "phone_imgs"
      )
        return;
      this.$nextTick(() => {
        this.$refs.editProdInfoForm.validateField(key);
      });
    },
    //赠品返回
    returnGift(val) {
      this.productInfo.pro.freegift = val;
    }
  }
};
</script>
<style lang="scss" scoped>
$lable-w: 140px;
.b-w {
  .section-top {
    padding: 24px 30px;
    font-size: 14px;
    margin-bottom: 15px;
    margin-top: 0;
  }
  .prod-info-body {
    & > h3 {
      font-size: 16px;
      margin-bottom: 30px;
    }
    .el-form-item .el-form-item__label {
      width: 100px;
      text-align: right;
      display: inline-block;
    }
    .add-attr {
      margin-bottom: 20px;
      font-size: 0;
      line-height: 0;
      .el-input + * {
        margin-left: 20px;
      }
    }
  }
  .prod-intro {
    .web-pane {
      width: 68%;
      min-height: 500px;
    }
  }
  .afterSale-con {
    .el-checkbox {
      display: block;
      margin-left: 0;
      .el-checkbox__label {
        font-size: 12px;
      }
    }
  }
  .submit-bt {
    border-top: 1px solid #dcdcdc;
    padding-top: 40px;
  }
}
.el-form-item /deep/ .el-form-item__label {
  color: #fd9900;
}
</style>
<style lang="scss">
@import "productinfo.scss";
</style>

