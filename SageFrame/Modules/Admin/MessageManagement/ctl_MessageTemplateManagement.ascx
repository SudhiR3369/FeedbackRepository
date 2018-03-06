<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_MessageTemplateManagement.ascx.cs"
    Inherits="SageFrame.Modules.Admin.MessageManagement.ctl_MessageTemplateManagement" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc2" %>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/SampleTemplate.ascx" TagPrefix="uc1" TagName="SampleTemplate" %>
<%@ Register Src="~/Modules/Admin/MessageManagement/SampleTemplate/ToolboxItems.ascx" TagPrefix="uc1" TagName="ToolboxItems" %>


<style>
    .dis-table tr:last-child td {
        border: 1px solid rgba(0,0,0,0.06);
        border-top: none;
    }
</style>
<h1>
    <asp:Label ID="lblMessageTemplateManagement" runat="server" Text="Message Template Management"></asp:Label></h1>
<asp:Panel ID="pnlMessageTemplate" runat="server">
    <div class="sfFormwrapper">
        <h2 class="sfFormHeading">
            <asp:Label ID="lblAddEditMessageTemplate" runat="server" Text="Add/Edit Message Template"></asp:Label></h2>
        <asp:HiddenField ID="hdnMessageTemplateID" runat="server" Value="0" />
        
            <div class="sfFieldset ">
                <div class="formKey selectKey">
                    <asp:Label ID="lblMessageTemplateType1" runat="server" CssClass="sfFormlabel" Text="Message Template Type"></asp:Label>
                    
                </div>

                <div class="formValue ">
                 
                   
                    <asp:DropDownList ID="ddlMessageTemplateType" ToolTip="Select Message Template Type"
                        runat="server" OnSelectedIndexChanged="ddlMessageTemplateType_SelectedIndexChanged"
                        AutoPostBack="True" CssClass="sfFormlabel">
                    </asp:DropDownList>
                    <div class="sfButtonwrapper">
                        <asp:HyperLink ID="hypAddMessageTemplateType" runat="server" />
                        <asp:Label ID="lblAddMessageTemplateType" CssClass="icon-addnew smlbtn-primary sfBtn" runat="server"
                            Text="Add Message Template Type" AssociatedControlID="hypAddMessageTemplateType"></asp:Label>
                        <asp:HyperLink ID="hypAddMessageTemplateToken" runat="server" />
                        <asp:Label ID="lblAddMessageTemplateToken" runat="server" CssClass="icon-addnew smlbtn-primary sfBtn"
                            Text="Add Message Template Token" AssociatedControlID="hypAddMessageTemplateToken"></asp:Label>
                     </div>
                </div>
                
            </div>
            <div class="sfFieldset ">
                <div class="formKey">
                    <asp:Label ID="lblFromEmail" runat="server" CssClass="sfFormlabel" Text="From Email *"></asp:Label>
                   
                </div>

                <div class="formValue ">
                    
                    
                    <asp:TextBox ID="txtMailFrom" runat="server" ToolTip="From Email Address" ValidationGroup="vdgMessageTemplate"
                        CssClass="sfNormalTextBox"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtMailFrom"
                        ErrorMessage="This field is required." ValidationGroup="vdgMessageTemplate" CssClass="sfError"></asp:RequiredFieldValidator>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtMailFrom"
                        SetFocusOnError="True" ErrorMessage="Invalid Email Address" ValidationGroup="vdgMessageTemplate"
                        Text="Invalid Email Address" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
                        CssClass="sfError"></asp:RegularExpressionValidator>
                
                </div>
            </div>
            <div class="sfFieldset ">
                <div class="formKey">
                    <asp:Label ID="lblSubject" runat="server" CssClass="sfFormlabel" Text="Subject *"></asp:Label>
                    
                </div>

                <div class="formValue ">
                    
                    
                        <asp:TextBox ID="txtSubject" runat="server" ToolTip="Message template subject" ValidationGroup="vdgMessageTemplate"
                            CssClass="sfNormalTextBox"></asp:TextBox>

                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtSubject"
                            SetFocusOnError="True" ErrorMessage="This field is required." ValidationGroup="vdgMessageTemplate"
                            CssClass="sfError"></asp:RequiredFieldValidator>
                        <div class="sfButtonwrapper">
                        <asp:HyperLink ID="lnkAddSubjectMessageToken" runat="server" />
                        <asp:Label ID="lblAddSubjectMessageToken" runat="server" CssClass="icon-addnew smlbtn-primary  sfBtn"
                            Text="Add Subject Token" AssociatedControlID="lnkAddSubjectMessageToken"></asp:Label>
                    </div>
                    
                    
                </div>
                
            </div>

            <div class="sfFieldset">
                <div class="formKey">
                    <asp:Label ID="lblMessage" runat="server" CssClass="sfFormlabel" Text="Message"></asp:Label></div>
                <div class="formValue" id="tdTextEditor" runat="server">
                    <asp:Panel ID="pnlBasicTextBox" runat="server">

                        <div id="divEdit" runat="server">
                            <CKEditor:CKEditorControl ID="txtBody" runat="server" ClientIDMode="Static" ></CKEditor:CKEditorControl>
                       <asp:RequiredFieldValidator ID="rfvBody"   ValidationGroup="vdgMessageTemplate" runat="server" ErrorMessage="Required" ControlToValidate="txtBody" Display="Dynamic"></asp:RequiredFieldValidator>
                          </div>
                    </asp:Panel>
                    <div>
                        <br />
                       
                          <a ID="btnPreviewMessage" href="javascript:void(0)" class="sfBtn smlbtn-primary icon-page-preview">
                            Preview</a>
                    </div>


                </div>
                <div class="formValue">
                    <uc1:ToolboxItems runat="server" ID="ToolboxItems" />
                    <%-- This is hidden sample which will drop when drag from toolbox--%>
                    <div id="divMessageTempSample" style="display: none">
                        <uc1:SampleTemplate runat="server" ID="SampleTemplate" />
                    </div>

                </div>
            </div>

            <div class="sfFieldset"">
                <div class="formKey">
                   <asp:CheckBox ID="chkIsActive" runat="server" CssClass="sfFormlabel" text="Active"/>
                  
                </div>

                <div class="formValue">
                  
                </div>
                
            </div>
       
    </div>
    <div class="sfButtonwrapper">
        <label class="sfLocale icon-save smlbtn-succ sfBtn">
            Save
            <asp:Button ID="imbSave" runat="server" OnClick="imbSave_Click" ToolTip="Click to save"
                ValidationGroup="vdgMessageTemplate" />
        </label>
        <%-- <asp:Label ID="lblSave" runat="server" Text="Save" AssociatedControlID="imbSave"
            Style="cursor: pointer;"></asp:Label>--%>
        <label class="sfLocale icon-close smlbtn-danger sfBtn">
            Cancel
            <asp:Button ID="imbCancel" runat="server" OnClick="imbCancel_Click" ToolTip="Click to cancel"
                CausesValidation="False" /></label>
        <%--<asp:Label ID="lblCancel" runat="server" Text="Cancel" AssociatedControlID="imbCancel"
            Style="cursor: pointer;"></asp:Label>--%>
    </div>
