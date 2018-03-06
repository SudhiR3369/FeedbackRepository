<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SageframeUpgradeView.ascx.cs"
    Inherits="Modules_Upgrade_SageframeUpgrade" %>
<style>
    .borderClass {
        border: solid 1px black;
        height: 150px;
        width: 350px;
        padding: 5px 5px 5px 35px;
    }

    .headerClass {
        background-color: Gray;
        font-size: large;
        font-weight: bold;
        padding: 5px 5px 5px 25px;
    }

    .errorMsgClass {
        color: Red;
    }

    #uniform-ctl13_fuUpgrade input {
        opacity: 100 !important;
    }
</style>
<h1>Upgrader</h1>
<div class="sfFormwrapper">
  <%--  <asp:FileUpload ID="fuUpgrade" runat="server" />
    <label for='<%=fuUpgrade.ClientID%>'>Choose File</label>--%>
    
        <asp:Label ID="lblAdminMessage" Cssclass="upgradeMessage" runat="server"></asp:Label>
    <div class="sfButtonwrapper">
        <label class="icon-update sfBtn smlbtn-succ sfLocale">
            Upgrade
        <asp:Button ID="btnUpload" runat="server" OnClick="btnUpload_Click" /></label>
        <asp:Label ID="lblErrorMsg" runat="server" Text="" CssClass="sfRequired"></asp:Label>
 </div>
   
</div>
