<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TwitterSearch.ascx.cs" Inherits="Modules_TwitterSearch_TwitterSearch" %>

<script type="text/javascript">
    $(function () {
        $(this).TwitterSearch({
            modulePath: '<%=modulePath%>',
            userModuleID: '<%=userModuleID%>'
        });
    });
</script>

<div id="searchContainer" class="sfGridwrapper">
</div>

