<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleTypeSetting.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleSetting_ArticleTypeSetting" %>

<h2 class="box-title">Article Type Setting</h2>
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
                        <div class="grid_header--detail">Article Types</div>
                        <div class="grid_header--action">Action</div>
                    </div>
                    <div id="typeList">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sfPagination" id="atPagi">
    </div>




    <!--add new category form-->

    <div id="addTypeForm" class="sfFormwrapper" style="display: none">

        <input type="hidden" id="typeID" value="0" />
        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Article Type Name</span>
            </span>

            <span class="formValue">
                <input id="typeName" type="text" class="sfInputbox">
            </span>
        </div>

        <div class="sfFieldset">
            <label id="typeNameError" class="sfError"></label>
        </div>

        <div class="sfButtonwrapper">
            <a id="btnSave" class="icon-save sfBtn smlbtn-succ ">Save</a>
            <a id="btnCancel" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallArticleType({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
