<%@ Control Language="C#" AutoEventWireup="true" CodeFile="InPageEditing.ascx.cs"
    Inherits="Modules_Pages_InPageEditing" %>
<%@ Register Src="~/Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<style>
    body {
        min-height: 100%;
        padding: 0;
        height: auto;
        margin: 0;
        font-family: "Work Sans", sans-serif;
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>
<div class="sftopstickbarToggle" style="display: none;">
    <div style="display: block; position: relative;" id="divAdminControlPanel">
        <div class="sfTopbar clearfix">
            <ul class="left">
                <li>
                    <div class="sfLogo" runat="server" id="divLogo">
                        <asp:HyperLink ID="hypLogo" runat="server">Dashboard</asp:HyperLink>
                        <asp:Label runat="server" ID="lblVersion" CssClass="sfVersionText" Visible="false"></asp:Label>
                        <asp:HyperLink ID="lblHideLogo" runat="server" CssClass="fa fa-pencil-square-o ChangeSmallLogo" Visible="false"></asp:HyperLink>
                        <input type="hidden" runat="server" id="hdnIsShown" class="hdnVersionShow" />
                        <div id="fileUploadWrap" style="display: none;">
                            <asp:Label ID="lblFileupload" runat="server" Text="File Upload">
                            </asp:Label>
                            <asp:FileUpload ID="fileUpload" runat="server" />
                            <asp:Label Text="Show Version" runat="server"></asp:Label>
                            <asp:CheckBox ID="chkIsShown" runat="server" CssClass="chkShowVersion" />
                            <asp:Button ID="btnFileUpload" runat="server" OnClick="fileUpload_Click" Text="Submit" />
                        </div>
                    </div>
                </li>
            </ul>
            <div id="cpanel" runat="server">
            </div>
            <div class="sftopMiddle">
                <ul>
                    <li>
                        <asp:DropDownList runat="server" ID="ddlPages" AutoPostBack="true" OnSelectedIndexChanged="ddlPages_SelectedIndexChanged"
                            CssClass="notvisible">
                        </asp:DropDownList>
                        <span class="sfGottopage inactive fa fa-angle-double-down">Go to Page</span>
                        <div id="PagesList" style="display: none;" class="inactive">
                            <input type="text" class="sfInputbox" id="pageSearch" placeholder="Search pages" />
                            <ul class="page_alt_content">
                            </ul>
                            <ul class="SearchPages">
                            </ul>
                            <asp:Literal runat="server" ID="ltrPageLists"></asp:Literal>
                            <div id="pagePagination" class="sfPagination">
                            </div>
                        </div>
                    </li>
                    <li>
                        <asp:DropDownList runat="server" ID="ddlLayout" AutoPostBack="true" OnSelectedIndexChanged="ddlLayout_SelectedIndexChanged"
                            CssClass="notvisible">
                        </asp:DropDownList>
                        <span class="sfApplyLayout inactive fa fa-angle-double-down">Apply Layout</span>
                        <asp:Literal runat="server" ID="ltrlayoutList"></asp:Literal>
                    </li>
                    <li><span class="on moduleListBtn">Show Module List</span></li>
                </ul>
            </div>
            <ul class="right">
                <li style="display: none;">
                    <div class="hidetopstickybar">
                        <div class="quickhidetopStickbar">
                            <i class="fa fa-arrow-up" aria-hidden="true" title="hide tostick bar"></i>
                        </div>
                    </div>
                </li>
                <li class="sfEditPage active">
                    <asp:HyperLink ID="hypEdit" runat="server" CssClass="fa fa-pencil-square-o">Exit Editing</asp:HyperLink>
                </li>
                <li class="sfDashBoard">
                    <asp:HyperLink ID="hlnkDashboard" CssClass="icon-dashboard" runat="server" meta:resourcekey="hlnkDashboardResource1">Dashboard</asp:HyperLink>
                </li>
                <li class="loggedin">
                    <span class="user_image">
                        <img alt="Username" src="<%=userImage %>" />
                        <asp:Literal ID="litUserName" runat="server" Text="Logged As" meta:resourcekey="litUserNameResource1">
                        </asp:Literal></span> &nbsp;<strong><%= userName%></strong> </li>
                <li class="logout"><span class='myProfile  icon-arrow-s'></span>
                    <span class='myProfile  fa fa-cog'></span>
                    <div class="myProfileDrop Off" style="display: none;">
                        <ul>
                            <li>
                                <asp:HyperLink runat="server" ID="lnkAccount" Text="Logged As">
                             <i class="fa fa-user" aria-hidden="true"></i> Profile
                                </asp:HyperLink>
                            </li>
                            <li>
                                <uc1:LoginStatus ID="LoginStatus1" runat="server" />
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear">
        </div>
    </div>
</div>
<asp:PlaceHolder ID="pchWhole" runat="server"></asp:PlaceHolder>
<div class="divModulesList">
    <div id="divDroppable" style='<%=divDrop %>' class="sfFormwrapper sfNone sfModulesHolder <%=divMinimized %>">
        <span class="dragme">Drag Me</span> <span class='<%=minimizeOn %>'></span>
        <div id="divSearch" class="sfModuleSearch" style='<%=minimize %>'>
            <input id="txtSearchModules" type="text" class="sfInputbox" placeholder="Search modules" />
        </div>
        <div id="divFloat" class="clearfix" style='<%=minimize %>'>
            <div class="clear">
            </div>
            <div class="sfLcontent">
                <ul class="alt_content">
                </ul>
                <asp:Literal runat="server" ID="ltrModuleList"></asp:Literal>
            </div>
            <div id="ModulePagination" class="sfPagination">
            </div>
        </div>
    </div>
</div>
<div class="popupWrapper">
    <div id="showPopup" style="display: none">
        <div class="sfPopupinner">
            <div id="dvTabPanel">
                <%-- <ul>
                                    <li><a href="#dvEdit">
                                        <asp:Label ID="lblEdit" runat="server" Text="Module Basics"></asp:Label>
                                    </a></li>
                                   <li><a href="#dvPermissions">
                                        <asp:Label ID="lblSetting" runat="server" Text="Permissions"></asp:Label>
                                    </a></li>
                                </ul>--%>
                <div id="dvEdit" class="sfFormwrapper sfModulepopbox">
                    <input type="hidden" id="hdnModuleIndex" value="0" />
                    <input type="hidden" id="hdnModuleInPage" value="0" />
                    
                        <div class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Module Name
                                </span>
                            </div>
                           
                            <div class="formValue">
                                <label id="lblmoduleName" >
                                </label>
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Module Title
                                </span>
                            </div>
                            
                            <div class="formValue">
                                <input type="text" id="txtModuleTitle" class="sfInputbox" />
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Pane Name
                                </span>
                            </div>
                            
                            <div class="formValue">
                                <label id="spnPaneName">
                                </label>
                            </div>
                        </div>
                        <div class="sfFieldset" id="trheader">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Header Text
                                </span>
                            </div>
                           
                            <div class="formValue">
                                <input type="text" id="txtHeaderTxt" class="sfInputbox" maxlength="50" />
                                <br />
                            </div>
                        </div>
                        <div class="sfFieldset">
                             <input type="checkbox" id="chkShowHeader" class="sfCheckbox" />
                                <label class="sfFormlabelsmall" for="chkShowHeader">
                                   
                                    Show Header
                                </label>
                            </div>
                        </div>
                        <div class="sfFieldset" id="trSuffix">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Module Suffix Class
                                </span>
                            </div>
                            
                            <div class="formValue">
                                <input type="text" id="txtModuleSuffix" class="sfInputbox" />
                            </div>
                        </div>
                        <%-- <tr>
                            <td>
                                <label class="sfFormlabel">
                                    IsActive</label>
                            </td>
                            <td width="30">
                                :
                            </td>
                            <td>
                                <input type="checkbox" id="chkIsActive" checked="checked" />
                            </td>
                        </tr>--%>
                        <div class="sfFieldset showOption">
                            <div class="formKey">
                                <span class="sfFormlabel">
                                    Show in Other Pages
                                </span>
                            </div>
                            
                            <div class="formValue">
                                <label id="Label1" class="sfCheckBoxInline">
                                    <input type="checkbox" value="All" id="rbAllPages" name="showPagesGroup" checked="checked" />
                                    All</label>
                                <label class="sfCheckBoxInline">
                                    <input type="checkbox" value="Custom" id="rbCustomPages" name="showPagesGroup" />
                                    Customize</label>
                            </div>
                        </div>
                        <div>
                            <div colspan="32">
                                <div id="trPages">
                                    <div id="pageList_Apply" class="sfGridwrapper">
                                        <div class="sfLcontent">
                                            <ul class="alt_content" id="pageTree_popup">
                                            </ul>
                                            <asp:Literal runat="server" ID="hdnPageList"></asp:Literal>
                                        </div>
                                        <div class="sfPagination" id="ModulePagePagination">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--<tr>
                                            <td colspan="3">
                                                <input type="checkbox" class="sfCheckbox" id="chkInheritPermissions" />
                                                <label id="lblInherit" class="sfFormlabel">
                                                    Inherit Permissions From Page</label>
                                            </td>
                                        </tr>--%>
                        <%--  <tr>
                            <td colspan="3">
                                <input type="checkbox" id="chkDonotshow" class="sfCheckbox" />
                                <label id="lblDonotshow" class="sfFormlabel">
                                    Do not show this popup again</label>
                            </td>
                        </tr>--%>
                    
                </div>
                <%--  <div id="dvPermissions">
                                    <div>
                                        <div class="sfPopupsearch clearfix">
                                            <label class="sfFormlabel">
                                                Search User:
                                            </label>
                                            <input type="text" class="sfInputbox searchinput" id="txtSearchUser" />
                                            <div class="sfButtonwrapper sftype1 sfInline">
                                                <label id="btnSearchUser" class="icon-search">
                                                    Search</label>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="divPermissions sfGridwrapper">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <th>
                                                        <label>
                                                            Role</label>
                                                    </th>
                                                    <th>
                                                        <label>
                                                            View</label>
                                                    </th>
                                                    <th>
                                                        <label>
                                                            Edit</label>
                                                    </th>
                                                    <th>
                                                    </th>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="clear">
                                        </div>
                                        <div id="divModuleUser" class="sfGridwrapper">
                                            <table id="tblModuleUser" width="100%" cellpadding="0" cellspacing="0">
                                            </table>
                                        </div>
                                    </div>
                                </div>--%>
                <div class="clear">
                </div>
                <div class="sfButtonwrapper sftype1 sfInline">
                    <label id="spnBtnSave" class="icon-save sfBtn smlbtn-succ sfPrimaryBtn">
                        Save</label>
                    <label id="spnBtnCancel" class="icon-close sfBtn smlbtn-danger sfPrimaryBtn">
                        Cancel</label>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $(this).FrontEndEdit({
            UserModuleID: '<%=userModuleID%>',
            ddlPageID: '#' + '<%=ddlPages.ClientID %>',
            ddlLayout: '#' + '<%=ddlLayout.ClientID %>',
            ddlHdnPageListID: '#' + '<%=hdnPageList %>',
            isFirst: '<%=isFirst %>'
        });
        $('.sfCurve').removeClass('sfCurve').addClass('sf' + '<%=activteWidth %>');
    });
</script>
