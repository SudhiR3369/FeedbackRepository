(function ($) {
    $.ReporterManagement = function (p) {
        var validator;
        p = $.extend
                ({
                    CultureCode: '',
                    UserModuleID: '1',
                    mediaType: "*",
                    roleID: '',
                    siteID: 0,
                }, p);
        var ReporterManagement = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                categoryList: "",
                ajaxCallMode: 0,
                arr: [],
                arrImageInfo: [],
                CategoryArr: [],
                MediaListArr: [],
                categoryArrs: [],
                collectAuthor: "",
                categoryid: "",
                filtercategory: "",
                ResponseFileName: "",
                ActiveMediaFileName: "",
                FileNameLists: "",                
                ExternalLinksArr: '',
                MediaListAfterEdit: "",
                baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/ReporterAdmin/WebServices/ReporterManagementWebservices.asmx/',
                Path: SageFrameAppPath + '/Modules/ArticleAdmin/',
                filepath: '/Modules/ArticleAdmin/ReporterAdmin/Media',
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                UserModuleID: p.UserModuleID,
                SecureToken: SageFrameSecureToken,
                ArticleID: 0,
                StateID: 0,
                State: '',
                offset: 0,
                limit: 20,
                Currentpage: 0,
                Operation: '',
                BackInputState: '',
                ForwardState: '',
                buttonclickname: '',
                outStateID: '',
            },
            FilterInfo: {
                Keywords: '',
                CategoryIDs: '',
                ArticleTypeIDs: '',
                Location: '',
                Reporter: '',
                Editor: '',
                StateIDs: 0,
                DateFrom: '',
                DateTo: ''
            },
            ObjAuth: {
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                UserModuleID: p.UserModuleID,
                SecureToken: SageFrameSecureToken
            },
            init: function () {
                if (CurrentWorkFlow.length > 0) {
                    ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                    ReporterManagement.ReporterControl();
                    $('#divReporterFilter').createCommonArticleFilter({
                        openButton: $('#btnOpenFilter'),
                        closeButton: $('#btnFilterClose'),
                        filterFor: 'reporter',
                        userModuleID: p.UserModuleID,
                        siteID: p.siteID,
                        roleID: p.roleID,
                        searchCall: ReporterManagement.FilterSearchClick,
                        resetCall: ReporterManagement.FilterResetClick,
                    });
                    $('#ReporterRemarks').createSideBarForm({
                        title: 'Activity Remarks',
                        openButton: $('#btnOpenActivityMsg'),                        
                        closeButton: $('#btnFilterCloseActivity'),
                    });
                   
                    $('#btnActivityRemarksDone').off().on('click', function () {
                        if (validator.form()) {                            
                               ReporterManagement.AddReporterNewsData();
                        }
                    });
                    ReporterManagement.GetCategory();
                    ReporterManagement.GetUserIdByUsername();
                    ReporterManagement.GetAuthorList();
                    ReporterManagement.GetEditorList();
                    //ReporterManagement.GetArticleEntryType();
                }
                else {
                    SageFrame.messaging.show("Current user role is not assign in workflow. So you cannot use article draft feature", "Alert");
                    $('#MainGrid').html('<h2>News Management</h2>');
                }
            },
            FilterSearchClick: function (objValue) {
                ReporterManagement.FilterInfo = objValue;
                //console.log(ReporterManagement.FilterInfo);
                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);

            },
            FilterResetClick: function (objValue) {
                //console.log(objValue);                
                ReporterManagement.FilterInfo = objValue;
                // console.log(ReporterManagement.FilterInfo);
                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
            },                        
            ReporterControl: function () {
                var $cmbType = '';
                $('#btnMediaManagement').off('click').on('click', function () {
                    (function () {
                        $('#btnMediaManagement').SageMedia({
                            userModuleID: p.UserModuleID,
                            onSelect: function (src, response, type, filename, extension) {
                                ReporterManagement.FileUploaded(src, response, type, filename, extension)
                            },
                            mediaType: 'image,document'
                        });
                    })()
                    //    setTimeout(function () { $('.PopupContent').css('top', $('#btnMediaManagement').offset().top-50) }, 80);

                });
                $('#btnAddNewArticle').off('click').on('click', function () {
                    ReporterManagement.ManageDynamicBtn(1);//draft
                    ReporterManagement.config.ArticleID = 0;

                    $('#MainGrid').hide();
                    $('#MainForm').show();
                    $('.divCategoryPreview').hide();
                    //ReporterManagement.GetCategory();
                    //ReporterManagement.GetUserIdByUsername();
                    //ReporterManagement.GetAuthorList();
                    //ReporterManagement.GetEditorList();
                    //ReporterManagement.GetArticleEntryType();                    
                    $('#divArticleActivity').html('');
                    $('#ReporterulCategory').html('');
                    $('#MediaPreview').html('');
                    $('.versionlog').hide();
                    $('#divAssignAuthor').hide();
                    $('#selectAuthor').val('');

                    var $select = $("#selectAuthor").selectize();
                    var selectize = $select[0].selectize;
                    var defaultValueIds = '';
                    selectize.setValue(defaultValueIds);

                    $('input[type="text"]').not('.viewtext').val('');
                    //$('#MainStatePreview>input:text:not(".viewtext').val('');
                    $('textarea').not('.viewtext').val('');
                    $('#txtAuthor').val(SageFrameUserName);                    
                });
                $('#btnSelectAll').off('click').on('click', function () {
                    var checkData = $(this).data();
                    var checkBoxesValue = $("input[name='cBoxReporter']");
                    checkBoxesValue.prop("checked", !checkData.checked);
                    checkData.checked = !checkData.checked;
                });                
                $('#btnSelectDelete').off('click').on('click', function () {
                    var checkedData = $("input[name='cBoxReporter']:checked").map(function () {
                        return this.value;
                    }).get();
                    if (checkedData.length > 0) {
                        SageConfirmDialog('Do you want to delete selected News?').done(function () {
                            var delidxml = '';
                            $(checkedData).each(function (i, v) {
                                delidxml += '<article><id>' + v + '</id></article>';
                            });
                            ReporterManagement.DeleteReporterNewsByID(delidxml);
                        });
                    }
                    else {
                        SageFrame.messaging.show("Please Select News To Delete", "Error");
                    }
                });                
                $('.rTitle').show();
                $('.rSummary').show();
                $('.rDetail').show();
                $('.rOpinionBy').hide();               
                $('#cbquotes').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#txtQuotation').css('display', 'block');
                    }
                    else {
                        $('#txtQuotation').css('display', 'none');
                    }
                });
                $('#cbExturl').on('click', function () {
                    var html = '';
                    if ($(this).is(':checked')) {
                        var $this = $(this);
                        $('#divExternalUrl').css('display', 'block');
                    }
                    else {
                        $('#divExternalUrl').css('display', 'none');
                    }
                });
                $('#chkNewsSource').on('click', function () {
                    var html = '';
                    if ($(this).is(':checked')) {
                        var $this = $(this);
                        $('#txtArticleSource').show();
                    }
                    else {
                        $('#txtArticleSource').val('');
                        $('#txtArticleSource').hide();
                    }
                });
                ReporterManagement.CheckExtLink();
                $('#cbreport').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#txtCustomReport').css('display', 'inline-block');
                        $('#divAuthorSection').css('display', 'none');
                    }
                    else {
                        $('#txtCustomReport').css('display', 'none');
                        $('#divAuthorSection').css('display', 'block');
                    }
                });                
                if ($('#cbAddAuthor').is(':checked')) {
                    $('#divAssignAuthor').show();
                }
                else { $('#divAssignAuthor').hide(); }
                $('#cbAddAuthor').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#divAssignAuthor').show();
                    }
                    else {
                        $('#divAssignAuthor').hide();
                    }
                });
                $('#txtAuthor').val(SageFrameUserName);
                $('#txtAuthor').prop("readonly", true);
                $('#selectEditor').off().on('change', function () {
                    var $this = $(this);
                    if ($this.val() == "0") {
                        $('.errorMsgeditor').html('* Required');
                    }
                    else {
                        $('.errorMsgeditor').html('');
                    }
                });
                $('#btnCancel').off().on('click', function () {
                    ReporterManagement.ResetValues();                   
                });
            },
            CheckExtLink: function () {
                $('#txtExternalUrl').selectize({
                    plugins: ['remove_button'],
                    delimiter: ',',
                    persist: false,
                    create: function (input) {
                        if (input != null) {
                            if (ytVidId(input) !== false) {
                                input = input.replace('watch?v=', 'embed/');
                                $('#txtExternalUrl').val(input);
                                ReporterManagement.config.ExternalLinksArr = input + ',' + ReporterManagement.config.ExternalLinksArr;
                                $('.errorMsgExtLink').html('');
                            }
                            else {                                
                                $('.errorMsgExtLink').html('Please enter valid url in format: https://www.youtube.com .')
                                $('#txtExternalUrl').val('');
                                return 1;
                            }
                        }
                        function ytVidId(v) {
                            var p = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
                            return (v.match(p)) ? RegExp.$1 : false;
                        }
                        return {
                            value: input,
                            text: input
                        }
                    }
                });
            },
            CollectionBeforeSave: function () {
                var Errmessage = '';
                var value = 0;
                ReporterManagement.config.categoryid = '';
                ReporterManagement.config.collectAuthor = '';                
                ReporterManagement.config.ExternalLinksArr = '';
                ReporterManagement.config.MediaListArr = ReporterManagement.getAllMediaInfo();                
                
                if ($('#cbquotes').is(':checked') && $('#txtQuotation').val() == '') {
                    Errmessage += 'Please enter Quotation or check off Add Quotation';
                    value = 1;
                }                
                var checkedData = $("input[name='cBoxcategory']:checked").map(function () {
                    return this.value;
                }).get();
                if (checkedData.length > 0) {
                    $(checkedData).each(function (i, v) {
                        ReporterManagement.config.categoryid = v + ',' + ReporterManagement.config.categoryid;
                    });
                    $('.errorMsgcatgory').html('');
                }
                else {                    
                    $('.errorMsgcatgory').html('* Required');
                    value = 1;                   
                }
                if (ReporterManagement.config.MediaListArr.length == 0) {
                    $('.errorMsgMedia').html('* Required');
                    value = 1;
                }
                else { $('.errorMsgMedia').html(''); }
                if ($('#cbExturl').is(':checked') && $('#txtExternalUrl').val() == '') {                    
                    $('.errorMsgExtLink').html('* Required');
                    value = 1;
                }
                else {
                    ReporterManagement.CheckExtLink();
                    var extLink = new Array();
                    extLink = $('#txtExternalUrl').val().split(',');
                    $(extLink).each(function (index, item) {
                        ReporterManagement.config.ExternalLinksArr = item + ',' + ReporterManagement.config.ExternalLinksArr;
                    });
                    $('.errorMsgExtLink').html('');
                }                
                if ($('#cbreport').is(':checked') && $('#txtCustomReport').val() == '') {
                    Errmessage += 'Please enter Custom Report or check off Custom Report';
                    value = 1;
                } 
                if ($('#cbAddAuthor').is(':checked') && $('#selectAuthor').val() == null) {
                    $('.errorMsgauthor').html('* Required');
                    value = 1;
                }
                else if ($('#cbAddAuthor').is(':checked') == false) {
                    ReporterManagement.config.collectAuthor = $('#txtAuthor').attr('data-userid') + ',';
                    $('.errorMsgauthor').html('');
                }
                else {
                    var AuthorList = $('#selectAuthor').val();
                    $(AuthorList).each(function (index, item) {
                        ReporterManagement.config.collectAuthor = item + ',' + ReporterManagement.config.collectAuthor;
                    });
                    ReporterManagement.config.collectAuthor = $('#txtAuthor').attr('data-userid') + ',' + ReporterManagement.config.collectAuthor;
                    $('.errorMsgauthor').html('');
                }                
                if ($('#selectEditor  option:selected').val() == 0) {                    
                    $('.errorMsgeditor').html('* Required');
                    value = 1;
                }
                else {
                    $('.errorMsgeditor').html('');
                }
                
                if ($('input[type="text"]').val().match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/)) {
                    SageFrame.messaging.show("Please enter valid text", "Alert");
                }
                if (Errmessage != '') {
                    SageFrame.messaging.show(Errmessage, "Alert");
                }
                return value;
            },            
            GetAllDataIntoGrid: function (offset, limit, current) {
                ReporterManagement.config.offset = current * limit;
                ReporterManagement.config.Currentpage = current;
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAllDataIntoGrid";
                ReporterManagement.config.data = JSON2.stringify({
                    OffSet: ReporterManagement.config.offset,
                    Limit: ReporterManagement.config.limit,
                    ObjInfo: ReporterManagement.FilterInfo,
                    AddedBy: SageFrameUserName,
                    RoleID: p.roleID,
                    SiteID: p.siteID,
                });
                ReporterManagement.config.ajaxCallMode = 6;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            BindGridData: function (data) {
                var Lstdata = data.d;
                var TotalRow;
                var html = '';
                if (Lstdata.length > 0) {
                    TotalRow = data.d[0].TotalRow;

                    $.each(Lstdata, function (index, item) {                        
                        html += '<div class="grid_listing clearfix ">';
                        html += '<div class="grid_summary">';
                        html += '<div class="grid_selectors">';
                        if (item.StateID == 1) {
                            html += '<input type="checkbox" name="cBoxReporter" value="' + item.ArticleID + '">';
                        }
                        else {
                            html += '<input type="checkbox" disabled>';
                        }
                        html += '<label></label></div>';
                        html += '<div class="grid_summary_detail">';
                        html += '<div class="grid_detail_title grid_detail_title--large ">';
                        html += item.Title;
                        html += '</div>';

                        html += '<div class="grid_detail_newsfeature">';
                        html += '<small class="grid_detail_newsfeature_type"><strong>Type : </strong>' + item.EntryType + '</small>';                        
                        html += '<small class="grid_detail_newsfeature_editor"><strong>Editor : </strong>' + ArticleSetting.ChangeAuthorNameFormat(item.Editor) + '</small>';//item.AssignTo
                        html += '</div>';
                        html += '<div class="grid_detail_newsproperties">';
                        if (item.IsCustomReport == 0) {
                            html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>' + ArticleSetting.ChangeAuthorNameFormat(item.Author) + '</small>';
                        }
                        else {
                            html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>' + item.CustomReport + '</small>';
                        }                        
                        html += '<small class="grid_detail_newsproperties_reporter_date"><i class="fa fa-calendar"></i>' + ArticleSetting.ChangeDateFormat(item.AddedOn) + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_category"><strong>Category:</strong>' + item.CategoryName + '</small>';
                        html += '</div>';
                        html += '</div>';//grid_summary_detail

                        html += '<div class="grid_status" data-stateid=' + item.StateID + '><span class="statusnews ' + item.StateClass + '">' + item.State + '</span></div>';

                        html += '<div class="grid_action">';
                        html += '<div id="actions" class="actiononClickShow" style="display: none; ">';
                        html += '<div class="actiononClickShowInfo">';                        
                        if (item.StateID == 1) {
                            html += '<p><a id="editReporter-' + item.ArticleID + '" data-stateid=' + item.StateID + ' href="Javascript:void(0)" class="edit">Edit</a>';//Javascript:void(0)
                            html += '<a id="deleteRole-' + item.ArticleID + '" data-stateid=' + item.StateID + ' href="Javascript:void(0)" class="delete">Delete</a></p>';//Javascript:void(0)
                        }
                        else {
                            html += '<p><a id="editReporter-' + item.ArticleID + '" href="Javascript:void(0)" class="view">View</a>';
                            html += '</p>';
                        }
                        html += '</div></div>';

                        html += '<p class="actionclass actionLinkClass" id="actionLink">';
                        html += '<a href="Javascript:void(0)"><i class="fa fa-ellipsis-v"></i></a>';
                        html += '</p>';

                        html += '</div>';//grid_action
                        html += '</div>';
                        html += '</div>';
                    });
                }
                else {
                    html = '<div class="noData text-align-center"><h3> No data to display<h3></div>';
                }
               
                $('#ArticleReporterList').html(html);
                
                ReporterManagement.BindRepPagination(TotalRow);
                ReporterManagement.ActionLinkAction();
                ReporterManagement.onActionClick();
            },
            BindRepPagination: function (totalItem) {                
                if (totalItem > ReporterManagement.config.limit) {
                    $('#divReporterPg').show().pagination(totalItem, {
                        items_per_page: ReporterManagement.config.limit,
                        current_page: ReporterManagement.config.Currentpage,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: ReporterManagement.GetAllDataIntoGrid,
                            limit: ReporterManagement.config.limit,
                        },
                        
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#divReporterPg').hide();
                }
            },
            ActionLinkAction: function () {
                $('.actionLinkClass').off().on('click', function () {
                    var $this = $(this);
                    $this.parent().find('.actiononClickShow').css('display', 'block');
                });
                //$('#MainGrid').off().on('click', '.edit', function () {
                $('.edit').off().on('click',function(){
                    var $this = $(this);
                    CommonGetNews($this);
                    $('#btnCancel').text('Cancel');
                });
                $('#MainGrid').off().on('click', '.view', function () {
                    var $this = $(this);
                    CommonGetNews($this);
                    $('#btnCancel').text('Close');
                });
                function CommonGetNews($this)
                {
                    ArticleID = $this.prop('id').split('-')[1];                   
                    ReporterManagement.GetReporterNewsByID(ArticleID);                    
                }
                $('.delete').off().on('click', function () {
                    var $this = $(this);
                    var ID = $this.prop('id').split('-')[1];
                    delidxml = '<article><id>' + ID + '</id></article>';
                    SageConfirmDialog('Do you want to delete selected News?').done(function (response) {
                        ReporterManagement.DeleteReporterNewsByID(delidxml);
                    });
                });
            },
            onActionClick: function () {
                $("#ArticleReporterList").off().on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });
                $("#ArticleReporterList div").not(".actionclass").off().on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },           
            GetReporterNewsByID: function (ArticleID) {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAllDataByID";
                ReporterManagement.config.data = JSON2.stringify({
                    objAuth: ReporterManagement.ObjAuth,
                    ArticleID: ArticleID,
                });
                ReporterManagement.config.ajaxCallMode = 9;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            DeleteReporterNewsByID: function (ID) {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "DeleteReporterNewsByID";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    ArticleIDs: ID,
                });
                ReporterManagement.config.ajaxCallMode = 10;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            BindFormByID: function (data) {
                $('#MainForm').css('display', 'block');
                $('#MainGrid').css('display', 'none');
                data = data.d;
                data = JSON.parse(data);
                
                var Article = data.Article[0];
                var ArticleMedia = data.ArticleMedia;
                var ArticleCategory = data.ArticleCategory;
                var ArticleAuthor = data.ArticleAuthor;
                var ArticleExternalUrls = data.ArticleExternalUrls;
                ReporterManagement.config.ArticleID = Article.ArticleID;

                ReporterManagement.ManageDynamicBtn(Article.StateID);
                ReporterManagement.config.State = Article.State;
                if (Article.StateID != 1) {
                    $('#MainStatePreview').show();
                    $('#MainStatePreview').addClass('activeFormReporter');                    
                    $('#MainGrid').hide();
                    if (Article.OpinionBy != '') {
                        $('#txtOpinionByV').val(Article.OpinionBy);
                        $('.rOpinionBy').show();
                    }
                    else {
                        $('#txtOpinionByV').val('');
                        $('.rOpinionBy').hide();
                    }
                                                                       
                    $('.divInputEvent').hide();
                }                
                if (Article.ArticleEntryType == '1') {
                    $('.rTitle').show();
                    $('.rSummary').show();
                    $('.rDetail').show();
                    $('.rOpinionBy').hide();                     
                    $('.divAddAuthor').show();
                }                
                $('#txtTitle').val(Article.Title);
                $('#txtSummary').val(Article.Summary);
                $('#txtOpinionBy').val(Article.OpinionBy);
                $('#txtDetail').val(Article.Detail);
                $('#txtTitleV').val(Article.Title);
                $('#txtSummaryV').val(Article.Summary);
                if (Article.DetailsViewDOM == null) {
                    $('#txtDetailV').val(Article.Detail);
                    $('#divDetailV').hide();
                }
                else {
                    $('#divDetailV').html(Article.DetailsViewDOM);
                    $('#divDetailV').html($('#divDetailV').html());
                    $('#txtDetailV').hide();
                }
                $('#txtQuotation').val(Article.Quotation);
                if ($('#txtQuotation').val() != '') {
                    $('#cbquotes').prop('checked', true);
                    $('#txtQuotation').show();
                }
                else {
                    $('#cbquotes').prop('checked', false);
                    $('#txtQuotation').hide();
                }
                $('#txtAuthor').val(Article.AddedBy);
                if (Article.IsCustomReport == 1) {
                    $('#cbreport').prop('checked', true);
                    $('#txtCustomReport').css('display', 'inline-block');
                    $('#divAuthorSection').css('display', 'none');
                    $('#txtCustomReport').val(Article.CustomReport);
                }
                else {
                    $('#cbreport').prop('checked', false);
                    $('#txtCustomReport').css('display', 'none');
                    $('#divAuthorSection').css('display', 'block');
                    $('#txtCustomReport').val('');
                }
                var html = '';
                var EditoValue = '';
                html += '<option value="' + Article.AssignTo + '">' + Article.AssignTo + '</option>'
                $('#selectEditor').html(html);                
                ReporterManagement.GetEditorList();                
                $('#selectEditor option').each(function (index, value) {
                    var $this = $(this);
                    if (Article.AssignTo == $this.val()) {
                        $this.prop('selected', true);                        
                    }
                });
                if (Article.NewsSource != '') {
                    $('#chkNewsSource').prop('checked', true);
                    $('#txtArticleSource').show();
                    $('#txtArticleSource').val(Article.NewsSource);
                }
                else {
                    $('#chkNewsSource').prop('checked', false);
                    $('#txtArticleSource').hide();
                    $('#txtArticleSource').val(Article.NewsSource);
                }

                //get ExternalLinks
                var ArticleExternal = '';
                ReporterManagement.CheckExtLink();
                $(ArticleExternalUrls).each(function (index, value) {
                    ArticleExternal = value.LinkURL + ',' + ArticleExternal;                    
                    //ReporterManagement.CheckExtLink();
                });
                if (ArticleExternal == '') {
                    $('#cbExturl').prop('checked', false);                    
                    $('#divExternalUrl').hide();
                }
                else {
                    $('#cbExturl').prop('checked', true);                    
                    $('#divExternalUrl').show();
                }
                var selectUrl = new Array();
                selectUrl.push(ArticleExternal.split(','));
                $(selectUrl[0]).each(function (index, value) {
                    if (value != '') {
                        var $select = $("#txtExternalUrl").selectize();
                        var selectize = $select[0].selectize;
                        selectize.addOption({ text: value, value: value });
                        selectize.addItem(value);
                        //selectize.setValue(value);
                    }
                });
                var html = '';
                $(ArticleMedia).each(function (index, value) {
                    $('.divCategoryPreview').show();                                       
                    var filename = value.FileName;
                    var filenameExt = filename.split('.').pop();
                    html += '<li class="liCategoryReporter" data-filename="' + filename + '"data-fileextension="' + filenameExt + '"data-source="' + value.Source + '" data-description="' + value.Description + '" data-mediatitle="' + value.MediaTitle + '">';
                    html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                    html += '<label for="rdbnpreview_' + index + '"></label>';
                    if (filenameExt == 'pdf') {
                        html += '<label>' + filename + '</label>';
                    }
                    else {                        
                        html += '<img height="100px;" src="' + filename + '" />';
                    }
                    html += '</li>';

                });                
                $('#ReporterulCategory').html(html);
                //access last element in media
                var $liCategoryReporterlast = $('.liCategoryReporter').last();
                $liCategoryReporterlast.addClass('activeMedia');
                
                $('#txtSource').val($liCategoryReporterlast.attr('data-source'));
                $('#txtDescription').val($liCategoryReporterlast.attr('data-description'));
                $('#txtCaption').val($liCategoryReporterlast.attr('data-mediatitle'));
                //MediaPreview
                if ($liCategoryReporterlast.length > 0) {
                    var html = '';
                    html += '<div class="sfFormLabel" id="deleteMedia"><span class="deleteicon"><i class="fa fa-trash"></i></span></div>';
                    var filename = $liCategoryReporterlast.find('img').attr('src').split('\\').pop();
                    var filenameExt = filename.split('.').pop();
                    if (filenameExt == 'pdf') {
                        html += '<label>' + filename + '</label>';
                    }
                    else {
                        html += '<img src="' + $liCategoryReporterlast.find('img').attr('src') + '"/>';
                    }
                    $('#MediaPreviewSection').find('#MediaPreview').html(html);
                }
                ReporterManagement.liCategoryReporter();

                //Multiple Media and their FileName
                $(ArticleCategory).each(function (index, value) {
                    var $this = $(this);
                    var getCategoryid = ('#chkIsCategory' + value.CategoryID)
                    $(getCategoryid).prop('checked', true);                    
                });

                var html = '';
                var AuthID = new Array();
                if ($(ArticleAuthor).length > 1) {
                    $(ArticleAuthor).each(function (index, value) {
                        var $this = $(this);
                        if ($('#txtAuthor').attr('data-userid') == value.UserID) {

                        }
                        else {
                            html += '<option value="' + value.UserID + '">' + value.Author + '</option>';
                            AuthID.push(value.UserID);
                        }
                    });
                    $('#cbAddAuthor').prop('checked', true);
                    $('#divAssignAuthor').css('display', 'block');
                }
                else {
                    $('#cbAddAuthor').prop('checked', false);
                    $('#divAssignAuthor').css('display', 'none');
                }                
                $('#selectAuthor').html(html);
                //ReporterManagement.GetAuthorList();                
                var $selectize = $('#selectAuthor').selectize({
                    maxItems: 50,
                });
                var $select = $("#selectAuthor").selectize();
                var selectize = $select[0].selectize;
                var defaultValueIds = AuthID;
                selectize.setValue(defaultValueIds);

                //ReporterManagement.liCategoryReporter();
                $('.versionlog').show();
                ArticleActivity.GetArticleActivity(ReporterManagement.config.ArticleID, p.UserModuleID, $('#divArticleActivity'));

                ArticleVersion.GetArticleVersion(ReporterManagement.config.ArticleID, p.UserModuleID, $('#divVersionLog'), $('.versionlog'), '');
            },            
            getAllMediaInfo: function () {
                var mediaArr = new Array();
                $('#ReporterCategoryListing').find('.liCategoryReporter').each(function (i, v) {
                    var $thisLi = $(this);
                    if ($thisLi.attr('data-fileextension') == 'jpg' || $thisLi.attr('data-fileextension') == 'jpeg' || $thisLi.attr('data-fileextension') == 'png') {
                        p.mediaType = 'image';
                    }
                    else if ($thisLi.attr('data-fileextension') == 'doc' || $thisLi.attr('data-fileextension') == 'pdf') {
                        p.mediaType = 'document';
                    }
                    mediaArr.push({
                        MediaTitle: (typeof $thisLi.attr('data-mediatitle') == 'undefined') ? '' : $thisLi.attr('data-mediatitle'),
                        FileName: $thisLi.attr('data-filename'),
                        MediaType: p.mediaType,
                        Source: (typeof $thisLi.attr('data-source') == 'undefined') ? '' : $thisLi.attr('data-source'),
                        Description: (typeof $thisLi.attr('data-description') == 'undefined') ? '' : $thisLi.attr('data-description'),
                        IsActive: 1//Active for all Media
                    });
                })
                return mediaArr;
            },            
            AddReporterNewsData: function () {
                var AddReportNews = {
                    ArticleID: ReporterManagement.config.ArticleID,
                    StateID: ReporterManagement.config.outStateID,
                    Message: typeof $('#txtActivityRemarks').val()=='undefined'?'':$('#txtActivityRemarks').val(),
                    ArticleEntryType: 1,//$('#cmbType').val() == null ? '' : $('#cmbType').val(),
                    Title: $('#txtTitle').val(),
                    Summary: $('#txtSummary').val(),
                    Detail: $('#txtDetail').val(),
                    Quotation: (typeof $('#txtQuotation').val() == 'undefined') ? '' : $('#txtQuotation').val(),
                    OpinionBy: (typeof $('#txtOpinionBy').val() == 'undefined') ? '' : $('#txtOpinionBy').val(),
                    NewsSource: $('#txtArticleSource').val(),
                    AssignTo: $('#selectEditor').val(),
                    IsCustomReport: $('#cbreport').is(":checked") ? true : false,
                    CustomReport: $('#txtCustomReport').val(),
                    IsBlog: false,
                    CultureCode: p.CultureCode,                    
                    AddedBy: ReporterManagement.config.UserName,
                    UpdatedBy: ReporterManagement.config.ArticleID != 0 ? ReporterManagement.config.UserName : '',
                }

                ReporterManagement.config.url = ReporterManagement.config.baseURL + "AddReporterNews";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    objInfo: AddReportNews,
                    categoryIDs: ReporterManagement.config.categoryid,
                    authorIDs: ReporterManagement.config.collectAuthor,
                    objInfoMedia: (ReporterManagement.config.MediaListArr).length != 0 ? ReporterManagement.config.MediaListArr : null,
                    ExternalLinks: ReporterManagement.config.ExternalLinksArr!=','?ReporterManagement.config.ExternalLinksArr:'',
                    RoleID: p.roleID,
                    SiteID: parseInt(p.siteID),
                });
                ReporterManagement.config.ajaxCallMode = 1;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },            
            GetArticleEntryType: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetArticleEntryType";
                ReporterManagement.config.ajaxCallMode = 16;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetCategory: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetCategoryAll";
                ReporterManagement.config.data = JSON2.stringify({
                    SiteID: p.siteID
                });
                ReporterManagement.config.ajaxCallMode = 2;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },            
            GetAuthorList: function () {                
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAuthorByRole";
                ReporterManagement.config.data = JSON2.stringify({
                    RoleID: p.roleID
                });
                ReporterManagement.config.ajaxCallMode = 3;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetEditorList: function () {                
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetEditorByRole";
                ReporterManagement.config.ajaxCallMode = 7;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetUserIdByUsername: function () {                
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetUserIdByUsername";
                ReporterManagement.config.data = JSON2.stringify({
                    Username: SageFrameUserName,
                });
                ReporterManagement.config.ajaxCallMode = 15;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },            
            FileUploaded: function (src, response, type, filename, extension) {
                index = 0;
                var html = '';
                if (response != null) {
                    index++;
                    //$('.divCategoryPreview').show();   
                    ReporterManagement.config.ResponseFileName = '';
                    if ($('.liCategoryReporter').length > 0) {
                        html+= $('#ReporterulCategory').html();
                    }
                    html += '<li class="liCategoryReporter" data-filename="' + src + '" data-fileextension=' + extension + '>';
                    html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                    html += '<label for="rdbnpreview_' + index + '"></label>';
                    if (type == 'image') {
                        html += '<img height="100px;" src="' + src + '" />'; 
                        $('.divCategoryPreview').show();
                        $('.errorMsgMedia').html('');
                    }
                    else {                        
                        $('.errorMsgMedia').html('Enter valid media type');
                        $('.divCategoryPreview').hide();
                        return false;
                    }
                    html += '</li>';
                    ReporterManagement.config.ResponseFileName = html + ReporterManagement.config.ResponseFileName;
                    $('#ReporterulCategory').html(ReporterManagement.config.ResponseFileName);

                }
                $('.liCategoryReporter.activeMedia').removeClass('activeMedia');
                var $liCategoryReporterlast = $('.liCategoryReporter').last();
                $liCategoryReporterlast.addClass('activeMedia');
                //MediaPreview
                var html = '';
                html += '<div class="sfFormLabel" id="deleteMedia"><span class="deleteicon"><i class="fa fa-trash"></i></span></div>';
                if (type == 'document') {
                    html += '<label>' + filename + '</label>';
                }
                else {
                    html += '<img src="' + $('.liCategoryReporter.activeMedia').attr('data-filename') + '"/>';
                }                
                var $mediainfo = $('.divCategoryPreview').find('.dropzone_mediainformation');
                $('.divCategoryPreview').find('.dropzone_mediainformation').find('#MediaPreviewSection').find('#MediaPreview').html(html);
                $mediainfo.find('#txtSource').val($('.liCategoryReporter.activeMedia').attr('data-source'));
                $mediainfo.find('#txtDescription').val($('.liCategoryReporter.activeMedia').attr('data-description'));
                $mediainfo.find('#txtCaption').val($('.liCategoryReporter.activeMedia').attr('data-mediatitle'));
                $mediainfo.find('#MediaPreviewSection').find('#MediaPreview').find('#deleteMedia').off().on('click', function () {
                    $('.liCategoryReporter.activeMedia').remove();
                    if ($('#ReporterulCategory').find('.liCategoryReporter').length == 0) {
                        $('.divCategoryPreview').hide();
                    }
                    $mediainfo.find('#MediaPreviewSection').find('#MediaPreview').html('');
                    $mediainfo.find('.dropzone_mediainformation').find('#txtSource').val('');
                    $mediainfo.find('.dropzone_mediainformation').find('#txtDescription').val('');
                    $mediainfo.find('.dropzone_mediainformation').find('#txtCaption').val('');
                });                
                ReporterManagement.liCategoryReporter();
            },
            ManageDynamicBtn: function (stateID) {
                $('#divEditActionButton').GetDynamicButton({
                    stateID: stateID,
                    onClick: function (outStateID, IsActivityMessage) {
                        ReporterManagement.config.outStateID = outStateID;
                        if (IsActivityMessage == 'true') {
                            $('#btnOpenActivityMsg').trigger('click');
                        }
                        else {
                            if (validator.form()) {
                                var Result = ReporterManagement.CollectionBeforeSave();
                                if (Result != 1) {
                                    ReporterManagement.AddReporterNewsData();
                                }
                            }
                        }
                    }
                });
            },            
            liCategoryReporter: function () {
                $('.liCategoryReporter').off().on('click', function () {
                    var $this = $(this);
                    $('.liCategoryReporter.activeMedia').removeClass('activeMedia');
                    $this.addClass('activeMedia');
                    $this.find('.rdbnpreview').prop('checked', true);
                    if (typeof ($this.attr('data-source')) != 'undefined')
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtSource').val($this.attr('data-source'));
                    else $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtSource').val('');
                    if (typeof ($this.attr('data-description')) != 'undefined')
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtDescription').val($this.attr('data-description'));
                    else
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtDescription').val('');
                    if (typeof ($this.attr('data-mediatitle')) != 'undefined')
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtCaption').val($this.attr('data-mediatitle'));
                    else
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtCaption').val('');

                    //MediaPreview
                    var html = '';
                    html += '<div class="sfFormLabel" id="deleteMedia"><span class="deleteicon"><i class="fa fa-trash"></i></span></div>';
                    var filename = $this.find('img').attr('src').split('\\').pop();
                    var filenameExt = filename.split('.').pop();
                    if (filenameExt == 'pdf') {
                        html += '<label>' + filename + '</label>';
                    }
                    else {
                        html += '<img src="' + $this.find('img').attr('src') + '"/>';
                    }
                    ReporterManagement.config.ActiveMediaFileName = $this.find('img').attr('src');
                    $('#MediaPreviewSection').css('display', 'block');
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#MediaPreviewSection').find('#MediaPreview').html(html);
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#MediaPreviewSection').find('#MediaPreview').find('#deleteMedia').off().on('click', function () {
                        var $this = $(this);
                        $('.liCategoryReporter.activeMedia').remove();
                        if ($('.liCategoryReporter').length < 0) {
                            $('.divCategoryPreview').hide();
                        }
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#MediaPreviewSection').find('#MediaPreview').html('');
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtSource').val('');
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtDescription').val('');
                        $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtCaption').val('');
                    });
                });

                $('#txtSource').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategoryReporter.activeMedia').attr('data-source', $this.val());
                });
                $('#txtDescription').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategoryReporter.activeMedia').attr('data-description', $this.val());
                });
                $('#txtCaption').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategoryReporter.activeMedia').attr('data-mediatitle', $this.val());
                });
                $('#deleteMedia').off().on('click', function () {
                    var $this = $(this);
                    $('.liCategoryReporter.activeMedia').remove();
                    if ($('#ReporterulCategory').find('.liCategoryReporter').length == 0) {
                        $('.divCategoryPreview').hide();
                    }
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#MediaPreviewSection').find('#MediaPreview').html('');
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtSource').val('');
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtDescription').val('');
                    $('.divCategoryPreview').find('.dropzone_mediainformation').find('#txtCaption').val('');
                });
                if ($(window).width() <= 599) {                    
                    $('#MediaDevice').html($('.dropzone_mediainformation')).createSideBarForm({
                        title: 'Media Detail',
                        //openButton: $('.sm-dropzone_mediainformation'),
                        openButton: $('.liCategoryReporter img'),
                        closeButton: $('.btncancelTemplateWeb'),
                    });
                    var mediadetail = $('#MediaDevice').find('.dropzone_mediainformation');
                    $(mediadetail).find('#txtSource').off().on('change', function () {
                        var $this = $(this);
                        $('.liCategoryReporter.activeMedia').attr('data-source', $this.val());
                    });
                    $(mediadetail).find('#txtDescription').off().on('change', function () {
                        var $this = $(this);
                        $('.liCategoryReporter.activeMedia').attr('data-description', $this.val());
                    });
                    $(mediadetail).find('#txtCaption').off().on('change', function () {
                        var $this = $(this);
                        $('.liCategoryReporter.activeMedia').attr('data-mediatitle', $this.val());
                    });
                }
                else {
                    var mhtml = $('#MediaDevice').find('.dropzone_mediainformation');
                    if (mhtml.length > 0) {
                        $('#MediaDevice').after(mhtml);
                    }
                }
            },                        
            ResetValues: function () {
                ReporterManagement.config.collectAuthor = '';
                ReporterManagement.config.categoryList = '';
                ReporterManagement.config.categoryid = '';
                ReporterManagement.config.ResponseFileName = '';
                ReporterManagement.config.outStateID = '';
                $('.errorMsg').each(function () {
                    var $this = $(this);
                    $this.html('');
                });
                $('#txtAuthor').val(SageFrameUserName);
                $('input[type="checkbox"]').removeAttr('checked');
                $('#divAuthorSection').show();
                $('.divAddAuthor').show();
                $('.errorMsg').html('');
                $('#txtQuotation').css('display', 'none');
                $('.divCategoryPreview').hide();                
                $('#divExternalUrl').hide();
                $('#txtExternalUrl').val('');
                var $select = $('#txtExternalUrl').selectize();
                var control = $select[0].selectize;
                control.clear();
                $('#txtArticleSource').hide();
                $('#txtCustomReport').css('display', 'none');
                $('#MainGrid').css('display', 'block');
                $('#MainForm').css('display', 'none');

                $('#MainStatePreview').hide();
                $('#MainStatePreview').css('display','none!important');
                $('#MainStatePreview').removeClass('activeFormReporter');
                $('.divInputEvent').show();
                $('#selectEditor option[value="0"]').prop('selected', true);                
            },
            ClearReporterForm: function () {
                validator.resetForm();
                ReporterManagement.ResetValues();
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: ReporterManagement.config.type,
                    contentType: ReporterManagement.config.contentType,
                    cache: ReporterManagement.config.cache,
                    async: ReporterManagement.config.async,
                    url: ReporterManagement.config.url,
                    data: ReporterManagement.config.data,
                    dataType: ReporterManagement.config.dataType,
                    success: ReporterManagement.ajaxSuccess,
                    error: ReporterManagement.ajaxFailure,
                    complete: function () {

                    }
                });
            },
            ajaxSuccess: function (data) {
                switch (ReporterManagement.config.ajaxCallMode) {
                    case 1:
                        {
                            SageFrame.messaging.show("News Saved successfully", "Success");
                            if (data.d == 1) {
                                
                                ReporterManagement.GetAllDataIntoGrid(ReporterManagement.config.offset, ReporterManagement.config.limit, ReporterManagement.config.Currentpage);                                
                                ReporterManagement.ClearReporterForm();
                                $('#btnFilterCloseActivity').trigger('click');                                
                            }
                            break;
                        }
                    case 2:
                        {
                            if (data.d != null) {
                                var Lstdata = data.d;
                                ReporterManagement.config.CategoryArr = data.d;
                                var html = '<ul class="threecolcheckbox">';
                                if (Lstdata.length > 0) {
                                    $.each(Lstdata, function (index, item) {
                                        html += '<li data-categoryid=' + item.CategoryID + '><input type="checkbox" name="cBoxcategory" id="chkIsCategory' + item.CategoryID + '" value=' + item.CategoryID + '><label for="chkIsCategory' + item.CategoryID + '">' + item.CategoryName.replace(/\s+/g, '') + '</label></li>';
                                    });
                                }
                                html += '</ul>';
                                $('#CategoryList').html(html);
                            }
                            break;
                        }
                    case 3:
                        {
                            if (data.d != null) {
                                var Lstdata = data.d;
                                if (Lstdata.length > 0) {                                    
                                    var html = '';
                                    $.each(Lstdata, function (index, item) {
                                        var $this = $(this);
                                        if ($('#txtAuthor').attr('data-userid') == item.UserID)
                                        { }
                                        else {
                                            html += '<option value="' + item.UserID + '">' + item.FirstName + ' ' + item.LastName + '</option>';
                                            var FullName = $this.attr('FirstName') + ' ' + $this.attr('LastName');
                                        }
                                    });
                                }                                
                                $('#selectAuthor').html(html);
                                $('#selectAuthor').selectize({
                                    maxItems: 50,
                                });
                            }
                            break;
                        }
                    case 4:
                        {
                            var Lstdata = data.d;
                            var MediaLen = Lstdata.length - 1;
                            if (Lstdata != null) {
                                var html = '<ul id="ReporterulCategory">';
                                $.each(Lstdata, function (index, item) {
                                    var filename = item.split('\\').pop();
                                    var filenameExt = filename.split('.').pop();

                                    if (MediaLen == index)
                                        html += '<li class="activeMedia liCategoryReporter" data-filename=' + filename + '>';
                                    else
                                        html += '<li class="liCategoryReporter" data-filename=' + filename + '>';
                                    html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                                    html += '<label for="rdbnpreview_' + index + '"></label>';
                                    if (filenameExt == 'pdf') {
                                        html += '<label>' + filename + '</label>';
                                    }
                                    else {
                                        html += '<img height="100px;" src="/Modules/ArticleAdmin/ReporterAdmin/Media/' + filename + '" />';
                                    }                                    
                                    html += '</li>';
                                    //Mulltiple Media and their FileName
                                    ReporterManagement.config.FileNameLists = filename + ',' + ReporterManagement.config.FileNameLists;
                                });
                                html += '</ul>';
                                $('#ReporterCategoryListing').html(html);
                                ReporterManagement.liCategoryReporter();
                            }
                            break;
                        }                    
                    case 6:
                        ReporterManagement.BindGridData(data);
                        break;
                    case 7:
                        {
                            if (data.d != null) {
                                var Lstdata = data.d;
                                if (Lstdata.length > 0) {
                                    var html = '<select id="selectEditor">';
                                    html += '<option value="0">Please Select Editor</option>';
                                    $.each(Lstdata, function (index, item) {
                                        var $this = $(this);
                                        html += '<option value="' + item.Username + '">' + item.FirstName + ' ' + item.LastName + '</option>';                                        
                                        var FullName = $this.attr('FirstName') + ' ' + $this.attr('LastName');
                                    });
                                }
                                html += '</select>';
                                $('#AssignEditor').html(html);
                            }
                            break;
                        }
                    case 9:
                        {
                            if (data.d != null) {
                                ReporterManagement.BindFormByID(data);                                
                            }
                            break;
                        }
                    case 10:
                        {
                            if (data.d == 1) {
                                SageFrame.messaging.show("Article deleted succesfully", "success");
                                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                            }
                            break;
                        }                    
                    case 15:
                        {
                            $('#txtAuthor').attr('data-userid', data.d[0].UserID);                            
                            break;
                        }
                    case 16:
                        {
                            if (data.d != null) {
                                var Lstdata = data.d;
                                if (Lstdata.length > 0) {
                                    var html = '';                                    
                                    $.each(Lstdata, function (index, item) {
                                        var $this = $(this);
                                        html += '<option value="' + item.EntryTypeID + '">' + item.EntryType +'</option>';
                                    });
                                }                                                                
                            }
                            break;
                        }
                }
            },
            ajaxFailure: function () {                
                alert('Server Error!!');
            },
        }
        validator = $("#form1").validate({
            //ignore: ":hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input",
            ignore: ":hidden",
            rules: {
                ActivityRemarks: {
                    required: true,
                },
                Title: {
                    required: true,
                },
                Summary: {
                    required: true,
                },
                Detail: {
                    required: true,
                },
                OpinionBy: {
                    required: true,
                },
                errorMsgMedia: {
                    required: true,
                },
                NewsSource: {
                    required: true,
                },
                ExternalUrl: {
                    required: true,
                },
                Quotation: {
                    required: true,
                },
                selectEditor: {
                    required: true,
                },
                errorMsgauthor1: {
                    required:true,
                }
            },
            messages: {
                ActivityRemarks: {
                    required: "* Required",
                },
                Title: {
                    required: "* Required",
                },
                Summary: {
                    required: "* Required",
                },
                Detail: {
                    required: "* Required",
                },
                OpinionBy: {
                    required: "* Required",
                },
                errorMsgMedia: {
                    required: "* Required",
                },
                NewsSource: {
                    required: "* Required",
                },
                ExternalUrl: {
                    required: "* Required",
                },
                Quotation: {
                    required: "* Required",
                },
                selectEditor: {
                    required: "* Required",
                },
                errorMsgauthor1: {
                    required: "* Required",
                }
            }
        });
        ReporterManagement.init();
    }

    $.fn.ReporterManagementEditor = function (p) {
        $.ReporterManagement(p);
    };
})(jQuery);