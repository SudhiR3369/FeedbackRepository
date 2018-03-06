/// <reference path="../../ReporterAdmin/ReporterManangement.ascx" />
/*article common component 
  author:rudra 
*/
$.fn.createSideBarForm = function (options) {
    var $this = $(this);
    $this.hide();
    $this.addClass('filterSlider');
    options = $.extend({
        title: 'Side Form',
        openButton: '',
        closeButton: '',
    }, options);
    var header = '<div class="filterSlider_header">';
    header += '<div class="filterSlider_header_title">';
    header += '<h4>' + options.title + '<span class="closesideform"><i class=" fa fa-times"></i></span></h4></div></div>';
    var fBody = '<div class="filterSlider_body">'
    fBody += '<div class="filterSlider_body_container">';
    fBody += $this.html();
    fBody += '</div></div>';
    fBody = header + fBody;
    $this.html(fBody);
    $(options.openButton).off('click').on('click', function () {
        $this.show("slide", { direction: "right" }, 500);
        $('body').append('<div class="filter-overlay"></div>');
        $('.filter-overlay').off('click').on('click', function () {
            $('.filterSlider').hide("slide", { direction: "right" }, 500);
            $(this).remove();
        });
    });
    $this.find('.closesideform').off('click').on('click', function () {
        $('.filterSlider').hide("slide", { direction: "right" }, 500);
        $('body').find('.filter-overlay').remove();
    });
    $(options.closeButton).off('click').on('click', function () {
        $('.filterSlider').hide("slide", { direction: "right" }, 500);
        $('body').find('.filter-overlay').remove();
    });
  
    $('.filterSlider input[type="text"],.filterSlider textarea').on('change', function () {
        var $this = $(this);
        if($this.val().match(/<script[\s\S]*?>[\s\S]*?<\/script>/gi)) {
            $this.val('');
        }
    });
}

