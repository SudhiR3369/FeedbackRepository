<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategorySetting.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleSetting_Category_CategorySetting" %>
<h2 class="box-title">Category Management</h2>
<div id="btnMain" class="sfButtonwrapper sfButtonwrapper--right mt-0">
    <a id="btnAdd" class="sfBtn smlbtn-primary icon-addnew">Add</a>
    <a id="selectAll" class="sfBtn smlbtn-safe icon-selectall">Select All</a>
    <a id="selectedDelete" class="sfBtn smlbtn-danger icon-delete">Delete</a>
    <a href="/dashboard/Article-Master-Setting" class="sfBtn smlbtn-danger icon-back">back</a>
</div>

<!--Category grid-->
<div class="main-one-col">
    <div class="sfModulecontent clearfix">



        <div class="data-views ">
            <div class="sfGridwrapper" id="grid">
                <div class="titleandfilter ">

                    <div class="grid_header">
						<div class="grid_header--check"></div>
                        <div class="grid_header--detail">Categories</div>
                        <div class="grid_header--action">Action</div>
                    </div>
                    <div id="catList">
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="sfPagination" id="catPagi">
    </div>




    <!--add new category form-->

    <div id="addForm" class="sfFormwrapper mastercategory" style="display: none">

        <input type="hidden" id="catID" value="0" />
        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Category Name</span>
            </span>

            <span class="formValue">
                <input id="catName" type="text" class="sfInputbox">
            </span>
        </div>

        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Category Icon</span>
            </span>

            <div class="fileUploader"></div>

        </div>
        <div class="sfFieldset">
            <label id="catNameError" class="sfError"></label>
        </div>

        <div class="sfButtonwrapper">
            <a id="btnSave" class="icon-save sfBtn smlbtn-succ ">Save</a>
            <a id="btnCancel" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallCat({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%= SiteID %>'
        });
    });
</script>
