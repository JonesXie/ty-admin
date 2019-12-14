<template>
<div class="back-wrap report-form SettingSize">
    <h2>商品销售规格设置</h2>
    <div class="lineMid topSec">
        <topSearchMod :searchData="topSearchData" :toClear="false" @toSearch="toSearch"></topSearchMod>
        <div class="topLine">
            <router-link to="/setting/sizeAdd">
                <el-button type="success" round style="width:110px;">
                    <i class="el-icon-plus"></i>
                    <span>新增规格</span>
                </el-button>
            </router-link>
        </div>
    </div>
    <div class="table-w">
        <el-table border stripe v-loading="loading" :data="tableData" class="tableMod" ref="tableMod" style="width:100%">
            <el-table-column type="index" label="序号" width="125" align="center"></el-table-column>
            <el-table-column label="商品类目" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.proclassName}}</span>
                    <span v-if="scope.row.common_attrbute" class="blue">(共有属性)</span>
                </template>
            </el-table-column>
            <el-table-column prop="tAttributeName" label="属性" align="center">
                <template slot-scope="scope">
                    <input type="text" :class="{ show: scope.row.upDate }" :disabled="!scope.row.upDate" v-model="scope.row.tAttributeName" >
                </template>
            </el-table-column>
            <el-table-column label="属性值" align="center" >
                <template slot-scope="scope">
                    <router-link :to="'/setting/sizeValue/' + scope.row.id + '?proclassName=' + scope.row.proclassName + '-' + scope.row.tAttributeName ">
                        <el-button type="text" class="blue">查看</el-button>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="280px">
                <template slot-scope="scope">
                    <div v-if="scope.row.upDate">
                        <el-button type="success" class="btnFrom" round @click="toUpdateAttr(scope.row)">
                            <span>保存</span>
                        </el-button>
                        <el-button type="warning" class="btnFrom" round @click="setDate(scope.row, 'upDate' , 0)">
                            <span>取消</span>
                        </el-button>
                    </div>
                    <div v-else>
                        <a class="blue" @click="setDate(scope.row, 'upDate' , 1)">修改</a>
                        <a class="red" @click="toRemoveAtrr(scope.row)">删除</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import { getAttrByProClass, updateAttr, removeAtrr } from '@/api/product'
export default {
    name: "size",
    components: {
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
                proclass: {
                    title: '商品类目：',
                    type: 'selectProClass',
                    placeholder: '请选择商品类目',
                    data: []
                }
            },
            toSearchData: {},
            tableData: [],
            loading: false
        }
    },
    mounted() {
        // this.toSearch();
    },
    methods: {
        toRemoveAtrr(row, txt="确认删除？", type="warning") {
            this.$confirm(txt, '提示', { type: type }).then(() => {
                if (type === 'warning' && row.common_attrbute === 1) return this.toRemoveAtrr(row, '您正在删除的是共有属性，将影响所有分类，确定删除？', 'error')
                removeAtrr(row.id).then(res => {
                    if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                    this.$message.success('操作成功！')
                    this.toSearch()
                })
            }).catch(() => {})
        },
        toUpdateAttr(row) {
            let opt = {
                id: row.id,
                proClass: this.toSearchData.proclass,
                tAttributeName: row.tAttributeName
            }
            updateAttr(opt).then(res => {
                 if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                this.$message.success('操作成功！')
                this.toSearch()
            })
        },  
        setDate(target, key, val) {
            this.$set(target, key, val)
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            if (!opt.proclass) return this.$message.error('请选择商品类目！')
            this.getList(opt.proclass)
        },
        getList(obj, callback) {
            this.loading = true;
            getAttrByProClass(obj).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.tableData = [];
            this.tableData = data;
        }
    }
}
</script>
<style lang="scss" scoped>
.SettingSize{
    padding-bottom: 100px;
    h2{
        font-size: 14px;
        font-weight: bold;
        color:#010101;
        padding:0 0 12px 30px;
        line-height: 1
    }
    .topSec {
        padding: 27px 0 10px 30px;
        border: 1px solid #E5E5E5 {
            left: none;
            right: none;
        };
        margin-bottom: 40px;
    }
    .topLine{
        margin-left: 80px;
        padding-bottom: 22px;
    }
    .table-w{
        padding: 0 30px;
        .btnFrom{
            line-height: 24px;
            height: 26px;
            width: 56px;
            font-size: 12px;
            border-radius: 13px;
        }
    }
}
</style>
<style lang="scss">
.SettingSize{
    .topSec {
        .el-select{width: 200px;}
        input{
            background:#F8F8F8;
        }
    }
    .table-w{
        input[type="text"] {
            width: 60%;
            background: transparent;
            line-height: 28px;
            height: 28px;
            border: 1px solid transparent;
            border-radius: 3px;
            text-align: center;
            &.show{
                border: 1px solid #DEDEDE;
                background: #fff;
            }
        }
    }
}
</style>