<template>
  <div class="app-dialog">
    <el-dialog title="添加商品" :visible.sync="popShow" center @close="closePop()">
      <el-table border stripe :data="dataShow" :loading="tableLoading" style="width:100%">
        <el-table-column prop="tittle" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="salePrice" label="商品价格" align="center"></el-table-column>
        <el-table-column prop="options" label="操作" align="center">
          <template slot-scope="scope">
            <a
              :class="scope.row.options==='添加'?'addItem':'yesItem'"
              @click="goodsDelet(scope.row)"
            >{{scope.row.options}}</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="jxc-page tc">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          prev-text="上一页"
          next-text="下一页"
          :total="pageTotal"
          @current-change="pageChange"
          :current-page.sync="currentPage"
        ></el-pagination>
      </div>
      <p slot="footer" style="text-align: right;">
        <el-button @click="closePop()">取 消</el-button>
        <el-button type="primary" @click="closePop()">确 定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { getProductAdminPages } from "@/api/product.js";
export default {
  name: "ChooseGoods",
  props: { goodsPop: {}, userid: {}, search: { default: null } },
  watch: {
    goodsPop: {
      handler(newVal, oldVal) {
        this.popShow = newVal;
        if (oldVal === false) {
          this.getData();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      popShow: false,
      dataShow: [],
      tableLoading: true,
      pageTotal: 0,
      currentPage: 1,
      turnData: []
    };
  },
  methods: {
    closePop() {
      this.$emit("closePop", this.turnData);
      this.turnData = [];
    },
    goodsDelet(val) {
      if (val.options === "添加") {
        val.options = "已添加";
        this.turnData.splice(this.turnData.length, 0, val);
      } else {
        val.options = "添加";
        this.turnData = this.turnData.filter((v, i, a) => {
          if (v.id !== val.id) {
            return true;
          }
        });
      }
    },
    //分页切换
    pageChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getData() {
      let _data = {
        init: false,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        userid: this.userid,
        proName: this.search
      };
      this.getPageCount(_data);
      getProductAdminPages(_data)
        .then(({ data }) => {
          this.tableLoading = false;
          if (data.list !== null && data.list !== undefined) {
            this.dataShow = data.list.map((v, i, a) => {
              let reBack = v;
              reBack.salePrice = "￥" + v.salePrice;
              reBack.options = "添加";
              return reBack;
            });
          }
        })
        .catch(error => {
          this.tableLoading = false;
        });
    },
    getPageCount(opt) {
      opt = Object.assign({}, opt, { init: true });
      getProductAdminPages(opt).then(({ data }) => {
        this.pageTotal = data.count;
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.app-dialog {
  .addItem {
    color: #f00;
  }
  .yesItem {
    color: #4c8afd;
  }
  .jxc-page{
    padding: 10px 0 0 0;
  }
}
</style>