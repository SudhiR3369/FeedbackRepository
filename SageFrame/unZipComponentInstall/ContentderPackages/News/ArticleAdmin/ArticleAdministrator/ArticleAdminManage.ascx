<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ArticleAdminManage.ascx.cs" Inherits="Modules_ArticleAdmin_EditorAdmin_ArticleEditorManage" %>
<h2 class="box-title">News Admin</h2>

<div id="editorGrid">
    <div class="sfButtonwrapper sfButtonwrapper--right mt-0">
        <a id="btnAddNewArticle" class="sfBtn smlbtn-primary icon-addnew">Add</a>
        <%-- <a class="sfBtn smlbtn-safe icon-selectall" id="selectAll">Select all</a>
        <a class="sfBtn smlbtn-danger icon-delete" id="selectedDelete">Delete</a>--%>
        <a id="btnOpenFilter" class="sfBtn smlbtn-default filter-btn icon-filter">Filter
        </a>
        <a id="btnCloseForm" style="display: none"></a>
    </div>
    <div id="divEditorFilter">
    </div>
    <div class="data-views clearfix">
        <div class="sfGridwrapper">
            <div class="titleandfilter ">

                <div class="dashboard-filter">
                    <a id="btnCloseFilter" style="display: none"></a>
                    <span class="dashboard-sort">
                        <label class="label-sort">Sort by:</label>
                        <select class="selectpicker">
                            <option>All</option>
                            <option>Date</option>
                            <option>Most Viewed</option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="grid_header">
                <div class="grid_header--check"></div>
                <%--<div class="grid_header--sn">SN</div>--%>
                <div class="grid_header--detail">Detail</div>
                <div class="grid_header--status">Status</div>
                <div class="grid_header--action">Action</div>
            </div>
            <div id="divEditorArtileList">
            </div>
        </div>
    </div>
    <div id="divArticlePg" class="sfPagination"></div>
</div>


