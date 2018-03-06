(function ($) {
    $.ArticlePublisher = function (p) {
        p = $.extend
                ({
                    userModuleID: '1',
                    roleID: '',
                    siteID: 0
                }, p);
        var validator;

        var auth = {
            UserModuleID: p.userModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        }
        var CacheArticle = {
            Article: null,
            Media: null,
            Categories: null,
            Authors: null,
            ArticleTypes: null,
            ExternalLinks: null
        }
        var PublishMgr = {
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
                articleID: 0,
                outStateID: '',
                offset: 0,
                limit: 10,
                current: 0,
                baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/Publisher/services/ArticlePublisherServices.asmx',
            },
            init: function () {

                if (typeof (CurrentWorkFlow) != 'undefined' && CurrentWorkFlow.length > 0) {
                    PublishMgr.GetAllArticle(0, PublishMgr.config.limit, 0);
                    $('#divEditorFilter').createCommonArticleFilter({
                        openButton: $('#btnOpenFilter'),
                        closeButton: $('#btnCloseFilter'),
                        filterFor: 'publisher',
                        roleID: p.roleID,
                        userModuleID: p.userModuleID,
                        searchCall: PublishMgr.FiterArticle,
                        resetCall: PublishMgr.ResetFiterArticle,
                    });
                    PublishMgr.UIEvents();
                } else {
                    SageFrame.messaging.show("Current user role is not assign in workflow. So you cannot use article publish feature", "Alert");
                    $('#PublisherGrid').html('');
                }
            },
            filterInfo: {
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
            UIEvents: function () {
                $('#btnCancelArticle').off('click').on('click', function () {
                    $('#PublisherGrid').show();
                    $('#PublisherForm').hide();
                    PublishMgr.ClearForm();
                });
                $('#divLogMessageWrap').createSideBarForm({
                    title: 'Activity Message',
                    openButton: $('#btnOpenActivityMsg'),
                    closeButton: $('#btnCloseForm'),
                });
                $('#btnDoneEdit').off().on('click', function () {
                    if (validator.form()) {
                        PublishMgr.UpdateArticle();
                    }
                });
                $('#divArtileList').off().on('click', '.actionLinkClass', function () {
                    $('.actiononClickShow').hide(50);
                    var $this = $(this);
                    $this.prev('.actiononClickShow').show(50);
                });
                $('#divArtileList').on('click', '.actiononClickShow a', function () {
                    var $this = $(this);
                    var ID = $this.attr('data-id');
                    var action = $this.attr('data-action');
                    switch (action) {
                        case 'view':
                            PublishMgr.GetArticleByID(ID);
                            break;
                        case 'delete':
                            PublishMgr.DeleteArticleByID(ID);
                            break;
                    }
                });

                $('#divArtileList div').not('.actiononClickShow').on('click', function () {
                    $('.actiononClickShow').hide(50);
                });
            },
            ManageDynamicBtn: function (stateID) {
                $('#divEditActionButton').GetDynamicButton({
                    stateID: stateID,
                    onClick: function (outStateID, IsActivityMessage) {
                        PublishMgr.config.outStateID = outStateID;
                        if (IsActivityMessage == 'true') {
                            $('#btnOpenActivityMsg').trigger('click');
                        }
                        else {
                            PublishMgr.UpdateArticle();
                        }
                    }
                })
            },
            FiterArticle: function (returnValue) {
                PublishMgr.filterInfo = returnValue;
                PublishMgr.GetAllArticle(0, PublishMgr.config.limit, 0);
            },
            ResetFiterArticle: function (returnValue) {
                PublishMgr.filterInfo = returnValue;
                PublishMgr.GetAllArticle(0, PublishMgr.config.limit, 0);
            },
            DeleteArticleByID: function (id) {
                // console.log(id);
            },
            ClearForm: function () {
                PublishMgr.config.articleID = 0;
                PublishMgr.config.outStateID = 0;
                $('#txtLogMessage').val('');
                $('#divArticleActivity').html('');
                $('#divArticleDetails').html('');
                validator.resetForm();
            },
            GetAllArticle: function (offset, limit, current) {
                PublishMgr.config.offset = limit * current;
                PublishMgr.config.current = current;

                PublishMgr.config.method = "GetAllArticleForAdmin";
                PublishMgr.config.data = JSON2.stringify({
                    auth: auth,
                    filterObject: PublishMgr.filterInfo,
                    offset: PublishMgr.config.offset,
                    limit: limit,
                    isBlog: false,
                    roleID: p.roleID,
                    siteID: p.siteID
                });

                PublishMgr.config.ajaxSuccess = PublishMgr.BindArticleList;
                PublishMgr.ajaxCall(PublishMgr.config)
            },
            BindArticleList: function (data) {
                data = data.d;
                var html = '';
                var RowTotal = 0;
                if (data.length > 0) {
                    RowTotal = data[0].TotalRow;
                    $.each(data, function (index, item) {
                        if (item.Author != null)
                            item.Author = ArticleSetting.ChangeAuthorNameFormat(item.Author)
                        if (item.IsCustomReport)
                            item.Author = item.CustomReport;
                        html += '<div class="grid_listing clearfix">';
                        html += '<div class="grid_summary">';
                        html += '<div class="grid_selectors no-chkbx"></div>';
                        html += '<div class="grid_summary_detail">';
                        html += '<div class="grid_detail_title grid_detail_title--large ">';
                        html += item.Title;
                        html += '</div>';
                        html += '<div class="grid_detail_newsfeature">';
                        html += '<small class="grid_detail_newsfeature_type"><strong>Type:</strong>' + item.ArticleTypes + '</small>';
                        //html += '<small class="grid_detail_newsfeature_editor"><strong>Editor:</strong>' + item.AssignTo + '</small>';
                        html += '</div>';
                        html += '<div class="grid_detail_newsproperties">';
                        html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>'+ item.Author + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_date"><i class="fa fa-calendar"></i>' + ArticleSetting.ChangeDateFormat(item.AddedOn) + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_category"><strong>Category:</strong>' + item.CategoryName + '</small>';
                        html += '</div>';


                        html += '</div>';//grid_summary_detail

                        html += '<div class="grid_status" data-stateid=' + item.StateID + '><span class="statusnews ' + item.StateClass + ' ">' + item.State + '</span></div>';

                        html += '<div class="grid_action">';
                        html += '<div  class="actiononClickShow" style="display: none; ">';
                        html += '<div class="actiononClickShowInfo">';
                        html += '<p><a data-id="' + item.ArticleID + '" href="Javascript:void(0)" data-action="view" class="view">View</a>';
                        // html += '<a data-id="' + item.ArticleID + '" href="Javascript:void(0)" data-action="delete" class="delete">Delete</a></p>';
                        html += '</div></div>';
                        html += '<p class="actionclass actionLinkClass" >';
                        html += '<a href="Javascript:void(0)"><i class="fa fa-ellipsis-v"></i></a>';
                        html += '</p>';
                        html += '</div>';//grid_action
                        html += '</div>';
                        html += '</div>';
                    });
                } else {
                    html = '<div class="noData"><h3> No data to display<h3></div>';
                }

                $('#divArtileList').html(html);
                PublishMgr.BindPagination(RowTotal);
            },
            BindPagination: function (RowTotal) {
                // console.log(totalItem);
                if (RowTotal > PublishMgr.config.limit) {
                    $('#divArticlePg').show().pagination(RowTotal, {
                        items_per_page: PublishMgr.config.limit,
                        current_page: PublishMgr.config.current,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: PublishMgr.GetAllArticle,
                            limit: PublishMgr.config.limit,
                        },
                        prev_text: false,
                        next_text: false
                    });
                } else {
                    $('#divArticlePg').hide();
                }
            },
            GetArticleByID: function (articleID) {
                PublishMgr.config.method = "GetArticleViewByID";
                PublishMgr.config.data = JSON2.stringify({
                    auth: auth,
                    articleID: articleID,
                });
                PublishMgr.config.ajaxSuccess = PublishMgr.BindArticleToForm;
                PublishMgr.ajaxCall(PublishMgr.config)
                ArticleActivity.GetArticleActivity(articleID, p.userModuleID, $('#divArticleActivity'))
                ArticleVersion.GetArticleVersion(articleID, p.userModuleID, $('#ArticleVersionLog'), $('.versionlog'), '')
            },

            BindArticleToForm: function (data) {
                data = data.d;
                if (data != null) {
                    PublishMgr.ClearForm();
                    PublishMgr.config.articleID = data.ArticleID;
                    PublishMgr.ManageDynamicBtn(data.StateID);
                    $('#txtArticleTitle').val(data.Title);
                    $('#txtArticleSummary').val(data.Summary);
                    //var $body = $('#IfArticleViewDetails').contents().find('body')
                    data.DetailsViewDOM = '<div class="edit-area site-body" data-settings=""><div class="editor-componentWrapper">' + data.DetailsViewDOM + '</div></div>'
                    // $body.html(data.DetailsViewDOM);
                    $('#ArticleViewDetails').html(data.DetailsViewDOM);
                    $('#PublisherGrid').hide();
                    $('#PublisherForm').show();
                }
            },
            UpdateArticle: function () {
                PublishMgr.config.method = "UpdateArticle";
                PublishMgr.config.data = JSON2.stringify({
                    auth: auth,
                    articleID: PublishMgr.config.articleID,
                    stateID: PublishMgr.config.outStateID,
                    message: $('#txtLogMessage').val(),
                    roleID: p.roleID
                });
                PublishMgr.config.ajaxSuccess = PublishMgr.AddUpdateSuccess;
                PublishMgr.ajaxCall(PublishMgr.config)

            },
            AddUpdateSuccess: function (data) {
                if (data.d == 1) {
                    $('#PublisherGrid').show();
                    $('#PublisherForm').hide();
                    PublishMgr.GetAllArticle(0, PublishMgr.config.limit, 0);
                    SageFrame.messaging.show("Article Saved Successfully.", "Success");
                } else if (data.d == 2) {
                    $('#PublisherGrid').show();
                    $('#PublisherForm').hide();
                    PublishMgr.GetAllArticle(PublishMgr.config.offset, PublishMgr.config.limit, PublishMgr.config.current);
                    SageFrame.messaging.show("Article Updated Successfully.", "Success");
                } else {
                    SageFrame.messaging.show("Authorization Error.", "Alert");
                }
                $('#btnCloseForm').trigger('click');
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
                    error: PublishMgr.ajaxFailure,
                });
            },
            ajaxFailure: function () {
                SageFrame.messaging.show("Server Error.", "Error");
            },
        }
        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {
                AtivityMessage: {
                    required: true,
                }
            },
            messages: {

                AtivityMessage: {
                    required: "* Required",
                }

            }
        });
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        String.prototype.replaceAt = function (index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        };

        PublishMgr.init();
    }
    $.fn.CreateArticlePublisher = function (p) {
        $.ArticlePublisher(p);
    };
})(jQuery);




