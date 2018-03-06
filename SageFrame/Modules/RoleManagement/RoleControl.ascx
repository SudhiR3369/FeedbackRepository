<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RoleControl.ascx.cs" Inherits="Modules_ArticleAdmin_User_AddRole" %>

<script type="text/javascript">
    var UserModuleID = '<%=UserModuleID %>';
    $(function () {
        $(this).CallRoleJs();
    });
</script>
<h2 class="box-title">Role Management</h2>
<div id="btnMain" class="sfButtonwrapper sfButtonwrapper--right mt-0">
    <a id="btnAdd" class="sfBtn smlbtn-primary icon-addnew">Add</a>
</div>
<!--role grid-->
<div class="main-one-col clearfix">
    <div class="sfModulecontent ">



        <div class="data-views data-views">
            <div class="sfGridwrapper" id="grid">
                <div class="titleandfilter ">
                    <!-- <h2>Roles</h2>-->
                    <div class="grid_header">
                        <div class="grid_header--detail">Roles</div>
                        <div class="grid_header--status">Status</div>
                        <div class="grid_header--action">Action</div>
                    </div>
                    <div id="roleList">
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="sfPagination" id="rolePagi">
    </div>




    <!--add new role form-->

    <div id="addForm" class="sfFormwrapper" style="display: none">
        <div class="sfFieldset ">
            <input type="hidden" id="roleId" value="" />
            <span class="formKey textType">
                <span class="sfFormLabel">Role Name</span>
            </span>
            <span class="formValue">
                <input id="roleName" type="text" class="sfInputbox">
                <label id="roleNameError" class="sfError"></label>
            </span>
        </div>


        <div class="sfButtonwrapper">
            <a id="btnSave" class="icon-save sfBtn smlbtn-succ ">Save</a>
            <a id="btnCancel" class="icon-cross sfBtn smlbtn-danger">Cancel</a>

        </div>
    </div>
</div>
