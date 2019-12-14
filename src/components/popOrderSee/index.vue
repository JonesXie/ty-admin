<template>
    <div class="app-dialog">
        <el-dialog :title="title" :visible.sync="popShow" :width="width" center @close="closePop()">
            <div class="dialog-body order-con">
                 <el-table :data="tableData" style="width: 100%" class="pop-table"  >
                    <el-table-column prop="protitle" label="商品名称"  align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="attr" label="商品属性"  align="center"></el-table-column>
                    <el-table-column prop="count" label="购买数量" align="center"></el-table-column>
                    <template v-if="priceShow">
                      <el-table-column prop="price" label="单价（元）" align="center"></el-table-column>
                      <el-table-column prop="priceAll" label="小计（元）" align="center"></el-table-column>
                    </template>
                    <template v-if="stateShow">
                      <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                         <div v-if="scope.row.sonOrderState === 1">等待退款中</div>
                         <div v-else-if="scope.row.sonOrderState === 2">已同意退款</div>
                         <div v-else-if="scope.row.sonOrderState === 3">已拒绝退款</div>
                         <div v-else>无</div>
                        </template>
                      </el-table-column>
                    </template>
                </el-table>             
            </div>
        </el-dialog>
    </div>
</template>


<script>

export default {
  props: {
    width: {
      default: '540px'
    },
    title: {
      default: '订单内容'
    },
    priceShow: {
      default: false
    },
    stateShow: {
      default: false
    },
    pop: {
      type: Object,
      default: () => { return {} }
    },
    priceInfo: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
        this.applyList(value.data)
      },
      deep: true
    }
  },
  data() {
    return {
      popShow: false,
      tableData: []
    }
  },
  methods: {
    closePop() {
      this.$emit('closePop')
    },
    applyList(data) {
      this.tableData = []
      for (const item of data) {
        this.tableData.push({
          protitle: item.protitle,
          attr: (typeof (item.list_attrkv)).toLowerCase() === 'object' ? this.setAttr(item.list_attrkv) : item.list_attrkv,
          count: item.count,
          price: item.price,
          sonOrderState: item.sonOrderState,
          priceAll: item.priceAll
        })
      }
    },
    setAttr(data) {
      let str = ''
      data = data[0] ? data[0].list : []
      const length = data.length - 1
      data.forEach((element, index) => {
        str += element.key.tAttributeName + ': '
        str += element.value.tAttributeValueName
        if (length !== index) str += ' / '
      })
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.order-con{    
   padding: 5px;
    padding-bottom: 20px;    
}

</style>
<style lang="scss">
.order-con{
    .order-id{
        margin-bottom:15px;
        color:#666;
        font-size:14px;
        font-weight:600;
    }
    .el-table th{
        font-weight:400;   
         color:#333;     
    }
    .el-table td, .el-table th{
        padding:8px 0;
       
    }
}
</style>
