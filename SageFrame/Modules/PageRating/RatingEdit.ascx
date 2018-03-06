<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RatingEdit.ascx.cs" Inherits="Modules_PageRating_RatingEdit" %>
<script type="text/javascript">
    $(function () {
        $(".divRatingPoint").each(function () {
            var point = $(this).data("id");
            $(this).starbox({
                average: point,
                changeable: false,
                ghosting: false,
                buttons: '<%=RatingPoint%>'
            });
        });
    });
</script>
<div class="divRatingCount">
    <asp:Literal runat="server" ID="ltrRating">
    </asp:Literal>
</div>