$.fn.createCommonArticleFilter = function (options) {
    var $this = $(this);
    $this.hide();
    $this.addClass('filterSlider');
    options = $.extend({
        title: 'Filter',
        openButton: '',
        closeButton: '',
        filterFor: 'reporter',
        userModuleID: 1,
        siteID: 0,
        roleID: '',
        searchCall: '',
        resetCall: '',
        isBlog: false,
    }, options);


    var filter = {

        config: {
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            method: "",
            url: "",
            ajaxSuccess: '',
            baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/services/ArticleCommonServices.asmx',
        },
        auth: {
            UserModuleID: options.userModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        },
        rerurnValue: {
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
        init: function () {
            switch (options.filterFor) {
                case 'reporter':
                    options.filterFor = 1
                    break;
                case 'editor':
                    options.filterFor = 2
                    break;
                case 'publisher':
                    options.filterFor = 3
                    break;
                case 'admin':
                    options.filterFor = 4
                    break;
            }
            this.getFilterValue();

        },
        getFilterValue() {
            this.config.method = "GetFilterValue";
            this.config.data = JSON.stringify({
                auth: filter.auth,
                filterFor: options.filterFor,
                isBlog: options.isBlog,
                roleID: options.roleID,
                siteID: GetSiteID,
            });
            this.config.ajaxSuccess = this.BindFilterValue;
            this.ajaxCall(this.config);
        },

        BindFilterValue: function (data) {
            var header = '<div class="filterSlider_header">';
            header += '<div class="filterSlider_header_title">';
            header += '<h4>' + options.title + '<span><i class="closesideform fa fa-times"></i></span></h4></div></div>';
            var fBody = '<div class="filterSlider_body">'
            fBody += '<div class="filterSlider_body_container">';
            var filterForm = '<div class="sfFormwrapper sfFormwrapper--check">';

            filterForm += createFormFiled("Keywords", "textType", '<input type="text"  id="txtSearchKeywords" class="sfTextbox" />');

            if (data != null) {
                data = data.d;
                data = JSON.parse(data);
                //console.log(data);
                var lstCategory = data.Category;
                var lstArticleStates = data.ArticleState;
                var lstArticleTypes = data.ArticleType;
                var lstAuthors = data.Author;
                var lstEditors = data.Editor;

                // category of filter
                var catHtml = '<ul class="fltrCatLst twocolcheckbox clearfix">';
                $.each(lstCategory, function (index, item) {
                    catHtml += '<li><input class="cat" type="checkbox" data-catid="' + item.CategoryID + '" id="fltrCat' + item.CategoryID + '" >'
                    catHtml += '<label for="fltrCat' + item.CategoryID + '">' + item.CategoryName + '</label></li>';
                });
                catHtml += '</ul>'
                filterForm += createFormFiled("Category", "", catHtml);
                //article types of filter
                if (options.filterFor != 1) {
                    var AtypesHtml = '<ul class="fltrArtTyp twocolcheckbox clearfix">';
                    $.each(lstArticleTypes, function (index, item) {
                        AtypesHtml += '<li><input class="type" type="checkbox" data-typeid="' + item.ArticleTypeID + '" id="fltrArtTyp' + item.ArticleTypeID + '" >'
                        AtypesHtml += '<label for="fltrArtTyp' + item.ArticleTypeID + '">' + item.ArticleTypes + '</label></li>';
                    });
                    AtypesHtml += '</ul>'
                    filterForm += createFormFiled("Type", "", AtypesHtml);
                }
                //location
                //  filterForm += createFormFiled("Location", "textType", '<input type="text"  id="txtfltrLocation" class="sfTextbox" />');


                // authors
                if (options.filterFor != 1) {
                    var authorHtml = '<select id="lscFltrReporter"><option value="">None</option>';
                    $.each(lstAuthors, function (index, item) {
                        var fullname = item.FirstName + ' ' + item.LastName;
                        authorHtml += '<option value="' + item.UserID + '">' + fullname + '</option>';
                    });
                    authorHtml += '</select>';
                    filterForm += createFormFiled("Author", "selectKey", authorHtml);
                }
                //editors
                if (options.filterFor != 2) {
                    var editorHtml = '<select id="lscFltrEditor"><option value="">None</option>';
                    $.each(lstEditors, function (index, item) {
                        var fullname = item.FirstName + ' ' + item.LastName;
                        editorHtml += '<option value="' + item.Username + '">' + fullname + '</option>';
                    });
                    editorHtml += '</select>';
                    filterForm += createFormFiled("Editor", "selectKey", editorHtml);
                }
                // status
                var stateHtml = '<select id="slcfltrStates"><option value="0">All</option>';
                $.each(lstArticleStates, function (index, item) {
                    if (item.StateID == 6)
                        stateHtml += '<option data-ismessage="' + item.IsActivityMessage + '" value="' + item.StateID + '">Publisher Reject</option>';
                    else
                        stateHtml += '<option data-ismessage="' + item.IsActivityMessage + '" value="' + item.StateID + '">' + item.State + '</option>';
                });
                stateHtml += '</select>';
                filterForm += createFormFiled("Status", "selectKey", stateHtml);
            }
            filterForm += createFormFiled('Date', 'textType', '<div class="twoCol_input"><div class="custom-inputbox datepicker-input-box"><input type="text" id="fltrDateFrom" class="sfTextbox twocol" placeholder="From"/></div><div class="custom-inputbox datepicker-input-box"><input type="text" id="fltrDateTo" class="sfTextbox twocol"  placeholder="To"/></div></div>');
            filterForm += '<div class="sfButtonwrapper">'
            filterForm += '<a id="btnSearchArticle" class="icon-search sfBtn smlbtn-succ">Search</a>'
            filterForm += '<a id="btnResetSearchArticle" class="icon-refresh sfBtn smlbtn-secondary">Reset</a>'
            filterForm += '</div>'
            filterForm += '</div>'

            fBody += filterForm;
            fBody += '</div></div>';
            fBody = header + fBody;
            $this.html(fBody);

            function createFormFiled(labelName, type, InputHtml) {
                var fldsetHtml = '<span class="sfFieldset">';
                fldsetHtml += '<span class="formKey ' + type + '">';
                fldsetHtml += '<span class="sfFormlabel">' + labelName + '</span>';
                fldsetHtml += '</span>';
                fldsetHtml += '<span class="formValue">'
                fldsetHtml += InputHtml;
                fldsetHtml += '</span>';
                fldsetHtml += '</span>';
                return fldsetHtml;
            }
            filter.UIEvent();
        },
        UIEvent: function () {
            var $dateTo = $('#fltrDateTo');
            var $dateFrom = $('#fltrDateFrom');
            $dateFrom.attr('readonly', 'readonly');
            $dateTo.attr('readonly', 'readonly');
            $dateFrom.datepicker();
            $dateTo.datepicker();
            $dateFrom.on('change', function () {
                var val = $(this).val();
                if (val != '') {
                    val = new Date(val)
                    val.setDate(val.getDate() + 1);
                    val = $.datepicker.formatDate('mm/dd/yy', val)
                    console.log(val);
                    $dateTo.removeClass('hasDatepicker')
                    $dateTo.datepicker({
                        minDate: val,
                    });
                }
            });

            $(options.openButton).off('click').on('click', function () {
                $this.show("slide", { direction: "right" }, 500);
                $('body').append('<div class="filter-overlay"></div>');
                $('.filter-overlay').off('click').on('click', function () {
                    $('.filterSlider').hide("slide", { direction: "right" }, 500);
                    $(this).remove();
                });
            });
            $this.find('.closesideform').off('click').on('click', function () {
                $('.filterSlider').hide("slide", { direction: "right" }, 500);
                $('body').find('.filter-overlay').remove();
            });

            $(options.closeButton).off('click').on('click', function () {
                $('.filterSlider').hide("slide", { direction: "right" }, 500);
                $('body').find('.filter-overlay').remove();
            });
            $('#btnSearchArticle').off('click').on('click', function () {
                filter.rerurnValue.Keywords = $('#txtSearchKeywords').val();
                if ($('#lscFltrEditor').length > 0)
                    filter.rerurnValue.Editor = $('#lscFltrEditor').val();
                if ($('#lscFltrReporter').length > 0)
                    filter.rerurnValue.Reporter = $('#lscFltrReporter').val();
                filter.rerurnValue.StateIDs = $('#slcfltrStates').val();
                filter.rerurnValue.DateFrom = $('#fltrDateFrom').val();
                filter.rerurnValue.DateTo = $('#fltrDateTo').val();
                var catxml = '<category>';
                $('.fltrCatLst .cat').each(function (i, v) {
                    var $chkBox = $(this);
                    if ($chkBox.prop('checked')) {
                        catxml += '<catid>' + $chkBox.attr('data-catid') + '</catid>'
                    }

                });
                catxml += '</category>';

                if (catxml.length > 21)
                    filter.rerurnValue.CategoryIDs = catxml;
                else
                    filter.rerurnValue.CategoryIDs = ''
                var TypeXml = '<types>';
                $('.fltrArtTyp .type').each(function (i, v) {
                    var $chkBox = $(this);
                    if ($chkBox.prop('checked')) {
                        TypeXml += '<typid>' + $chkBox.attr('data-typeid') + '</typid>'
                    }
                });
                TypeXml += '</types>';
                if (TypeXml.length > 15)
                    filter.rerurnValue.ArticleTypeIDs = TypeXml;
                else
                    filter.rerurnValue.ArticleTypeIDs = ''

                if (typeof (options.searchCall) == "function") {
                    options.searchCall(filter.rerurnValue);
                }
            });
            $('#btnResetSearchArticle').off('click').on('click', function () {
                $('#txtSearchKeywords').val('');
                $('#lscFltrEditor').val('');
                $('#lscFltrReporter').val('');
                $('#slcfltrStates').val('0');
                $('.fltrArtTyp .type').prop('checked', false);
                $('.fltrCatLst .cat').prop('checked', false);
                $('#fltrDateFrom').val('');
                $('#fltrDateTo').val('');
                filter.rerurnValue.Keywords = '';
                filter.rerurnValue.Editor = '';
                filter.rerurnValue.Reporter = '';
                filter.rerurnValue.StateIDs = 0
                filter.rerurnValue.ArticleTypeIDs = '';
                filter.rerurnValue.CategoryIDs = '';
                filter.rerurnValue.DateFrom = '';
                filter.rerurnValue.DateTo = '';
                filter.rerurnValue.Location = '';
                $('#fltrDateTo').removeClass('hasDatepicker');
                $('#fltrDateTo').datepicker();
                if (typeof (options.resetCall) == "function") {
                    options.resetCall(filter.rerurnValue);
                }
            });

        },
        ajaxCall: function (config) {
            $.ajax({
                type: config.type,
                contentType: config.contentType,
                cache: config.cache,
                async: config.async,
                url: config.baseURL + "/" + config.method,
                data: config.data,
                dataType: config.dataType,
                success: config.ajaxSuccess,
                error: filter.ajaxFailure,
            });
        },
        ajaxFailure: function () {
            alert("Server Error.", "Error");
        },
    }
    filter.init();
}
var ArticleSetting = {};
if (typeof (ArticleMasterSettings) == 'undefined')
    var ArticleMasterSettings = null;
(function () {
    if (ArticleMasterSettings == null) {
        ArticleMasterSettings = {
            dateSetting: "DD, dd MM, yy ",
            nameSetting: "1",
            detailPageSetting: ""
        };
    }
    ArticleSetting = {
        ChangeDateFormat: function (date) {
            var date = $.datepicker.formatDate(ArticleMasterSettings.dateSetting, new Date(date));
            return date;
        },

        ChangeAuthorNameFormat: function (authorName) {
            var authorName = authorName.split(',');
            var name = "";
            var newAuthName = [];
            var condition = parseInt(ArticleMasterSettings.nameSetting);
            switch (condition) {
                case 0:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[0] + " " + name[1];
                            newAuthName.push(name);
                        });
                    }
                    break;
                case 1:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[1] + " " + name[0];
                            newAuthName.push(name);
                        });
                    }
                    break;
                default:
                    if (authorName != null) {
                        $.each(authorName, function (key, value) {
                            name = value.split('#');
                            name = name[0] + " " + name[1];
                            newAuthName.push(name);
                        });
                    }
                    break;
            }
            return newAuthName.join();
        },
        AuthorProfileLink: function (userName) {
            return SageFrameHostURL + "/" + ArticleMasterSettings.authorProfilePage + "/author/" + userName;
        },
        GetDetailsURL: function (articleID, title) {
            var slug = ArticleSetting.stringToSlug(title);
            var url = SageFrameHostURL + '/' + ArticleMasterSettings.detailPageSetting + '/article/' + articleID + '/' + slug;
            return url;
        },

        stringToSlug: function (title) {
            return title.toLowerCase().trim()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/&/g, '-and-')         // Replace & with 'and'
                .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'‘’<>,.\/? ])+/g, '-') // Replace sepcial character with -
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        }
    }

})();

