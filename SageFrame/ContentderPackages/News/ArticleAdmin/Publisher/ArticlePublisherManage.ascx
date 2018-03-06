<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticlePublisherManage.ascx.cs" Inherits="Modules_ArticleAdmin_EditorAdmin_ArticleEditorManage" %>
<h2 class="box-title">News Publisher</h2>

<div id="PublisherGrid">
    <div class="sfButtonwrapper sfButtonwrapper--right mt-0">
        <a id="btnOpenFilter" class="sfBtn smlbtn-default filter-btn icon-filter">Filter
        </a>
    </div>
    <div id="divEditorFilter">
    </div>
    <div class="data-views clearfix">
        <div class="sfGridwrapper">
            <div class="titleandfilter ">
                <div class="dashboard-filter">
                    <a id="btnCloseFilter" style="display: none"></a>
                    <%-- <span class="dashboard-sort">
                        <label class="label-sort">Sort by:</label>
                        <select class="selectpicker">
                            <option>All</option>
                            <option>Date</option>
                            <option>Most Viewed</option>
                        </select>
                    </span>--%>
                </div>
            </div>
            <div class="grid_header">
                <div class="grid_header--check"></div>
                <%--<div class="grid_header--sn">SN</div>--%>
                <div class="grid_header--detail">Detail</div>
                <div class="grid_header--status">Status</div>
                <div class="grid_header--action">Action</div>
            </div>
            <div id="divArtileList">
            </div>
        </div>
    </div>
    <div id="divArticlePg" class="sfPagination"></div>
</div>
<div id="PublisherForm" class="clearfix" style="display: none;position:relative">
     <a class="versionlog float-right sfBtnSml smlbtn-def icon-install">Version Log</a>
    <div id="ArticleVersionLog"></div>
    <a id="btnOpenActivityMsg" style="display: none"></a>
    <a id="btnCloseForm" style="display: none"></a>
    
    <div id="divLogMessageWrap" class="sfFormwrapper clearfix">
        <div class="sfFieldset ">
            <div class="formKey textType">
                <span class="sfFormLabel">Message*</span>
            </div>
            <div class="formValue">
                <textarea id="txtLogMessage" name="AtivityMessage" class="sfInputbox"></textarea>
            </div>
        </div>
        <div class="sfButtonwrapper">
            
            <a id="btnDoneEdit" class="sfBtn smlbtn-succ icon-plane">Submit</a>
        </div>
    </div>
    <div class="two-col-form">
        <div class="sfCol_70">
            <div class="sfFormwrapper sfFormwrapper sfFormwrapper--custom sfFormwrapper--check ">

                <div class="sfFieldset ">
                    <div class="formKey textType">
                        <span class="sfFormLabel">Title</span>
                    </div>
                    <div class="formValue">
                        <input name="NewsTitle" type="text" id="txtArticleTitle" class="sfInputbox" disabled="disabled">
                    </div>
                </div>
                <div class="sfFieldset ">
                    <div class="formKey textType">
                        <span class="sfFormLabel">Summary</span>
                    </div>
                    <div class="formValue">
                        <textarea name="NewsSummary" id="txtArticleSummary" disabled="disabled"></textarea>
                    </div>
                </div>

                <div class="sfFieldset ">
                    <div class="formKey textType in-block">
                        <span class="sfFormLabel">Details</span>
                    </div>
                </div>
                <%--<div class="sfFieldset ">
                   <iframe id="IfArticleViewDetails">

                    </iframe>
                </div>--%>
                <div class="sfFieldset ">
                    <div class="edit-area site-body" data-settings="">
                        <div id="ArticleViewDetails" class='editor-componentWrapper'>
                        </div>
                    </div>
                </div>
                <div class="sfButtonwrapper mt-0">
                    <span id="divEditActionButton"></span>
                    <a id="btnCancelArticle" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
                </div>
            </div>
        </div>
        <div class="sfCol_30 pl-30">
            <div class="sfFormwrapper sfFormwrapper--check">
                <div class="sfFieldset ">
                    <div class="activitywrap sfFormwrapper" id="divArticleActivity"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="normalPopup">
</div>
<div style="display: none" id="dhnDefaultTemplateEditDom" runat="server" clientidmode="Static" />
<div style="display: none" id="dhnDefaultTemplateRplcDom" runat="server" clientidmode="Static" />
<script type="text/javascript">
    $(function () {
        $('body').addClass('wb-exists');
        $(this).CreateArticlePublisher({
            userModuleID: ' <%=SageUserModuleID%>',
            roleID: '<%=roleID%>',
            siteID: '<%=GetSiteID%>'
        });
    });
</script>
