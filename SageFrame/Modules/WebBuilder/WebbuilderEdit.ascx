﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebbuilderEdit.ascx.cs" Inherits="Modules_WebBuilder_WebbuilderEdit" %>

<script>
    webBuilderUserModuleID = '<%=userModuleID%>';
    apiDataContainer = '';
    EditorMode = true;
    webBuilderPageExtension = '';
    portalDefaultPage = '<%=PortalDefaultPage%>';
    currentpageName = '<%=tempPageName%>';
    var webbuildermodulepath = '/modules/webbuilder';
    var component = {};
    var componentID = [];
    $(function () {
        if (typeof storedComponent !== "undefined") {
            $.each(storedComponent, function (i, v) {
                componentID.push(v.ComponentID);
                v = v.ComponentValue;
                var value = JSONParse(v);
                var key = value.componentname;
                component[key] = value;
            });
        }
        $(this).SageWebBuilder({
            userModuleID: webBuilderUserModuleID,
            enableHeader: '<%=enableHeader%>',
            tempPageName: '<%=tempPageName%>',
            pageExtension: webBuilderPageExtension,
            onlinestoreURL: '<%=OnlineStoreURL%>',
            digisphereURL: '<%=DigiSphereApi%>',
            isDeveloperMode: '<%=isDevelopmentMode%>',
            version: '<%=version%>'
        });
    });
</script>

<script type="text/javascript">
    $(function () {
        $(this).Feedback(
            {
                UserModuleID: '<%=userModuleID%>',
                CultureCode: '<%=GetCurrentCultureName%>'
            });
    });
</script>