// workflow management
$.fn.GetDynamicButton = function (options) {

    var $container = $(this);
    options = $.extend({
        stateID: 0,
        onClick: function (outStateID, IsActivityMessage) {
        },
    }, options);
    var len = CurrentWorkFlow.length;
    var BtnHtml = '';
    for (i = 0; i < len; i++) {
        if (options.stateID == CurrentWorkFlow[i].input) {
            $.each(CurrentWorkFlow[i].output, function (i, item) {
                BtnHtml += '<button type="button" class="btnWorkflowAction sfBtn ' + item.cssClass + ' ' + item.icon + '" data-activitymessage="' + item.isActivityMessage + '" data-outstate="' + item.outState + '">' + item.taskName + '</button>';
            });
            break;
        }
    }
    $container.html(BtnHtml);
    $container.off('click').on('click', '.btnWorkflowAction', function () {
        var $thisBtn = $(this);
        if (typeof (options.onClick) == 'function')
            options.onClick($thisBtn.attr('data-outstate'), $thisBtn.attr('data-activitymessage').toLowerCase());
    });
}




//ActivityLog
var ArticleActivity = {};
(function () {
    ArticleActivity = {
        config: {
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            method: "",
            url: "",
            ajaxSuccess: '',
            baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/services/ArticleCommonServices.asmx',
        },
        auth: {
            UserModuleID: '',
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        },
        GetArticleActivity: function (articleID, userModuleID, containerDiv) {
            ArticleActivity.auth.UserModuleID = userModuleID;
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                cache: false,
                async: false,
                url: SageFrameAppPath + '/Modules/ArticleAdmin/services/ArticleCommonServices.asmx/' + 'GetAllActivityLog',
                data: JSON.stringify({
                    objAuth: ArticleActivity.auth,
                    ArticleID: articleID
                }),
                dataType: 'json',
                success: function (data) {
                    if (data.d != null) {
                        data = data.d;
                        var html = '';
                        if (data.length > 0) {
                            html += '<div class="sfFieldset "><span class="formKey textType"><span class="sfFormLabel">Activity Log</span></span>';
                            html += '<div class="sfFormValue activitywrap_log">';


                            $.each(data, function (index, item) {
                                html += '<div class="activitywrap_log_listing ' + item.StateClass + ' ">';
                                // html += '<div class="activityLogDate">' + ArticleSetting.ChangeDateFormat(item.ActivityDate) + '</div>';
                                var DateWhole = $.datepicker.formatDate('yy-M-dd', new Date(item.ActivityDate));
                                DateWhole = DateWhole.split('-');
                                html += '<div class="activityLogDate">';


                                html += '<span class=article-day>' + DateWhole[2] + '</span>';
                                html += '<span class=article-mth>' + DateWhole[1] + '</span>';
                                html += '<span class=article-year>' + DateWhole[0] + '</span>';
                                html += '</div>';

                                html += '<div class="activityState statusnews ' + item.StateClass + '">' + item.State + '</div>';
                                html += '<div class="activityRemarks">';
                                html += '<div class="activityMessage">' + item.Message + '</div>';
                                html += '<div class="activityauthor icon-roles">' + ArticleSetting.ChangeAuthorNameFormat(item.AddedBy) + '</div>';
                                html += '</div>';
                                html += '</div>';
                            });
                            html += '</div>';
                            html += '</div>';
                        }
                        containerDiv.html(html);

                    }
                },
                error: function (data) {

                },
                complete: function () {

                }
            });
        }

    }

})();

