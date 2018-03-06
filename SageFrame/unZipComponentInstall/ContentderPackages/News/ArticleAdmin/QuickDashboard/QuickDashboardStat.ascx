<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardStat.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardStat" %>


<div class="grid">
    <div class="grid-heading">
        <h1 class="box-title">Site Statistics</h1>
    </div>
    <div id="grid" class="dashboard-statistics">
        <div class="stat published-stat">
            <div id="publishedValues"></div>
        </div>

        <div class="stat unpublished-stat">
            <div id="UnpublishedValues"></div>
        </div>

        <div class="stat onhold-stat">
            <div id="onHoldValues"></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallQDboardStat({
            UserModuleID: '<%=UserModuleID %>',
            roleID: '<%= RoleID %>',
            SiteID: '<%= SiteID %>'
        });
    });
</script>
