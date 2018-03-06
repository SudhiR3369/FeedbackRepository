<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Dashboard.aspx.cs" Inherits="SageFrame.ClientDashboard" Async="true" %>
<%@ Register Src="~/Modules/AdminNotifiaction/AdminNotification.ascx" TagPrefix="Notification" TagName="AdminNotification" %>
<%@ Register Src="~/Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" id="head">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
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
    <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
    <asp:PlaceHolder ID="pchHolder" runat="server"></asp:PlaceHolder>
    <asp:Literal runat="server" ID="ltrJQueryLibrary"></asp:Literal>
    <asp:Literal ID="SageFrameModuleCSSlinks" EnableViewState="false" runat="server"></asp:Literal>
    <title>SageFrame Website</title>
</head>
<body>
    <noscript>
        <asp:Label ID="lblnoScript" runat="server" Text="This page requires java-script to be enabled. Please adjust your browser-settings."></asp:Label>
    </noscript>
    <form id="form1" runat="server" enableviewstate="true" enctype="multipart/form-data">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

        <div id="sfOuterwrapper" class="main bdashboard menu-default">
            <div class="sfSagewrapper">
                <!--End of CPanel Head-->
                <!--Body Content-->

                <div class="sfContentwrapper display-flex clearfix">
                    <div id="divLeftContent" class="leftContent">
                        <!--toggle menu-->
                        <span class="toggle-menu-bar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <div class="sfLogo" id="divNav_2326">
                            <a href="/dashboard/dashboard">
                                <asp:Image runat="server" ID="ltrLogo" />
                            </a>
                        </div>
                        <asp:PlaceHolder ID="dashboardSideNav" runat="server"></asp:PlaceHolder>
                    </div>
                    <div id="divRightContent" class="rightContent ">
                        <div class="dashboard-top-bar">
                            <div class="last-login-info">
                                <span>Last Login</span>
                                <span><%=GetLastLoginDate%></span>
                            </div>
                            <div class="right-aligned-div">
                                <div class="notification">
                                    <Notification:AdminNotification runat="server" ID="AdminNotification" />
                                </div>
                                <div class="editor-link">
                                    <a class="btn primary-btn goto-editor" href="/webbuilder">Edit Site</a>
                                </div>
                                <div class="userInfo">
                                    <div class="user_image" data-user="<%= GetUsername%>">
                                        <img alt="Username" src="<%=userImage %>" />
                                    </div>
                                    <span class="userName"><%= GetUsername%></span>
                                    <div class="profile-setting">
                                        <div class="drop-setting-sml-btn"></div>
                                        <div class="drop-content">
                                            <a href="/dashboard/user-profile">Profile Setting</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="loginInfo">

                                    <uc1:LoginStatus ID="LoginStatus1" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="main-container clearfix">
                            <asp:PlaceHolder ID="message" runat="server"></asp:PlaceHolder>
                            <div class="main-two-col">
                                <div class="main-left sfCol_60">
                                    <asp:PlaceHolder ID="LEFTA" runat="server"></asp:PlaceHolder>
                                </div>
                                <div class="main-right sfCol_40">
                                    <asp:PlaceHolder ID="MIDDLEMAINCURRENT" runat="server"></asp:PlaceHolder>
                                </div>
                            </div>
                            <div class="main-one-col">
                                <asp:PlaceHolder ID="CPANEL" runat="server"></asp:PlaceHolder>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!--Footer Wrapper-->
        </div>
        <asp:Literal ID="LitSageScript" runat="server"></asp:Literal>
    </form>

    <div id="dialog" title="Confirmation Required">
        <label id="sf_lblConfirmation">
        </label>
    </div>
    <div id="SettingPlaceHolder" class="settingPopupWrapper">
    </div>

</body>

<script type="text/javascript">
    var LoadingImage = '<div class="loading"><img src="/Administrator/Templates/Default/images/ajax-loader.gif" /></div>';
    $(function () {
        $(this).LoadFirst('<%=templateFavicon%>');
    });
</script>
</html>
