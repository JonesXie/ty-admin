<template>
  <section class="back-wrap report-form priceTable">
    <div class="title">价格辅表</div>
    <el-form :inline="true" class="topSearch">
      <el-form-item label="记录名称:">
        <el-input placeholder="记录名称" v-model="record_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" round @click="checkData">查询</el-button>
        <el-button type="success" round @click="record_name=null">
          <i>
            <svg-icon icon-class="icon-clean"></svg-icon>
          </i>
          <span>清空</span>
        </el-button>
        <el-button icon="el-icon-refresh" round class="reFresh" @click="getData">刷新</el-button>
        <el-button icon="el-icon-plus" round class="reFresh" @click="goAddPrice" type="success">添加</el-button>
        <el-button icon="el-icon-edit" round class="reFresh" @click="editorClick" type="warning">编辑</el-button>
      </el-form-item>
    </el-form>
    <div class="table-w">
      <el-table
        border
        stripe
        v-loading="tableLoading"
        :data="tableData"
        class="tableMod"
        ref="tableMod"
        style="width:100%"
      >
        <el-table-column width="55" align="center" :render-header="renderSelect">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="recordUid" label="uid" width="65" align="center"></el-table-column>
        <el-table-column prop="Dproduct" label="商品" align="center"></el-table-column>
        <el-table-column prop="priceSale" label="售价" align="center"></el-table-column>
        <el-table-column prop="priceInI" label="价格1" align="center"></el-table-column>
        <el-table-column prop="priceIn2i" label="价格2" align="center"></el-table-column>
        <el-table-column prop="priceIn3i" label="价格3" align="center"></el-table-column>
        <el-table-column prop="priceIn4i" label="价格4" align="center"></el-table-column>
        <el-table-column prop="priceIn5i" label="价格5" align="center"></el-table-column>
        <el-table-column prop="recordName" label="名称" align="center"></el-table-column>
        <el-table-column prop="info" label="描述" align="center"></el-table-column>
        <el-table-column prop="Daddtime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="Dupdatetime" label="修改时间" align="center"></el-table-column>
        <el-table-column prop="DsysType" label="系统类型" align="center"></el-table-column>
        <el-table-column prop="Dusertype" label="用户类型" align="center"></el-table-column>
        <el-table-column prop="Dstate" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <a class="editor" @click="editorClick(scope.row)">编辑</a> -->
            <a class="delete" @click="delClick(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="jxc-page tc">
      <el-pagination
        background
        @current-change="pageChange"
        layout="prev, pager, next"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        :current-page="currentPage"
        :total="pagTotal"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
