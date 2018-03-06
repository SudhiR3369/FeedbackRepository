<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="SageFrame.Sagin_Default" Async="true" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<%@ Register Src="~/Controls/DashboardQuickLinks.ascx" TagName="DashboardQuickLinks"
    TagPrefix="ucquicklink" %>
<%@ Register Src="~/Controls/Sidebar.ascx" TagName="Sidebar" TagPrefix="ucsidebar" %>
<%@ Register Src="~/Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<%@ Register Src="../Controls/ctl_CPanleFooter.ascx" TagName="ctl_CPanleFooter" TagPrefix="uc3" %>
<%@ Register Src="../Controls/ctl_AdminBreadCrum.ascx" TagName="AdminBreadCrumb"
    TagPrefix="uc4" %>
<%@ Register Src="../Controls/PageHelp.ascx" TagName="AdminPageHelp" TagPrefix="uc5" %>
<%@ Register Src="~/Modules/AdminNotifiaction/AdminNotification.ascx" TagPrefix="Notification" TagName="AdminNotification" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" id="head">
    <link type="icon shortcut" media="icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="text/javascript" http-equiv="Content-Script-Type" />
    <meta content="text/css" http-equiv="Content-Style-Type" />
    <meta id="MetaDescription" runat="Server" name="DESCRIPTION" />
    <meta id="MetaKeywords" runat="Server" name="KEYWORDS" />
    <meta id="MetaCopyright" runat="Server" name="COPYRIGHT" />
    <meta id="MetaGenerator" runat="Server" name="GENERATOR" />
    <meta id="MetaAuthor" runat="Server" name="AUTHOR" />
    <meta name="RESOURCE-TYPE" content="DOCUMENT" />
    <meta name="DISTRIBUTION" content="GLOBAL" />
    <meta id="MetaRobots" runat="server" name="ROBOTS" />
    <meta name="REVISIT-AFTER" content="1 DAYS" />
    <meta name="RATING" content="GENERAL" />
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <!-- Mimic Internet Explorer 7 -->
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
    <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
    <!--[if IE 8]><script type="text/javascript" src="../js/SageFrameCorejs/excanvas.js"></script><![endif]-->
    <!--[if IE]><link rel="stylesheet" href="../css/IE.css" type="text/css" media="screen" /><![endif]-->
    <!--[if IE 7]><script type="text/javascript" src="../js/SageFrameCorejs/IE8.js"></script><![endif]-->

    <!--[if !IE 7]>
	<style type="text/css">
		#wrap {display:table;height:100%}
	</style>
	<![endif]-->
    <!--[if IE 8]><link rel="stylesheet" type="text/css" href="../css/ie8.css" media="screen"><![endif]-->
    <!--[if IE 9]><link rel="stylesheet" type="text/css" href="../css/ie9.css" media="screen"><![endif]-->
    <script>
        /*@cc_on
        @if (@_jscript_version == 10)
              document.write(' <link type= "text/css" rel="stylesheet" href="../css/ie10.css" />');
          @end
        @*/
    </script>
    <asp:PlaceHolder ID="pchHolder" runat="server"></asp:PlaceHolder>
    <title>SageFrame Website</title>
    <asp:Literal runat="server" ID="ltrJQueryLibrary"></asp:Literal>
    <asp:Literal ID="SageFrameModuleCSSlinks" runat="server"></asp:Literal>
