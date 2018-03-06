<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RolesManagement.ascx.cs" Inherits="Modules_Admin_UserManagement_RolesManagement" %>
<asp:Panel ID="pnlRoleForm" runat="server" Visible="false">
    <div class="sfFormwrapper">
        <h2>
            <asp:Label ID="lblAddRoles" runat="server" Text="Add Role"></asp:Label>
            <asp:HiddenField ID="hdnRoleID" runat="server" />
        </h2>
        <div class="sfFormwrapper">
            <div class="sfFieldset">
                <div class="formKey">
                    <asp:Label ID="lblRole" runat="server" CssClass="sfFormlabel" Text="Role Name *"></asp:Label>
                </div>
                <div class="formValue">
                    <asp:TextBox ID="txtRole" runat="server" CssClass="sfInputbox"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvRole" CssClass="sfError" runat="server" ErrorMessage="This field is required." ControlToValidate="txtRole"
                        ValidationGroup="SageFrameRole"></asp:RequiredFieldValidator>
                </div>
            </div>
        </div>
    </div>
    <div class="sfButtonwrapper ">
        <asp:LinkButton ID="imgAdd" runat="server" ValidationGroup="SageFrameRole" OnClick="imgAdd_Click"
            ToolTip="save" CssClass="icon-save sfBtn smlbtn-succ" Text="Save" />
        <asp:LinkButton ID="imgCancel" runat="server" CausesValidation="False" OnClick="imgCancel_Click"
            ToolTip="cancel" CssClass="icon-close sfBtn smlbtn-danger" Text="Cancel" />
    </div>
</asp:Panel>
<asp:Panel ID="pnlRoles" runat="server">
    <div class="sfButtonwrapper ">
        <asp:LinkButton ID="imbAddNewRole" runat="server" OnClick="imbAddNewRole_Click" ToolTip="Add Role"
            CssClass="icon-addnew smlbtn-primary sfBtn" Text="Add Role" />
    </div>
    <div class="sfGridwrapper">

        <asp:GridView ID="gdvRoles" runat="server" AutoGenerateColumns="False" GridLines="None"
            OnRowEditing="gdvRoles_RowEditing"
            OnRowDeleting="gdvRoles_RowDeleting" DataKeyNames="Role,RoleID" Width="100%"
            OnRowDataBound="gdvRoles_RowDataBound" OnRowCommand="gdvRoles_RowCommand">
            <Columns>
                <asp:BoundField DataField="Role" HeaderText="Roles" />
                <asp:TemplateField HeaderStyle-CssClass="sfEdit">
                    <ItemTemplate>
                        <asp:LinkButton ID="imbEdit" runat="server" CausesValidation="False" CommandArgument='<%#Container.DataItemIndex%>'
                            CommandName="Edit" CssClass="icon-edit" ToolTip="Edit the role" />
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderStyle-CssClass="sfDelete">
                    <ItemTemplate>
                        <asp:LinkButton ID="imbDelete" runat="server" CausesValidation="False" CommandArgument='<%#Container.DataItemIndex%>'
                            CommandName="Delete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete this role?');"
                            CssClass="icon-delete" ToolTip="Delete the role" />
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
            <RowStyle CssClass="sfOdd" />
            <AlternatingRowStyle CssClass="sfEven" />
        </asp:GridView>
    </div>
</asp:Panel>
