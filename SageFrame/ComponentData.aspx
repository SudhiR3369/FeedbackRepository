<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ComponentData.aspx.cs" Inherits="ComponentEdit" %>

<%@ Register Src="~/Modules/AdminNotifiaction/AdminNotification.ascx" TagPrefix="Notification" TagName="AdminNotification" %>
<%@ Register Src="~/Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="login" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Component Admin</title>
    <script src="js/jquery-1.9.1.js"></script>
    <link href="Administrator/Templates/Default/css/grid.css" rel="stylesheet" />
    <link href="Administrator/Templates/Default/css/common.css" rel="stylesheet" />
    <link href="Administrator/Templates/Default/css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/commonedit.css" rel="stylesheet" />
    <asp:Literal ID="SageFrameModuleCSSlinks" runat="server"></asp:Literal>
    <link href="/css/EBTopSticky.css" rel="stylesheet" />
    <style type="text/css">
        #divFrame {
            width: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <section id="iframeHolderSection" class="sfCol_100  modulecommoneditor">
            <asp:ScriptManager ID="ScriptManager1" runat="server">
            </asp:ScriptManager>
            <div class="sfFormwrapper">
                <%-- <div class="main bdashboard menu-default">--%>
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
                                <img alt="Username" src="<%=GetUserImage %>" />
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
                            <login:LoginStatus ID="LoginStatus1" runat="server" />
                        </div>
                    </div>
                    <%--</div>--%>
                </div>
                <div class="dataadmin-container">
                    <asp:PlaceHolder ID="message" runat="server"></asp:PlaceHolder>
                    <ajax:TabContainer ID="TabContainerManagePages" runat="server" ActiveTabIndex="0"
                        meta:resourcekey="TabContainerManagePagesResource1">
                    </ajax:TabContainer>
                </div>
            </div>
            <asp:Literal runat="server" ID="ltrJQueryLibrary"></asp:Literal>

            <asp:Literal ID="LitSageScript" runat="server"></asp:Literal>

            <script type="text/javascript">
                //<![CDATA[


                $(function () {
                    if ($('.ajax__tab_outer').length === 1)
                        $($('.ajax__tab_outer')).hide();
                });

            </script>

            <div id="dialog" title="Confirmation Required">
                <label id="sf_lblConfirmation">
                </label>
            </div>


        </section>

        <script type="text/javascript">
            $(function () {
                $('.logout').on('click', function () {
                    if ($('.myProfileDrop').hasClass('Off')) {
                        $('.myProfileDrop').removeClass('Off');
                        $('.myProfileDrop').show();
                    }
                    else {
                        $('.myProfileDrop').addClass('Off');
                        $('.myProfileDrop').hide();
                    }
                });
                $('#pages').on('change', function () {
                    var pageID = $('#pages option:selected').val();
                    var src = window.location;
                    window.location.href = '<%= pageSrc%>' + '/CommonEdit.aspx?pageID=' + pageID;
                });

                $('#modules').on('change', function () {
                    var href = $('#modules option:selected').val();
                    if (href !== '0') {
                        window.location.href = href;
                    }
                });
                function fixSectionHeight() {
                    var windowsHeight = $(window).height();
                    var topBarHeight = $('.sfTopbar').height();
                    var headerHeight = $('#modulepageChooser').height();
                    var iframeHolderHeight = parseInt(windowsHeight) - parseInt(topBarHeight) - parseInt(headerHeight);
                    $('#iframeHolderSection').css({ 'height': iframeHolderHeight });

                }
                function changeIframeHolderClass() {
                    var blankLength = $('#iframeHolder').find('.choosePageModule').length;
                    if (blankLength == 1) {
                        $('#iframeHolder').addClass('blankmodule');
                    }
                }
                // fixSectionHeight();
                changeIframeHolderClass();
                $(window).resize(function () {
                    // fixSectionHeight();
                });
            });
        </script>
    </form>
</body>
</html>
