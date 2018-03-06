<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdminContactUs.ascx.cs" Inherits="Modules_WebbuilderHelper_AdminContactUs" %>
<script type="text/javascript">
    //<![CDATA[   
    $(function () {
        $(this).AdminContactUsManage({
            userModuleID: '<%=userModuleID%>',
            modulePath: '<%=modulePath%>'
        });
    });
    //]]>	
</script>
<div id="divContactUSWrap" class="divContactUSWrap generic-grid-system">

    <div class="sfGridwrapper animate" id="divContactList">
    <h2>Contact Us Manage</h2>
    <div id="divFilters">
        <div class="filter_wrap">
            <div class="filter_group">
                <label>Name</label>
                <input type="text" id="txtName" placeholder="Enter name" name="txtName" class="search filter_field">
            </div>
            <div class="filter_group">
                <label>Email</label>
                <input type="text" id="txtEmail" placeholder="Enter name" name="txtEmail" class="search filter_field">
            </div>
            <div class="filter_button_wrap">
                <span class="sfBtn smlbtn-primary filter_search" id="btnSearch"><i class="fa fa-search"></i>Search</span>
                <%--<span class="fa fa-refresh ml-20" id="btnRefreshData"></span>--%>
            </div>
        </div>
    </div>
    <div class="content box">
        <div class="content_wrap">             
            <table id="tblContactUS" class="responsive_data_table">
            </table>
            <div class="clearfix"></div>
        </div>
    </div>
        </div>
    <div id="divViewContact" style="display:none;">

    </div>
</div>
