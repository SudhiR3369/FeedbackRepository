<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleMasterSetting.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleSetting_ArticleMasterSetting" %>
<h2 class="box-title">Article Setting</h2>

<div class="main-one-col">
    <div id="settingForm" class="sfFormwrapper clearfix">

        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Date Format</span>
            </span>

            <span class="formValue">
                <select id="dateSetting">
                </select>
            </span>
        </div>

        <div class="sfFieldset ">

            <span class="formKey textType">
                <span class="sfFormLabel">Name Format</span>
            </span>
            <span class="formValue">
                <select id="nameSetting">
                    <option value="0">First Name, Last Name</option>
                    <option value="1">Last Name, First Name</option>
                </select>
            </span>

        </div>

        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">Details Page</span>
            </span>
            <span class="formValue">
                <select id="detailsPage">
                    <option value="0">Page Not Available</option>
                </select>
            </span>
        </div>

        <div class="sfFieldset ">
            <span class="formKey textType">
                <span class="sfFormLabel">User Profile Page</span>
            </span>
            <span class="formValue">
                <select id="userProfilePage">
                </select>
            </span>
        </div>

        <div class="sfFieldset">
            <label id="settingError" class="sfError"></label>
        </div>

        <div class="sfButtonwrapper">
            <a id="btnSaveSetting" class="icon-save sfBtn smlbtn-succ">Save</a>
			 <a href="/dashboard/Article-Master-Setting" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
       
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $(this).CallArticleSetting({
            UserModuleID: '<%=UserModuleID %>',
            SiteID: '<%= SiteID %>'
        });
    });
</script>