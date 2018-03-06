<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardOnHold.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardOnHold" %>


<div class="news-quickdashboard holdpost">
    <div class="box-heading">
        <h2 class="box-title">OnHold News</h2>
    </div>

</div>

<script type="text/javascript">
    $(function () {
        $(this).CallQDboardOnHold({
            UserModuleID : '<%=UserModuleID %>',
            roleID: '<%=RoleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
