<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RecycleBin.ascx.cs" Inherits="Modules_Admin_RecycleBin_RecycleBin" %>
<script type="text/javascript">

    function ValidateCheckBoxSelection(obj) {
        var valid = false;
        var gv = '#' + '<%=gdvUser.ClientID%>' + ' tr';
        $.each($(gv), function () {
            if ($(this).find("td:eq(0) input[type='checkbox']").prop("checked")) {
                valid = true;
            }
        });
        if (!valid)
            SageAlertDialog('Please select at least one user.', 'No user Selected');
        else {
            return ConfirmDialog(obj, 'Confirmation', 'Are you sure you want to delete the users?');
        }
        return valid;
    }


    function ValidateSelectedCheckBoxes(obj, type, action) {
        var valid = false;

        var gv = '';
        switch (type) {
            case 'user':
                gv = '#' + '<%=gdvUser.ClientID%>' + ' tr';
                break;

            case 'role':
                gv = '#' + '<%=gdvRoles.ClientID%>' + ' tr';
                break;

            case 'portal':
                gv = '#' + '<%=gdvPortal.ClientID%>' + ' tr';
                break;
        }
        $.each($(gv), function () {

            if ($(this).find("td:eq(0) input[type='checkbox']").prop("checked")) {
                valid = true;
            }
        });
        if (!valid)
            AlertDialog('select a user', 'Please select at least one ' + type + '.');
        else {
            SageConfirmDialog('Are you sure you want to ' + action + ' the selected ' + type + '(s)?').done(function () {
                return true;
            }).fail(function () {
                return false;
            });
        }
        return valid;
    }

    $(function () {
        $(this).RecycleBin({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'
        });

        var userGrid = '#' + '<%=gdvUser.ClientID%>';

        $(userGrid).find("tr:first th.sfCheckbox input").bind("click", function () {
            if ($(this).prop("checked")) {
                $(userGrid).find("tr input.sfSelectall").prop("checked", true);
            }
            else {
                $(userGrid).find("tr input.sfSelectall").prop("checked", false);
            }
        });


        var portalGrid = '#' + '<%=gdvPortal.ClientID%>';

        $(portalGrid).find("tr:first th.sfCheckbox input").bind("click", function () {
            if ($(this).prop("checked")) {
                $(portalGrid).find("tr input.sfSelectall").prop("checked", true);
            }
            else {
                $(portalGrid).find("tr input.sfSelectall").prop("checked", false);
            }
        });


        var rolesGrid = '#' + '<%=gdvRoles.ClientID%>';


        $(rolesGrid).find("tr:first th.sfCheckbox input").bind("click", function () {
            if ($(this).prop("checked")) {
                $(rolesGrid).find("tr input.sfSelectall").prop("checked", true);
            }
            else {
                $(rolesGrid).find("tr input.sfSelectall").prop("checked", false);
            }
        });


        var usersCount = $(userGrid).find("tr").length;
        if (usersCount < 1) {
            var pnlUser = '#' + '<%=pnlUsers.ClientID%>';
            $(pnlUser).hide();

        }

        var portalCount = $(portalGrid).find("tr").length;
        if (portalCount < 1) {
            var pnlPortal = '#' + '<%=pnlPortals.ClientID%>';
            $(pnlPortal).hide();
        }


        var rolesCount = $(rolesGrid).find("tr").length;
        if (rolesCount < 1) {
            var pnlRoles = '#' + '<%=pnlRoles.ClientID%>';

            $(pnlRoles).hide();

        }




    });

</script>

