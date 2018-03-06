<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleQuickMenuEdit.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleSetting_ArticleQuickMenuEdit" %>
<h2>Edit Link Information</h2>
<div id="divGridContents" runat="server">
    <asp:LinkButton ID="btnAddNew" runat="server" CssClass="icon-addnew sfBtn smlbtn-primary" OnClick="btnAddNew_click" Text="Add New"></asp:LinkButton>
    <div class="sfGridwrapper">

        <asp:GridView ID="gdvContents" runat="server"
            AutoGenerateColumns="False"
            OnRowCommand="gdvContents_RowCommand"
            EmptyDataText="......No Records Found......"
            AllowPaging="false">
            <Columns>
                <asp:TemplateField HeaderText="S.N">
                    <ItemTemplate>
                        <asp:Label class="sfFormlabel" runat="server" Text=' <%#Container.DataItemIndex+1 %>'></asp:Label>
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Link Title">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("MenuTitle")%>'></asp:Label>

                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="IsActive">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("IsActive")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                            CommandArgument='<%#Eval("MenuID") %>' CommandName="ContentEdit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                            CommandArgument='<%# Eval("MenuID") %>' CommandName="ContentDelete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfDelete" VerticalAlign="Top" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
</div>
<div id="divContentForm" class="sfFormwrapper" runat="server" visible="false">
    <asp:HiddenField ID="hdnContentID" Value="0" runat="server" />

    <div class="sfFieldset">
        <div class="formKey">
            <span class="sfFormlabel">Menu Title</span>
        </div>
        <div class="formValue">
            <asp:TextBox runat="server" ID="txtLinkTitle" CssClass="sfInputbox"></asp:TextBox>
            <asp:RequiredFieldValidator ID="rfvTitle" ErrorMessage="Required" ControlToValidate="txtLinkTitle" runat="server" ValidationGroup="usefulLink"></asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="sfFieldset">
        <div class="formKey">
            <span class="sfFormlabel">Menu URL</span>
        </div>
        <div class="formValue">
            <asp:TextBox runat="server" ID="txtLinkURL" CssClass="sfInputbox"></asp:TextBox>
            <asp:RequiredFieldValidator ID="rfvURL" ErrorMessage="Required" ControlToValidate="txtLinkURL" runat="server" ValidationGroup="usefulLink"></asp:RequiredFieldValidator>
            
        </div>
    </div>

    <div class="sfFieldset">
        <div class="formKey">
            <span class="sfFormlabel">Menu Description</span>
        </div>
        <div class="formValue">
            <textarea runat="server" ID="txtMenuDescription" CssClass="sfInputbox"></textarea>            
        </div>
    </div>

    <div class="sfFieldset">
        <asp:CheckBox runat="server" ID="chkIsactiveContent" class="BootStrapSwitch sfCheckBox" />
    </div>
    <asp:LinkButton ID="btnSaveContent" runat="server" ValidationGroup="usefulLink" OnClick="btnSaveContent_Click" CssClass="icon-save sfBtn smlbtn-succ" Text="save"></asp:LinkButton>
    <asp:LinkButton ID="btnCancel" runat="server" OnClick="btnCancel_Click" CssClass="icon-cancel sfBtn smlbtn-danger" Text="Cancel"></asp:LinkButton>
</div>
