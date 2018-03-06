<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TemplateMangement.ascx.cs" Inherits="Modules_ArticleAdmin_ArticleTemplate_TemplateMangement" %>
<h2 class="box-title">Template Management</h2>
<div id="divTemplateTypes">
    <div class="pop-up-model">
        <div class="pop-up-containt">
            <h3>Choose the layout that best suits your post</h3>
            <div data-temptype="summary" class="templateTypes summary">
                <div class="tempImgWrap">
                    <div class="tempImgWrap_title">Summary</div>
                    <div class="tempbtn">
                        <a class="btn primary-btn ">View</a>
                    </div>
                </div>
                <div class="desc">
                    <p><span class="titleLayout">Summary Layout</span> is a simple news layout for displaying the news in a teaser form which shows image and a short description of the news. In this layout, only the date, title, image related to the news and a brief preview of the news is displayed in a paragraph. Click on the view button present in the center of the layout to view the full summary template. There are various action buttons available that allows you to customize the template by changing the position of each of the article components according to your need. </p>
                </div>
            </div>
            <div data-temptype="details" class="templateTypes details">
                <div class="tempImgWrap">
                    <div class="tempImgWrap_title">Detail</div>
                    <div class="tempbtn">
                        <a class="btn primary-btn ">View</a>
                    </div>
                </div>
                <div class="desc">
                    <p><span class="titleLayout">Detail Layout </span>is a plain news layout for displaying the full news and all the details related to the news. In this layout, all the details like date, title, author name, category of the article, complete news content and an image related to the news is displayed. Click on the view button present in the center of the layout to view the full detail template. There are various action buttons available that allows you to customize the template by changing the position of each of the article components according to your need.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="CompTempListWrap" style="display: none" class="template-list-wrap">
    <a data-newstype="summary" class="btnSwithNewsType btn primary-btn icon-addnew float-right"></a>
    <div id="divPreviewWrap" style="display: none" class="template-preview-wrap">
        <div class="pop-up-model">
            <div class="pop-up-containt">
                <div class="sfButtonwrapper">
                    <button type="button" class="btnAddTemplate icon-addNew btn green-btn ">Add</button>
                </div>
                <div id="divTemplatePreview"></div>
            </div>
        </div>
    </div>
    <div class="action-control-wrap clearfix">
        <div class="sfButtonwrapper mt-0">
            <button type="button" class="btnAddTemplate icon-addnew sfBtn smlbtn-succ ">Add</button>
        </div>
    </div>
    <div id="SmryTempList" style="display: none" class="template-list"></div>
    <div id="dtlsTemplateList" style="display: none" class="template-list">
    </div>
    <div id="divTemplatePg" class="sfPagination"></div>
</div>
<div id="templateBuilder" style="display: none">
    <div class="template-WebBuilder  template-WebBuilder--editor">
        <div id="divTemplateForm">
            <div class="sfFormwrapper ">
                <span class="sfFieldset">
                    <span class="formKey textType">
                        <span class="sfFormlabel">Template Title</span>
                    </span>
                    <span class="formValue">
                        <input type="text" name="templateName" id="txtTemplateTitle" class="sfTextbox" />
                    </span>
                </span>
                <span class="sfFieldset" style="display:none">
                    <span class="formKey selectKey">
                        <span class="sfFormlabel">Category</span>
                    </span>
                    <span class="formValue">
                        <select id="slcTempCategory">
                            <option value="0">For All</option>
                        </select>
                    </span>
                </span>
            </div>
            <div class="sfButtonwrapper ">
                <a id="SaveTemplateWeb" class="icon-save sfBtn smlbtn-succ ">Save</a>
                <%--<a class="btncancelTemplateWeb icon-cross sfBtn smlbtn-danger">Cancel</a>
                <a style="display: none" id="btnSaveExitTemplateWeb" class="icon-save btn green-btn ">Save & Exit</a>--%>
            </div>
        </div>
        <div id="divTemplateEditor">
            <div class="action-control-wrap clearfix">
                <input type="hidden" id="hdnTemplateID" value="0" />
                <div id="templateLayout" class="template-type">
                    <div class="sfRowfilter sfSorting mt-0">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <span class="sfformlabel">Layout</span>
                            </span>
                            <span class="formValue">
                                <span class="sfRadiobutton sfRadioHidden">
                                    <input id="rdonormalType" value="normal" class="layoutType" type="radio" checked="checked" name="templateLayoutType" />
                                    <label for="rdonormalType">Normal</label>
                                    <input type="radio" id="rdoSidebr" class="layoutType" value="sidebar" name="templateLayoutType" />
                                    <label for="rdoSidebr">Sidebar</label>

                                </span>
                            </span>
                        </div>
                    </div>



                </div>
            </div>
            <!--Components and setting btns-->
            <div class="components">
                <span class="expand-compo-btn addComponent headerControls" data-title="Components"><i class="fa fa-th-large" aria-hidden="true"></i></span>
            </div>
            <!--Site settings-->
            <%--  <div class="site-settings-btn">
        <span class="expand-site-setting-btn sitesettings headerControls" data-title="Site Settings"><i class="fa fa-cog" aria-hidden="true"></i></span>
    </div>--%>

            <div class="main-container-internal  menu-collapse">
                <div class="main-left" style="display: none;">
                    <div class="dragComponentSettings">
                        <h1>
                            <i class="fa fa-arrows" aria-hidden="true"></i>
                            <span class="dragHeader">Component list</span>
                        </h1>
                        <div class="collapse heademarControls">
                            <i class="fa fa-close "></i>
                        </div>
                    </div>
                    <section class="tabs" id="sidebarcontrol">
                        <input id="tab-1" type="radio" name="radio-set" class="moduleHidden tab-selector-1 tab-theme hide-element" checked="checked" />
                        <label for="tab-1" class="tab-label-1 moduleHidden hide-element"><i class="icon-icon-theme"></i></label>
                        <input id="tab-3" type="radio" name="radio-set" class=" moduleHidden tab-selector-3 tab-components hide-element" />
                        <label for="tab-3" class="moduleHidden tab-label-1 hide-element"><i class="icon-icon-component"></i></label>
                        <div class="clear-shadow"></div>
                        <div class="content">

                            <div class="content-3 content-box" id="componentCollection">
                                <span class="module-search">
                                    <input type="text" placeholder="Search components" id="componentSearch" />
                                    <i class="fa fa-refresh" id="refreshComSearch"></i>
                                </span>
                                <div class="components-list-array">
                                    <div class="Layout components-list" style="display: none;">
                                        <h4>Basic Layouts</h4>
                                        <div class="comItems">
                                        </div>
                                    </div>
                                    <div class="basic components-list" style="display: none;">
                                        <h4>Basic Components</h4>
                                        <div class="comItems">
                                        </div>
                                    </div>
                                    <div class="advance components-list" style="display: none;">
                                        <h4>Advanced Components</h4>
                                        <div class="comItems">
                                        </div>
                                    </div>
                                    <div class="pro components-list" style="display: none;">
                                        <h4>Pro Components</h4>
                                        <div class="comItems">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <div class="main-right">
                    <div class="editor-box">
                        <div class="editor-box-heading">
                            <div class="window-options">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div class="editor-wrap">
                            <div id="TemplateEditorBody" class="clearfix edit-area site-body f-weight-400 ff-montserrat" data-settings="<%=settings %>">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="popupModel" class="popup-model ui-state-highlight" style="display: none;">
                <div class="popup-header">
                    <i class="icon-icon-settings"></i>
                    <span class="popup-title">Row Settings</span>
                    <i class="icon-icon-close f-right close-model"></i>
                </div>
                <div class="popup-model-body">
                </div>
            </div>

        </div>
    </div>
    <div class="sfButtonwrapper float-left">
        <a id="btnOpenForm" style="display: none"></a>
        <a id="btnCloseForm" style="display: none"></a>
        <a id="btnDoneEditing" class="icon-next sfBtn smlbtn-succ ">Next</a>
        <a class="btncancelTemplateWeb icon-cross sfBtn smlbtn-danger">Cancel</a>
    </div>
