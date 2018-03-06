<%@ Control Language="C#" AutoEventWireup="true" CodeFile="QuickDashboardScheduledPost.ascx.cs" Inherits="Modules_ArticleAdmin_QuickDashboard_QuickDashboardScheduledPost" %>

<div class="news-quickdashboard scheduledpost">
    <div class="box-heading">
        <h2 class="box-title">Scheduled Posts</h2>
        <%--<div class="control-wrap">

            <div class="easy-grid-top-filter flex-start">
                <div class="control-wrap">
                    <label>From</label>
                    <div class="custom-inputbox datepicker-input-box">
                        <input type="text" id="txtQuickStartDate" class="sfInputbox">
                    </div>
                </div>

                <div class="control-wrap">
                    <label>To</label>
                    <div class="custom-inputbox datepicker-input-box">
                        <input type="text" id="txtQuickEndDate" class="sfInputbox">
                    </div>
                </div>

            </div>
        </div>
        <label id="dateError" class="sfError"></label>--%>
        <div id="spList" class="clearfix">
        </div>
    </div>




</div>
<div class="sfPagination" id="spPagi">
</div>


<script type="text/javascript">
    $(function () {
        $(this).CallQDboardSP({
            UserModuleID: '<%=UserModuleID %>',
            roleID: '<%=RoleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
