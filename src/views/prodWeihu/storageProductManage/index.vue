<template>
    <div class="back-wrap storage-pro">
      <!-- 
        <el-form-item label="价格：" class="price-in">
                    <span>￥<el-input style="width:100px;"></el-input></span>
                    <i>—</i>
                    <span>￥<el-input style="width:100px;"></el-input></span>
                </el-form-item>
       -->
       <div class="report-form">
          <topSearchMod :searchData="topSearchData" :toClear="false" @toSearch="toSearch"></topSearchMod>
       </div>
        <div class="table-w">
            <table class="power-form prod-manage-tb" v-loading="loading">
                <colgroup>
                    <col class="col-prod">
                    <col class="col-price">
                    <col class="col-count">
                    <col class="col-sale">
                    <col class="col-publish">
                    <col class="col-opre">
                </colgroup>
                <thead>
                    <th class="">商品</th>
                    <th><a href="####">价格</a></th>
                    <th><a href="####">销量</a></th>
                    <th><a href="####">发布时间</a></th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr class="step-row">
                    </tr>
                    <tr class="tr-th">
                        <td class="td-bulk" colspan="6">
                            <el-checkbox label="全选" v-model="checkAll" @change="clickAll"></el-checkbox>
                            <el-button type="danger" icon="el-icon-delete" round @click="delProd">删除</el-button>
                        </td>
                    </tr>
                    <tr class=" tr-td" v-for="item in tableData" :key="'role' + item.id">
                        <td class="tl">
                            <div class="tl">
                                    <div class="lineMid goods-item clearfix">
                                        <el-checkbox v-model="item.check" @change="clickItem"></el-checkbox>
                                        <router-link :to="'/prodWeihu/productDetail/' + item.id">
                                            <div class="item-pic imgBox">
                                                <img :src="item.smallImg" />
                                            </div>
                                            <div class="item-info">
                                                <div class="info-name">
                                                    {{item.tittle}}
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                            </div>
                        </td>
                        <td>
                            <span class="is-bold">￥{{item.salePrice}}</span>
                        </td>
                        <td class="td-sale">
                            <span>{{item.count}}</span>
                        </td>
                        <td class="td-time">
                            <span>{{parseTime(item.addtime)}}</span>
                        </td>
                        <td class="td-opre">
                          <router-link :to="'/prodWeihu/updateProduct/' + item.id">
                            <el-button type="text" class="blue">编辑</el-button>
                          </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="jxc-page tc">
        <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        :total="pagTotal">
        </el-pagination>
    </div>
</div>
</template>
<script>
import topSearchMod from '@/components/topSearch/index'
import { mapGetters } from 'Vuex'
import { parseTime } from '@/utils'
import { getProductAdminPages, deletePro } from '@/api/product'
export default {
    name: 'storageProductManage',
    components:{
         topSearchMod
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {                 
            topSearchData: {
                proName: {
                    title: '商品名称：',
                    type: 'text',
                    placeholder: '输入商品名称搜索'
                },
                date: {
                    title: '时间：',
                    type: 'date',
                    Rename: ['beginTime', 'endTime']
                }
            },
            toSearchData: {},
            tableData: [],
            pagTotal: 0,
            checkAll: false,
            loading: false
        };
    },
    mounted() {
        this.toSearch()
    },
    methods: {
        clickItem(val) {
          if (!val) {
            this.checkAll = val;
            return
          } 
          let all = true;
          this.tableData.forEach(item => {
            all = item.check && all
          })
          this.checkAll = all
        },
        clickAll(val) {
          this.tableData.forEach(item => {
            this.$set(item, 'check', val)
          })
        },
        delProd() {
          let arry = [];
          this.tableData.forEach(item => {
              if (item.check) arry.push(item.id)
          })
          if (arry.length <= 0) return this.$message.error('请选择需要删除的商品！')
          this.$confirm('确认删除该商品？', '提示', { type: 'warning' }).then(() => {
                deletePro(arry).then(res => {
                    if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                    this.$message.success('操作成功！')
                    this.toSearch()
                })
            }).catch(() => {})
        },
        parseTime,
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            this.getList(opt);
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { init: true });
            this.getList(opt, (data) => {
                this.pagTotal = data.count;
            })
        },
        getList(obj, callback) {
            let opt = {
                init: false, //分页获取 true获取个数，false获取记录
                pageNo: 0,
                pageSize: 10,
                userid: this.user.userId
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getProductAdminPages(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.tableData = data.list;
        }
    }
};
</script>


<style lang="scss" scoped>
.storage-pro {
  padding: 34px 50px 12px;
  .price-in {
    color: #333;
    .el-form-item__label {
      padding-right: 0;
    }
    .el-input {
      margin: 0 9px;
    }
    i {
      color: #999;
      display: inline-block;
      width: 16px;
      overflow: hidden;
      vertical-align: middle;
    }
    i + span {
      margin-left: 9px;
    }
  }
  .prod-manage-tb {
    .col-prod {
      width: 45%;
    }
    th {
      height: 54px;
      line-height: 54px;
      background-color: #f3f3f3;
      text-align: center;
      padding: 0 10px;
      font-weight: bold;
      i {
        color: #999;
      }
    }

    .tr-th {
      height: 64px;
      line-height: 64px;
      .td-bulk {
        .el-button {
          margin-left: 25px;
        }
        .el-checkbox {
          margin: 0 18px;
        }
      }
    }
    .tr-td {
      td {
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        padding: 24px 10px;
        text-align: center;
        &.tl {
          text-align: left;
        }
        &.td-time {
          color: #999;
          line-height: 18px;
        }
      }
    }
  }
  .goods-item {
    display: inline-block;
    text-align: left;
    position: relative;
    .el-checkbox {
      vertical-align: middle;
      float: left;
      margin: 40px 18px 0 8px;
    }
    .item-pic {
      width: 96px;
      height: 96px;
      line-height: 96px;
      float: left;
    }
    .item-info {
      line-height: 18px;
      float: left;
      max-width: 240px;
      margin-left: 18px;
      /*  margin-left: 192px; */
      font-size: 12px;
      a:hover {
        color: #636c89;
      }
      .info-name {
        height: 36px;
        overflow: hidden;
      }
      .item-pro {
        color: #999;
        line-height: 24px;
        margin-top: 15px;
        & > span {
          display: inline-block;
          padding-right: 8px;
        }
      }
    }
    @media screen and (min-width: 1440px) {
        .item-info {
              max-width: 300px;
        }
    }
  }
}
</style>
<style lang="scss">
.top-search {
  .el-form-item {
    & + .el-form-item {
      margin-left: 40px;
    }
  }
}
.price-in {
  .el-form-item__label {
    padding-right: 0;
  }
}
</style>

