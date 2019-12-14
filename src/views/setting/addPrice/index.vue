<template>
  <section class="back-wrap report-form addPrice">
    <div class="title">{{title}}</div>
    <el-form :model="formData" ref="form" label-width="110px">
      <el-form-item label="选择商品:" required>
        <chooseProduct
          v-if="add"
          :userid="user.userId"
          :prodOpt="prodOpt"
          :addAttrAll="addAttrAll"
          @returnGift="returnGift"
        ></chooseProduct>
        <chooseProduct
          v-else
          :productInfo="productInfo"
          :userid="user.userId"
          :prodOpt="prodOpt"
          :addAttrAll="addAttrAll"
          @returnGift="returnGift"
        ></chooseProduct>
      </el-form-item>
      <div class="title">批量修改属性：</div>
      <el-form-item label="名称:" prop="recordName">
        <el-input placeholder="请输入记录名称" class="max_width" v-model="formData.recordName"></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="info">
        <el-input placeholder="请输入描述" class="max_width" v-model="formData.info"></el-input>
      </el-form-item>
      <el-form-item label="售价:" prop="priceSale">
        <el-input
          placeholder="请输入售价"
          class="max_width"
          type="number"
          v-model="formData.priceSale"
          @change="validSale($event,'formData','priceSale')"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格1:" prop="priceInI">
        <el-input
          placeholder="请输入价格1"
          class="max_width"
          type="number"
          v-model="formData.priceInI"
          @change="validPrice($event,'formData','priceInI')"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格2:" prop="priceIn2i">
        <el-input
          placeholder="请输入价格2"
          class="max_width"
          type="number"
          v-model="formData.priceIn2i"
          @change="validPrice($event,'formData','priceIn2i')"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格3:" prop="priceIn3i">
        <el-input
          placeholder="请输入价格3"
          class="max_width"
          type="number"
          v-model="formData.priceIn3i"
          @change="validPrice($event,'formData','priceIn3i')"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格4:" prop="priceIn4i">
        <el-input
          placeholder="请输入价格4"
          class="max_width"
          type="number"
          v-model="formData.priceIn4i"
          @change="validPrice($event,'formData','priceIn4i')"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格5:" prop="priceIn5i">
        <el-input
          placeholder="请输入价格5"
          class="max_width"
          type="number"
          v-model="formData.priceIn5i"
          @change="validPrice($event,'formData','priceIn5i')"
        ></el-input>
      </el-form-item>
      <el-form-item label="系统类型:" prop="sysType">
        <el-select class="max_width" v-model="formData.sysType">
          <el-option
            v-for="(item,key,index) in sysTypeList"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户身份类型:" prop="usertype">
        <el-select class="max_width" v-model="formData.usertype">
          <el-option
            v-for="(item,key,index) in userTypeList"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="state" v-if="!add">
        <el-select class="max_width" v-model="formData.state">
          <el-option v-for="(item,key,index) in stateList" :key="index" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="addAttr" round style="width:120px;">批量添加属性</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" v-if="add" round>确认添加</el-button>
        <el-button type="primary" @click="submitFix" v-else round>提交修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  returnSysType,
  returnUserType,
  returnSysState,
  notNull
} from "@/methods.js";
import { addProductPrice_spe, updateProductPrice_spe } from "@/api/setting.js";
import chooseProduct from "./chooseProduct";
export default {
  name: "addPrice",
  data() {
    return {
      add: true,
      title: "添加价格辅表",
      initData: null,
      productInfo: null,
      product: false,
      sysTypeList: {},
      userTypeList: {},
      stateList: {},
      addAttrAll: {},
      updataArr: [],
      formData: {
        recordName: null, //记录名称
        info: null, //描述,
        priceSale: null, //价格
        priceInI: "0", //价格1
        priceIn2i: "0", //价格2
        priceIn3i: "0", //价格3
        priceIn4i: "0", //价格4
        priceIn5i: "0", //价格5
        // productId: null, //产品id
        // sonproductId: null, //产品sonProId
        sysType: null, //系统类型
        usertype: null, //用户身份类型
        state: null //用户身份类型
      }
    };
  },
  components: { chooseProduct },
  watch: {
    sysTypeList: {
      handler: function(nv) {
        this.formData.sysType = Object.keys(nv)[0];
      },
      immediate: true,
      deep: true
    },
    userTypeList: {
      handler: function(nv) {
        this.formData.usertype = Object.keys(nv)[0];
      },
      immediate: true,
      deep: true
    },
    stateList: {
      handler: function(nv) {
        this.formData.state = Object.keys(nv)[0];
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // 获取系统类型
    returnSysType(val => {
      this.sysTypeList = val;
    });
    // 获取用户身份数据
    returnUserType(val => {
      this.userTypeList = val;
    });

    if (this.$route.name == "editorPrice") {
      this.add = false;
      this.title = "修改价格辅表";
      if (notNull(this.$store.state.editorData)) {
        sessionStorage.setItem(
          "priceDditor",
          JSON.stringify(this.$store.state.editorData)
        );
      }
      this.initData = JSON.parse(sessionStorage.getItem("priceDditor"));
      // 获取状态
      returnSysState(val => {
        this.stateList = val;
      });
      //初始化
      this.productInfo = this.initData;
    }
  },
  computed: {
    ...mapGetters(["user", "visitedViews"]),
    prodOpt() {
      return {
        sysTypeList: this.sysTypeList,
        userTypeList: this.userTypeList,
        stateList: this.stateList,
        add: this.add
      };
    }
  },
  methods: {
    // 批量添加
    addAttr() {
      if (notNull(this.formData.priceSale)) {
        this.$confirm("此操作将替换所有的属性，是否进行？", "提示", {
          type: "warning"
        })
          .then(() => {
            this.addAttrAll = JSON.parse(JSON.stringify(this.formData));
          })
          .catch(() => {});
      } else {
        this.$message("请填写售价");
      }
    },
    // 选择商品返回
    returnGift(val) {
      if (val) {
        this.updataArr = val;
        this.product = true;
      } else {
        this.product = false;
      }
    },
    // 添加提交数据
    submitForm() {
      let _this = this;
      if (this.product) {
        if (this.isSale(this.updataArr, "priceSale")) {
          addProductPrice_spe(this.updataArr).then(({ data }) => {
            this.$message(data.msgInFo);
            if (data.flag == 1) {
              setTimeout(() => {
                _this.closePage();
              }, 3000);
            }
          });
        } else {
          this.$message({
            message: "请完整填写售价",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "请选择商品",
          type: "error"
        });
      }
    },
    //  提交修改数据
    submitFix() {
      let _this = this;
      let _data = this.updataArr.map(v => {
        return {
          id: v.id,
          info: v.info,
          priceIn2i: v.priceIn2i,
          priceIn3i: v.priceIn3i,
          priceIn4i: v.priceIn4i,
          priceIn5i: v.priceIn5i,
          priceInI: v.priceInI,
          priceSale: v.priceSale,
          productId: v.productId,
          recordName: v.recordName,
          recordUid: v.recordUid,
          sonproductId: v.sonproductId,
          state: v.state,
          sysType: v.sysType,
          usertype: v.usertype
        };
      });
      if (this.isSale(_data, "priceSale")) {
        updateProductPrice_spe(_data).then(({ data }) => {
          this.$message(data.msgInFo);
          if (data.flag == 1) {
            setTimeout(() => {
              _this.closePage();
            }, 3000);
          }
        });
      } else {
        this.$message({
          message: "请完整填写售价",
          type: "error"
        });
      }
    },
    //关闭窗口
    closePage() {
      this.visitedViews.forEach(element => {
        this.$store.dispatch("delVisitedViews", element).then(views => {
          this.$router.push("/setting/priceTable");
        });
        // if (element.title === this.$options.name) {
        // }
      });
    },
    //验证售价
    validSale(val, site, site2 = null) {
      let reg = /^([1-9]\d*|[0]{1,1})$/;
      // console.log(val, this[site][site2]);
      if (!reg.test(Number(val)) || !notNull(val)) {
        this[site][site2] = null;
      }
    },
    //验证价格
    validPrice(val, site, site2 = null) {
      let reg = /^([1-9]\d*|[0]{1,1})$/;
      // console.log(val, this[site][site2]);
      if (!reg.test(Number(val)) || !notNull(val)) {
        this[site][site2] = "0";
      }
    },
    // 售价不为空
    isSale(arr, name) {
      for (let i in arr) {
        if (!notNull(arr[i][name])) {
          return false;
          break;
        }
      }
      return true;
    }
  },
  destroyed() {
    // sessionStorage.removeItem("priceDditor");
  }
};
</script>

<style scoped lang="scss">
.addPrice {
  padding-bottom: 100px;
  .title {
    font-size: 16px;
    margin-bottom: 22px;
  }
  .max_width {
    width: 240px;
    /deep/ .el-input__inner {
      text-align: left;
    }
  }
  .table-w {
    margin-top: 20px;
  }
  .look {
    color: #4c8afd;
  }
  .editor {
    color: #56b987;
  }
  .delete {
    color: #f73b42;
  }
  .pause {
    color: #fd694c;
  }
}
</style>
