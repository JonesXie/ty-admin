<template>
  <section class="setGift item-con">
    <div class="type">
      <el-form :inline="true" v-if="prodOpt.add">
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
      <!-- 确定列表 -->
      <div class="confirm-table" v-if="chooseData.length>0">
        <p class="gl_title">已选择的商品</p>
        <div>
          <el-table border stripe :data="chooseData" style="width:100%;textAlign:center">
            <el-table-column prop="name" label="商品"></el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <el-input placeholder="记录名称" v-model="scope.row.recordName" class="max_width"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="info" label="描述" align="center">
              <template slot-scope="scope">
                <el-input placeholder="记录描述" v-model="scope.row.info" class="max_width"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceSale" label="售价" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  min="0"
                  placeholder="售价"
                  v-model="scope.row.priceSale"
                  @change="validSale($event,scope.$index,'priceSale')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceInI" label="价格1" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="价格1"
                  v-model="scope.row.priceInI"
                  @change="validPrice($event,scope.$index,'priceInI')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceIn2i" label="价格2" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="价格2"
                  v-model="scope.row.priceIn2i"
                  @change="validPrice($event,scope.$index,'priceIn2i')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceIn3i" label="价格3" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="价格3"
                  v-model="scope.row.priceIn3i"
                  @change="validPrice($event,scope.$index,'priceIn3i')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceIn4i" label="价格4" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="价格4"
                  v-model="scope.row.priceIn4i"
                  @change="validPrice($event,scope.$index,'priceIn4i')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="priceIn5i" label="价格5" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="价格5"
                  v-model="scope.row.priceIn5i"
                  @change="validPrice($event,scope.$index,'priceIn5i')"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="sysType" label="系统类型" align="center">
              <template slot-scope="scope">
                <el-select class="max_width" v-model="scope.row.sysType">
                  <el-option
                    v-for="(item,key,index) in prodOpt.sysTypeList"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="usertype" label="用户类型" align="center">
              <template slot-scope="scope">
                <el-select class="max_width" v-model="scope.row.usertype">
                  <el-option
                    v-for="(item,key,index) in prodOpt.userTypeList"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center" v-if="!prodOpt.add">
              <template slot-scope="scope">
                <el-select class="max_width" v-model="scope.row.state">
                  <el-option
                    v-for="(item,key,index) in prodOpt.stateList"
                    :key="index"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="Dstate" label="状态" align="center"></el-table-column> -->
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a class="delete" @click="classDelet(scope)">{{prodOpt.add?'删除':'不修改'}}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
      <!-- sku选择 -->
      <el-dialog title="选择具体参数" :visible.sync="popShow" center @close="cancelChoose">
        <el-checkbox class="chooseRadios" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="slected">
          <el-checkbox
            v-for="(v,i) in skuShowData"
            :key="i"
            :label="i"
            class="chooseRadios"
          >{{chooseProdInfo.tittle}}&nbsp;&nbsp;{{v.skuName}}</el-checkbox>
        </el-checkbox-group>
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
import { notNull } from "@/methods.js";
export default {
  name: "chooseProduct",
  data() {
    return {
      checkAll: false,
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
      slected: [],
      chooseData: [] //选择完成数据
    };
  },
  props: {
    userid: { default: null, required: true },
    productInfo: {
      default: null
    },
    prodOpt: {
      required: true,
      default: function() {
        return {};
      }
    },
    addAttrAll: {
      type: Object
    }
  },
  components: {},
  watch: {
    chooseData: {
      handler: function(nv) {
        this.dataChange(nv);
      },
      immediate: true,
      deep: true
    },
    productInfo: {
      handler: function(nv) {
        if (nv != null) {
          this.getGifts(nv);
        }
      },
      immediate: true,
      deep: true
    },
    addAttrAll: {
      handler: function(nv) {
        if (JSON.stringify(nv) != "{}") {
          this.chooseData = this.chooseData.map(v => {
            let _data = v;
            Object.assign(_data, nv);
            return _data;
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    //验证售价
    validSale(val, site, site2) {
      let reg = /^([1-9]\d*|[0]{1,1})$/;
      // console.log(val, info);
      if (!reg.test(Number(val)) || !notNull(val)) {
        this.chooseData[site][site2] = null;
      }
    },
    //验证价格
    validPrice(val, site, site2) {
      let reg = /^([1-9]\d*|[0]{1,1})$/;
      if (!reg.test(Number(val)) || !notNull(val)) {
        this.chooseData[site][site2] = "0";
      }
    },
    // 数据变动传输
    dataChange(nv) {
      let upData;
      if (nv.length > 0) {
        let delData = JSON.parse(JSON.stringify(nv));
        upData = delData.map(v => {
          let _data = v;
          delete _data.name;
          if (this.prodOpt.add) {
            delete _data.state;
          }
          return _data;
        });
      } else {
        upData = false;
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
    //全选
    handleCheckAllChange(val) {
      if (val) {
        this.skuShowData.forEach((v, i) => {
          this.slected.splice(this.slected.length, 1, i);
        });
      } else {
        this.slected = [];
      }
    },
    // 取消选择
    cancelChoose() {
      this.skuShowData = [];
      this.slected = []; //选中
      this.checkAll = false; // 全选显示
      this.popShow = false;
    },
    //确定选择
    confirmChoose() {
      // this.chooseData
      if (this.slected.length > 0) {
        this.slected.forEach(v => {
          let _data = {
            name: `${this.chooseProdInfo.tittle}  ${this.skuShowData[v].skuName}`,
            recordName: null, //记录名称
            info: null, //描述,
            priceSale: null, //价格
            priceInI: "0", //价格1
            priceIn2i: "0", //价格2
            priceIn3i: "0", //价格3
            priceIn4i: "0", //价格4
            priceIn5i: "0", //价格5
            productId: this.chooseProdInfo.id, //产品id
            sonproductId: this.skuShowData[v].id, //产品sonProId
            sysType: Object.keys(this.prodOpt.sysTypeList)[0], //系统类型
            usertype: Object.keys(this.prodOpt.userTypeList)[0] //用户身份类型
          };
          this.chooseData.splice(this.chooseData.length, 1, _data);
        });
        this.popShow = false;
        this.slected = []; //选中
        this.checkAll = false; // 全选显示
      } else {
        this.$message("请选择具体参数");
      }
    },
    //删除已选
    classDelet(val) {
      this.chooseData.splice(val.$index, 1);
    },
    //回显处理 老版本
    getGifts0(val) {
      // for (let i = 0; i < arr.length; i++) {
      getproductInfo(this.userid, val.proid).then(res => {
        let proName = res.data.pro.tProductTittle;
        let IDS = [];
        for (let j = 0; j < res.data.skus.length; j++) {
          if (res.data.skus[j].id == val.sonId) {
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
            let _data = {
              name: `${proName}  ${idsArr.join("-")}`,
              proid: val.proid,
              // sonId: this.skuShowData[this.slected].skuid,
              sonId: val.sonId,
              count: 1
            };
            this.chooseData.splice(0, 1, _data);
          }
        );
      });
      // }
      // this.chooseData = arr;
    },
    //回显处理
    getGifts(val) {
      let arr = JSON.parse(JSON.stringify(val));
      this.chooseData = [];
      arr.forEach(v => {
        let _data = v;
        _data.name = v.Dproduct;
        _data.state = JSON.stringify(v.state);
        _data.sysType = JSON.stringify(v.sysType);
        _data.usertype = JSON.stringify(v.usertype);
        _data.priceInI = JSON.stringify(v.priceInI);
        _data.priceIn2i = JSON.stringify(v.priceIn2i);
        _data.priceIn3i = JSON.stringify(v.priceIn3i);
        _data.priceIn4i = JSON.stringify(v.priceIn4i);
        _data.priceIn5i = JSON.stringify(v.priceIn5i);
        for (let key in _data) {
          if (_data[key] === "暂无数据") {
            _data[key] = null;
          }
        }
        this.chooseData.splice(this.chooseData.length, 1, _data);
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.setGift {
  background: #f8f8f8;
  padding: 33px 40px 40px 40px;
  display: inline-block;
  .type {
    // width: 732px;
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
  .all-goods {
    margin-top: 10px;
  }
  .chooseRadios {
    margin: 0 15px 10px 0px;
  }
}
</style>