$.fn.createSlideDownForm = function (options) {
    var $this = $(this);
    $this.addClass('slidedownForm')

    $this.hide();
    options = $.extend({
        title: 'Side Form',
        openButton: '',
        closeButton: '',
    }, options);

    var header = '<div class="slidedown_header">';
    header += '<div class="slidedown_header_title">';
    header += '<h4>' + options.title + '<span><i class="closesidedownform fa fa-times"></i></span></h4></div></div>';
    var fBody = '<div class="slidedown_body">'
    fBody += '<div class="slidedown_body_container">';
    fBody += $this.html();
    fBody += '</div></div>';
    fBody = header + fBody;
    $this.html(fBody);
    $(options.openButton).off('click').on('click', function () {
        $this.show("slide", { direction: "up" }, 500);
        $('.main-one-col').append('<div class="slidedown-overlay"></div>');

        $('.slidedown-overlay').off('click').on('click', function () {
            $('.slidedownForm').hide("slide", { direction: "up" }, 500);
            $(this).remove();
        });
    });

    $this.find('.closesidedownform').off('click').on('click', function () {
        $('.slidedownForm').hide("slide", { direction: "up" }, 500);
        $('.main-one-col').find('.slidedown-overlay').remove();
    });
    $(options.closeButton).off('click').on('click', function () {
        $('.slidedownForm').hide("slide", { direction: "up" }, 500);
        $('.main-one-col').find('.slidedown-overlay').remove();
    });
}



