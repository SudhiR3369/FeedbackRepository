<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardMostCommented.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardMostCommented" %>

<div class="news-quickdashboard commentedpost">
    <div class="box-heading">
        <h2 class="box-title">Most Commented Post</h2>
    </div>

</div>
<script type="text/javascript">
    $(function () {
        $(this).CallMostComment({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>