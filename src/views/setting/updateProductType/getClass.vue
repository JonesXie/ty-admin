<template>
  <section class="getClass">
    <p>请选择所要修改的分类</p>
    <el-cascader
      :options="classList1"
      v-model="selectedClass1"
      :props="classProps"
      placeholder="请选择分类"
      @change="classChange"
      class="chooseClass"
      v-if="type=='1'"
    ></el-cascader>
    <el-cascader
      :options="classList2"
      v-model="selectedClass2"
      :props="classProps"
      placeholder="请选择分类"
      @active-item-change="classItemClick2"
      @change="classChange"
      class="chooseClass"
      v-else-if="type=='2'"
    ></el-cascader>
    <el-cascader
      :options="classList3"
      v-model="selectedClass3"
      :props="classProps"
      placeholder="请选择分类"
      @active-item-change="classItemClick3"
      @change="classChange"
      class="chooseClass"
      v-else-if="type=='3'"
    ></el-cascader>
  </section>
</template>

<script>
import {
  getFirstProClass,
  getSecondProClass,
  getThirdProClass
} from "@/api/product.js";
export default {
  name: "getClass",
  data() {
    return {
      classList1: [],
      classList2: [],
      classList3: [],
      selectedClass1: [],
      selectedClass2: [],
      selectedClass3: [],
      classProps: {
        value: "proclassSort",
        label: "proclassName"
      },
      firstIndex: null,
      secondIndex: null,
      threeIndex: null
    };
  },
  props: {
    type: {
      default: null
    },
    isReset: {}
  },
  components: {},
  watch: {
    type: {
      handler: function(nv) {
        if (nv == "1") {
          getFirstProClass().then(({ data }) => {
            this.classList1 = data;
          });
        } else {
          getFirstProClass().then(({ data }) => {
            this.classList3 = this.classList2 = data.filter((v, i, a) => {
              v.children = [];
              return true;
            });
          });
        }
      },
      immediate: true
    },
    isReset: {
      handler: function(nv) {
        if (nv == true) {
          this.restData();
        }
      }
    }
  },
  created() {},
  methods: {
    //分类2
    classItemClick2(val) {
      this.getSecondProClass2(val);
    },
    //二级分类2
    getSecondProClass2(val) {
      this.classList2.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.firstIndex = i;
        }
      });
      getSecondProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this.classList2[this.firstIndex];
          delete _data.children;
          this.classList2.splice(this.firstIndex, 1, _data);
          this.$message("暂无数据");
        } else {
          this.classList2[this.firstIndex].children = data;
          // data.forEach(v => this.$set(pushChild, pushChild.length, v));
        }
      });
    },
    //分类3
    classItemClick3(val) {
      if (val.length === 1) {
        this.getSecondProClass3(val);
      } else if (val.length === 2) {
        this.getThirdProClass3(val);
      }
    },
    //二级分类3
    getSecondProClass3(val) {
      this.classList3.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.firstIndex = i;
        }
      });
      getSecondProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this.classList3[this.firstIndex];
          delete _data.children;
          this.classList3.splice(this.firstIndex, 1, _data);
          this.$message("暂无数据");
        } else {
          this.classList3[this.firstIndex].children = data.filter((v, i, a) => {
            v.children = [];
            return true;
          });
        }
      });
    },
    //三级分类
    getThirdProClass3(val) {
      this.classList3[this.firstIndex].children.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.secondIndex = i;
        }
      });
      getThirdProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this.classList3[this.firstIndex].children[
            this.secondIndex
          ];
          delete _data.children;
          this.classList3[this.firstIndex].children.splice(
            this.secondIndex,
            1,
            _data
          );
          this.$message("暂无数据");
        } else {
          this.classList3[this.firstIndex].children[
            this.secondIndex
          ].children = data;
        }
      });
    },
    //最终获取
    classChange(val) {
      if (val.length == Number(this.type)) {
        if (val.length == 1) {
          this.getId("classList1", val[val.length - 1], 1);
        } else if (val.length == 2) {
          this.getId("classList2", val[val.length - 1], 2);
        } else {
          this.getId("classList3", val[val.length - 1], 3);
        }
      } else {
        this.selectedClass2 = [];
        this.selectedClass3 = [];
        this.$message({
          message: "此项不可选",
          type: "error"
        });
      }
    },
    getId(key, val, ind) {
      let returnData;
      if (ind === 1) {
        returnData = this[key].filter(v => v.proclassSort == val);
      } else if (ind === 2) {
        returnData = this[key][this.firstIndex].children.filter(
          v => v.proclassSort == val
        );
      } else {
        returnData = this[key][this.firstIndex].children[
          this.secondIndex
        ].children.filter(v => v.proclassSort == val);
      }
      this.$emit("returnData", returnData);
    },
    restData() {
      this.selectedClass1 = [];
      this.selectedClass2 = [];
      this.selectedClass3 = [];
    }
  }
};
</script>

<style scoped lang="scss">
.getClass {
  background: #f8f8f8;
  padding: 10px 0 40px 40px;
  max-width: 666px;
  .chooseClass {
    width: 233px;
  }
}
</style>
