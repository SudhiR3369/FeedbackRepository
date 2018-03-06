<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TaskToDoView.ascx.cs"
    Inherits="Modules_TaskToDo_TaskToDoView" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<script type="text/javascript">
    $(function () {
        $(this).TaskEdit
        ({
            BaseUrl: '<%=BaseUrl%>',
            UserModuleId: '<%=UserModuleId%>'
        });
        //$(".sfLocale").Localize({ moduleKey: TaskToDoLanguage })
        $('#tabTaskList').tabs({ active: 1 });

    });

</script>





<div class="box-content">

    <div id="tabTaskList">
        <div class="box-head pull-right clearfix">
    <div class="head-left sfFormwrapper">
        <div class="sfRowfilter">
            <div class="addRow sfFieldset clearfix">
                <div class="formKey"><span class="sfFormlabel">Search</span></div>
                <div id="dvSearch" class="sfSearch formValue">
                    <input type="text" id="txtSearchDate" style="width: 0px; padding: 5px 0px;" readonly="readonly" />

                </div>
            </div>
            <div class="sfFieldset"><span class="icon-search" id="btnSearchTab"></span></div>
            <div class="sfFieldset">
                <label class="sfLocale icon-addnew  smlbtn-primary sfBtnSml " id="AddTaskTab" value="Add">
                    Add
                </label>
            </div>
        </div>
    </div>
</div>
        <ul>
            <li><a id="liPrevious" href="#tabsPrevious">Previous</a></li>
            <li><a id="liToday" href="#tabsToday">Today</a></li>
            <li><a id="liTommorow" href="#tabsUpcomming">Upcoming</a></li>
            <li><a id="liAll" href="#tabsAll">All</a></li>
        </ul>
        <div id="tabsToday">
        </div>
        <div id="tabsAll">
        </div>
        <div id="tabsPrevious">
        </div>
        <div id="tabsUpcomming">
        </div>
        <div class="divscroll" id="dvScroll">
            <div id="dvTask">
            </div>
        </div>
    </div>
    <div class="addNew" id="dvaddNew">
        <h4>Add Task</h4>
        <div class="sfFormwrapper">
            <div class="sfFieldset">
                <div class="formKey">
                    <span class="sfLocale sfFormlabel">Task</span>
                </div>
                <div class="formValue">
                    <textarea id="txtAddNote" name="txtAddNote" class="sfInputbox" rows="20" cols="5"></textarea>
                </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey">
                <span class="sfLocale sfFormlabel">Date</span>
            </div>
            <div class="formValue">
                <input type="text" name="txtDate" id="txtDate" class="sfDatepicker" />
            </div>
        </div>
        <div class="sfButtonwrapper">
            <label id="btnAddNewTask" class="sfLocale icon-addnew smlbtn-succ smlbtn-primary sfBtn">
                Add</label>
            <label id="btnTaskCancel" class="sfLocale icon-close smlbtn-danger sfBtn">
                Cancel</label>
        </div>
    </div>
    <div class="divscroll" id="divSearch" style="display: none;">

        <div id="dvSearchTaskList">
        </div>
        <label class="sfBtn smlbtn-danger icon-back sfBtn" id="BtnTaskBack" value="back">
            Back</label>
    </div>
</div>
</div>




