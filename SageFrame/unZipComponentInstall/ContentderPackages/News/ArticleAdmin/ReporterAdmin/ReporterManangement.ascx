<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReporterManangement.ascx.cs" Inherits="Modules_ArticleAdmin_ReporterAdmin_ReporterManangement" %>


<%--<style>
    .filterSlider_body_container{
        max-height:500px;
        overflow-y:scroll;
    }
</style>--%>
<script>
    $(function () {
        $(this).ReporterManagementEditor({
            UserModuleID: '<%=UserModuleId%>',
            CultureCode: '<%=GetCurrentCultureName%>',
            roleID: '<%=roleID%>',
            siteID: '<%=GetSiteID%>',
        })
    });
</script>

<div id="MainForm" style="display: none;"">
   <div class="box-heading">
      <h2 class="box-title">Add Draft</h2>
      <div class="sfButtonwrapper sfButtonwrapper--right mt-0">
         <a class="versionlog float-right sfBtnSml smlbtn-def icon-install">Version Log</a>
      </div>
      <a id="btnOpenActivityMsg" style="display:none"></a>
      <div id="ReporterRemarks" style="display:none">
         <div class="sfFormWrapper">
            <div class="sfFieldset rActivityLog" style="display: block;">
               <span class="formKey textType">
               <span class="sfFormLabel">Activity Remarks</span>
               </span>
               <span class="formValue ">
               <textarea class="sfInputbox activityremarks" name="ActivityRemarks" id="txtActivityRemarks"></textarea>
               </span>
            </div>
            <div class="sfButtonwrapper">
               <a  id="btnActivityRemarksDone" class="sfBtn smlbtn-succ icon-plane">Submit</a>
            </div>
         </div>
      </div>
      <div id="divVersionLog" class="cVersionLog"  style="display:none">            
      </div>
   </div>
   <div class="two-col-form">
      <div class="main-left sfCol_60">
         <div id="MainStatePreview" class="sfFormwrapper" style="display: none;">
            <div class="sfFieldset rOpinionBy" style="">
               <span class="formKey textType">
               <span class="sfFormLabel">Opinion By</span>
               </span>
               <span class="formValue ">
               <input type="text" class="viewtext" name="Title" id="txtOpinionByV" readonly="readonly">
               </span>
            </div>
            <div class="sfFieldset rTitle" style="">
               <span class="formKey textType">
               <span class="sfFormLabel">Title</span>
               </span>
               <span class="formValue ">
               <input type="text" class="viewtext" name="Title" id="txtTitleV"  readonly="readonly">
               </span>
            </div>
            <div class="sfFieldset rSummary" style="">
               <span class="formKey textType">
               <span class="sfFormLabel">Summary</span>
               </span>
               <span class="formValue ">
               <textarea id="txtSummaryV" maxlength="500" class="viewtext" readonly="readonly"></textarea>                
               </span>
            </div>
            <div class="sfFieldset rDetail" style="">
               <span class="formKey textType">
               <span class="sfFormLabel">Detail</span>
               </span>
               <span class="formValue ">
                  <div id="divDetailV"></div>
               </span>
            </div>
         </div>
         <div class="sfFormwrapper sfFormwrapper--custom sfFormwrapper--check divInputEvent">
            <div class="sfFieldset rOpinionBy" style="display: none;">
               <span class="formKey textType">
               <span class="sfFormLabel">Opinion By</span>
               </span>
               <span class="formValue ">
                  <input type="text" class="sfInputbox" id="txtOpinionBy" name="OpinionBy">
                  <div class="sfError errorMsg errorMsgopinion"></div>
               </span>
            </div>
            <div class="sfFieldset rTitle" style="display: none;">
               <span class="formKey textType">
               <span class="sfFormLabel">Title</span>
               </span>
               <span class="formValue ">
               <input type="text" class="sfInputbox" name="Title" id="txtTitle">
               </span>
            </div>
            <div class="sfFieldset rSummary" style="display: none;">
               <span class="formKey textType">
               <span class="sfFormLabel">Summary</span>
               </span>
               <span class="formValue ">
               <textarea id="txtSummary" name="Summary"></textarea>
               </span>
            </div>
            <div class="sfFieldset rDetail" style="display: none;">
               <span class="formKey textType">
               <span class="sfFormLabel">Detail</span>
               </span>
               <span class="formValue ">
               <textarea id="txtDetail" name="Detail"></textarea>
               </span>
            </div>
            <div class="sfFieldset ">
               <span class="formKey textType in-block ">
               <span class="sfFormLabel">Add Quotation</span>
               </span>
               <span class="formValue in-block mt-0">
                  <div class="checkslider-btn">
                     <input type="checkbox" id="cbquotes" />
                     <label for="cbquotes">Quotation</label>
                     <span class="formValue ">
                     </span>
                  </div>
               </span>
               <span class="checkslider-btn--value">
               <input type="text" class="sfInputbox" id="txtQuotation" name="Quotation" style="display: none">
               </span>
            </div>
            <div class="sfFieldset ">
               <span class="formKey textType">
               <span class="sfFormLabel">Category</span>
               </span>
               <span class="formValue " id="CategoryList">
               </span>
               <div class="sfError errorMsg errorMsgcatgory"></div>
            </div>
            <div class="sfFieldset dropzone clearfix">
               <div class=" dropzone--media">
                  <div class="dropzone_mediaupload dropzone_mediaupload--uploader">
                     <div class="formKey in-block">
                        <span class="formKey">Media</span>
                     </div>
                     <div class="float-right">
                        <a class="sfBtn smlbtn-succ icon-save" id="btnMediaManagement">Browse Media</a>
                     </div>
                  </div>
               </div>
               <div class="sfError errorMsg errorMsgMedia"></div>
               <a class="sfBtn smlbtn-succ icon-save btncancelTemplateWeb" style="display:none;" ></a>
            </div>
            <div class="divCategoryPreview" style="display:none;">
               <div class="divCategoryPreview_preview">
                  <div id="ReporterCategoryListing" class="ReporterCategoryListing  clearfix">
                     <ul id="ReporterulCategory">
                     </ul>
                  </div>
               </div>
               <div class="sm-dropzone_mediainformation" style="display: none">
               </div>
               <div id="MediaDevice"></div>
               <div class="dropzone_mediainformation dropzone_mediainformation--information ">
                  <div class="sfFieldset mr-0" id="MediaPreviewSection">
                     <div class="formKey">
                        <span class="sfFormLabel">Details</span>
                     </div>
                     <div id="MediaPreview"></div>
                  </div>
                  <div class="sfFieldset sfFieldset--information">
                     <div class="formKey">
                        <span class="sfFormLabel">Source</span>
                     </div>
                     <div class="formValue">
                        <input type="text" class="sfInputbox" name="mediasource" id="txtSource">
                     </div>
                  </div>
                  <div class="sfFieldset sfFieldset--information">
                     <div class="formKey">
                        <span class="sfFormLabel">Description</span>
                     </div>
                     <div class="formValue">
                        <textarea id="txtDescription"></textarea>
                     </div>
                  </div>
                  <div class="sfFieldset sfFieldset--information">
                     <div class="formKey">
                        <span class="sfFormLabel">Caption</span>
                     </div>
                     <div class="formValue">
                        <textarea id="txtCaption"></textarea>
                     </div>
                  </div>
               </div>
            </div>
            <div class="sfFieldset cl-both">
               <span class="formKey textType in-block">
               <span class="sfFormLabel">External Url</span>
               </span>
               <span class="formValue in-block mt-0">
                  <div class="checkslider-btn">
                     <input type="checkbox" id="cbExturl" />
                     <label for="cbExturl">Url</label>
                  </div>
               </span>
               <div class="sfFieldset " id="divExternalUrl" style="display: none;">
                  <span class="checkslider-btn--value">
                  <input type="text" class="sfInputbox" id="txtExternalUrl" name="ExternalUrl">
                  </span>
               </div>
               <div class="sfError errorMsg errorMsgExtLink"></div>
            </div>
            <div class="sfFieldset ">
               <span class="formKey textType in-block">
               <span class="sfFormLabel">Custom Author(If the news has no author)</span>
               </span>
               <span class="formValue in-block mt-0">
                  <div class="checkslider-btn">
                     <input type="checkbox" id="cbreport" />
                     <label for="cbreport">Url</label>
                  </div>
               </span>
               <span class="formValue checkslider-btn--value">
               <input type="text" class="sfInputbox" id="txtCustomReport" style="display: none">
               </span>
            </div>
            <div class="sfFieldset " id="divAuthorSection">
               <div class="sfFieldset ">
                  <span class="formKey textType">
                  <span class="sfFormLabel">Author</span>
                  </span>
                  <span class="formValue ">
                  <input type="text" class="sfInputbox" id="txtAuthor">
                  </span>
               </div>
               <div class="sfFieldset divAddAuthor">
                  <span class="formKey textType in-block">
                  <span class="sfFormLabel">Add Author</span>
                  </span>
                  <span class="formValue in-block mt-0">
                     <div class="checkslider-btn">
                        <input type="checkbox" id="cbAddAuthor"  />
                        <label for="cbAddAuthor">Url</label>
                        <input type="text" class="sfInputbox" id="txtAddAuthor" style="display: none">
                     </div>
                  </span>
                  <div class="sfFieldset " id="divAssignAuthor">
                     <span class="formValue " id="AssignAuthor">
                     <select id="selectAuthor">
                     </select>
                     </span>
                      <div class="sfError errorMsg errorMsgauthor"></div>
                      <%--<input class="sfError errorMsg errorMsgauthor" name="errorMsgauthor" id="txtAuthorValidation" style="opacity: 0; width: 0px; height: 0px;" />--%>
                  </div>
                  <%--End of Author Section--%>
               </div>
            </div>
            <div class="sfFieldset " id="divAssignEditor">
               <span class="formKey textType">
               <span class="sfFormLabel">Assign Editor</span>
               </span>
               <span class="formValue " id="AssignEditor">
               <select id="selectEditor" name="selectEditor" >
               </select>
               </span>
               <div class="sfError errorMsg errorMsgeditor"></div>
            </div>
            <div class="sfFieldset ">
               <div class="formKey textType in-block">
                  <span class="sfFormLabel">Source</span>
               </div>
               <div class="formValue in-block mt-0">
                  <div class="checkslider-btn">
                     <input type="checkbox" id="chkNewsSource">
                     <label for="chkNewsSource"></label>
                  </div>
               </div>
               <div class="checkslider-btn--value">
                  <input type="text" name="NewsSource" id="txtArticleSource" style="display: none;" class="sfInputbox">
               </div>
            </div>
         </div>
      </div>
      <div class="main-right sfCol_40">
         <div class="activitywrap sfFormwrapper" id="divArticleActivity">
         </div>
      </div>
      <div class="sfButtonwrapper">            
         <span id="divEditActionButton" class="sfButtonwrapper mt-0">                    
         </span>
         <a class="sfBtn smlbtn-danger icon-cross" id="btnCancel">Cancel</a>
      </div>
   </div>
