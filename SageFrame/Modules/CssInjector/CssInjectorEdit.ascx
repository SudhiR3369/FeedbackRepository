<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CssInjectorEdit.ascx.cs" Inherits="Modules_CssInjector_CssInjectorEdit" %>
<div id="divCssInject" class="divInjectForm">
    <div id="divCssInjectWrap" class="sfFormwrapper clearfix">
        <h2>Css Injector
        </h2>
        <p class="sfInformation">
            <i class="icon-info sfNote"></i>&nbsp; All <span class="sfRequired">* </span>are
            required fields
       
        </p>
        <div class="divJsForm">
            <div id="divJsText">
                <label>Enter Style *:</label>
                <textarea id="txtScript" runat="server" cols="50" rows="50"></textarea>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtScript"
                                ErrorMessage="Required field." CssClass="sfRequired" ValidationGroup="required"></asp:RequiredFieldValidator>
            </div>
        </div>
        <div class="sfButtonwrapper">
            <asp:LinkButton ID="btnSaveContent" runat="server" OnClick="btnSaveContent_Click" CssClass="icon-save sfBtn" Text="save" ValidationGroup="required"></asp:LinkButton>            
        </div>
    </div>
</div>
