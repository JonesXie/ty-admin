<template>
  <section class="getClass">
    <p>请选择所要设置分类的上一级</p>
    <el-cascader
      :options="classList1"
      v-model="selectedClass1"
      :props="classProps"
      placeholder="请选择分类"
      @change="classChange"
      class="chooseClass"
      v-if="type=='2'"
    ></el-cascader>
    <el-cascader
      :options="classList2"
      v-model="selectedClass2"
      :props="classProps"
      placeholder="请选择分类"
      @active-item-change="classItemClick"
      @change="classChange"
      class="chooseClass"
      v-else
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
      selectedClass1: [],
      selectedClass2: [],
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
    isReset: {
      handler: function(nv) {
        if (nv == true) {
          this.restData();
        }
      }
    }
  },
  created() {
    //获取第一级
    getFirstProClass().then(({ data }) => {
      this.classList1 = JSON.parse(JSON.stringify(data));
      this.classList2 = data.filter((v, i, a) => {
        v.children = [];
        return true;
      });
      // if (this.type == "3") {
      // } else {
      // }
    });
  },
  methods: {
    //分类
    classItemClick(val) {
      if (this.type == "3") {
        this.getSecondProClass(val);
      }
    },
    //二级分类
    getSecondProClass(val) {
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
    //三级分类
    getThirdProClass(val) {
      this.classList[this.firstIndex].children.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.secondIndex = i;
        }
      });
      getThirdProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this.classList[this.firstIndex].children[
            this.secondIndex
          ];
          delete _data.children;
          this.classList[this.firstIndex].children.splice(
            this.secondIndex,
            1,
            _data
          );
          this.$message("暂无数据");
        } else {
          this.classList[this.firstIndex].children[
            this.secondIndex
          ].children = data;
        }
      });
    },
    //最终获取
    classChange(val) {
      if (val.length == Number(this.type) - 1) {
        this.$emit("returnData", val[val.length - 1]);
      } else {
        this.selectedClass2 = [];
        this.$message({
          message: "此项不可选",
          type: "error"
        });
      }
    },
    restData() {
      this.selectedClass1 = [];
      this.selectedClass2 = [];
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
