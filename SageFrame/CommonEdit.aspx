<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CommonEdit.aspx.cs" Inherits="CommonEdit" %>

<%@ Register Src="~/Controls/TopStickyBarModuleEditor.ascx" TagName="TopStickyBar" TagPrefix="ucstickybar" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Common Editor</title>
    <script src="js/jquery-1.9.1.js"></script>
    <link href="Administrator/Templates/Default/css/grid.css" rel="stylesheet" />
    <link href="Administrator/Templates/Default/css/common.css" rel="stylesheet" />
    <link href="Administrator/Templates/Default/css/font-awesome.min.css" rel="stylesheet" />
    <link href="css/commonedit.css" rel="stylesheet" />
    <style type="text/css">
        #divFrame {
            width: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="sftopstickbarToggle">
            <div id="divAdminControlPanel" runat="server" style="display: block;">
                <ucstickybar:TopStickyBar ID="topStickybar" runat="server" />
            </div>
        </div>
        <header id="modulepageChooser" class="sfCol_100">
            <div class="sfFormwrapper twoColForm" id="tblChangePasswordSettings" runat="server">
                <div class="sfFieldset">
                    <span class="formKey">Select a Page:
                    </span>
                    <span class="formValue">
                        <select id="pages">
                            <asp:Literal runat="server" ID="ltrPageList"></asp:Literal>
                        </select>

                    </span>
                </div>
                <div class="sfFieldset">
                    <span class="formKey">Select a Module:
                    </span>
                    <span class="formValue">
                        <select id="modules">
                            <asp:Literal runat="server" ID="ltrModuleList">
                            </asp:Literal>
                        </select>
                    </span>
                </div>
            </div>
        </header>
        <section id="iframeHolderSection" class="sfCol_100  modulecommoneditor">
            <div id="iframeHolder" runat="server">
                <asp:Literal runat="server" ID="ltrIframe"></asp:Literal>
            </div>
        </section>
<%--        <script src="js/TopStickyBar.js"></script>--%>
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
                    //$('#divFrame').css({ 'height': '100% !important' });

                    //change iframeholder class
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
