<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AdvisionDetail.ascx.cs" Inherits="Modules_Admin_AdvisionDetail_AdvisionDetail" %>

<script type="text/javascript">
    $(function () {
        $(this).AdvisionDetail({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>'
        });
    });
</script>

<div class="fieldset">

    <h1>Advision Detail</h1>

    <div id="viewAdvisionDetail">


        <div id="divSettingsView">
            <div id="divAdivsionBtns" class="sfButtonwrapper">
                <button type="button" class="icon-settings smlbtn-def sfBtn" id="btnEditKeywords">
                    <span>Edit Business keywords</span>
                </button>
            </div>
        </div>


        <div class="sfFormwrapper twoColForm">

            <div class="sfRowfilter divViewBusinessSector fieldActive">

                <div class="sfFieldset">
                    <label class="sfFormlabel">Business Sector </label>
                </div>

                <div id="divViewBusinessSectorValue" class="formValue"></div>

            </div>


            <%--            <div class="sfFieldset divViewBusinessSector fieldActive">
                <div class="formKey textType">
                    <label class="sfFormlabel">Business Sector </label>
                </div>
                <div id="divViewBusinessSectorValue" class="formValue divViewBusinessSectorValue">
                </div>
            </div>--%>


            <%--   <div class="sfRowfilter">
                <div class="sfFieldset">
                    <label class="sfFormlabel">Business Sector </label>
                </div>

                <div id="divViewBusinessSectorValue" class="formValue divViewBusinessSectorValue">
                </div>
            </div>--%>


            <div class="sfRowfilter divViewSiteCategory fieldActive">

                <div class="sfFieldset">
                    <label class="sfFormlabel">Site Category </label>
                </div>
                <div class="formValue" id="divViewSiteCategoryValue">
                </div>
            </div>

            <div class="sfRowfilter divViewBusinessTypes fieldActive">

                <div class="sfFieldset">
                    <label class="sfFormlabel">Business Type </label>
                </div>
                <div class="formValue">
                    <div id="divViewBusinessTypesValue"></div>
                </div>
            </div>

            <div class="sfRowfilter divViewKeywords fieldActive">

                <div class="sfFieldset">
                    <label class="sfFormlabel">Business Keywords  </label>
                </div>
                <div class="formValue">
                    <div id="divViewKeywordsValue"></div>
                </div>
            </div>


        </div>

    </div>

    <div id="editAdvisionDetail" style="display: none;">

        <div id="divAdvisionDetailBtns" class="sfButtonwrapper">
            <button type="button" class="icon-back sfBtn smlbtn-danger" id="btnViewAdvisionDetail">
                <span>Back</span>
            </button>
            <button type="button" class="icon-save sfBtn smlbtn-succ" id="btnAdvisionDetailSaveSettings">
                <span>Save Changes</span>
            </button>
        </div>


        <div class="divAdvisionEditDetail"></div>


    </div>

</div>
