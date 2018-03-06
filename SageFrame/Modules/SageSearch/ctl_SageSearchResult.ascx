<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_SageSearchResult.ascx.cs"
    Inherits="Modules_SageSearch_ctl_SageSearchResult" %>

<script type="text/javascript">
    //<![CDATA[    
    $(function () {
        $(this).SageSearchResult({
            PortalID: '<%=PortalID %>',
            CulturalName: '<%=CulturalName %>',
            UserName: '<%=UserName %>',
            IsUseFriendlyUrls: 1,
            baseURL: '<%=baseURL %>',
            ViewPerPage: '<%=viewPerPage %>',
            RowTotal: '<%=RowTotal%>'
        });
    });
    //]]>	
</script>

<div class="sfSearchresult sfWrapper">
    <asp:Panel ID="pnlSearchWord" runat="server" CssClass="sfSearchwrapper searchResult">
    </asp:Panel>
    <div class="clear">
    </div>
    <asp:Literal ID="ltrSearchResult" runat="server"></asp:Literal>

    <asp:Panel ID="pnlSearchPaging" runat="server" CssClass="sfSearchwrapper searchResult">
    </asp:Panel>
    <%--<h2 id="h2SearchResult"></h2>

    <div class="sfSearchResultWrapper">
        <div id="divSageSearchResult" class="sfSearchlist">
            <ul id="ulSearchResult">
            </ul>
        </div>
        <div id="Pagination">
        </div>
        <div class="clear">
        </div>
    </div>--%>
</div>
