<template>
  <div class="back-wrap report-form SettingSize">
    <div class="title">添加商品分类</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      v-if="handlerRefresh"
    >
      <el-form-item label="分类等级：">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">一级分类</el-radio>
          <el-radio label="2">二级分类</el-radio>
          <el-radio label="3">三级分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.type!=='1'">
        <getClass :type="ruleForm.type" @returnData="returnType" :isReset="upSuc"></getClass>
      </el-form-item>
      <el-form-item label="分类名称：" prop="proclassName">
        <el-input placeholder="分类名称" class="max_width" v-model="ruleForm.proclassName"></el-input>
      </el-form-item>
      <el-form-item label="分类序号：" prop="proclassOrder">
        <el-input placeholder="分类序号" class="max_width" v-model="ruleForm.proclassOrder"></el-input>
      </el-form-item>
      <el-form-item label="分类图片：" prop="smallImg">
        <imgs :only="true" @returnData="returnData('proclassImg',$event)"></imgs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" round class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addProClass } from "@/api/product";
import imgs from "@/components/formUpImgs";
import getClass from "./getClass.vue";
export default {
  name: "addProductType",
  computed: {
    ...mapGetters(["user"])
  },
  components: { imgs, getClass },
  data() {
    //验证规则
    const numberRules = (rules, value, callback) => {
      let reg = /^([1-9]\d*|[0]{1,1})$/; //含0正整数正则
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入数字"));
      }
    };
    return {
      handlerRefresh: true,
      ruleForm: {
        proclassName: null, //分类名
        type: "1", //1一级，2二级，3三级
        proclassSort: null, //分类pid
        proclassOrder: null, //分类排序序号
        proclassImg: null //分类图片
      },
      upSuc: false,
      rules: {
        proclassName: [
          { required: true, message: "分类名称不能为空！", triggle: "blur" }
        ],
        proclassOrder: [
          { required: true, message: "分类序号不能为空！", triggle: "blur" },
          { validator: numberRules, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    returnData(key, val) {
      this.ruleForm[key] = val;
    },
    returnType(val) {
      this.ruleForm.proclassSort = val;
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.type == "1") {
            this.realSubmit();
          } else if (this.ruleForm.proclassSort !== null) {
            this.realSubmit();
          } else {
            this.$message({
              message: "请选择所要设置分类的上一级",
              type: "error"
            });
          }
        } else {
          this.$message({
            message: "请完整填写表格",
            type: "error"
          });
        }
      });
    },
    realSubmit() {
      let _data = {
        proclassName: this.ruleForm.proclassName, //分类名
        type: this.ruleForm.type, //1一级，2二级，3三级
        proclassSort:
          this.ruleForm.type == "1" ? null : this.ruleForm.proclassSort, //分类pid
        proclassOrder: this.ruleForm.proclassOrder, //分类排序序号
        proclassImg: this.ruleForm.proclassImg //分类图片
      };
      addProClass(_data).then(({ data }) => {
        if (data.flag == 1) {
          this.$message(data.msgInFo);
          this.isInit();
        }
      });
    },
    isInit() {
      this.$refs.ruleForm.resetFields();
      this.upSuc = true; //重置
      this.ruleForm = {
        proclassName: null, //分类名
        type: "1", //1一级，2二级，3三级
        proclassSort: null, //分类pid
        proclassOrder: null, //分类排序序号
        proclassImg: null //分类图片
      };
      this.handlerRefresh = false;
      this.$nextTick(() => {
        this.handlerRefresh = true;
      });
    }
  },
  mounted() {
    // this.toSearch();
  }
};
</script>
<style lang="scss" scoped>
.SettingSize {
  padding-bottom: 100px;
  .title {
    font-size: 16px;
    margin-bottom: 22px;
  }
  .max_width {
    width: 240px;
  }
}
.submitBtn {
  margin-top: 50px;
}
</style>