<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UsersAndRolesTab.ascx.cs" Inherits="AdminModuleTabPane" %>
<%@ Register Src="~/Modules/Admin/UserManagement/ctl_ManageUser.ascx" TagPrefix="uc1" TagName="ctl_ManageUser" %>
<%@ Register Src="~/Modules/Admin/UserManagement/RolesManagement.ascx" TagPrefix="uc1" TagName="RolesManagement" %>




<div class="moduleTabWrap">
    <asp:HiddenField ID="hdnActiveMenuIndex" ClientIDMode="Static" runat="server" Value="0" />
    <asp:HiddenField ID="hdnUserModuleID" runat="server" Value="0" />
    <ul class="modulesTab" id="ulModuleTabMenu">
        <asp:Repeater ID="rptModuleTab" runat="server" OnItemCommand="rptModuleTab_ItemCommand">
            <ItemTemplate>
                <li>
                    <asp:LinkButton runat="server" CommandName='<%# Container.DataItem%>' Text='<%# Container.DataItem%>' />
                </li>
            </ItemTemplate>
        </asp:Repeater>
    </ul>
    <div id="divUserManagement" runat="server">
        <uc1:ctl_ManageUser runat="server" id="ctl_ManageUser" />
    </div>
    <div id="divRolesManagement" runat="server" visible="false">
        <uc1:RolesManagement runat="server" id="RolesManagement" />
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $('#ulModuleTabMenu>li').each(function (index) {
            if (index == $('#hdnActiveMenuIndex').val()) {
                $(this).addClass('activeTab');
            }
        });
    })
</script>