<div class="fieldset">

    <h1>Recycle Bin</h1>

    <div class="sfButtonwrapper sfPadding">
        <asp:LinkButton ID="imgEmptyRecycleBin" runat="server" OnClick="imgEmptyRecycleBin_Click" Text="Empty Recycle Bin"
            CssClass="icon-delete smlbtn-secondary sfBtn" ToolTip="Empty Recycle Bin" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Do you wish to permanently clear the items in the Recycle Bin?');" />

    </div>


    <asp:Panel ID="pnlRoles" runat="server">
        <h2>Deleted Roles</h2>
        <div class="sfGridwrapper">
            <asp:GridView ID="gdvRoles" runat="server" AutoGenerateColumns="False" GridLines="None" CssClass="mainGrid"
                OnRowDeleting="gdvRoles_RowDeleting" DataKeyNames="RoleName,RoleID,PortalID" Width="100%"
                OnRowDataBound="gdvRoles_RowDataBound" OnRowCommand="gdvRoles_RowCommand" EmptyDataText="Roles not found">
                <Columns>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <input id="chkBoxItemRoles" runat="server" class="sfSelectall" type="checkbox" />
                        </ItemTemplate>
                        <HeaderTemplate>
                            <input id="chkBoxHeaderRoles" runat="server" type="checkbox" />
                        </HeaderTemplate>
                        <HeaderStyle CssClass="sfCheckbox"></HeaderStyle>
                    </asp:TemplateField>

                    <asp:TemplateField>
                        <ItemTemplate>

                            <asp:Label ID="lnkRoleName" runat="server" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="EditUser" Text='<%# Eval("RoleName") %>'></asp:Label>
                            <asp:HiddenField ID="hdnRoleID" runat="server" Value='<%# Eval("RoleID") %>' />
                            <asp:HiddenField ID="hdnRolePortalID" runat="server" Value='<%# Eval("PortalID") %>' />

                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblUsername" runat="server"
                                Text="Roles"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>


                    <%--<asp:BoundField DataField="RoleName" HeaderText="Roles" />--%>

                    <%--Undo--%>
                    <asp:TemplateField HeaderText="Restore">
                        <ItemTemplate>
                            <asp:LinkButton ID="imgEditRoles" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="Undo" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Do you wish to restore this role?');"
                                CssClass="fa fa-undo" ToolTip="Restore" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfEdit" />
                    </asp:TemplateField>

                    <%--Delete--%>
                    <asp:TemplateField HeaderStyle-CssClass="sfDelete" HeaderText="Dispose">
                        <ItemTemplate>
                            <asp:LinkButton ID="imbDeleteRoles" runat="server" CausesValidation="False" CommandArgument='<%#Container.DataItemIndex%>'
                                CommandName="Delete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Some users might still be linked to this role. Are you sure you want to delete this role permanently ?');"
                                CssClass="icon-delete" ToolTip="Delete the role" />
                        </ItemTemplate>
                    </asp:TemplateField>

                </Columns>
                <RowStyle CssClass="sfOdd" />
                <AlternatingRowStyle CssClass="sfEven" />
                <EmptyDataRowStyle CssClass="sfEmptyrow" />
            </asp:GridView>

            <div class="sfButtonwrapper sfPadding">
                <asp:LinkButton Text="Restore Selected Roles" CssClass="icon-update sfBtn smlbtn-succ" ID="imgBtnRestoreSelectedRoles"
                    runat="server" OnClick="imgBtnRestoreSelectedRoles_Click" ToolTip="Restore all selected" OnClientClick="return ValidateSelectedCheckBoxes(this,'role','restore');" />

                <asp:LinkButton ID="imgBtnDeleteSelectedRoles" Text="Delete Selected Roles" CssClass="icon-delete sfBtn sfBtn smlbtn-danger"
                    runat="server" OnClientClick="return ValidateSelectedCheckBoxes(this,'role','delete')" OnClick="imgBtnDeleteSelectedRoles_Click"
                    ToolTip="Delete all seleted" />
            </div>


        </div>

    </asp:Panel>

    <asp:Panel ID="pnlUsers" runat="server">
        <h2>Deleted Users</h2>
        <div class="sfGridwrapper">

            <asp:GridView ID="gdvUser" runat="server" AutoGenerateColumns="False"
                OnRowDeleting="gdvUser_RowDeleting"
                OnRowCommand="gdvUser_RowCommand"
                AllowPaging="True" CssClass="mainGrid" AllowSorting="True" GridLines="None" OnRowDataBound="gdvUser_RowDataBound"
                Width="100%" EmptyDataText="User not found" DataKeyNames="UserId,Username,PortalID" OnPageIndexChanging="gdvUser_PageIndexChanging">
                <Columns>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <input id="chkBoxItemUser" runat="server" class="sfSelectall" type="checkbox" />
                        </ItemTemplate>
                        <HeaderTemplate>
                            <input id="chkBoxHeaderUser" runat="server" type="checkbox"></input>
                        </HeaderTemplate>
                        <HeaderStyle CssClass="sfCheckbox"></HeaderStyle>
                    </asp:TemplateField>

                    <%--SN--%>
                    <asp:TemplateField HeaderText="S.N">
                        <ItemTemplate>
                            <%#Container.DataItemIndex+1 %>
                        </ItemTemplate>
                    </asp:TemplateField>

                    <%--Username--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:Label ID="lnkUsernameUser" runat="server" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="EditUser" Text='<%# Eval("Username") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblUsername" runat="server"
                                Text="Username"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>

                    <%--FirstName--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <%# Eval("FirstName")%>
                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblFirstName" runat="server" Text="First Name"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>

                    <%--LastName--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <%# Eval("LastName")%>
                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblLastName" runat="server"
                                Text="Last Name"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>

                    <%--Email--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <%# Eval("Email")%>
                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblEmail" runat="server" Text="Email"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>


                    <%--Portal ID--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <%# Eval("PortalID")%>
                        </ItemTemplate>
                        <HeaderTemplate>
                            <asp:Label ID="lblPortalID" runat="server" Text="Portal ID"></asp:Label>
                        </HeaderTemplate>
                    </asp:TemplateField>

                    <%--Hidden Fields--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <div class="spxItem">
                                <asp:HiddenField ID="hdnIsDeletedByRole" runat="server" Value='<%# Eval("IsDeletedByRole") %>' />
                            </div>
                            <asp:HiddenField ID="hdnUserID" runat="server" Value='<%# Eval("UserId") %>' />
                            <asp:HiddenField ID="hndUserPortalID" runat="server" Value='<%# Eval("PortalID") %>' />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfPreview" />
                        <ControlStyle CssClass="isDeleted" />
                    </asp:TemplateField>


                    <%--Is Active--%>
                    <%--    <asp:TemplateField >
                    <ItemTemplate>
                        <asp:HiddenField ID="hdnIsActive" runat="server" Value='<%# Eval("IsActive") %>' />
                        <input id="chkBoxIsActiveItem" class="sfIsactive" runat="server" type="checkbox" />
                    </ItemTemplate>
                    <HeaderTemplate>
                        <input id="chkBoxIsActiveHeader" runat="server" type="checkbox" />
                        <asp:Label ID="lblIsActive" runat="server" 
                            Text="Active"></asp:Label>
                    </HeaderTemplate>
                    <HeaderStyle CssClass="sfIsactive" />
                </asp:TemplateField>--%>

                    <%--Undo Delete--%>
                    <asp:TemplateField HeaderText="Restore">
                        <ItemTemplate>
                            <asp:LinkButton ID="imgEditUser" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="Undo" OnClientClick="return PerformRestoreOperation(this);"
                                CssClass="fa fa-undo" ToolTip="Restore" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfEdit" />
                    </asp:TemplateField>

                    <%--Delete--%>
                    <asp:TemplateField HeaderText="Dispose">
                        <ItemTemplate>
                            <asp:LinkButton ID="imgDeleteUser" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="Delete" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete this user permanently?');"
                                CssClass="icon-delete" ToolTip="Delete User" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfDelete" />
                    </asp:TemplateField>

                </Columns>
                <AlternatingRowStyle CssClass="sfEven" />
                <EmptyDataRowStyle CssClass="sfEmptyrow" />
                <PagerStyle CssClass="sfPagination" />
                <RowStyle CssClass="sfOdd" />
            </asp:GridView>

            <div class="sfButtonwrapper sfPadding">
                <asp:LinkButton Text="Restore Selected Users" CssClass="icon-update sfBtn smlbtn-succ" ID="imgBtnRestoreSelectedUsers"
                    runat="server" OnClick="imgBtnRestoreSelectedUsers_Click" ToolTip="Restore all selected" OnClientClick="return ValidateSelectedCheckBoxes(this, 'user','restore');" />

                <%--return ValidateSelectedCheckBoxes(this,'user','delete')--%>
                <asp:LinkButton ID="imgBtnDeleteSelected" Text="Delete Selected Users" CssClass="icon-delete sfBtn sfBtn smlbtn-danger"
                    runat="server" OnClientClick="return ValidateCheckBoxSelection(this)" OnClick="imgBtnDeleteSelectedUsers_Click"
                    ToolTip="Delete all seleted" />
            </div>

        </div>

    </asp:Panel>


    <asp:Panel ID="pnlPortals" runat="server">
        <h2>Deleted Portals</h2>

        <div class="sfGridwrapper">
            <asp:GridView ID="gdvPortal" runat="server" AutoGenerateColumns="False" Width="100%" CssClass="mainGrid"
                OnRowDeleting="gdvPortal_RowDeleting" EmptyDataText="Portals not found"
                GridLines="None" OnRowCommand="gdvPortal_RowCommand" DataKeyNames="PortalID,Name,IsParent"
                OnRowDataBound="gdvPortal_RowDataBound">
                <Columns>

                    <asp:TemplateField>
                        <ItemTemplate>
                            <input id="chkBoxItemPortal" runat="server" class="sfSelectall" type="checkbox" />
                        </ItemTemplate>
                        <HeaderTemplate>
                            <input id="chkBoxHeaderPortal" runat="server" type="checkbox" />
                        </HeaderTemplate>
                        <HeaderStyle CssClass="sfCheckbox"></HeaderStyle>
                    </asp:TemplateField>

                    <%--Portal Title--%>
                    <asp:TemplateField HeaderText="Portal Name">
                        <ItemTemplate>
                            <asp:LinkButton ID="lnkUsernamePortal" runat="server" CommandArgument='<%#Container.DataItemIndex%>'
                                CommandName="EditPortal" Text='<%# Eval("Name") %>'></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>

                    <%--Parent Portal--%>
                    <%--   <asp:TemplateField HeaderText=" Parent Portal">
                        <ItemTemplate>
                            <asp:Label ID="lblParentportal" runat="server" Text='<%# Eval("ParentPortalName") %>' ></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>--%>

                    <%--Start up page--%>
                    <%--      <asp:TemplateField HeaderText=" Start Up Page" >
                    <ItemTemplate>
                        <asp:Label ID="lblDefaultPage" runat="server" Text='<%# Eval("DefaultPage") %>' ></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>--%>


                    <%--Hidden Fields--%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:HiddenField ID="hdnPortalID" runat="server" Value='<%# Eval("PortalID") %>' />
                            <asp:HiddenField ID="hdnIsParent" runat="server" Value='<%# Eval("IsParent") %>' />
                            <asp:HiddenField ID="hdnSEOName" runat="server" Value='<%# Eval("SEOName") %>' />
                            <asp:HyperLink ID="hypPortalPreview" runat="server" CssClass="icon-preview" Target="_blank"></asp:HyperLink>
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfPreview" />
                    </asp:TemplateField>


                    <%--Undo Delete--%>
                    <asp:TemplateField HeaderText="Restore">
                        <ItemTemplate>
                            <asp:LinkButton ID="imgEditPortal" runat="server" CausesValidation="False" CommandArgument='<%#Container.DataItemIndex%>'
                                CommandName="Undo" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Do you wish to restore this portal?');"
                                CssClass="fa fa-undo" ToolTip="Restore" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfEdit" />
                    </asp:TemplateField>

                    <%--Delete--%>
                    <asp:TemplateField HeaderText="Dispose">
                        <ItemTemplate>
                            <asp:LinkButton ID="imgDeletePortal" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                                CommandName="Delete" CssClass="icon-delete" ToolTip="Delete the portal"
                                OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete this portal permanently?');" />
                        </ItemTemplate>
                        <HeaderStyle CssClass="sfDelete" />
                    </asp:TemplateField>

                </Columns>
                <AlternatingRowStyle CssClass="sfEven" />
                <EmptyDataRowStyle CssClass="sfEmptyrow" />
                <RowStyle CssClass="sfOdd" />
            </asp:GridView>


            <div class="sfButtonwrapper sfPadding">
                <asp:LinkButton Text="Restore Selected Portals" CssClass="icon-update sfBtn smlbtn-succ" ID="imgBtnRestoreSelectedPortals"
                    runat="server" OnClick="imgBtnRestoreSelectedPortals_Click" ToolTip="Restore all selected" OnClientClick="return ValidateSelectedCheckBoxes(this, 'portal','restore');" />

                <asp:LinkButton ID="imgBtnDeleteSelectedPortals" Text="Delete Selected Portals" CssClass="icon-delete sfBtn sfBtn smlbtn-danger"
                    runat="server" OnClientClick="return ValidateSelectedCheckBoxes(this,'portal','delete')" OnClick="imgBtnDeleteSelectedPortals_Click"
                    ToolTip="Delete all seleted" />
            </div>
        </div>

    </asp:Panel>


</div>