</div>
<div id="MainGrid" style="display: block;">
   <h2 class="box-title">News Management</h2>
   <div class="sfButtonwrapper sfButtonwrapper--right  mt-0">
      <a class="sfBtn smlbtn-primary icon-addnew" id="btnAddNewArticle">Add</a>
      <a class="sfBtn smlbtn-safe icon-selectall" id="btnSelectAll">Select all</a>
      <a class="sfBtn smlbtn-danger icon-delete" id="btnSelectDelete">Delete</a>
      <a id="btnOpenFilter" class="sfBtn smlbtn-default filter-btn icon-filter">Filter</a>
      <a id="btnFilterCloseActivity" style="display: none;"></a>
   </div>
   <div class="data-views clearfix">
      <div class="sfGridwrapper">
         <div id="divReporterFilter"></div>
         <div class="titleandfilter ">
            <!-- <h2>News</h2>  -->
            <div class="dashboard-filter">
               <a id="btnFilterClose" style="display: none;"></a>                    
            </div>
         </div>
         <div class="grid_header">
            <div class="grid_header--check"></div>
            <div class="grid_header--detail">Detail</div>
            <div class="grid_header--status">Status</div>
            <div class="grid_header--action">Action</div>
         </div>
         <div id="ArticleReporterList">                
         </div>
      </div>
      <div id="divReporterPg" class="sfPagination">
      </div>
   </div>
</div>