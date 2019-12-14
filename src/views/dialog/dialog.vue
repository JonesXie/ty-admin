<template>
    <div class="app-container">       
        <pay-result></pay-result>
        <modify-login-pwd></modify-login-pwd>
        <modify-phone></modify-phone>
        <kucun-transfer></kucun-transfer>
        <kucun-transfer-info></kucun-transfer-info>
        <add-reciver-address></add-reciver-address>
        <invoice-info></invoice-info>
        <invoice-apply></invoice-apply>
        <invoice-info-add></invoice-info-add>
        <invoice-info-add-person></invoice-info-add-person>
        <noteLook></noteLook>
        <noteAddadmin></noteAddadmin>
        <note-return></note-return>
        <note-return-refused></note-return-refused>
        <logistics></logistics>
        <confirm-sold></confirm-sold>
        <confirm-order-cancel></confirm-order-cancel>
        <voucher-upload></voucher-upload>
         <return-apply-select-pro></return-apply-select-pro>
        <select-pro-input></select-pro-input>
        <select-pro-sell></select-pro-sell>
        <select-pro-stock></select-pro-stock>
                
    </div> 
               
</template>
/*   
    modifyLoginPwd: '修改登录密码',
    payResult: '支付结果',
    addReciverAddress: '添加收货地址',
    kucunTransfer: '转库存',
    kucunTransferInfo: '转库存信息',
    invoiceInfo: "发票信息",
    invoiceInfoAdd: "添加发票信息",
    invocieApply:'发票申请',
    confirmSold:"确认售出"
 */


<script>
import { 
      modifyLoginPwd, modifyPhone, kucunTransferInfo, kucunTransfer, addReciverAddress,
    invoiceInfo, invoiceInfoAdd, invoiceApply, noteLook, noteAddadmin, noteReturnRefused, noteReturn,
    logistics, invoiceInfoAddPerson, confirmSold, confirmOrderCancel, voucherUpload, returnApplySelectPro,
    SelectProInput, SelectProSell, SelectProStock
 } from './components'
export default {
    components: {
         
        modifyLoginPwd,
        modifyPhone,
        kucunTransferInfo,
        kucunTransfer,
        addReciverAddress,
        invoiceInfo,
        invoiceInfoAdd,
        invoiceApply,
        noteLook,
        noteAddadmin,
        noteReturnRefused,
        noteReturn,
        logistics,
        invoiceInfoAddPerson,
        confirmSold,
        confirmOrderCancel,
        voucherUpload,
        returnApplySelectPro,
        SelectProInput, 
        SelectProSell, 
        SelectProStock
    }
}
</script>