<div class="WebBuilderWrapper">
    <div class="SettingsUpperBody" data-pull="online component">
        <span class="fa fa-close hideOverlay"></span>
        <div class="OnlineComponentList">
            <div class="filterWrapper">
                <input placeholder="Search components" id="onlinecomponentSearch" type="text" />
            </div>
            <div class="OnlineComponentListWrapper hide-options">
                <ul id="OnlineComponentListWrapper" class="sfCol_100">
                </ul>
            </div>
        </div>
    </div>
    <div class="SettingsUpperBody" data-pull="online help">
        <span class="fa fa-close hideOverlay"></span>
        <div class="OnlineComponentList">
            <div class="filterWrapper">
                <input placeholder="Search Help" id="onlineHelpSearch" type="text" />
            </div>
            <div class="sfCol_100">
                <ul class="youtubeList" id="youtubeList">
                </ul>
                <div id="loadmoreHelp">
                </div>
            </div>
        </div>
    </div>
    <div class="SettingsUpperBody" data-pull="online site">
        <span class="fa fa-close hideOverlay"></span>
        <div id="divSiteList" class="OnlineComponentList hide-options">
            <div class="filterWrapper">
                <div id="divSimpleSearch" class="simpleSearch">
                    <input placeholder="Search site" id="onlineSiteSearch" type="text" />
                    <a id="btnShowAdvance" class="" href="javascript:void(0);">Advanced Search</a>
                </div>
                <div id="divAdvSearch" class="advanceSearch" style="display: none;">
                    <div class="simplesearchback">
                        <a id="btnSiteCancel" class="" href="javascript:void(0);"><i class="fa fa-arrow-left"></i></a>
                    </div>
                    <div class="choose_businesssector searchTemp">
                        <label class="form_label">Sector</label>
                        <div class="form_control">
                            <select id='slcSectors' name='slcSectors' class='filter_select_dropdown'>
                                <option value='0'>Select a Sector</option>
                            </select>
                        </div>

                    </div>
                    <div class="site_category_select searchTemp disabled">
                        <label class="form_label">Category</label>
                        <div class="form_control">
                            <select id='slcSiteCategory' name='slcSiteCategory' class='filter_select_dropdown'>
                                <option value='0'>Select a Category</option>
                            </select>
                        </div>
                    </div>
                    <div class="site_business_select searchTemp disabled">
                        <label class="form_label">Business Type</label>
                        <div class="form_control">
                            <select id='slcBusinessType' name='slcBusinessType' class='filter_select_dropdown'>
                                <option value='0'>Select Business Type</option>
                            </select>
                        </div>
                    </div>
                    <div class="divBtn searchTemp">
                        <a id="btnSiteSearch" class="" href="javascript:void(0);"><i class="fa fa-search"></i></a>
                    </div>
                </div>
            </div>
            <div class="onlineSiteListWrapper">
                <div id="onlineSiteListWrapper" class="tempView">
                </div>
            </div>
        </div>

    </div>
    <div class="main-top-row">
        <ul class="top-bar-item-lists clearfix">
            <li class="builder-logo"><span>
                <asp:Image runat="server" ID="ltrEditorLogo" />
            </span>
            </li>
            <li>
                <span class="go-dashboard">
                    <a href="/Dashboard/dashboard" id="dashboardLink">Dashboard</a>
                </span>
            </li>
            <li><span class="dropOverlay headerControls" data-pull="online component">Online Components</span></li>
            <li><span class="dropOverlay headerControls" data-pull="online site">Online Sites</span></li>

            <li><span class="dropOverlay headerControls" data-pull="online help" id="Help">
                <%--<i class="fa fa-file-text-o" aria-hidden="true"></i>--%>
                Help</span></li>
            <li><span id="ExportWebsite" class="headerControls">
                <%--<i class="fa fa-external-link" aria-hidden="true"></i>--%>
                Export</span>
                <a id="downloadAnchorElem" class="hide-element"></a>
            </li>
            <li class="logout-site">
                <asp:LinkButton ID="lnkloginStatus" runat="server" Text="" OnClick="lnkloginStatus_Click"
                    EnableViewState="false" CssClass="sfBtnlogin logout-icon "></asp:LinkButton>
            </li>

            <li class="publish-site"><span id="btnPublishedWeb" class="btn-ui secondary-color-bg">Publish</span></li>
            <li class="save-site"><span id="SaveWeb" class="btn-ui primary-color-bg">Save</span></li>
            <li class="preview-site"><a href="onloaditcomes" id="previewURL" target="_blank" class="btn-ui">Preview</a></li>


            <%--FeedBack Button Yeta cha hai solta--%>
            <li class="publish-site">
                <span class="manage-page headerControls">
                    <button id="btnFeedback" type="button" class="sfBtn icon-addnew">FeedBack</button>
                </span>
            </li>

            <li class="manage-page-section">
                <div id="limanagepage" style="display: none;">
                    <span class="manage-page headerControls" id="managePagePanel">
                        <i class="fa fa-file-text-o" aria-hidden="true"></i>
                        Create Page</span>
                </div>

                <div id="limanageonepage" class="onepage-settings" data-type="">
                    <span class="manage-page headerControls" id="manageonePagePanel">
                        <i class="fa fa-window-maximize" aria-hidden="true"></i>
                        Manage Section</span>
                </div>
            </li>

        </ul>
        <div id="pageHandleHolder" class="pageHandleHolder" style="display: none;">
            <span>Temporary background color</span>
            <span class="color-picker-holder chooseColor" id="chooseBGcolor"></span>
            <div class="module-width clearfix">
                <span>Module Holder Width</span>
                <span class="value">
                    <div id="pageWidthSlider">
                        <div id="pageWidthHandle" class="ui-slider-handle">0</div>
                    </div>
                </span>
            </div>
        </div>
    </div>

    <!--Components and setting btns-->
    <div class="components">
        <span class="expand-compo-btn addComponent headerControls" data-title="Components"><i class="fa fa-th-large" aria-hidden="true"></i></span>
    </div>

    <!--Site settings-->
    <div class="site-settings-btn">
        <span class="expand-site-setting-btn sitesettings headerControls" data-title="Site Settings"><i class="fa fa-cog" aria-hidden="true"></i></span>
    </div>



    <div class="main-container  menu-collapse">
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
                    <div class="content-1 content-box builder-options-array moduleRemoval">
                        <div class="HeaderOption builder-options">
                            <h2>Set Layout</h2>
                            <div class="OptionItems">
                                <span>
                                    <i class="icon-icon-fullwidth"></i>
                                    <span class="itemname">Fullwidth</span>

                                    <span class="check">
                                        <input type="radio" id="full" name="one" checked="checked" class="layoutChange" data-layout="fullWidth" />
                                        <label for="full">
                                            <i class="icon-icon-check-circle"></i>
                                        </label>
                                    </span>
                                </span>
                                <span>
                                    <i class="icon-icon-boxedlayout"></i>
                                    <span class="itemname">Boxed Layout</span>
                                    <span class="check">
                                        <input type="radio" id="box" name="one" class="layoutChange" data-layout="boxed" />
                                        <label for="box"><i class="icon-icon-check-circle"></i></label>
                                    </span>
                                </span>
                                <span>
                                    <i class="icon-icon-leftlayout"></i>
                                    <span class="itemname">Left Layout</span>
                                    <span class="check">
                                        <input type="radio" id="leftlayout" name="one" class="layoutChange" data-layout="leftLayout" />
                                        <label for="leftlayout"><i class="icon-icon-check-circle"></i></label>
                                    </span>
                                </span>
                                <span>
                                    <i class="icon-icon-rightlayout"></i>
                                    <span class="itemname">Right Layout</span>
                                    <span class="check">
                                        <input type="radio" id="rightlayout" name="one" class="layoutChange" data-layout="rightLayout" />
                                        <label for="rightlayout"><i class="icon-icon-check-circle"></i></label>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="theme-color builder-options">
                            <h2>Set Theme Color</h2>
                            <div class="OptionItems" style="display: none;">
                                <div class="clearfix field-row " style="width: 100%">
                                    <span class="value" style="width: 100%">
                                        <label>Primary Colors</label>
                                        <span class="color-picker-holder chooseThemeColor" id="primaryColor"></span>
                                    </span>
                                </div>
                                <div class="clearfix field-row " style="width: 100%">
                                    <span class="value" style="width: 100%">
                                        <label>Secondary Colors</label>
                                        <span class="color-picker-holder chooseThemeColor" id="secondaryColor"></span>
                                    </span>
                                </div>
                                <div class="clearfix field-row " style="width: 100%">
                                    <span class="value" style="width: 100%">
                                        <label>Optional Colors</label>
                                        <span class="color-picker-holder chooseThemeColor" id="optionalColor"></span>
                                    </span>
                                </div>
                                <p>You can change your theme color</p>
                            </div>
                        </div>
                        <div class="theme-fonts builder-options">
                            <h2>Set Theme Font</h2>
                            <div class="OptionItems" style="display: none;">
                                <p>Choose fonts from below</p>
                                <select id="basicFonts">
                                </select>
                                <textarea id="fontPreview" class="ff-montserrat" placeholder="Almost before we knew it, we had left the ground."></textarea>
                            </div>
                        </div>



                        <span class="manage-body sfBtn smlbtn-succ" id="manageOnePagemenu">
                            <div class="field-row clearfix">
                                <label>Single Page Site</label>
                                <span class="value">
                                    <input id="chkOnePageMenu" type="checkbox" />
                                    <label for="chkOnePageMenu">
                                        <i class="icon-icon-tick"></i>
                                    </label>
                                </span>
                            </div>
                            <div class="field-row clearfix">
                                <label>Scroll to Top</label>
                                <span class="value">
                                    <input id="chkScrollToTopBox" type="checkbox" />
                                    <label for="chkScrollToTopBox">
                                        <i class="icon-icon-tick"></i>
                                    </label>
                                </span>
                            </div>
                            <div class="field-row clearfix">
                                <label>Set Site Under COnstruction</label>
                                <span class="value">
                                    <span id="chkUnderConstruction" class="checkboxlike" />
                                </span>
                            </div>


                            <div class="field-row clearfix" id="underConstructionNote" style="display: none;">
                                <p class="smallnote">To remove under construction you need to set any other page as  default page </p>
                            </div>
                            <span class="edit-const-page" id="btnEditUnderConstruction">Edit Under Construction Page
                            </span>
                            <div class="btm-btns">
                                <span class="manage-body sfBtn" id="manageBody">Body Settings
                                </span>
                                <span class="manage-body sfBtn" id="UpdateComponent">Update Component
                                </span>
                            </div>
                            <%--<div class="field-row clearfix">
                                <label>Enable Header</label>
                                <span class="value">
                                    <input id="chkEnableHeader" type="checkbox" checked="checked" />
                                    <label for="chkEnableHeader">
                                        <i class="icon-icon-tick"></i>
                                    </label>
                                </span>
                            </div>
                            <div class="field-row clearfix">
                                <label>Enable Footer</label>
                                <span class="value">
                                    <input id="chkEnableFooter" type="checkbox" checked="checked" />
                                    <label for="chkEnableFooter">
                                        <i class="icon-icon-tick"></i>
                                    </label>
                                </span>
                            </div>  --%>                          
                        </span>
                    </div>
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
                <div class="edit-area site-body f-weight-400 ff-montserrat" data-settings="<%=settings %>">
                    <asp:Literal runat="server" ID="ltrWebBuilderData"></asp:Literal>
                </div>
            </div>
        </div>
    </div>
    <div id="popupModel" class="popup-model ui-state-highlight" draggable="true" style="display: none; position: fixed; top: 0px; left: 0px;">
        <div class="popup-header">
            <i class="icon-icon-settings"></i>
            <span class="popup-title">Row Settings</span>
            <i class="icon-icon-close f-right close-model"></i>
        </div>
        <div class="popup-model-body">
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
    <ul id="innerPageList" class="eb-menu">
        <asp:Literal runat="server" ID="ltrPageList"></asp:Literal>
    </ul>
    <div id="WebBuilderWrapperClone" style="display: none;">
    </div>
