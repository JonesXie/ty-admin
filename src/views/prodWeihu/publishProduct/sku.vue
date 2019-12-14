<template>
  <el-form-item label="宝贝规格：">
    <div class="item-con pro-guige">
      <!-- 内存 -->
      <div v-if="type">
        <div class="guige-item" v-for="item in proData" :key="'pro' + item.attribute.id">
          <div class="guige-title">{{item.attribute.tAttributeName}}：</div>
          <div class="guige-con">
            <el-checkbox
              v-for="(attr) in item.attribute_values"
              :key="'attr' + attr.id"
              :label="attr.id"
              @change="attrCheck(item.attribute.tAttributeName, attr.id, attr.tAttributeValueName, $event)"
            >{{attr.tAttributeValueName}}</el-checkbox>
          </div>
        </div>
      </div>
      <div class="guige-item" v-if="type">
        <el-button type="success" round @click="createTable">生成表格</el-button>
      </div>

      <div class="guige-item">
        <div class="guige-con xsh-con">
          <el-table :data="tableData" ref="tableData" border style="width: 100%; margin-top: 20px">
            <el-table-column width="55" align="center" v-if="type" :render-header="renderSelect">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.check" @change="setSubData(scope.row, true)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
            <el-table-column
              v-for="(propVal, key) in applyAttrData"
              :key="'table' + key"
              v-if="Object.keys(propVal).length > 0"
              :label="key"
              align="center"
            >
              <template slot-scope="scope">{{scope.row.attr[key]['val']}}</template>
            </el-table-column>
            <el-table-column label="标识码" required align="center">
              <template slot-scope="scope">
                <el-input @change="setSubData(scope.row)" v-model="scope.row.sku.selfno"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="标价（元）" required align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="type"
                  type="number"
                  @change="setSubData(scope.row)"
                  v-model="scope.row.sku.price"
                ></el-input>
                <el-input
                  v-else
                  type="number"
                  @change="setSubData(scope.row)"
                  v-model="scope.row.sku.tProductSkuPrice"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="售价（元）" required align="center">
              <template slot-scope="scope">
                <el-input
                  v-if="type"
                  type="number"
                  @change="setSubData(scope.row)"
                  v-model="scope.row.sku.salePrice"
                ></el-input>
                <el-input
                  v-else
                  type="number"
                  @change="setSubData(scope.row)"
                  v-model="scope.row.sku.tProductSkuSaleprice"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量（件）" required align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  @change="setSubData(scope.row)"
                  v-model="scope.row.sku.count"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column class="skuImgUp" label="图片" required width="108px;" align="center">
              <template slot-scope="scope">
                <imgs v-if="type" :only="true" @returnData="setImgs(scope.row, $event)"></imgs>
                <imgs
                  v-else
                  :only="true"
                  @returnData="setImgs(scope.row, $event)"
                  :initData="[{ url: scope.row.sku.tProductSkuImg }]"
                ></imgs>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-form-item>