</asp:Panel>
<asp:Panel ID="pnlMessageTemplateList" runat="server">
    <div class="sfButtonwrapper">
        <label class="sfLocale icon-addnew smlbtn-primary sfBtn">
            Add New Message Template
            <asp:Button ID="imbAddNew" runat="server" OnClick="imbAddNew_Click" ToolTip="Click to add message template" />
        </label>
    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="grdList" runat="server" AutoGenerateColumns="False" EmptyDataText="No Record to Show..."
            GridLines="None" AllowPaging="True" PageSize="15" BorderColor="White" BorderWidth="0px"
            OnPageIndexChanging="grdList_PageIndexChanging" OnRowCommand="grdList_RowCommand"
            OnRowDataBound="grdList_RowDataBound" OnRowDeleting="grdList_RowDeleting" OnRowEditing="grdList_RowEditing"
            OnRowUpdating="grdList_RowUpdating" Width="100%">
            <Columns>
                <asp:TemplateField HeaderText="Message Template Subject">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CommandName="Edit" CommandArgument='<%# Eval("MessageTemplateID") %>'>
                            <asp:Label ID="lblSubject" runat="server" Text='<%# Eval("Subject") %>'></asp:Label>
                        </asp:LinkButton>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Left" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="From Email">
                    <ItemTemplate>
                        <asp:Label ID="lblFromEmail" runat="server" Text='<%# Eval("MailFrom") %>'></asp:Label>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Left" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:BoundField DataField="IsActive" HeaderText="Active">
                    <HeaderStyle CssClass="cssClassColumnIsActive" />
                </asp:BoundField>
                <asp:TemplateField HeaderText="Added On">
                    <ItemTemplate>
                        <%# Eval("AddedOn","{0:yyyy/MM/dd}") %>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Left" CssClass="cssClassColumnAddedOn" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" Width="100px" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Updated On">
                    <ItemTemplate>
                        <%# Eval("UpdatedOn","{0:yyyy/MM/dd}") %>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Left" CssClass="cssClassColumnUpdatedOn" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <asp:LinkButton ID="imbEdit" runat="server" CausesValidation="False" CommandArgument='<%# Eval("MessageTemplateID") %>'
                            CommandName="messgeEdit" CssClass="icon-edit"
                            ToolTip="Edit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="cssClassColumnEdit" />
                    <ItemStyle HorizontalAlign="Left" VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="cssClassAlternativeEven" />
            <HeaderStyle CssClass="cssClassHeadingOne" />
            <PagerStyle CssClass="sfPagination" />
            <RowStyle CssClass="cssClassAlternativeOdd" />
        </asp:GridView>
    </div>
