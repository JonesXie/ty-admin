<template>
  <div class="mod_usegoods">
    <div class="goods" v-if="isUse === '2'">
      <el-form :inline="true">
        <el-form-item label="添加商品:" required>
          <el-input placeholder="商品名称" v-model="goodsSearch"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="openGoodsPop('search')">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-select v-model="selectedGoods" placeholder="请选择">
            <el-option
              v-for="item in goodsList"
              :key="item.value"
              :label="item.tittle"
              :value="item.id"
            ></el-option>
          </el-select>-->
          <el-button type="success" style="width:120px;" round @click="openGoodsPop('all')">查询所有商品</el-button>
        </el-form-item>
      </el-form>
      <div class="goods_left">
        <p class="gl_title">购买以下商品可使用优惠券抵扣金额</p>
        <div>
          <el-table border stripe :data="goodsDataShow" ref="tableMod" style="width:100%">
            <el-table-column prop="tittle" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="salePrice" label="商品价格" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a class="delete" @click="goodsDelet(scope.row)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="jxc-page tc">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            prev-text="上一页"
            next-text="下一页"
            :total="goodsTotal"
            @current-change="goodsPageChange"
            :current-page.sync="goodsCurrentPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="type" v-else-if="isUse === '3'">
      <el-form :inline="true">
        <el-form-item label="添加类别:" required>
          <el-cascader
            :options="classList"
            v-model="selectedClass"
            :props="classProps"
            placeholder="请选择类别"
            @active-item-change="classItemClick"
            @change="classChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round @click="addClassList">添加</el-button>
        </el-form-item>
      </el-form>
      <p class="gl_title">
        购买以下分类商品可使用优惠券抵扣金额&nbsp;已选中
        <span style="color:red">{{classTotal}}</span>个分类
      </p>
      <div>
        <el-table border stripe :data="classDataShow" style="width:100%">
          <el-table-column prop="className" label="分类名称"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <a class="delete" @click="classDelet(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="jxc-page tc">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          :total="classTotal"
          @current-change="classPageChange"
          :current-page.sync="classCurrentPage"
        ></el-pagination>
      </div>
    </div>
    <choose-goods
      :goodsPop="goodsPop"
      :userid="userid"
      :search="goodsSearch"
      @closePop="closeGoodsPop"
    ></choose-goods>
  </div>
</template>

