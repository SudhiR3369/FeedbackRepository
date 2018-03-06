<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_AccessManagement.ascx.cs"
    Inherits="SageFrame.Modules.Admin.UserManagement.ctl_ManageRoles" %>
<%@ Register Src="~/Modules/Admin/UserManagement/ctl_ManageAdminCardRoles.ascx" TagPrefix="uc1" TagName="ctl_ManageAdminCardRoles" %>



<script type="text/javascript">
    //<![CDATA[
    $(function () {
        $(this).PageRoleSettings({
            UserModuleID: '<%=userModuleID%>',
            RoleID: '<%=RoleID%>'
        });
        $(this).CardModuleRoleSetting({
            UserModuleID: '<%=userModuleID%>',
            RoleID: '<%=RoleID%>'
        });
    });

    //]]>	
</script>
<h1>
    <asp:Label ID="lblRolesManagement" runat="server" Text="Access Management"></asp:Label>
</h1>
<div class="sfButtonwrapper ">
    <asp:LinkButton ID="imbPageRoleSettings" runat="server" OnClick="imbPageRoleSettings_Click" ToolTip="Page Role Settings"
        CssClass="icon-settings smlbtn-def sfBtn" Text="Page Role Settings" />
    <asp:LinkButton ID="imbDashboardRoleSettings" runat="server" ToolTip="Dashboard Role Settings"
        CssClass="icon-settings smlbtn-def sfBtn" Text="Dashboard Role Settings" OnClick="imbDashboardRoleSettings_Click" />
    <asp:LinkButton ID="imbAdminCardModuleRoleSetting" runat="server" ToolTip="Dashboard Module Role Setting"
        CssClass="icon-settings smlbtn-def sfBtn" Text="Dashboard Module Role Setting" OnClick="imbAdminCardModuleRoleSetting_Click" />
</div>

<asp:Panel ID="pnlPageRoleSettings" runat="server" class="clearfix">
    <h2>
        <asp:Label ID="lblPageRoleSettings" runat="server" Text="Page Role Settings"></asp:Label>
    </h2>
    <div id="divBindRolesList" class="clearfix">

        <div class="sfLeftdivB">
        </div>

        <div class="sfCenterdivB">
            <div class="sfCenterWrapperB">
                <div class="sfCenterB">
                    <div id="dvRoleType" class="sfAdvanceRadioBtn sfMarginbtn">
                        <asp:Literal ID="ltrPagesRadioButtons" runat="server"></asp:Literal>
                    </div>
                    <div class="clearfix">
                        <div class="divPermission sfGridwrapper">
                            <table id="tblPermission" cellspacing="0" cellpadding="0" width="100%">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sfButtonwrapperB ">
        <button type="button" id="btnSubmit" class="icon-update smlbtn-succ sfBtn">
            Update All</button>
  
    </div>
    <div class="clear">
    </div>
</asp:Panel>
<asp:Panel ID="panelDashboardRoles" runat="server" Visible="false">
    <div class="sfFormwrapper">
        <h2>
            <asp:Label ID="Label1" runat="server" Text="Dashboard Role Management"></asp:Label>
        </h2>
        <div class="sfTableWrapper">
            <ul class="select-shift clearfix">


                <table id="tblDashboardRolesSettings" runat="server" cellpadding="0" cellspacing="0"
                    border="0">
                    <tr id="Tr1" runat="server">
                        <td id="Td1" width="45%" runat="server">
                            <asp:Label ID="lblUnselected" runat="server" CssClass="sfFormlabel" Text="Unapproved User"></asp:Label>
                        </td>
                        <td id="Td2" runat="server"></td>
                        <td id="Td3" runat="server">
                            <asp:Label ID="lblSelected" runat="server" CssClass="sfFormlabel" Text="Approved User"></asp:Label>
                        </td>
                    </tr>
                    <tr id="Tr2" runat="server">
                        <td id="Td4" valign="top" runat="server">
                            <asp:ListBox ID="lstUnselectedRoles" runat="server" SelectionMode="Multiple" CssClass="sfListmenubig multipleselect"></asp:ListBox>
                        </td>
                        <td id="Td5" runat="server" class="shift-arrows">
                            <label class="icon-arrow-slimdouble-e sfBtn">
                                <asp:Button ID="btnAddAllRole" runat="server" CausesValidation="False" OnClick="btnAddAllRole_Click"
                                    CssClass="sfSelectallright" />
                            </label>

                            <label class="icon-arrow-slim-e sfBtn">
                                <asp:Button ID="btnAddRole" runat="server" CausesValidation="False" OnClick="btnAddRole_Click"
                                    CssClass="sfSelectoneright" Text=" &gt; " />
                            </label>
                            <label class="icon-arrow-slim-w sfBtn">
                                <asp:Button ID="btnRemoveRole" runat="server" CausesValidation="False" OnClick="btnRemoveRole_Click"
                                    CssClass="sfSelectoneleft" Text=" &lt; " />
                            </label>
                            <label class=" icon-arrow-slimdouble-w sfBtn">
                                <asp:Button ID="btnRemoveAllRole" runat="server" CausesValidation="False" OnClick="btnRemoveAllRole_Click"
                                    Text="&lt;&lt;" CssClass="sfSelectallleft" />
                            </label>



                        </td>
                        <td id="Td6" valign="top" runat="server">
                            <asp:ListBox ID="lstSelectedRoles" runat="server" SelectionMode="Multiple" CssClass="sfListmenubig multipleselect"></asp:ListBox>
                        </td>
                    </tr>
                </table>
        </div>
        <div class="sfButtonwrapper">
            <label id="lblManageRoleSave" class="sfLocale icon-update sfBtn smlbtn-succ">
                Update
            <asp:Button runat="server" ID="imgManageRoleSave" OnClick="imgManageRoleSave_Click" />
            </label>
            <label id="lblManageRoleCancel" class="sfLocale icon-close sfBtn smlbtn-danger ">
                Cancel
            <asp:Button runat="server" ID="imgManageRoleCancel" OnClick="imgManageRoleCancel_Click" />
            </label>
        </div>
        <div>
            &nbsp;
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlDashBrdCardModules" runat="server" Visible="false">
    <uc1:ctl_ManageAdminCardRoles runat="server" ID="ctl_ManageAdminCardRoles" />
    <div class="sfButtonwrapperB button-paddleftB">
        <button type="button" id="btnSubmitCardRole" class="icon-update smlbtn-succ sfBtn">
            Update All</button>
        <asp:LinkButton runat="server" class="icon-close smlbtn-danger sfBtn" ID="btnCardRoleCancel" OnClick="imgManageRoleCancel_Click">
            Cancel</asp:LinkButton>
    </div>
</asp:Panel>
