<template>
  <div class="back-wrap report-form SettingSize">
    <div class="title">修改商品分类</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      v-if="handlerRefresh"
    >
      <el-form-item label="修改的分类：">
        <el-radio-group v-model="type">
          <el-radio label="1">一级分类</el-radio>
          <el-radio label="2">二级分类</el-radio>
          <el-radio label="3">三级分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <getClass :type="type" @returnData="returnType" ref="getClass" :isReset="upSuc"></getClass>
      </el-form-item>
      <el-form-item label="分类名称：" prop="proclassName">
        <el-input placeholder="分类名称" class="max_width" v-model="ruleForm.proclassName"></el-input>
      </el-form-item>
      <el-form-item label="分类序号：" prop="proclassOrder" required>
        <el-input placeholder="分类序号" class="max_width" v-model="ruleForm.proclassOrder"></el-input>
      </el-form-item>
      <el-form-item label="分类图片：" prop="smallImg">
        <imgs
          :only="true"
          :initData="initImgs(ruleForm.proclassImg)"
          @returnData="returnData('proclassImg',$event)"
          v-if="imgRefresh"
        ></imgs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" round>提交修改</el-button>
        <el-button type="danger" @click="delForm()" round>删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateProClass, removeProClass } from "@/api/product";
import imgs from "@/components/formUpImgs";
import getClass from "./getClass";
export default {
  name: "updateProductType",
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
        callback(new Error("请输入正整数"));
      }
    };
    return {
      handlerRefresh: true,
      imgRefresh: true,
      type: "1", //1一级，2二级，3三级
      ruleForm: {
        id: null,
        proclassName: null, //分类名
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
          //   { required: true, message: "分类序号不能为空！", triggle: "change" },
          { validator: numberRules, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    type: {
      handler: function() {
        this.isInit();
      }
    }
  },
  methods: {
    returnData(key, val) {
      this.ruleForm[key] = val;
    },
    returnType(val) {
      this.ruleForm = JSON.parse(JSON.stringify(val[0]));
      this.imgRefresh = false;
      this.$nextTick(() => {
        this.imgRefresh = true;
      });
    },
    submitForm() {
      if (this.ruleForm.id !== null) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.realSubmit();
          } else {
            this.$message({
              message: "请完整填写表格",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "请选择所要修改的分类",
          type: "error"
        });
      }
    },
    //删除
    delForm() {
      if (this.ruleForm.id !== null) {
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //
            removeProClass(this.ruleForm.id).then(({ data }) => {
              this.$message(data.msgInFo);
              if (data.flag == 1) {
                this.isInit();
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择所要删除的分类",
          type: "error"
        });
      }
    },
    realSubmit() {
      updateProClass(this.ruleForm).then(({ data }) => {
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
        id: null,
        proclassName: null, //分类名
        proclassSort: null, //分类pid
        proclassOrder: null, //分类排序序号
        proclassImg: null //分类图片
      };
      this.handlerRefresh = false;
      this.$nextTick(() => {
        this.handlerRefresh = true;
      });
    },
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