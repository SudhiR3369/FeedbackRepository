<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebBuilder.ascx.cs" Inherits="Modules_WebBuilder_WebBuilder" %>
<%--<asp:TextBox TextMode="MultiLine" runat="server" ID="txtValue" Height="500px" Width="500px"></asp:TextBox>--%>
<div class="edit-area site-body" data-settings="<%=settings %>">
    <asp:Literal runat="server" ID="ltrWebBuilderData"></asp:Literal>
</div>
<script>
    webBuilderUserModuleID = '<%=userModuleID%>';
    EditorMode = false;
    var webbuildermodulepath = '/modules/webbuilder';
    var isPreview = '<%=isPreview%>';
    var component = {};
    var componentID = [];
    $(function () {
        if (typeof storedComponent !== "undefined") {
            $.each(storedComponent, function (i, v) {
                componentID.push(v.ComponentID);
                v = v.ComponentValue;
                var value = JSONParse(v);
                var key = value.componentname;
                component[key] = value;
            });
        }
        $(this).WebBuilderView({
            pageName: '<%=tempPageName%>'
        });
        if (isPreview.toLowerCase() == "true") {
            $(".eb-menu").find(".pagelink").each(function () {
                var href = $(this).attr('href');
                var pageName = getPageName(href);
                var newHref = window.location.origin + '/' + pageName.replace(/ /g, '-') + '/preview';
                $(this).attr('href', newHref);
            });
            $('body').find("a.anchorpage").each(function () {
                var href = $(this).attr('href');
                if (typeof href !== "undefined" && href.indexOf("javascript") == -1 && href != "" && href != "#") {
                    var pageName = getPageName(href);
                    var newHref = window.location.origin + pageName.replace(/ /g, '-') + '/preview';
                    $(this).attr('href', newHref);
                }
            });
        }
    });
    function getPageName(url) {
        var index = url.lastIndexOf("/") + 1;
        var filenameWithExtension = url.substr(index);
        var filename = filenameWithExtension.split(".")[0]; // <-- added this line
        return filename;                                    // <-- added this line
    }
</script>
