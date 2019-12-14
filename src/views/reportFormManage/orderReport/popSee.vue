<template>
    <div class="app-dialog">
        <el-dialog title="订单内容" :visible.sync="popShow" width="840px" center @close="closePop()">
            <div class="dialog-body order-con">
                 <el-table :data="tableData" style="width: 100%" class="pop-table"  >
                    <el-table-column prop="proTittle" label="商品名称" width="180" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="attr" label="商品属性" width="180" align="center"></el-table-column>
                    <el-table-column prop="count" label="购买数量" align="center"></el-table-column>
                    <el-table-column prop="salePrice" label="单价（元）" align="center"></el-table-column>
                    <el-table-column prop="money" label="总计（万元）" align="center">
                        <template slot-scope="scope">
                          <div v-math:eval="scope.row.money / 10000"></div>
                        </template>
                    </el-table-column>
                     <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                         <div v-if="scope.row.sonOrderState === 1">等待退款中</div>
                         <div v-else-if="scope.row.sonOrderState === 2">已同意退款</div>
                         <div v-else-if="scope.row.sonOrderState === 3">已拒绝退款</div>
                         <div v-else>无</div>
                        </template>
                      </el-table-column>
                </el-table>             
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    pop: {
      type: Object,
      default: () => { return {} }
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
          proTittle: item.proTittle,
          salePrice: item.salePrice,
          count: item.count,
          sonOrderState: item.sonOrderState,
          money: item.salePrice * item.count,
          attr: this.setAttr(item.attrValue)
        })
      }
    },
    setAttr(data) {
      let str = ''
      data = data[0].list
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