</div>


<%--FeedBack Form Is Here--%>

<div id="divFeedbackForm" class="popup-model ui-state-highlight ui-draggable" draggable="true" style="display: none; position: fixed; top: 20%; left: auto; right: 30%; width: 280px;">
    <div class="popup-header">
        <i class="icon-icon-settings"></i>
        <span class="popup-title">Feedback Form</span>
        <i id="iconClose" class="icon-icon-close f-right close-model"></i>
    </div>
    <div>

        <table>

            <tr>
                <td>
                    <h1>
                        <label class="sfFormlabel">Feedback Category</label></h1>
                </td>
                <td>
                    <select id="slcFeedback">
                        <option value="1">Complement</option>
                        <option value="2">Something is not right.</option>
                        <option value="3">Not Good</option>
                    </select>
            </tr>

            <tr>
                <td>
                    <h1>
                        <label class="sfFormlabel">Title</label></h1>
                </td>
                <td>
                    <input type="text" id="txtTitle" name="Title" class="sfInputbox" /></td>
            </tr>

            <tr>
                <td>
                    <h1>
                        <label class="sormlabel">Description </label>
                    </h1>
                </td>
                <td>
                    <textarea id="txtDesc" rows="8" name="Description" cols="50" placeholder="Write your feedback here." class="sfInputbox"></textarea></td>
            </tr>

            <tr>
                <td></td>
                <td>
                    <button id="btnSubmit" type="button" class="sfBtn icon-save">Submit</button>
                    <button id="btnReset" type="button" class="sfBtn icon-close">Reset</button>
                </td>
            </tr>
        </table>
    </div>