</head>
<body onload="__loadScript();">
    <form id="form1" runat="server" enctype="multipart/form-data">
        <asp:ScriptManager ID="ScriptManager1" runat="server" LoadScriptsBeforeUI="false"
            ScriptMode="Release">
        </asp:ScriptManager>
        <asp:UpdateProgress ID="UpdateProgress1" runat="server" DisplayAfter="0">
            <ProgressTemplate>
                <div class="sfLoadingbg">
                    &nbsp;
                </div>
                <div class="sfLoadingdiv">
                    <asp:Image ID="imgPrgress" runat="server" AlternateText="Loading..." ToolTip="Loading..." />
                    <br />
                    <asp:Label ID="lblPrgress" runat="server" Text="Please wait..."></asp:Label>
                </div>
            </ProgressTemplate>
        </asp:UpdateProgress>
        <noscript>
            <asp:Label ID="lblnoScript" runat="server" Text="This page requires java-script to be enabled. Please adjust your browser-settings."></asp:Label>
        </noscript>
        <div id="sfOuterwrapper" runat="server">
            <div class="sfSagewrapper">

                <!--End of CPanel Head-->
                <div class="sfTopbar clearfix" id="divAdminControlPanel" runat="server" style="display: block;">
                    <ul class="left">
                        <li>
                            <div class="sfLogo" runat="server" id="divLogo">
                                <a href="../Admin/Admin<%=Extension %>"></a>
                                <%-- <img src="<%=appPath%>/Administrator/Templates/Default/images/sageframe.png" alt="Sageframe" /></a>--%>
                                <asp:HyperLink ID="hypLogo" runat="server">Dashboard</asp:HyperLink>
                                <asp:Label runat="server" ID="lblVersion" Visible="false"></asp:Label>
                                <asp:HyperLink ID="lblHideLogo" class="sfClose icon-edit ChangeSmallLogo" runat="server"></asp:HyperLink>
                                <div id="divPopUpWindow"></div>
                                <%--<asp:HiddenField ID="HiddenField1" runat="server" Value="false" />
                                <asp:HiddenField ID="hdnIsShown" runat="server" Value="false" />--%>
                                <input type="hidden" runat="server" id="hdnIsShown" class="hdnVersionShow" />

                                <div id="fileUploadWrap" style="display: none;" title="Change dashboard logo">
                                    <asp:Label ID="lblFileupload" runat="server" Text="File Upload">
                                    </asp:Label>
                                    <asp:FileUpload ID="fileUpload" runat="server" />
                                    <label for="fileUpload">Choose file</label><br>
                                    <asp:Label Text="Show Version" runat="server"></asp:Label>
                                    <asp:CheckBox ID="chkIsShown" runat="server" CssClass="chkShowVersion" /><br>
                                    <div class="sfButtonwrapper">
                                            <%--<span class=" icon-update" style="margin-right:0"></span>
                                         <asp:Button ID="btnFileUpload" runat="server" CssClass="" OnClick="fileUpload_Click" Text="Submit" />Submit--%>
                                            <asp:LinkButton ID="btnFileUpload" runat="server" Text="Submit" CssClass="sfBtn smlbtn-succ icon-update" OnClick="fileUpload_Click" />
                                            <asp:Label runat="server" ID="lblLinkBtnFile" AssociatedControlID="btnFileUpload"></asp:Label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <%--<li class="sfUpgrade">
                            <asp:HyperLink ID="hypUpgrade" CssClass="sfBtnSml smlbtn-def icon-upgrade" runat="server" Text="Upgrade"></asp:HyperLink></li>--%>
                    </ul>
                    <!--Toggle Part-->
                    <div class="togglePart">
                        <div class="iconToggleMenu">
                            <span class="menuIcon"></span>
                        </div>
                    </div>
                    <div class="togglePartResponsive">
                        <div class="iconToggleMenuResponsive">
                            <span class="menuIcon"></span>
                        </div>
                    </div>
                    <div class="togglePartResponsive">
                        <div class="iconToggleMenuResponsive">
                            <span class="menuIcon"></span>
                        </div>
                    </div>
                    <!--Ends-->

                    <!--Theme Setting Part-->
                    <div class="themeSettingPart">
                        <div class="iconSettingTheme">
                            <span class="themeIcon"></span>
                        </div>
                    </div>
                    <!--Ends-->

                    <ul class="right">

                        <li class="notification">
                            <Notification:AdminNotification runat="server" ID="AdminNotification" />
                        </li>
                        <li class="home">
                            <asp:HyperLink ID="hypHome" runat="server" CssClass="fa fa-home" Text="Home"></asp:HyperLink>
                        </li>

                        <li class="preview">
                            <asp:HyperLink ID="hypPreview" runat="server" Text="Preview" Target="_blank" CssClass="fa fa-external-link"></asp:HyperLink>
                        </li>
                        <li class="logout"><span class='myProfile  fa fa-cog'></span>
                            <div class="myProfileDrop Off" style="display: none;">
                                <ul>
                                    <%--<li>--%>
                                    <%--<%= userName%>--%>
                                    <%--</li>--%>
                                    <li>
                                        <asp:HyperLink runat="server" ID="lnkAccount" Text="Logged As">
                                                            <i class="fa fa-user" aria-hidden="true"></i> Profile
                                        </asp:HyperLink></li>
                                    <li>

                                        <uc1:LoginStatus ID="LoginStatus1" runat="server" />

                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div id="templateChangeWrapper" class="Off" style="display: none;">
                        <div class="templateChange">
                            <h6>Color Combos</h6>
                            <asp:RadioButtonList CssClass="color-combos" runat="server" ID="rdColorcombos"
                                RepeatLayout="UnorderedList" RepeatDirection="Vertical"
                                AutoPostBack="true" OnSelectedIndexChanged="rdColorcombos_SelectedIndexChanged">
                                <asp:ListItem Value="one" Text="<span class='color-box' style='background: #5b53ef'></span><span class='color-box' style='background: #f0c54c'></span>">
                                </asp:ListItem>
                                <asp:ListItem Value="two" Text="<span class='color-box' style='background: #00acc1'></span><span class='color-box' style='background: #d6df22'></span>">
                                </asp:ListItem>
                                <asp:ListItem Value="three" Text="<span class='color-box' style='background: #92cd18'></span><span class='color-box' style='background: #ffa725'></span>">
                                </asp:ListItem>
                            </asp:RadioButtonList>
                            <div class="color-combos">
                                <p>Or choose your own preset</p>
                                <div class="combo">
                                    <%--<input id="chkUserSelectedColor" type="radio" name="comboColor" />
                                    <label for="set_0">
                                        <span class='color-box' id="UserFirstColor" data-value="0"></span>
                                        <span class='color-box' id="UserSecondColor" data-value="0"></span>
                                    </label>--%>
                                    <asp:Literal runat="server" ID="ltrPresetDOM"></asp:Literal>
                                    <input type="hidden" runat="server" id="hdnColorPallet" class="hdnColorPallet" value="" />
                                    <asp:LinkButton CssClass="sfBtnSml smlbtn-succ" Text="Save" runat="server" ID="btnUserColor" OnClick="btnUserColor_Click" />

                                </div>
                            </div>
                            <h6>Layout Skins</h6>
                            <asp:RadioButtonList CssClass="sfTableThemeColor" runat="server" ID="rdTemplate"
                                RepeatLayout="UnorderedList" RepeatDirection="Vertical"
                                AutoPostBack="true" OnSelectedIndexChanged="rdTemplate_SelectedIndexChanged">
                                <asp:ListItem Text="Default UI" Value="green"></asp:ListItem>
                                <asp:ListItem Text="Gray UI" Value="gray"></asp:ListItem>
                                <asp:ListItem Text="Dark UI" Value="dark"></asp:ListItem>
                            </asp:RadioButtonList>

                            <h6>Nav bar Options</h6>
                            <div class="layout-options sfTableSidebarPosition">
                                <span class="options">
                                    <asp:RadioButton GroupName="position" runat="server" ID="rdLeft" Text="<span class='leftlayout'>Left</span>" AutoPostBack="true" OnCheckedChanged="rdLeft_CheckedChanged" />
                                </span>

                                <span class="options">
                                    <asp:RadioButton GroupName="position" runat="server" ID="rdRight" AutoPostBack="true"
                                        Text="<span class='rightlayout'>Right</span>" OnCheckedChanged="rdRight_CheckedChanged" />
                                </span>

                                <span class="options">
                                    <asp:RadioButton GroupName="position" runat="server" ID="rdTop" AutoPostBack="true"
                                        Text="<span class='toplayout'>Top</span>" OnCheckedChanged="rdTop_CheckedChanged" />
                                </span>

                            </div>
                            <!--Ends-->

                        </div>
                        <!--<span class="sfMiddle middleTheme icon-themesetting"></span>-->
                    </div>
                </div>

                <!--Navigation Wrapper-->
                <div class="sfNavigation clearfix" id="divNavigation" runat="server" style="display: none">
                    <asp:PlaceHolder ID="navigation" runat="server"></asp:PlaceHolder>
                </div>



                <!--Body Content-->
                <div class="sfContentwrapper clearfix">
                    <div id="divCenterContent" class="dash-wrapper clearfix">
                        <div runat="server" id="divSideBar">

                            <!--<li class="loggedin">-->
                            <!--<span class="user_image">-->
                            <!--<img alt="Username" src="http://172.18.12.40:9157/Modules/Admin/UserManagement/UserPic/NoImage.png">-->
                            <!--Logged As</span> &nbsp;<strong>superuser</strong> </li>-->

                            <div class="loggedin-status">
                                <span class="fa fa-user">
                                    <asp:Literal ID="litUserName" runat="server" Text=""></asp:Literal>
                                </span>
                                <strong><%= userName%></strong>
                            </div>

                            <ucsidebar:Sidebar ID="Sidebar1" runat="server" />
                            <!--<div class="sfFooterwrapper clearfix" id="divFooterWrapper" runat="server">-->
                            <!--<uc3:ctl_CPanleFooter ID="ctl_CPanleFooter1" runat="server" />-->
                            <!--</div>-->
                        </div>
                        <div class="sfMaincontent">
                            <div class="sfBreadcrumb pageHelpWrap clearfix">
                                <uc4:AdminBreadCrumb ID="adminbreadcrumb" runat="server" />
                                <span class="currentDate"><i class="fa fa-calendar" aria-hidden="true"></i><span id="todaydate"></span></span>
                                <uc5:AdminPageHelp ID="adminHelp" runat="server" />

                            </div>

                            <!--This is now static sheet--->
                            <div class="pane-wrapper clearfix">
                                <!--Holds 2 boxes max-->
                                <asp:PlaceHolder ID="message" runat="server"></asp:PlaceHolder>
                                <div class="dash-pane-left clearfix">
                                    <!--<div class="flex-wrapp">-->
                                    <!--<div class="window-box window-box-half clearfix">-->
                                    <!--<div class="box-head clearfix">-->
                                    <!--<div class="head-left">-->
                                    <!--<i class="fa fa-bar-chart" aria-hidden="true"></i>-->
                                    <!--<span>Stats</span>-->
                                    <!--</div>-->

                                    <!--<div class="head-right">-->
                                    <!--<span class="minimise"><i class="fa fa-minus" aria-hidden="true"></i></span>-->
                                    <!--<span class="box-close"><i class="fa fa-times" aria-hidden="true"></i></span>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="box-content statsbox">-->
                                    <!--<table>-->
                                    <!--<tr>-->
                                    <!--<td>-->
                                    <!--<span class="count">79</span><br>-->
                                    <!--<span>Total Visitors</span>-->
                                    <!--</td>-->
                                    <!--<td align="right">-->
                                    <!--<span class="sfBtnSml smlbtn-succ">20%</span><br>-->
                                    <!--<span class="small">this month</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<td>-->
                                    <!--<span class="count">9</span><br>-->
                                    <!--<span>Page Count</span>-->
                                    <!--</td>-->
                                    <!--<td align="right">-->
                                    <!--<span class="sfBtnSml smlbtn-def">0%</span><br>-->
                                    <!--<span class="small">this month</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->


                                    <!--<tr>-->
                                    <!--<td>-->
                                    <!--<span class="count">98</span><br>-->
                                    <!--<span>no. of Users</span>-->
                                    <!--</td>-->
                                    <!--<td align="right">-->
                                    <!--<span class="sfBtnSml smlbtn-def">0%</span><br>-->
                                    <!--<span class="small">Added this month</span>-->
                                    <!--</td>-->
                                    <!--</tr>-->


                                    <!--</table>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="window-box window-box-half clearfix">-->
                                    <!--<div class="box-head clearfix">-->
                                    <!--<div class="head-left">-->
                                    <!--<i class="fa fa-twitter" aria-hidden="true"></i>-->
                                    <!--<span>Twits on the board</span>-->
                                    <!--</div>-->

                                    <!--<div class="head-right">-->
                                    <!--<span><i class="fa fa-minus" aria-hidden="true"></i></span>-->
                                    <!--<span><i class="fa fa-times" aria-hidden="true"></i></span>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="box-content ">-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--</div>-->


                                    <!--DASHBOARD QUICK LINK ICONS-->

                                    <asp:PlaceHolder ID="dashboardinfo" runat="server"></asp:PlaceHolder>
                                    <div class="sfInnerwrapper">
                                        <div id="sfToppane">
                                            <asp:PlaceHolder ID='toppane' runat='server'></asp:PlaceHolder>
                                        </div>
                                    </div>




                                </div>

                                <!--Holds 1 box only-->
                                <div id="DashRightPane" class="dash-pane-right clearfix">
                                    <div id="divRightPanNav" runat="server">
                                        <div id="divModuleRecycle" class="moduleRecycleWrap">
                                            <i class="fa fa-outdent" aria-hidden="true" id="toogleTrashModule"></i>
                                        </div>
                                        <div id="divTrashCardModule" class="trashModules"></div>
                                    </div>
                                    <asp:PlaceHolder ID="DashBoardRightPane" runat="server"></asp:PlaceHolder>
                                    <!--countrywise visit-->
                                    <%--<asp:PlaceHolder ID='topfivecountry' runat='server'></asp:PlaceHolder>

                                <!-- portal Snap-->
                                    <div id="divLeft" runat="server" style="display: none">
                                        <asp:PlaceHolder ID="LeftA" runat="server"></asp:PlaceHolder>
                                    </div>

                                    <!-- To DO LiSts-->
                                    <div id="divRight" runat="server" style="display: none">
                                        <asp:PlaceHolder ID="middlemaincurrent" runat="server"></asp:PlaceHolder>
                                    </div>--%>
                                </div>
                                <!--C -panel placeholder where the admin modules to be dropped-->
                                <div class="sfCpanel sfInnerwrapper" runat="server" id="divBottompanel" style="display: none">
                                    <asp:PlaceHolder ID="cpanel" runat="server"></asp:PlaceHolder>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Footer Wrapper-->
            </div>
            <div id="dialog" title="Confirmation Required">
                <label id="sf_lblConfirmation">
                </label>
            </div>
            <asp:Literal ID="LitSageScript" runat="server"></asp:Literal>
        </div>
    </form>

</body>
</html>
