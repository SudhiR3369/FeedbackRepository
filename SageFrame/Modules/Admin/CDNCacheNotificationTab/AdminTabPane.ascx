<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdminTabPane.ascx.cs" Inherits="AdminModuleTabPane" %>
<%@ Register Src="~/Modules/Admin/CDN/CDNView.ascx" TagPrefix="uc1" TagName="CDNView" %>
<%@ Register Src="~/Modules/Admin/CacheMaintenance/CacheMaintenance.ascx" TagPrefix="uc1" TagName="CacheMaintenance" %>

<div class="moduleTabWrap">
    <asp:HiddenField ID="hdnActiveMenuIndex" ClientIDMode="Static" runat="server" Value="0" />
    <asp:HiddenField ID="hdnUserModuleID" runat="server" Value="0" />
    <ul class="modulesTab" id="ulModuleTabMenu">
        <asp:Repeater ID="rptModuleTab" runat="server" OnItemCommand="rptModuleTab_ItemCommand">
            <ItemTemplate>
                <li>
                    <asp:LinkButton runat="server" CommandName='<%# Container.DataItem%>' Text='<%# Container.DataItem%>' />
                </li>
            </ItemTemplate>
        </asp:Repeater>
    </ul>
    <div id="divCacheMaintenance" runat="server" >
        <uc1:CacheMaintenance runat="server" ID="CacheMaintenance" />
    </div>
    <div id="divCDN" runat="server" visible="false">
        <uc1:CDNView runat="server" ID="CDNView" />
    </div>
   
    <div id="divNotification" runat="server" visible="false">
       
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $('#ulModuleTabMenu>li').each(function (index) {
            if (index == $('#hdnActiveMenuIndex').val()) {
                $(this).addClass('activeTab');
            }
        });
    })
</script>
