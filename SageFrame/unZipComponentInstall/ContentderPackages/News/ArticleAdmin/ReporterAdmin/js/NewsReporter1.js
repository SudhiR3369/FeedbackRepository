(function ($) {
    $.ReporterManagement = function (p) {
        var validator;
        p = $.extend
                ({
                    CultureCode: '',
                    UserModuleID: '1',
                    mediaType: "*",
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
                ExternalLists: "",
                ExternalLinksArr: [],
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
                //WorkflowController
                if (typeof (CurrentWorkFlow) !== 'undefined') {
                    $('#btnBackwardState').text(CurrentWorkFlow.BackwardActionName);
                    $('#btnForwardState').text(CurrentWorkFlow.ForwardActionName);
                    $('#btnApprove').text(CurrentWorkFlow.OutActionName);
                    ReporterManagement.config.BackInputState = CurrentWorkFlow.BackwardInputState;
                    ReporterManagement.config.ForwardState = CurrentWorkFlow.ForwardState;
                }
                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                ReporterManagement.ReporterControl();
                $('#divReporterFilter').createCommonArticleFilter({
                    openButton: $('#btnOpenFilter'),
                    closeButton: $('#btnFilterClose'),
                    filterFor: 'reporter',
                    userModuleID: p.UserModuleID,
                    searchCall: ReporterManagement.FilterSearchClick,
                    resetCall: ReporterManagement.FilterResetClick,
                });
                $('#ReporterRemarks').createSideBarForm({
                    title: 'Activity Remarks',
                    openButton: $('#btnBackwardState,#btnForwardState'),
                    closeButton: $('#btnFilterClose'),
                });
                $('#btnActivityRemarksDone').off().on('click', function () {
                    if (validator.form()) {
                        ReporterManagement.CollectionBeforeSave();
                        //ReporterManagement.AddActivityLog();
                        ReporterManagement.AddReporterNewsData("back", $('#txtActivityRemarks').val());
                        ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                        //$('#btnAddAnother').css('display', 'block');
                        //$('#btnSave').css('display', 'none');
                    }
                });
                //ArticleVersion.GetArticleVersion(ReporterManagement.config.ArticleID, p.UserModuleID, $('#divArticleVersion'));




            },
            FilterSearchClick: function (objValue) {
                ReporterManagement.FilterInfo = objValue;
                console.log(ReporterManagement.FilterInfo);
                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);

            },
            FilterResetClick: function (objValue) {
                ReporterManagement.FilterInfo = objValue;
                console.log(ReporterManagement.FilterInfo);

            },
            GetActivityLog: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAllActivityLog";
                ReporterManagement.config.data = JSON2.stringify({
                    objAuth: ReporterManagement.ObjAuth,
                    ArticleID: ReporterManagement.config.ArticleID,
                });
                ReporterManagement.config.ajaxCallMode = 12;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetActivityVersionLog: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAllActivityVersionLog";
                ReporterManagement.config.data = JSON2.stringify({
                    objAuth: ReporterManagement.ObjAuth,
                    ArticleID: ReporterManagement.config.ArticleID,
                });
                ReporterManagement.config.ajaxCallMode = 13;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            ReporterControl: function () {
                var $cmbType = '';
                //$(document).on('click', '#MainGrid', function () {
                //    $('.actiononClickShow').css('display', 'none');
                //});

                $('#btnAddNewArticle').off('click').on('click', function () {
                    ReporterManagement.config.ArticleID = 0;
                    $('#MainGrid').hide();
                    $('#MainForm').show();
                    $('#btnBackwardState').css('display', 'none');
                    $('#btnForwardState').css('display', 'none');
                    $('#btnSave').css('display', 'inline-block');
                    $('#btnApprove').css('display', 'inline-block');
                    ReporterManagement.GetCategory();
                    ReporterManagement.GetAuthorList();
                    ReporterManagement.GetEditorList();
                    //ReporterManagement.BindMediaList();
                    $('#divArticleActivity').html('');
                    $('#ulCategory').html('');
                    $('#MediaPreview').html('');
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
                        //SageFrame.messaging.show("Added successfully", "Success");
                        jConfirm('Do you want to delete selected News?', 'Confirm', function (response) {
                            if (response) {
                                //while(checkedData.length>0)
                                {
                                    var delidxml = '';
                                    //var delid = new Array();
                                    $(checkedData).each(function (i, v) {
                                        delidxml += '<article><id>' + v + '</id></article>';
                                        //delid.push(v);
                                    });
                                    ReporterManagement.DeleteReporterNewsByID(delidxml);
                                }
                            }
                        });
                    }
                    else {
                        SageFrame.messaging.show("Please Select News To Delete", "Error");
                    }
                });
                //for default cmbType
                $('#cmbType option[value="1"]').attr("selected", true);
                $('.rTitle').show();
                $('.rSummary').show();
                $('.rDetail').show();
                $('.rOpinionBy').hide();
                $('#cmbType').off().on('click', function () {
                    $cmbType = $('#cmbType  option:selected').val();
                    //if ($cmbType == '0') {
                    //    $('.rTitle').hide();
                    //    $('.rSummary').hide();
                    //    $('.rDetail').hide();
                    //    $('.rOpinionBy').hide();
                    //}
                    if ($cmbType == '1') {
                        $('.rTitle').show();
                        $('.rSummary').show();
                        $('.rDetail').show();
                        $('.rOpinionBy').hide();
                    }
                    else if ($cmbType == '2') {
                        $('.rTitle').show();
                        $('.rSummary').hide();
                        $('.rDetail').hide();
                        $('.rOpinionBy').hide();
                    }
                    else if ($cmbType == '3') {
                        $('.rTitle').show();
                        $('.rSummary').show();
                        $('.rOpinionBy').show();
                        $('.rDetail').hide();
                    }
                });
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
                        $('#txtExternalUrl').css('display', 'block');
                    }
                    else {
                        $('#txtExternalUrl').css('display', 'none');
                    }
                });
                $('#cbreport').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#txtCustomReport').css('display', 'block');
                        $('#divAuthorSection').css('display', 'none');
                    }
                    else {
                        $('#txtCustomReport').css('display', 'none');
                        $('#divAuthorSection').css('display', 'block');
                    }
                });
                //$('#cbreport').on('click', function () {
                //    if ($(this).is(':checked')) {
                //        $('#txtAddAuthor').css('display', 'block');
                //    }
                //    else {
                //        $('#txtAddAuthor').css('display', 'none');
                //    }
                //});
                $('#cbAddAuthor').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#divAssignAuthor').css('display', 'block');
                    }
                    else {
                        $('#divAssignAuthor').css('display', 'none');
                    }
                });
                //$('#CategoryList').off().on('change', ":checkbox", function () {
                //    var $this = $(this);
                //    if ($this.is(':checked')) {                        
                //        ReporterManagement.config.categoryid = $this.parent().attr('data-categoryid') + ',' + ReporterManagement.config.categoryid;
                //    }
                //});

                $('#txtExternalUrl').off().on('change', function () {
                    $('#txtExternalUrl').val($('#txtExternalUrl').val() + ',');
                    //Get External Links                    
                    var url = $('#txtExternalUrl').val().split(',');
                    $(url).each(function (i, v) {
                        if (v != '') {
                            if (ytVidId(v) !== false) {
                                //ReporterManagement.config.ExternalLinksArr.push(v);
                                ReporterManagement.config.ExternalLinksArr = v + ',' + ReporterManagement.config.ExternalLinksArr;
                            } else {
                                var ErrorMsg = 'Please enter valid YouTube link,Error in ' + (i + 1) + ' link';
                                SageFrame.messaging.show(ErrorMsg, "Alert");
                                $('#txtExternalUrl').val('');
                                //SageAlertDialog(ErrorMsg, 'Alert');
                                return 1;
                            }
                            function ytVidId(v) {
                                //var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
                                var p = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
                                return (v.match(p)) ? RegExp.$1 : false;
                            }
                        }
                    });

                });
                $('#txtAuthor').val(SageFrameUserName);
                $('#txtAuthor').prop("readonly", true);

                $('#btnSave').off().on('click', function () {
                    if (validator.form()) {
                        var Result = ReporterManagement.CollectionBeforeSave();
                        if (Result != 1) {
                            ReporterManagement.AddReporterNewsData("draft",'');
                            ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                            //$('#MainForm').css('display', 'none');
                            //$('#MainGrid').css('display', 'block');
                            $('#btnAddAnother').css('display', 'inline-block');
                            $('#btnSave').css('display', 'none');
                        }
                    }
                });

                //Send To Approve
                $('#btnApprove').off().on('click', function () {
                    if (validator.form()) {
                        var Result = ReporterManagement.CollectionBeforeSave();
                        if (Result != 1) {
                            var Message = CurrentWorkFlow.OutActionName + ' to ' + 'editing';
                            ReporterManagement.AddReporterNewsData("out", Message);
                            ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                            $('#MainForm').css('display', 'none');
                            $('#MainGrid').css('display', 'block');
                        }
                    }
                });                

                //$('#btnBackwardState').off().on('click', function () {
                //    //ReporterManagement.CollectionBeforeSave();
                //    if (validator.form()) {
                //        var Result = ReporterManagement.CollectionBeforeSave();
                //        if (Result != 1) {
                //            ReporterManagement.AddReporterNewsData("back", $('#txtActivityRemarks').val());
                //            ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                //            //$('#MainForm').css('display', 'none');
                //            $('.divInputEvent').css('display', 'none');
                //            $('#MainGrid').css('display', 'block');
                //        }
                //    }
                //});
                $('#btnForwardState').off().on('click', function () {
                    //ReporterManagement.CollectionBeforeSave();
                    if (validator.form()) {
                        var Result = ReporterManagement.CollectionBeforeSave();
                        if (Result != 1) {
                            var Message = CurrentWorkFlow.ForwardActionName + ' to ' + 'Verification';
                            ReporterManagement.AddReporterNewsData("forward", Message);
                            ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                            //$('#MainForm').css('display', 'none');
                            $('.divInputEvent').css('display', 'none');
                            $('#MainGrid').css('display', 'block');
                        }
                    }
                });
                $('#btnAddAnother').off().on('click', function () {
                    ReporterManagement.ClearReporterForm();
                    $('#btnAddAnother').css('display', 'none');
                    $('#btnSave').css('display', 'inline-block');
                });

                //var filepath = '/Modules/ArticleAdmin/ReporterAdmin/Media';
                ReporterManagement.fileUpload(ReporterManagement.config.filepath);

                //Preview Media section hide 
                $('#btnCancel').off().on('click', function () {
                    //ReporterManagement.ClearReporterForm();
                    $('input[type="text"]').val('');
                    $('#txtAuthor').val(SageFrameUserName);

                    $('input[type="checkbox"]').removeAttr('checked');

                    //$('#CategoryListing').find('#ulCategory').html('');
                    //$('#MediaPreviewSection').html('');
                    $('#MainGrid').css('display', 'block');
                    $('#MainForm').css('display', 'none');

                    //for default cmbType    
                    $("#cmbType").val("1");
                    $('#cmbType option[value="1"]').attr("selected", true);
                    $('.rTitle').show();
                    $('.rSummary').show();
                    $('.rDetail').show();
                    $('.rOpinionBy').hide();
                });
            },
            CollectionBeforeSave: function () {
                var Errmessage = '';
                var value = 0;
                ReporterManagement.config.categoryid = '';
                ReporterManagement.config.collectAuthor = '';
                ReporterManagement.config.ExternalLists = '';
                ReporterManagement.config.ExternalLinksArr = '';
                ReporterManagement.config.MediaListArr = ReporterManagement.getAllMediaInfo();
                //check for checkbox
                if ($('#cbquotes').is(':checked') && $('#txtQuotation').val() == '') {
                    Errmessage += 'Please enter Quotation or check off Add Quotation';
                    value = 1;
                }
                if ($('#cbExturl').is(':checked') && $('#txtExternalUrl').val() == '') {
                    Errmessage += 'Please enter External Link or check off External Link';
                    value = 1;
                }
                if ($('#cbreport').is(':checked') && $('#txtCustomReport').val() == '') {
                    Errmessage += 'Please enter Custom Report or check off Custom Report';
                    value = 1;
                }
                if ($('#cbAddAuthor').is(':checked') && $('#selectAuthor').val() == null) {
                    Errmessage += 'Please enter Author or check off Assign Author';
                    value = 1;
                }
                else if($('#cbAddAuthor').is(':checked')==false)
                {
                    ReporterManagement.config.collectAuthor = 'No Assigned Author';
                }
                else {
                    var AuthorList = $('#selectAuthor').val();
                    $(AuthorList).each(function (index, item) {
                        ReporterManagement.config.collectAuthor = item + ',' + ReporterManagement.config.collectAuthor;
                    });
                }
                var checkedData = $("input[name='cBoxcategory']:checked").map(function () {
                    return this.value;
                }).get();
                if (checkedData.length > 0) {
                    $(checkedData).each(function (i, v) {
                        ReporterManagement.config.categoryid = v + ',' + ReporterManagement.config.categoryid;
                    });
                }
                else {                    
                    //SageFrame.messaging.show("Please select Category", "Alert");
                    Errmessage += 'Please select Category, ';
                    value = 1;
                    //return false;
                }
                

                //Get External Links                    
                if ($('#txtExternalUrl').val() != '') {
                    var url = $('#txtExternalUrl').val().split(',');
                    $(url).each(function (i, v) {
                        if (v != '') {
                            if (ytVidId(v) !== false) {                                
                                ReporterManagement.config.ExternalLinksArr = v + ',' + ReporterManagement.config.ExternalLinksArr;
                            } else {
                                Errmessage += 'Please enter valid YouTube link,Error in ' + (i + 1) + ' link';
                                //SageFrame.messaging.show(ErrorMsg, "Alert");
                                //SageAlertDialog(ErrorMsg, 'Alert');
                                value = 1;
                                return false;
                            }
                            function ytVidId(v) {
                                //var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
                                var p = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
                                return (v.match(p)) ? RegExp.$1 : false;
                            }
                        }
                    });
                }
                //chech for html tag
                if ($('input[type="text"]').val().match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/)) {
                    SageFrame.messaging.show("Please enter valid text", "Alert");
                }
                $('<div/>').text($('#MainForm').html());
                //$('input[type="text"]').each(function (i, v) {
                //    var $thistext = $(this);
                //    if ($thistext.val().match(/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/)) {
                //        value = 1;
                //        return false;
                //    }
                //    $this = $(this);                    
                //});

                
                SageFrame.messaging.show(Errmessage, "Alert");
                return value;
            },
            DeleteSelectedNews: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "DeleteSelectedReporterNews";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    ArticleID: ID,
                });
                ReporterManagement.config.ajaxCallMode = 10;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            DeleteReporterMedia: function (dataPath, dataType) {
                var objMediaCategory =
                    {
                        BaseCategory: dataPath,
                        UploadType: dataType,
                        PortalID: parseInt(SageFramePortalID),
                        UserModuleID: p.UserModuleID,
                        UserName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }
                this.config.method = "DeleteReporterMedia";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    objMediaCategory: objMediaCategory,
                });
                this.config.ajaxCallMode = 8;
                this.ajaxCall(this.config);
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
                    
                });
                ReporterManagement.config.ajaxCallMode = 6;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            BindGridData: function (data) {
                var Lstdata = data.d;
                var TotalRow = data.d[0].TotalRow;
                if (Lstdata.length > 0) {
                    var html = '';
                    $.each(Lstdata, function (index, item) {
                        html += '<div class="grid_listing clearfix">';
                        html += '<div class="grid_summary">';

                        html += '<div class="grid_selectors">';
                        if (item.StateID == 1 || item.StateID == 4) {
                            html += '<input type="checkbox" name="cBoxReporter" value="' + item.ArticleID + '">';
                        }
                        else {
                            html += '<input type="checkbox" disabled>';
                        }
                        html += '<label></label></div>';

                        //<div class="grid_image"><img src="test.png"></div>
                        //html += '<div class="grid_image">';
                        //html += '<ul>';
                        //var DocNameList = item.DocName.split(',');
                        //$(DocNameList).each(function (index, value) {
                        //    html += '<li><img src="/Modules/ArticleAdmin/ReporterAdmin/Media/' + value + '" /></li>';
                        //});
                        //html += '</ul>';
                        //html += '</div>';

                        html += '<div class="grid_summary_detail">';
                        html += '<div class="grid_detail_title grid_detail_title--large ">';
                        html += item.Title;
                        html += '</div>';

                        html += '<div class="grid_detail_newsfeature">';
                        html += '<small class="grid_detail_newsfeature_type"><strong>Type:</strong>' + item.EntryType + '</small>';
                        //html += '<small class="grid_detail_newsfeature_location"><strong>Location:</strong>Nepalgunj</small>';
                        html += '<small class="grid_detail_newsfeature_editor"><strong>Editor:</strong>' + item.AssignTo + '</small>';
                        html += '</div>';

                        html += '<div class="grid_detail_newsproperties">';
                        if (item.Author != '') {
                            html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>' + ArticleSetting.ChangeAuthorNameFormat(item.Author) + '</small>';
                        }
                        else {
                            html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>' + 'No Assigned Author' + '</small>';
                        }
                        html += '<small class="grid_detail_newsproperties_reporter_date"><i class="fa fa-calendar"></i>' + ArticleSetting.ChangeDateFormat(item.AddedOn) + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_category"><strong>Category:</strong>' + item.CategoryName + '</small>';
                        html += '</div>';

                        //html += '<div class="grid_detail_imagelist">';
                        //html += '<ul>';
                        //var FileList = item.DocName.split(',');
                        //$(FileList).each(function (i, data) {
                        //    html += '<li class="liCategory" data-filename="' + data + '"><img src="' + ReporterManagement.config.filepath + '/' + data.replace(/\s/g, "") + '"/></li>';
                        //});                        
                        //html += '</ul>';
                        //html += '</div>';

                        html += '</div>';//grid_summary_detail

                        html += '<div class="grid_status" data-stateid=' + item.StateID + '><span class="statusnews success ' + item.StateClass + '">' + item.State + '</span></div>';

                        html += '<div class="grid_action">';
                        html += '<div id="actions" class="actiononClickShow" style="display: none; ">';
                        html += '<div class="actiononClickShowInfo">';
                        html += '<p><a id="editReporter-' + item.ArticleID + '" href="#/" class="edit">Edit</a>';//Javascript:void(0)
                        html += '<a id="deleteRole-' + item.ArticleID + '" href="#/" class="delete">Delete</a></p>';//Javascript:void(0)
                        html += '</div></div>';
                        if (item.StateID == 1 || item.StateID == 4)//draft
                        {
                            html += '<p class="actionclass actionLinkClass" id="actionLink">';
                            html += '<a href="#/"><i class="fa fa-ellipsis-v"></i></a>';
                            html += '</p>';
                        }
                        html += '</div>';//grid_action
                        html += '</div>';
                        html += '</div>';

                    });
                }
                else {
                    html = '<div><h3>..............  No data to display ...............<h3></div>';
                }
                //$('.grid_listing').html(html);
                $('#ArticleList').html(html);
                //ReporterManagement.config.Currentpage =;
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
                    $this.parent().find('.actiononClickShow').css('display', 'block')
                });
                $('#MainGrid').on('click', '.edit', function () {
                    ArticleID = $(this).prop('id').split('-')[1];
                    ReporterManagement.GetReporterNewsByID(ArticleID);
                });

                $('.delete').off().on('click', function () {
                    var ID = $(this).prop('id').split('-')[1];
                    delidxml = '<article><id>' + ID + '</id></article>';
                    //ReporterManagement.GetReporterNewsByID(ID);
                    ReporterManagement.DeleteReporterNewsByID(delidxml);
                });
            },
            onActionClick: function () {
                $("#ArticleList").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });
                $("#ArticleList div").not(".actionclass").on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },
            GetArticleAllForVerify: function (ArticleID) {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetArticleAllForVerify";
                ReporterManagement.config.data = JSON2.stringify({
                    objAuth: ReporterManagement.ObjAuth,
                    ArticleID: ArticleID,
                });
                ReporterManagement.config.ajaxCallMode = 13;
                ReporterManagement.ajaxCall(ReporterManagement.config);
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
                ReporterManagement.GetCategory();
                //ReporterManagement.GetmediaCategoryByPath(ReporterManagement.config.filepath);
                //Bind all data into form
                data = data.d;
                data = JSON.parse(data);
                //if (data.length > 0) {
                var Article = data.Article[0];
                var ArticleMedia = data.ArticleMedia;
                var ArticleCategory = data.ArticleCategory;
                var ArticleAuthor = data.ArticleAuthor;
                var ArticleExternalUrls = data.ArticleExternalUrls;
                ReporterManagement.config.ArticleID = Article.ArticleID;
                //$.each(Article, function (index, item) {
                ReporterManagement.config.StateID = Article.StateID;
                ReporterManagement.config.State = Article.State;
                //ReporterManagement.GetStateInfo(ReporterManagement.config.StateID);
                //if (ReporterManagement.config.StateID == 5)//editing
                //{
                //    SageAlertDialog('Cannot edit/delete the Article', 'Alert');
                //    return 1;
                //}
                if (ReporterManagement.config.State == 'Verification') {
                    $('#MainVerification').show();
                    //$('#MainForm').hide();
                    $('#MainGrid').hide();
                    $('#txtTitleV').val(Article.Title);
                    $('#txtSummaryV').val(Article.Summary);
                    $('#txtDetailV').val(Article.DetailsViewDOM);
                    $('#btnForwardState').show();
                    $('#btnBackwardState').show();
                    $('#btnSave').hide();
                    $('#btnAddAnother').hide();
                    $('.divInputEvent').hide();
                }
                if (ReporterManagement.config.BackInputState == Article.StateID) {
                    $('#btnBackwardState').css('display', 'inline-block');
                    $('#btnForwardState').css('display', 'inline-block');
                    $('#btnSave').css('display', 'none');
                    $('#btnApprove').css('display', 'none');
                }
                else {
                    $('#btnBackwardState').css('display', 'none');
                    $('#btnForwardState').css('display', 'none');
                    $('#btnSave').css('display', 'inline-block');
                    $('#btnApprove').css('display', 'inline-block');
                }
                if (Article.ArticleEntryType == '1') {
                    $('.rTitle').show();
                    $('.rSummary').show();
                    $('.rDetail').show();
                    $('.rOpinionBy').hide();
                    //$('#cmbType option').eq(1).prop('selected', true);
                    $('#cmbType option[value="1"]').attr('selected', true);
                }
                else if (Article.ArticleEntryType == '2') {
                    $('.rTitle').show();
                    $('.rSummary').hide();
                    $('.rDetail').hide();
                    // $('#cmbType option').eq(2).prop('selected', true);
                    $('#cmbType option[value="2"]').attr('selected', true);
                }
                else if (Article.ArticleEntryType == '3') {
                    $('.rTitle').show();
                    $('.rSummary').show();
                    $('.rOpinionBy').show();
                    $('.rDetail').hide();
                    //$('#cmbType option').eq(3).prop('selected', true);
                    $('#cmbType option[value="3"]').attr('selected', true);
                }
                $('#txtTitle').val(Article.Title);
                $('#txtSummary').val(Article.Summary);
                $('#txtDetail').val(Article.Detail);
                $('#txtQuotation').val(Article.Quotation);
                if ($('#txtQuotation').val() != '') {
                    $('#cbquotes').prop('checked', true);
                }
                else {
                    $('#cbquotes').prop('checked', false);
                }
                $('#txtAuthor').val(Article.AddedBy);

                if (Article.IsCustomReport == 1) {
                    $('#cbreport').prop('checked', true);
                    $('#txtCustomReport').css('display', 'block');
                    $('#divAuthorSection').css('display', 'none');

                }
                else {
                    $('#cbreport').prop('checked', false);
                    $('#txtCustomReport').css('display', 'none');
                    $('#divAuthorSection').css('display', 'block');
                }
                $('#txtCustomReport').val(Article.CustomReport);
                var html = '';
                var EditoValue = '';
                html += '<option value="' + Article.AssignTo + '">' + Article.AssignTo + '</option>'
                $('#selectEditor').html(html);
                $('#selectEditor').val(Article.AssignTo);
                ReporterManagement.GetEditorList();

                var html = '';
                $(ArticleMedia).each(function (index, value) {
                    //Media part                    
                    var filename = value.FileName;
                    var filenameExt = filename.split('.').pop();
                    html += '<li class="liCategory" data-filename="' + filename + '" data-source="' + value.Source + '" data-description="' + value.Description + '" data-mediatitle="' + value.MediaTitle + '">';
                    html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                    html += '<label for="rdbnpreview_' + index + '"></label>';
                    if (filenameExt == 'pdf') {
                        html += '<label>' + filename + '</label>';
                    }
                    else {
                        html += '<img height="100px;" src="/Modules/ArticleAdmin/ReporterAdmin/Media/' + filename + '" />';
                    }
                    html += '</li>';
                    //ReporterManagement.config.MediaListAfterEdit = html + ReporterManagement.config.MediaListAfterEdit;
                });
                //$('#ulCategory').html(ReporterManagement.config.MediaListAfterEdit);
                $('#ulCategory').html(html);
                //access last element in media
                var $licategorylast = $('.liCategory').last();
                $licategorylast.last().addClass('activeMedia');
                $('#txtSource').val($licategorylast.attr('data-source'));
                $('#txtDescription').val($licategorylast.attr('data-description'));
                $('#txtCaption').val($licategorylast.attr('data-mediatitle'));
                ReporterManagement.LiCategory();

                //MediaPreview
                if ($licategorylast.length > 0) {
                    var html = '';
                    html += '<div class="sfFormLabel" id="deleteMedia"><span class="deleteicon"><i class="fa fa-trash"></i></span></div>';
                    var filename = $licategorylast.find('img').attr('src').split('\\').pop();
                    var filenameExt = filename.split('.').pop();
                    if (filenameExt == 'pdf') {
                        html += '<label>' + filename + '</label>';
                    }
                    else {
                        html += '<img src="' + $licategorylast.find('img').attr('src') + '"/>';
                    }
                    $('#MediaPreviewSection').find('#MediaPreview').html(html);
                }


                //Multiple Media and their FileName
                //ReporterManagement.config.FileNameLists = filename + ',' + ReporterManagement.config.FileNameLists;

                $(ArticleCategory).each(function (index, value) {
                    var $this = $(this);
                    var getCategoryid = ('#chkIs' + value.CategoryName).replace(/\s+/g, '');
                    $(getCategoryid).prop('checked', true);
                    //ReporterManagement.config.categoryid = value.CategoryID + ',' + ReporterManagement.config.categoryid;
                });

                var html = '';
                var AuthID = new Array();
                $(ArticleAuthor).each(function (index, value) {
                    var $this = $(this);
                    html += '<option value="' + value.UserID + '">' + value.Author + '</option>';
                    AuthID.push(value.UserID);
                });
                //$('#AssignEditor').html(html);

                //get ExternalLinks
                var ArticleExternal = '';
                $(ArticleExternalUrls).each(function (index, value) {
                    ArticleExternal = value.LinkURL + ',' + ArticleExternal;
                });
                if (ArticleExternal == '') {
                    $('#cbExturl').prop('checked', false);
                    $('#txtExternalUrl').hide();
                }
                else {
                    $('#cbExturl').prop('checked', true);
                    $('#txtExternalUrl').show();
                }
                $('#txtExternalUrl').val(ArticleExternal);

                $('#selectAuthor').html(html);
                ReporterManagement.GetAuthorList();
                //$('#selectAuthor').val(authorvalues);
                var $selectize = $('#selectAuthor').selectize({
                    maxItems: 10,
                });
                var $select = $("#selectAuthor").selectize();
                var selectize = $select[0].selectize;
                var defaultValueIds = AuthID;
                selectize.setValue(defaultValueIds);

                ArticleActivity.GetArticleActivity(ReporterManagement.config.ArticleID, p.UserModuleID, $('#divArticleActivity'));
                
                ArticleVersion.GetArticleVersion(ReporterManagement.config.ArticleID, p.UserModuleID, $('#divVersionLog'), $('.versionlog'), '');
            },
            getAllMediaInfo: function () {
                var mediaArr = new Array();
                $('#CategoryListing').find('.liCategory').each(function (i, v) {
                    var $thisLi = $(this);
                    //if ($.inArray($thisLi.attr('data-filename'), ['gif', 'png', 'jpg', 'jpeg', 'bmp']) == -1) {
                    //    p.mediaType = 'image';
                    //}
                    //else if ($.inArray($thisLi.attr('data-filename'), ['pdf', 'doc']) == 1)
                    //{
                    //    p.mediaType = 'document';
                    //}
                    var allowedFiles = [".doc", ".docx", ".pdf", 'gif', 'png', 'jpg', 'jpeg', 'bmp'];
                    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
                    if (!regex.test($thisLi.attr('data-filename'))) {
                        SageFrame.messaging.show("Not a valid file Extension" + allowedFiles.join(', '), "alert");
                        return false;
                    }
                    else {
                        //if($thisLi.attr('data-filename').split('.').pop()==('jpeg'||'jpg'))
                        //if ($.inArray($thisLi.attr('data-filename').split('.').pop(), ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                        //{
                        //    p.mediaType = "image";
                        //}
                        validate($thisLi.attr('data-filename'));
                        function validate(file) {
                            var ext = file.split(".");
                            ext = ext[ext.length - 1].toLowerCase();
                            var arrayExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];

                            if (arrayExtensions.lastIndexOf(ext) == -1) {
                                alert("Wrong extension type.");
                                //$("#image").val("");
                            }
                        }
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
            getAllCategoryInfo: function () {
                var categoryArrs = new Array();
                $('#CategoryList').find('li').each(function (i, v) {
                    var $thisLi = $(this);
                    categoryArrs.push({
                        CategoryID: $thisLi.attr('data-categoryid'),
                    });
                });
                return categoryArrs;
            },
            AddActivityLog: function () {
                var ActivityLog = {
                    ArticleID: ReporterManagement.config.ArticleID,
                    Message: $('#txtActivityRemarks').val(),
                    StateID: ReporterManagement.config.StateID,
                    AddedBy: ReporterManagement.config.UserName,
                }
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "AddActivityLog";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    objInfo: ActivityLog,
                });
                ReporterManagement.config.ajaxCallMode = 11;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            AddActivityVersionLog: function () {
                var ActivityLog = {
                    ArticleID: ReporterManagement.config.ArticleID,
                    Message: $('#txtActivityRemarks').val(),
                    StateID: ReporterManagement.config.StateID,
                    AddedBy: ReporterManagement.config.UserName,
                }
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "AddActivityVersionLog";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    objInfo: ActivityLog,
                });
                ReporterManagement.config.ajaxCallMode = 11;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            AddReporterNewsData: function (Operation, Message) {
                var AddReportNews = {
                    ArticleID: ReporterManagement.config.ArticleID,
                    Operation: Operation,
                    //StateID: ReporterManagement.config.StateID,//1=drafting 5=Editing//State ID change from buttom Click
                    ArticleEntryType: parseInt($('#cmbType').val()),
                    Title: $('#txtTitle').val(),
                    Summary: $('#txtSummary').val(),
                    Detail: $('#txtDetail').val(),
                    Quotation: (typeof $('#txtQuotation').val() == 'undefined') ? '' : $('#txtQuotation').val(),
                    OpinionBy: (typeof $('#OpinionBy').val() == 'undefined') ? '' : $('#OpinionBy').val(),
                    //NewsSource:$('#txtSource').val(),
                    AssignTo: $('#selectEditor').val(),
                    IsCustomReport: $('#chkIsActive').is(":checked") ? 1 : 0,
                    CustomReport: $('#txtCustomReport').val(),
                    IsBlog: 0,//false
                    CultureCode: p.CultureCode,
                    AddedBy: ReporterManagement.config.ArticleID == 0 ? ReporterManagement.config.UserName : '',
                    UpdatedBy: ReporterManagement.config.ArticleID != 0 ? ReporterManagement.config.UserName : '',
                }
                var ActivityLog = {                    
                    Message: Message,
                    //StateID: ReporterManagement.config.StateID,
                    AddedBy: ReporterManagement.config.UserName,
                }
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "AddReporterNews";
                ReporterManagement.config.data = JSON2.stringify({
                    CAP: ReporterManagement.ObjAuth,
                    objInfo: AddReportNews,
                    categoryIDs: ReporterManagement.config.categoryid,
                    authorIDs: ReporterManagement.config.collectAuthor,
                    ExternalLinks: ReporterManagement.config.ExternalLinksArr,
                    objInfoMedia: ReporterManagement.config.MediaListArr,
                    objActivityLog: ActivityLog,
                    //objInfoCategory: CategoryList,                    


                    //FileNameLists: ReporterManagement.config.FileNameLists,
                    //ExternalLinks:ReporterManagement.config.ExternalLists,
                });
                ReporterManagement.config.ajaxCallMode = 1;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetCategory: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetCategoryAll";
                ReporterManagement.config.ajaxCallMode = 2;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetStateInfo: function (StateID) {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetStateInfo";
                ReporterManagement.config.data = JSON2.stringify({
                    StateID: StateID
                });
                ReporterManagement.config.ajaxCallMode = 14;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetAuthorList: function () {
                //alert(ReporterManagement.config.baseURL);
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAuthorByRole";
                ReporterManagement.config.ajaxCallMode = 3;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            GetEditorList: function () {
                //alert(ReporterManagement.config.baseURL);
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetEditorByRole";
                ReporterManagement.config.ajaxCallMode = 7;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            fileUpload: function (filePath) {
                var html = '<div class="droppable" id="dvUploadWrapperDrop"><p><i class="fa fa-cloud-upload" aria-hidden="true"></i>Drag files here or click to upload</p></div>';
                $('.fileUploader').html(html);
                ReporterManagement.FileUploader('MediaFile',
                    "#dvUploadWrapperDrop",
                    '.productList',
                    'png,jpg',
                    filePath + '/',
                    ReporterManagement.FileUploaded);
            },
            FileUploader: function (fileClassName, dragZone, outputMessageID, extension, savaPath, callback) {
                $(this).DragUploader({
                    userModuleID: parseInt(p.UserModuleID),
                    extension: extension,
                    response: '',
                    outputMessageID: outputMessageID,
                    fileClassName: fileClassName,
                    PortalID: SageFramePortalID,
                    sageFrameSecureToken: SageFrameSecureToken,
                    UserName: SageFrameUserName,
                    path: p.componentPath,
                    dragZone: dragZone,
                    savaPath: savaPath,
                    encodeQuality: '20L',
                    callback: callback,
                    UploadHandlerPath: SageFrameAppPath + '/Modules/Admin/MediaManagement/'
                    //UploadHandlerPath: SageFrameAppPath + '/Modules/ArticleAdmin/ReporterAdmin/ReporterMediaHandler.ashx'
                });
            },
            FileUploaded: function (response) {
                index = 0;
                var html = '';
                if (response != null) {
                    var resp = response.split("###");
                    if (resp[0] == "1") {
                        index++;
                        var filename = resp[2].split('\\').pop();
                        var filenameExt = '.' + filename.split('.').pop();
                        //if ($.inArray(filenameExt, ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'pdf', 'doc']) == -1) {
                        //    SageFrame.messaging.show("Not a valid file Extension", "alert");
                        //    return false;
                        //}
                        var allowedFiles = [".doc", ".docx", ".pdf", 'gif', 'png', 'jpg', 'jpeg', 'bmp'];
                        //var allowedFilesImages = ['gif', 'png', 'jpg', 'jpeg', 'bmp'];
                        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
                        //var regexImage = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFilesImages.join('|') + ")$");

                        if (!regex.test(filename)) {
                            SageFrame.messaging.show("Not a valid file Extension" + allowedFiles.join(', '), "alert");
                            return false;
                        }
                        //if (!regexImage.test(filename)) {
                        //    SageFrame.messaging.show("Not a valid file Extension" + allowedFiles.join(', '), "alert");
                        //    return false;
                        //}
                        html += '<li class="liCategory" data-filename=' + resp[2] + '>';
                        html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                        html += '<label for="rdbnpreview_' + index + '"></label>';
                        if (filenameExt == 'pdf') {
                            html += '<label>' + filename + '</label>';
                        }
                        else {
                            html += '<img height="100px;" src="/Modules/ArticleAdmin/ReporterAdmin/Media/' + resp[2] + '" />';
                        }
                        html += '</li>';
                        ReporterManagement.config.ResponseFileName = html + ReporterManagement.config.ResponseFileName;
                        $('#ulCategory').html(ReporterManagement.config.ResponseFileName);
                    }
                    else {
                        //error here
                        SageFrame.messaging.show("Not a valid file Extension", "alert");
                    }

                    //ReporterManagement.LiCategory();
                }
                var $licategorylast = $('.liCategory').last();
                $licategorylast.last().addClass('activeMedia');
                //MediaPreview
                var html = '';
                html += '<div class="sfFormLabel" id="deleteMedia"><span class="deleteicon"><i class="fa fa-trash"></i></span></div>';
                var filename = $licategorylast.find('img').attr('src').split('\\').pop();
                var filenameExt = filename.split('.').pop();
                if (filenameExt == 'pdf') {
                    html += '<label>' + filename + '</label>';
                }
                else {
                    html += '<img src="' + $licategorylast.find('img').attr('src') + '"/>';
                }
                $('#MediaPreviewSection').find('#MediaPreview').html(html);
                $('#txtSource').val('');
                $('#txtDescription').val('');
                $('#txtCaption').val('');


                $('#deleteMedia').off().on('click', function () {
                    var $this = $(this);
                    var confirmmessage = '';
                    var dataPath = $this.parent().find('img').attr('src');
                    confirmmessage = 'Do you want to delete this image ?';
                    var dataType = 'image';
                    SageConfirmDialog(confirmmessage).done(function () {
                        ReporterManagement.DeleteReporterMedia(dataPath, dataType);
                    });
                });
                //$('#txtSource').val($licategorylast.attr('data-source'));
                //$('#txtDescription').val($licategorylast.attr('data-description'));
                //$('#txtCaption').val($licategorylast.attr('data-mediatitle'));
                //ReporterManagement.LiCategory();
            },
            //MediaSource
            GetmediaCategoryByPath: function (baseCategoryPath) {
                var objMedaicategory =
                {
                    PortalID: parseInt(SageFramePortalID),
                    UserModuleID: parseInt(p.UserModuleID),
                    UserName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    BaseCategory: baseCategoryPath,
                    UploadType: p.mediaType
                };
                this.config.method = "GetMediaCategoryByPath";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    objMedaicategory: objMedaicategory,
                });
                this.config.ajaxCallMode = 4;
                this.ajaxCall(this.config);
            },
            LiCategory: function () {
                //$('#MediaDevice').html($('.CategoryListing')[0].outerHTML).append($('.dropzone_mediainformation')[0].outerHTML).createSideBarForm({
                //    title: 'Media Detail',
                //    openButton: $('.sm-dropzone_mediainformation'),
                //    closeButton: $('.btncancelTemplateWeb'),
                //});
                $('.liCategory').off().on('click', function () {
                    var $this = $(this);
                    $('.liCategory.activeMedia').removeClass('activeMedia');
                    $this.addClass('activeMedia');
                    $this.find('.rdbnpreview').prop('checked', true);
                    //if(typeof $('#txtSource').val() == 'undefined') ? '' : $('#txtSource').val(),
                    if (typeof ($this.attr('data-source')) != 'undefined')
                        $('#txtSource').val($this.attr('data-source'));
                    else $('#txtSource').val('');
                    if (typeof ($this.attr('data-description')) != 'undefined')
                        $('#txtDescription').val($this.attr('data-description'));
                    else
                        $('#txtDescription').val('');
                    if (typeof ($this.attr('data-mediatitle')) != 'undefined')
                        $('#txtCaption').val($this.attr('data-mediatitle'));
                    else
                        $('#txtCaption').val('');

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
                    //$this.find('#rdbnpreview').prop('checked', true);      
                    $('#deleteMedia').off().on('click', function () {
                        var $this = $(this);
                        var confirmmessage = '';
                        var dataPath = $this.parent().find('img').attr('src');
                        confirmmessage = 'Do you want to delete this image ?';
                        var dataType = 'image';
                        SageConfirmDialog(confirmmessage).done(function () {
                            ReporterManagement.DeleteReporterMedia(dataPath, dataType);
                        });
                    });
                    //$('#MediaDevice').html($('.CategoryListing')[0].outerHTML).append($('.dropzone_mediainformation')[0].outerHTML).createSideBarForm({
                    //$('#MediaDevice').html($('.CategoryListing')[0].outerHTML).append($('.dropzone_mediainformation')[0].outerHTML).createSideBarForm({
                    //    title: 'Media Detail',
                    //    openButton: $('.sm-dropzone_mediainformation'),
                    //    closeButton: $('.btncancelTemplateWeb'),
                    //});

                    $('#MediaPreviewSection').css('display', 'block');
                    $('#MediaPreviewSection').find('#MediaPreview').html(html);
                });
                $('#txtSource').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategory.activeMedia').attr('data-source', $this.val());
                });
                $('#txtDescription').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategory.activeMedia').attr('data-description', $this.val());
                });
                $('#txtCaption').off().on('change', function () {
                    var $this = $(this);
                    $('.liCategory.activeMedia').attr('data-mediatitle', $this.val());
                });

            },
            BindMediaList: function () {
                $('#CategoryListing').attr('data-rootfolder', '/Modules/ArticleAdmin/ReporterAdmin/Media');
                var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                ReporterManagement.GetmediaCategoryByPath(rootFolderPath);
            },
            GetSetting: function () {
                ReporterManagement.config.url = ReporterManagement.config.baseURL + "GetAllNewsReporter";
                ReporterManagement.config.data = JSON2.stringify({
                    PortalID: parseInt(ReporterManagement.config.PortalID),
                    UserModuleID: parseInt(p.UserModuleID),
                    CultureCode: p.CultureCode,
                    //SlidersSetID: parseInt(p.SlidersSetID)
                });
                //data: { id: id, abc :ObjAuth}
                ReporterManagement.config.ajaxCallMode = 3;
                ReporterManagement.ajaxCall(ReporterManagement.config);
            },
            ResetValues: function () {
                ReporterManagement.config.collectAuthor = '';
                ReporterManagement.config.categoryList = '';
                ReporterManagement.config.categoryid = '';
                ReporterManagement.config.ResponseFileName = '';

                $('input[type="text"]').val('');
                $('input[type="textarea"]').val('');

                $('input[type="checkbox"]').removeAttr('checked');

                //$('#CategoryListing').find('#ulCategory').html('');
                //$('#MediaPreviewSection').html('');
                $('#MainGrid').css('display', 'block');
                $('#MainForm').css('display', 'none');

                //for default cmbType    
                $("#cmbType").val("1");
                $('#cmbType option[value="1"]').attr("selected", true);
                $('.rTitle').show();
                $('.rSummary').show();
                $('.rDetail').show();
                $('.rOpinionBy').hide();
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
                            SageFrame.messaging.show("Added successfully", "Success");
                            if (data.d == 1) {
                                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                                ReporterManagement.ResetValues();
                                ReporterManagement.ClearReporterForm();
                                //ReporterManagement.BindGridData(data);
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
                                        html += '<li data-categoryid=' + item.CategoryID + '><input type="checkbox" name="cBoxcategory" id="chkIs' + item.CategoryName.replace(/\s+/g, '') + '" value=' + item.CategoryID + '><label for="chkIs' + item.CategoryName.replace(/\s+/g, '') + '">' + item.CategoryName.replace(/\s+/g, '') + '</label></li>';
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
                                    //var html = '<select id="selectAuthor">';
                                    var html = '';
                                    $.each(Lstdata, function (index, item) {
                                        var $this = $(this);
                                        html += '<option value="' + item.UserID + '">' + item.FirstName + ' ' + item.LastName + '</option>';
                                        var FullName = $this.attr('FirstName') + ' ' + $this.attr('LastName');
                                        //ReporterManagement.config.collectAuthor = FullName + ',' + ReporterManagement.config.collectAuthor;

                                    });
                                }
                                //html += '</select>';
                                //$('#AssignAuthor').html(html);
                                $('#selectAuthor').html(html);

                                //$('#selectAuthor select').each(function (idx) {
                                //var selectizeInput = $('#selectAuthor').selectize(options);
                                //$('#selectAuthor').data('selectize', selectizeInput[0].selectize);
                                //});

                                $('#selectAuthor').selectize({
                                    maxItems: 10,
                                });

                            }
                            break;
                        }
                    case 4:
                        {
                            var Lstdata = data.d;
                            var MediaLen = Lstdata.length - 1;

                            if (Lstdata != null) {
                                var html = '<ul id="ulCategory">';
                                $.each(Lstdata, function (index, item) {
                                    var filename = item.split('\\').pop();
                                    var filenameExt = filename.split('.').pop();

                                    if (MediaLen == index)
                                        html += '<li class="activeMedia liCategory" data-filename=' + filename + '>';
                                    else
                                        html += '<li class="liCategory" data-filename=' + filename + '>';
                                    // html += '<input type="checkbox" id="cbpreview"/>';

                                    html += '<input type="radio" name="categoryradio" class="rdbnpreview" id="rdbnpreview_' + index + '"/>';
                                    html += '<label for="rdbnpreview_' + index + '"></label>';
                                    if (filenameExt == 'pdf') {
                                        html += '<label>' + filename + '</label>';
                                    }
                                    else {
                                        html += '<img height="100px;" src="/Modules/ArticleAdmin/ReporterAdmin/Media/' + filename + '" />';
                                    }
                                    //html += '<label for="cbpreview">Preview</label>';
                                    //html += '<img height="100px;" src="' + item + '" />';


                                    html += '</li>';

                                    //Mulltiple Media and their FileName
                                    ReporterManagement.config.FileNameLists = filename + ',' + ReporterManagement.config.FileNameLists;

                                });
                                html += '</ul>';
                                $('#CategoryListing').html(html);



                                //$('#txtSource').val($('#CategoryListing').children().children().attr('data-source'));
                                //$('#txtDescription').val($('#CategoryListing').children().children().attr('data-description'));

                                ReporterManagement.LiCategory();

                                //$('#MediaDevice').html($('.CategoryListing')[0].outerHTML).append($('.dropzone_mediainformation')[0].outerHTML).createSideBarForm({
                                //    title: 'Media Detail',
                                //    openButton: $('.sm-dropzone_mediainformation'),
                                //    closeButton: $('.btncancelTemplateWeb'),
                                //});

                            }
                            break;
                        }
                    case 5:
                        {
                            if (data.d != null) {
                                var ArticleID = 1;
                                ReporterManagement.AddReporterCategoryNews();
                            }
                            break;
                        }
                    case 6:
                        {
                            if (data.d != null) {
                                if (data.d.length != 0) {
                                    ReporterManagement.BindGridData(data);
                                }
                            }
                            break;
                        }
                    case 7:
                        {
                            if (data.d != null) {
                                var Lstdata = data.d;
                                if (Lstdata.length > 0) {
                                    var html = '<select id="selectEditor">';
                                    $.each(Lstdata, function (index, item) {
                                        var $this = $(this);
                                        html += '<option value="' + item.Username + '">' + item.FirstName + ' ' + item.LastName + '</option>';
                                        var FullName = $this.attr('FirstName') + ' ' + $this.attr('LastName');
                                        //ReporterManagement.config.collectAuthor = FullName + ',' + ReporterManagement.config.collectAuthor;

                                    });
                                }
                                html += '</select>';
                                $('#AssignEditor').html(html);
                            }
                            break;
                        }
                    case 8:
                        {
                            var response = data.d;
                            if (response === '') {
                                SageFrame.messaging.show("Media deleted succesfully", "success");
                                var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                                $('.liCategory.activeMedia').remove();
                                $('#MediaPreviewSection').find('#MediaPreview').html('');
                                if (rootFolderPath != '') {
                                    ReporterManagement.GetmediaCategoryByPath(rootFolderPath);
                                    $('#MediaPreview').find('img').attr('src', '');
                                }
                                else {
                                    $('#ulCategory').html('');
                                    $('#MediaPreview').html('');
                                }
                            }
                            else {
                                SageFrame.messaging.show(data.d, "alert");
                            }
                            //$('.divCategoryList').dialog("close");
                            break;
                        }
                    case 9:
                        {
                            if (data.d != null) {
                                ReporterManagement.BindFormByID(data);
                                ReporterManagement.LiCategory();
                            }
                            break;
                        }
                    case 10:
                        {
                            if (data.d == 1) {
                                ReporterManagement.GetAllDataIntoGrid(0, ReporterManagement.config.limit, 0);
                            }
                            break;
                        }
                    case 11:
                        {
                            //ReporterManagement.AddReporterNewsData("back");
                            break;
                        }
                    case 12:
                        {
                            break;
                        }
                    case 13:
                        {
                            break;
                        }
                    case 14:
                        {
                            if (data.d != null) {
                                ReporterManagement.config.StateID = data.d.StateID;
                                ReporterManagement.config.StateClass = data.d.StateClass;
                            }
                            break;
                        }
                }
            },
            ajaxFailure: function () {
                //ReporterManagement.clearTestimonialsForm();
                alert('Server Error!!');
            },
        }
        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {
                ActivityRemarks: {
                    required: true,
                },
                Title: {
                    required: true,
                },
                CategoryID: {
                    required: true,
                },
                UserID: {
                    required: true,
                }
            },
            messages: {
                ActivityRemarks: {
                    required: "* Required",
                },
                Title: {
                    required: "* Required",
                },
                CategoryID: {
                    required: "* Required",
                },
                UserID: {
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