//VersionLog
var ArticleVersion = {};
(function () {
    ArticleVersion = {
        config: {
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            method: "",
            url: "",
            ajaxSuccess: '',
            baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/services/ArticleCommonServices.asmx',
        },
        auth: {
            UserModuleID: '',
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        },

        GetArticleVersion: function (articleID, userModuleID, containerDiv, OpenButton, CloseButton) {
            ArticleVersion.auth.UserModuleID = userModuleID;
            this.config.baseURL = SageFrameAppPath + '/Modules/ArticleAdmin/services/ArticleCommonServices.asmx',
            this.config.method = 'GetAllActivityVersionLog';
            this.config.data = JSON.stringify({
                objAuth: ArticleVersion.auth,
                ArticleID: articleID
            });
            this.config.ajaxSuccess = BindLogvalue;
            this.ajaxCall(this.config);
            function BindLogvalue(data) {
                if (data.d != null) {
                    data = data.d;
                    var html = '';
                    html += '<div id="versionGridWrapper"  class="versionwrapper">';
                    html += '<div class="data-views clearfix">';
                    html += '<div class="sfGridwrapper">';
                    html += '<div class="grid_header">';
                    html += '<div class="grid_header--detail">Detail</div>';
                    html += '<div class="grid_header--status">Status</div>';
                    html += '<div class="grid_header--action">Action</div>';
                    //html + '</div>';
                    html += '</div>';//grid_header
                    html += '<div id="ArticleList" >';
                    if (data.length > 0) {
                        $.each(data, function (index, item) {
                            html += '<div class="grid_listing clearfix">';
                            html += '<div class="grid_summary">';
                            html += '<div class="grid_summary_detail">';
                            html += '<div class="grid_detail_title grid_detail_title--large ">' + item.Message + '</div>';
                            // html += '<div class="grid_detail_newsfeature"><small class="grid_detail_newsfeature_type"><small class="grid_detail_newsfeature_editor"><strong>Title:</strong>' + item.Title + '</small></div>';
                            html += '<div class="grid_detail_newsproperties"><small class="grid_detail_newsproperties_reporter_date"><i class="fa fa-calendar"></i>' + ArticleSetting.ChangeDateFormat(item.AddedOn) + '</small><small class="grid_detail_newsproperties_reporter_category"><strong>Logged By:</strong> ' + ArticleSetting.ChangeAuthorNameFormat(item.AddedBy) + '</small></div>';
                            html += '</div>';//grid_summary_detail
                            html += '<div class="grid_status" data-stateid="' + item.StateID + '"><span class="statusnews ' + item.StateClass + '">' + item.State + '</span></div>';
                            html += '<div class="grid_action">';
                            html += '<p class="actionclass">';
                            html += '<a class="action-view-dtls viewDetails" data-articleid="' + item.ArticleID + '" title="View Details" href="Javascript:void(0)"><i class="fa fa-eye"></i></a>';
                            html += '</p>';

                            html += '</div>';

                            html += '</div>';//grid_summary
                            html += '</div>';//grid_listing clearfix                              
                        });
                    }
                    else {
                        html = '<div class="text-align-center no-version"><h3>  No Version Log to display <h3></div>';
                    }
                    html += '</div>';
                    html += '</div>';//sfGridwrapper
                    html += '</div>';
                    html += '</div>';//versionwrapper

                    //version view section
                    html += '<div id="divVersionLogDetails" class="versionviewwrapper" style="display: none;">';
                    html += '<div  class="sfFormwrapper activeFormReporter">';
                    html += '<div class="sfFieldset rTitle" style="">';
                    html += '<span class="formKey textType">';
                    html += '<span class="sfFormLabel">Title</span>';
                    html += '</span>';
                    html += '<span class="formValue">';
                    html += '<input type="text" class="sfInputbox required" name="Title" id="txtTitleV" readonly="readonly" aria-required="true">';
                    html += '</span>';
                    html += '</div>';// fieldset close
                    html += '<div class="sfFieldset rSummary">';
                    html += '<span class="formKey textType">';
                    html += '<span class="sfFormLabel">Summary</span>';
                    html += '</span>';
                    html += '<span class="formValue ">';
                    html += '<textarea id="txtSummaryV" maxlength="500" readonly="readonly"></textarea>';
                    html += '</span>';
                    html += '</div>'; // fieldset close

                    html += '<div class="sfFieldset rDetail">';
                    html += '<span class="formKey textType">';
                    html += '<span class="sfFormLabel">Detail</span>';
                    html += '<span id="detaisTextWrap" style="display:none" class="formValue">';
                    html += '<textarea id="txtArticleVersionDetails"  readonly="readonly"></textarea>';
                    html += '</span>';
                    html += '</div>'// fieldset close
                    html += '<div  id="divEditorDetails" style="display:none" class="sfFieldset rDetail">';
                    html += '<div  class="class="edit-area site-body version-log-view">';
                    html += '<div  id="divDetailV" class="editor-componentWrapper"></div>'
                    html += '</div>';
                    html += '</div>';// fieldset close
                    html += '</div>';// form wrappper close
                    html += '<div class="sfButtonwrapper versionCancel">';
                    html += '<a class="sfBtn smlbtn-default icon-back" id="btnCancelVersion">Back</a>';
                    html += '</div>';
                    html += '</div>';//versionviewwrapper
                    containerDiv.html(html);

                    containerDiv.createSlideDownForm(
                       {
                           title: 'Article Version Log',
                           openButton: OpenButton,
                           closeButton: CloseButton,
                       });
                    $('.versionviewwrapper').hide();

                    containerDiv.find('.viewDetails').off().on('click', function () {
                        var articleID = $(this).attr('data-articleid');
                        GetAllDataByID(articleID);
                    });
                    containerDiv.find('#btnCancelVersion').off().on('click', function () {
                        $('#versionGridWrapper').show();
                        $('#divVersionLogDetails').hide();
                    });
                }
            }
            function GetAllDataByID(articleID) {
                ArticleVersion.config.method = "GetAllDataByIDForVersion";
                ArticleVersion.config.data = JSON.stringify({
                    objAuth: ArticleVersion.auth,
                    ArticleID: parseInt(articleID),
                });
                ArticleVersion.config.ajaxSuccess = BindFormByID;
                ArticleVersion.ajaxCall(ArticleVersion.config);
            }
            function BindFormByID(data) {
                $('#versionGridWrapper').hide();
                $('#divVersionLogDetails').show();
                data = data.d;
                data = JSON.parse(data);
                var Article = data.Article[0];

                $('#txtTitleV').val(Article.Title);
                $('#txtSummaryV').val(Article.Summary);
                if (Article.DetailsViewDOM == null) {
                    $('#txtArticleVersionDetails').val(Article.Detail);
                    $('#divEditorDetails').hide();
                    $('#detaisTextWrap').show();
                }
                else {
                    $('#divDetailV').html(Article.DetailsViewDOM);
                    $('#divDetailV').html($('#divDetailV').html());
                    $('#divEditorDetails').show();
                    $('#detaisTextWrap').hide();
                }
            }
        },
        ajaxCall: function (config) {
            $.ajax({
                type: config.type,
                contentType: config.contentType,
                cache: config.cache,
                async: config.async,
                url: config.baseURL + "/" + config.method,
                data: config.data,
                dataType: config.dataType,
                success: config.ajaxSuccess,
                error: ArticleVersion.ajaxFailure,
            });
        },
        ajaxSuccess: function (data) {

        },
        ajaxFailure: function () {

        },
    }
})();
$.fn.makeSimpleModel = function (options) {
    if ($('body').find('#simplePopUpContainer').length == 0)
        $('body').append('<div id="simplePopUpContainer"></div>')
    var $this = $('#simplePopUpContainer');
    $this.hide();
    $this.addClass('popupfullpage');
    options = $.extend({
        title: 'Model',
        openButton: '',
        openInCall: true,
        width: "90%",
        height: "90%",
        contentHtml: '',
        afterAppend: ''
    }, options);

    var popHtml = '<div class="popupfullpage_model">';
    popHtml += '<div class="popupfullpage_model_header">';
    popHtml += '<span class="header_title">';
    popHtml += options.title;
    popHtml += '</span>';
    popHtml += '<span class=" f-right fullpage-close-model"><i class="fa fa-times"></i></span>';
    popHtml += '</div>';
    popHtml += '<div class="popupfullpage_model_body">';
    popHtml += options.contentHtml;
    popHtml += '</div></div>';
    $this.html(popHtml);
    $this.find('.popupfullpage_model').css('width', options.width);
    $this.find('.popupfullpage_model').css('height', options.height);


    $this.find('.fullpage-close-model').off('click').on('click', function () {
        $this.hide();
    });
    if (options.openInCall == '' || options.openInCall)
        $this.show();
    if (typeof (options.afterAppend) == 'function') {
        options.afterAppend($this);
    }
};