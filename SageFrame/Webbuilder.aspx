<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Webbuilder.aspx.cs" Inherits="SageFrame.Webbuilder" Async="true" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server" id="head">
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
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
    <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
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
        <asp:PlaceHolder ID="middlemaincurrent" runat="server"></asp:PlaceHolder>
        <asp:Literal ID="LitSageScript" runat="server"></asp:Literal>
    </form>
    <script type="text/javascript">
        $(function () {
            $(this).LoadFirst('<%=templateFavicon%>');
        });
    </script>
    <div id="dialog" title="Confirmation Required">
        <label id="sf_lblConfirmation">
        </label>
    </div>
</body>
</html>
