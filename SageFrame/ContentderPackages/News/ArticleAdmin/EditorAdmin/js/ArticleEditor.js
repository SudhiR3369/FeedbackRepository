var CacheArticle = null;
(function ($) {
    CacheArticle = {
        Article: null,
        Media: null,
        Categories: null,
        Authors: null,
        ArticleTypes: null,
        ExternalLinks: null
    }
    $.ArticleEditor = function (p) {
        p = $.extend
                ({
                    userModuleID: '1',
                    roleID: '',
                    siteID: 0
                }, p);
        var validator;
        var editHtml = '';
        var viewHtml = '';
        var IsFlashType;
        var auth = {
            UserModuleID: p.userModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        }

        var EditorMgr = {
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
                templateLimit: 4,
                current: 0,
                baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/EditorAdmin/services/ArticleEditorServices.asmx',
            },
            init: function () {

                if (typeof (CurrentWorkFlow) != 'undefined' && CurrentWorkFlow.length > 0) {
                    EditorMgr.GetAllArticle(0, EditorMgr.config.limit, 0);
                    $('#divEditorFilter').createCommonArticleFilter({
                        openButton: $('#btnOpenFilter'),
                        closeButton: $('#btnCloseFilter'),
                        filterFor: 'editor',
                        roleID: p.roleID,
                        siteID: p.siteID,
                        userModuleID: p.userModuleID,
                        searchCall: EditorMgr.FiterArticle,
                        resetCall: EditorMgr.ResetFiterArticle,
                    });
                    EditorMgr.UIEvents();
                } else {
                    SageFrame.messaging.show("Current user role is not assign in workflow. So you cannot use article editing feature", "Alert");
                    $('#editorGrid').html('');
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
                //$('body').not('.actionLinkClass').on('click', function () {
                //    $('.actiononClickShow').hide(50);
                //});
                $('#chkNewsSource').off('change').on('change', function () {
                    if ($(this).prop('checked')) {
                        $('#txtArticleSource').css('display', 'block');
                    }
                    else {
                        $('#txtArticleSource').val('');
                        $('#txtArticleSource').hide();
                    }
                });

                $('#btnChangeDtlTemp').off('click').on('click', function () {
                    $('#simplePopUpContainer').attr('data-modelopen', false);
                    $('#simplePopUpContainer').attr('data-pagenum', 0);
                    EditorMgr.GetCompTempList(0);

                });

                $('#divArticleAssets').off('click').on('click', '.asTitle', function () {
                    $('#divArticleAssets').find('.assetsItem.active .asContain').slideUp(500);
                    $('#divArticleAssets').find('.assetsItem').removeClass('active');
                    var $this = $(this);
                    if ($this.next('.asContain').is(":hidden")) {
                        $this.parent().addClass('active');
                        $this.next('.asContain').slideDown(500);
                    }

                });
                $('#btnAddNewArticle').off('click').on('click', function () {
                    $('#editorGrid').hide();
                    $('#editorForm').show();
                    EditorMgr.ClearEditor();
                    $('#btnBrowseMedia').show();
                    $('#txtImageValidation').show();
                    EditorMgr.ManageDynamicBtn(1);
                    var EditDom = $('#dhnDefaultTemplateEditDom').html();

                    $('#TemplateEditorBody').html(EditDom);
                    $('#TemplateEditorBody').find('.change-image-settings').show();
                    $('#TemplateEditorBody').find('.article-editor-col').addClass('editor-col');
                    $('#TemplateEditorBody').find('.editor-col').removeClass('article-editor-col');
                    InvokeWebbuiilder();
                });
                $('#btnCancelArticle').off('click').on('click', function () {
                    $('#editorGrid').show();

                    $('#editorForm').hide();
                    EditorMgr.ClearEditor();
                });
                $('#divLogMessageWrap').createSideBarForm({
                    title: 'Activity Message',
                    openButton: $('#btnOpenActivityMsg'),
                    closeButton: $('#btnCloseForm'),
                });
                $('#btnDoneEdit').off().on('click', function () {
                    if (validator.form()) {
                        EditorMgr.GetDetailsFromEditor();
                        if (editHtml == '' || viewHtml == '') {
                            editHtml = '';
                            viewHtml = '';
                            SageFrame.messaging.show("Article Details is required.", "Alert");
                        } else {
                            EditorMgr.AddUpdateEditedArticle();
                        }
                    }
                });
                $('#divEditorArtileList').off().on('click', '.actionLinkClass', function () {

                    var $actionShow = $(this).prev('.actiononClickShow');
                    $('.actiononClickShow').not($actionShow).hide();
                    if ($actionShow.css("display") == "none")
                        $actionShow.show(50);
                    else
                        $actionShow.hide(50);

                });

                $('#divEditorArtileList').on('click', '.actiononClickShow a', function () {
                    var $this = $(this);
                    var ID = $this.attr('data-id');
                    var action = $this.attr('data-action');
                    switch (action) {
                        case 'edit':
                            EditorMgr.GetArticleByID(ID);
                            break;
                        case 'delete':
                            EditorMgr.DeleteArticleByID(ID);
                            break;
                    }
                });



                $('#divArticleImages').off('click').on('click', '.setDefaultImage', function () {
                    $('#divArticleImages').find('.item-thumb').removeClass('img-default');
                    var $this = $(this);
                    $this.parent().addClass('img-default');
                });
                $('#btnBrowseMedia').off().on('click', function () {
                    $('#btnBrowseMedia').SageMedia({
                        userModuleID: webBuilderUserModuleID,
                        onSelect: function (src, response, type, filename, extension) {
                            var imghtml = '';
                            imghtml += '<div class="item-thumb news-images img-default">'
                            imghtml += '<img data-type="image"   src="' + src + '" />'
                            imghtml += '<a href="javascript:void(0)"  class="setDefaultImage"  title="Set Default Image For Listing"></a>'
                            imghtml += '</div>'
                            $('#txtImageValidation').val(src);
                            $('#txtImageValidation').focusin();
                            $('#txtImageValidation').focusout();
                            $('#divArticleImages').html(imghtml).show();
                        },
                        mediaType: 'image'

                    });
                });
                $('#articleCategoryList').off('click').on('click', '.article-cat', function () {
                    var categories = $('#articleCategoryList .article-cat:checked').map(function () { return $(this).next('label').text(); }).get().join(', ');
                    if (categories == '')
                        $('#txtCategoryValidate').val('');
                    else
                        $('#txtCategoryValidate').val('cat present');
                    $('#txtCategoryValidate').focusin();
                    $('#txtCategoryValidate').focusout();
                    $('#divWebuilder').find('.editor-para.article-category').text(categories);
                });
                $('#txtArticleTitle').off('change').on('change', function () {
                    var val = $(this).val();
                    if (CacheArticle.Article != null) {
                        SageConfirmDialog('Set this title in details title? ').done(function () {
                            $('#divWebuilder').find('.comp-article-title .article-title').text(val);
                        });
                    } else {
                        $('#divWebuilder').find('.comp-article-title .article-title').text(val)
                    }
                });


            },

            ManageDynamicBtn: function (stateID) {
                $('#divEditActionButton').GetDynamicButton({
                    stateID: stateID,
                    onClick: function (outStateID, IsActivityMessage) {
                        EditorMgr.config.outStateID = outStateID;
                        if (validator.form()) {
                            if (IsActivityMessage == 'true') {
                                $('#btnOpenActivityMsg').trigger('click');
                            }
                            else {
                                EditorMgr.GetDetailsFromEditor();
                                if (editHtml == '' || viewHtml == '') {
                                    editHtml = '';
                                    viewHtml = '';
                                    SageFrame.messaging.show("Article Details is required.", "Alert");
                                } else {
                                    EditorMgr.AddUpdateEditedArticle();
                                }
                            }
                        }
                    }
                })
            },
            GetCompTempList: function (pageNum) {
                var offset = pageNum * EditorMgr.config.templateLimit;
                var objTempInfo = {
                    Title: '',
                    IsBlog: false,
                    IsSummary: false,
                    CategoryName: '',
                    LayoutType: ''
                };
                EditorMgr.config.method = "GetAllTemplate";
                EditorMgr.config.data = JSON2.stringify({
                    auth: auth,
                    filterInfo: objTempInfo,
                    offset: offset,
                    limit: EditorMgr.config.templateLimit,
                    siteID: p.siteID
                });
                EditorMgr.config.ajaxSuccess = EditorMgr.BindTemplateList;
                EditorMgr.ajaxCall(EditorMgr.config)
            },
            BindTemplateList: function (data) {

                data = data.d;
                var tempHtml = '';
                var tempWrap = ''
                var ReplcDom;
                var totalRow = 0;
                if (data.length > 0) {
                    totalRow = data[0].RowTotal;
                    tempWrap += '<div class="template-list--popuppreview"><div id="templatePrevList">';
                    $.each(data, function (index, item) {
                        tempHtml += '<div class="template-thumbnails  details-type">';
                        tempHtml += '<div class="themeData_title">';
                        tempHtml += '<h3>' + item.Title + '</h3>';
                        tempHtml += '</div>'
                        tempHtml += '<div class="template-viewdom">';
                        tempHtml += item.TemplateViewDom;
                        tempHtml += '</div>';
                        tempHtml += '<div style="display:none" class="template-dataframe">';
                        tempHtml += item.DataReplaceFrameDom;
                        tempHtml += '</div>';
                        tempHtml += '<div style="display:none" class="template-editdom">';
                        tempHtml += item.TemplateEditDOM;
                        tempHtml += '</div>';
                        tempHtml += '<div class="template-desc">';
                        tempHtml += '<div class="actions-wrap">';
                        tempHtml += '<a class="templateAction btn green-btn icon-view " data-templateid="' + item.TemplateID + '" data-action="usethis">Use This</a>';
                        tempHtml += '</div>';
                        tempHtml += '</div>';
                        tempHtml += '</div>';
                    });
                    tempWrap += tempHtml;
                    tempWrap += '</div><div class="sfButtonWrapper text-align-center"><button id="btnMoreTemplate" type="button" class="sfBtn sml-btn-primary">More</button></div></div>';

                }
                var option = {
                    title: 'Change Template',
                    openButton: '',
                    openInCall: true,
                    width: "90%",
                    height: "90%",
                    contentHtml: tempWrap,
                    afterAppend: function ($Parent) {
                        EditorMgr.TemplateDynamicEvent($Parent)
                    }
                };
                if ($('#simplePopUpContainer').attr('data-modelopen') == "true") {
                    $('#templatePrevList').append(tempHtml);
                    EditorMgr.TemplateDynamicEvent($('#simplePopUpContainer'));
                } else {
                    $('#simplePopUpContainer').makeSimpleModel(option);
                }

                var pgNum = $('#simplePopUpContainer').attr('data-pagenum');
                if (pgNum==1)
                    pgNum = 2;
                if (typeof pgNum == "undefined")
                    pgNum = 1;
                pgNum = parseInt(pgNum);
                if (totalRow > pgNum * EditorMgr.config.templateLimit)
                    $('#simplePopUpContainer').find("#btnMoreTemplate").show();
                else
                    $('#simplePopUpContainer').find("#btnMoreTemplate").hide();
            },
            TemplateDynamicEvent: function ($wrapper) {
                $wrapper.attr('data-modelopen', true);

                $wrapper.find("#btnMoreTemplate").off().on('click', function () {
                    var pgNum = $wrapper.attr('data-pagenum');
                    if (typeof pgNum == "undefined")
                        pgNum = 0;
                    pgNum = parseInt(pgNum) + 1;
                    $wrapper.attr('data-pagenum', pgNum);
                    EditorMgr.GetCompTempList(pgNum);

                });
                $wrapper.off().on('click', '.templateAction', function () {
                    var $this = $(this);
                    var ActionType = $this.attr('data-action');
                    var TemplateID = $this.attr('data-templateid');
                    var TempReplaceDom = $this.parents('.template-thumbnails').find('.template-dataframe').html();
                    var EditDom = $this.parents('.template-thumbnails').find('.template-editdom').html();
                    switch (ActionType) {
                        case "usethis":
                            $('.Layout.components-list').removeClass('activeAccordion');
                            if (CacheArticle.Article == null || CacheArticle.Article.AddedBy == SageFrameUserName) {
                                SageConfirmDialog('Your data will be lost. Are you sure to change template? ').done(function () {
                                    $('#TemplateEditorBody').html(EditDom);
                                    $('#TemplateEditorBody').find('.change-image-settings').show();
                                    $wrapper.find('.fullpage-close-model').trigger('click');
                                    $('#TemplateEditorBody').find('.article-editor-col').addClass('editor-col');
                                    $('#TemplateEditorBody').find('.editor-col').removeClass('article-editor-col');
                                    InvokeWebbuiilder();
                                });
                            } else {
                                SageConfirmDialog('Your changes data will be lost. Are you sure to change template? ').done(function () {
                                    EditorMgr.ParseArticleDetailsToTemplate(TempReplaceDom);
                                    $wrapper.find('.fullpage-close-model').trigger('click');
                                    $('#TemplateEditorBody').find('.article-editor-col').addClass('editor-col');
                                    $('#TemplateEditorBody').find('.editor-col').removeClass('article-editor-col');
                                    InvokeWebbuiilder();
                                });
                            }
                            break;
                    }
                });
            },

            FiterArticle: function (returnValue) {
                EditorMgr.filterInfo = returnValue;
                EditorMgr.GetAllArticle(0, EditorMgr.config.limit, 0);
            },
            ResetFiterArticle: function (returnValue) {
                EditorMgr.filterInfo = returnValue;
                EditorMgr.GetAllArticle(0, EditorMgr.config.limit, 0);
            },
            DeleteArticleByID: function (id) {
                SageConfirmDialog('Do you want to delete?').done(function () {
                    EditorMgr.config.method = "DeleteArticleByID";
                    EditorMgr.config.data = JSON2.stringify({
                        auth: auth,
                        articleID: id,
                        roleID: p.roleID
                    });
                    EditorMgr.config.ajaxSuccess = function (data) {
                        data = data.d;
                        if (data == 1) {
                            SageFrame.messaging.show("Article Deleted Successfully.", "Success");
                        }
                        else if (data == 2) {
                            SageFrame.messaging.show("You Cannot Delete This Article.", "Alert");
                        } else {
                            SageFrame.messaging.show("Authorization Error.", "Alert");
                        }
                        EditorMgr.GetAllArticle(0, EditorMgr.config.limit, 0);
                    };
                    EditorMgr.ajaxCall(EditorMgr.config)
                });
            },
            ClearEditor: function () {
                //manage assign type
                $('.Layout.components-list').removeClass('activeAccordion');
                if ($('#lstAsignType').find('li').length == 0) {
                    var html = ''
                    $('#divEditorFilter ').find('.fltrArtTyp li').each(function (i, v) {
                        var $this = $(this);
                        var id = $this.find('input').attr('data-typeid');
                        var eleId = 'editorAsign' + id
                        html += '<li>'
                        html += '<input class="asigntypes" type="checkbox" data-typeid="' + id + '" id="' + eleId + '" />';
                        html += '<label for="' + eleId + '">' + $this.find('label').text() + '</label>';
                        html += '</li>'
                    });
                    $('#lstAsignType').html(html)
                }
                $('.actiononClickShow').hide();
                //manage category
                if ($('#articleCategoryList').find('li').length == 0) {
                    var html = ''
                    $('#divEditorFilter').find('.fltrCatLst li').each(function (i, v) {
                        var $this = $(this);
                        var id = $this.find('input').attr('data-catid');
                        var eleId = 'editorCategory' + id
                        html += '<li>'
                        html += '<input class="article-cat" type="checkbox" data-catid="' + id + '" id="' + eleId + '" />';
                        html += '<label for="' + eleId + '">' + $this.find('label').text() + '</label>';
                        html += '</li>'
                    });
                    $('#articleCategoryList').html(html)
                }
                $('#txtCategoryValidate').val('');
                $('#articleCategoryList input').prop('checked', false);
                $('#txtImageValidation').val('').hide();
                $('#btnBrowseMedia').hide();
                $('#divArticleImages').hide();
                $('#divArticleAssets').html('');
                $('#lstAsignType input').prop('checked', false);
                $('#divArticleActivity').html('');
                $('#txtArticleTitle').val('');
                $('#txtArticleSummary').val('');
                $('#txtArticleSource').val('');
                $('#txtLogMessage').val('');
                editHtml = '';
                viewHtml = '';
                $('#TemplateEditorBody').html('');
                $('#divEditActionButton').html('');
                EditorMgr.config.operation = '',
                CacheArticle.Article = null,
                CacheArticle.Media = null,
                CacheArticle.Categories = null,
                CacheArticle.Authors = null,
                CacheArticle.ArticleTypes = null,
                CacheArticle.ExternalLinks = null
                EditorMgr.config.articleID = 0;
                validator.resetForm();
            },
            GetAllArticle: function (offset, limit, current) {
                EditorMgr.config.offset = limit * current;
                EditorMgr.config.current = current;
                EditorMgr.config.method = "GetAllArticleForAdmin";
                EditorMgr.config.data = JSON2.stringify({
                    auth: auth,
                    filterObject: EditorMgr.filterInfo,
                    offset: EditorMgr.config.offset,
                    limit: limit,
                    isBlog: false,
                    roleID: p.roleID,
                    siteID: p.siteID,
                    articleFor: 1
                });
                EditorMgr.config.ajaxSuccess = EditorMgr.BindArticleList;
                EditorMgr.ajaxCall(EditorMgr.config)
            },
            BindArticleList: function (data) {
                data = data.d;
                var html = '';
                var TotalRow;
                if (data.length > 0) {
                    TotalRow = data[0].TotalRow;
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

                        html += '<small class="grid_detail_newsproperties_reporter"><i class="fa fa-user"></i>' + item.Author + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_date"><i class="fa fa-calendar"></i>' + ArticleSetting.ChangeDateFormat(item.AddedOn) + '</small>';
                        html += '<small class="grid_detail_newsproperties_reporter_category"><strong>Category:</strong>' + item.CategoryName + '</small>';
                        html += '</div>';


                        html += '</div>';//grid_summary_detail

                        html += '<div class="grid_status" data-stateid=' + item.StateID + '><span class="statusnews ' + item.StateClass + ' ">' + item.State + '</span></div>';

                        html += '<div class="grid_action">';
                        html += '<div  class="actiononClickShow" style="display: none; ">';
                        html += '<div class="actiononClickShowInfo">';
                        html += '<p><a data-id="' + item.ArticleID + '" href="Javascript:void(0)" data-action="edit" class="edit">Edit</a>';
                        if (item.StateID == 11)
                            html += '<a data-id="' + item.ArticleID + '" href="Javascript:void(0)" data-action="delete" class="delete">Delete</a></p>';
                        html += '</div></div>';
                        html += '<p class="actionclass actionLinkClass" >';
                        html += '<a href="Javascript:void(0)"><i class="fa fa-ellipsis-v"></i></a>';
                        html += '</p>';
                        html += '</div>';//grid_action
                        html += '</div>';
                        html += '</div>';
                    });
                } else {
                    html = '<div class="noData text-align-center"><h3> No data to display<h3></div>';
                }

                $('#divEditorArtileList').html(html);
                EditorMgr.BindPagination(TotalRow);
            },
            BindPagination: function (RowTotal) {
                // console.log(totalItem);
                if (RowTotal > EditorMgr.config.limit) {
                    $('#divArticlePg').show().pagination(RowTotal, {
                        items_per_page: EditorMgr.config.limit,
                        current_page: EditorMgr.config.current,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: EditorMgr.GetAllArticle,
                            limit: EditorMgr.config.limit,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#divArticlePg').hide();
                }
            },
            GetArticleByID: function (articleID) {
                EditorMgr.config.method = "GetArticleNewsByIDForAdmin";
                EditorMgr.config.data = JSON2.stringify({
                    auth: auth,
                    articleID: articleID,
                });
                EditorMgr.config.ajaxSuccess = EditorMgr.BindArticleToForm;
                EditorMgr.ajaxCall(EditorMgr.config)
                ArticleActivity.GetArticleActivity(articleID, p.userModuleID, $('#divArticleActivity'))
                ArticleVersion.GetArticleVersion(articleID, p.userModuleID, $('#ArticleVersionLog'), $('.versionlog'), '')
            },

            BindArticleToForm: function (data) {
                data = data.d;
                if (data != null) {

                    EditorMgr.ClearEditor();
                    data = JSON.parse(data);
                    CacheArticle.Article = data.Article[0];
                    CacheArticle.Media = data.Media;
                    CacheArticle.Categories = data.Category;
                    CacheArticle.Authors = data.Author;
                    CacheArticle.ArticleTypes = data.ArticleTypes;
                    CacheArticle.ExternalLinks = data.ExternalLinks;
                    var article = CacheArticle.Article;
                    EditorMgr.config.articleID = article.ArticleID
                    EditorMgr.ManageDynamicBtn(article.StateID);
                    $('#txtArticleTitle').val(article.Title);
                    $('#txtArticleSummary').val(article.Summary);
                    if (article.AddedBy == SageFrameUserName) {
                        $('#btnBrowseMedia').show();
                        $('#txtImageValidation').val(CacheArticle.Media[0].FileName).show();;
                    }
                    var articleAssets = '';
                    var assetsItem = '';
                    var count = 0;
                    $.each(CacheArticle.Categories, function (i, v) {
                        $('#editorCategory' + v.CategoryID).prop('checked', true);
                    });
                    $('#txtCategoryValidate').val('cat-present');


                    $.each(CacheArticle.ArticleTypes, function (index, item) {
                        $('#lstAsignType').find('#editorAsign' + item.ArticleTypeID).prop('checked', true);
                    });
                    $.each(CacheArticle.Media, function (index, item) {
                        var cls = '';

                        if (item.IsForSummary)
                            cls = 'img-default'
                        assetsItem += '<div class="item-thumb cursor-pointer news-images ' + cls + '">'
                        assetsItem += '<img data-type="image"  data-url="' + item.FileName + '" src="' + item.FileName + '" />'
                        assetsItem += '<a href="javascript:void(0)" data-imageid="' + item.MediaID + '" class="setDefaultImage" style="display:none" title="Set Default Image For Listing"></a>'
                        assetsItem += '</div>'
                        count++;
                    })

                    if (assetsItem != '') {
                        articleAssets += createAssestsAccorItem('Images', assetsItem, count)
                        $('#divArticleImages').html(assetsItem);
                        $('#divArticleImages').find('.item-thumb').removeClass('cursor-pointer');
                        $('#divArticleImages').show();
                        $('#divArticleImages').find('.setDefaultImage').show();
                    }
                    assetsItem = '';
                    count = 0;
                    $.each(CacheArticle.ExternalLinks, function (i, v) {
                        assetsItem += '<div class="item-thumb article-videos cursor-pointer">'
                        assetsItem += '<img data-type="video"  data-url="' + v.LinkURL + '" src="/Modules/ArticleAdmin/EditorAdmin/img/VideoThumbnail.png" />'
                        assetsItem += '</div>'
                        count++;
                    });
                    if (assetsItem != '') {
                        articleAssets += createAssestsAccorItem('Videos', assetsItem, count)
                    }
                    $('#divArticleAssets').html(articleAssets);

                    if (article.DetailsEditDOM == null || article.DetailsEditDOM.length == 0) {
                        EditorMgr.ParseArticleDetailsToTemplate(null);
                    } else {
                        article.DetailsEditDOM = '<div class="editor-row sfCol_100 clearfix template-comp-wrapper">' + article.DetailsEditDOM + '</div>';
                        $('#TemplateEditorBody').html(article.DetailsEditDOM);
                        $('#TemplateEditorBody').html($('#TemplateEditorBody').text());
                    }
                    var QuotationDom = '';


                    $('#editorForm').show();
                    $('#editorGrid').hide();

                    $('#TemplateEditorBody').find('.article-editor-col').addClass('editor-col');
                    $('#TemplateEditorBody').find('.editor-col').removeClass('article-editor-col');
                    InvokeWebbuiilder();
                    $('.asTitle').eq(0).trigger('click');

                }
                function createAssestsAccorItem(title, contain, count) {
                    var html = '<div class="assetsItem">';
                    html += '<div class="asTitle"><span class="title">'
                    html += title;
                    html += '</span>'
                    html += '<span class="count">'
                    html += count;
                    html += '</span>'
                    html += '</div>'
                    html += '<div class="asContain" style="display:none">'
                    html += contain;
                    html += '</div></div>'
                    return html;
                }
            },
            ParseArticleDetailsToTemplate: function (ReplaceTemplate) {
                if (CacheArticle.Article != null) {

                    var article = CacheArticle.Article;
                    var lstmedia = CacheArticle.Media;
                    var lstCategory = CacheArticle.Categories;
                    var lstAuthor = CacheArticle.Authors;
                    var lstArticleTypes = CacheArticle.ArticleTypes;
                    var defaultArticleTemp;

                    if (ReplaceTemplate == null) {
                        defaultArticleTemp = $('#dhnDefaultTemplateRplcDom').html();
                    } else {
                        defaultArticleTemp = ReplaceTemplate
                    }
                    var detailsPage = 'articledetails'
                    var totImg = defaultArticleTemp.match(/(##articleimgsrc##_){1,1}(\d+)/g);
                    if (totImg != null)
                        totImg = totImg.length;
                    for (var i = 0; i < totImg; i++) {
                        if (typeof lstmedia[i] != 'undefined') {
                            defaultArticleTemp = defaultArticleTemp.replaceAll("##articleimgsrc##_" + i, lstmedia[i].FileName);
                            defaultArticleTemp = defaultArticleTemp.replaceAll("##articleimgcaption##_" + i, lstmedia[i].MediaTitle + ' source:' + lstmedia[i].Source);
                            defaultArticleTemp = defaultArticleTemp.replaceAll("##articleimgalt##_" + i, article.Title + ',' + lstmedia[i].MediaTitle);

                        }
                    }
                    var totText = defaultArticleTemp.match(/(##detailstext##_){1,1}(\d+)/g);
                    if (totText != null) {
                        totText = totText.length;
                        totText = totText / 2;//for length same pattern will be exists.
                    }

                    // news details text split logic goes here.
                    var detailsLen = article.Detail.length;
                    var strIndex = 0;
                    var IsNotReplace = true;
                    for (var j = 0; j < totText ; j++) {

                        var rplcKey = '##detailstext##_' + j;
                        var rplcVal = '';
                        var rgx = new RegExp('(' + rplcKey + '#' + '){1,1}(\\d+)', 'g');
                        var matches = defaultArticleTemp.match(rgx);
                        var len = 0;
                        if (matches != null) {
                            len = parseInt(matches[0].replace(rplcKey, '').replace('#', ''));
                            defaultArticleTemp = defaultArticleTemp.replaceAll(matches[0], '');
                        }

                        len = len + strIndex;
                        if (len <= detailsLen && j != totText - 1) {
                            rplcVal = article.Detail.substring(strIndex, strIndex + len);
                            strIndex = len;
                        } else {
                            if (IsNotReplace) {
                                IsNotReplace = false;
                                rplcVal = article.Detail.substring(strIndex, detailsLen);
                            }
                        }
                        defaultArticleTemp = defaultArticleTemp.replaceAll(rplcKey, rplcVal);
                    }
                    if (!article.IsCustomReport) {// author parsing
                        var AstartIndex = defaultArticleTemp.indexOf('<author>');
                        var AendIndex = defaultArticleTemp.indexOf('</author>')
                        if (AendIndex > 0)
                            AendIndex = AendIndex + 9;
                        var authCount = lstAuthor.length;
                        var authorComp = defaultArticleTemp.substring(AstartIndex, AendIndex);
                        var authorReplaceComp = '';

                        for (var k = 0; k < authCount; k++) {
                            var authorName = ArticleSetting.ChangeAuthorNameFormat(lstAuthor[k].Author);
                            var authorDom = authorComp.replaceAll("##authorprofilelink##",'javascript:void(0)');
                            authorDom = authorDom.replaceAll("##articleauthorname##", authorName);
                            if (lstAuthor[k].image == null)
                                lstAuthor[k].image = 'NoImage.png';
                            authorDom = authorDom.replaceAll("##authorimgsrc##", "/Modules/Admin/UserManagement/UserPic/" + lstAuthor[k].image);
                            authorReplaceComp += authorDom;
                        }
                        if (AstartIndex > 0) {
                            defaultArticleTemp = defaultArticleTemp.substring(0, AstartIndex) + authorReplaceComp + defaultArticleTemp.substring(AendIndex, defaultArticleTemp.length);
                        }
                    } else {
                        defaultArticleTemp = defaultArticleTemp.replaceAll('##authorprofilelink##', '#');
                        defaultArticleTemp = defaultArticleTemp.replaceAll('##articleauthorname##', article.CustomReport);
                        defaultArticleTemp = defaultArticleTemp.replaceAll('##authorimgsrc##', '/Modules/Admin/UserManagement/UserPic/NoImage.png');
                    }
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articlelink##', 'Javascript:void(0)');
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articletitle##', article.Title);
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articlesource##', article.NewsSource);
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articlecategory##','');
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articleimgatr##', article.Title);
                    defaultArticleTemp = defaultArticleTemp.replaceAll('##articledate##', ArticleSetting.ChangeDateFormat(article.AddedOn));
                    defaultArticleTemp = '<div class="editor-row sfCol_100 clearfix template-comp-wrapper">' + defaultArticleTemp + '</div>';
                    $('#TemplateEditorBody').html(defaultArticleTemp);
                    $('#TemplateEditorBody').find('.change-image-settings').show();
                    if (article.Quotation != null && article.Quotation != '') {
                        var QuotationDom = $('#divVirtualQuoteDom');
                        QuotationDom.find('.article-quote').text(article.Quotation);
                        $('#TemplateEditorBody').find('.editor-component.documenteditor').eq(0).after(QuotationDom.html())
                    }

                    //var img= $("#TemplateEditorBody").find('img[src="/(##articleimgsrc##_){1,1}(\d+)/g"]');
                    //console.log(img);
                    if (article.IsCustomReport) {
                        $('#TemplateEditorBody').find('.article-author-icon').addClass('display-none');
                        $('#TemplateEditorBody').find('.author-image').addClass('display-none');
                    }
                    $('#TemplateEditorBody').find('.template-image').each(function () {
                        var $thisImg = $(this);
                        if ($thisImg.attr('src').match(/##articleimgsrc##/g)) {
                            $thisImg.parent().remove();
                        }
                    });
                  
                }
            },

            GetDetailsFromEditor: function () {

                var $editHtml = $('.edit-area');
                var $cloneDOM = $('#WebBuilderWrapperClone');
                $cloneDOM.html($editHtml.html());


                $cloneDOM.find('.carries-options').remove();
                $cloneDOM.find('.carrier-open-option').remove();
                $cloneDOM.find('.ui-droppable').each(function () {
                    $(this).removeClass('ui-droppable');
                });
                $cloneDOM.find('.ui-sortable').each(function () {
                    $(this).removeClass('ui-sortable');
                });

                //remove data-id for template view 
                $cloneDOM.find('[data-id]').removeAttr('data-id');
                //remove contententeditable
                $cloneDOM.find('[contenteditable="true"]').removeAttr('contenteditable');
                $cloneDOM.find('.editor-component').removeClass('ui-sortable');
                $cloneDOM.find('.editor-component').removeClass('ui-droppable');
                $cloneDOM.find('.editor-col').addClass('article-editor-col');
                $cloneDOM.find('.article-editor-col').removeClass('editor-col');
                $cloneDOM.find('.activeOption').removeClass('activeOption');
                $cloneDOM.find('.resizebar').remove();
                $cloneDOM.find('.noElement').remove();
                $cloneDOM.find('.pagelink.active-page').removeClass('active-page');
                $cloneDOM
                //to be remove at last
                $('.editor-col').each(function () {
                    var $this = $(this);
                    $this.removeAttr('data-width');
                    $('.editor-col').css({ 'width': '' });
                });

                $cloneDOM.find('.anchorpage').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });

                $editHtml.find('.copyData').removeClass('readyCopy');
                $editHtml.find('.pasteData').removeClass('activePaste');



                $cloneDOM.find('img').each(function () {
                    ChangeImgToFakeURL($(this));
                });



                $.each(component, function (i, v) {
                    if (typeof v.remove !== "undefined")
                        v.remove($cloneDOM);

                });

                $cloneDOM.find('div').each(function () {
                    var $this = $(this);
                    ChangeBGToFakeURL($this);
                });


                $editHtml.find('img').each(function () {
                    ChangeImgToFakeURL($(this));
                });

                $editHtml.find('div').each(function () {
                    var $this = $(this);
                    ChangeBGToFakeURL($this);
                });
                $editHtml.find('.eb-menu li').find('a').each(function () {
                    var $this = $(this);
                    var href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });
                $editHtml.find('.anchorpage').each(function () {
                    var $achor = $(this);
                    var href = $achor.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $achor.attr('href', href);
                });
                function ChangeImgToFakeURL($elem) {
                    var src = $elem.attr('src');
                    if (typeof src !== "undefined" && src.indexOf("http://") === -1 && src.indexOf("https://") === -1) {
                        var backslash = src.substring(0, 1) === "/" ? "" : "/";
                        //$elem.attr('src', sageFrameFakeURL + $elem.attr('src').replace(SageFrameHostURL, ''));
                        $elem.attr('src', SageFrameHostURL + backslash + src);
                    }
                }
                function ChangeBGToFakeURL($elem) {
                    var parentBgImage = $elem.css('background-image');
                    if (typeof (parentBgImage) !== 'undefined' && parentBgImage !== 'none') {
                        parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        if (typeof parentBgImage !== "undefined") {
                            //for chrome it absolute path for relative path For eg.'/Media/mainbanner_2017_07_19_15_46_49.png it gives 'http://172.18.12.40:9181/Media/mainbanner_2017_07_19_15_46_49.png'
                            parentBgImage = parentBgImage.replace(SageFrameHostURL, '').trim();
                            if (parentBgImage.indexOf("http://") === -1 && parentBgImage.indexOf("https://") === -1) {
                                var backslash = parentBgImage.substring(0, 1) === "/" ? "" : "/";
                                var url = 'url(' + SageFrameHostURL + backslash + parentBgImage + ')';
                                $elem.css('background-image', '').css('background-image', url);
                            }
                        }
                    }
                }

                // 
                editHtml = $('<div/>').text($editHtml.html()).html().replace(/\>\s+\</g, '><').trim();
                if ($cloneDOM.find('.column-data-empty').length > 0)
                    viewHtml = '';
                else
                    viewHtml = $('<div/>').text($('#WebBuilderWrapperClone > .template-comp-wrapper').html()).html().replace(/\>\s+\</g, '><').trim();

            },
            AddUpdateEditedArticle: function () {
                if (editHtml == '' || viewHtml == '') {
                    editHtml = '';
                    viewHtml = '';
                    SageFrame.messaging.show("Article Details is required.", "Alert");
                }
                else {
                    var ArticleTypes = $('#lstAsignType input.asigntypes:checked').map(function () { return $(this).attr('data-typeid'); }).get().join(',');
                    var categories = $('#articleCategoryList .article-cat:checked').map(function () { return $(this).attr('data-catid'); }).get().join(',');
                    var dfltImgID = $('#divArticleImages').find('.img-default .setDefaultImage').attr('data-imageid');

                    if (typeof dfltImgID == 'undefined') {
                        dfltImgID = 0;
                    }

                    var newImage = $('#txtImageValidation').val();
                    var objInfo = {
                        ArticleID: EditorMgr.config.articleID,
                        Title: $('#txtArticleTitle').val(),
                        Summary: $('#txtArticleSummary').val(),
                        SummaryDefaultImgID: dfltImgID,
                        DetailsEditDOM: editHtml,
                        DetailsViewDOM: viewHtml,
                        FileName: newImage,
                        SiteID: p.siteID,
                        Categories: categories,
                        StateID: EditorMgr.config.outStateID,
                        IsBlog: false,
                        Message: $('#txtLogMessage').val(),
                        ArticleTypes: ArticleTypes
                    };
                    EditorMgr.config.method = "AddUpdateArticle";
                    EditorMgr.config.data = JSON2.stringify({
                        auth: auth,
                        articleInfo: objInfo,
                        roleID: p.roleID
                    });
                    EditorMgr.config.ajaxSuccess = EditorMgr.AddUpdateSuccess;
                    EditorMgr.ajaxCall(EditorMgr.config)
                }
            },
            AddUpdateSuccess: function (data) {
                $('#btnCloseForm').trigger('click');
                if (data.d == 1) {
                    $('#editorGrid').show();
                    $('#editorForm').hide();
                    EditorMgr.GetAllArticle(0, EditorMgr.config.limit, 0);
                    SageFrame.messaging.show("Article Saved Successfully.", "Success");
                } else if (data.d == 2) {
                    $('#editorGrid').show();
                    $('#editorForm').hide();
                    EditorMgr.GetAllArticle(EditorMgr.config.offset, EditorMgr.config.limit, EditorMgr.config.current);
                    SageFrame.messaging.show("Article Updated Successfully.", "Success");
                } else {
                    SageFrame.messaging.show("Authorization Error.", "Alert");
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
                    error: EditorMgr.ajaxFailure,
                });
            },
            ajaxFailure: function () {
                SageFrame.messaging.show("Server Error.", "Error");
            },
        }
        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {
                templateName: {
                    required: true,
                },
                NewsTitle: {
                    required: true,
                },
                NewsSummary: {
                    required: true,
                },
                NewsSource: {
                    required: true,
                },
                AtivityMessage: {
                    required: true,
                },
                ArticleImage: {
                    required: true,
                },
                ArticleCategory: {
                    required: true,
                }
            },
            messages: {
                templateName: {
                    required: "* Required",
                },
                NewsTitle: {
                    required: "* Required",
                },
                NewsSummary: {
                    required: "* Required",
                },
                NewsSource: {
                    required: "* Required",
                },
                AtivityMessage: {
                    required: "* Required",
                },
                ArticleImage: {
                    required: "* Required",
                },
                ArticleCategory: {
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

        EditorMgr.init();
    }
    $.fn.ArticleEditor = function (p) {
        $.ArticleEditor(p);
    };
})(jQuery);