</template>
<script>
import imgs from "@/components/formUpImgs";
export default {
  props: {
    proAttr: {
      default: ""
    },
    initData: {
      default: () => {
        return [];
      }
    },
    type: {
      default: 0 // 修改
    },
    priceModel: {
      default: () => {
        return {};
      }
    }
  },
  watch: {
    proAttr: {
      handler(val) {
        if (!val) return;
        this.proData = val;
        this.toInit(this.initData, val);
      },
      deep: true,
      immediate: true
    },
    initData: {
      handler(val) {
        this.toInit(val, this.proData);
      },
      deep: true
    }
  },
  data() {
    return {
      // 继承来的属性
      proData: "",
      // 标记属性数据
      attrData: {},
      // 渲染数据
      applyFir: [],
      // 表格显示
      tableData: [],
      applyAttrData: {},
      // 存储修改初值的数据
      updataInit: "",
      //全选
      selectAll: false
    };
  },
  components: {
    imgs
  },
  methods: {
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
    //自定义全选 end
    setAllselect(arr, val) {
      arr = arr.filter(v => (v.check = val));
    },
    setImgs(row, val) {
      if (this.type) row.sku.skuImg = val;
      else row.sku.tProductSkuImg = val;
      this.setSubData({ check: true });
    },
    // 有值初始化
    toInit(skus, attr) {
      if (skus.length === 0 || !attr || this.updataInit) return;
      this.updataInit = Object.assign([], skus);
      skus.forEach(item => {
        const IDS = item.skuid.split("_"); // 属性值id组
        if (item.count === 0) item.count = "0"; // 0值兼容
        const tableTiem = {
          attr: {},
          check: true,
          sku: Object.assign({}, item)
        };
        IDS.forEach(id => {
          let opt = "";
          attr.forEach(options => {
            if (opt) return;
            for (const inx in options.attribute_values) {
              if (options.attribute_values[inx].id === parseInt(id)) {
                opt = {};
                opt.id = id;
                opt.val = options.attribute_values[inx].tAttributeValueName;
                tableTiem.attr[options.attribute.tAttributeName] = opt;
                const key = options.attribute.tAttributeName;
                if (!this.applyAttrData[key]) this.applyAttrData[key] = {};
                this.applyAttrData[key][id] = opt.val;
              }
            }
          });
        });
        this.tableData.push(tableTiem);
      });
      this.$refs.tableData.doLayout();
    },
    setSubData(row, type = false) {
      if (row.check === true || type) {
        const data = [];
        this.tableData.forEach(item => {
          if (item.check) data.push(item.sku);
        });
        this.$emit("returnData", data);
      }
    },
    // 执行渲染table,生产表格
    createTable() {
      this.tableData = [];
      this.$refs.tableData.doLayout();
      this.$nextTick(() => {
        this.applyAttrData = {};
        this.pushData(0, {
          attr: {}
        });
        for (const key in this.attrData) {
          this.applyAttrData[key] = Object.assign({}, this.attrData[key]);
        }
        if (this.tableData.length === 1 && this.tableData[0].sku.skuid === "")
          this.tableData = [];
        if (this.updataInit) this.createTableByIn();
        if (this.tableData.length > 0) {
          this.selectAll = true;
          // const randomD = JSON.stringify(Math.random()).substr(-5, 5);
          this.tableData = this.tableData.map((v, i) => {
            let rdata = v;
            // rdata.sku.selfno = randomD + i;
            rdata.sku.price = this.priceModel.price;
            rdata.sku.salePrice = this.priceModel.salePrice;
            return rdata;
          });
        }
        this.$refs.tableData.doLayout();
      });
    },
    // 重新生成表格，加入初始数据
    createTableByIn() {
      this.tableData.forEach(item => {
        this.updataInit.forEach(data => {
          if (item.sku.skuid === data.skuid) {
            item.check = true;
            item.sku = Object.assign({}, data);
          }
        });
      });
      this.setSubData({ check: true });
    },
    // 制作渲染table使用的数组
    applyTable(data) {
      this.applyFir = [];
      for (const key in data) {
        if (Object.keys(data[key]).length === 0) continue;
        const opt = {};
        opt[key] = data[key];
        this.applyFir.push(opt);
      }
    },
    // 设置skuid
    setSkuid(opt) {
      const str = [];
      for (const key in opt) {
        str.push(opt[key].id);
      }
      return str.join("_");
    },
    // 渲染table
    pushData(inx, opt) {
      if (inx >= this.applyFir.length) {
        opt.check = true; //初始选择
        opt.sku = {
          skuid: this.setSkuid(opt.attr),
          price: "",
          salePrice: "",
          count: 0,
          skuImg: "",
          selfno: ""
        };
        this.tableData.push(opt);
        return;
      }
      for (const key in this.applyFir[inx]) {
        const data = this.applyFir[inx][key];
        for (const val in data) {
          const obj = { attr: {} };
          obj.attr = Object.assign({}, opt.attr);
          obj.attr[key] = {
            id: val,
            val: data[val]
          };
          this.pushData(inx + 1, obj);
        }
      }
    },
    // 初始化属性模块
    initAttr() {
      this.proData.forEach(element => {
        this.$set(this.attrData, element.attribute.tAttributeName, {});
      });
    },
    // 属性勾选操作->制作渲染table使用的数组
    attrCheck(parId, childId, val, checked) {
      if (!this.attrData[parId]) this.initAttr();
      if (!checked) {
        this.$delete(this.attrData[parId], childId);
      } else {
        this.$set(this.attrData[parId], childId, val);
      }
      this.applyTable(this.attrData);
    }
  }
};
</script>
<style lang="scss" scoped>
/* 宝贝规格 */
.pro-guige {
  padding: 5px 0 15px 0;
  margin-left: 140px;
  background-color: #f8f8f8;
  .guige-item {
    border-bottom: 1px solid #fff;
    padding: 30px 30px 30px 62px;
    &:last-child {
      border-bottom: none;
    }
  }
  .guige-title {
    color: #666;
    padding-bottom: 20px;
    line-height: 1;
  }
  .guige-con {
    line-height: 1;
    .color-item > * {
      display: inline-block;
    }
    .color-item {
      margin-bottom: 12px;
      .c-check {
        margin-right: 15px;
      }
      .c-sel {
        width: 240px;
        margin-right: 12px;
      }
      .c-note {
        width: 200px;
        margin-right: 12px;
      }
      .avatar-uploader {
        height: 34px;
        line-height: 34px;
      }
      .color-img {
        max-width: 34px;
      }
    }
    /* 销售规格 */
    &.xsh-con {
      .batch-input {
        .el-form-item__content {
          .el-input {
            display: inline-block;
            width: 110px;
            & + .el-input {
              margin-left: 12px;
            }
            & + .el-button {
              margin-left: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.b-w .prod-info-body .el-form-item .pro-guige .item-con {
  margin-left: 0;
}
</style>





