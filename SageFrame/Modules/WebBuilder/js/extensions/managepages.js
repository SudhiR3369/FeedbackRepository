var managepages = {
    "managepages": {
        "componentname": "managepages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "defaultdata": '',
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenupages"),
                    "onload": function ($item) {
                        var $parent = $('.editor-site-header');
                        InitEvents();

                        function InitEvents() {
                            ClearPageError();
                            $('#pageAddPanel').on('click', function () {
                                ClearPageError();
                                $('#pageCreateArea').attr('data-pageid', 0);
                                $('#pageCreateArea').attr('data-webbuilderid', 0);
                                $('#pageCreateArea').show();
                                $('#pageListArea').hide();
                                $('#hdnPageID').val('');
                                $('#txtPageName').val('');
                                $('#txtPageTitle').val('');
                                $('#txtPageDescription').val('');
                            });
                            $('#btnCancelPageAdd').on('click', function () {
                                $('#pageCreateArea').attr('data-pageid', 0);
                                $('#pageCreateArea').hide();
                                $('#pageListArea').show();
                                ClearPageError();
                            });
                            $('#btnSavePage').on('click', function () {
                                var $pageName = $('#txtPageName');
                                var $title = $('#txtPageTitle');
                                var $description = $('#txtPageDescription');
                                var pageName = $pageName.val().trim();
                                var pageID = parseInt($('#pageCreateArea').attr('data-pageid'));
                                var webbuilderID = parseInt($('#pageCreateArea').attr('data-webbuilderid'));
                                var description = $description.val().trim();
                                var title = $title.val().trim();
                                if (pageName.length == 0) {
                                    SetPageError("PageName can't be empty");
                                } else {
                                    if (!ValidatePageName(pageName)) {
                                        SetPageError("PageName not accepted");
                                    } else if (CheckDuplicate(pageName, pageID)) {
                                        SetPageError("PageName duplicated");
                                    } else {
                                        description = description.length == 0 ? pageName : description;
                                        title = title.length == 0 ? pageName : title;
                                        var pageIDs = AddUpdatePage(pageID, pageName, '', title, description, webbuilderID);
                                        var newPageID = pageIDs.pageID;
                                        var oldPageName = currentpageName;
                                        if (newPageID == 0) {
                                            SetPageError("PageName Already Exists.");
                                            return false;
                                        } else if (newPageID > 0) {
                                            currentpageName = pageName;
                                            if (pageID == newPageID) { //updated
                                                var $li = $('li[data-pageid="' + newPageID + '"]');
                                                $li.find(' >a > .pageName').text(pageName);
                                                $li.find('> a').attr('href', SageFrameHostURL + '/' + pageName.replace(/ /g, '-'));
                                                var $div = $('div[data-pageid="' + newPageID + '"]');
                                                $div.find('> .title').text(pageName);
                                                $div.find('> .activedefalutPage ').attr('data-pagename', pageName);
                                            } else { //added
                                                var addedMenu = '<div data-type="page" data-webbuilderid="' + pageIDs.webbuilderID + '" data-pageid="' + newPageID + '" class="panel panel-info form-elements element">';
                                                //addedMenu += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                                addedMenu += '<span class="title">' + pageName + '</span>';
                                                //addedMenu += '<span class="showinmenu">';
                                                //var index = $('#headerMenuList > div').length + 1;
                                                //addedMenu += '<input id="page_' + index + '" class="showpageinmenu" type="checkbox" checked="checked">';
                                                //addedMenu += '<label for="page_' + index + '"><i class="icon-icon-tick"></i></label>';
                                                //addedMenu += '</span>';
                                                //addedMenu += '<span class="previewhere fa fa-eye"></span>';
                                                //addedMenu += '<span class="gotoeditor fa fa-outdent"></span>';
                                                addedMenu += '<span class="fa fa-check-circle-o activedefalutPage " title="set as starup page"data-pageName="' + pageName + '"></span>';
                                                addedMenu += '<span class="deleteWebPage fa icon-delete"></span>';
                                                addedMenu += '<span class="editWebPage fa fa-pencil-square-o"></span>';
                                                //addedMenu += '<div class="sortable panel-body ui-sortable">&nbsp;</div></div>';
                                                $('#headerMenuList').append(addedMenu);
                                                $('.eb-menu').each(function () {
                                                    var $this = $(this);
                                                    var isHeading = false;
                                                    if ($this.parents('#menuHEaderDOM').length == 1)
                                                        isHeading = true;
                                                    var color = 'rgb(0,0,0)';
                                                    var fontSize = '';
                                                    var $menuAnchor = '';
                                                    var $span = '';
                                                    if ($this.find('li').not('.hide-element').find('a').not('.active-page').length == 0) {
                                                        color = 'rgb(0,0,0)';
                                                        fontSize = '12';
                                                    } else {
                                                        var $item = $this.find('li a').not('.active-page').eq(0);
                                                        color = $item.find('span').css('color');
                                                        fontSize = $item.find('span').css('font-size');
                                                        //if (isHeading) {
                                                        $menuAnchor = $item.parent();
                                                        $span = $item.find('span');
                                                        //}
                                                    }
                                                    var hide = 'hide-element';
                                                    var li = '<li data-pageid="' + newPageID + '" >';
                                                    li += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + '" class="pagelink">';
                                                    li += '<span class="pageName editor-text-letterSpacing-0" style="font-size: ' + fontSize + '; color: ' + color + ';">';
                                                    li += pageName;
                                                    li += '</span>';
                                                    li += '</a>';
                                                    li += '</li>';
                                                    var $li = $(li);
                                                    $this.append($li);
                                                    if ($menuAnchor.length > 0) {
                                                        $li.attrs($menuAnchor.attrs());
                                                        $li.find('span').attrs($span.attrs());
                                                        $li.attr('data-pageid', newPageID);
                                                        $li.attr('data-webbuilderID', pageIDs.webbuilderID);
                                                        if (isHeading) {
                                                            $li.removeClass('hide-element');
                                                        } else {
                                                            if (!$li.hasClass('hide-element'))
                                                                $li.addClass('hide-element');
                                                        }
                                                    }
                                                });
                                                //RebindMenu();
                                                //SortableMenu();
                                                SortEvents();
                                                PagelinkStop();
                                            }
                                            $('#pageCreateArea').hide();
                                            $('#pageListArea').show();
                                            currentpageName = oldPageName;
                                            $('#SaveWeb').trigger('click');
                                            var Oriname = $('#txtPageName').attr('data-pname');
                                            if (typeof Oriname !== "undefined" && Oriname === oldPageName) {
                                                window.location = SageFrameHostURL + '/WebBuilder/' + pageName.replace(" ", '-');
                                            }
                                        }

                                    }
                                }
                            });
                        }

                        function ValidatePageName(pageName) {
                            var validPageaName = (/^[A-Za-z\s]+$/).test(pageName);
                            if (validPageaName)
                                return true;
                            else
                                return false;
                        }
                        ReadMenu();

                        function ReadMenu() {
                            var $menu = $('#innerPageList  li');
                            $('#headerMenuList').html(BindMenuItem($menu));
                            //SortableMenu();
                            SortEvents();
                        }

                        function BindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var webbuilderID = $item.attr('data-webbuilderid');
                                var pageName = $item.find(' > a > .pageName').text();
                                html += '<div data-type="page" data-webbuilderid="' + webbuilderID + '" data-pageid="' + pageID + '" class="panel panel-info form-elements element">';
                                //html += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                html += '<span class="title">';
                                html += pageName;
                                html += '</span>';
                                //html += '<span class="showinmenu">';
                                // var checked = "checked='checked'";
                                //if ($item.hasClass('hide-element'))
                                //    checked = "";
                                //html += '<input id="page_' + pageID + '" class="showpageinmenu" type="checkbox" ' + checked + '>';
                                //html += '<label for="page_' + pageID + '"><i class="icon-icon-tick"></i></label>';
                                //html += '</span>';
                                var currentPage = false;
                                var activeCurrent = '';
                                if (pageName === portalDefaultPage) {
                                    currentPage = true;
                                    activeCurrent = "active";
                                }
                                html += '<span class="fa fa-check-circle-o activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                                //html += '<span class="previewhere fa fa-eye" title="preview page"></span>';
                                //html += '<span class="gotoeditor fa fa-outdent" title="go to editor"></span>';
                                if (!currentPage) {
                                    html += '<span class="deleteWebPage fa icon-delete" title="delete page"></span>';
                                    html += '<span class="editWebPage fa fa-pencil-square-o" title="edit page"></span>';
                                }
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body ">';
                                    //html += pageName;
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                } else {
                                    //html += '<div class="sortable panel-body">&nbsp;</div>';
                                }
                                html += "</div>";
                            });
                            return html;
                        }

                        function CheckDuplicate(newPage, pageID) {
                            var duplicate = false;
                            $parent.find('.eb-menu li').not('li[data-pageid="' + pageID + '"]').each(function (i, v) {
                                if ($(this).text().trim().toLowerCase() === newPage.toLowerCase()) {
                                    duplicate = true;
                                    return true;
                                }
                            });
                            return duplicate;
                        }

                        function ClearPageError() {
                            $('#pageError').text('');
                        }

                        function SetPageError(error) {
                            $('#pageError').text(error);
                        }

                        function RebindMenu() {
                            var $menu = $('#headerMenuList > div.panel-info');
                            var menuSpan = $('.eb-menu li a span').eq(0).attrs();
                            $('.eb-menu').html(ReBindMenuItem($menu));
                            if ($('#headerMenuList > div.panel-info').length == 1) {
                                $('#headerMenuList > div.panel-info > .deleteWebPage').remove(0);
                            }
                            $('.eb-menu span').each(function () {
                                $(this).attrs(menuSpan);
                            });
                            PagelinkStop();
                        }

                        function SortEvents() {
                            $('.deleteWebPage').off().on('click', function () {
                                var $this = $(this);
                                var tempName = $this.parent().find('.title').text();
                                SageConfirmDialog('Do you want to delete "' + tempName + '" page? All the data on the page will also be deleted.').done(function () {
                                    var pageID = $this.parent().attr('data-pageid');
                                    var pageName = $this.parent().find('.title').text();
                                    DeletePage(pageID, $this.parent(), pageName);
                                });
                            });
                            $('.editWebPage ').off().on('click', function () {
                                var pageID = $(this).parent().attr('data-pageid');
                                var webbuilderID = $(this).parent().attr('data-webbuilderid');
                                $.ajax({
                                    isPostBack: false,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    data: JSON2.stringify({
                                        pageID: pageID,
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        userModuleID: webBuilderUserModuleID,
                                        secureToken: SageFrameSecureToken
                                    }),
                                    dataType: 'json',
                                    crossDomain: true,
                                    url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/GetPageDetails',
                                    success: function (data) {
                                        var pageDetail = data.d;
                                        $('#txtPageName').val(pageDetail.PageName);
                                        $('#txtPageName').attr('data-pname', pageDetail.PageName);
                                        $('#txtPageTitle').val(pageDetail.Title);
                                        $('#txtPageDescription').val(pageDetail.Description);
                                        var pID = pageDetail.PageID;
                                        $('#pageCreateArea').attr('data-pageid', pID);
                                        $('#pageCreateArea').attr('data-webbuilderid', webbuilderID);
                                        $('#pageCreateArea').show();
                                        $('#pageListArea').hide();
                                    },
                                    error: function () {
                                        //SageFrame.messaging.show("Page adding issue", "alert");
                                    },
                                });
                            });

                            $('.activedefalutPage').not('.active').on('click', function () {
                                var pageName = $(this).attr('data-pagename');
                                SageConfirmDialog('Do you want to set ' + pageName + ' as default startupPage page ?').done(function () {
                                    SetDefaultPage(pageName, portalDefaultPage);
                                });
                            });

                        }

                        function ReBindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find('> .title').text();
                                var addliclass = 'hide-element';
                                if ($item.find('> .showinmenu').find('.showpageinmenu').is(':checked')) {
                                    addliclass = '';
                                }
                                html += '<li data-pageid="' + pageID + '" class="' + addliclass + '" >';
                                html += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension + '" class="pagelink"><span class="pageName">' + pageName + '</span></a>';
                                if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                    html += '<ul>';
                                    html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'));
                                    html += "</ul>";
                                }
                                html += "</li>";
                            });
                            return html;
                        }
                        // AddUpdatePage(2096, 'new', '', '', '');
                        function AddUpdatePage(pageID, pageName, caption, title, description, webbuilderID) {
                            var newPageID = 0;
                            var Mode = pageID > 0 ? "E" : "A";
                            var UpdateLabel = '';
                            var checks = $('div.divPermission tr:gt(0), #dvUser tr').find('input.sfCheckbox:checked');
                            lstPagePermission = [];
                            var beforeID = 0;
                            var afterID = 0;
                            if ($('#rdbBefore').prop('checked') == true) {
                                beforeID = $('#cboPositionTab').val();
                            } else if ($('#rdbAfter').prop('checked') == true) {
                                afterID = $('#cboPositionTab').val();
                            }
                            var MenuSelected = 0;
                            var _IsVisible = $('#rdbAdmin').prop('checked') ? $('#chkShowInDashboard').prop("checked") : true;
                            var lstPagePermission = [];
                            lstPagePermission[0] = {
                                "PermissionID": 1,
                                "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                                "Username": "",
                                "AllowAccess": true
                            };
                            lstPagePermission[1] = {
                                "PermissionID": 2,
                                "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                                "Username": "",
                                "AllowAccess": true
                            };
                            lstPagePermission[2] = {
                                "PermissionID": 1,
                                "RoleID": 'a87e850f-14c8-4c89-86f4-4598ff27da72',
                                "Username": "",
                                "AllowAccess": true
                            };
                            var PageDetails = {
                                PageEntity: {
                                    Mode: Mode,
                                    Caption: caption,
                                    PageID: pageID,
                                    PageName: pageName,
                                    IsVisible: true,
                                    IconFile: '',
                                    Title: title,
                                    Description: description,
                                    KeyWords: "",
                                    Url: "",
                                    StartDate: '',
                                    EndDate: '',
                                    RefreshInterval: 0,
                                    PageHeadText: "SageFrame",
                                    IsSecure: false,
                                    PortalID: parseInt(SageFramePortalID),
                                    IsActive: true,
                                    AddedBy: SageFrameUserName,
                                    BeforeID: beforeID,
                                    AfterID: afterID,
                                    IsAdmin: false,
                                    LstPagePermission: lstPagePermission,
                                    MenuList: MenuSelected,
                                    UpdateLabel: ''
                                }
                            };
                            var objTagValue = GetSeoValue('easybuilder', title, description);
                            SaveMessageShow(pageName + ' page adding');
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    "objPageInfo": PageDetails.PageEntity,
                                    Culture: 'en-US',
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken,
                                    webbuilderID: webbuilderID,
                                    objTagValue: objTagValue
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/AddUpdatePages',
                                success: function (data) {
                                    var response = data.d;
                                    if (response !== null)
                                        response = response.split(',');
                                    newPageID = { 'pageID': response[0], 'webbuilderID': response[1] };

                                    SaveMessageRemove();
                                },
                                error: function () {

                                },
                            });
                            return newPageID;
                        }

                        function GetSeoValue(type, title, desciption) {
                            var objTagValue = [];

                            //var tagValue = ['Type', 'title', 'image', 'description'];
                            //var tagID = [1, 2, 3, 4];
                            var tagValue = [type, title, desciption];
                            var tagID = [1, 2, 4];
                            $.each(tagValue, function (index, value) {
                                var objTag = {
                                    SEOMetaTagTypeID: parseInt(tagID[index]),
                                    MetaTagContent: tagValue[index]
                                };
                                objTagValue.push(objTag);
                            });
                            return objTagValue;
                        }

                        function DeletePage(pageID, $item, pageName) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    pageID: pageID,
                                    deletedBY: SageFrameUserName,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/WebBuilder/services/WebService.asmx/DeleteChildPages',
                                success: function () {
                                    $item.remove();
                                    $('.eb-menu').each(function () {
                                        var $this = $(this);
                                        $this.find('li').each(function () {
                                            var $me = $(this);
                                            var newPagename = $me.find('> a > span').text();
                                            if (newPagename === pageName) {
                                                if ($me.find(' > ul').length > 0) {
                                                    $this.append($me.find('> ul >li'));
                                                }
                                                $me.remove();
                                            }
                                        });
                                    });
                                    $('#SaveWeb').trigger('click');
                                    if (pageName === currentpageName) {
                                        window.location = window.location.href;
                                    }
                                },
                                error: function () { },
                            });
                        }

                        function SetDefaultPage(newPageName, oldPageName) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    PageName: newPageName,
                                    OldPageName: oldPageName,
                                    ActiveTemplateName: SageFrameActiveTemplate,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/UpdSettingKeyValue',
                                success: function () {
                                    portalDefaultPage = newPageName;
                                    ReadMenu();
                                    $('#chkUnderConstruction').removeClass('active');
                                    $('#underConstructionNote').hide();
                                    webBuilderSettings.isunderconstruction = false;
                                    UpdateSettings();
                                },
                                error: function () { },
                            });
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
