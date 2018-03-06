<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PaymentGateway.ascx.cs" Inherits="Modules_PaymentGateway_PaymentGateway" %>



<script type="text/javascript">
    //<![CDATA[
    $(function () {
        $(this).PaymentGateway({
            UserModuleID: '<%=userModuleID%>'
        });
    });
    //]]>	
</script>
<h1>Payment Gateway Setting Manager </h1>
<div class="sfButtonwrapper sfPadding">
    <span class="sfBtn icon-addnew smlbtn-primary" id="btnAddPaymentGateway">Add Payment Gateway</span>
</div>

<div class="sfGridwrapper clearfix">
    <div class="divOuter">
        <div class="CreatePaymentName sfFormwrapper" style="display: none; border: none;">
            <div class="sfFormwrapper">
                <div class="sfFieldset">
                    <div class="formKey" ><span class="sfFormlabel">Payment Gateway Name</span></div>
                    <div class="formValue"> <input type="text" class="sfInput" id="txtPaymentGatewayName" /></div>
                </div>
            </div>
            
           <div class="sfButtonwrapper">
                <span class="sfBtn icon-save smlbtn-succ" id="btnCreatePayment">Save</span>
                <span class="sfBtn icon-close smlbtn-danger" id="btnCancelPaymentCreate">Cancel</span>
            </div>
        </div>

        <p class="noPaymentName sfFormwrapper" style="display: none; border: none;">
            <label>There is no payment Gateway Setting in the system.</label>
        </p>


    </div>
    <div class="PaymentGatewayList" style="display: none;">
        <table class="tblPaymentGatewayList mainGrid" style="border-collapse:collapse">
            <tr>
                <th>S.No</th>
                <th>Payment Gateway Name</th>
                <th>Edit Settings</th>
                <th>Delete Payment</th>
                <th></th>
            </tr>
        </table>
        <div class="sfButtonwrapper">
            <span class="sfBtn icon-delete smlbtn-danger" id="deleteSelectedPayment">Delete Selected</span>
        </div>
    </div>
    <div class="divEdit sfFormwrapper" style="display: none; border: none;">
        <h3 id="Header"></h3>
        <span id="AddRow" class="sfBtn sfButtonwrapper icon-addnew smlbtn-primary">Add New Row</span>
        <table class="tblPayment mainGrid" id="tblpayment">
            <tr>
                <th>Setting Key</th>
                <th>SettingValue</th>
                <th></th>
            </tr>
        </table>
        <div class="sfButtonwrapper no-margin ">
            <span id="SaveEdit" class="sfBtn sfButtonwrapper smlbtn-succ icon-save">Save</span>
            <span id="CancelEdit" class="sfBtn sfButtonwrapper smlbtn-danger icon-close">Cancel</span>
        </div>
    </div>
</div>