</div>
<div>
    <button id="test">hello</button>
</div>

<%--FeedBack List--%>
<div id="divFeedbackList" class="sfFeedbackList">

    <div>
        <h3>Registered Feedbacks </h3>
    </div>

    <div id="divFeedbackListTableWrap" class="sfGridwrapper">
        <table>
            <thead>
                <tr>
                    <td>S.N</td>
                    <td>Name</td>
                    <td>EmailID</td>
                    <td>Category</td>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Domain</td>
                    <td>SentBy</td>
                    <td>Received on</td>
                    <td>Rating</td>
                </tr>
                <tr>
                    <td>Sort By</td>
                    <td>
                        <select id="sortName">
                            <option value="pleaseSelect">--Select Category--</option>
                            <option value="Name">Name</option>
                            <option value="date">Date</option>
                        </select>
                    </td>
                    <td>
                        <select id="sortOrder" style="display:none;">
                            <option value="keihoina">--Select Order--</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" id="keyword" name="Search" />
                        <button type="button" id="keyword_Submit">Submit</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <select id="pageSize">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>

                        </select>
                    </td>
                    <td>
                        StartDate:
                        <input type="date" id="startDate" />
                        EndDate:
                        <input type="date" id="endDate" />
                    </td>
                </tr>
            </thead>
            <tbody id="tbl_feedbacklist">
            </tbody>
        </table>
    </div>

</div>




<asp:Button runat="server" ID="btnExtractSite" OnClick="btnExtractSite_Click" Text="extracting soon" CssClass="hide-element exportsiteeasily" />