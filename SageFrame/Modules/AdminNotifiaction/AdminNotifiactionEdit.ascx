<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdminNotifiactionEdit.ascx.cs" Inherits="Modules_AdminNotifiaction_AdminNotifiactionEdit" %>
<div id="divAdminNotification" class="divNotification">
    <asp:Panel runat="server" ID="pnlNotificationGrid">
        <div class="sfButtonwrapper sfPadding">
            <asp:LinkButton ID="btnAddNew" runat="server" CssClass="icon-addnew smlbtn-primary sfBtn" OnClick="btnAddNew_click" Text="Add New"></asp:LinkButton>
        </div>
        <div class="sfTableWrapper">
            <asp:GridView ID="gdvNotification" runat="server"
                AutoGenerateColumns="False"
                OnRowCommand="gdvNotification_RowCommand"
                OnPageIndexChanging="gdvNotification_PageIndexChanging"
                EmptyDataText="......No Records Found......"
                AllowPaging="true"
                PageSize="10"
                GridLines="Vertical" OnRowDeleted="gdvNotification_RowDeleted" OnRowDeleting="gdvNotification_RowDeleting" OnRowEditing="gdvNotification_RowEditing">
                <Columns>
                    <asp:TemplateField HeaderText="S.N">
                        <ItemTemplate>
                            <asp:Label class="sfFormlabel" runat="server" Text=' <%#Container.DataItemIndex+1 %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Name">
                        <ItemTemplate>
                            <asp:Label runat="server" Text='<%#Eval("Name")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Message">
                        <ItemTemplate>
                            <asp:Label runat="server" Text='<%#Eval("Message")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Page">
                        <ItemTemplate>
                            <asp:Label runat="server" Text='<%#Eval("PageUrl")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="IsActive">
                        <ItemTemplate>
                            <asp:Label runat="server" Text='<%#Eval("IsActive")%>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Edit">
                        <ItemTemplate>
                            <asp:LinkButton ID="NotificationEdit" runat="server" CssClass="icon-edit" CausesValidation="False"
                                CommandArgument='<%#Eval("NotificationID") %>' CommandName="Edit" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfEdit" VerticalAlign="Top" />
                        <ItemStyle VerticalAlign="Top" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Delete">
                        <ItemTemplate>
                            <asp:LinkButton ID="NotificationDelete" runat="server" CssClass="icon-delete" CausesValidation="False"
                                CommandArgument='<%# Eval("NotificationID") %>' CommandName="Delete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete ?');" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfDelete" VerticalAlign="Top" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </asp:Panel>
    <asp:Panel ID="pnlNotificationForm" runat="server" Visible="false">
        <asp:HiddenField ID="hdnNotificationID" Value="0" runat="server" />
        <div id="divNotificationEdit" class=" clearfix">
            <div class="sfFormwrapper">
                <h2>Add Notification </h2>
                <p class="sfInformation sfNote">
                    <i class="icon-info "></i>&nbsp; All <span class="sfRequired">* </span>are
            required fields
       
                </p>
                <div class="divNotificationWrap">

                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:Label ID="lblName" CssClass="sfFormlabel" runat="server" Text="Name *"></asp:Label>
                        </div>
                        <div class="formValue">
                            <asp:TextBox ID="txtName" runat="server"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtName"
                                ErrorMessage="Required field." CssClass="sfRequired" ValidationGroup="notificationRequired"></asp:RequiredFieldValidator>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:Label ID="lblMessage" CssClass="sfFormlabel" runat="server" Text="Message *"></asp:Label>
                        </div>
                        <div class="formValue">
                            <asp:TextBox ID="txtMessage" runat="server"></asp:TextBox>

                            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtMessage"
                                ErrorMessage="Required field." CssClass="sfRequired" ValidationGroup="notificationRequired"></asp:RequiredFieldValidator>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:Label ID="lblPage" runat="server" CssClass="sfFormlabel" Text="Page Url *"></asp:Label>
                        </div>
                        <div class="formValue">
                            <asp:TextBox ID="txtPageUrl" runat="server"></asp:TextBox>

                            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtPageUrl"
                                ErrorMessage="Required field." CssClass="sfRequired" ValidationGroup="notificationRequired"></asp:RequiredFieldValidator>
                        </div>
                    </div>
                    <div class="sfFieldset">
                        <div class="formKey">
                            <asp:CheckBox ID="chkIsActive" CssClass="sfCheckbox inline" runat="server" />
                            <asp:Label ID="lblActive" runat="server" CssClass="sfFormlabel" Text="Active"></asp:Label>
                        </div>
                    </div>
                </div>

                <div class="sfButtonwrapper">
                    <asp:LinkButton ID="btnSaveContent" runat="server" OnClick="btnSaveContent_Click" CssClass="icon-update sfBtn smlbtn-succ" Text="save" ValidationGroup="notificationRequired"></asp:LinkButton>
                    <asp:LinkButton ID="btnCancel" runat="server" OnClick="btnCancel_Click" CssClass="icon-close sfBtn smlbtn-danger" Text="Cancel"></asp:LinkButton>
                </div>
            </div>
        </div>
    </asp:Panel>
</div>