<div id="editorForm" class="clearfix" style="display: none; position: relative">
    <a class="versionlog float-right sfBtnSml smlbtn-def icon-install">Version Log</a>
    <div id="ArticleVersionLog"></div>
    <a id="btnOpenActivityMsg" style="display: none"></a>
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
                        <span class="sfFormLabel">Title*</span>
                    </div>
                    <div class="formValue">
                        <input name="NewsTitle" type="text" id="txtArticleTitle" class="sfInputbox">
                    </div>
                </div>
                <div class="sfFieldset ">
                    <div class="formKey textType">
                        <span class="sfFormLabel">Summary*</span>
                    </div>
                    <div class="formValue">
                        <textarea name="NewsSummary" id="txtArticleSummary"></textarea>
                    </div>
                </div>
                <div id="articleImageDefault" class="sfFieldset ">
                    <div class="formKey textType in-block">
                        <span class="sfFormLabel ">Default Image*</span>
                    </div>
                    <div class="formKey textType in-block float-right mt-neg5">
                        <a id="btnBrowseMedia" class="sfBtn smlbtn-primary float-right fa fa-folder-open-o">Browse</a>
                        <input type="text" style="opacity: 0; width: 0px; height: 0px;" name="ArticleImage" id="txtImageValidation" />
                    </div>
                    <div id="divArticleImages" class="formValue article-list-images">
                    </div>
                </div>
                <div class="sfFieldset ">
                    <div class="formKey textType">
                        <span class="sfFormLabel">Category*</span>
                    </div>
                    <div class="formValue ">
                        <input type="text" style="opacity: 0; width: 0px; height: 0px;" id="txtCategoryValidate" name="ArticleCategory" />
                        <ul id="articleCategoryList" class="threecolcheckbox">
                        </ul>
                    </div>
                </div>
                <div class="sfFieldset ">
                    <div class="formKey textType in-block">
                        <span class="sfFormLabel">Details*</span>
                    </div>
                    <div class="formKey textType in-block float-right mt-neg5">
                        <a id="btnChangeDtlTemp" class="sfBtn smlbtn-primary float-right fa fa-retweet">Change Template</a>
                    </div>
                </div>

                <!-- Webuilder Editor Start here -->
                <div id="divWebuilder" class="sfFieldset template-WebBuilder template-WebBuilder--editor">

                    <!--Components and setting btns-->
                    <div class="components">
                        <span class="expand-compo-btn addComponent headerControls" data-title="Components"><i class="fa fa-th-large" aria-hidden="true"></i></span>
                    </div>
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
                    <div id="wbNeededotherDom">
                        <div id="divVirtualQuoteDom" style="display: none">
                            <div class="editor-component documenteditor clearfix">
                                <div class="editor-component documenteditor clearfix">
                                    <div class="carrier-open-option">
                                        <i title="drag" class="icon-icon-drag sortComponent"></i>
                                        Text editor <i class="fa fa-bars"></i>
                                    </div>
                                    <div class="carries-options button-options hide-element">
                                        <i title="Text editor settings" class="row-setting com-settings" data-type="Text editor">Setting</i>
                                        <i title="delete" class="deletehelper">Delete</i>
                                    </div>
                                    <div class="documenteditorWrap" id="documenteditorWrapid">

                                        <div class="text-deitor-toolsbar text-align-left">
                                            <div class="display-flex" style="height: 100%; width: auto; flex-wrap: nowrap">
                                                <!--drag icon-->
                                                <span>
                                                    <span class="fa fa-arrows dragbutton" style="line-height: 35px;"></span>
                                                </span>
                                                <!--Bold-->
                                                <span class="tool-wrap editor-com-innerSpacing-left-5 editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-bold boldC" id="btnbold" title="bold"></button>
                                                </span>
                                                <!--Ends-->
                                                <!--Italic-->
                                                <span class="tool-wrap editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-italic italicC" id="btnItalic" title="italic"></button>
                                                </span>
                                                <!--Ends-->
                                                <!--Underline-->
                                                <span class="tool-wrap editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-underline underlineC" id="btnUnderLine" title="Underline"></button>
                                                </span>
                                                <!--Ends-->
                                                <!--Font Color-->
                                                <span class="tool-font-color editor-com-innerSpacing-right-5 editor-com-outerSpacing-top-0 editor-com-outerSpacing-right-5">

                                                    <span class="color-picker-holder DocEditorColorPicker doceditcolor" id="DocEditColorPic" style="background-color: black; height: 15px; width: 15px; border-radius: 50%; border: solid 1px rgba(255,255,255,.4); margin-top: 3px;"></span>
                                                </span>
                                                <!--Ends-->
                                                <!--font background-color-->
                                                <!--<span class="tool-font-color editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">-->
                                                <!--<i class="fa fa-paint-brush" aria-hidden="true"></i>-->
                                                <!--<span class="color-picker-holder DocEditorColorPicker doceditcolorBG" id="DocEditColorPicBG"></span>-->
                                                <!--</span>-->
                                                <!--Ends-->
                                                <!--Font-family-->
                                                <span class="tool-font-family editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5" style="width: 110px;">
                                                    <select class="cFontFamily" id="fontName"></select>
                                                </span>
                                                <!--Ends-->
                                                <!--Font-Weight-->
                                                <span class="tool-font-family f-weight editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <select class="cFontWeight" id="fontWeightEditor"></select>
                                                </span>
                                                <!--Ends-->

                                                <!--Font-Case-->
                                                <span class="tool-wrap transform-text has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">

                                                    <button type="button" class="tCase" id="textCases" title="Text cases">T<span>T</span></button>

                                                    <div class="toobar-drop-element fontcase">
                                                        <select class="cFontCase" id="fontCase">
                                                            <option title="none">None</option>
                                                            <option title="uppercase">uppercase</option>
                                                            <option title="lowercase">lowercase</option>
                                                            <option title="capitalize">capitalize</option>
                                                        </select>
                                                    </div>


                                                </span>
                                                <!--Ends-->

                                                <!--Cat Font Size-->
                                                <span class="tool-wrap font-size-text has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">

                                                    <button type="button" class="tCase" id="fontSizes" title="Font Sizes">A<span>a</span></button>

                                                    <div class="toobar-drop-element fontAddless" style="min-width: 94px;">
                                                        <span class="fa fa-minus minusC editor-com-outerSpacing-right-5" id="btnMinusFontSize" title="fontsize" style="border: none"></span>
                                                        <label id="fontValue" class="editor-com-outerSpacing-left-5 fontValueC">14px</label>
                                                        <span class="fa fa-plus plusC" id="btnPlusFontSize" title="fontsize"></span>
                                                    </div>

                                                </span>
                                                <!--Ends-->

                                                <!--category Text Aligns-->
                                                <span class="tool-wrap has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-align-left" id="AlignsPrnt" title="Text Aligns"></button>
                                                    <div class="toobar-drop-element" style="min-width: 112px;">
                                                        <div id="catAligns">
                                                            <span class="fa fa-align-left leftalignC" id="btnleftAlign" title="justifyleft"></span>
                                                            <span class="fa fa-align-center centeralignC" id="btnCenterAlign" title="justifycenter"></span>
                                                            <span class="fa fa-align-right rightalignC" id="btnRightAlign" title="justifyright"></span>
                                                            <span class="fa fa-align-justify fullalignC" id="btnFullAlign" title="justifyFull"></span>
                                                        </div>
                                                    </div>
                                                </span>
                                                <!--Ends-->

                                                <!--Line height-->
                                                <span class="tool-wrap line-height-text has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-text-height" id="lineHeight" title="line Height Text"></button>
                                                    <div class="toobar-drop-element">
                                                        <div id="LineHeightSize" class="LineHeightSizeC">
                                                            <div id="LineHeightSizeHandle" class="ui-slider-handle LineHeightSizeHandleC">0</div>
                                                        </div>
                                                    </div>

                                                </span>
                                                <!--Ends-->

                                                <!--Letter Space-->
                                                <span class="tool-wrap letter-space-text has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-text-width" id="letterSpace" title="letter Space Text"></button>
                                                    <div class="toobar-drop-element">
                                                        <div id="LetterSpaceSize" class="LetterSpaceSizec">
                                                            <div id="LetterSpaceSizeSizeHandle" class="ui-slider-handle LetterSpaceSizeSizeHandleC">0</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <!--Ends-->

                                                <!--Ul Li Lists-->
                                                <span class="tool-wrap has-drop-child editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-ellipsis-v listC" id="Lists" title="Listings"></button>
                                                    <div class="toobar-drop-element ul-li" style="min-width: 65px;">
                                                        <span class="fa fa-list-ul ullistC" id="ulList" title="insertunorderedlist"></span>
                                                        <span class="fa fa-list-ol ollistC" id="olList" title="insertorderedlist"></span>
                                                    </div>
                                                </span>

                                                <!--Quote-->
                                                <span class="tool-wrap editor-com-innerSpacing-right-5 editor-com-outerSpacing-right-5">
                                                    <button type="button" class="fa fa-quote-left formatblockC" id="btnformatblock" title="Block Quotes"></button>
                                                </span>
                                                <!--Ends-->

                                                <!--Links-->
                                                <span class="tool-wrap has-drop-child editor-com-innerSpacing-right-5">
                                                    <button type="button" class="fa fa-link btnlinkC" id="btnLink" title="Create link"></button>
                                                    <!--Drop down-->
                                                    <div id="dropElement" class="toobar-drop-element">
                                                        <input type="text" id="txtCreateLink" class="createlinkC" title="externalLink" required />

                                                        <select id="internalPages" title="InternalPagesLink" class="internalPagesC" style="display: none">
                                                            <option title="_self">Home</option>
                                                            <option title="_blank">About</option>
                                                        </select>

                                                        <select id="targetType" title="targetLink" class="targetTypeC">
                                                            <option title="_self">Same window</option>
                                                            <option title="_blank">New window tab</option>
                                                        </select>

                                                    </div>
                                                </span>
                                                <!--Ends-->

                                                <!--Links-->
                                                <span class="tool-wrap show-all editor-com-innerSpacing-left-5 editor-com-innerSpacing-right-5">
                                                    <button type="button" class="fa fa-plus alloptionC" id="btnAllOption"></button>
                                                    <!--Drop down-->
                                                </span>
                                                <!--Ends-->

                                            </div>
                                        </div>
                                        <div class="documenttext nobreak" contenteditable="true">
                                            <blockquote class="article-quote" style="letter-spacing: 0px; line-height: 20px; font-size: 14px;">
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
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
                    </div>
                </div>
                <!--webbuilder end here -->

                <%--<div class="sfFieldset ">
                    <div class="formKey textType in-block">
                        <span class="sfFormLabel">Source</span>
                    </div>
                    <div class="formValue in-block mt-0">
                        <div class="checkslider-btn">
                            <input type="checkbox" id="chkNewsSource" />
                            <label for="chkNewsSource"></label>
                        </div>

                    </div>
                    <span class="checkslider-btn--value">
                        <input type="text" name="NewsSource" id="txtArticleSource" style="display: none" class="sfInputbox">
                    </span>
                </div>--%>
                <div class="sfFieldset">
                    <div class="formKey">News State</div>
                    <div class="formValue">
                        <select name="slcArticleState" id="slcNewsState"></select>
                    </div>
                </div>

                <div class="sfButtonwrapper mt-0">
                    <a id="btnSaveArticle" class="sfBtn smlbtn-succ icon-save">Save</a>
                    <a id="btnCancelArticle" class="icon-cross sfBtn smlbtn-danger">Cancel</a>
                </div>
            </div>
        </div>
        <div class="sfCol_30 pl-30">
            <div class="sfFormwrapper sfFormwrapper--check">
                <div class="sfFieldset ">
                    <div class="formKey  textType">
                        <span class="sfFormLabel">Assign as</span>
                    </div>
                    <div class="formValue">
                        <ul id="lstAsignType" class="onecolcheckbox clearfix">
                        </ul>
                    </div>
                </div>
                <div class="sfFieldset textType">
                    <div class="formKey">
                        <span class="sfFormLabel">News Assets</span>
                    </div>
                    <div class="formValue">
                        <div id="divArticleAssets" class="articleAssets"></div>
                    </div>
                </div>
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
    var  webBuilderUserModuleID = '<%=SageUserModuleID%>';
    var siteID='<%=GetSiteID%>';
    currentpageName = '';
    var webbuildermodulepath = '/modules/webbuilder';
    var component = {};
    var componentID = [];
   
    $(function () {      
        $('body').addClass('wb-exists');
        $(this).ArticleAdminstrator({
            userModuleID:' <%=SageUserModuleID%>',
            roleID:'<%=roleID%>',
            siteID:'<%=GetSiteID%>'
        });       
    });
    function InvokeWebbuiilder(){
        $('#divWebuilder').SageWebBuilder({
            userModuleID: <%=SageUserModuleID%>,
            enableHeader: 'false',
            pageExtension: '', 
            siteID: 0,
            tempPageName:'',     
            isRowRequired:false,
            isDetailsTemp:true
        });     
    }  
  
</script>
