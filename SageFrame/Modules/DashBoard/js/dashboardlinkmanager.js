(function ($) {
    $.DashBrdLinkManager = function (p) {
        var v;
        var DashboardMgr = {
            config: {
                isPostBack: false,
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
                arrModules: [],
                baseURL: SageFrameAppPath + '/Modules/Dashboard/Services/DashboardWebService.asmx/',
                PortalID: 1,
                Path: SageFrameAppPath + '/Modules/Dashboard/',
                SaveMode: "Add",
                SidebarItemID: 0,
                QuickLinkID: 0,
                Theme: p.Theme,
                UserName: SageFrameUserName,
                PortalID: SageFramePortalID,
                PageExtension: p.PageExtension,
                userModuleId: p.userModuleId
            },
            init: function () {
                //this.BindPages('#ddlPages');
                //this.GetQuickLinks();
                //this.IconUploader();
                this.TabIconUploader();
                //$('#btnCancelSidebar').hide();
                this.BindSelectedTheme();


                DashboardMgr.BindPages('#ddlPagesSidebar');
                DashboardMgr.IconUploaderSidebar();
                DashboardMgr.LoadSidebar();
                DashboardMgr.LoadParentLinks();
                this.InitTabs();
                this.BindEvents();
                setTimeout(function () {
                    $('div.sfSidebarItems ul li div i.expand').eq(0).trigger('click');
                }, 200);
            },
            BindSelectedTheme: function () {
                $('div.sfAppearanceOptions input:radio').each(function () {
                    if ($(this).val() == DashboardMgr.config.Theme) {
                        $(this).prop("checked", true);
                    }
                });
            },
            InitTabs: function () {
                $('#tabDashboard').tabs({ fx: [null, { height: 'show', opacity: 'show' }] });
            },
            BindEvents: function () {
                v = $("#form1").validate({
                    rules: {
                        txtLnkName: { required: true },
                        txtSidebarName: { required: true }
                    },
                    messages: {
                        txtLnkName: "Please enter a Name",
                        txtSidebarName: "This field is required."
                    }
                });
                $('#lbaAddSidebarTab').on("click", function () {
                    DashboardMgr.showSideBartab();
                });
                $('#lbaAddSidebaritemTab').on("click", function () {
                    DashboardMgr.showSideBaritemtab();
                });
                $('#lblCancelTab').on("click", function () {
                    DashboardMgr.showSideBarCollection();
                });
                $('#btnCancelSidebar').on("click", function () {
                    DashboardMgr.showSideBarCollection();
                });

                $('#lbaAddSidebarTab').on("click", function () {
                    DashboardMgr.showSideBartab();
                });
                $('#txtTabName').keyup(function (e) {
                    if ($(this).val().length > 0) {
                        $('#lblError').text('');
                    }
                });


                $('#btnAddQuickLink').bind("click", function () {
                    if (v.form()) {
                        var order = $('div.sfQuicklinklist ul li:last').index();
                        order = order + 1;
                        var url = $('#ddlPages option:selected').val() + DashboardMgr.config.PageExtension;
                        var imagepath = $('div.sfUploadedFiles img.sfIcon').prop("title");
                        var param = {
                            linkObj: {
                                DisplayName: $('#txtLnkName').val(),
                                URL: url,
                                ImagePath: imagepath,
                                DisplayOrder: order,
                                PageID: $('#ddlPages').val(),
                                IsActive: $('#chkIsActiveQuicklink').prop("checked"),
                                QuickLinkID: parseInt(DashboardMgr.config.QuickLinkID)
                            },
                            UserName: DashboardMgr.config.UserName,
                            PortalID: DashboardMgr.config.PortalID,
                            userModuleId: DashboardMgr.config.userModuleId,
                            secureToken: SageFrameSecureToken
                        };
                        $.ajax({
                            type: DashboardMgr.config.type,
                            contentType: DashboardMgr.config.contentType,
                            cache: DashboardMgr.config.cache,
                            url: DashboardMgr.config.SaveMode == "Add" ? DashboardMgr.config.baseURL + "AddLink" : DashboardMgr.config.baseURL + "UpdateLink",
                            data: JSON2.stringify(param),
                            dataType: DashboardMgr.config.dataType,
                            success: function (msg) {
                                SageFrame.messaging.show(DashboardMgr.GetLocalizedMessage("en-US", "DashboardManager", "LinkAddedSuccessfully"), "Success");
                                DashboardMgr.GetQuickLinks();
                                $('#txtLnkName').val('');
                                $('#ddlPages').val('');
                                $('div.sfUploadedFiles').html('');
                                $('span.filename').text('No file selected');
                            },
                            complete: function () {

                                FormFieldComplete();
                            }
                        });
                    }
                    else {
                        return;
                    }
                });
                $('div.sfSidebarItems').on('click', 'ul li.parent i.expand', function () {
                    $(this).parent().next("ul").slideDown();
                    $(this).removeClass("expand icon-arrow-slim-s").addClass("collapse icon-arrow-slim-n");
                });
                $('div.sfSidebarItems').on('click', 'ul li.parent i.collapse', function () {
                    $(this).parent().next("ul").slideUp();
                    $(this).removeClass("collapse icon-arrow-slim-n").addClass("expand icon-arrow-slim-s");
                });

                $('div.sfSidebarItems').on('click', 'ul li.parent ul li.child i.expand', function () {
                    $(this).parent().next("ul").slideDown();
                    $(this).removeClass("expand icon-arrow-slim-s").addClass("collapse icon-arrow-slim-n");
                });
                $('div.sfSidebarItems').on('click', 'ul li.child i.collapse', function () {
                    $(this).parent().next("ul").slideUp();
                    $(this).removeClass("collapse icon-arrow-slim-n").addClass("expand icon-arrow-slim-s");
                });

                $('#tabDashboard li.tab-sidebar a').bind("click", function () {
                    DashboardMgr.BindPages('#ddlPagesSidebar');
                    DashboardMgr.IconUploaderSidebar();
                    DashboardMgr.LoadSidebar();
                    DashboardMgr.LoadParentLinks();
                });

                $('#lblSaveTab').bind("click", function () {
                    if ($('#txtTabName').val().trim().length > 0) {
                        $('#lblError').text('');
                        DashboardMgr.config.SaveMode == "Add";
                        if (DashboardMgr.config.SaveMode == "Add") {
                            var order = $('div.sfSidebarItems ul').children('li.index:last').index();
                            order = order + 1;
                            var url = ($('#txtTabName').val()) + DashboardMgr.config.PageExtension;
                            var imagepath = $('div.sfUploadedTabIcon img.sfIcon').prop("title");
                            var depth = 0;

                            var param = {
                                sidebarObj: {
                                    DisplayName: $('#txtTabName').val(),
                                    Depth: depth,
                                    ImagePath: imagepath,
                                    URL: url,
                                    ParentID: 0,
                                    IsActive: true,
                                    DisplayOrder: order,
                                    SidebarItemID: parseInt(DashboardMgr.config.SidebarItemID),
                                    PageID: 2
                                },
                                UserName: DashboardMgr.config.UserName,
                                PortalID: DashboardMgr.config.PortalID,
                                userModuleId: DashboardMgr.config.userModuleId,
                                secureToken: SageFrameSecureToken
                            };
                            $.ajax({
                                type: DashboardMgr.config.type,
                                contentType: DashboardMgr.config.contentType,
                                cache: DashboardMgr.config.cache,
                                url: DashboardMgr.config.SaveMode == "Add" ? DashboardMgr.config.baseURL + "AddSidebar" : DashboardMgr.config.baseURL + "UpdateSidebarLinks",
                                data: JSON2.stringify(param),
                                dataType: DashboardMgr.config.dataType,
                                success: function (msg) {
                                    DashboardMgr.LoadSidebar();
                                    DashboardMgr.LoadParentLinks();
                                    DashboardMgr.InitTabs();
                                    DashboardMgr.BindEvents();
                                    DashboardMgr.showSideBarCollection();
                                    SageFrame.messaging.show("Sidebar added succesfully", "success");
                                }
                            });
                        }
                    }
                    else {
                        $('#lblError').text("This field is required.").show().addClass('sfError');
                    }
                });


                $('#btnAddSidebar').bind("click", function () {
                    if (DashboardMgr.config.SaveMode == "Add") {
                        var count = $('div.sfSidebarItems ul>li.parent').length + $('div.sfSidebarItems ul>li.single').length;
                        if (count > 15) {
                            SageAlertDialog("Cannot add more than 16 items in the sidebar", "Too much sidebar  items");
                        }
                    }
                    if (v.form()) {
                        var order = $('div.sfSidebarItems ul li:last').index();
                        order = order + 2;
                        var url = $('#ddlPagesSidebar option:selected').val() + DashboardMgr.config.PageExtension;
                        var imagepath = $('div.sfUploadedFilesSidebar img.sfIcon').prop("title");
                        var depth = $('#ddlParentLinks').val() > 0 ? $('#ddlParentLinks').val() : 0;
                        var param = {
                            sidebarObj: {
                                DisplayName: $('#txtSidebarName').val(),
                                Depth: depth,
                                ImagePath: imagepath,
                                URL: url,
                                ParentID: $('#ddlParentLinks').val(),
                                IsActive: $('#chkIsActiveSidebar').prop("checked"),
                                DisplayOrder: order,
                                SidebarItemID: parseInt(DashboardMgr.config.SidebarItemID),
                                PageID: $('#ddlPagesSidebar').val()
                            },
                            UserName: DashboardMgr.config.UserName,
                            PortalID: DashboardMgr.config.PortalID,
                            userModuleId: DashboardMgr.config.userModuleId,
                            secureToken: SageFrameSecureToken
                        };
                        $.ajax({
                            type: DashboardMgr.config.type,
                            contentType: DashboardMgr.config.contentType,
                            cache: DashboardMgr.config.cache,
                            url: DashboardMgr.config.SaveMode == "Add" ? DashboardMgr.config.baseURL + "AddSidebar" : DashboardMgr.config.baseURL + "UpdateSidebarLinks",
                            data: JSON2.stringify(param),
                            dataType: DashboardMgr.config.dataType,
                            success: function (msg) {
                                DashboardMgr.LoadSidebar();
                                DashboardMgr.LoadParentLinks();
                                //DashboardMgr.LoadRealSidebar();
                                $('#btnAddSidebar').text("Add Sidebar Item").addClass("icon-addnew").removeClass("icon-save");
                                $('#btnCancelSidebar').hide();
                                $('#txtSidebarName').val('');
                                $('#ddlParentLinks').val(0);
                                $('#ddlPagesSidebar').val('');
                                $('span.filename').text('No file selected');
                                $('div.sfUploadedFilesSidebar').html('');
                            }
                        });
                    }
                    else {
                        return;
                    }
                });
                $('div.sfSidebarItems').on('click', 'i.delete', function () {
                    var self = $(this);
                    SageConfirmDialog('Are you sure you want to delete this item?').done(function () {
                        DashboardMgr.DeleteSidebarItem($(self).prop("id"));
                    });
                });
                $('.sfQuicklinklist').on('click', 'i.edit', function () {
                    var id = $(this).prop("id").replace("edit_", "");
                    DashboardMgr.LoadQuickLinkItem(id);
                    $('#btnAddQuickLink').text("Save").addClass("sfSave").removeClass("sfAdd");
                    $('#btnCancelQuickLink').show();
                    DashboardMgr.config.QuickLinkID = id;
                    DashboardMgr.config.SaveMode = "Edit";
                });
                $('div.sfSidebarItems').on('click', 'i.edit', function () {
                    $('.sfAddSidebar').show();
                    $('#divSidebarTab').hide();
                    var id = $(this).prop("id").replace("edit_", "");
                    DashboardMgr.LoadSidebarItem(id);
                    $('#btnAddSidebar').text("Save").addClass("icon-save").removeClass("icon-addnew");
                    $('#btnCancelSidebar').show();
                    DashboardMgr.config.SidebarItemID = id;
                    DashboardMgr.config.SaveMode = "Edit";
                });
                $('#btnSaveSidebarOrder').bind("click", function () {
                    var li = $('div.sfSidebarItems ul li');
                    var param = { OrderList: [], UserName: DashboardMgr.config.UserName, PortalID: DashboardMgr.config.PortalID, userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken };
                    $.each(li, function () {
                        param.OrderList.push({ "Key": $(this).prop("id").replace("li_", ""), "Value": parseInt($(this).index()) + 1 });

                    });
                    $.ajax({
                        type: DashboardMgr.config.type,
                        contentType: DashboardMgr.config.contentType,
                        cache: DashboardMgr.config.cache,
                        url: DashboardMgr.config.baseURL + "ReorderSidebar",
                        data: JSON2.stringify(param),
                        dataType: DashboardMgr.config.dataType,
                        success: function (msg) {
                            DashboardMgr.LoadSidebar();
                            DashboardMgr.LoadParentLinks();
                            $('#txtSidebarName').val('');
                            $('#ddlParentLinks').val(0);
                            $('#ddlPagesSidebar').val('');
                            $('div.sfUploadedFilesSidebar').html('');
                        }
                    });
                });
                $('#btnSaveQuickLinkOrder').bind("click", function () {
                    var li = $('div.sfQuicklinklist ul li');
                    var param = { OrderList: [], UserName: DashboardMgr.config.UserName, PortalID: DashboardMgr.config.PortalID, userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken };
                    $.each(li, function () {
                        param.OrderList.push({ "Key": $(this).prop("id").replace("ql_", ""), "Value": parseInt($(this).index()) + 1 });
                    });
                    $.ajax({
                        type: DashboardMgr.config.type,
                        contentType: DashboardMgr.config.contentType,
                        cache: DashboardMgr.config.cache,
                        url: DashboardMgr.config.baseURL + "ReorderQuickLinks",
                        data: JSON2.stringify(param),
                        dataType: DashboardMgr.config.dataType,
                        success: function (msg) {
                            DashboardMgr.GetQuickLinks();
                            $('#txtLnkName').val('');
                            $('#ddlPages').val('');
                            $('div.sfUploadedFiles').html('');
                            SageFrame.messaging.show(SageFrame.messaging.GetLocalizedMessage("en-US", "DashboardManager", "ItemOrderSaved"), "Success");
                        }
                    });
                });
                //$('#btnCancelSidebar').bind("click", function () {
                //    $('#txtSidebarName').val('');
                //    $('#ddlParentLinks').val(0);
                //    $('#ddlPagesSidebar').val('');
                //    $('div.sfUploadedFilesSidebar').html('');
                //    $('#btnAddSidebar').text("Add Sidebar Item").addClass("icon-addnew").removeClass("icon-save");
                //    $('#btnCancelSidebar').hide();
                //    DashboardMgr.config.SidebarItemID = 0;
                //    DashboardMgr.config.SaveMode = "Add";
                //});
                $('#btnCancelQuickLink').bind("click", function () {
                    $('#txtLnkName').val('');
                    $('#ddlPages').val('');
                    $('div.sfUploadedFiles').html('');
                    $('#btnAddQuickLink').text("Add QuickLink Item").addClass("sfAdd").removeClass("sfSave");
                    $('#btnCancelQuickLink').hide();
                    DashboardMgr.config.QuickLinkItemID = 0;
                    DashboardMgr.config.SaveMode = "Add";
                });
                $('#btnSaveAppearance').bind("click", function () {
                    var option = $('div.sfAppearanceOptions input:radio:checked').val();
                    var param = JSON2.stringify({ theme: option, PortalID: 1, UserName: 'superuser', userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken });
                    $.ajax({
                        type: DashboardMgr.config.type,
                        contentType: DashboardMgr.config.contentType,
                        cache: DashboardMgr.config.cache,
                        url: DashboardMgr.config.baseURL + "UpdateAppearance",
                        data: param,
                        dataType: DashboardMgr.config.dataType,
                        success: function (msg) {
                            SageFrame.messaging.show(SageFrame.messaging.GetLocalizedMessage("en-US", "DashboardManager", "ThemeChanged"), "Success");
                        }
                    });
                });
                $('#btnRefresh').bind("click", function () {
                    location.reload();
                });
                $('#tabDashboard').on('click', '.deleteIcon', function () {
                    var IconPath = $('.sfIcon').prop('title');
                    $('.sfIcon').parent('div').remove();
                    DashboardMgr.DeleteIcon(IconPath);
                });
                $('div.sfQuicklinklist').on('click', 'i.delete', function () {
                    var self = $(this);
                    SageConfirmDialog('Are you sure you want to delete this item?').done(function () {
                        DashboardMgr.DeleteLink($(self).prop("id"));
                    });
                });
            },

            showSideBarCollection: function () {
                $('.sfAddSidebar').hide();
                $('#divSidebarTab').hide();
                $('.sfSidebarItemWrapper').show();
                $('#lblError').text("");
            },
            showSideBartab: function () {
                $('.sfAddSidebar').hide();
                $('#divSidebarTab').show();
                $('.sfSidebarItemWrapper').hide();
                $('#lblError').text("");
                v.resetForm();
            },
            showSideBaritemtab: function () {
                $('.sfAddSidebar').show();
                $('#divSidebarTab').hide();
                $('.sfSidebarItemWrapper').hide();
                $('#lblError').text("");
                v.resetForm();
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: this.config.type,
                    contentType: this.config.contentType,
                    cache: this.config.cache,
                    url: this.config.url,
                    data: this.config.data,
                    dataType: this.config.dataType,
                    success: this.ajaxSuccess,
                    error: this.ajaxFailure
                });
            },
            ajaxCall_return: function (url, param) {
                var data = null;
                $.ajax({
                    type: this.config.type,
                    contentType: this.config.contentType,
                    cache: this.config.cache,
                    url: url,
                    async: false,
                    data: '{}',
                    dataType: this.config.dataType,
                    success: function (msg) { data = msg.d; },
                    error: this.ajaxFailure
                });
                return data;
            },
            initsort: function () {
                $('div.sfQuicklinklist ul').sortable({ 'cursor': 'crosshair', 'placeholder': 'sfHighlight' });
                $('div.sfSidebarItems ul').sortable({ 'cursor': 'move', 'placeholder': 'sfHighlight' });
                $('div.sfSidebarItems ul li ul').sortable({ 'cursor': 'move' });
            },
            DeleteIcon: function (IconPath) {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "DeleteIcon",
                    data: JSON2.stringify({ IconPath: IconPath }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                    }
                });
            },
            BindPages: function (id) {
                var param = JSON2.stringify({ PortalID: parseInt(DashboardMgr.config.PortalID), userModuleId: DashboardMgr.config.userModuleId, UserName: SageFrameUserName, secureToken: SageFrameSecureToken });
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetPages",
                    data: param,
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var pages = msg.d;
                        var html = '';
                        $.each(pages, function (index, item) {
                            html += '<option value=' + item.PageID + '>' + item.PageName + '</option>';
                        });
                        $(id).html(html);
                        AjaxLoadingHide();
                    }
                });
            },
            LoadSidebar: function () {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetSidebar",
                    data: JSON2.stringify({ UserName: DashboardMgr.config.UserName, PortalID: DashboardMgr.config.PortalID, userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var links = msg.d;
                        var html = '<ul>';
                        $.each(links, function (index, item) {
                            var editid = "edit_" + item.SidebarItemID;
                            var liid = 'li_' + item.SidebarItemID;
                            if (item.ChildCount == 0 && item.ParentID == 0) {
                                html += '<li id=' + liid + ' class="single index"><span class="title">' + item.DisplayName + '</span>';
                                html += '<i class="delete icon-delete" id=' + item.SidebarItemID + ' ></i>';
                                html += '<i class="edit icon-edit" id=' + editid + '></i>';
                                html += '</li>';
                            }
                            else if (item.ChildCount > 0 && item.ParentID == 0) {
                                html += '<li id=' + liid + ' class="parent index"><div class="sfHolder"><span class="title">' + item.DisplayName + '</span>';
                                html += "<i class='expand'></i>";
                                html += '<i class="delete icon-delete" id=' + item.SidebarItemID + ' ></i>';
                                html += '<i class="edit icon-edit" id=' + editid + ' ></i>';
                                html += '</div><ul>';
                                $.each(links, function (i, child) {
                                    if (child.ParentID == item.SidebarItemID && child.ChildCount == 0) {
                                        var edit = 'edit_' + child.SidebarItemID;
                                        var liid = 'li_' + child.SidebarItemID;
                                        html += '<li id=' + liid + ' class="child"><span>' + child.DisplayName + '</span>';
                                        html += '<i class="delete icon-delete" id=' + child.SidebarItemID + '></i>';
                                        html += '<i class="edit icon-edit" id=' + edit + '></i>';
                                        html += '</li>';
                                    }
                                    else if (child.ParentID == item.SidebarItemID && child.ChildCount > 0) {
                                        var edit = 'edit_' + child.SidebarItemID;
                                        var liid = 'li_' + child.SidebarItemID;
                                        html += '<li id=' + liid + ' class="child"><div class="sfHolder"><span>' + child.DisplayName + '</span>';
                                        html += "<i class='expand icon-arrow-slim-s'></i>";
                                        html += '<i class="delete icon-delete" id=' + child.SidebarItemID + ' ></i>';
                                        html += '<i class="edit icon-edit" id=' + edit + '></i></div><ul>';
                                        $.each(links, function (i, grandChild) {
                                            if (grandChild.ParentID == child.SidebarItemID && grandChild.ChildCount == 0) {
                                                var edit = 'edit_' + grandChild.SidebarItemID;
                                                var liid = 'li_' + grandChild.SidebarItemID;
                                                html += '<li id=' + liid + '><span>' + grandChild.DisplayName + '</span>';
                                                html += '<i class="delete icon-delete" id=' + grandChild.SidebarItemID + ' ></i>';
                                                html += '<i class="edit icon-edit" id=' + edit + ' ></i>';
                                                html += '</li>';
                                            }
                                        });
                                        html += '</ul></li>';
                                    }
                                });
                                html += '</ul>';
                                html += '</li>';
                            }
                        });
                        html += '</ul>';

                        $('div.sfSidebarItems').html(html);
                        DashboardMgr.initsort();
                        AjaxLoadingHide();
                    }
                });
            },
            LoadRealSidebar: function () {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetSidebar",
                    data: JSON2.stringify({ UserName: DashboardMgr.config.UserName, PortalID: SageFramePortalID, userModuleId: DashboardMgr.config.userModuleId }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var links = msg.d;
                        var html = '<ul class="menu">';
                        $.each(links, function (index, item) {
                            var image = DashboardMgr.config.Path + "Icons/" + item.ImagePath;
                            var url = SageFrameAppPath + item.URL;
                            if (item.ChildCount == 0 && item.ParentID == 0) {
                                html += '<li><a href=' + url + '><img src=' + image + '><span>' + item.DisplayName + '</span></a></li>';
                            }
                            else if (item.ChildCount > 0) {
                                html += '<li class="parent"><a href="#"><img src=' + image + ' ><span>' + item.DisplayName + '</span></a>';
                                html += '<ul class="acitem">';
                                $.each(links, function (i, it) {
                                    if (it.ParentID == item.SidebarItemID) {
                                        html += '<li><a href="#">' + it.DisplayName + '</a></li>';
                                    }
                                });
                                html += '</ul>';
                                html += '</li>';
                            }
                        });
                        html += '</ul>';
                        var toggleSwitch = '<div class="sfHidepanel clearfix"><a href="#"><img src="/Administrator/Templates/Default/images/hide-arrow.png" alt="Hide " /><span>Hide Panel</span></a></div>';
                        $('div.sfSidebar').html(html).append(toggleSwitch);
                        $('.menu').initMenu();
                        AjaxLoadingHide();
                    }
                });
            },
            LoadSidebarItem: function (sidebaritemid) {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetSidebarItem",
                    data: JSON2.stringify({ SidebarItemID: parseInt(sidebaritemid) }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var sidebar = msg.d;
                        var html = '';
                        $('#txtSidebarName').val(sidebar.DisplayName);
                        $('#chkIsActiveSidebar').prop("checked", sidebar.IsActive);
                        if (sidebar.ImagePath != "") {
                            var image = DashboardMgr.config.Path + "Icons/" + sidebar.ImagePath;
                            var html = '<div><img class="sfIcon" title=' + sidebar.ImagePath + ' src="' + image + '" /><i class="deleteIcon icon-close"></i></div>';
                            $('div.sfUploadedFilesSidebar').html(html);
                        }
                        $('#ddlPagesSidebar').val(sidebar.URL.replace(DashboardMgr.config.PageExtension, ""));
                        $('#ddlParentLinks').val(sidebar.ParentID);
                        AjaxLoadingHide();
                        FormFieldComplete();
                    }
                });
            },
            LoadParentLinks: function () {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetParentLinks",
                    data: JSON2.stringify({ SidebarItemID: parseInt(0), UserName: DashboardMgr.config.UserName, PortalID: SageFramePortalID, userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var links = msg.d;
                        var html = '';
                        $.each(links, function (index, item) {
                            html += '<option value=' + item.SidebarItemID + '>' + item.DisplayName + '</option>';
                        });
                        $('#ddlParentLinks').html(html);
                        AjaxLoadingHide();
                    }
                });
            },
            DeleteLink: function (quicklinkid) {

                var param = JSON2.stringify({
                    QuickLinkID: parseInt(quicklinkid),
                    UserName: DashboardMgr.config.UserName,
                    PortalID: DashboardMgr.config.PortalID,
                    userModuleId: DashboardMgr.config.userModuleId,
                    secureToken: SageFrameSecureToken
                });
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "DeleteQuickLink",
                    data: param,
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        SageFrame.messaging.show(DashboardMgr.GetLocalizedMessage("en-US", "DashboardManager", "LinkDeletedSuccessfully"), "Success");
                        DashboardMgr.GetQuickLinks();
                        AjaxLoadingHide();
                    }
                });
            },
            DeleteSidebarItem: function (sidebaritemid) {
                var param = JSON2.stringify({
                    SidebarItemID: parseInt(sidebaritemid),
                    UserName: DashboardMgr.config.UserName,
                    PortalID: DashboardMgr.config.PortalID,
                    userModuleId: DashboardMgr.config.userModuleId,
                    secureToken: SageFrameSecureToken
                });
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "DeleteSidebarItem",
                    data: param,
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        DashboardMgr.LoadSidebar();
                        DashboardMgr.LoadParentLinks();
                        AjaxLoadingHide();
                    }
                });
            },
            GetLocalizedMessage: function (culturecode, modulename, messagetype) {
                var message = "";
                var param = JSON2.stringify({ CultureCode: culturecode, ModuleName: modulename, MessageType: messagetype });
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetLocalizedMessage",
                    data: param,
                    dataType: DashboardMgr.config.dataType,
                    async: false,
                    success: function (msg) {
                        message = msg.d;
                    }
                });
                return message;
            },
            GetQuickLinks: function () {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetQuickLinks",
                    data: JSON2.stringify({ UserName: DashboardMgr.config.UserName, PortalID: DashboardMgr.config.PortalID, userModuleId: DashboardMgr.config.userModuleId, secureToken: SageFrameSecureToken }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var links = msg.d;
                        var html = '<ul>';
                        $.each(links, function (index, item) {
                            var editid = 'edit_' + item.QuickLinkID;
                            var id = 'ql_' + item.QuickLinkID;

                            html += '<li id=' + id + '><span class="title">' + item.DisplayName + '</span>';
                            html += '<i class="delete icon-delete" id=' + item.QuickLinkID + '></i>';
                            html += '<i class="edit icon-edit" id=' + editid + '></i>';
                            html += '</li>';
                        });
                        html += '</ul>';
                        $('div.sfQuicklinklist').html(html);
                        DashboardMgr.initsort();
                        AjaxLoadingHide();
                    }
                });
            },
            GetRealQuickLinks: function () {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetQuickLinks",
                    data: JSON2.stringify({ UserName: DashboardMgr.config.UserName, PortalID: DashboardMgr.config.PortalID, userModuleId: DashboardMgr.config.userModuleId }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var links = msg.d;
                        var html = '<ul>';
                        $.each(links, function (index, item) {
                            var image = DashboardMgr.config.Path + "Icons/" + item.ImagePath;
                            var url = SageFrameAppPath + item.URL;
                            html += '<li><a href=' + url + '><img src=' + image + ' width="24" height="24" alt=' + item.DisplayName + ' /><span>' + item.DisplayName + '</span></a></li>';
                        });
                        html += '</ul>';
                        $('div.sfquicklinks').html(html);
                        $('div.sfquicklinks').jcarousel();
                    }
                });
            },
            LoadQuickLinkItem: function (quicklinkitemid) {
                $.ajax({
                    type: DashboardMgr.config.type,
                    contentType: DashboardMgr.config.contentType,
                    cache: DashboardMgr.config.cache,
                    url: DashboardMgr.config.baseURL + "GetQuickLinkItem",
                    data: JSON2.stringify({ QuickLinkItemID: parseInt(quicklinkitemid) }),
                    dataType: DashboardMgr.config.dataType,
                    success: function (msg) {
                        var quicklink = msg.d;
                        var html = '';
                        $('#txtLnkName').val(quicklink.DisplayName);
                        $('#chkIsActiveQuicklink').prop("checked", quicklink.IsActive);

                        if (quicklink.ImagePath != "") {
                            var image = DashboardMgr.config.Path + "Icons/" + quicklink.ImagePath;
                            //var html = '<div><img class="sfIcon" title=' + quicklink.ImagePath + ' src="' + image + '" /><span class="deleteIcon"><img class="delete" src=' + SageFrame.utils.GetAdminImage("imgdelete.png") + ' alt="delete"/></span></div>';
                            var html = '<div><img class="sfIcon" title=' + quicklink.ImagePath + ' src="' + image + '" /><i class="deleteIcon icon-delete"></i></div>';
                            $('div.sfUploadedFiles').html(html);
                        }
                        $('#ddlPages').val(quicklink.URL.replace(DashboardMgr.config.PageExtension, ""));
                    }
                });
            },
            IconUploader: function () {
                var uploadFlag = false;
                var upload = new AjaxUpload($('#fupIcon'), {
                    action: DashboardMgr.config.Path + 'UploadHandler.ashx?userModuleId=' + DashboardMgr.config.userModuleId + '&portalID=' + SageFramePortalID + '&userName=' + SageFrameUserName + '&secureToken=' + SageFrameSecureToken,
                    name: 'myfile[]',
                    multiple: false,
                    data: {},
                    autoSubmit: true,
                    responseType: 'json',
                    onChange: function (file, ext) {
                    },
                    onSubmit: function (file, ext) {
                        ext = ext.toLowerCase();
                        if (ext == "png" || ext == "jpg" || ext == "gif" || ext == "bmp" || ext == "JPEG" || ext == "jpeg" || ext == "ico") {
                            return true;
                        }
                        else {
                            SageAlertDialog('Not a valid image file!', 'Invalid File');
                            return false;
                        }
                    },
                    onComplete: function (file, response) {
                        if (response == "LargeImagePixel") {
                            SageAlertDialog("The image size is too large in pixel", 'Large image  pixel');
                        }
                        var linkicon = file.split(" ").join("_");
                        var filePath = DashboardMgr.config.Path + "Icons/" + linkicon;
                        $('div.sfAddQuickLink span.filename').text(linkicon);
                        var html = '<div><img class="sfIcon" title="' + linkicon + '" src="' + filePath + '" /><span class="deleteIcon"><img class="delete" src=' + SageFrame.utils.GetAdminImage("imgdelete.png") + ' alt="delete"/></span></div>';
                        $('div.sfUploadedFiles').html(html);
                    }
                });
            },
            TabIconUploader: function () {
                var uploadFlag = false;
                var upload = new AjaxUpload($('#fupTabIcon'), {
                    action: DashboardMgr.config.Path + 'UploadHandler.ashx?userModuleId=' + DashboardMgr.config.userModuleId + '&portalID=' + SageFramePortalID + '&userName=' + SageFrameUserName + '&secureToken=' + SageFrameSecureToken,
                    name: 'myfile[]',
                    multiple: false,
                    data: {},
                    autoSubmit: true,
                    responseType: 'json',
                    onChange: function (file, ext) {
                    },
                    onSubmit: function (file, ext) {
                        ext = ext.toLowerCase();
                        if (ext == "png" || ext == "jpg" || ext == "gif" || ext == "bmp" || ext == "JPEG" || ext == "jpeg" || ext == "ico") {
                            return true;
                        }
                        else {
                            SageAlertDialog('Not a valid image file!', 'Invalid File');
                            return false;
                        }
                    },
                    onComplete: function (file, response) {
                        if (response == "LargeImagePixel") {
                            SageAlertDialog("The image size is too large in pixel", 'Large image  pixel');
                        }
                        var linkicon = file.split(" ").join("_");
                        var filePath = DashboardMgr.config.Path + "Icons/" + linkicon;
                        $('div.sfAddQuickLink span.filename').text(linkicon);
                        var html = '<div><img class="sfIcon" title="' + linkicon + '" src="' + filePath + '" /><span class="deleteIcon"><img class="delete" src=' + SageFrame.utils.GetAdminImage("imgdelete.png") + ' alt="delete"/></span></div>';
                        $('div.sfUploadedTabIcon').html(html);
                    }
                });
            },
            IconUploaderSidebar: function () {
                var uploadFlag = false;
                var upload = new AjaxUpload($('#fupIconSidebar'), {
                    action: DashboardMgr.config.Path + 'UploadHandler.ashx?userModuleId=' + DashboardMgr.config.userModuleId + '&portalID=' + SageFramePortalID + '&userName=' + SageFrameUserName + '&secureToken=' + SageFrameSecureToken,
                    name: 'myfile[]',
                    multiple: false,
                    data: {},
                    autoSubmit: true,
                    responseType: 'json',
                    onChange: function (file, ext) {
                    },
                    onSubmit: function (file, ext) {
                        ext = ext.toLowerCase();
                        if (ext == "png" || ext == "jpg" || ext == "gif" || ext == "bmp" || ext == "JPEG" || ext == "jpeg" || ext == "ico") {
                            return true;
                        }
                        else {
                            SageAlertDialog('Not a valid image file!', 'Invalid File');
                            return false;
                        }
                    },
                    onComplete: function (file, response) {
                        if (response == "LargeImagePixel") {
                            SageAlertDialog("The image size is too large in pixel", 'Large image  pixel');
                        }
                        var sidebaricon = file.split(" ").join("_");
                        var filePath = DashboardMgr.config.Path + "Icons/" + sidebaricon;
                        $('div.sfAddSidebar span.filename').text(sidebaricon);
                        var html = '<div><img class="sfIcon" title="' + sidebaricon + '" src="' + filePath + '" /><i class="deleteIcon icon-close"></span></div>';
                        $('div.sfUploadedFilesSidebar').html(html);
                    }
                });
            }
        };
        DashboardMgr.init();
    }
    $.fn.DashBrdLinkManager = function (p) {
        $.DashBrdLinkManager(p);
    }
})(jQuery);