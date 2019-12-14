<template>
  <section class="setGift item-con">
    <div class="type">
      <el-form :inline="true">
        <el-form-item label="赠品描述:">
          <el-input v-model="desc" placeholder="请输入赠品描述"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="购买数量:">
          <el-input-number v-model="num" :min="1"></el-input-number>
          <span style="color:red;fontSize:12px;">购买指定数量的商品才赠送赠品</span>
        </el-form-item>
        <br />
        <el-form-item label="搜索本店商品:">
          <el-input placeholder="商品名称" v-model="goodsSearch"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="getData('search')">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" style="width:120px;" round @click="getData('all')">查询所有商品</el-button>
        </el-form-item>
      </el-form>
      <!-- 所有商品列表 -->
      <div class="all-goods" v-if="dataShow.length>0">
        <el-table border stripe :data="dataShow" :loading="tableLoading" style="width:100%">
          <el-table-column prop="tittle" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="salePrice" label="商品价格" align="center"></el-table-column>
          <el-table-column prop="options" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" round @click="chooseParams(scope.row)">{{scope.row.options}}</el-button>
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
      </div>
      <!-- 确定列表 -->
      <div class="confirm-table" v-if="chooseData.length>0">
        <p class="gl_title">
          已确定
          <span style="color:red">{{chooseData.length}}</span>个赠送商品
        </p>
        <div>
          <el-table border stripe :data="chooseData" style="width:100%;textAlign:center">
            <el-table-column prop="name" label="商品信息"></el-table-column>
            <el-table-column prop="count" label="商品数量">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.count" :min="1"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a class="delete" @click="classDelet(scope)">删除</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- sku选择 -->
      <el-dialog title="选择具体参数" :visible.sync="popShow" center @close="cancelChoose">
        <el-radio
          v-model="slected"
          v-for="(v,i) in skuShowData"
          :key="i"
          :label="i"
          class="chooseRadios"
        >{{chooseProdInfo.tittle}}&nbsp;&nbsp;{{v.skuName}}</el-radio>
        <p slot="footer" style="text-align: right;">
          <el-button @click="cancelChoose">取 消</el-button>
          <el-button type="primary" @click="confirmChoose()">确 定</el-button>
        </p>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import {
  getProductAdminPages,
  getproductInfo,
  getAttrbuteAndAttrbuteValuesByProClass
} from "@/api/product.js";
export default {
  name: "setGift",
  data() {
    return {
      desc: "",
      num: 1,
      dataShow: [],
      tableLoading: true,
      pageTotal: 0,
      currentPage: 1,
      goodsSearch: null, //搜索
      chooseProdInfo: null,
      productSKU: [],
      skuShowData: [], //sku处理后列表
      popShow: false,
      slected: null,
      chooseData: [] //选择完成数据
    };
  },
  props: { userid: { default: null }, allGifts: { default: null } },
  components: {},
  watch: {
    chooseData: {
      handler: function(nv) {
        this.dataChange(nv);
      },
      immediate: true,
      deep: true
    },
    desc: {
      handler: function(nv) {
        this.dataChange(this.chooseData);
      },
      immediate: true,
      deep: true
    },
    num: {
      handler: function(nv) {
        this.dataChange(this.chooseData);
      },
      immediate: true,
      deep: true
    },
    allGifts: {
      handler: function(nv) {
        if (nv !== null) {
          let getData = JSON.parse(nv);
          this.num = Number(getData.count);
          this.desc = getData.title;
          let giftsArr = getData.gifts.split("_");
          let dataArr = giftsArr.map(val => {
            let _data = {
              name: null,
              proid: val.split("#")[0],
              sonId: val.split("#")[1].split("*")[0],
              count: Math.floor(val.split("*")[1])
            };
            return _data;
          });
          this.getGifts(dataArr);
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 数据变动传输
    dataChange(nv) {
      let upData;
      let arr = nv.map(v => `${v.proid}#${v.sonId}*${v.count}`);
      if (nv.length > 0) {
        upData = JSON.stringify({
          title: this.desc,
          count: this.num,
          gifts: arr.join("_")
        });
      } else {
        upData = "";
      }
      this.$emit("returnGift", upData);
    },
    //商品分页切换
    pageChange(val) {
      this.currentPage = val;
      this.getData("page");
    },
    getData(val) {
      if (val !== "page") {
        this.currentPage = 1;
      }
      let _data = {
        init: false,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        userid: this.userid,
        proName: this.goodsSearch
      };
      if (val === "all") {
        _data.proName = null;
      }
      this.getPageCount(_data);
      getProductAdminPages(_data)
        .then(({ data }) => {
          this.tableLoading = false;
          if (data.list !== null && data.list !== undefined) {
            this.dataShow = data.list.map((v, i, a) => {
              let reBack = v;
              reBack.salePrice = "￥" + v.salePrice;
              reBack.options = "选择规格";
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
    },
    //选择规格
    chooseParams(val) {
      this.chooseProdInfo = val;
      this.getProductInfo(val.id);
      this.popShow = true;
    },
    //获取productinfo
    getProductInfo(val) {
      getproductInfo(this.userid, val).then(res => {
        // this.productSKU = res.data.skus;
        this.getProductSKU(res.data.pro.tProductClass, res.data.skus);
      });
    },
    //获取sku配置
    getProductSKU(val, productSKU) {
      getAttrbuteAndAttrbuteValuesByProClass(val).then(res => {
        this.setInit(res.data, productSKU);
      });
    },
    //处理skus
    setInit(typeData, productSKU) {
      productSKU.forEach(value => {
        const IDS = value.skuid.split("_"); // 属性值id组
        let idsArr = [];
        IDS.forEach(id => {
          typeData.forEach(type => {
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
        let _data = {
          id: value.id,
          skuName: idsArr.join("-")
        };
        this.skuShowData.splice(this.skuShowData.length, 0, _data);
      });
    },
    // 取消选择
    cancelChoose() {
      this.skuShowData = [];
      this.popShow = false;
    },
    //确定选择
    confirmChoose() {
      // this.chooseData
      if (this.slected !== null) {
        let _data = {
          name: `${this.chooseProdInfo.tittle}  ${this.skuShowData[this.slected].skuName}`,
          proid: this.chooseProdInfo.id,
          // sonId: this.skuShowData[this.slected].skuid,
          sonId: this.skuShowData[this.slected].id,
          count: 1
        };
        this.chooseData.splice(this.chooseData.length, 0, _data);
        this.popShow = false;
      } else {
        this.$message("请选择具体参数");
      }
    },
    //删除已选
    classDelet(val) {
      this.chooseData.splice(val.$index, 1);
    },
    //回显处理
    getGifts(arr) {
      for (let i = 0; i < arr.length; i++) {
        getproductInfo(this.userid, arr[i].proid).then(res => {
          let proName = res.data.pro.tProductTittle;
          let IDS = [];
          for (let j = 0; j < res.data.skus.length; j++) {
            if (res.data.skus[j].id == arr[i].sonId) {
              IDS = res.data.skus[j].skuid.split("_"); // 属性值id组
              break;
            }
          }
          getAttrbuteAndAttrbuteValuesByProClass(
            res.data.pro.tProductClass
          ).then(response => {
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
            arr[i].name = `${proName}  ${idsArr.join("-")}`;
          });
        });
      }
      this.chooseData = arr;
    }
  }
};
</script>

<style scoped lang="scss">
.setGift {
  background: #f8f8f8;
  padding: 33px 40px 40px 40px;
  display: inline-block;
  .type {
    width: 732px;
    display: inline-block;
    .gl_title {
      font-size: 12px;
      color: #666666;
      margin: 20px 0 14px 0;
    }
    .addItem {
      color: #f00;
    }
    .delete {
      color: red;
    }
  }
  .chooseRadios {
    margin: 0 15px 10px 0px;
  }
}
</style>
