<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HTMLView.ascx.cs" Inherits="SageFrame.Modules.HTML.HTMLView" %>
<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>
<script type="text/javascript">
   
</script>
<div id="divViewWrapper" runat="server" class="sfHtmlview">
    <asp:Literal ID="ltrContent" EnableViewState="false" runat="server"></asp:Literal>
</div>
