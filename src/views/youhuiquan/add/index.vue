<template>
  <div class="back-wrap pg_yhq_add">
    <p class="title" v-if="id===null">添加优惠券信息</p>
    <p class="title" v-else>编辑优惠券信息</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="pya_ruleForm"
    >
      <el-form-item label="优惠券类型：">
        <el-select class="max_width" v-model="ruleForm.type">
          <el-option
            v-for="item in cardTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称：" prop="name">
        <el-input placeholder="优惠券名称" class="max_width" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="适用平台：">
        <el-select class="max_width" v-model="ruleForm.plat">
          <el-option
            v-for="item in platList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发行总量：" prop="release">
        <el-input
          placeholder="输入大于0的正整数,限10位内"
          class="max_width"
          v-model="ruleForm.release"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="面额：" prop="value">
        <el-input placeholder="输入单张面额" class="max_width" v-model="ruleForm.value" type="number"></el-input>
        <p class="pya_ruleForm_value">
          元
          <span>面值只能是大于0的正整数</span>
        </p>
      </el-form-item>
      <el-form-item label="每人限领：" required>
        <p>1张</p>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="limitValue" ref="limitValue">
        <el-radio-group v-model="ruleForm.useLimit" @change="limitChange">
          <el-radio label="0">无限制</el-radio>
          <el-radio label="1">
            满
            <el-input
              v-model="ruleForm.limitValue"
              class="pya_ruleForm_limit"
              type="number"
              :disabled="noLimit"
            ></el-input>元可用
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效期：" prop="dateRange" ref="dateRange">
        <el-radio label="0" v-model="ruleForm.date" @change="dateChange">
          日期范围
          <el-date-picker
            v-model="ruleForm.dateRange"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false"
            :disabled="!activeDate"
            class="pya_ruleForm_dateRange"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-radio>
      </el-form-item>
      <el-form-item label prop="dateNumber" ref="dateNumber">
        <el-radio label="1" v-model="ruleForm.date" @change="dateChange">
          固定天数
          <el-input
            v-model="ruleForm.dateNumber"
            class="pya_ruleForm_limit"
            type="number"
            :disabled="activeDate"
          ></el-input>天
        </el-radio>
      </el-form-item>
      <el-form-item label="可使用商品：">
        <el-radio-group v-model="ruleForm.useGoods">
          <el-radio v-for="item in cardFanWei" :key="item.label" :label="item.label">{{item.value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.useGoods === '2' || ruleForm.useGoods === '3'">
        <use-goods
          :isUse="ruleForm.useGoods"
          :userid="userid"
          :isReset="upSuc"
          :reShow="reShowData"
          ref="usingGoods"
        ></use-goods>
      </el-form-item>
    </el-form>
    <!-- 购物赠券 -->
    <from-shop
      v-if="ruleForm.type === '2'"
      ref="shop"
      :giveList="cardFanWei"
      :userid="userid"
      :isReset="upSuc"
      :reShow="shopReshow"
    ></from-shop>
    <!-- <from-register ref="register"></from-register> -->
    <el-button
      type="primary"
      @click="submitForm('ruleForm')"
      round
      class="submitBtn"
      v-if="id===null"
    >提交</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')" round class="submitBtn" v-else>提交修改</el-button>
  </div>
</template>

<script>
import UseGoods from "./UseGoods";
import FromShop from "./FromShop";
import FromRegister from "./FromRegister";
import Cookies from "js-cookie";
import {
  addCardInfo,
  getInfoSingle,
  updateCardInfo
} from "@/api/youhuiquan.js";
import {
  returnCardType,
  // returnCardInfoState,
  returnCardFw,
  changeTime
} from "@/methods.js";
export default {
  name: "add",
  components: { FromShop, FromRegister, UseGoods },
  data() {
    //验证规则
    const releaseRules = (rules, value, callback) => {
      let reg0 = /^([1-9]\d*|[0]{1,1})$/; //含0正整数正则
      let reg = /^[1-9]+\d*$/; //不含0正整数正则
      if (reg.test(value)) {
        if (value.length > 10) {
          callback(new Error("请输入小于等于10位数的正整数"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入大于0的正整数"));
      }
    };
    const valueRules = (rules, value, callback) => {
      let reg = /^[1-9]+\d*$/; //不含0正整数正则
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入大于0的正整数"));
      }
      // if (`${value}`.includes(".")) {
      //   let arr = value.split(".")[1].split("");
      //   if (arr.length > 2) {
      //     callback(new Error("面值限2位小数"));
      //   } else {
      //     callback();
      //   }
      // } else {
      //   callback();
      // }
    };
    const limitValue = (rules, value, callback) => {
      if (this.ruleForm.useLimit === "1") {
        if (value !== null && value !== "" && Number(value) > 0) {
          if (`${value}`.includes(".")) {
            let arr = value.split(".")[1].split("");
            if (arr.length > 2) {
              callback(new Error("面值限2位小数"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        } else {
          callback(new Error("面值必须大于0且不为空"));
        }
      } else {
        callback();
      }
    };
    const dateRangeRules = (rules, value, callback) => {
      if (this.ruleForm.date === "0") {
        if (value.length > 0) {
          callback();
        } else {
          callback(new Error("请选择日期范围"));
        }
      } else {
        callback();
      }
    };
    const dateNumberRules = (rules, value, callback) => {
      if (this.ruleForm.date === "1") {
        if (this.validValue(value)) {
          let reg = /^[1-9]+\d*$/; //不含0正整数正则
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正整数(不含0)"));
          }
        } else {
          callback(new Error("请填写天数"));
        }
      } else {
        callback();
      }
    };
    return {
      id: null,
      userid: null,
      upSuc: false,
      reShowData: null,
      shopReshow: null,
      cardTypeList: [],
      cardStateList: null,
      cardFanWei: [],
      platList: [
        {
          value: "1",
          label: "全平台通用"
        },
        {
          value: "2",
          label: "仅APP"
        },
        {
          value: "3",
          label: "仅WEB端"
        }
      ],
      noLimit: true,
      activeDate: true,
      ruleForm: {
        type: "3",
        name: null,
        plat: "1",
        release: null,
        value: null,
        useLimit: "0",
        limitValue: null,
        date: "0", //辅助参数
        dateRange: [],
        dateNumber: null,
        useGoods: "1"
      },
      rules: {
        name: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" }
        ],
        release: [
          { required: true, message: "请输入总发行量", trigger: "blur" },
          { validator: releaseRules, trigger: "blur" }
        ],
        value: [
          { required: true, message: "请输入单张面值", trigger: "blur" },
          { validator: valueRules, trigger: "blur" }
        ],
        limitValue: [{ validator: limitValue, trigger: "blur" }],
        dateRange: [{ validator: dateRangeRules, trigger: "change" }],
        dateNumber: [{ validator: dateNumberRules, trigger: "blur" }]
      }
    };
  },
  methods: {
    validValue(value) {
      if (value !== null && value !== "") {
        return true;
      } else {
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.dateChange();
        if (valid) {
          // this.submitAction({});
          //购物赠券
          if (this.ruleForm.type === "2") {
            let isShop = this.$refs.shop.isValid(); //如果验证出错，穿过来的是 false,如果正确传过来的是数据
            if (isShop !== false) {
              this.submitAction(isShop);
              //有shop
            } else {
              this.$message({
                message: "请完整填写表格",
                type: "error"
              });
            }
          } else {
            //无shop
            this.submitAction({});
          }
        } else {
          this.$message({
            message: "请完整填写表格",
            type: "error"
          });
        }
        //购物赠券
        if (this.ruleForm.type === "2") {
          //子节点的valid
          this.$refs.shop.isValid();
        }
      });
    },
    submitAction(putData) {
      let isLimit;
      let usingGoods;
      let isDate = {
        cardusingstarttime2: null,
        cardusingendtime2: null,
        cardusingday: null //可使用天数
      };
      if (this.ruleForm.useLimit === "0") {
        isLimit = this.ruleForm.useLimit;
      } else {
        isLimit = this.ruleForm.limitValue;
      }
      if (this.ruleForm.date === "0") {
        isDate.cardusingstarttime2 = this.ruleForm.dateRange[0];
        isDate.cardusingendtime2 = this.ruleForm.dateRange[1];
      } else {
        isDate.cardusingday = this.ruleForm.dateNumber;
      }
      if (this.ruleForm.useGoods === "1") {
        usingGoods = this.userid; //传userid后端进行处理成shopid
      } else {
        usingGoods = this.$refs.usingGoods.upUsingGoods();
      }
      let _data = {
        cardtype: this.ruleForm.type,
        cardname: this.ruleForm.name,
        cardarea: this.ruleForm.plat, //平台
        cardcount: this.ruleForm.release, //发行量
        cardamount: this.ruleForm.value, //面值
        cardlimit: isLimit,
        cardusingstarttime2: isDate.cardusingstarttime2,
        cardusingendtime2: isDate.cardusingendtime2,
        cardusingday: isDate.cardusingday, //可使用天数
        cardstate: 1, //卡卷状态
        cardusingpro: this.ruleForm.useGoods, //可使用商品
        cardusingproids: usingGoods,
        createUser: this.userid,
        userid: this.userid
      };
      Object.assign(_data, putData);
      if (_data.cardusingproids !== false) {
        if (this.id === null) {
          addCardInfo(_data).then(({ data }) => {
            this.$message(data.msgInFo);
            if (data.msgInFo === "添加成功") {
              this.$refs.ruleForm.resetFields();
              this.upSuc = true;
            }
          });
        } else {
          //修改
          Object.assign(_data, { id: this.id });
          updateCardInfo(_data).then(({ data }) => {
            this.$message(data.msgInFo);
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请填写可使用商品"
        });
      }
    },
    limitChange() {
      if (this.ruleForm.useLimit === "0") {
        this.$refs.limitValue.clearValidate();
        this.ruleForm.limitValue = null;
        this.noLimit = true;
      } else {
        this.noLimit = false;
      }
    },
    dateChange() {
      if (this.ruleForm.date === "0") {
        this.$refs.dateNumber.clearValidate();
        this.activeDate = true;
        this.ruleForm.dateNumber = null;
      } else {
        this.$refs.dateRange.clearValidate();
        this.activeDate = false;
        this.ruleForm.dateRange = [];
      }
    },
    fixType(data) {
      for (let key in data) {
        let _data = {
          value: key,
          label: data[key]
        };
        this.cardTypeList.splice(this.cardTypeList.length, 0, _data);
      }
    },
    fixArea(data) {
      for (let key in data) {
        let _data = {
          value: data[key],
          label: key
        };
        this.cardFanWei.splice(this.cardFanWei.length, 0, _data);
      }
    },
    //编辑
    getDetail() {
      let _data = {
        id: this.id,
        userid: this.userid
      };
      getInfoSingle(_data).then(({ data }) => {
        this.ruleForm.type = data.cardtype.toString();
        this.ruleForm.name = data.cardname;
        this.ruleForm.plat = data.cardarea.toString(); //平台
        this.ruleForm.release = data.cardcount; //发行量
        this.ruleForm.value = data.cardamount; //面值
        if (data.cardlimit === 0) {
          this.ruleForm.useLimit = "0";
        } else {
          this.ruleForm.useLimit = "1";
          this.ruleForm.limitValue = data.cardlimit;
          this.noLimit = false;
        }
        if (data.cardusingday === null || data.cardusingday === "") {
          this.ruleForm.date = "0";
          this.activeDate = true;
          let startTime = changeTime(data.cardusingstarttime);
          let endTime = changeTime(data.cardusingendtime);
          this.ruleForm.dateRange = [startTime, endTime];
        } else {
          this.ruleForm.date = "1";
          this.activeDate = false;
          this.ruleForm.dateNumber = data.cardusingday;
        }
        this.ruleForm.useGoods = data.cardusingpro.toString(); //可使用商品
        // cardusingproids: usingGoods,
        if (data.cardusingpro !== 1) {
          this.reShowData = data.cardusingproids;
        }
        this.shopReshow = data.getCardLimit; //传递给shop
      });
    }
  },
  mounted() {
    let isId = this.$route.params.id;
    this.userid = JSON.parse(Cookies.get("UserKey")).userId;
    returnCardType(this.fixType);
    returnCardFw(this.fixArea);
    if (isId !== undefined && isId !== null) {
      //是否是编辑
      this.id = isId;
      this.getDetail();
    }
    this.$nextTick(() => {
      this.dateChange();
    });
  }
};
</script>

<style scoped lang="scss">
.pg_yhq_add {
  .title {
    font-size: 16px;
    margin-bottom: 22px;
  }
  .max_width {
    width: 240px;
  }
  .pya_ruleForm_value {
    display: inline-block;
    margin-left: 12px;
    span {
      display: inline-block;
      color: #f73b42;
      margin-left: 18px;
    }
  }
  .pya_ruleForm_limit {
    width: 88px;
    margin: 0 10px;
  }
  .pya_ruleForm_dateRange {
    margin-left: 10px;
  }
  .submitBtn {
    margin-top: 50px;
    margin-left: 100px;
  }
}
</style>