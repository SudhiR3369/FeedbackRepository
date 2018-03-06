<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ImageFlowSetting.ascx.cs" Inherits="Modules_SageImageFlow_ImageFlowSetting" %>
<div class="sfFormWrapper">
    <h3>Edit Setting</h3>
    
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Style</span></div>
            <div class="formValue">
                <asp:DropDownList ID="ddlStyle" runat="server">
                    <asp:ListItem Value="coverflow">Coverflow</asp:ListItem>
                    <asp:ListItem Value="carousel">Carousel</asp:ListItem>
                    <asp:ListItem Value="flat">Flat</asp:ListItem>
                     <asp:ListItem Value="wheel">Wheel</asp:ListItem>
                </asp:DropDownList></div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfFormlabel">Item Spacing*</span></div>
            <div class="formValue">
                <asp:TextBox ID="txtSpacing" runat="server"  CssClass="sfTextBox">-0.5</asp:TextBox>
                <asp:RegularExpressionValidator 
                    ValidationExpression="[-+]?[0-9]*\.?[0-9]*"
                    runat="server"
                    Display="Dynamic"
                    ErrorMessage="*Real Number Only"
                    ControlToValidate="txtSpacing"
                    ValidationGroup="SettingForm"
                    ></asp:RegularExpressionValidator>
                <asp:RequiredFieldValidator
                    runat="server"
                    ID="rfvSpacing"
                    Display="Dynamic"
                    ErrorMessage="*Required"
                    ControlToValidate="txtSpacing"
                    ValidationGroup="SettingForm" >

                </asp:RequiredFieldValidator>
                <div class="itemSpacingHelp">
                    <span class="icon-help itemSpacingHelpIcon"></span>
                    <div class="arrow_box spacingHelpMsg">Space between items relative to each item's width. 0 for no spacing, negative values to overlap. Eg. -0.1,-0.3,1,2 etc.</div>
                </div>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                
            
                <asp:CheckBox ID="chkArrow" runat="server" Text="Arrow" Checked="true" />
           
        </div>
        <div class="sfFieldset">
            <div class="formKey">
              
                <asp:CheckBox ID="chkAutoPlay" Text="Autoplay"  runat="server" />
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
              
                <asp:CheckBox ID="chkLooping" Checked="true" Text="Looping" runat="server" />
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
               
                <asp:CheckBox ID="chkClickable" Checked="true" Text="Switch on click" runat="server" />
            </div>
        </div>
         <div class="sfFieldset">
            <div class="formKey">
                
                <asp:CheckBox ID="chkScrollwheel" Checked="true" Text="Switch on Scrollwheel" runat="server" />
            </div>
        </div>
        <div class="sfButtonwrapper">
            
                <asp:LinkButton ID="btnUpdateSetting"  ValidationGroup="SettingForm" runat="server" CssClass="sfBtn smlbtn-succ icon-update" OnClick="btnUpdateSetting_Click">Update</asp:LinkButton>
            
        </div>
    
</div>
