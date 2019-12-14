<template>
  <div class="back-wrap pg_yhq_list">
    <div class="topList">
      <el-form :inline="true" class="topSearch">
        <el-form-item label="优惠券名称:">
          <el-input placeholder="优惠券名称" v-model="yhq.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型:">
          <el-select placeholder="全部" v-model="yhq.type">
            <el-option
              v-for="item in cardTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" round @click="checkData">查询</el-button>
          <el-button type="success" round @click="clearUp">
            <i>
              <svg-icon icon-class="icon-clean"></svg-icon>
            </i>
            <span>清空</span>
          </el-button>
          <el-button icon="el-icon-refresh" round class="reFresh" @click="getData">刷新</el-button>
        </el-form-item>
      </el-form>
      <div class="topRange">
        <!-- <el-select v-model="yhq.sort" placeholder="排序方式">
          <el-option
            v-for="item in SortList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </div>
    </div>
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
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <el-table-column prop="cardname" label="优惠券名称" align="center"></el-table-column>
        <el-table-column prop="cardusingpro" label="可使用商品" align="center"></el-table-column>
        <el-table-column prop="cardlimit" label="使用门槛" align="center">
          <template slot-scope="scope">满{{scope.row.cardlimit}}元可用</template>
        </el-table-column>
        <el-table-column prop="cardamount" label="面值(元)" align="center"></el-table-column>
        <el-table-column prop="cardarea" label="适用平台" align="center"></el-table-column>
        <el-table-column prop="cardusingduring" label="有效期" align="center"></el-table-column>
        <el-table-column prop="cardstate" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="65">
          <template slot-scope="scope">
            <a class="look" @click="turnClick(scope.row)">查看</a>
            <a class="editor" @click="editorClick(scope.row)">编辑</a>
            <a class="delete" @click="delClick(scope.row)">删除</a>
            <a class="pause" v-if="scope.row.cardstate === '可用'" @click="pauseClick(scope.row)">暂停</a>
            <a class="editor" v-else @click="useClick(scope.row)">启用</a>
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
    <!-- <el-dialog title="编辑优惠券" :visible.sync="popShow" center @close="closePop()">

    </el-dialog>-->
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  getCardList,
  deleteCardInfo,
  updateCardInfo
} from "@/api/youhuiquan.js";
import {
  returnCardType,
  returnCardInfoState,
  returnCardFw,
  changeTime
} from "@/methods.js";
export default {
  name: "list",
  data() {
    return {
      userid: null,
      yhq: {
        name: null,
        type: null,
        sort: null
      },
      pagTotal: 0,
      currentPage: 1,
      SortList: [],
      tableLoading: true,
      orginData: [],
      tableData: [],
      cardTypeList: [],
      cardStateList: null,
      cardFanWei: null,
      popShow: false
    };
  },
  methods: {
    //跳转
    turnClick(row) {
      this.$router.push(`/youhuiquan/detail/${row.id}`);
    },
    //编辑
    editorClick(row) {
      this.$router.push(`/youhuiquan/editor/${row.id}`);
    },
    //启用
    useClick(row) {
      let timestamp = new Date().getTime();
      if (
        row.cardusingday !== null &&
        row.cardusingday !== undefined &&
        row.cardusingday !== "" &&
        row.cardusingday > 0
      ) {
        this.reUpdata(row, 1);
      } else {
        if (row.cardusingendtime > timestamp) {
          this.reUpdata(row, 1);
        } else {
          this.$message({
            type: "error",
            message: "已经超出有效期范围"
          });
        }
      }
    },
    closePop() {},
    //删除
    delClick(row) {
      let _data = {
        id: row.id,
        userid: this.userid
      };
      deleteCardInfo(_data).then(({ data }) => {
        this.$message(data.msgInFo);
        this.getData();
      });
    },
    reUpdata(row, state) {
      let _data = this.orginData.filter((v, i, a) => {
        if (v.id === row.id) {
          return true;
        }
      });
      _data[0].userid = this.userid;
      _data[0].cardusingstarttime2 = this.dealTime(_data[0].cardusingstarttime);
      _data[0].cardusingendtime2 = this.dealTime(_data[0].cardusingendtime);
      _data[0].userid = this.userid;
      _data[0].cardstate = state; //修改优惠券状态
      updateCardInfo(_data[0]).then(({ data }) => {
        this.$message(data.msgInFo);
        this.getData();
      });
    },
    dealTime(val) {
      if (val == null) {
        return null;
      } else {
        changeTime(val);
      }
    },
    //暂停
    pauseClick(row) {
      this.reUpdata(row, 2);
    },
    //分页切换
    pageChange(val) {
      this.currentPage = val;
      this.getData();
    },
    //查询
    checkData() {
      this.getData();
    },
    //清空
    clearUp() {
      this.yhq.name = null;
      this.yhq.type = null;
    },
    //处理数据
    dealData(fixData) {
      this.tableData = fixData.map((v, i, a) => {
        let setData = v;
        if (v.cardusingstarttime === null && v.cardusingendtime === null) {
          setData.cardusingduring = `领取后${v.cardusingday}天内`;
        } else {
          let startTime = changeTime(v.cardusingstarttime);
          let endTime = changeTime(v.cardusingendtime);
          setData.cardusingduring = `${startTime}至${endTime}`;
        }
        if (v.cardarea === 1) {
          setData.cardarea = "全平台通用";
        } else if (v.cardarea === 2) {
          setData.cardarea = "仅APP";
        } else if (v.cardarea === 3) {
          setData.cardarea = "仅WEB端";
        }
        setData.cardstate = this.cardStateList[v.cardstate];
        setData.cardusingpro = this.cardFanWei[v.cardusingpro];
        for (let key in setData) {
          if (setData[key] === null || setData[key] === undefined) {
            setData[key] = "暂无数据";
          }
        }
        return setData;
      });
    },
    //初次加载
    getData() {
      this.tableLoading = true;
      let _data = {
        cardName: this.yhq.name,
        cardState: null,
        cardType: this.yhq.type,
        cardUsingType: null,
        init: false,
        pageNo: this.currentPage - 1,
        pageSize: 10,
        userid: this.userid
      };
      this.getPageCount(_data);
      getCardList(_data).then(({ data }) => {
        if (data.list !== null) {
          this.orginData = JSON.parse(JSON.stringify(data.list));
          this.dealData(data.list);
        }
        this.tableLoading = false;
      });
    },
    getPageCount(opt) {
      opt = Object.assign({}, opt, { init: true });
      getCardList(opt).then(({ data }) => {
        this.pagTotal = data.count;
      });
    },
    fixType(data) {
      for (let key in data) {
        let _data = {
          value: key,
          label: data[key]
        };
        this.cardTypeList.splice(this.cardTypeList.length, 0, _data);
      }
    }
  },
  mounted() {
    this.userid = JSON.parse(Cookies.get("UserKey")).userId;
    returnCardType(this.fixType);
    this.cardStateList = returnCardInfoState();
    this.cardFanWei = returnCardFw();
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.pg_yhq_list {
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
  .table-w {
    a {
      display: inline-block;
      margin: 0 5px;
    }
  }
}
</style>