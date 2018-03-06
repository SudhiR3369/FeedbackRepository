<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DashboardLinkEdit.ascx.cs" Inherits="Modules_UseFullLink_UsefullLinkEdit" %>
<h2>Edit Link Information</h2>
<div id="divGridContents" runat="server">
    <asp:LinkButton ID="btnAddNew" runat="server" CssClass="icon-addnew sfBtn smlbtn-primary" OnClick="btnAddNew_click" Text="Add"></asp:LinkButton>
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
                        <asp:Label runat="server" Text='<%#Eval("LinkTitle")%>'></asp:Label>

                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Target Page">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("PageName")%>'></asp:Label>

                    </ItemTemplate>

                </asp:TemplateField>

                <asp:TemplateField HeaderText="Is Parent">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("IsParent")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Parent Menu">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("ParentPageMenu")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Is Active">
                    <ItemTemplate>
                        <asp:Label runat="server" Text='<%#Eval("IsActive")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>

                <asp:TemplateField HeaderText="Order">
                    <ItemTemplate>
                        <div>
                            <asp:LinkButton ID="imgListUp" runat="server" CausesValidation="False" CommandArgument='<%# Eval("LinkID") %>'
                                CommandName="SortUp" CssClass="icon-arrow-n" ToolTip="Move Up" meta:resourcekey="imgListUpResource1"></asp:LinkButton>
                        </div>
                        <div>
                            <asp:LinkButton ID="imgListDown" runat="server" CausesValidation="False" CommandArgument='<%# Eval("LinkID") %>'
                                CommandName="SortDown" ToolTip="Move Down" meta:resourcekey="imgListDownResource1"
                                CssClass="icon-arrow-s"></asp:LinkButton>
                        </div>
                    </ItemTemplate>

                </asp:TemplateField>
                <asp:TemplateField HeaderText="Edit">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                            CommandArgument='<%#Eval("LinkID") %>' CommandName="ContentEdit" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                    <ItemStyle VerticalAlign="Top" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Delete">
                    <ItemTemplate>
                        <asp:LinkButton ID="TestDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                            CommandArgument='<%# Eval("LinkID") %>' CommandName="ContentDelete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
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
            <span class="sfFormlabel">Link Title</span>
        </div>
        <div class="formValue">
            <asp:TextBox runat="server" ID="txtLinkTitle" CssClass="sfInputbox"></asp:TextBox>
            <asp:RequiredFieldValidator ID="rfvTitle" ErrorMessage="Required" ControlToValidate="txtLinkTitle" runat="server" ValidationGroup="usefulLink"></asp:RequiredFieldValidator>
        </div>
    </div>

    <div class="sfFieldset">
        <asp:CheckBox runat="server" ID="chkIsParent" Text="Is Parent" class="sfCheckBox chkIsParent" Checked="false" />
    </div>

    <div class="sfFieldset selectPage">
        <div class="formKey">
            <span class="sfFormlabel">Select Redirect Page</span>
        </div>
        <div class="formValue">
            <asp:DropDownList class="ddlPage" ID="ddlPageList" runat="server"></asp:DropDownList>
        </div>
    </div>

    <div class="sfFieldset selectParentPage">
        <div class="formKey">
            <span class="sfFormlabel">Select Parent Menu</span>
        </div>
        <div class="formValue">
            <asp:DropDownList class="ddlParentPage" ID="ddlParentPageList" runat="server"></asp:DropDownList>
        </div>
    </div>

    <div class="sfFieldset">
        <asp:CheckBox runat="server" ID="chkIsactiveContent" Text="Active" class="sfCheckBox" />
    </div>
    <asp:LinkButton ID="btnSaveContent" runat="server" ValidationGroup="usefulLink" OnClick="btnSaveContent_Click" CssClass="icon-save sfBtn smlbtn-succ" Text="save"></asp:LinkButton>
    <asp:LinkButton ID="btnCancel" runat="server" OnClick="btnCancel_Click" CssClass="icon-cancel sfBtn smlbtn-danger" Text="Cancel"></asp:LinkButton>
</div>

<script type="text/javascript">
    $('.chkIsParent input[type="checkbox"]')
        .change(toggleDiv).
        trigger('change');

    function toggleDiv() {
        if ($(this).is(':checked')) {
            $('.selectPage').hide();
        } else {
            $('.selectPage').show();
        }
    }
</script>
