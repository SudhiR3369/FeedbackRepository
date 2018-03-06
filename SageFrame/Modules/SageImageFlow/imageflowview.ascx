<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ImageFlowView.ascx.cs" Inherits="Modules_SageImageFlow_ImageFlowView" %>
<div class="sageImageFlowWrap">
    <div id="DivImageFlow" runat="server">
        <asp:Literal ID="ltrlFlipItems" runat="server"></asp:Literal>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).ImageFlowView({
            ContainerDivID: '<%=DivImageFlow.ClientID%>',
            Style: '<%=Style%>',
            Spacing: '<%=Spacing%>',
            Arrow: '<%=Arrow%>',
            AutoPlay: '<%=AutoPlay%>',
            Looping: '<%=Looping%>',
            Clickable: '<%=Clickable%>',
            ScrollWheel: '<%=ScrollWheel%>',
        });
    })
</script>



