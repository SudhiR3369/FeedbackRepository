$(function () {
    $(".sfLocalee").SystemLocalize();
    $('#imgAdmin').attr("src", SageFrameAppPath + "/Administrator/Templates/Default/images/admin-icon.png");
    $('#rdbEdit').attr("checked", true);
    $('span.sfPosition').hide();
    $('div.sfModule').append('<div class="sfClearDivTemp" style="clear:both"></div>');
    $('input[name="mode"]').on("click", function () {
        switch ($(this).attr("id")) {
            case "rdbEdit":
                $('div.sfModuleControl').show();
                $('span.sfPosition').hide();
                $('div.sfModule').append('<div class="sfClearDivTemp" style="clear:both"></div>');
                $('div.sfClearDivTemp').remove();
                $('div.sfWrapper').removeClass("sfLayoutmode");
                $('span.sfUsermoduletitle').hide();
                $('div.sfWrapper div').css("opacity", "1");
                break;
            case "rdbLayout":
                $('span.sfPosition').show();
                $('div.sfModuleControl').hide();
                $('div.sfModule').append('<div class="sfClearDivTemp" style="clear:both"></div>');
                var positions = $('div.sfWrapper');
                $.each(positions, function () {
                    $(this).addClass("sfLayoutmode");
                });
                $('div.sfLayoutmode div.sfModule').css("opacity", "0.5");
                $('span.sfUsermoduletitle').show();
                $('div.sfLayoutmode').hover(function () {
                    $(this).css("opacity", "1");
                    $(this).find("div.sfModule").css("opacity", "1");
                }, function () { $(this).find("div.sfModule").css("opacity", "0.5"); });
                break;
            case "rdbNone":
                $('div.sfModuleControl').hide();
                $('span.sfPosition').hide();
                $('div.sfClearDivTemp').remove();
                $('div.sfWrapper').removeClass("sfLayoutmode");
                $('span.sfUsermoduletitle').hide();
                $('div.sfWrapper div').css("opacity", "1");
                break;
        }
    });
    //        $(".signin").click(function(e) {
    //            e.preventDefault();
    //            $("div#signin_menu").toggle();
    //            $(".signin").toggleClass("menu-open");
    //        });
    //        $("div#signin_menu").mouseup(function() {
    //            return false
    //        });
    //        $(document).mouseup(function(e) {
    //            if ($(e.target).parent("a.signin").length == 0) {
    //                $(".signin").removeClass("menu-open");
    //                $("div#signin_menu").hide();
    //            }
    //        });

    //obsolute events.
    $('.sfCpanel').on('click', function () {
        var divHeight = 0;
        if ($('#divCpanel').hasClass('On')) {
            // divHeight = parseInt($('.sfMiddle').height()) - parseInt($('#templateChangeWrapper').height());
            divHeight = -234;
            $('#divCpanel').removeClass('On').addClass('Off');
        }
        else {
            divHeight = 0;
            $('#divCpanel').removeClass('Off').addClass('On');
        }
        $('#divCpanel').animate({
            top: divHeight
        });
    });


    $('.iconSettingTheme').on("click", function () {
        $(this).parent().toggleClass("thisSelected");
        $('.templateChangeWrapper').slideToggle(400);
    });

    $('.logout').on('click', function () {
        if ($('.myProfileDrop').hasClass('Off')) {
            $('.myProfileDrop').removeClass('Off');
            $('.myProfileDrop').show();
        }
        else {
            $('.myProfileDrop').addClass('Off');
            $('.myProfileDrop').hide();
        }
    });

    //for the module configuration in the page
    var move = '<span class="moveUnusedModule"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
    $('.addedHolder').find('.sfModule').prepend(move);

    $('.moveUnusedModule').on('click', function () {
        var $this = $(this);
        var $tempParent = $this.parent().parent();
        var usermoduleID = $tempParent.attr('data-usemoduleid');
        var pageID = $tempParent.attr('data-pageid');
        var moduleDefID = $tempParent.attr('data-moduledefid');
        var moduleTitle = $this.parent().find('.sfPosition').text();
        $('#SettingPlaceHolder').css({ 'height': '0px' });
        var actionDOM = '<div class="settingactioniconWrappers">';
        actionDOM += '<i class="icon-close" id="removeSettingHolderContent" width="100%"></i>';
        actionDOM += '<span><i class="fa fa-check-circle" id="removeSettingHolder" width="100%"></i>Choose Holder for the module</span>';
        actionDOM += '</div>';
        actionDOM += "<div class='templayoutwrapper' id='tempLayout'>here goes the layout</div>";
        $('#SettingPlaceHolder').html(actionDOM);
        $('#SettingPlaceHolder').css({
            'left': '0px',
            'top': '0px',
            'width': '100%',
            'height': '10px',
            'position': 'absolute'
        });
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: SageFrameHostURL + '/Modules/Pages/services/ModuleManagerWebService.asmx/LoadActiveLayout',
            data: JSON2.stringify({
                PageName: $('#SageFramePageName').val(),
                TemplateName: SageFrameActiveTemplate,
                portalID: parseInt(SageFramePortalID),
                userName: SageFrameUserName,
                userModuleID: usermoduleID,
                secureToken: SageFrameSecureToken
            }),
            dataType: 'json',
            success: function (data) {
                var layout = data.d;
                var layoutSplit = layout.split(',,,,');
                $('#tempLayout').html(layoutSplit[1]);
                $('#tempLayout').find('div').each(function () {
                    var $this = $(this);
                    $(this).removeAttr('style');
                    if ($this.find('div').length == 0) {
                        var innerHTML = '<div class="sftempWrapper">';
                        innerHTML += '<div class="sfPosition">' + $this.attr('id') + '</div>';
                        innerHTML += '<div class="sfblocks"></div></div>';
                        $this.html(innerHTML.trim());
                    }
                });
                $('#SettingPlaceHolder').show();
                $('.sftempWrapper').on('click', function () {
                    var $this = $(this);
                    $('.sftempWrapper').removeClass('selected');
                    $this.addClass('selected');
                    //var paneName = 
                    SageConfirmDialog('Are you sure you want to choose this holder?').done(function () {
                        AddModule($this, usermoduleID, moduleTitle, moduleDefID);
                        UpdateModuleOrder(usermoduleID);
                    });
                });
            },
            error: function (data) {

            }
        });
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: SageFrameHostURL + '/Modules/Pages/services/ModuleManagerWebService.asmx/GetPageModules',
            data: JSON2.stringify({
                PageID: pageID,
                IsHandheld: false,
                portalID: parseInt(SageFramePortalID),
                userName: SageFrameUserName,
                userModuleID: usermoduleID,
                secureToken: SageFrameSecureToken
            }),
            dataType: 'json',
            success: function (data) {
                var modules = data.d;
                var self = $(this);
                var html = "";
                var positiondiv = $('div.sfPosition');
                $.each(positiondiv, function () {
                    var self = $(this);
                    var html = "";
                    $.each(modules, function (index, item) {
                        var usermoduleid = "umod_" + item.UserModuleID + "_" + item.ModuleDefID;
                        if (item.PaneName != null && (jQuery.trim(item.PaneName.toLowerCase()) === jQuery.trim($(self).text().toLowerCase()))) {
                            html += '<div id=' + usermoduleid + ' class="widget-instance">';
                            html += '<p class="basics">' + item.UserModuleTitle.substring(0, 14) + '</p><p style="display:none">' + item.UserModuleTitle + '</p>';
                            html += '<span class="control" style="display:none;">';
                            if (item.ControlsCount > 1)
                                html += '<i class="sfManageControl icon-edit"></i>';
                            html += '<i class="delete icon-delete"></i>';
                            html += '</span>';
                            html += '<div style="clear: both;">';
                            html += '</div>';
                            html += '</div>';
                        }
                    });
                    $(self).next("div").html(html);
                });
            },
            error: function (data) {

            }
        });

        $('#removeSettingHolderContent').on('click', function () {
            $('#SettingPlaceHolder').animate({
                'height': '0px'
            }, 500, function () {
                $(this).hide();
            }).css({
                'position': 'relative'
            }).html('');
        });
    });

    function UpdateModuleOrder(userModuleID) {
        var panes = $('#tempLayout div.sfblocks');
        var ModuleOrderObj = [];
        var param = {
            lstPageModules: [],
            portalID: parseInt(SageFramePortalID),
            userName: SageFrameUserName,
            userModuleID: userModuleID,
            secureToken: SageFrameSecureToken
        };
        $.each(panes, function () {
            var usermoduleorder = "";
            var self = $(this);
            var usermodules = $(this).find("div.widget-instance");
            $.each(usermodules, function () {
                if ($(this).prop("id") != "") {
                    var modorder = parseInt($(this).index());
                    modorder = modorder + 1;
                    var moduleidArr = new Array();
                    moduleidArr = $(this).prop("id").split('_');
                    param.lstPageModules.push({
                        "UserModuleID": moduleidArr[1],
                        "PaneName": $(self).prev("div").text(),
                        "ModuleOrder": modorder
                    });
                }
            });
        });
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: SageFrameHostURL + '/Modules/Pages/services/ModuleManagerWebService.asmx/UpdatePageModules',
            data: JSON2.stringify(param),
            dataType: 'json',
            success: function (data) {
                window.location = window.location.href;
            },
            complete: function () { },
            error: function () { },
        });
    }

    function AddModule($this, usermoduleid, userModuleTitle, moduleDefID) {
        //var html = '<div class="sfblocks">';
        usermoduleid = "umod_" + usermoduleid + "_" + moduleDefID;
        var html = '<div id=' + usermoduleid + ' class="widget-instance">';
        html += '<p class="basics">' + userModuleTitle.substring(0, 14) + '</p><p style="display:none">' + userModuleTitle + '</p>';
        html += '<span class="control" style="display:none;">';
        html += '<i class="sfManageControl icon-edit"></i>';
        html += '<i class="delete icon-delete"></i>';
        html += '</span>';
        html += '<div style="clear: both;">';
        html += '</div>';
        html += '</div>';
        //html += '</div>';
        $this.find('.sfblocks').append(html);
    }
});