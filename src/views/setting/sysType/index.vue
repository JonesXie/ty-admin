<template>
  <section class="back-wrap report-form sysType">
    <div class="title">系统类型设置</div>
    <el-button type="primary" icon="el-icon-plus" round @click="addClick">添加</el-button>
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
        <el-table-column prop="sysType" label="系统标识" align="center"></el-table-column>
        <el-table-column prop="typeContent" label="系统说明" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <a class="editor" @click="editorClick(scope.row)">编辑</a>
            <a class="delete" @click="delClick(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog :title="title" :visible.sync="updatePop" width="35%">
      <el-form :inline="true">
        <el-form-item label="系统标识:">
          <el-input v-model="sysType" type="number"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="系统说明:">
          <el-input v-model="typeContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePop = false">取 消</el-button>
        <el-button type="primary" v-if="isAdd" @click="addConfirm">确 定</el-button>
        <el-button type="primary" v-else @click="updateConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getAllProduct_price_typeinfo,
  deleteProductPriceTypeInfo,
  updateProductPriceTypeInfo,
  addProductPriceTypeInfo
} from "@/api/setting.js";
export default {
  name: "sysType",
  data() {
    return {
      tableLoading: true,
      tableData: [],
      updatePop: false,
      id: null,
      sysType: null,
      typeContent: null,
      isAdd: false,
      title: "修改系统类型"
    };
  },
  components: {},
  watch: {},
  mounted() {
    this.getInfo();
  },
  methods: {
    // 获取列表
    getInfo() {
      this.tableLoading = true;
      getAllProduct_price_typeinfo().then(({ data }) => {
        this.tableLoading = false;
        this.tableData = data;
      });
    },
    //删除、
    delClick(val) {
      deleteProductPriceTypeInfo(val.id).then(({ data }) => {
        this.$message(data.msgInFo);
        this.getInfo();
      });
    },
    // 修改
    editorClick(val) {
      this.id = val.id;
      this.sysType = val.sysType;
      this.typeContent = val.typeContent;
      this.isAdd = false;
      this.title = "修改系统类型";
      this.updatePop = true;
    },
    // 添加
    addClick() {
      this.sysType = null;
      this.typeContent = null;
      this.isAdd = true;
      this.title = "添加系统类型";
      this.updatePop = true;
    },
    //提交修改
    updateConfirm() {
      if (this.notNULL(this.sysType) && this.notNULL(this.typeContent)) {
        this.updatePop = false;
        let _data = {
          id: this.id,
          sysType: this.sysType,
          typeContent: this.typeContent
        };
        updateProductPriceTypeInfo(_data).then(({ data }) => {
          this.$message(data.msgInFo);
          this.getInfo();
        });
      } else {
        this.$message("请填写完表格");
      }
    },
    //确认添加
    addConfirm() {
      if (this.notNULL(this.sysType) && this.notNULL(this.typeContent)) {
        this.updatePop = false;
        let _data = {
          sysType: this.sysType,
          typeContent: this.typeContent
        };
        addProductPriceTypeInfo(_data).then(({ data }) => {
          this.$message(data.msgInFo);
          this.getInfo();
        });
      } else {
        this.$message("请填写完表格");
      }
    },
    //非空验证
    notNULL(v) {
      if ([null, "", undefined].includes(v)) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sysType {
  padding-bottom: 100px;
  .title {
    font-size: 16px;
    margin-bottom: 22px;
  }
  .table-w {
    margin-top: 20px;
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
}
</style>