import {
  getproduct_price_spe_byPages,
  deleteProductPrice_spe
} from "@/api/setting.js";
import {
  getproductInfo,
  getAttrbuteAndAttrbuteValuesByProClass
} from "@/api/product.js";
import {
  changeTime,
  returnSysType,
  returnUserType,
  returnSysState
} from "@/methods.js";
import { mapGetters } from "vuex";
export default {
  name: "priceTable",
  data() {
    return {
      record_name: null,
      tableLoading: false,
      tableData: [],
      pagTotal: 0,
      currentPage: 1,
      sysTypeObj: {},
      userTypeObj: {},
      stateObj: {},
      selectAll: false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    tableData: {
      handler: function(nv) {
        // console.log(nv);
        this.$refs.tableMod.doLayout();
      },
      deep: true
    }
  },
  created() {
    // 获取系统类型
    this.sysTypeObj = returnSysType();
    // 获取用户身份数据
    this.userTypeObj = returnUserType();
    // 获取状态
    this.stateObj = returnSysState();
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    //初次加载
    getData(val) {
      if (val !== "page") {
        this.currentPage = 1;
      }
      this.tableLoading = true;
      this.tableData = [];
      let _data = {
        init: false,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        record_name: this.record_name
      };
      this.getPageCount(_data);
      getproduct_price_spe_byPages(_data).then(({ data }) => {
        if (data.list !== null && data.list.length > 0) {
          this.dealData(data.list);
        } else {
          this.tableLoading = false;
        }
      });
    },
    //获取总页数
    getPageCount(opt) {
      opt = Object.assign({}, opt, { init: true });
      getproduct_price_spe_byPages(opt).then(({ data }) => {
        this.pagTotal = data.count;
      });
    },
    //处理数据
    dealData(fixData) {
      fixData.forEach((v, i, a) => {
        let upData = v;
        upData.checked = false;
        if (v.addtime != null) {
          upData.Daddtime = changeTime(v.addtime);
        } else {
          upData.Daddtime = "暂无";
        }
        if (v.updatetime != null) {
          upData.Dupdatetime = changeTime(v.updatetime);
        } else {
          upData.Dupdatetime = "暂无";
        }
        upData.DsysType = this.sysTypeObj[500];
        if (this.userTypeObj[v.usertype]) {
          upData.Dusertype = this.userTypeObj[v.usertype];
        } else {
          upData.Dusertype = "未知";
        }
        if (this.stateObj[v.state]) {
          upData.Dstate = this.stateObj[v.state];
        } else {
          upData.Dstate = "未知";
        }
        if (this.sysTypeObj[v.sysType]) {
          upData.DsysType = this.sysTypeObj[v.sysType];
        } else {
          upData.DsysType = "未知";
        }
        for (let key in upData) {
          if (upData[key] === null || upData[key] === undefined) {
            upData[key] = "暂无数据";
          }
        }
        this.tableData.splice(i, 1, upData);
        this.getProductInfo(v.productId, v.sonproductId, i);
        // return upData;
      });
      this.tableLoading = false;
    },
    // 获取商品信息
    getProductInfo(proId, sonId, index) {
      let changeData = this.tableData[index];
      getproductInfo(this.user.userId, proId).then(res => {
        let proName = res.data.pro.tProductTittle;
        let IDS = [];
        for (let j = 0; j < res.data.skus.length; j++) {
          if (res.data.skus[j].id == sonId) {
            IDS = res.data.skus[j].skuid.split("_"); // 属性值id组
            break;
          }
        }
        getAttrbuteAndAttrbuteValuesByProClass(res.data.pro.tProductClass).then(
          response => {
            let idsArr = [];
            IDS.forEach(id => {
              response.data.forEach(type => {
                for (let ind in type.attribute_values) {
                  if (type.attribute_values[ind].id === parseInt(id)) {
                    idsArr.splice(
                      idsArr.length,
                      0,
                      type.attribute_values[ind].tAttributeValueName
                    );
                  }
                }
              });
            });
            // callback(`${proName}  ${idsArr.join("-")}`);
            // this.tableData[index].Dproduct = `${proName}  ${idsArr.join("-")}`;
            changeData.Dproduct = `${proName}  ${idsArr.join("-")}`;
            this.tableData.splice(index, 1, changeData);
          }
        );
      });
    },
    //自定义全选
    renderSelect(h, { column }) {
      let self = this;
      return h("el-checkbox", {
        attrs: {
          value: self.selectAll
        },
        on: {
          change() {
            if (self.selectAll) {
              self.setAllselect(self.tableData, false);
              self.selectAll = false;
            } else {
              self.setAllselect(self.tableData, true);
              self.selectAll = true;
            }
          }
        }
      });
    },
    setAllselect(arr, val) {
      arr = arr.filter(v => (v.checked = val));
    },
    //自定义全选 end
    //查询
    checkData() {
      this.getData();
    },
    // 分页变化
    pageChange(val) {
      this.currentPage = val;
      this.getData("page");
    },

    //添加跳转
    goAddPrice() {
      this.$router.push("/setting/addPrice");
    },
    // 编辑
    editorClick() {
      let selectArr = this.tableData.filter(v => {
        if (v.checked) {
          return v;
        }
      });
      if (selectArr.length > 0) {
        this.$store.commit("SET_EDITORDATA", selectArr);
        this.$router.push("/setting/editorPrice");
      } else {
        this.$message.error("请选择要编辑的商品");
      }
    },
    // 删除
    delClick(opt) {
      deleteProductPrice_spe(opt.id).then(({ data }) => {
        this.$message(data.msgInFo);
        this.getData();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.priceTable {
  padding-bottom: 100px;
  .title {
    font-size: 16px;
    margin-bottom: 22px;
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
