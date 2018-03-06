(function ($) {
    $.TemplateManger = function (p) {
        p = $.extend
                ({
                    userModuleID: '1',
                    siteID:0
                }, p);
        var validator;
        var editHtml;
        var viewHtml;
        var DataFrameHtml;
        var IsSaveExit = true;
        var IsDetailsType = true;
        var auth = {
            UserModuleID: p.userModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture
        }

        var TemplateMngr = {
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
                offset: 0,
                limit: 10,
                current: 0,
                baseURL: SageFrameAppPath + '/Modules/ArticleAdmin/ArticleTemplate/services/ComponentTemplate.asmx',
            },
            init: function () {
                TemplateMngr.UIEvents();
            },
            checkEditorTemplateType: function () {
                if (IsDetailsType) {
                    $('#templateLayout').hide();
                    $('#TemplateEditorBody').removeClass('sfCol_25');
                    $('#TemplateEditorBody').removeClass('sfCol_75');
                    $('#TemplateEditorBody').addClass('sfCol_100');
                    $('.btnSwithNewsType').attr('data-newstype', 'summary');
                    $('.btnSwithNewsType').text('Switch to Summary');
                    $('.editor-wrap').addClass('editor-wrap-details');

                } else {
                    $('.editor-wrap').removeClass('editor-wrap-details');
                    $('#templateLayout').show()
                    $('.btnSwithNewsType').attr('data-newstype', 'details');
                    $('.btnSwithNewsType').text('Switch to Details');
                    $('#TemplateEditorBody').removeClass('sfCol_100');
                    if ($('#rdonormalType').prop('checked')) {
                        $('#TemplateEditorBody').removeClass('sfCol_25');
                        $('#TemplateEditorBody').addClass('sfCol_75');
                    } else {
                        $('#TemplateEditorBody').removeClass('sfCol_75');
                        $('#TemplateEditorBody').addClass('sfCol_25');
                    }
                }

            },
            UIEvents: function () {
                $('.layoutType').on('click', function () {
                    if ($(this).prop('id') == "rdonormalType") {
                        $('#TemplateEditorBody').removeClass('sfCol_25');
                        $('#TemplateEditorBody').addClass('sfCol_75');
                    } else {
                        $('#TemplateEditorBody').removeClass('sfCol_75');
                        $('#TemplateEditorBody').addClass('sfCol_25');
                    }
                });
                $('.btnAddTemplate').off('click').on('click', function () {
                    $('#CompTempListWrap').hide();
                    $('#templateBuilder').show();
                    TemplateMngr.ClearEditing();
                    InvokeWebbuiilder(IsDetailsType);
                    TemplateMngr.checkEditorTemplateType();
                });
                $('.btncancelTemplateWeb').off('click').on('click', function () {
                    $('#CompTempListWrap').show();
                
                    $('#templateBuilder').hide();
                    TemplateMngr.ClearEditing();
                    $('#btnCloseForm').trigger('click');
                    $('#hdnTemplateID').val(0);
                    TemplateMngr.GetCompTempList(0, TemplateMngr.config.limit, 0);

                });
                $('.btnSwithNewsType').off('click').on('click', function () {
                    var $this = $(this);
                    if ($this.attr('data-newstype') == 'summary') {
                        IsDetailsType = false;
                    } else {
                        IsDetailsType = true;
                    }
                    TemplateMngr.GetCompTempList(0, TemplateMngr.config.limit, 0);
                    TemplateMngr.checkEditorTemplateType();
                });
                $('.templateTypes').off('click').on('click', function () {
                    var type = $(this).attr('data-temptype');
                    if (type == "summary") {
                        IsDetailsType = false;
                    } else if (type == "details") {
                        IsDetailsType = true;
                    }
                    TemplateMngr.checkEditorTemplateType();
                    $('#CompTempListWrap').show();
                    $('#divTemplateTypes').hide();

                    TemplateMngr.GetCompTempList(0, TemplateMngr.config.limit, 0);
                });

                $('#SaveTemplateWeb').on('click', function () {
                    if (validator.form()) {
                        IsSaveExit = false;
                        TemplateMngr.AddUpdateTemplate();
                        $('#divTemplateEditor').show();
                        $('#btnCloseForm').trigger('click');
                    }
                });
                $('#btnDoneEditing').on('click', function () {
                    TemplateMngr.GetTemplateFromEditor();
                    if (editHtml == '' || viewHtml == '') {
                        editHtml = '';
                        viewHtml = '';
                        SageFrame.messaging.show("Template data is required.", "Alert");
                    }
                    else {
                        $('#btnOpenForm').trigger('click');
                    }
                });
                $('#btnSaveExitTemplateWeb').on('click', function () {
                    if (validator.form()) {
                        IsSaveExit = true;
                        TemplateMngr.AddUpdateTemplate();
                    }
                });

                $('.template-list').off().on('click', '.templateAction', function () {
                    var $this = $(this);
                    var ActionType = $this.attr('data-action');
                    var TemplateID = $this.attr('data-templateid');
                    switch (ActionType) {
                        case "edit":
                            TemplateMngr.EditTemplate(TemplateID);
                            break;
                        case "clone":
                            TemplateMngr.CloneTemplate(TemplateID);
                            break;
                        case "delete":
                            TemplateMngr.DeleteTemplate(TemplateID);
                            break;
                        case "view":
                            TemplateMngr.ViewTemplate($this);
                            break;
                        case "setdefault":
                            TemplateMngr.SetDefaultTemplate(TemplateID);
                            break;
                    }
                    $this.parents('.actiononClickShow').hide();
                });
                $('.template-list').on('click', '.btnActionOpen', function () {
					$(this).toggleClass('open');
                    var $actionShow = $(this).prev('.actiononClickShow');
                    $('.template-list').find('.actiononClickShow').not($actionShow).hide();
                    if ($actionShow.css("display") == "none")
                        $actionShow.show(300);
                    else
                        $actionShow.hide(300);					
					
                });
	   
            },
            EditTemplate: function (TemplateID) {
                $('#hdnTemplateID').val(TemplateID);
                TemplateMngr.config.method = "GetTemplateByID";
                TemplateMngr.config.data = JSON2.stringify({
                    auth: auth,
                    templateID: TemplateID
                });
                TemplateMngr.config.ajaxSuccess = TemplateMngr.BindTemplateToEditor;
                TemplateMngr.ajaxCall(TemplateMngr.config)
            },

            DeleteTemplate: function (TemplateID) {
                SageConfirmDialog('Do you want to delete?').done(function () {
                    TemplateMngr.config.method = "DeleteTemplateByID";
                    TemplateMngr.config.data = JSON2.stringify({
                        auth: auth,
                        templateID: TemplateID
                    });
                    TemplateMngr.config.ajaxSuccess = function (data) {
                        data = data.d;
                        if (data == 1) {
                            SageFrame.messaging.show("Template Deleted Successfully.", "Success");
                        }
                        else if (data == 0) {
                            SageFrame.messaging.show("You Cannot Delete This Template.", "Alert");
                        } else {
                            SageFrame.messaging.show("Authorization Error.", "Alert");
                        }
                        TemplateMngr.GetCompTempList(0, TemplateMngr.config.limit, 0);
                    };
                    TemplateMngr.ajaxCall(TemplateMngr.config)
                });
            },
            SetDefaultTemplate: function (TemplateID) {
                TemplateMngr.config.method = "SetDefaultTemplateID";
                TemplateMngr.config.data = JSON2.stringify({
                    auth: auth,
                    templateID: TemplateID,
                    siteID:p.siteID
                });
                TemplateMngr.config.ajaxSuccess = function (data) {
                    data = data.d;
                    if (data == 1) {
                        SageFrame.messaging.show("Template Set to Default Successfully.", "Success");
                    }
                    else {
                        SageFrame.messaging.show("Authorization Error.", "Alert");
                    }
                    TemplateMngr.GetCompTempList(0, TemplateMngr.config.limit, TemplateMngr.config.current);
                };
                TemplateMngr.ajaxCall(TemplateMngr.config)
            },
            ViewTemplate: function ($ThatBtn) {
                var $parent = $ThatBtn.parents('.template-thumbnails');


                var viewHtml;

                switch ($ThatBtn.attr('data-layouttype')) {
                    case 'normal':
                        viewHtml = '<div class="edit-area site-body sfCol_75"><div class="editor-componentWrapper">';
                        break;
                    case 'sidebar':
                        viewHtml = '<div class="edit-area site-body sfCol_25"><div class="editor-componentWrapper">';
                        break;
                    default:
                        viewHtml = '<div class="edit-area site-body sfCol_100"><div class="editor-componentWrapper">';
                        break;
                }
                viewHtml += $parent.find('.template-viewdom').html() + '</div></div>';
                var option = {
                    title: 'Template View',
                    openButton: '',
                    openInCall: true,
                    width: "90%",
                    height: "90%",
                    contentHtml: viewHtml,
                    afterAppend: function ($wrap) {
                    }
                }
                $('#simplePopUpContainer').makeSimpleModel(option);
            },
            CloneTemplate: function (TemplateID) {
                $('#hdnTemplateID').val(0);
                TemplateMngr.config.method = "GetTemplateByID";
                TemplateMngr.config.data = JSON2.stringify({
                    auth: auth,
                    templateID: TemplateID
                });
                TemplateMngr.config.ajaxSuccess = TemplateMngr.BindTemplateToEditor;
                TemplateMngr.ajaxCall(TemplateMngr.config)
            },
            BindTemplateToEditor: function (data) {
                data = data.d;
                if (data != null) {
                    TemplateMngr.ClearEditing();
                    if ($('#hdnTemplateID').val() != '0') {
                        $('#txtTemplateTitle').val(data.Title);
                        $('#slcTempCategory').val(data.CategoryID);
                    }
                    $('#templateBuilder').show();
                    $('#CompTempListWrap').hide();

                    if (data.LayoutType === 'normal') {
                        $('#rdonormalType').prop('checked', true);
                    } else {
                        $('#rdoSidebr').prop('checked', true);
                    }
                    TemplateMngr.checkEditorTemplateType();
                    $('#TemplateEditorBody').html(data.TemplateEditDOM);
                    InvokeWebbuiilder(IsDetailsType);
                }
            },
            ClearEditing: function () {
                $('#TemplateEditorBody').html('');
                $('.Layout.components-list').removeClass('activeAccordion');
                $('#divTemplateForm').hide();
                $('#divTemplateEditor').show();
                $('#txtTemplateTitle').val('');
                $('#slcTempCategory').val(0);
                validator.resetForm();

            },
            GetCompTempList: function (offset, limit, current) {
                var objTempInfo = {
                    Title: '',
                    IsBlog: false,
                    IsSummary: !IsDetailsType,
                    CategoryName: '',
                    LayoutType: ''
                };
                TemplateMngr.config.offset = limit * current;
                TemplateMngr.config.current = current;
                TemplateMngr.config.method = "GetAllTemplate";
                TemplateMngr.config.data = JSON2.stringify({
                    auth: auth,
                    filterInfo: objTempInfo,
                    offset: TemplateMngr.config.offset,
                    limit: limit,
                    siteID:p.siteID
                });

                TemplateMngr.config.ajaxSuccess = TemplateMngr.BindTemplateList;
                TemplateMngr.ajaxCall(TemplateMngr.config)
            },
            BindTemplateList: function (data) {
                $('#dtlsTemplateList').html('').hide();
                $('#SmryTempList').html('').hide();
                data = data.d;
                var html = '';
                var RowTotal;
                $.each(data, function (index, item) {
                    RowTotal = item.RowTotal;
                    var clsDe = '';
                    if (item.IsDefault)
                        clsDe='default-temp'
                    if (IsDetailsType)
                        html += '<div class="template-thumbnails  details-type ' + clsDe + '">';
                    else
                        html += '<div class="template-thumbnails summary-type ' + item.LayoutType  +' '+ clsDe +'">';
                    html += '<div class="thumb-wrap">';
                    html += '<div class="template-viewdom">';
                    html += item.TemplateViewDom;
                    html += '</div>';
                    html += '<div class="thumb-wrap_link">';
                    html += '<div class="themeData_title">';
                    html += '<h3>' + item.Title + '</h3>';
                    html += '</div>'
                    html += '<div class="actiononClickShow" style="display:none">';
                    html += '<div class="actiononClickShowInfo">';
                    html += '<a class="templateAction   icon-view " data-templateid="' + item.TemplateID + '" data-layouttype="' + item.LayoutType + '" data-action="view" title="Preview Template">View</a>';
                    html += '<a class="templateAction    icon-clone" data-templateid="' + item.TemplateID + '" data-action="clone"  title="Clone Template">Clone</a>';
                    if (!item.IsSystemDefined) {
                        html += '<a class="templateAction  icon-edit" data-templateid="' + item.TemplateID + '" data-action="edit" title="Edit Template">Edit</a>';
                        if (!item.IsDefault)
                             html += '<a class="templateAction  icon-delete" data-templateid="' + item.TemplateID + '" data-action="delete" title="Delete Template" >Delete</a>';
                    }
                    if (item.IsDefault == false)
                        html += '<a class="templateAction icon-default" data-templateid="' + item.TemplateID + '" data-action="setdefault" title="Set Template Default">Set Default</a>'
                    html += '</div>';//actiononClickShowInfo
                    html += '</div>';//actiononClickShow

                    html += '<span class="btnActionOpen actionclass actionLinkClass">';
                    html += '<a><i class="fa fa-ellipsis-v"></i></a></span>';
                    html += '</div>';//thumb-wrap_link
                    html += '</div>';//thumb-wrap
                    html += '</div>';//template-thumbnails
                });
                if (IsDetailsType) {
                    $('#dtlsTemplateList').html(html).show();
                } else {
                    $('#SmryTempList').html(html).show();
                }
                TemplateMngr.BindPagination(RowTotal);
            },
            BindPagination: function (RowTotal) {
                // console.log(totalItem);
                if (RowTotal > TemplateMngr.config.limit) {
                    $('#divTemplatePg').show().pagination(RowTotal, {
                        items_per_page: TemplateMngr.config.limit,
                        current_page: TemplateMngr.config.current,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: TemplateMngr.GetCompTempList,
                            limit: TemplateMngr.config.limit,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#divTemplatePg').hide();
                }
            },
            GetTemplateFromEditor: function () {

                var $editHtml = $('.edit-area');
                $editHtml.find('.article-title').removeClass('display-inline-block');
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
               
                //creating data frame dom 
                var $DataFrameDom = $('#WebBuilderDataFrameDom');
                if (IsDetailsType)
                    $DataFrameDom.html($editHtml.html());
                else
                    $DataFrameDom.html($cloneDOM.html());

                $.each(component, function (i, v) {
                    if (typeof v.remove !== "undefined")
                        v.remove($cloneDOM);
                    if (typeof v.replace !== "undefined")
                        v.replace($DataFrameDom);
                });
                //wrap  author component with  keyword {#  #}
                $DataFrameDom.find('.article-author-component').wrap('<author></author>');
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
                        $elem.attr('src',  backslash + src);
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
                DataFrameHtml = $('<div/>').text($('#WebBuilderDataFrameDom > .template-comp-wrapper').html()).html().replace(/\>\s+\</g, '><').trim();
                if ($cloneDOM.find('.column-data-empty').length > 0)
                    viewHtml = '';
                else
                    viewHtml = $('<div/>').text($('#WebBuilderWrapperClone > .template-comp-wrapper').html()).html().replace(/\>\s+\</g, '><').trim();

            },
            AddUpdateTemplate: function () {
                if (editHtml == '' || viewHtml == '') {
                    editHtml = '';
                    viewHtml = '';
                    SageFrame.messaging.show("Template data is required.", "Alert");
                }
                else {
                    var objTempInfo = {
                        TemplateID: $('#hdnTemplateID').val(),
                        TemplateEditDOM: editHtml,
                        TemplateViewDom: viewHtml,
                        DataReplaceFrameDom: DataFrameHtml,
                        Title: $('#txtTemplateTitle').val(),
                        IsBlog: false,
                        IsSummary: !IsDetailsType,
                        LayoutType: $('input[name=templateLayoutType]:checked').val(),
                        CategoryID: $('#slcTempCategory').val(),
                        SiteID:p.siteID
                    };
                    TemplateMngr.config.method = "AddUpdateTemplate";
                    TemplateMngr.config.data = JSON2.stringify({
                        auth: auth,
                        templateInfo: objTempInfo,
                    });

                    TemplateMngr.config.ajaxSuccess = TemplateMngr.AddUpdateSuccess;
                    TemplateMngr.ajaxCall(TemplateMngr.config)
                }
            },
            AddUpdateSuccess: function (data) {
                var hdnID = $('#hdnTemplateID').val();
                if (hdnID == "0") {
                    SageFrame.messaging.show("Template Saved Successfully.", "Success");
                } else if (hdnID>0) {
                    SageFrame.messaging.show("Template Updated Successfully.", "Success");
                } 
                if(data.d!=-1)
                    $('#hdnTemplateID').val(data.d);
                else
                    SageFrame.messaging.show("Authorization Error.", "Alert");
              
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
                    error: TemplateMngr.ajaxFailure,

                });
            },
            ajaxFailure: function () {
                alert("Server Error.", "Error");
            },
        }
        validator = $("#form1").validate({
            ignore: ":hidden",
            rules: {
                templateName: {
                    required: true,
                },
            },
            messages: {
                templateName: {
                    required: "* Required",
                },
            }

        });
        TemplateMngr.init();
    }
    $.fn.TemplateManger = function (p) {
        $.TemplateManger(p);
    };
})(jQuery);




