<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardTrending.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardTrending" %>

<div class="news-quickdashboard trendingpost">
    <div class="box-heading">
        <h2 class="box-title">Most Trending</h2>
    </div>
    <div class="jcarousel-wrapper">
        <div class="jcarousel trendingList">
        </div>
    </div>
    <a href="#" class="jcarousel-control-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
    <a href="#" class="jcarousel-control-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>

    <p class="jcarousel-pagination">
    </p>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallTrend({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
