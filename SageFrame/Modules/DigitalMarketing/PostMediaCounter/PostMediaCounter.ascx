<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PostMediaCounter.ascx.cs" Inherits="Modules_DigitalMarketing_PostMediaCounter_PostMediaCounter" %>


<script type="text/javascript">
    $(function () {
        $(this).PostMediaCounter({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'

        });
    });
</script>

<div class="pnlPostMediaCounter sfCol_33 sfFixed">

    <div class="sfModuleHeader box-head">
        <div class="head-left">
            <d>My Tracked Posts</h2>
        </div>
    </div>

    <div id="dvPostMediCounterContent" class="sfModulecontent clearfix">

     <%--   <div>
            <ul>
                <li>
                    <div>
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                        <label>2</label>

                    </div>
                </li>
                <li>
                    <div>
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                        <label>2</label>
                    </div>

                </li>
            </ul>
        </div>--%>

    
    </div>




</div>
