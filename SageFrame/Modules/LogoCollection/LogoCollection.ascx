<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LogoCollection.ascx.cs" Inherits="Modules_LogoCollection_LogoCollection" %>

<h1 class="box-title">Customize Logos and Icons</h1>
<span class="changeFavicon btn primary-btn">Change Favicon </span>
<asp:Literal ID="ltrLogoCollection" runat="server" EnableViewState="false">
</asp:Literal>
<div style="display: none;">
    <asp:HiddenField runat="server" ID="hdnImagePath" />
    <asp:HiddenField runat="server" ID="hdnFolderName" />
    <asp:Button runat="server" ID="btnChangeFavicon" Class="changeFavIcon" OnClick="btnChangeFavicon_Click" />
    <asp:Button runat="server" ID="btnChangeImage" Class="saveImage" OnClick="btnChangeImage_Click" />
</div>
<script>
    $(function () {
        $('.changesimage').on('click', function () {
            var $this = $(this);
            var foldeName = $this.attr('data-dirName')
            $(this).SageMedia({
                userModuleID: '<%=userModuleID%>',
                onSelect: function (src, response, type, filename, extension) {
                    var hdnFolderName = '<%=hdnFolderName.ClientID%>';
                    var hdnImagePath = '<%=hdnImagePath.ClientID%>';
                    $('#' + hdnFolderName).val(foldeName);
                    $('#' + hdnImagePath).val(src);
                    $('.saveImage').trigger('click');
                },
                mediaType: 'image'
            });
        });
        $('.changeFavicon').on('click', function () {
            var $this = $(this);
            $(this).SageMedia({
                userModuleID: '<%=userModuleID%>',
                onSelect: function (src, response, type, filename, extension) {
                    if (extension === "ico") {
                        var hdnImagePath = '<%=hdnImagePath.ClientID%>';
                        $('#' + hdnImagePath).val(src);
                        $('.changeFavIcon').trigger('click');
                    }
                },
                mediaType: 'image'
            });
        });
    });
</script>
