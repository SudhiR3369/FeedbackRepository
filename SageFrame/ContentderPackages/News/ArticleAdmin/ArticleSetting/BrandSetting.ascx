<%@ Control Language="C#" AutoEventWireup="true" CodeFile="BrandSetting.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleSetting_BrandSetting" %>
<!--Category grid-->
<h2 class="box-title">Brand Management</h2>
<div id="btnMain" class="sfButtonwrapper  sfButtonwrapper--right mt-0">
    <a id="btnAdd" class="sfBtn smlbtn-primary icon-addnew">Add</a>
    <a id="selectAll" class="sfBtn smlbtn-safe icon-selectall">Select All</a>
    <a id="selectedDelete" class="sfBtn smlbtn-danger icon-delete">Delete</a>
    <a href="/dashboard/Article-Master-Setting" class="sfBtn smlbtn-danger icon-back">back</a>
</div>
<div class="main-one-col">
    <div class="sfModulecontent clearfix">



        <div class="data-views ">
            <div class="sfGridwrapper" id="grid">
                <div class="titleandfilter ">

                    <div class="grid_header">
						<div class="grid_header--check"></div>
                        <div class="grid_header--detail">Brand</div>
                        <div class="grid_header--action">Action</div>
                    </div>
                    <div id="brandList">
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="sfPagination" id="brandPagi">
    </div>




    <!--add new category form-->

    <div id="addBrandForm" class="sfFormwrapper" style="display: none">

        <input type="hidden" id="brandID" value="0" />
        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Brand Name</span>
            </span>

            <span class="formValue">
                <input id="brandName" type="text" class="sfInputbox">
            </span>
        </div>

        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Brand Logo</span>
            </span>

            <div class="fileUploader"></div>

        </div>
        <div class="sfFieldset">
            <label id="brandError" class="sfError"></label>
        </div>

        <div class="sfButtonwrapper">
            <a id="btnSaveBrand" class="icon-save sfBtn smlbtn-succ ">Save</a>
            <a id="btnCancel" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallBrand({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%=SiteID %>'
        });
    });
</script>