</asp:Panel>
<cc2:ModalPopupExtender runat="server" ID="mpeAddMessageTokenModalPopup" TargetControlID="hiddenTargetControlForAddMessageTokenModalPopup"
    PopupControlID="pnlAddMessageTokenPopup" BackgroundCssClass="ModalPopupBG" OkControlID="btnAddMessageTokenOk"
    CancelControlID="btnAddMessageTokenCancel" PopupDragHandleControlID="pnlAddMessageTokenHandle"
    RepositionMode="RepositionOnWindowScroll" DynamicServicePath="" Enabled="True">
</cc2:ModalPopupExtender>
<asp:Panel ID="pnlAddMessageTokenPopup" runat="server" Style="display: none;">
    <div class="sfPopup">
        <div class="sfPopupinner">
            <asp:Panel ID="pnlAddMessageTokenHandle" runat="server" CssClass="cssClassPopTitle">
                Select message token
            </asp:Panel>
            <div class="sfPopupclose" id="btnAddMessageTokenCancel" runat="server">
            </div>
            <asp:Panel ID="pnlPopupBody" runat="server">
                <asp:ListBox ID="lstMessageToken" runat="server" Rows="10" CssClass="cssClassPopUpMessage"></asp:ListBox>
            </asp:Panel>
            <div class="sfButtonwrapper ">
                <button type="button" id="btnAddMessageTokenOk" runat="server" class="sfBtn smlbtn-primary icon-addnew">Add</button>
            </div>
        </div>
    </div>
</asp:Panel>
<asp:HiddenField runat="server" ID="hiddenTargetControlForAddMessageTokenModalPopup" />
<cc2:ModalPopupExtender BackgroundCssClass="ModalPopupBG" ID="mpeMessageTemplateType"
    OkControlID="btnCancelMessageTemplateType" CancelControlID="btnCancelMessageTemplateType"
    TargetControlID="btnopen" PopupControlID="pnlMessageTemplateType" PopupDragHandleControlID="pnlDragHandlerMessageTemplateType"
    RepositionMode="RepositionOnWindowScroll" runat="server" DynamicServicePath=""
    Enabled="True">
</cc2:ModalPopupExtender>
<asp:Panel ID="pnlMessageTemplateType" runat="server" Style="display: none" CssClass="sfPopup">
    <asp:Panel ID="pnlDragHandlerMessageTemplateType" runat="server">
        <asp:Label ID="lblAMTT" runat="server" Text="Add Message Template Type" CssClass="cssClassPopTitle"></asp:Label>
    </asp:Panel>
    <div class="sfPopupclose" id="btnCancelMessageTemplateType" runat="server">
    </div>
    <div class="cssClassFormWrapper ">
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblMessageTemplateType" runat="server" CssClass="cssClassFormLabel"
                        Text="Message Template Type *"></asp:Label>
                </td>

                <td>
                    <asp:TextBox ID="txtMessageTemplateType" runat="server" EnableViewState="False"></asp:TextBox>
                    <asp:Label ID="lblErrorMessageTemplateType" runat="server" CssClass="sfError" Text="*"
                        Visible="False"></asp:Label>
                    <asp:RequiredFieldValidator ID="rfvMessageTemplateType" runat="server" ControlToValidate="txtMessageTemplateType"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="AddMsgTempType"
                        SetFocusOnError="True" CssClass="sfError"></asp:RequiredFieldValidator>
                </td>
            </tr>
        </table>
        <div class="cssClassButtonWrapper button-paddleft">
            <span class="sfBtn smlbtn-primary icon-addnew">
                <asp:Button ID="btnOkMessageTemplateType" class="sfBtn icon-addnew smlbtn-primary" runat="server" Text="Add" OnClick="btnOkMessageTemplateType_Click" ValidationGroup="AddMsgTempType" />
            </span>
        </div>
    </div>
