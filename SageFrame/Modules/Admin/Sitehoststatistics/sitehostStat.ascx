<%@ Control Language="C#" AutoEventWireup="true" CodeFile="sitehostStat.ascx.cs" Inherits="Modules_Admin_Sitehoststatistics_sitehostStat" %>
<div class="site-host-stat">
    <div class=" box-heading">
        <h2 class="box-title">Resource Utilization</h2>
    </div>
    <div  class="display-flex siteCounter">
       
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).SiteHostStat({
            modulePath: '<%=modulePath%>',
            UserModuleID: '<%=SageUserModuleID%>'
        });
    });
</script>
