<template>
  <section class="back-wrap pg_salecount">
    <div class="topList">
      <el-form :inline="true" class="topSearch">
        <el-form-item label="时间:">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dataChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" round @click="serach">搜索</el-button>
          <el-button type="success" round @click="changType">{{type===1?'按月':'按天'}}</el-button>
        </el-form-item>
        <el-form-item v-if="type===1">
          <span style="color: #f73b42;">*最大时间跨度为七天</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="sc_content" v-show="showCharts">
      <div id="is_echarts" style="width:100%;height:600px"></div>
      <div class="is_table_head">销售数量表格</div>
      <div class="is_table">
        <el-table :data="tData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="120" align="center"></el-table-column>
          <el-table-column
            v-for="(item,index) in tTitle"
            :key="index"
            :label="item.name"
            align="center"
            :prop="item.proId"
          >
            <el-table-column
              v-for="(val,ind) in item.child"
              :key="ind"
              :label="val.skuNo"
              :prop="val.prop"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="sc_content" v-show="!showCharts">
      <div class="img_wrap">
        <img src="@/assets/ly_nodata.png" alt />
      </div>
      <p class="tips">暂无数据</p>
    </div>
  </section>
</template>

<script>
// let echarts = require("echarts");
let echarts = require("echarts/lib/echarts"); // 引入 ECharts 主模块
require("echarts/lib/chart/bar"); // 引入柱状图
require("echarts/lib/component/tooltip"); // 引入提示框
require("echarts/lib/component/title"); // 标题组件
import { getOrderSalesByTime } from "@/api/reportFormManage.js";
import { changeTime } from "@/methods.js";
export default {
  name: "saleCount",
  data() {
    return {
      time: [],
      showCharts: true,
      tTitle: [],
      tData: [],
      type: 1
    };
  },
  components: {},
  watch: {},
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
    this.time.splice(0, 1, changeTime(start).split(" ")[0]);
    this.time.splice(1, 1, changeTime(end).split(" ")[0]);
    this.getSales();
  },
  methods: {
    changType() {
      this.time = [];
      if (this.type === 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    getSales() {
      const _data = {
        startTime: this.time[0],
        endTime: this.time[1],
        type: this.type
      };
      getOrderSalesByTime(_data).then(({ data }) => {
        if (data.length > 0) {
          this.showCharts = true;
          this.dataDel(data);
        } else {
          this.showCharts = false;
        }
      });
    },
    dataDel(val) {
      let xAxis = [];
      let seriesData = [];
      let tableTitle = [];
      let tableData = [];
      val.forEach(el => {
        // 循环1
        let turnTime = changeTime(el.dateTemp);
        let allTime = turnTime.split(" ")[0];
        if (this.type === 2) {
          allTime = turnTime.substr(0, 7);
        }
        xAxis.splice(xAxis.length, 0, allTime);
        let tObj = {
          date: allTime
        };
        el.proInfos.forEach(ele => {
          // 循环2
          let tableHeade = {
            name: ele.proTittle,
            proId: JSON.stringify(ele.proId),
            child: []
          };
          ele.proSkus.forEach(element => {
            // 循环3
            let sDetail = {
              name: element.skuNo,
              type: "bar",
              stack: ele.proTittle,
              data: [element.skuCount],
              skuSonId: element.skuSonId
            };
            seriesData.splice(seriesData.length, 0, sDetail);
            tableHeade.child.splice(tableHeade.child.length, 0, {
              skuNo: element.skuNo ? element.skuNo : "未知",
              prop: JSON.stringify(element.skuSonId)
            });
            tObj[JSON.stringify(element.skuSonId)] = element.skuCount;
          });
          tObj[`${ele.proId}-all`] = ele.proCount;
          tableTitle.splice(tableTitle.length, 0, tableHeade);
        });
        //计算总计
        let all = 0;
        for (const key in tObj) {
          if (`${key}`.includes("-all")) {
            all = all + Number(tObj[key]);
          }
        }
        tObj.all = all;
        tableData.splice(tableData.length, 0, tObj);
      });
      // 图表去重
      for (let i = 0; i < seriesData.length; i++) {
        for (let j = i + 1; j < seriesData.length; j++) {
          if (seriesData[i].skuSonId == seriesData[j].skuSonId) {
            seriesData[i].data.splice(
              seriesData[i].data.length,
              0,
              ...JSON.parse(JSON.stringify(seriesData[j].data))
            );
            seriesData.splice(j, 1);
            j--;
          }
        }
      }
      // table去重
      for (let i = 0; i < tableTitle.length; i++) {
        for (let j = i + 1; j < tableTitle.length; j++) {
          if (tableTitle[i].proId == tableTitle[j].proId) {
            tableTitle.splice(j, 1);
            j--;
          }
        }
      }
      //添加销量
      let realTitle = [];
      tableTitle.forEach(el => {
        let countAll = {
          name: "销量",
          proId: `${el.proId}-all`,
          child: []
        };
        realTitle.splice(realTitle.length, 0, el, countAll);
      });
      //添加总计
      realTitle.splice(realTitle.length, 0, {
        name: "总计",
        proId: "all",
        child: []
      });
      //表格赋值
      this.tTitle = realTitle;
      this.tData = tableData;
      // 图标赋值
      this.initChart(xAxis, seriesData);
    },
    initChart(x, series) {
      let myChart = echarts.init(document.getElementById("is_echarts"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "销售数量图表"
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: "category",
            data: x
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: series
      });
    },
    dataChange() {
      if (this.type === 1) {
        let range = this.time[1] - this.time[0];
        if (range > 518400000) {
          // 518,400,000 为6天
          this.$message.error("最大时间跨度为七天");
          this.time = [];
        } else {
          let start = changeTime(this.time[0]);
          let end = changeTime(this.time[1]);
          this.time.splice(0, 1, start.split(" ")[0]);
          this.time.splice(1, 1, end.split(" ")[0]);
        }
      } else {
        let start = changeTime(this.time[0]);
        let end = changeTime(this.time[1]);
        this.time.splice(0, 1, start.split(" ")[0]);
        this.time.splice(1, 1, end.split(" ")[0]);
      }
    },
    serach() {
      if (this.time.length > 0) {
        this.getSales();
      } else {
        this.$message.error("请选择时间范围");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sc_content {
  width: 100%;
  min-height: 600px;
  .is_table_head {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  .tips {
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
  }
  .img_wrap {
    padding-top: 20px;
    width: 100%;
    text-align: center;
    img {
      width: 260px;
    }
  }
}
</style>
