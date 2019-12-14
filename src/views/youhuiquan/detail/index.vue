<template>
  <div class="pg_yhq_detail">
    <div class="back-wrap">
      <div class="first_head">
        <el-button icon="el-icon-refresh" round class="reFresh" @click="getDetail">刷新</el-button>
        <el-button icon="el-icon-arrow-left" round class="goBack" @click="$router.back(-1)">返回</el-button>
      </div>
      <div class="first_table">
        <el-table
          border
          stripe
          v-loading="tableLoading1"
          :data="tableData1"
          class="tableMod"
          style="width:100%"
        >
          <el-table-column prop="cardname" label="名称" align="center"></el-table-column>
          <el-table-column prop="cardtype" label="优惠券类型" align="center"></el-table-column>
          <el-table-column prop="cardusingpro" label="可使用商品" align="center"></el-table-column>
          <el-table-column prop="cardlimit" label="使用门槛" align="center"></el-table-column>
          <el-table-column prop="cardamount" label="面值(元)" align="center"></el-table-column>
          <el-table-column prop="cardstate" label="状态" align="center"></el-table-column>
        </el-table>
        <el-table
          border
          stripe
          v-loading="tableLoading1"
          :data="tableData1"
          class="tableMod"
          style="width:100%"
        >
          <el-table-column prop="cardusingduring" label="有效期" align="center"></el-table-column>
          <el-table-column prop="cardcount" label="总发行量" align="center"></el-table-column>
          <el-table-column prop="cusGetCount" label="已领取" align="center"></el-table-column>
          <el-table-column prop="cusNotGetCount" label="待领取" align="center"></el-table-column>
          <el-table-column prop="cusUsedCount" label="已使用" align="center"></el-table-column>
          <el-table-column prop="cusNotUsedCount" label="未使用" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="back-wrap wrap2">
      <div class="topList">
        <el-form :inline="true" class="topSearch">
          <el-form-item label="使用状态:">
            <el-select v-model="detail.status">
              <el-option label="未使用" value="1"></el-option>
              <el-option label="已使用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单编号:">
            <el-input placeholder="输入订单编号" v-model="detail.number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" round @click="getData2">查询</el-button>
            <el-button type="success" round @click="clearUp">
              <i>
                <svg-icon icon-class="icon-clean"></svg-icon>
              </i>
              <span>清空</span>
            </el-button>
          </el-form-item>
        </el-form>
        <!-- <div class="topRange">
          <el-select v-model="detail.sort" placeholder="排序方式">
            <el-option
              v-for="item in SortList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>-->
      </div>
      <div class="table-w">
        <el-table
          border
          stripe
          v-loading="tableLoading2"
          :data="tableData2"
          class="tableMod"
          ref="tableMod"
          style="width:100%"
        >
          <el-table-column prop="id" label="优惠码" align="center"></el-table-column>
          <el-table-column prop="userid" label="领取会员" align="center"></el-table-column>
          <el-table-column prop="gettype" label="领取方式" align="center"></el-table-column>
          <el-table-column prop="addtime" label="领取时间" align="center"></el-table-column>
          <el-table-column prop="state" label="使用状态" align="center"></el-table-column>
          <el-table-column prop="useaddtime" label="使用时间" align="center"></el-table-column>
          <el-table-column prop="orderserio" label="订单编号" align="center"></el-table-column>
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
          :current-page.sync="currentPage"
          :total="pagTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  getInfoSingle,
  getUserCard,
  getCardCountInfos
} from "@/api/youhuiquan.js";
import {
  returnCardType,
  returnCardInfoState,
  returnCardFw,
  changeTime
} from "@/methods.js";
export default {
  name: "detail",
  data() {
    return {
      userid: null,
      id: null,
      cardState: null,
      cardFanWei: null,
      cardType: null,
      tableData1: [],
      tableLoading1: true,
      detail: {
        status: null,
        number: null,
        sort: null
      },
      tableLoading2: true,
      tableData2: [],
      SortValue: 0,
      pagTotal: 0,
      currentPage: 1,
      SortList: [
        {
          value: 0,
          label: "第一个"
        },
        {
          value: 1,
          label: "第二个"
        }
      ]
    };
  },
  methods: {
    //清空
    clearUp() {
      this.detail = {
        status: null,
        number: null,
        sort: null
      };
    },
    //分页切换
    pageChange(val) {
      this.currentPage = val;
      this.getData2();
    },
    //查询
    checkData() {
      this.currentPage = 0;
      this.getData2();
    },
    getData1() {
      this.tableLoading1 = true;
      let _data = {
        id: this.id,
        userid: this.userid
      };
      getInfoSingle(_data).then(({ data }) => {
        this.tableLoading1 = false;
        let setData = data;
        if (
          data.cardusingstarttime === null &&
          data.cardusingendtime === null
        ) {
          setData.cardusingduring = `领取后${data.cardusingday}天内`;
        } else {
          let startTime = changeTime(data.cardusingstarttime);
          let endTime = changeTime(data.cardusingendtime);
          setData.cardusingduring = `${startTime}至${endTime}`;
        }

        if (data.cardarea === 1) {
          setData.cardarea = "全平台通用";
        } else if (data.cardarea === 2) {
          setData.cardarea = "仅APP";
        } else if (data.cardarea === 3) {
          setData.cardarea = "仅WEB端";
        }
        setData.cardstate = this.cardState[data.cardstate];
        setData.cardusingpro = this.cardFanWei[data.cardusingpro];
        setData.cardtype = this.cardType[data.cardtype];
        this.tableData1.splice(0, 1, setData);
        this.getUseInfo(_data);
      });
    },
    getUseInfo(_data) {
      getCardCountInfos(_data).then(({ data }) => {
        let setData = this.tableData1[0];
        let getD = {
          cusGetCount: data.cusGetCount,
          cusNotGetCount: data.cusNotGetCount,
          cusNotUsedCount: data.cusNotUsedCount,
          cusUsedCount: data.cusUsedCount
        };
        Object.assign(setData, getD);
        for (let key in setData) {
          if (setData[key] === null || setData[key] === undefined) {
            setData[key] = "暂无数据";
          }
        }
        this.tableData1.splice(0, 1, setData);
      });
    },
    getData2() {
      this.tableLoading2 = true;
      if (this.detail.number === "") {
        this.detail.number = null;
      }
      let _data = {
        init: false,
        orderNo: this.detail.number,
        state: this.detail.status,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        id: this.id,
        userid: this.userid
      };
      this.getPageCount(_data);
      getUserCard(_data)
        .then(({ data }) => {
          this.tableLoading2 = false;
          if (data.list.length >= 0) {
            let _dealData = data.list.map((v, i, a) => {
              let mix = null;
              let states = null;
              if (v.gettype == 0) {
                mix = "主动领取";
              } else {
                mix = "后台赠送";
              }
              if (v.state == 1) {
                states = "未使用";
              } else {
                states = "已使用";
              }
              let reBack = {
                addtime: changeTime(v.addtime),
                cardid: v.cardid,
                gettype: mix,
                id: v.id,
                orderserio: v.orderserio,
                state: states,
                useaddtime: changeTime(v.useaddtime),
                userid: v.userid
              };
              for (let key in reBack) {
                if (reBack[key] === null || reBack[key] === undefined) {
                  reBack[key] = "暂无数据";
                }
              }
              return reBack;
            });
            this.tableData2 = _dealData;
          }
        })
        .catch(() => {
          this.tableLoading2 = false;
        });
    },
    getPageCount(opt) {
      opt = Object.assign({}, opt, { init: true });
      getUserCard(opt).then(({ data }) => {
        this.pagTotal = data.count;
      });
    },
    //初次加载和刷新
    getDetail() {
      this.getData1();
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.userid = JSON.parse(Cookies.get("UserKey")).userId;
    this.cardState = returnCardInfoState();
    this.cardFanWei = returnCardFw();
    this.cardType = returnCardType();
    this.getDetail();
    this.getData2();
  }
};
</script>

<style scoped lang="scss">
.pg_yhq_detail {
  .first_table {
    margin-top: 22px;
  }
  .first_head {
    width: 100%;
    text-align: right;
    .reFresh {
      color: #56b987;
      border-color: #56b987;
    }
    .goBack {
      background: #efefef;
    }
  }
}
.wrap2 {
  margin-top: 10px;
  .reFresh {
    color: #56b987;
    border-color: #56b987;
  }
  .topSearch {
    width: 80%;
    display: inline-block;
  }
  .topRange {
    display: inline-block;
    width: 19%;
    position: relative;
    top: 10px;
    text-align: right;
  }
}
</style>