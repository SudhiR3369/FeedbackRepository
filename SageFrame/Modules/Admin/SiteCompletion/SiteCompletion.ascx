<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SiteCompletion.ascx.cs" Inherits="Modules_Admin_SiteCompletion_SiteCompletion" %>
<div class="site-completion">
    <div class=" box-heading">
        <h2 class="box-title">Site Completion</h2>
    </div>
    <div class="display-flex" id="siteCompletion">
        <div class="left">
            <div class="canvas-wrap">
                <canvas id="SiteCompleteCanvas" width="300" height="300"></canvas>
                <span id="SiteComPercent" class="site-percent"></span>
            </div>
        </div>
        <div class="right">
            <div class="head" id="siteCompleteMsg">
                
            </div>

            
        </div>
        <div class="task-list">
            <ul id="lstNotUpdatedData">            
            </ul>
        </div>
       
    </div>
</div>
<script type="text/javascript">
    $(function () {
        $(this).SiteCompletion({
            UserModuleID: '<%=SageUserModuleID%>'
        });
    });
</script>
