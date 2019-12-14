<template>
<div class="back-wrap report-form SettingSizeValue">
    <h2>{{proName}}</h2>
    <div class="topSec">
        <el-button type="success" round style="width:100px;" @click="addAttr()">
            <i class="el-icon-plus"></i>
            <span>添加</span>
        </el-button>
    </div>
    <div class="table-w">
        <el-table border stripe v-loading="loading" :data="tableData" class="tableMod" ref="tableMod" style="width:65%">
            <el-table-column type="index" label="序号" width="150" align="center"></el-table-column>
            <el-table-column prop="t2" label="属性值" align="center">
                <template slot-scope="scope">
                    <input type="text" :class="{ show: scope.row.upDate }" :disabled="!scope.row.upDate" v-model="scope.row.tAttributeValueName" >
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.upDate === 1">
                        <el-button type="success" class="btnFrom" round @click="toUpdateAttrValue(scope.row)">
                            <span>保存</span>
                        </el-button>
                        <el-button type="warning" class="btnFrom" round @click="setDate(scope.row, 'upDate' , 0)">
                            <span>取消</span>
                        </el-button>
                    </div>
                    <div v-else-if="scope.row.upDate === 2">
                        <el-button type="success" class="btnFrom" round @click="toAddAttrbuteValue(scope.row)">
                            <span>添加</span>
                        </el-button>
                        <el-button type="warning" class="btnFrom" round @click="addAttr(scope.row, scope.$index)">
                            <span>取消</span>
                        </el-button>
                    </div>
                    <div v-else>
                        <a class="blue" @click="setDate(scope.row, 'upDate' , 1)">修改</a>
                        <a class="red" @click="toRemoveAttributeValue(scope.row)">删除</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArrributeValueByAttrId, addAttrbuteValue, removeAttributeValue, updateAttrValue } from '@/api/product'
export default {
    name: "sizeValue",
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {
            tableData: [],
            proId: '',
            proName: '',
            loading: false
        }
    },
    created() {
        this.proId = this.$route.params.id
        this.proName = this.$route.query.proclassName
        this.getList(this.proId)
    },
    methods: {
        addAttr(row, index) {
            if (index || index === 0) return this.tableData.splice(index, 1)
            this.tableData.push({
                tAttributeValueImg: '',
                tAttributeValueName: '',
                upDate: 2
            })
        },
        toAddAttrbuteValue(row) {
            if (!row.tAttributeValueName) return this.$message.error('属性值不能为空！')
            let opt = {
                tAttributeId: this.proId,
                tAttributeValueName: row.tAttributeValueName
            }
            addAttrbuteValue(opt).then(res => {
                 if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                this.$message.success('操作成功！')
                this.getList(this.proId)
            })
        },
        toRemoveAttributeValue(row) {
            this.$confirm('确认删除？', '提示', { type: 'warning' }).then(() => {
                removeAttributeValue(row.id).then(res => {
                    if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                    this.$message.success('操作成功！')
                    this.getList(this.proId)
                })
            }).catch(() => {})
        },
        toUpdateAttrValue(row) {
            let opt = {
                id: row.id,
                tAttributeId: row.tAttributeId,
                tAttributeValueImg: row.tAttributeValueImg,
                tAttributeValueName: row.tAttributeValueName
            }
            updateAttrValue(opt).then(res => {
                 if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                this.$message.success('操作成功！')
                this.getList(this.proId)
            })
        },
        setDate(target, key, val) {
            this.$set(target, key, val)
        },
        getList(obj, callback) {
            this.loading = true;
            getArrributeValueByAttrId(obj).then((res) => {
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
.SettingSizeValue{
    padding-bottom: 200px;
    h2{
        font-size: 14px;
        font-weight: bold;
        color:#010101;
        padding:0 0 12px 30px;
        line-height: 1
    }
    .topSec {
        padding: 27px 0 10px 30px;
        border-top: 1px solid #E5E5E5;
        margin-bottom: 40px;
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
.SettingSizeValue{
    .table-w{
        input[type="text"] {
            width: 50%;
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