</asp:Panel>
<cc2:ModalPopupExtender BackgroundCssClass="ModalPopupBG" ID="mpeMessageTemplateToken"
    OkControlID="btnCancelMessageTemplateToken" CancelControlID="btnCancelMessageTemplateToken"
    TargetControlID="btnopen" PopupControlID="pnlMessageTemplateToken" PopupDragHandleControlID="pnlDragHandlerMessageTemplateToken"
    RepositionMode="RepositionOnWindowScroll" runat="server" DynamicServicePath=""
    Enabled="True">
</cc2:ModalPopupExtender>
<asp:Panel ID="pnlMessageTemplateToken" runat="server" Style="display: none" CssClass="sfPopup">
    <asp:Panel ID="pnlDragHandlerMessageTemplateToken" runat="server" CssClass="cssClassPopTitle">
        <asp:Label ID="lblMessageTempToken" runat="server" Text="Add Message Template Token"></asp:Label>
    </asp:Panel>
    <div class="sfPopupclose" id="btnCancelMessageTemplateToken" runat="server">
    </div>
    <div class="cssClassFormWrapper">
        <table>
            <tr>
                <td>
                    <asp:Label ID="lblMessageTemplateToken" runat="server" CssClass="cssClassFormLabel"
                        Text="Message Template Token *"></asp:Label>
                </td>

                <td>
                    <asp:TextBox ID="txtMessageTemplateToken" runat="server" EnableViewState="False"></asp:TextBox>
                    <asp:Label ID="lblErrorMessageTemplateToken" runat="server" CssClass="cssClassError"
                        Text="*" Visible="False"></asp:Label>
                    <asp:RequiredFieldValidator ID="rfvMessageTemplateToken" runat="server" ControlToValidate="txtMessageTemplateToken"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="AddMsgTempToken"
                        SetFocusOnError="True" CssClass="sfError"></asp:RequiredFieldValidator>
                </td>
            </tr>
        </table>
        <div class="cssClassButtonWrapper button-paddleft">
            <span class="sfBtn smlbtn-primary icon-addnew">
                <asp:Button ID="btnOkMessageTemplateToken" runat="server" Text="Add" OnClick="btnOkMessageTemplateToken_Click"
                    ValidationGroup="AddMsgTempToken" />
            </span>
        </div>
    </div>
</asp:Panel>
<%--<cc2:ModalPopupExtender runat="server" ID="mpeMessagePreview"
    PopupControlID="PnlMessagePreviewPopup" TargetControlID="hdnMessagePreview" BackgroundCssClass="ModalPopupBG" OkControlID=""
    CancelControlID="divCancelMsgPrevPopup" PopupDragHandleControlID="pnlMessagePreviewPopHead"
    RepositionMode="RepositionOnWindowScroll" DynamicServicePath="" Enabled="True">
</cc2:ModalPopupExtender>--%>
<%--<asp:Panel ID="PnlMessagePreviewPopup" runat="server" Style="display: none;">
    <div class="sfPopup">
        <div class="sfPopupinner">
            <asp:Panel ID="pnlMessagePreviewPopHead" runat="server" CssClass="cssClassPopTitle">
                Message Preview
            </asp:Panel>
            <div class="sfPopupclose" id="divCancelMsgPrevPopup" runat="server">
            </div>
            <asp:Panel ID="Panel3" runat="server">
                <asp:ListBox ID="ListBox1" runat="server" Rows="10" CssClass="cssClassPopUpMessage"></asp:ListBox>
            </asp:Panel>

        </div>
    </div>
</asp:Panel>--%>
<asp:HiddenField runat="server" ID="hdnMessagePreview" />
<asp:HiddenField runat="server" ID="hdnAddMessageTemplateType" />
<asp:HiddenField runat="server" ID="hdnAddMessageTemplateToken" />
<asp:Button ID="btnopen" Style="display: none" runat="server" Text="Button" />
<div id="divMessagePreview" style="background:#fff;height:auto !important;display:none;">
      <asp:Literal ID="ltrlPreview" runat="server"></asp:Literal>
</div>
<script type="text/javascript">
    $(function () {

        $(this).MessageTemplate({
        });
       
    });
    function ClearTemplateText(textControlID, errLblID) {
        var textBox = $("#" + textControlID);
        if (textBox != null) {
            $(textBox).val('');
        }
        var errLbl = $("#" + errLblID);
        if (errLbl != null) {
            $(errLbl).val('*');
            $(errLbl).hide();
        }
        Page_ClientValidate('');
    }
    
    
</script>

<style>
#divMessagePreview{max-height:500px !important;overflow-y:auto}
</style>