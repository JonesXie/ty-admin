<template>
<div>
    <div class="temp-body bd-none temp-show-body" v-for="item in temData" :key="'item' + item.id">
        <div class="temp-title">{{item.modelname}}</div>
        <table class="freight-form">
            <colgroup>
                <col class="col-01">
                <col class="col-02">
                <col class="col-03">                   
                <col class="col-04">
                <col class="col-05">
                <col class="col-06">
            </colgroup> 
            <template> 
                <tbody>
                    <tr class="tr-title">
                        <td colspan="5" class="tl">
                            <span class="title">创建时间：<label>{{parseTime(item.addtime)}}</label></span>
                        </td>
                        <td>
                            <el-button type="text" class="blue is-bold" @click="toUpdata(item)">修改</el-button>
                            <el-button type="text" class="red is-bold" @click="toRemoveExpress(item.id)">删除</el-button>
                        </td>
                    </tr>
                    <!-- 包邮情况 -->
                    <template v-if="item.isbaoyou">
                        <tr class="tr-th">
                            <td colspan="5">运送方式</td>
                            <td rowspan="2">包邮</td>
                        </tr>
                        <tr class="tr-th">
                            <td>{{item.sendway}}</td>
                        </tr>
                    </template>
                    <!-- 自定义运费 -->
                    <template v-else>
                        <tr class="tr-th">
                            <td class="">运送方式</td>
                            <td>运送到</td>
                            <td>首件{{ item.getpriceway ? '（kg）' : '数（件）'}}</td>
                            <td>首件费用（元）</td>                  
                            <td>续件{{ item.getpriceway ? '（kg）' : '数（件）'}}</td>
                            <td>续费（元）</td>
                        </tr>
                        <!-- 默认 -->
                        <template>
                            <tr class=" tr-td" >
                                <td :rowspan="item.spedestination ? 2 : 1">{{item.sendway}}</td>
                                <td class="t-addr"><span>默认地区</span></td>
                                <td>{{ item.getpriceway ? item.minkg : item.mincount}}</td>                  
                                <td>{{item.minmoney}}</td>
                                <td>{{ item.getpriceway ? item.xkg : item.xcount}}</td>
                                <td>{{item.addMoney}}</td> 
                            </tr>
                        </template>
                        <!-- 指定 -->
                        <template v-if="item.spedestination">
                            <tr class=" tr-td" >
                                <td class="t-addr"><span>{{item.spedestination}}</span></td>
                                <td>{{ item.getpriceway ? item.speminkg : item.spemincount}}</td>                  
                                <td>{{item.speminmoney}}</td>
                                <td>{{ item.getpriceway ? item.spexkg : item.spexcount}}</td>
                                <td>{{item.speaddmoney}}</td> 
                            </tr>
                        </template>
                        <!-- 指定地区包邮 -->
                        <template v-if="item.destination">
                            <tr class="tr-title">
                                <td colspan="6" class="tl">
                                    <span class="title">指定地区包邮</span>
                                </td>
                            </tr>
                            <tr class="tr-th">
                                <td colspan="6">运送到</td>                            
                            </tr>
                            <tr class=" tr-td" >
                                <td class="t-addr" colspan="6"><span>{{item.destination}}</span></td>                    
                            </tr>                          
                        </template>
                    </template>
                </tbody>                   
            </template>
        </table>     
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { removeExpress } from '@/api/setting'
export default {
    props: {
        tableData: {
            default: []
        }
    },
    watch: {
        tableData:{
            handler(value) {
                this.temData = value;
            },
            deep: true
        }
    },
    data() {
        return {
            temData: []
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    methods: {
        toUpdata(item) {
            this.$emit('toUpdata', item)
        },
        parseTime,
        toRemoveExpress(id) {
            this.$confirm('是否删除？', '提示', { type: 'warning' }).then(() => {
                removeExpress(this.user.userId, id).then(res => {
                    if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                    this.$message.success('操作成功！')
                    this.$emit('refresh')
                })
            }).catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.temp-show-body{
    .freight-form .tr-title > td{
        background-color: #f3f3f3;
    }
    .freight-form .tr-th > td{
        background-color: #fbfbfb;
    }
}
</style>
