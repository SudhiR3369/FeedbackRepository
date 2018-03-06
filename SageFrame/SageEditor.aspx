<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SageEditor.aspx.cs" Inherits="SageFrame.SageEditor" %>

<%@ Register Src="~/Controls/LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" id="head">
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
    <link type="icon shortcut" media="icon" href="favicon.ico" />
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
    <asp:Literal runat="server" ID="ltrJQueryLibrary"></asp:Literal>
    <asp:Literal ID="SageFrameModuleCSSlinks" EnableViewState="false" runat="server"></asp:Literal>
    <title>SageFrame Website</title>
</head>
<body>
    <form id="form1" runat="server" enctype="multipart/form-data">
        <noscript>
            <asp:Label ID="lblnoScript" runat="server" Text="This page requires java-script to be enabled. Please adjust your browser-settings."></asp:Label>
        </noscript>
        <div id="sfOuterwrapper">
            <div class="sfSagewrapper">
                <!--End of CPanel Head-->
                <!--Body Content-->
                <div class="sfContentwrapper clearfix">
                    <div id="divCenterContent" class="sfCol_100">
                        <asp:PlaceHolder ID="middlemaincurrent" runat="server"></asp:PlaceHolder>
                    </div>
                </div>
            </div>
            <!--Footer Wrapper-->
        </div>
        <asp:Literal ID="LitSageScript" runat="server"></asp:Literal>
    </form>
    <script type="text/javascript">
        $(this).LoadFirst();
        $(function () {
            $('.divModulesList').draggable({
                //'scroll': true,
                'revert': true,
                cursor: 'pointer',
                connectWith: '.sfWrapper',
                helper: 'clone'
            });
        });
    </script>
    <div id="dialog" title="Confirmation Required">
        <label id="sf_lblConfirmation">
        </label>
    </div>
    <div id="SettingPlaceHolder" class="settingPopupWrapper">
    </div>
</body>
</html>