</div>
<div id="simplePopupModel" class="simple-popup-model" style="display: none; position: absolute; top: 0px; left: 0px;">
    <div class="simple-popup-header">
        <span class="simple-popup-title">Row Settings</span>
        <i class="icon-icon-close f-right simple-close-model"></i>
    </div>
    <div class="simple-popup-model-body">
    </div>
</div>




<div class="resueabledata" style="display: none;">
    <ul id="fontIconCollection">
        <asp:Literal runat="server" ID="ltrFontFamily"></asp:Literal>
    </ul>

    <div id="WebBuilderWrapperClone" style="display: none;"></div>
    <div id="WebBuilderDataFrameDom" style="display: none;"></div>
</div>
<div id="divHiddenColDom" style="display: none">
    <div class="editor-row sfCol_100 clearfix template-comp-wrapper">
        <div class="colWrapper sfCol_100">
            <div class="temp-col-main editor-col ui-state-default text-align-center sfFixed editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35 ui-sortable ui-droppable sfCol_100">
                <div class="carrier-open-option">Col<i class="fa fa-bars"></i></div>
                <div class="hide-element  carries-options col-options">
                    <i class="com-settings" title="Col settings" data-type="column">Settings</i>
                </div>
                <div class="column-data-empty">
                    <h4>This is Column</h4>
                    <p>You can Drag and drop Components here</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="normalPopup">
</div>
<asp:DropDownList style="display:none" ID="ddlhdnAdvSizes" runat="server" ClientIDMode="Static"></asp:DropDownList>
<script type="text/javascript">
    var  webBuilderUserModuleID = '<%=SageUserModuleID%>';
    currentpageName = '';
    var webbuildermodulepath = '/modules/webbuilder';
    var component = {};
    var componentID = [];
    $(function(){
        $('#divTemplateForm').createSideBarForm({
            title: 'Template Information',
            openButton: $('#btnOpenForm'),
            closeButton:$('#btnCloseForm'),
        });
        $('body').addClass('wb-exists');
        //if (typeof storedComponent !== "undefined") {
        //    $.each(storedComponent, function (i, v) {     
        //        v = v.ComponentValue;
        //        var value = JSONParse(v);
        //        var key = value.componentname;             
        //        component[key] = value;
        //    });
        //}
        <%--$(this).SageWebBuilder({
            userModuleID: <%=SageUserModuleID%>,
            enableHeader: 'false',
            pageExtension: '', 
            siteID: 0,
            tempPageName:'',            
        });   --%>  
        $(this).TemplateManger({
            userModuleID:'<%=SageUserModuleID%>',
            siteID:'<%=GetSiteID%>',
        });
        
    });
    function InvokeWebbuiilder(isDetailsTemp){
        $('#divTemplateEditor').SageWebBuilder({
            userModuleID: <%=SageUserModuleID%>,
            enableHeader: 'false',
            pageExtension: '', 
            siteID: 0,
            tempPageName:'',     
            isRowRequired:false,
            isDetailsTemp:isDetailsTemp
        });     
    }  
</script>
