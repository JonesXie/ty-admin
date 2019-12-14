<template>
    <div class="app-container">
        <el-button type="link" @click="kucunTransferInfo=true">转库存</el-button>

        <el-dialog title="转库存" :visible.sync="kucunTransferInfo" width="695px" center>
            <div class="dialog-body zhuanku-trans">
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label="转库存选择：">
                    <el-radio-group v-model="ruleForm.transType">
                    <el-radio label="转营业厅"></el-radio>
                    <el-radio label="区县配送售后服务中心"></el-radio>
                    <el-radio label="转代理商/经销商"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择营业厅：">
                     <el-cascader placeholder="请选择省市区/县"
                        :options="options"
                        filterable  
                        v-model="ruleForm.address"
                    ></el-cascader>  
                </el-form-item>
                <el-form-item label="转出数量：">
                    <ul class="protrans-item">
                        <li v-for="i in 3" :key="i">
                            <span class="pro-attr">
                                <label>宇飞来F9</label>
                                <label>土豪金/6+128G</label>
                            </span>
                            <el-input style="width:235px;"
                            placeholder="请输入转出库存数量"
                            v-model="ruleForm.input[i-1]">
                            <i slot="suffix" class="slot-text">单位：台</i>
                            </el-input>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="信息确认：">
                    <div class="protrans-item">
                       <dl><dt>服务中心</dt><dd>合肥庐江县酷聊营业厅</dd></dl>
                       <dl> <dt>负责人</dt><dd>刘佳佳</dd></dl>
                       <dl><dt>联系方式</dt><dd>13645361289</dd></dl>
                       <dl><dt>营业厅地址</dt><dd>安徽省合肥市庐阳区</dd></dl>
                    </div>
                </el-form-item>
                <div class="tc" style="margin-top:30px;">
                     <el-button type="primary" class="submit-120w36" round >选择</el-button>   
                </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>

</template>

<style lang="scss" scoped>
.zhuanku-trans{
    padding-top:15px;
    padding-bottom: 20px;
    .el-form-item{
        .el-input,.el-cascader{
            width: 340px;
        }
    }
    .el-button+.el-button{
        margin-left: 70px;
    }
    .protrans-item{
        li{
            margin-bottom:15px;
            &:last-child{
                margin-bottom: 0;
            }
        }
        dt{
         width: 120px;
         text-align: left;         
        }
        dd,dt{
            margin-bottom: 10px;
            display: inline-block;
            line-height: 1;
        }
        .pro-attr{
            padding-right:15px;
            label+label{
                padding-left: 15px;
            }
        }
    }
}
.mt80{
    margin-top:80px;
}

</style>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],               
                /* 表单绑定数据 */
                ruleForm: {
                    transType: '区县配送售后服务中心',
                    address: '',
                    input:[11, 22, 33]
                },
             kucunTransferInfo:false               
            };
        }
    };
</script>