<script>
import {
  getProductAdminPages,
  getFirstProClass,
  getSecondProClass,
  getThirdProClass,
  getAttrbuteAndAttrbuteValuesByProClass
} from "@/api/product.js";
import { GetProductByIds, getProClassThree } from "@/api/youhuiquan.js";
import ChooseGoods from "./ChooseGoods";
export default {
  name: "UseGoods",
  props: ["isUse", "userid", "isReset", "reShow"],
  data() {
    return {
      goodsList: [],
      selectedGoods: "",
      goodsData: [], //updata
      goodsDataShow: [],
      goodsCurrentPage: 1,
      goodsPop: false,
      goodsSearch: null,
      goodsChild: {},

      classList: [],
      selectedClass: [],
      classProps: {
        value: "proclassSort",
        label: "proclassName"
      },
      classData: [], //updata
      classDataShow: [],
      classCurrentPage: 1,
      firstIndex: null,
      secondIndex: null,
      threeIndex: null,
      activeNames: null
    };
  },
  components: {
    ChooseGoods
  },
  watch: {
    isUse: {
      handler: function(newValue, oldValue) {
        if (newValue === "2") {
          // this.getGoods();
        } else if (newValue === "3") {
          this.getClass1();
        }
      },
      immediate: true
    },
    goodsData() {
      this.goodsPageChange(this.classCurrentPage);
    },
    goodsDataShow: {
      handler: function(nv, ov) {
        if (nv[0].tittle === undefined || nv[0].tittle === null) {
          this.getGoodsInfo();
        }
      }
    },
    classData() {
      this.classPageChange(this.classCurrentPage);
    },
    isReset(newV, oldV) {
      if (newV === true) {
        this.classData = [];
        this.goodsData = [];
      }
    }
  },
  computed: {
    classTotal: function() {
      return this.classData.length;
    },
    goodsTotal: function() {
      return this.goodsData.length;
    }
  },
  methods: {
    goodsDelet(opt) {
      let Index;
      this.goodsData.forEach((v, i, a) => {
        if (v.id == opt.id) {
          Index = i;
        }
      });
      this.goodsData.splice(Index, 1);
    },
    goodsPageChange(val) {
      this.goodsDataShow = this.goodsData.filter((v, i, a) => {
        if (i >= (val - 1) * 10 && i < val * 10) {
          return true;
        }
      });
      if (this.goodsDataShow.length === 0 && this.goodsData.length !== 0) {
        this.goodsCurrentPage = this.goodsCurrentPage - 1;
        this.goodsPageChange(this.goodsCurrentPage);
      }
    },
    openGoodsPop(val) {
      if (val === "all") {
        this.goodsSearch = null;
        this.goodsPop = true;
      } else {
        if (this.goodsSearch === null) {
          this.$message({
            type: "error",
            message: "请输入搜索词"
          });
        } else {
          this.goodsPop = true;
        }
      }
    },
    //传回数据
    closeGoodsPop(val) {
      this.goodsPop = false;
      this.goodsSearch = null;
      let myArr = [];
      let myTips = false;
      val.forEach((v, i, a) => {
        if (this.goodsData.length > 0) {
          this.goodsData.forEach((val, ind, arr) => {
            if (v.id !== val.id) {
              myArr.splice(myArr.length, 0, v);
            } else {
              myTips = true;
            }
          });
        } else {
          myArr.splice(myArr.length, 0, v);
        }
      });
      if (myTips) {
        this.$message("已为您去除重复选择数据");
      }
      [...this.goodsData] = [...myArr, ...this.goodsData];
    },
    //根据productid获取信息
    getGoodsInfo(val) {
      let _data = this.goodsDataShow.map((v, i, a) => {
        return v.id;
      });
      GetProductByIds(_data).then(({ data }) => {
        this.goodsDataShow = data.map((v, i, a) => {
          let reData = {
            tittle: v.tProductTittle,
            id: v.id,
            salePrice: "￥" + v.tProductSaleprice
          };
          return reData;
        });
      });
    },

    //分类
    classItemClick(val) {
      if (val.length === 1) {
        this.getClass2(val, "classList");
      } else if (val.length === 2) {
        this.getClass3(val, "classList");
      }
    },
    classChange(val) {
      this.getClass4(val, "classList");
    },
    getClass1() {
      getFirstProClass().then(({ data }) => {
        this.classList = data.filter((v, i, a) => {
          v.children = [];
          return true;
        });
        this.goodsList = this.classList;
      });
    },
    getClass2(val, proName) {
      this[proName].forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.firstIndex = i;
        }
      });
      getSecondProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this[proName][this.firstIndex];
          delete _data.children;
          this[proName].splice(this.firstIndex, 1, _data);
          this.$message("暂无数据");
        } else {
          this[proName][this.firstIndex].children = data.filter((v, i, a) => {
            v.children = [];
            return true;
          });
        }
      });
    },
    getClass3(val, proName) {
      this[proName][this.firstIndex].children.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.secondIndex = i;
        }
      });
      getThirdProClass(val[val.length - 1]).then(({ data }) => {
        if (data.length === 0) {
          let _data = this[proName][this.firstIndex].children[this.secondIndex];
          delete _data.children;
          this[proName][this.firstIndex].children.splice(
            this.secondIndex,
            1,
            _data
          );
          this.$message("暂无数据");
        } else {
          if (proName === "classList") {
            [
              ...this[proName][this.firstIndex].children[this.secondIndex]
                .children
            ] = data;
          } else {
            this[proName][this.firstIndex].children[
              this.secondIndex
            ].children = data.filter((v, i, a) => {
              v.children = [];
              return true;
            });
          }
        }
      });
    },
    getClass4(val, proName) {
      this[proName][this.firstIndex].children[
        this.secondIndex
      ].children.forEach((v, i, a) => {
        if (v.proclassSort === val[val.length - 1]) {
          this.threeIndex = i;
        }
      });
    },
    addClassList() {
      if (this.selectedClass.length > 0) {
        let one = this.classList[this.firstIndex].proclassName;
        let two = this.classList[this.firstIndex].children[this.secondIndex]
          .proclassName;
        let three = this.classList[this.firstIndex].children[this.secondIndex]
          .children[this.threeIndex].proclassName;
        let _data = {
          className: `${one}>${two}>${three}`,
          id: this.selectedClass[this.selectedClass.length - 1]
        };
        if (this.classData.length > 0) {
          let isInclude = false;
          this.classData.forEach((v, i, a) => {
            if (v.id === _data.id) {
              isInclude = true;
            }
          });
          if (!isInclude) {
            this.classData.unshift(_data);
          } else {
            this.$message("您已添加过此分类");
          }
        } else {
          this.classData.unshift(_data);
        }
        this.selectedClass = [];
        this.classCurrentPage = 1;
      } else {
        this.$message({
          type: "error",
          message: "请选择后再添加"
        });
      }
    },
    classDelet(opt) {
      let Index;
      this.classData.forEach((v, i, a) => {
        if (v.id == opt.id) {
          Index = i;
        }
      });
      this.classData.splice(Index, 1);
    },
    classPageChange(val) {
      this.classDataShow = this.classData.filter((v, i, a) => {
        if (i >= (val - 1) * 10 && i < val * 10) {
          return true;
        }
      });
      if (this.classDataShow.length === 0 && this.classData.length !== 0) {
        this.classCurrentPage = this.classCurrentPage - 1;
        this.classPageChange(this.classCurrentPage);
      }
    },
    //根据classid获取信息
    getClassInfo(data) {
      getProClassThree(data).then(({ data }) => {
        data.forEach((v, i, a) => {
          let myArr = Object.values(v);
          let joinArr = [];
          myArr.forEach((val, ind, arr) => {
            joinArr.push(val.proclassName);
          });
          let _Arr = {
            id: myArr[myArr.length - 1].id,
            className: joinArr.join(">")
          };
          this.classData.splice(this.classData.length, 0, _Arr);
        });
      });
    },
    //上传
    upUsingGoods() {
      let _data;
      if (this.isUse === "2") {
        if (this.goodsData.length === 0) {
          _data = false;
        } else {
          let arr = this.goodsData.map((v, i, a) => {
            return v.id;
          });
          _data = arr.join(",");
        }
      } else {
        if (this.classData.length === 0) {
          _data = false;
        } else {
          let arr = this.classData.map((v, i, a) => {
            return v.id;
          });
          _data = arr.join(",");
        }
      }
      return _data;
    }
  },
  mounted() {
    let myData = this.reShow.split(",");
    let myArr = myData.map((v, i, a) => {
      let _data = {
        id: v
      };
      return _data;
    });
    if (this.isUse === "2") {
      [...this.goodsData] = [...myArr];
    } else {
      this.getClassInfo(myData);
      // [...this.classData] = [...myArr];
    }
  }
};
</script>

<style lang="scss" scoped>
.mod_usegoods {
  background: #f8f8f8;
  padding: 33px 0 40px 40px;
  .goods {
    display: block;
    position: relative;
  }
  .goods_left {
    width: 80%;
    max-width: 732px;
    display: inline-block;
    .gl_title {
      font-size: 12px;
      color: #666666;
      margin: 20px 0 14px 0;
    }
  }
  .goods_right {
    position: absolute;
    top: 100px;
    display: inline-block;
    padding-left: 2%;
    max-width: 183px;
    width: 19%;
  }
  .delete {
    color: red;
  }
  .type {
    width: 732px;
    display: inline-block;
    .gl_title {
      font-size: 12px;
      color: #666666;
      margin: 20px 0 14px 0;
    }
  }
}
.goods_right {
  & /deep/ .el-collapse-item__header {
    padding-left: 10px;
    background: #ebeef3;
  }
  & /deep/ .el-collapse-item__content {
    padding: 5px 10px;
  }
}
</style>
