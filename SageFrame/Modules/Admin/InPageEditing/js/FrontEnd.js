(function ($) {
    $.FrontEndEditManager = function (p) {
        p = $.extend
        ({
            UserModuleID: 1,
            ddlPageID: '#s',
            ddlLayout: '#s',
            isFirst: false,
            ddlHdnPageListID: "#s"
        }, p);
        var ModuleDefID = 0;
        var Moduletitle = '';
        var suffixclass = '';
        var turns = 0;
        var EditZone = {
            config: {
                isPostBack: false,
                async: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                baseURL: SageFrameAppPath + '/Modules/Admin/InPageEditing/Services/ModuleManagerWebService.asmx/',
                method: "",
                url: "",
                categoryList: "",
                ajaxCallMode: 0, ///0 for get categories and bind, 1 for notification,2 for versions bind                                   
                arr: [],
                arrModules: [],
                PortalID: SageFramePortalID,
                AppPath: SageFrameAppPath,
                ActiveElement: "",
                TemplateName: SageFrameActiveTemplate,
                flag: 0,
                adminmode: 0,
                IsMobile: 0,
                Mode: 0, //0:Add 1:Edit
                UserModuleID: 0,
                IsHandheld: false,
                admincheck: 0,
                UserName: SageFrameUserName,
                PortalName: SageFramePortalName,
                ShowSideBar: p.ShowSideBar,
                nopopupflag: false,
                IsType3: false
            },
            messages: {
                nomodules: "No UserModules in this Portal"
            },
            init: function () {
                //Override Js contains by exactly contains : must call first
                $('.sfInlinePageEdit').each(function () {
                    var $this = $(this);
                    if ($this.next().hasClass('sfWrapper'))
                        $this.remove();
                    else
                        $this.addClass('sfWrapper').removeClass('sfInlinePageEdit');
                });
                EditZone.OverrideJS();

                // iniitalizate paging in modulelist
                EditZone.InitModulePaging();

                // initialize paging in page list
                EditZone.InitPagePaging();

                // initialize paging in Mouduel Edit
                EditZone.InitModulePagePaging();


                // change page on page select from pagelist
                $('#PagesList').on('click', '.page_alt_content li , .SearchPages li', function () {
                    var pageName = $(this).text();
                    EditZone.PageLink(pageName);
                });

                // change layout on layout select
                $('.layoutList li').on('click', function () {
                    var layoutName = $(this).text();
                    EditZone.ChangeLayout(layoutName);
                });

                // drag duckable ModuleList
                $("#divDroppable").draggable({
                    handle: ".dragme",
                    stop: function (event, ui) {
                        EditZone.UpdateDuckableZone();
                    }
                });

                $('#spnBtnCancel').on('click', function () {
                    $('.ui-dialog-titlebar-close').trigger('click');
                });
                // minimize or maximize module list
                $('.minimize').on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('fa-minus-square-o')) {
                        $('#divDroppable').find('.sfModuleSearch').hide();
                        $('#divDroppable').find('#divFloat').hide();
                        $('#divDroppable').addClass('Minimized');
                        $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                    }
                    else {
                        $('#divDroppable').find('.sfModuleSearch').show();
                        $('#divDroppable').find('#divFloat').show();
                        $('#divDroppable').removeClass('Minimized');
                        $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                    }
                    EditZone.UpdateDuckableZone();
                });

                // show hide module list
                $('.moduleListBtn').on('click', function () {
                    $('.sfApplyLayout.active').trigger('click');
                    $('.sfGottopage.active').trigger('click');
                    var $this = $(this);
                    if ($this.hasClass('on')) {
                        $this.text('Hide Module List');
                        $('#divDroppable').show();
                        $this.removeClass('on').addClass('off');
                    }
                    else {
                        $this.text('Show Module List');
                        $('#divDroppable').hide();
                        $this.removeClass('off').addClass('on');
                    }
                    if (p.isFirst == 1) {
                        $('#divDroppable').css({
                            left: $('.moduleListBtn').offset().left,
                            top: $('.sftopMiddle').height()
                        });
                    }
                });

                $('.sftopMiddle').addClass('active');
                //page search in page list
                EditZone.SearchPageName();

                // show or hide page list
                $('.sfGottopage').on('click', function () {
                    $('.moduleListBtn.off').trigger('click');
                    var self = $(this);
                    $('.layoutList').slideUp(200);
                    $('.sfApplyLayout').removeClass('active').addClass('inactive')
                    if (self.hasClass('active')) {
                        $('#PagesList').slideUp(200);
                        self.removeClass('active').addClass('inactive');
                    }
                    else {
                        $('#PagesList').slideDown(200);
                        self.removeClass('inactive').addClass('active');
                    }
                });

                // show or hide layout list
                $('.sfApplyLayout').on('click', function () {
                    $('.moduleListBtn.off').trigger('click');
                    var self = $(this);
                    $('#PagesList').slideUp(200);
                    $('.sfGottopage').removeClass('active').addClass('inactive');
                    if (self.hasClass('active')) {
                        $('.layoutList').slideUp(200);
                        self.removeClass('active').addClass('inactive');
                    }
                    else {
                        $('.layoutList').slideDown(200);
                        self.removeClass('inactive').addClass('active');
                    }
                });

                // Module search
                $('#txtSearchModules').bind("keyup", function () {
                    EditZone.LoadSearchModules();
                });

                // profile drop down start
                $('.myProfile').on('click', function () {
                    if ($('.myProfileDrop').hasClass('Off')) {
                        $('.myProfileDrop').removeClass('Off');
                        $('.myProfileDrop').show();
                    }
                    else {
                        $('.myProfileDrop').addClass('Off');
                        $('.myProfileDrop').hide();
                    }
                });
                // profile drop down end
                //drag and drop start
                // drag and drop  page modules
                EditZone.DragPageModules();
                // drag and drop  modules
                EditZone.DragModules();

                EditZone.HighLight();
                EditZone.config.Mode = 0;
                EditZone.AssignPageModule();
                EditZone.ShowInAllPage();
                EditZone.SaveSettings();
                EditZone.DeleteModule();
                EditZone.ModuleDataEdit();
                //EditZone.TopstickBarShowHide();
            },

            TopstickBarShowHide: function () {
                function HideTopstickBar() {
                    $('.sftopstickbarToggle').fadeOut();
                    clearInterval(myVar);
                }
                function BindMouseEvents() {
                    $('.sfTopbar').on('mouseenter hover mousemover', function () {
                        clearInterval(myVar);
                    });
                    $('.sfTopbar').on('mouseleave', function () {
                        ShowTopstickBar();
                    });
                }
                $('.quickhidetopStickbar').on('click', function () {
                    $('.sfTopbar').off('mouseenter hover mousemove mouseleave');
                    HideTopstickBar();
                });
            },
            ModuleDataEdit: function () {
                $('.sfModuleControl').off().on('click', '.sfManageControl', function () {
                    $('.SettingHeightMaker.monitor').css({ 'height': '0px' });
                    $('#SettingPlaceHolder').css({ 'height': '0px' });
                    var $this = $(this).parent().parent();
                    var url = $this.find('.sfManageControl').attr("rel");
                    var query = $this.find('.sfManageControl').attr('data-query');
                    var actionDOM = '<div class="settingactioniconWrappers">';
                    actionDOM += '<i class="icon-close" id="removeSettingHolder" width="100%"></i>';
                    var href = SageFrameHostURL + '/CommonEdit.aspx?' + query;
                    actionDOM += '<a href="' + href + '" target="_Blank"><i class="fa fa-pencil" id="removeSettingHolder" width="100%"></i>In Single Editor</a>';
                    actionDOM += '</div>';
                    var iframe = actionDOM + '<iframe id="divFrame" style="display: none" width="100%" height=""></iframe>';
                    $('#SettingPlaceHolder').html(iframe);
                    $('#divFrame').attr("src", url);
                    $('.SettingHeightMaker').removeClass('monitor');
                    $('.highlightSettingUp').remove();
                    $this.parent().next().addClass('monitor');
                    var upperGrid = '<div class="highlightSettingUp" style=""></div>'
                    $('.SettingHeightMaker.monitor').append(upperGrid);

                    var top = $('.SettingHeightMaker.monitor').offset().top;
                    var elementHeight = $this.height();
                    var topStickyBarHeight = $('.sfTopbar').height();
                    var actionWrapHeight = $('.settingactioniconWrappers').height();
                    var windowHeight = $(window).height() - actionWrapHeight - 6;
                    var sfModuleHeight = $this.parent('.sfModule').height();
                    var tolerance = 20;
                    var scrollTop = top + elementHeight - topStickyBarHeight - tolerance;
                    $('.highlightSettingUp').css({
                        "height": topStickyBarHeight + 'px',
                        'width': '100%'
                    });
                    $('html, body').animate({ scrollTop: (scrollTop) }, 100, function () {
                        $('#divFrame').show();
                        $('#SettingPlaceHolder').css({
                            'left': '0px',
                            'top': top + 'px',
                            'width': '100%',
                            'height': '10px',
                            'position': 'absolute'
                        });
                        $('.SettingHeightMaker.monitor').animate({
                            'height': windowHeight + 'px'
                        }, 1000);

                        $('#SettingPlaceHolder').animate({
                            'height': windowHeight + 'px'
                        }, 1000, function () {
                            $('html, body').animate({ scrollTop: (scrollTop) }, 100);
                        });
                        $('#divFrame').attr('height', windowHeight + 'px');
                    });
                    $('#removeSettingHolder').on('click', function () {
                        $('.highlightSettingUp').remove();
                        $('.SettingHeightMaker.monitor').animate({
                            'height': '0px'
                        }, 1000);
                        $('#SettingPlaceHolder').animate({
                            'height': '0px'
                        }, 1000, function () {
                            $('html, body').animate({
                                scrollTop: (scrollTop - elementHeight - sfModuleHeight - topStickyBarHeight)
                            }, 100, function () {
                                location.reload();
                            });
                        });
                        $('#SettingPlaceHolder').css({
                            'position': 'relative'
                        });
                        $('#SettingPlaceHolder').html('');
                    });
                });
                //$('.sfModuleControl').off('click');
                //$('a.sfManageControl').on("click", function (e) {

                //    //var self = $(this);
                //    //var userModuleID = self.parents("div").attr("class").replace('userModuleID_', '');
                //    //var url = SageFrameHostURL + "/Sagin/HandleModuleControls.aspx?uid=" + userModuleID + "&pid=1";
                //    //var title = self.parents('.sfModuleControl').next('span.sfPosition').text();
                //    //EditZone.PopUpEdit(userModuleID, url, title);
                //});
            },
            AssignPageModule: function () {
                $('#spnBtnSave').on("click", function () {
                    var checks = $('div.divPermissions tr:gt(0), #divModuleUser tr').find('input.sfCheckbox:checked');
                    lstModulePermission = [];
                    var _ModuleOrder = $('#hdnModuleIndex').val();
                    _ModuleOrder = _ModuleOrder + 1;
                    var usermoduletitle = $('#txtModuleTitle').val().trim() == "" ? $('#lblmoduleName').text() : $('#txtModuleTitle').val();
                    var pageId;
                    if ($('#pageList li.icon-listactive').length == 1) {
                        pageId = $('#pageList li.icon-listactive').attr('id');
                    }
                    else {
                        pageId = $('#pageList li').eq(0).attr('id');
                    }
                    var suffixClass = $('#txtModuleSuffix').val();
                    var UserModuleDetails = {
                        UserModule: {
                            UserModuleID: EditZone.config.UserModuleID,
                            ModuleDefID: parseInt(ModuleDefID),
                            UserModuleTitle: usermoduletitle,
                            AllPages: $('#rbAllPages').prop("checked") ? true : false,
                            ShowInPages: EditZone.GetSelectedPages(),
                            InheritViewPermissions: true, // because no other permission is allowed so always true
                            IsActive: true, //because the frontend modules are active only so always true
                            SEOName: EditZone.GetSEOName(usermoduletitle),
                            PageID: pageId,
                            PaneName: $('#spnPaneName').text().toLowerCase(),
                            ModuleOrder: _ModuleOrder,
                            CacheTime: "10",
                            Alignment: "test",
                            Color: "black",
                            Visibility: true,
                            PortalID: parseInt(SageFramePortalID),
                            IsHandheld: false,
                            SuffixClass: suffixClass,
                            HeaderText: $('#txtHeaderTxt').val(),
                            ShowHeaderText: $('#chkShowHeader').prop("checked"),
                            AddedBy: SageFrameUserName,
                            LSTUserModulePermission: lstModulePermission,
                            IsInAdmin: false
                        },
                        portalID: parseInt(SageFramePortalID),
                        userName: SageFrameUserName,
                        userModuleID: p.UserModuleID,
                        secureToken: SageFrameSecureToken
                    };
                    $(EditZone.config.ActiveElement).find("p.basics").text(usermoduletitle);
                    $.ajax({
                        type: EditZone.config.type,
                        contentType: EditZone.config.contentType,
                        cache: EditZone.config.cache,
                        url: EditZone.config.baseURL + (EditZone.config.Mode == 0 ? "AddUserModule" : "UpdateUserModule"),
                        data: JSON2.stringify(UserModuleDetails),
                        async: false,
                        dataType: EditZone.config.dataType,
                        success: function (data) {
                            if (EditZone.config.Mode == 0) {
                                var arrModuleData = data.d.split('_');
                                if (parseInt(arrModuleData[1]) > 1) {
                                    if (parseInt(arrModuleData[0]) > 1) {
                                        var userModuleID = arrModuleData[0];
                                        var url = SageFrameHostURL + "/Sagin/HandleModuleControls.aspx?uid=" + userModuleID + "&pid=1";
                                        $('.ui-dialog-titlebar-close').trigger('click');
                                        EditZone.PopUpEdit(userModuleID, url, '');
                                    }
                                }
                                else {
                                    window.location.href = window.location;
                                }
                            }
                            else {
                                $('.ui-dialog-titlebar-close').trigger('click');
                                // add or remove module header
                                var elem = $('.userModuleID_' + EditZone.config.UserModuleID).parent('.sfModuleControl');
                                var h2 = elem.prev('h2');
                                if ($('#chkShowHeader').prop("checked")) {
                                    if (h2.length == 0) {
                                        $('<h2>' + $('#txtHeaderTxt').val() + '</h2>').insertBefore(elem);
                                    }
                                    else {
                                        h2.text($('#txtHeaderTxt').val());
                                    }
                                }
                                else {
                                    $('.userModuleID_' + EditZone.config.UserModuleID).parent('.sfModuleControl').prev('h2').remove();
                                }
                                //change suffix class //sftopMiddle                                
                                var classes = elem.parents('.sfModule').attr('class');
                                var classArray = classes.split(' ');
                                if (suffixClass.trim().length == 0) {
                                    if ($.inArray(suffixclass, classArray)) {
                                        classArray = jQuery.grep(classArray, function (value) {
                                            return value != suffixclass;
                                        });
                                    }
                                }
                                else {
                                    if (suffixclass.trim().length == 0) {
                                        classArray.push(suffixClass);
                                    }
                                    else {
                                        classArray = jQuery.grep(classArray, function (value) {
                                            return value != suffixclass;
                                        });
                                        classArray.push(suffixClass);
                                    }
                                }
                                elem.parents('.sfModule').attr('class', classArray.join(' '));
                                // change module title
                                elem.next('span.sfPosition').text(usermoduletitle);
                            }
                        },
                        error: EditZone.ajaxFailure
                    });
                });
            },
            GetSEOName: function (word) {
                word = word.replace(" ", "_");
                return word;
            },
            GetPages: function () {
                EditZone.config.url = SageFrameAppPath + '/Modules/Admin/MenuManager/MenuWebService.asmx/GetNormalPage'
                EditZone.config.data = JSON2.stringify({
                    CultureCode: 'en-US',
                    PortalID: parseInt(SageFramePortalID),
                    UserName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                });

                this.config.ajaxCallMode = 6;
                this.ajaxCall(this.config);
            },
            GetSelectedPages: function () {
                var selecteds = $('#hdnPageList li.sfActive');
                var pageArray = new Array();
                if (!$('#rbAllPages').prop("checked")) {
                    $.each(selecteds, function () {
                        pageArray.push($(this).prop("id"));
                    });
                    var pageID = $('#categoryTree').find("li.active").find('.ui-tree-selected').find('span.true').parents('li').attr('id');
                    var found = $.inArray(pageID, pageArray) > -1;
                    if (!found) {
                        pageArray.push(pageID);
                    }
                }
                return pageArray.join();
            },
            DragPageModules: function () {
                $(".moduledrag").on('click', function () {
                    var sfModule = $(this).parents('.sfModule');
                    var self = sfModule.find('.sfModulecontent');
                    var height = self.height();
                    var width = self.width();
                    var elem = $(this).parents('.sfLogged.sfModule');
                    //remove pre added classes
                    $('.sfModulecontent').removeClass('sfContentOverflow');
                    $('.sfWrapper').find('.sfBlankBlock').remove();
                    $('.sfModule').removeClass('sfDraggable').removeClass('miminumwidthbox').removeAttr('style');
                    var h2 = sfModule.find('h2').eq(0);
                    if (h2.css('display') == 'block') {
                        h2.hide();
                    }
                    else {
                        h2.show();
                    }
                    sfModule.removeClass('miminumwidthbox');
                    var scale = 0;
                    if (width > 350) {
                        scale = 350 / width;
                        if (height > 800) {
                            self.addClass('sfContentOverflow');
                        }
                    }
                    else {
                        scale = 1;
                        if (height > 800) {
                            self.addClass('sfContentOverflow');
                        }
                    }

                    //original position
                    var position = self.offset();
                    var left = position.left;
                    var top = position.top;

                    // define the margin                     
                    var controlHeight = $('.sfModuleControl').height();
                    var controlWidth = $('.sfModuleControl').width();

                    var marginleft = controlWidth;
                    var marginTop = controlHeight + 4;
                    if (self.hasClass('active')) {
                        self.removeClass('active');
                        self.css('transform', '');
                        sfModule.removeClass('sfDraggable');
                    }
                    else {
                        $('.sfModulecontent').removeClass('active').css({ 'transform': '' });
                        self.addClass('active');
                        sfModule.addClass('sfDraggable');
                        var width = sfModule.width();
                        var height = sfModule.height();
                        self.css({ 'transform': 'scale(' + scale + ')', 'width': width });

                        //left2 = widhth/2 gives at middle place
                        //then have to decrease left which is given by width * scale (to give new width) and half of it
                        var left2 = (width / 2) - ((width * scale) / 2);
                        var top2 = (height / 2) - ((height * scale) / 2);
                        self.css({ 'transform': 'translate(' + (-left2) + 'px, ' + (-top2) + 'px) scale(' + scale + ')', 'width': width });
                        //sfModule.addClass('miminumwidthbox');
                        sfModule.css({ 'height': height * scale, 'width': width * scale });
                        sfModule.addClass('miminumwidthbox');
                     

                        $('.sfWrapper').each(function () {
                            var me = $(this);
                            var length = me.find('.sfModule').length;
                            if (length == 0) {
                                var classArr = me.attr('class').split(' ');
                                var paneName = '';
                                $.each(classArr, function (index, value) {
                                    if (value.indexOf('pch_') != -1) {
                                        paneName = value.replace('pch_', '').trim();
                                    }
                                });
                                me.html('<div class="sfLogged sfModule sfBlankBlock ">' + paneName + '</div>');
                            }
                        });
                        $('.sfWrapper').sortable({
                            connectWith: '.sfWrapper',
                            cursor: 'pointer',
                            //placeholder: "icon-listactive",
                            hoverClass: "dropableZone",
                            placeholder: "EmptyPlaceholder",
                            //helper: 'clone',
                            start: function (e, ui) {
                                turns = 0;
                            },
                            update: function (e, ui) {
                                EditZone.ClearClass(ui.item, sfModule, self);
                                if (turns == 0) {
                                    EditZone.UpdateModuleOrder();
                                    turns++;
                                }
                                $('.sfModule').removeAttr('style');
                                h2.show();
                            },
                            stop: function (e, ui) {
                                EditZone.ClearClass(ui.item, sfModule, self);
                                EditZone.DragModules();
                                sfModule.css({ 'height': height, 'width': width });
                                $('.sfModule').removeAttr('style');
                                h2.show();
                            }
                        }).droppable({
                            accept: '.sfModule ',
                            //hoverClass: "dropableZone",
                            drop: function (event, ui) {

                                EditZone.ClearClass(ui.draggable, sfModule, self);
                                $('.sfModule').removeAttr('style');
                                h2.show();
                            },
                            stop: function (e, ui) {
                                //EditZone.UpdateModuleOrder();
                                EditZone.ClearClass(ui.item, sfModule, self);
                                EditZone.DragModules();
                                $('.sfModule').removeAttr('style');
                                h2.show();
                            }
                        });
                    }
                    EditZone.DragModules();
                });

            },
            UpdateModuleOrder: function () {
                var panes = $('.sfWrapper');
                var ModuleOrderObj = [];
                var param = {
                    lstPageModules: [],
                    portalID: parseInt(SageFramePortalID),
                    userName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                };
                $.each(panes, function () {
                    var usermoduleorder = "";
                    var self = $(this);
                    var usermodules = self.find(".sfModule");
                    $.each(usermodules, function () {
                        //if ($(this).prop("id") != "") {
                        var modorder = parseInt($(this).index());
                        modorder = modorder + 1;
                        var moduleidArr = new Array();
                        var module = $(this).find('.sfModuleControl').children(":first");
                        var moduleclas = module.attr('class');
                        if (typeof (module) != 'undefined' && module.prop("class").length > 0) {
                            moduleidArr = module.prop("class").split('_');
                            if (typeof (moduleidArr[1]) != 'undefined') {
                                param.lstPageModules.push({
                                    "UserModuleID": moduleidArr[1],
                                    "PaneName": EditZone.GetPaneName(module),
                                    "ModuleOrder": modorder
                                });
                            }
                        }
                    });

                });
                $.ajax({
                    type: EditZone.config.type,
                    contentType: EditZone.config.contentType,
                    cache: EditZone.config.cache,
                    url: EditZone.config.baseURL + "UpdatePageModules",
                    data: JSON2.stringify(param),
                    dataType: EditZone.config.dataType,
                    success: function (data) {

                    },
                    error: EditZone.ajaxFailure
                });
            },
            GetPaneName: function (module) {
                var wrapper = module.parents('.sfWrapper');
                var classArr = wrapper.attr('class').split(' ');
                var paneName = '';
                $.each(classArr, function (index, value) {
                    if (value.indexOf('pch_') != -1) {
                        paneName = value.replace('pch_', '').trim();
                    }
                });
                return paneName;
            },
            SaveSettings: function () {
                $('.mdlSetting').on('click', function () {
                    ModuleDefID = 0;
                    var self = $(this);
                    EditZone.ClearPopUpControl();
                    var usermoduleID = self.parents("div").attr("class").replace('userModuleID_', '');
                    EditZone.config.Mode = 1;
                    EditZone.config.UserModuleID = usermoduleID;
                    EditZone.LoadModuleDetails(usermoduleID);
                });
            },
            DeleteModule: function () {
                $('.mdlDelete').on('click', function () {
                    var self = $(this);
                    var usermoduleID = self.parents("div").attr("class").replace('userModuleID_', '');

                    SageConfirmDialog('Are you sure you want to delete this usermodule ?').done(function () {
                        $.ajax({
                            type: EditZone.config.type,
                            contentType: EditZone.config.contentType,
                            cache: EditZone.config.cache,
                            url: EditZone.config.baseURL + "DeleteUserModule",
                            data: JSON2.stringify({
                                userModuleID: parseInt(usermoduleID),
                                DeletedBy: SageFrameUserName,
                                portalID: parseInt(SageFramePortalID),
                                userName: SageFrameUserName,
                                secureToken: SageFrameSecureToken
                            }),
                            dataType: EditZone.config.dataType,
                            success: function (data) {
                                self.parents('.sfModule').remove();
                            },
                            error: EditZone.ajaxFailure
                        });
                    });
                });
            },
            LoadModuleDetails: function (UserModuleID) {
                $.ajax({
                    type: EditZone.config.type,
                    contentType: EditZone.config.contentType,
                    cache: EditZone.config.cache,
                    url: EditZone.config.baseURL + "GetUserModuleDetails",
                    data: JSON2.stringify({
                        userModuleID: parseInt(UserModuleID),
                        portalID: parseInt(SageFramePortalID),
                        userName: SageFrameUserName,
                        secureToken: SageFrameSecureToken
                    }),
                    async: false,
                    dataType: EditZone.config.dataType,
                    success: function (data) {

                        var usermodule = data.d;
                        var pageid = usermodule.PageID
                        $('#hdnModuleInPage').val(pageid);
                        $('#txtModuleTitle').val(usermodule.UserModuleTitle);
                        $('#spnPaneName').text(usermodule.PaneName);
                        $('#lblmoduleName').text(usermodule.FriendlyName);
                        $('#txtHeaderTxt').val(usermodule.HeaderText);
                        $('#txtModuleSuffix').val(usermodule.SuffixClass);
                        suffixclass = usermodule.SuffixClass;
                        $('#chkShowHeader').prop("checked", usermodule.ShowHeaderText);
                        //$('#chkInheritPermissions').prop("checked", usermodule.InheritViewPermissions);
                        if (usermodule.IsActive)
                            $('#chkIsActive').prop("checked", true);
                        else
                            $('#chkIsActive').prop("checked", false);
                        if (usermodule.AllPages) {
                            $('#rbAllPages').prop("checked", true);
                            $('#trPages').hide();
                        }
                        else if (usermodule.ShowInPages != "") {
                            $('#trPages').show();
                            $('#rbCustomPages').prop("checked", true);
                            var pages = $('#pageTree_popup li');
                            var appliedpages = new Array();
                            appliedpages = usermodule.ShowInPages.split(',');
                            $.each(pages, function () {
                                var pageid1 = $(this).prop("id");
                                var self = $(this);
                                $.each(appliedpages, function (index, item) {
                                    if (pageid1 == item) {
                                        $(self).addClass("sfActive");
                                    }
                                });
                            });
                            $('#pageTree_popup ').find('li#' + pageid).addClass('sfActive');
                            //hidden pages
                            var pages_hdn = $('#hdnPageList li');
                            var appliedpages_hdn = new Array();
                            appliedpages_hdn = usermodule.ShowInPages.split(',');
                            $.each(pages_hdn, function () {
                                var pageid1 = $(this).prop("id");
                                var self = $(this);
                                $.each(appliedpages_hdn, function (index, item) {
                                    if (pageid1 == item) {
                                        $(self).addClass("sfActive");
                                    }
                                });
                            });
                            $('#hdnPageList ').find('li#' + pageid).addClass('sfActive');
                        }
                        EditZone.ShowPopUp('showPopup', "Edit Module");
                    },
                    error: EditZone.ajaxFailure
                });
            },
            ClearPopUpControl: function () {
                $('#txtModuleTitle, #txtHeaderTxt, #txtModuleSuffix').val('');
                $('#rbCustomPages').prop("checked", false);
                $('#rbAllPages').prop("checked", false);
                $('#chkShowHeader').prop("checked", false);
                $('#divModuleUser').find('tr').remove();
            },
            DragModules: function () {
                $('.divModulesList .widget-class').draggable({
                    //'scroll': true,
                    'revert': true,
                    cursor: 'pointer',
                    connectWith: '.sfblocks',
                    helper: 'clone',
                    start: function (event, ui) {
                        $('.sfWrapper').each(function () {
                            var me = $(this);
                            var length = me.find('.sfModule').length;
                            if (length == 0) {
                                var classArr = me.attr('class').split(' ');
                                var paneName = '';
                                $.each(classArr, function (index, value) {
                                    if (value.indexOf('pch_') != -1) {
                                        paneName = value.replace('pch_', '').trim();
                                    }
                                });
                                me.html('<div class="sfLogged sfModule sfBlankBlock ">' + paneName + '</div>');
                            }
                        });
                    },
                    stop: function (event, ui) {
                        $('.sfWrapper').find('.sfBlankBlock').remove();
                    }
                });
                $('.sfWrapper').droppable({
                    accept: '.widget-class ',
                    hoverClass: "dropableZone",
                    over: function () {
                    },
                    drop: function (event, ui) {
                        EditZone.ClearPopUpControl();
                        var self = $(this);
                        var classArr = $(this).attr('class').split(' ');
                        var paneName = '';
                        $.each(classArr, function (index, value) {
                            if (value.indexOf('pch_') != -1) {
                                paneName = value.replace('pch_', '').trim();
                            }
                        });
                        if (typeof (paneName) != 'undefined' && paneName != null && paneName.length > 0) {
                            //paneName = paneName.substring(2, paneName.Length);
                            EditZone.GetPages();
                            if (!ui.draggable.hasClass('widget-instance')) {
                                ModuleDefID = $(ui.draggable).prop("id");
                                $('#spnPaneName').text(paneName);
                                Moduletitle = ui.draggable.html();
                                $('#lblmoduleName').text(Moduletitle);
                                $('#trPages').hide();
                                var index = self.find('.sfModule').length - self.find('.sfBlankBlock').length;
                                $('#hdnModuleIndex').val(index);
                            }
                            $('#rbAllPages').prop("checked", true);
                            EditZone.ShowPopUp('showPopup', "Module Details");
                        }
                        $('.sfModule').removeAttr('style');
                    },
                    stop: function (e, ui) {
                        EditZone.ClearClass(ui.item, sfModule, self);
                        $('.sfModule').removeAttr('style');
                    }
                });
            },

            ShowInAllPage: function () {
                $('#rbCustomPages').on("click", function () {
                    if ($(this).prop("checked")) {
                        $('#trPages').slideDown();
                        $('#rbAllPages').prop("checked", false);
                        var pageID = $('#hdnModuleInPage').val();
                        $('#hdnPageList').find('li#' + pageID).addClass('sfActive');
                        $('#pageTree_popup').find('li#' + pageID).addClass('sfActive');
                    }
                    else {
                        $('#trPages').slideUp();
                        $('#rbAllPages').prop("checked", false);
                    }
                });
                $('#rbAllPages').on("click", function () {
                    $('#trPages').slideUp();
                    $('#rbCustomPages').prop("checked", false);
                });

                $('#pageTree_popup ').on("click", 'li', function () {
                    var id = $(this).prop("id");
                    var pageID = $('#hdnModuleInPage').val();
                    if (id != pageID) {
                        var realElem = $('#hdnPageList li[id=' + id + ']');
                        if ($(realElem).hasClass("sfActive")) {
                            $(realElem).removeClass("sfActive");
                            $(this).removeClass("sfActive");
                        }
                        else {
                            $(realElem).addClass("sfActive");
                            $(this).addClass("sfActive");
                        }
                    }
                    else {
                        SageAlertDialog('You cannot unassign module from original page');
                    }
                });
            },
            ShowPopUp: function (popupid, headertext) {
                var options = {
                    modal: true,
                    title: headertext,
                    minHeight: 125,
                    minWidth: 520,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    dialogClass: "sfFormwrapper",
                    resizable: false,
                    close: function (event, ui) {
                        //$('div.sfUnsavedmodule').fadeOut();
                    }
                };
                dlg = $('#' + popupid).dialog(options);
                dlg.parent().appendTo($('form:first'));
            },

            SearchPageName: function () {
                $('#pageSearch').on('keyup', function () {
                    var searchKey = $(this).val().trim();
                    if (searchKey.length > 0) {
                        $('.page_alt_content').hide();
                        $('#pagePagination').hide();
                        var html = '';
                        $('#pageList li').each(function (index, value) {
                            var self = $(this);
                            if ($(this).text().search(new RegExp(searchKey, "i")) > -1) {
                                var myclass = '';
                                var pName = self.text();
                                var actualPageName = $(p.ddlPageID).val();
                                if (pName == actualPageName) {
                                    myclass = 'icon-listactive';
                                }
                                html += '<li class=' + myclass + '>' + self.text() + '</li>';
                            }
                        });
                        $('.SearchPages').html(html);
                        $('.SearchPages').show();
                    }
                    else {
                        $('.page_alt_content').show();
                        $('#pagePagination').show();
                        $('.SearchPages').hide();
                    }
                });
            },
            OverrideJS: function () {
                $.expr[':'].exactcontains = function (a, i, m) {
                    return $(a).text().match("^" + m[3] + "$");
                };
            },

            HighLight: function () {
                var pagename = $(p.ddlPageID).val();
                var layoutname = $(p.ddlLayout).val();
                $('#PagesList ul.page_alt_content li:exactcontains(' + pagename + ') ').addClass('icon-listactive');
                $('.layoutList li:exactcontains(' + layoutname + ') ').addClass('icon-listactive');
                //$('#pageList li').remove('icon-listactive');
                $('#pageList li:exactcontains(' + pagename + ') ').addClass('icon-listactive');
            },

            ClearClass: function (ui, sfModule, self) {
                ui.find('.sfModulecontent').removeClass('active');
                ui.find('.sfModulecontent').css('transform', '');
                sfModule.removeClass('sfDraggable');
                $('.sfWrapper').find('.sfBlankBlock').remove();
                $('.sfModule').find('.sfContentOverflow').removeClass('sfContentOverflow');
                sfModule.removeClass('miminumwidthbox');
                self.removeAttr('style');
            },
            LoadSearchModules: function (data) {
                this.config.method = "GetAllSearchGenralModules";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    SearchText: $('#txtSearchModules').val(),
                    IsAdmin: false,
                    portalID: parseInt(SageFramePortalID),
                    userName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                });
                this.config.ajaxCallMode = 10;
                this.ajaxCall(this.config);
            },

            PageLink: function (pageName) {
                if ($(p.ddlPageID).val() != pageName) {
                    $(p.ddlPageID).val(pageName).trigger('change');
                }
            },
            ChangeLayout: function (layoutName) {
                if ($(p.ddlLayout).val() != layoutName) {
                    $(p.ddlLayout).val(layoutName).trigger('change');
                }
            },
            InitModulePaging: function () {
                var optInit = {
                    items_per_page: 10,
                    num_display_entries: 4,
                    current_page: 0,
                    num_edge_entries: 2,
                    link_to: "#",
                    prev_text: "<",
                    next_text: ">",
                    ellipse_text: "...",
                    prev_show_always: false,
                    next_show_always: false,
                    callback: EditZone.moduleselectCallback
                };
                var members = $('ul.hdnModulelist li');
                $("#ModulePagination").pagination(members.length, optInit);
            },
            InitPagePaging: function () {
                var optInit = {
                    items_per_page: 10,
                    num_display_entries: 4,
                    current_page: 0,
                    num_edge_entries: 2,
                    link_to: "#",
                    prev_text: "<",
                    next_text: ">",
                    ellipse_text: "...",
                    prev_show_always: false,
                    next_show_always: false,
                    callback: EditZone.PageselectCallback
                };
                var members = $('ul#pageList li');
                $("#pagePagination").pagination(members.length, optInit);
            },
            InitModulePagePaging: function () {
                var optInit = {
                    items_per_page: 5,
                    num_display_entries: 4,
                    current_page: 0,
                    num_edge_entries: 2,
                    link_to: "#",
                    prev_text: "<",
                    next_text: ">",
                    ellipse_text: "...",
                    prev_show_always: false,
                    next_show_always: false,
                    callback: EditZone.ModulePageselectCallback
                };
                var members = $('ul#hdnPageList li');
                $("#ModulePagePagination").pagination(members.length, optInit);
            },

            ModulePageselectCallback: function (page_index, jq) {
                // Get number of elements per pagionation page from form
                var items_per_page = 5;
                var members = $('#hdnPageList li');
                var max_elem = Math.min((page_index + 1) * items_per_page, members.length);
                var newcontent = '';
                var modules = $('#hdnPageList li');
                var i = 0;
                $.each(modules, function () {
                    if (i < max_elem && i >= page_index * items_per_page) {
                        newcontent += '<li id=' + $(this).prop("id") + '>' + $(this).text() + '</li>';
                    }
                    i++;
                });
                $('#pageTree_popup').empty().html(newcontent);
                EditZone.ReSelectPages();
                // Prevent click eventpropagation
                return false;
            },

            ReSelectPages: function () {
                var pages = $('#pageTree_popup li');
                $.each(pages, function () {
                    var id = $(this).prop("id");
                    var $realElem = $('#hdnPageList li[id=' + id + ']');
                    if ($realElem.hasClass("sfActive")) {
                        $(this).addClass("sfActive");
                    }
                });
            },

            PageselectCallback: function (page_index, jq) {
                // Get number of elements per pagionation page from form
                var items_per_page = 10;
                var members = $('ul#pageList li');
                var max_elem = Math.min((page_index + 1) * items_per_page, members.length);
                var newcontent = '';
                var modules = $('ul#pageList li');
                var i = 0;
                $.each(modules, function () {
                    if (i < max_elem && i >= page_index * items_per_page) {
                        newcontent += '<li class="element hideconfig widget-class" id=' + $(this).prop("id") + '>' + $(this).text() + '</li>';
                    }
                    i++;
                });
                $('#PagesList ul.page_alt_content').empty().html(newcontent);
                EditZone.HighLight();
                return false;
            },

            moduleselectCallback: function (page_index, jq) {
                // Get number of elements per pagionation page from form
                var items_per_page = 10;
                var members = $('#divDroppable ul.hdnModulelist li');
                var max_elem = Math.min((page_index + 1) * items_per_page, members.length);
                var newcontent = '';
                var modules = $('#divDroppable ul.hdnModulelist li');
                var i = 0;
                $.each(modules, function () {
                    if (i < max_elem && i >= page_index * items_per_page) {
                        newcontent += '<li class="element hideconfig widget-class" id=' + $(this).prop("id") + '>' + $(this).text() + '</li>';
                    }
                    i++;
                });
                $('#divDroppable ul.alt_content').empty().html(newcontent);
                EditZone.DragModules();
                return false;
            },
            UpdateDuckableZone: function (data) {
                var position = $('#divDroppable').offset();
                this.config.method = "UpdateDuckable";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    objDuck: {
                        shown: true,
                        Minimize: $('.minimize').hasClass('icon-plus'),
                        DragTop: parseInt(position.top - $(window).scrollTop()),
                        DragLeft: parseInt(position.left),
                        PortalID: parseInt(SageFramePortalID),
                        UserName: SageFrameUserName,
                        UserModuleID: p.UserModuleID,
                        SecureToken: SageFrameSecureToken
                    }
                });
                this.config.ajaxCallMode = 12;
                this.ajaxCall(this.config);
            },
            BindSearchModules: function (data) {
                var modules = data.d;
                var html = '';
                if (modules.length == 0) {
                    $('#divDroppable ul.alt_content').html("No Modules Found");
                }
                $.each(modules, function (index, item) {
                    if (item != "") {
                        html += '<li class="widget-class" id=' + item.ModuleDefID + ' style=""><p>' + item.FriendlyName + '</p></li>';
                    }
                });
                $('#divDroppable ul.hdnModulelist').html('').append(html);
                EditZone.InitModulePaging();
                EditZone.DragModules();
            },
            GetPageList_PopUp: function () {
                var isAdmin = 0;
                this.config.url = EditZone.config.AppPath + '/Modules/Admin/MenuManager/MenuWebService.asmx/GetNormalPage';
                this.config.data = JSON2.stringify({
                    CultureCode: 'en-US',
                    PortalID: parseInt(SageFramePortalID),
                    UserName: SageFrameUserName,
                    userModuleID: p.UserModuleID,
                    secureToken: SageFrameSecureToken
                });
                this.config.ajaxCallMode = 8;
                this.ajaxCall(this.config);
            },
            BindPageList_PopUp: function (data) {
                var pages = data.d;
                var PageID = "";
                var parentID = "";
                var PageLevel = 0;
                var itemPath = "";
                var html = "";
                $.each(pages, function (index, item) {
                    PageID = item.PageID;
                    parentID = item.ParentID;
                    categoryLevel = item.Level;
                    if (item.Level == 0) {
                        html += '<li id=' + PageID + '>';
                        html += item.PageName;
                        if (item.ChildCount > 0) {
                            itemPath += item.PageName;
                            html += EditZone.BindChildCategory_PopUp(pages, PageID);
                        }
                        html += "</li>";
                    }
                    itemPath = '';
                });
                $('#hdnPageList').html(html);
                var pageList = $('#hdnPageList li');
                html = '';
                var PageArr = [];
                $.each(pageList, function (index, item) {
                    var self = $(this);
                    PageArr.push('<li id=' + $(self).prop("id") + '>' + $(self).text() + '</li>');
                });
                $('#hdnPageList').html(PageArr.join(''));
                EditZone.InitPagingPages();
            },

            BindChildCategory_PopUp: function (response, PageID) {
                var strListmaker = '';
                var childNodes = '';
                var path = '';
                var itemPath = "";
                itemPath += "";
                $.each(response, function (index, item) {
                    if (item.Level > 0) {
                        if (item.ParentID == PageID) {
                            itemPath += item.PageName;
                            var prefix = EditZone.GetPrefixes(item.Level);
                            strListmaker += '<li id=' + item.PageID + '>' + prefix + item.PageName;
                            childNodes = EditZone.BindChildCategory(response, item.PageID);
                            itemPath = itemPath.replace(itemPath.lastIndexOf(item.AttributeValue), '');
                            if (childNodes != '') {
                                strListmaker += childNodes;
                            }
                            strListmaker += "</li>";
                        }
                    }
                });
                return strListmaker;
            },
            PopUpEdit: function (userModuleID, url, title) {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                var screen_res = screen.width;
                var align = (screen_res - 800) / 2;
                if ($('body').find('#iframe').length == 0) {
                    $('body').append('<iframe id="divFrame"></iframe>');
                }
                $('#divFrame').attr("src", url);
                if (title.length == 0) {
                    title = Moduletitle
                }
                var dialogOptions = {
                    "title": title,
                    "width": 800,
                    "height": 600,
                    "modal": true,
                    "position": [align, 150],
                    "z-index": 500,
                    "close": function () { location.reload(); }
                };
                if ($("#button-cancel").attr("checked")) {
                    dialogOptions["buttons"] = {
                        "Cancel": function () {
                            $(this).dialog("close");
                        }
                    };
                }
                //dialog-extend options
                var dialogExtendOptions = {
                    "maximize": true,
                    "minimize": false
                };
                //open dialog
                $("#divFrame").dialog(dialogOptions).dialogExtend(dialogExtendOptions);
                $('div.ui-dialog').css("z-index", "3000");
                return false;
            },
            ajaxFailure: function () {
            },
            ajaxSuccess: function (data) {
                switch (EditZone.config.ajaxCallMode) {
                    case 0:
                        EditZone.BindModules(data);
                        break;
                    case 1:
                        var id = "mod_" + data.d;
                        $(uniqueelem).prop("id", id);
                        break;
                    case 2:
                        break;
                    case 5:
                        if (EditZone.config.Mode == 0) {
                            if (parseInt(arrModuleData[0]) > 1) {
                                var arrModuleData = data.d.split('_');
                                var userModuleID = arrModuleData[0];
                                var url = SageFrameHostURL + "/Sagin/HandleModuleControls.aspx?uid=" + userModuleID + "&pid=1";
                                $('.ui-dialog-titlebar-close').trigger('click');
                                EditZone.PopUpEdit(userModuleID, url, '');
                            }
                        }
                        else {
                            $('.ui-dialog-titlebar-close').trigger('click');
                        }
                        break;
                    case 8:
                        EditZone.BindPageList_PopUp(data);
                        break;
                    case 10:
                        EditZone.BindSearchModules(data);
                    case 12:
                        break;
                }
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: EditZone.config.type,
                    contentType: EditZone.config.contentType,
                    async: EditZone.config.async,
                    cache: EditZone.config.cache,
                    url: EditZone.config.url,
                    data: EditZone.config.data,
                    dataType: EditZone.config.dataType,
                    success: EditZone.ajaxSuccess,
                    error: EditZone.ajaxFailure
                });
            }
        };
        EditZone.init();
    }
    $.fn.FrontEndEdit = function (p) {
        $.FrontEndEditManager(p);
    };
})(jQuery);