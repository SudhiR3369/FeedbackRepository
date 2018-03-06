/// <reference path="this.js" />
/// <reference path="../Services/DashboardWebService.asmx" />
/// <reference path="../Services/DashboardWebService.asmx" />
(function ($) {
    var $validator;
    var $editValue = false;

    $.Quickview = function (p) {
        p = $.extend({
            modulePath: '',
            DataObj: '',
            userModuleID: '',
        }, p);
        ManageView = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: '/Modules/DashBoard/Services/DashboardWebService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                culture: 'en-US'
            },
            init: function () {
                ManageView.Events();
                ManageView.BindGroupEvents();
                ManageView.DragandDropEvents();
            },
            Events: function () {

                $('#divFlying').removeClass('show').removeAttr('style');
                $('#btnToggleGroup').on('click', function () {
                    $('#groupError').hide();
                    $('#divFlying').attr('data-groupid', 0);
                    $('#txtgrpName').val('');
                    if ($('#divFlying').hasClass('show')) {
                        $('#divFlying').removeClass('show').hide();
                    }
                    var $this = $(this);
                    ManageView.ControlDivFlyingPosition($this);
                    $('#divFlying').toggleClass('show').slideToggle("400");
                    if ($('#adminPagesList').hasClass('show')) {
                        $('#adminPagesList').removeClass('show').slideUp('400');
                        $('#tooglePageList').parent().removeClass('open');
                    }
                });
                $('#adminPagesList').removeClass('show').removeAttr('style');
                $('#tooglePageList').on('click', function () {
                    var $this = $(this);
                    $('#adminPagesList').toggleClass('show').slideToggle("400");
                    $this.parent().toggleClass('open');
                    if ($('#divFlying').hasClass('show')) {
                        $('#divFlying').removeClass('show').slideUp('400');
                    }
                });
                $('#spnCancelGroup').on('click', function () {
                    $('#divFlying').removeClass('show').slideUp('400');
                    $('#txtgrpName').val('');
                });
                $('#closeAdminPagelist').on('click', function () {
                    $('#adminPagesList').removeClass('show').slideUp('400');
                    $('#groupError').hide();
                });
                $('#spnCreateGroup').on('click', function () {
                    var groupName = $('#txtgrpName').val().trim();
                    if (groupName.length > 0) {
                        $('#groupError').hide();
                        if (ManageView.CheckGroupDuplicate(groupName)) {
                            var groupID = $('#divFlying').attr('data-groupid');
                            ManageView.AddUpdateGroup(groupID, groupName, 0);
                        }
                        else {
                            $('#groupError').text('This name already exists').show();
                        }
                    }
                    else {
                        $('#groupError').text('This is required field').show();
                    }
                });
                ManageView.CalculateExpandBox();
            },
            BindGroupEvents: function () {
                $('.deleteGroup').off().on('click', function () {
                    var $this = $(this);
                    SageConfirmDialog('Are you sure you want to delete this group?').done(function () {
                        ManageView.DeleteGroup($this);
                    });
                });
                $('.editGroup').off().on('click', function () {
                    $('#groupError').hide();
                    if ($('#divFlying').hasClass('show')) {
                        $('#divFlying').removeClass('show').hide();
                    }
                    var $this = $(this);
                    var groupID = $this.parents('.window-box').find('.pagelist').attr('data-groupid');
                    var groupName = $this.parents('.head-right').prev().find('span').text();
                    $('#txtgrpName').val(groupName);
                    if (groupID > 0) {
                        $('#divFlying').attr('data-groupid', groupID);
                        ManageView.ControlDivFlyingPosition($this);
                        $('#divFlying').addClass('show').slideToggle("400");
                    }
                });
            },
            CalculateExpandBox: function () {
                var screenHeight = $(window).height() - $('.sfTopbar').height() - Math.abs($('#adminPagesList > h3').height()) - Math.abs($('.sfDashboard > p').height()) - 100;
                $('.sfDashboard > .pagelist ').css('height', screenHeight);
                $(window).scroll(function () {                    
                    var window_top = $(window).scrollTop();
                    var barheight = $('.sfTopbar').height();
                    if (window_top > barheight) {
                        $('#adminPagesList').css({
                            'left': $('#adminPagesList').offset().left,
                            'top': barheight,
                            'position': 'fixed'
                        });
                    }
                    else {
                        $('#adminPagesList').css({
                            'left': '40px',
                            'top': '-15px',
                            'position': 'absolute'
                        });
                    }
                });
            },
            ControlDivFlyingPosition: function ($elem) {
                var elemtop = $elem.offset().top;
                var elemleft = $elem.offset().left;
                var elemheight = $elem.height();
                $('#divFlying').css({ top: (elemtop + elemheight + 15), left: elemleft });
            },
            CreateGroupBox: function (groupName, groupID) {
                var html = '<div class="window-box">';
                html += '<div class="box-head clearfix">';
                html += '<div class="head-left">';
                html += ' <i class="fa fa-check-square-o" aria-hidden="true"></i>';
                html += ' <span>' + groupName + '</span>';
                html += '</div>';
                html += '<div class="head-right">';
                html += '<span><i class="fa fa-edit editGroup" aria-hidden="true"></i></span>';
                html += '<span><i class="fa fa-arrows dragGroup" aria-hidden="true"></i></span>';
                html += '<span><i class="fa fa-times deleteGroup" aria-hidden="true"></i></span>';
                html += '</div>';
                html += '</div>';
                html += '<div class="box-content">';
                html += '<div class="group">';
                html += '<ul class="pagelist clearfix" data-groupid="' + groupID + '">';
                html += '</ul>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                return html;
            },
            AddUpdateGroup: function (groupID, groupName, groupOrder) {
                var param = {
                    objGroupInfo: {
                        GroupID: groupID,
                        GroupName: groupName,
                        GroupOrder: groupOrder,
                        Status: status,
                        AddedBy: SageFrameUserName,
                        UpdatedBy: SageFrameUserName,
                        GroupType: "quickview",
                        PortalID: parseInt(SageFramePortalID),
                        UserModuleID: this.config.PortalID,
                        Culture: this.config.culture,
                        SageFrameSecuretoken: SageFrameSecureToken
                    }
                }
                $.ajax({
                    type: this.config.type,
                    contentType: this.config.contentType,
                    cache: this.config.cache,
                    url: this.config.baseURL + "AddUpdateGroup",
                    data: JSON2.stringify(param),
                    dataType: this.config.dataType,
                    success: function (msg) {
                        var newGroupID = msg.d;
                        if (newGroupID > 0 && groupID == 0) {
                            $('.GroupHolder').prepend(ManageView.CreateGroupBox(groupName, msg.d));
                            $('#btnToggleGroup').trigger('click');
                            $('#tooglePageList').trigger('click');
                            $('#txtgrpName').val('');
                            ManageView.DragandDropEvents();
                            ManageView.BindGroupEvents();
                        }

                        if (groupID == newGroupID) {
                            $('.pagelist[data-groupid="' + groupID + '"]').parents('.window-box').find('.head-left').find('span').text(groupName);
                            $('#divFlying').removeClass('show').hide();
                        }
                    }
                });
            },
            CheckGroupDuplicate: function (groupName) {
                var noDuplicate = true;
                $('.window-box').find('.head-left').find('span').each(function () {
                    var text = $(this).text();
                    if (groupName.toLowerCase() == text.toLowerCase()) {
                        noDuplicate = false;
                    }
                });
                return noDuplicate;
            },
            AddUpdateGroupItem: function (itemID, groupID, pageID, groupItemOrder, isInGroup, element) {
                var param = {
                    objGroupItem: {
                        ItemID: itemID,
                        GroupID: groupID,
                        ItemOrder: groupItemOrder,
                        PageID: pageID,
                        IsInGroup: isInGroup,
                        AddedBy: SageFrameUserName,
                        UpdatedBy: SageFrameUserName,
                        PortalID: parseInt(SageFramePortalID),
                        UserModuleID: this.config.PortalID,
                        Culture: this.config.culture,
                        SageFrameSecuretoken: SageFrameSecureToken
                    }
                }
                $.ajax({
                    type: this.config.type,
                    contentType: this.config.contentType,
                    cache: this.config.cache,
                    url: this.config.baseURL + "AddUpdateGroupItem",
                    data: JSON2.stringify(param),
                    dataType: this.config.dataType,
                    success: function (msg) {
                        var itemID = msg.d;
                        if (itemID > 0) {
                            element.attr('data-itemid', itemID);
                        }
                    }
                });
            },
            DeleteGroup: function ($this) {
                var groupID = $this.parents('.window-box').find('.pagelist').attr('data-groupid');
                if (groupID > 0) {
                    var param = {
                        objGroupInfo: {
                            GroupID: groupID,
                            PortalID: parseInt(SageFramePortalID),
                            UserModuleID: this.config.PortalID,
                            Culture: this.config.culture,
                            SageFrameSecuretoken: SageFrameSecureToken
                        }
                    }
                    $.ajax({
                        type: this.config.type,
                        contentType: this.config.contentType,
                        cache: this.config.cache,
                        url: this.config.baseURL + "DeleteGroupByID",
                        data: JSON2.stringify(param),
                        dataType: this.config.dataType,
                        success: function (msg) {
                            $this.parents('.window-box').remove();
                        }
                    });
                }
            },
            UpdateGroupOrder: function () {
                var groupOrder = '';
                $('.pagelist').not('.storePages').each(function (i, v) {
                    groupOrder += '<group>';
                    groupOrder += '<groupid>';
                    groupOrder += $(this).attr('data-groupid');
                    groupOrder += '</groupid>';
                    groupOrder += '<grouporder>';
                    groupOrder += parseInt(i) + 1;
                    groupOrder += '</grouporder>';
                    groupOrder += '</group>';
                });
                var param = {
                    objGroupItem: {
                        PortalID: parseInt(SageFramePortalID),
                        UserModuleID: this.config.PortalID,
                        Culture: this.config.culture,
                        SageFrameSecuretoken: SageFrameSecureToken
                    },
                    groupOrder: groupOrder
                }
                $.ajax({
                    type: this.config.type,
                    contentType: this.config.contentType,
                    cache: this.config.cache,
                    url: this.config.baseURL + "UpdateGroupOrder",
                    data: JSON2.stringify(param),
                    dataType: this.config.dataType,
                    success: function (msg) {
                    }
                });
            },
            DragandDropEvents: function () {
                // Sort the parents
                $(".GroupHolder").sortable({
                    //containment: "parent",
                    //items: "> div",
                    //handle: ".move",
                    tolerance: "fa-arrows",
                    cursor: "move",
                    //opacity: 0.7,
                    //revert: 300,
                    //delay: 150,
                    //dropOnEmpty: true,
                    placeholder: "movable-parent",
                    start: function (e, ui) {
                        ui.placeholder.height(ui.helper.outerHeight());
                    },
                    stop: function (event, ui) {
                        ManageView.UpdateGroupOrder();
                    }
                });
                // Sort the children
                var isreceive = true;
                $(".pagelist").sortable({
                    containment: "document",
                    items: "> li",
                    connectWith: ['.pagelist'],
                    placeholder: "movable-children",
                    receive: function (event, ui) {
                        ManageView.PageSorting($(this), event, ui);
                        isreceive = false;
                    },
                    stop: function (event, ui) {
                        if (isreceive) {
                            ManageView.PageSorting($(this), event, ui);
                        }
                        isreceive = true;
                    }
                });
            },
            PageSorting: function ($this, event, ui) {
                var groupItemOrder = parseInt(ui.item.index()) + 1;
                var isInGroup = $this.hasClass('storePages') ? false : true;
                var groupID = $this.attr('data-groupid');
                var groupItemID = ui.item.attr('data-itemid');
                var pageID = ui.item.attr('data-pageid');
                ManageView.AddUpdateGroupItem(groupItemID, groupID, pageID, groupItemOrder, isInGroup, ui.item);
            },
            ajaxSuccess: function (data) {
                switch (ManageView.config.ajaxCallMode) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 3:
                        break;
                }
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: ManageView.config.type,
                    contentType: ManageView.config.contentType,
                    async: ManageView.config.async,
                    cache: ManageView.config.cache,
                    url: ManageView.config.url,
                    data: ManageView.config.data,
                    dataType: ManageView.config.dataType,
                    success: ManageView.ajaxSuccess,
                    error: ManageView.ajaxFailure
                });
            }
        };
        ManageView.init();
    }
    $.fn.QuickViewManagement = function (p) {
        $.Quickview(p);
    };
})(jQuery);