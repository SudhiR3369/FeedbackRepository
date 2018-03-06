<%@ Control Language="C#" AutoEventWireup="true" CodeFile="MediaPerformaceCounter.ascx.cs" Inherits="Modules_DigitalMarketing_MediaPerformaceCounter_MediaPerformaceCounter" %>


<script type="text/javascript">
    $(function () {
        $(this).MediaPerformaceCounter({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'

        });
    });
</script>

<div class="pnlPerformanceCounter">
    <%--<div class="pnlPerformanceCounter sfCol_50 sfFixed">--%>

    <div class="sfModuleHeader box-head">

        <div class="head-left ">
            <h2 class="pcHeader box-title">My Performance Counter </h2>
            <%--<span><i class="sfTooltip icon-info" id="imgPerformanceCounterInfo"></i></span>--%>
        </div>

        <div class="head-right">
            <div class="counterGroup">
            </div>

            <span><i class="fa fa-puzzle-piece pfCounterSetting" aria-hidden="true" title="Counter Item"></i></span>
            <span><i class="fa fa-line-chart pfAddNewGraph" aria-hidden="true" title="Performance Graph"></i></span>
            <button type="button" id="btnReset" class=" search_icon_btn">
                                    <i class="icon-refresh"></i>
                                </button>
        </div>

    </div>
	
    <div id="divDroppable" class="sfModulecontent clearfix performanceCounterContainer">
    </div>
	<div class="legends">
		<ul>
			<li>Like</li>
			<li>Share</li>
			<li>Post</li>
			<li>Comment</li>
			<li>Followers</li>
			<li>Connection</li>
			
		</ul>
	
	</div>

    <div class="divGraphContainer" style="display: none;">
        <div>
            <h2>Social Media Analyzer </h2>
            <div class="wrapheader sfFormwrapper twoColForm">



                <div class="control-wrap">
                 <label class="sfFormlabel">Current Attribute </label>
                 <div class="custom-select">
                        <select class="slcGraphAttributeType">
                            <option value="0">Select a Graph Attribute</option>
                        </select>
                 </div>
                </div>



                <div id="customcanvas" data-graphtype="like" class="divGraphDroppable customcanvas">
                </div>
            </div>
            <ul class="graphItems"></ul>
        </div>



    </div>


    <div class="sfDivFlying pcSettings" style="display: none;">
        <h3 class="hNewItem">Add a new counter</h3>
        <div class="divFlying-content">
            <span id="divFlyingLabel">Choose a Media Type :</span>
            <div class="settingsElement">
            </div>
        </div>

        <div class="sfButtonwrapper sftype1 " id="divAdd">
            <label id="lblFlyingAddNew" class="icon-addnew sfBtn smlbtn-succ">Add</label>
            <label id="closeDivFlying" class=" icon-close sfBtn smlbtn-danger">Cancel</label>
        </div>

    </div>


</div>
