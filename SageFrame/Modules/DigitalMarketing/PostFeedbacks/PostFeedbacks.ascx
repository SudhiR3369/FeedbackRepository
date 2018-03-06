<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PostFeedbacks.ascx.cs" Inherits="Modules_DigitalMarketing_PostFeedbacks_PostFeedbacks" %>


<script type="text/javascript">
    $(function () {
        $(this).PostFeedBacks({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'

        });
    });
</script>

<div class="pnlPostFeedBack sfFixed">

    <div class="sfModuleHeader box-head">
        <div class="head-left">
            <h2 class="trendingPostHeader">My Trending Posts </h2>
        </div>
        <div class="head-right">
       <%--     <span><i class="fa fa-cogs" aria-hidden="true"></i></span>
            <span><i class="fa fa-history refreshFeedBacks" aria-hidden="true"></i></span>--%>
        </div>
    </div>

    <div class="sfModulecontent clearfix">

        <div id="dvGeneral" class="sfSnapshotTabDiv sfGridwrapper ui-tabs-panel ui-widget-content ui-corner-bottom">

          
        </div>

    </div>




</div>
