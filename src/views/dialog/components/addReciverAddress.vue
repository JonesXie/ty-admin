<template>
    <div class="app-container">
       <!--  <el-button type="text" @click="addAddress=true">添加收货地址</el-button> -->

         <el-dialog title="添加收货地址" :visible.sync="addShow" width="730px" center :before-close="changeDialogState">
           <div class="dialog-body addReciverAddress">           
               <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message>
                   <el-form-item label="收件人" prop="name" >  
                        <el-input   placeholder="请填写正确的收货人姓名" v-model="ruleForm.name" ></el-input>                              
                  </el-form-item>

                   <el-form-item label="收货地址" prop="address" >
                    <el-cascader placeholder="请选择省市区/县"
                            :options="options"
                            filterable  
                            v-model="ruleForm.address"
                        ></el-cascader>                
                  </el-form-item>
                 
                  <el-form-item label="详细地址" prop="addressDetail" >  
                        <el-input placeholder="请认真填写详细收货地址" v-model="ruleForm.addressDetail"></el-input>     
                  </el-form-item>

                   <el-form-item label="联系电话" prop="tel" >                                 
                        <el-input placeholder="86+" v-model="ruleForm.tel"></el-input>         
                  </el-form-item>

                  <el-form-item class="mt80 " >
                    <el-button type="primary" class="submit-120w36" round @click="saveClick" >保存</el-button>  
                    <el-button type="danger" class="submit-120w36" round @click="cancelClick">取消</el-button>
                 </el-form-item>

               </el-form>
           </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.addReciverAddress{
    padding-top:15px;
    padding-bottom: 40px;
    .el-form-item{
        .el-input,.el-cascader{
            width: 340px;
        }
    }
    .el-button+.el-button{
        margin-left: 70px;
    }
}
.mt80{
    margin-top:80px;
}

</style>


<script>
    export default {
        name:"addReciverAddress",
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
                    name: '',
                    address: '',
                    addressDetail: '',
                    tel: ''
                },
                /* 验证规则 */
                rules: {
                    name: [{
                            required: true,
                            message: '请输入收件人名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    address: [{
                       required: true, message: '请选择收货地址', trigger: 'blur' 
                    }],
                    addressDetail: [{
                        required: true, message: '请输入详细地址', trigger: 'blur'
                    }],
                    tel: [{
                        required: true, message: '请填入正确的联系方式', trigger: 'blur'
                    }]
                },
                addShow: this.addAddress 
            };
        },
        watch:{
            addAddress(val) {
                this.addShow = val;
            }
        },
        props: ["addAddress"],
        methods:{
            cancelClick() {
                //this.addShow = false;
                this.$emit('test')
            },
            saveClick() {
                this.$emit('test')
            },
            changeDialogState() {
                this.$emit('test')
            }
        }
    };
</script>