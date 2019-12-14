<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="dashboardCTable">
    <!-- 选择筛选 -->
    <el-select v-model="searchDay" placeholder="请选择" class="searchDay">
      <el-option
        v-for="item in daysOpt"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <!-- 标签页 -->
    <el-tab-pane label="出库" name="second">
      <div class="charts" ref="chartBox">
        <h2 class="title">出库柱状图</h2>
        <div id="echart" ref="echart" :style="{height:echartsH,width:echartsW}"></div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="库存" name="third">
      <div class="warehouse">
          <h2 class="title">库存列表<span>（按库存量排名）</span></h2>
          <el-table border stripe :data="warehouse" style="width:100%">
              <el-table-column prop="num" label="序号"  width="160" align="center"></el-table-column>
              <el-table-column prop="name" label="商品名称"  align="center"></el-table-column>
              <el-table-column prop="price" label="库存数量（件）" align="center" show-overflow-tooltip>
                <template slot-scope="scope"><div class="green">{{scope.row.price}}</div></template>
              </el-table-column>
          </el-table>
          <div class="jxc-page fr">
              <el-pagination
                @size-change="handleSizeChange"              
                background
                layout="prev, pager, next"
                :page-size="10"
                prev-text="上一页"
                next-text="下一页"
                :total="100">
              </el-pagination>
          </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
require('echarts/lib/chart/bar')
// // 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { debounce } from '@/utils'
export default {
  data() {
    return {
      activeName: "second",
      daysOpt: [
        {
          value: "day7",
          label: "最近一周"
        },
        {
          value: "month3",
          label: "最近三个月"
        },
        {
          value: "month6",
          label: "最近六个月"
        }
      ],
      searchDay: "day7",
      stockTable: [
        {
          num: "1",
          name: "宇飞来机器人手机",
          price: "100000.00"
        },
        {
          num: "2",
          name: "宇飞来机器人手机",
          price: "100000.00"
        }
      ],
      warehouse: [
        {
          num: "1",
          name: "宇飞来机器人手机",
          price: "100000"
        },
        {
          num: "2",
          name: "宇飞来机器人手机",
          price: "100000"
        }
      ],
      currentPage: 1,
      echartsW: '100%',
      echartsH: '478px',
      chart: null,
      chartOpt:{
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        color:'#81A0D0',
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    };
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "second") {
        this.$nextTick(() => {
          this.drawLine();
        })
      }
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('echart'))
      // 绘制图表
      this.chart.setOption(this.chartOpt);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.stock,
.warehouse {
  padding: 20px 30px;
}
div.red {
  color: #f73b42;
}
div.green {
  color: #56B987;
}
.title {
  font-size: 16px;
  line-height: 20px;
  border-left: 6px solid #4c8afd;
  padding-left: 11px;
  margin-bottom: 22px;
  span {
    font-size: 14px;
    color: #666;
  }
}
.charts{
  width: 100%;
  padding: 20px 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.dashboardCTable {
  position: relative;
  .el-tabs__item {
    width: 160px;
    text-align: center;
    padding: 0 30px;
  }
  .el-tabs__content {
    position: static;
  }
  .searchDay {
    position: absolute;
    top: -3px;
    right: 0;
    input {
      width: 120px;
      height: 34px;
    }
  }
}
</style>




