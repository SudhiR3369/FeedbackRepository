<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RatingView.ascx.cs" Inherits="Modules_PageRating_RatingView" %>
<script type="text/javascript">
    $(function () {
        $(this).RatingViewManage({
            AverageRating: '<%=AverageRating%>',
            RatingPoint: '<%=RatingPoint%>',
            RatingTitle: '<%=RatingTitle%>',
            IsRatingChangeable: '<%=IsRatingChangeable%>',
            userModuleID: '<%=userModuleID%>',
            UserRating:'<%=UserRating%>'
        });
    });
</script>
<div id="divPageRating">
    <h4 id="ratingTitle"></h4>
    <div id="divRating" class="divRating">
    </div>
    <h4 class="rating">Average Rating</h4>
    <div id="divAvgRating" class="divRating">
    </div>
    <div id="divRatingPopUp">
    </div>
</div>