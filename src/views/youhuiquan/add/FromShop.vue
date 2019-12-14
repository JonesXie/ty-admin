<template>
  <el-form ref="ruleForm" label-width="110px" :model="ruleForm" :rules="rules" class="mod_fromshop">
    <el-form-item label="获取门槛：" prop="arrive">
      满
      <el-input class="min_width" v-model="ruleForm.arrive" type="number"></el-input>元可得优惠券
    </el-form-item>
    <!-- <el-form-item label="可赠券商品：">
      <el-radio-group v-model="ruleForm.giveGoods">
        <el-radio v-for="item in giveList" :key="item.label" :label="item.label">{{item.value}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="ruleForm.giveGoods === '2' || ruleForm.giveGoods === '3'">
      <use-goods :isUse="ruleForm.giveGoods" :userid="userid" :isReset="isReset" ref="usingGoods"></use-goods>
    </el-form-item>-->
    <!-- <el-form-item label="参与会员：">
      <el-radio-group v-model="ruleForm.member">
        <el-radio label="0">全部会员</el-radio>
        <el-radio label="1">普通会员</el-radio>
        <el-radio label="2">黄金会员</el-radio>
        <el-radio label="2">钻石会员</el-radio>
      </el-radio-group>
    </el-form-item>-->
  </el-form>
</template>

<script>
import UseGoods from "./UseGoods";
export default {
  name: "FromShop",
  props: ["giveList", "userid", "isReset", "reShow"],
  data() {
    //规则
    const arriveRules = (rules, value, callback) => {
      let reg = /^([1-9]\d*|[0]{1,1})$/; //含0正整数正则
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入大于等于0的正整数"));
      }
    };
    return {
      ruleForm: {
        arrive: null,
        giveGoods: "1"
        // member: "1"
      },
      rules: {
        arrive: [
          { required: true, message: "请输入满减值", trigger: "blur" },
          { validator: arriveRules, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    isReset(newV, oldV) {
      if (newV === true) {
        this.ruleForm = {
          arrive: null,
          giveGoods: "1"
        };
      }
    }
  },
  components: { UseGoods },
  methods: {
    isValid() {
      let isVal;
      this.$refs.ruleForm.validate(valid => {
        isVal = valid;
      });
      if (isVal) {
        //不需要可赠券商品
        let upData = {
          getCardLimit: this.ruleForm.arrive
          // giveGoods: this.ruleForm.giveGoods,
          // usingGoods: usingGoods
        };
        return upData;

        //需要可赠券商品
        // let usingGoods;
        // if (this.ruleForm.giveGoods === "1") {
        //   usingGoods = this.userid;
        // } else {
        //   usingGoods = this.$refs.usingGoods.upUsingGoods();
        // }
        // if (usingGoods === false) {
        //   this.$message({
        //     type: "error",
        //     message: "请选择可赠券商品"
        //   });
        //   return false;
        // } else {
        //   let upData = {
        //     getCardLimit: this.ruleForm.arrive,
        //     giveGoods: this.ruleForm.giveGoods,
        //     usingGoods: usingGoods
        //   };
        //   return upData;
        // }
      } else {
        return isVal;
      }
    }
  },
  mounted() {
    this.ruleForm.arrive = this.reShow;
  }
};
</script>

<style scoped lang="scss">
.mod_fromshop {
  .max_width {
    width: 240px;
  }
  .min_width {
    width: 100px;
  }
}
</style>