<template>
<div id="jxc_form" class="jxc-form">
  <el-radio v-model="radio" label="1">备选项</el-radio>
  <el-radio v-model="radio" label="2">备选项</el-radio>

  <el-checkbox-group v-model="checklist">
    <el-checkbox label="复选框 a"></el-checkbox>
    <el-checkbox label="复选框 b"></el-checkbox>
    <el-checkbox label="复选框 c"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>

  <div class="jxc-form form-input jj">
    <h3>输入框</h3>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-input style="width:235px;margin-top:15px;"
      placeholder="请输入转出库存数量"
      v-model="input2">
      <i slot="suffix" class="slot-text">单位：台</i>
    </el-input>
  </div>
  <div class="jj">
    <h3>多行输入</h3>
    <div class="jxc-pop-textarea">
      <el-input
        type="textarea"
        :autosize="{ minrows:3, maxrows:6}"
        placeholder="请填写你的退货原因~"
        v-model="textarea1">
      </el-input>
    </div>
  </div>
  
  <div class="jxc-form form-select">

    <div class="jj">普通select:
       <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>

    <div class="jj" >
      日期区间：
      <el-date-picker
      v-model="datevalue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>

    <div class="jj">默认日期：
      <el-date-picker
      v-model="value1"
      type="date"
      suffix-icon="el-icon-date"
      placeholder="请选择日期">
      </el-date-picker>
    </div>
     
  </div>   
<div class="jxc-page jj">
<h3>调整每页显示条数,带总数</h3>
     <el-pagination
      background
      @size-change="handlesizechange"
      @current-change="handlecurrentchange"
      :current-page.sync="currentpage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :pager-count="5"
      prev-text="上一页"
      next-text="下一页"
      :total="1000">
    </el-pagination>
</div>

<h3>计数器</h3>
<div class="jj">
   <el-input-number v-model="num1" @change="handlechange" :min="1" :max="10" label="描述文字"></el-input-number>
</div>

<h3>进度条</h3>
<div class="jj">
  <el-steps :space="200" :active="2" finish-status="success" align-center style="width:350px;">
    <el-step title="验证身份"></el-step>
    <el-step title="修改验证手机"></el-step>
    <el-step title="完成"></el-step>
 </el-steps>
</div>

<h3>单选按钮组</h3>
<div class="jj">  
    <el-radio-group v-model="radio1" size="medium">
      <el-radio-button label="综合排序" ></el-radio-button>
      <el-radio-button label="进货量"></el-radio-button>
      <el-radio-button label="新品"></el-radio-button>
      <el-radio-button label="价格"></el-radio-button>
    </el-radio-group>
</div>

<h3>按钮</h3>
<div class="jj">
<el-button type="primary" icon="el-icon-search" round>查询</el-button>
  <el-button type="success" icon="el-icon-upload2" round>导出</el-button>
  <el-button type="warning" icon="el-icon-sort" class="zkc-btn" round>转库存</el-button>
  <el-button type="danger" round>提交订单</el-button>
  <el-button type="info" round>取消按钮</el-button>
</div>
<div class="jj">
  <el-button type="primary" icon="el-icon-search" plain round>查询</el-button>
  <el-button type="success" icon="el-icon-upload2" plain round>导出</el-button>
  <el-button type="warning" icon="el-icon-sort" class="zkc-btn" plain round>转库存</el-button>
  <el-button type="danger" icon="el-icon-minus" plain round>添加</el-button>
  <el-button type="info" icon="el-icon-plus"  plain round>取消</el-button>
</div>

<div class="jj">
  <h4>自定义大小</h4>
    <el-button type="primary" class="submit-140w42" round>提交</el-button>
    <el-button type="danger" class="submit-160w42" round>提交</el-button> 
    <el-button type="primary" class="submit-320w42" round>登录</el-button> 
</div>

<h3>表格</h3>
<div class="jj">
   <el-table
   border
   stripe
    ref="multipletable"
    :data="tabledata1"
    tooltip-effect="dark"
    style="width: 100%;text-align:center"
   >
    <el-table-column
      type="selection"
      width="63">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      checklist: ["选中且禁用", "复选框 a"],
      input: "",
      input2: "",
      textarea1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: "",
      datevalue: "",
      currentpage3: 5,
      num1: 1,
      radio1: "综合排序",
      tabledata1: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleselection: []      
    };
  },
  methods: {
    /* 分页 */
    handlesizechange(val) {
      console.log(`每页 ${val} 条`);
    },
    handlecurrentchange(val) {
      console.log(`当前页: ${val}`);
    },
    /*计数器  */
    handlechange(value) {
      console.log(value);
    }
  }
};
</script>