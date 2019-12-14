<template>
  <div class="b-w">
    <div class="section section-top clearfix">
      <span class="fr red">*为必填项</span>
      <div class="sec-l">
        商品类目：
        <label style="padding-left:18px;">{{proName}}</label>
      </div>
    </div>
    <div class="back-wrap" v-if="handlerRefresh">
      <div class="prod-info-body">
        <h3>商品基本信息</h3>
        <el-form :rules="rules" ref="prodInfoForm" :model="addProd">
          <el-form-item label="商品名称：" prop="proTittle">
            <el-input style="width:200px" v-model="addProd.proTittle"></el-input>
          </el-form-item>
          <el-form-item label="商品描述：" prop="metaWords">
            <el-input style="width:200px" v-model="addProd.metaWords"></el-input>
          </el-form-item>
          <el-form-item label="商品标价：" prop="price">
            <el-input style="width:200px" type="number" v-model.number="addProd.price"></el-input>
          </el-form-item>
          <el-form-item label="商品售价：" prop="salePrice">
            <el-input style="width:200px" type="number" v-model.number="addProd.salePrice"></el-input>
          </el-form-item>
          <productPara @returnData="returnData('productPara', $event)"></productPara>
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
            <setGift :userid="user.userId" @returnGift="returnGift"></setGift>
          </el-form-item>
          <!-- 商品赠品end -->
          <el-form-item label="商品小图：" class="pro-img-up" prop="smallImg">
            <imgs :only="true" @returnData="returnData('smallImg', $event)"></imgs>
          </el-form-item>
          <el-form-item label="网页端商品类图片:" class="pro-img-up" prop="imgs">
            <imgs :multiple="true" @returnData="returnData('imgs', $event)"></imgs>
          </el-form-item>
           <!-- 商品规格-->
          <sku :type="'add'" :priceModel="priceModel" :proAttr="proAttr" @returnData="returnData('sku', $event)"></sku>
           <!-- 商品规格end -->
          <el-form-item label="电脑端商品详情：" class="elFormUEditor">
            <div style="padding-left:140px;max-width:1200px;">
              <UEditor
                :id="'pro' + proClass"
                class="web-pane"
                @returnData="returnData('contents', $event)"
              ></UEditor>
            </div>
            <!-- <el-tabs @tab-click="1" class="item-con prod-intro">
                        <el-tab-pane label="电脑端" name="web">
                        </el-tab-pane>
                        <el-tab-pane label="手机端" name="mobile">暂未开发</el-tab-pane>         
            </el-tabs>-->
          </el-form-item>
          <el-form-item label="手机端商品详情:" class="m-detail">
            <div class="m-detail-box">
              <imgs
                class="m-detail-body scroll-box"
                :multiple="true"
                :numControl="false"
                @returnData="returnData('phone_imgs', $event)"
              ></imgs>
            </div>
          </el-form-item>
          <modelid :type="1" @returnData="returnData('modelId', $event)"></modelid>
          <el-form-item class="submit-bt tc">
            <el-button type="primary" round class="submit-160w42" @click="toPublic()">发布</el-button>
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
  addProduct
} from "@/api/product";
export default {
  name: "publishProductAdd",
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
      addProd: {
        proclass: "", // 产品分类
        proTittle: "", // 产品名称
        metaWords: "", // 描述
        price: "", // 产品标价
        salePrice: "", // 产品售价
        proUnite: 1, // 产品单位
        productPara: "", // 详情描述，以json字符串
        imgs: "", // 产品集合
        smallImg: "", // 产品小图
        sku: "", // sku集合生成变体,值不能为空
        modelId: "", // 快递模板id
        contents: "", // 图文并茂 描述
        phone_imgs: "", // 手机详情
        userid: "",
        free_Gifts: "" //赠品集合
      },
      chooseGift: false, //赠品
      handlerRefresh: true,
      proName: "",
      proClass: "",
      proAttr: "",
      loading: false,
      rules: {
        proTittle: [
          { required: true, message: "商品名称不能为空！", triggle: "blur" }
        ],
        metaWords: [
          { required: true, message: "商品描述不能为空！", triggle: "blur" }
        ],
        price: [
          {
            required: true,
            type: "number",
            message: "商品标价不能为空！",
            triggle: "blur"
          }
        ],
        salePrice: [
          {
            required: true,
            type: "number",
            message: "商品售价不能为空！",
            triggle: "blur"
          }
        ],
        smallImg: [{ required: true, message: "商品小图不能为空！" }],
        imgs: [{ required: true, message: "商品类图片不能为空！" }],
        sku: [{ required: true, message: "商品规格不能为空！" }],
        modelId: [{ required: true, message: "运费模板不能为空！" }]
      }
    };
  },
  computed: {
    ...mapGetters(["user"]),
    priceModel(){
      return {
        price:this.addProd.price,
        salePrice:this.addProd.salePrice,
      }
    }
  },
  created() {
    this.proClass = this.$route.params.id;
    this.proName = this.$route.query.proClassName;
    getAttrbuteAndAttrbuteValuesByProClass(this.proClass)
      .then(res => {
        if (res.data.length === 0) {
          this.$alert(
            "当前类目没有添加分类规格，请前往设置-分类规格添加！",
            "提示"
          );
          return;
        }
        this.proAttr = res.data;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
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
        if (!skuArry[inx].price) {
          this.$message.error("所选宝贝规格中 标价错误！");
          return false;
        }
        if (!skuArry[inx].salePrice) {
          this.$message.error("所选宝贝规格中 售价错误！");
          return false;
        }
        if (!skuArry[inx].skuImg) {
          this.$message.error("所选宝贝规格中 图片未上传！");
          return false;
        }
      }
      return true;
    },
    toPublic() {
      this.$refs["prodInfoForm"].validate((valid, errors) => {
        if (valid) {
          if (!this.checkSku(this.addProd.sku)) return;
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
            showClose: true,
            dangerouslyUseHTMLString: true
          });
          // this.$message.error('您所输入的信息有误，请检查输入！')
          return false;
        }
      });
    },
    toSubmit() {
      this.$confirm("确认添加商品？", "提示", { type: "warning" })
        .then(() => {
          this.loading = true;
          const opt = Object.assign({}, this.addProd);
          opt.productPara = JSON.stringify(this.addProd.productPara);
          opt.userid = this.user.userId;
          opt.proclass = this.proClass;
          addProduct(opt)
            .then(res => {
              this.loading = false;
              if (res.data.flag <= 0)
                return this.$message.error(res.data.msgInFo);
              this.$message.success("发布成功！");
              this.initData();
              this.$store.dispatch("delCachedView", "storageProductManage"); // 关闭缓存
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    returnData(key, val) {
      this.addProd[key] = val;
      if (
        key === "sku" ||
        key === "productPara" ||
        key === "contents" ||
        key === "phone_imgs"
      )
        return;
      this.$nextTick(() => {
        this.$refs.prodInfoForm.validateField(key);
      });
    },
    //赠品返回
    returnGift(val) {
      this.addProd.free_Gifts = val;
    },
    initData() {
      this.addProd = {
        proclass: "", // 产品分类
        proTittle: "", // 产品名称
        metaWords: "", // 描述
        price: "", // 产品标价
        salePrice: "", // 产品售价
        proUnite: 1, // 产品单位
        productPara: "", // 详情描述，以json字符串
        imgs: "", // 产品集合
        smallImg: "", // 产品小图
        sku: "", // sku集合生成变体,值不能为空
        modelId: "", // 快递模板id
        contents: "", // 图文并茂 描述
        userid: "",
        free_Gifts: "" //赠品集合
      };
      this.handlerRefresh = false;
      this.$nextTick(() => {
        this.handlerRefresh = true;
      });
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
</style>
<style lang="scss">
@import "productinfo.scss";
</style>

