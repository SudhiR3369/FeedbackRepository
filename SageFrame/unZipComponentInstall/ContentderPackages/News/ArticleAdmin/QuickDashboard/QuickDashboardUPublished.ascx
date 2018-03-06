<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardUPublished.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardUPublished" %>

<div class="news-quickdashboard unpublishedpost">
    <div class="box-heading">
        <h2 class="box-title">Unpublished News</h2>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallQDboardUP({
            UserModuleID : '<%=UserModuleID %>',
            roleID: '<%=RoleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
