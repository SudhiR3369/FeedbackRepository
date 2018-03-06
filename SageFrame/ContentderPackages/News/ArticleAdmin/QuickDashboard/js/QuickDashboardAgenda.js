(function ($) {
    $.QDashboardAgendaSingleton = function (p) {

        p = $.extend({
            UserModuleID: '1',
            roleID: '',
            SiteID: 0
        }, p);

        var QDboardAgenda = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: "/Modules/ArticleAdmin/QuickDashboard/Services/QuickDashboardAgendaService.asmx/",
                method: "",
                successMethod: "",
                failureMethod: "",
                ajaxCallMode: 0,
                activeAgendaID: 0,
                pageNumber: 0,
                postPerPage: 5,
                deletedAgendaID: 0,
                authParam: { PortalID: SageFramePortalID, UserModuleID: p.UserModuleID, UserName: SageFrameUserName, SecureToken: SageFrameSecureToken, CultureCode: SageFrameCurrentCulture },
                adminRoles: ["228f0ad3-76b3-4585-a008-091ae667ad57", "910f0c31-e1dd-42d2-988b-545fe8621544"],
                roles: p.roleID.split(","),
                rowTotal: 0,
                offset: 0
            },
            init: function () {

                QDboardAgenda.addAgendaForm();
                QDboardAgenda.settingAgendaForm();
                QDboardAgenda.onSaveAgendaClick();
                QDboardAgenda.getActiveAgenda();
                QDboardAgenda.getAgendaTitles(0, QDboardAgenda.config.postPerPage, 0);
                QDboardAgenda.onAgendaStatusCheckboxChanged();

                $('#txtDate').datepicker({
                    dateFormat: 'yy/mm/dd',
                    minDate: '0'
                });


                $('#txtDate').val();

                $("#btnAddNext").click(function () {
                    $("#textArea").append("<div class='formValue'><input name='agendaID' type='hidden' value='0' /><textarea name='content' maxlength='500' placeholder='500 character only.'></textarea><div class='deleteagenda'><i class='fa fa-trash deleteTextBox'></i></div>");
                });

                $('#addAgendaForm').on('click', '.deleteTextBox', function () {
                    $(this).closest("div.formValue").remove();
                });

                QDboardAgenda.onCancelAgendaClick();
                $(".hasDatepicker").on("keydown keypress keyup", false);

                var button = "<a id='btnAgendaSetting' class='sfBtn smlbtn-succ icon-settings'>Manage</a>";
                button += "<a id='btnAddAgenda' class='sfBtn smlbtn-succ icon-addnew' style='display: none'>Add</a>";
                var buttonHtml = QDboardAgenda.checkRoles() ? button : "";
                $("#mngBtn").html(buttonHtml);
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: QDboardAgenda.config.type,
                    contentType: QDboardAgenda.config.contentType,
                    cache: QDboardAgenda.config.cache,
                    url: QDboardAgenda.config.baseURL + QDboardAgenda.config.method,
                    data: QDboardAgenda.config.data,
                    dataType: QDboardAgenda.config.dataType,
                    success: QDboardAgenda.config.successMethod,
                    error: QDboardAgenda.config.failureMethod,
                    async: QDboardAgenda.config.async
                });
            },

            getAgendaTitles: function (offset, limit, current) {
                QDboardAgenda.config.pageNumber = current;
                QDboardAgenda.config.offset = current * limit;
                QDboardAgenda.config.method = "GetAgendaTitleByDate";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    siteID: p.SiteID,
                    pageNumber: QDboardAgenda.config.offset,
                    pageSize: QDboardAgenda.config.postPerPage
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.getAgendaTitlesSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.getAgendaTitlesFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            getAgendaTitlesSuccess: function (data) {
                var titleList = data.d;
                var agendaOptionHtml = "";

                if (titleList != null && titleList.length > 0) {
                    var curruntdate = $.datepicker.formatDate('yy/mm/dd', new Date());
                    QDboardAgenda.config.rowTotal = titleList[0].RowsCount;
                    $.each(titleList, function (key, value) {
                        disabled = value.ParsedDate >= curruntdate ? "" : "disabled";
                        status = value.IsActive == true ? "checked" : "";
                        isActiveValue = value.IsActive == true ? false : true;
                        agendaOptionHtml += "<div class='grid_listing'>";
                        agendaOptionHtml += "<div class='grid_summary'>";
                        agendaOptionHtml += "<div class='grid_summary_detail'>";
                        agendaOptionHtml += "<div class='grid_detail_title--large'>";
                        agendaOptionHtml += value.AgendaTitle;
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "<div class='grid_status checkslider-btn'>";
                        agendaOptionHtml += "<input name='agendaStatus' id='status" + key + "' data-id='" + value.AgendaTitleID + "' data-value='" + isActiveValue + "' type='checkbox' " + status + " " + disabled + ">";
                        agendaOptionHtml += "<label for='status" + key + "'>Status</label>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "<div class='grid_action'>";
                        agendaOptionHtml += "<div id='actions' class='actiononClickShow' style='display: none; '>";
                        agendaOptionHtml += "<div class='actiononClickShowInfo'>";
                        agendaOptionHtml += "<p>";
                        agendaOptionHtml += "<a class='edit' id='editAgenda' data-titleid='" + value.AgendaTitleID + "'>Edit</a>";
                        agendaOptionHtml += "<a class='delete'  id='deleteAgenda' data-titleid='" + value.AgendaTitleID + "'>Delete</a>";
                        agendaOptionHtml += "</p>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "<p class='actionclass' id='actionLink'>";
                        agendaOptionHtml += "<a>";
                        agendaOptionHtml += "<i class='fa fa-ellipsis-v'></i>";
                        agendaOptionHtml += "</a>";
                        agendaOptionHtml += "</p>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "</div>";
                        agendaOptionHtml += "</div>";
                    });
                    $("#settingForm #agendaList").html(agendaOptionHtml);
                    QDboardAgenda.bindPagination(QDboardAgenda.config.rowTotal);
                } else if (QDboardAgenda.config.pageNumber > 0) {
                    QDboardAgenda.config.pageNumber = QDboardAgenda.config.pageNumber - 1;
                } else {
                    $("#settingForm #agendaList").html("<p>Currently there is no agenda.</p>");
                }
                QDboardAgenda.onActionClick();
                QDboardAgenda.onDeleteAgendaTitleClick();
            },

            getAgendaTitlesFailure: function () {
                $("#settingForm").html("Error while loading agenda titles.");
            },

            settingAgendaForm: function () {
                $('#mngBtn').on('click', '#btnAgendaSetting', function () {
                    $("#settingForm").show();
                    $("#addAgendaForm").hide();
                    $("#agendaContent").hide();
                    $("#btnAddAgenda").show();
                    $("#btnAgendaSetting").hide();
                    $("#settingForm select").val(QDboardAgenda.config.activeAgendaID);
                });
            },

            addAgendaForm: function () {
                $('#mngBtn').on('click', '#btnAddAgenda', function () {
                    $("#addAgendaForm").show();
                    $("#settingForm").hide();
                    $("#agendaContent").hide();
                    $("#btnAgendaSetting").hide();
                    $("#btnAddAgenda").hide();
                    $("#btnAddNext").show();
                });
            },

            onSaveAgendaClick: function () {
                $("#btnSave").click(function () {
                    var title = $("#agendaTitle").val();
                    var agendaFor = $("#txtDate").val();
                    var agendaTitleID = $("#titleID").val();
                    var articleAgendaID = $("input[name='agendaID']").map(function () {
                        return this.value;
                    }).get();

                    var content = $("textarea[name='content']").map(function () {
                        var parsedContent = QDboardAgenda.escapeHtml(this.value);
                        return parsedContent;
                    }).get();

                    var checkArray = "";
                    for (var i = 0; i < content.length; i++) {
                        if (QDboardAgenda.isEmptyOrSpaces(content[i])) {
                            checkArray = false;
                            break;
                        } else {
                            checkArray = true;
                        }
                    }

                    if (!QDboardAgenda.isEmptyOrSpaces(title) && checkArray && !QDboardAgenda.isEmptyOrSpaces(agendaFor)) {
                        QDboardAgenda.addAgenda(QDboardAgenda.escapeHtml(title), agendaFor, agendaTitleID, content, articleAgendaID);
                    } else {
                        $("#agendaError").text("* All fields are required.");
                    }
                });
            },

            onCancelAgendaClick: function () {
                $("#btnCancel, #btnCancelSetting").click(function () {
                    QDboardAgenda.resetForm();
                });
            },


            addAgenda: function (title, agendaFor, agendaTitleID, content, articleAgendaID) {
                QDboardAgenda.config.method = "AddUpdateAgenda";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    title: title,
                    agendaFor: agendaFor,
                    agendaTitleID: agendaTitleID,
                    agendaContent: content,
                    siteID: p.SiteID,
                    articleAgendaID: articleAgendaID
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.addAgendaSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.addAgendaFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            addAgendaSuccess: function (data) {
                var response = data.d;
                QDboardAgenda.resetForm();
                QDboardAgenda.getAgendaTitles(0, QDboardAgenda.config.postPerPage, 0);
                QDboardAgenda.getActiveAgenda();
                if (response == 1) {
                    SageFrame.messaging.show("Agenda saved successfully.", "Success");
                } else {
                    SageFrame.messaging.show("Unable to save agenda.", "Error");
                }
            },

            addAgendaFailure: function () {
                SageFrame.messaging.show("Unable to save agenda.", "Error");
            },

            getActiveAgenda: function () {
                QDboardAgenda.config.method = "GetActiveAgenda";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    siteID: p.SiteID
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.getAgendaListSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.getAgendaListFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            getAgendaListSuccess: function (data) {
                var agendaList = data.d;
                var agendaHtml = "";
                if (agendaList != null && agendaList.length > 0) {
                    $.each(agendaList, function (titlekey, titlevalue) {
                        agendaHtml += "<div class='box-content'>";
                        agendaHtml += "<div class='grid_listing'>";
                        agendaHtml += "<div class='grid_summary'>";
                        agendaHtml += "<div class='grid_summary_detail'>";
                        agendaHtml += "<div class=' grid_detail_title--large'>";
                        agendaHtml += titlevalue.AgendaTitle;
                        agendaHtml += "</div>";
                        agendaHtml += "<div class='grid_detail_newsproperties clearfix'>";
                        agendaHtml += "<small class='grid_detail_newsproperties_reporter_date'>";
                        agendaHtml += "<i class='fa fa-calendar'></i>";
                        agendaHtml += ArticleSetting.ChangeDateFormat(titlevalue.FormatedDate);
                        agendaHtml += "</small>";
                        agendaHtml += "</div>";
                        agendaHtml += "<div class='grid_detail_titlewrap'>";
                        $.each(titlevalue.AgendaContent, function (key, value) {
                            agendaHtml += "<div class='grid_detail_title'>" + value.AgendaContent + "</div>";
                        });
                        agendaHtml += "</div>";
                        agendaHtml += "</div>";
                        agendaHtml += "</div>";
                        agendaHtml += "</div>";
                        agendaHtml += "</div>";
                    });
                    $("#agendaContent").html(agendaHtml);
                } else if (QDboardAgenda.config.pageNumber > 0) {
                    QDboardAgenda.config.pageNumber = QDboardAgenda.config.pageNumber - 1;
                } else {
                    $("#agendaContent").html("<p>Currently there is no agenda.</p>");
                }
                QDboardAgenda.onEditAgendaClick();
            },

            getAgendaListFailure: function () {
                $("#agendaContent").html("<p>Error while loading agenda.</p>");
            },

            onEditAgendaClick: function () {
                $(document).on("click", "#editAgenda", function () {
                    $("#addAgendaForm").show();
                    $("#settingForm").hide();
                    $("#agendaContent").hide();
                    $("#btnAgendaSetting").hide();
                    $("#btnAddAgenda").hide();
                    var titleID = $(this).attr("data-titleid");
                    QDboardAgenda.getAgendaByTitleID(titleID);
                });
            },

            onDeleteAgendaTitleClick: function () {
                $("#settingForm").on("click", "#deleteAgenda", function () {
                    var titleID = $(this).attr("data-titleid");
                    jConfirm('Do you want to delete this agenda?', 'Confirm', function (ans) {
                        if (ans) {
                            QDboardAgenda.deleteAgendaByTitleID(titleID);
                        }
                    });
                });
            },

            getAgendaByTitleID: function (titleID) {
                QDboardAgenda.config.method = "GetAgenda";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    siteID: p.SiteID,
                    agendaTitleID: titleID
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.getAgendaByTitleIDSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.getAgendaByTitleIDFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            getAgendaByTitleIDSuccess: function (data) {
                var agendas = data.d;
                var contentHtml = "";
                if (agendas != null) {
                    $("#titleID").val(agendas.AgendaTitleID);
                    $("#agendaTitle").val(QDboardAgenda.decodeHtml(agendas.AgendaTitle));
                    $("#txtDate").val(agendas.ParsedDate);
                    if (agendas.AgendaContent != null) {
                        $.each(agendas.AgendaContent, function (key, value) {
                            deleteAgendaIcon = key > 0 ? "<div class='deleteagenda deleteByAgendaID' data-id='" + value.AgendaContentID + "'><i class='fa fa-trash'></i></div>" : "";
                            contentHtml += "<div class='formValue'><input type='hidden' name='agendaID' value='" + value.AgendaContentID + "'/><textarea name='content' maxlength='500' placeholder='500 character only.'>" + value.AgendaContent + "</textarea>" + deleteAgendaIcon + "</div>";
                        });
                    }
                    $("#textArea").html(contentHtml);
                    QDboardAgenda.onDeleteAgendaClick();
                }
            },

            getAgendaByTitleIDFailure: function () {
                $("#textArea").html("Error while loading agendas.");
            },

            onDeleteAgendaClick: function () {
                $('#addAgendaForm').on('click', '.deleteagenda', function () {
                    var agendaID = $(this).attr("data-id");
                    QDboardAgenda.config.deletedAgendaID = agendaID;
                    if (agendaID > 0) {
                        jConfirm('Do you want to delete this agenda content?', 'Confirm', function (ans) {
                            if (ans) {
                                QDboardAgenda.deleteAgendaByID(agendaID);
                            }
                        });
                    } else {
                        $(this).parent("div").remove();
                    }
                });
            },

            deleteAgendaByID: function (agendaID) {
                QDboardAgenda.config.method = "DeleteAgenda";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    siteID: p.SiteID,
                    agendaTitleID: 0,
                    agendaContentID: agendaID
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.deleteAgedaByIDSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.deleteAgedaByIDFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            deleteAgedaByIDSuccess: function () {
                $('div[data-id="' + QDboardAgenda.config.deletedAgendaID + '"]').parent("div").remove();
                SageFrame.messaging.show("Agenda deleted successfully.", "Success");
                QDboardAgenda.getAgendaTitles(QDboardAgenda.config.offset, QDboardAgenda.config.postPerPage, QDboardAgenda.config.pageNumber);
                QDboardAgenda.getActiveAgenda();
            },

            deleteAgedaByIDFailure: function () {
                SageFrame.messaging.show("Error occured while deleting agenda.", "Error");
            },

            deleteAgendaByTitleID: function (titleID) {
                QDboardAgenda.config.method = "DeleteAgenda";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    siteID: p.SiteID,
                    agendaTitleID: titleID,
                    agendaContentID: 0
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.deleteAgendaByTitleIDSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.deleteAgendaByTitleIDFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            deleteAgendaByTitleIDSuccess: function () {
                SageFrame.messaging.show("Agenda deleted successfully.", "Success");
                QDboardAgenda.getAgendaTitles(QDboardAgenda.config.offset, QDboardAgenda.config.postPerPage, QDboardAgenda.config.pageNumber);
                QDboardAgenda.getActiveAgenda();
            },

            deleteAgendaByTitleIDFailure: function () {
                SageFrame.messaging.show("Error while deleting agenda.", "Error");
            },

            onAgendaStatusCheckboxChanged: function () {
                $("#agendaList").on("change", "input[name='agendaStatus']", function () {
                    $("input[name='agendaStatus']").not(this).prop('checked', false);
                    var id = $(this).attr("data-id");
                    var status = $(this).attr("data-value");
                    QDboardAgenda.updateAgendaStatus(id, status);
                });
            },

            updateAgendaStatus: function (id, status) {
                QDboardAgenda.config.method = "UpdateAgendaStatus";
                QDboardAgenda.config.data = JSON.stringify({
                    authParam: QDboardAgenda.config.authParam,
                    agendaTitleID: id,
                    activeStatus: status
                });
                QDboardAgenda.config.successMethod = QDboardAgenda.updateAgendaStatusSuccess;
                QDboardAgenda.config.failureMethod = QDboardAgenda.updateAgendaStatusFailure;
                QDboardAgenda.ajaxCall(QDboardAgenda.config);
            },

            updateAgendaStatusSuccess: function () {
                QDboardAgenda.getActiveAgenda();
                SageFrame.messaging.show("Agenda status updated successfully.", "Success");
                QDboardAgenda.getAgendaTitles(QDboardAgenda.config.offset, QDboardAgenda.config.postPerPage, QDboardAgenda.config.pageNumber);
            },
            updateAgendaStatusFailure: function () {
                SageFrame.messaging.show("Error while updating agenda status.", "Error");
            },

            onActionClick: function () {
                $("#settingForm").on("click", ".actionclass", function () {
                    $('.actiononClickShow').hide();
                    $(this).prev('.actiononClickShow').show();
                });

                $("#settingForm div").not(".actiononClickShowInfo").on("click", function () {
                    $('.actiononClickShow').hide();
                });
            },

            checkRoles: function () {
                isAdmin = false;
                var adminRole = QDboardAgenda.config.adminRoles;
                var currentRole = QDboardAgenda.config.roles;
                for (var i = 0; i < adminRole.length; i++) {
                    if ($.inArray(adminRole[i], currentRole) === -1) {
                        isAdmin = false;
                    } else {
                        isAdmin = true;
                        break;
                    }
                }
                return isAdmin;
            },

            bindPagination: function (RowTotal) {
                if (RowTotal > QDboardAgenda.config.postPerPage) {
                    $('#QDBoardPagi').show().pagination(RowTotal, {
                        items_per_page: QDboardAgenda.config.postPerPage,
                        current_page: QDboardAgenda.config.pageNumber,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: QDboardAgenda.getAgendaTitles,
                            limit: QDboardAgenda.config.postPerPage,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $("#QDBoardPagi").hide();
                }
            },

            /**
             * Generic Function
            **/
            escapeHtml: function (string) {
                var entityMap = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': '&quot;',
                    "'": '&#39;',
                    "/": '&#x2F;'
                };
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return entityMap[s];
                });
            },

            decodeHtml: function (string) {
                var entityMap = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    '&quot;': '"',
                    '&#39;': "'",
                    '&#x2F;': "/"
                };
                return String(string).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;/gi, function (s) {
                    return entityMap[s];
                });
            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },

            resetForm: function () {
                $("#titleID").val(0);
                $("#agendaTitle").val("");
                $("#agendaError").text("");
                $("#textArea").html("<div class='formValue'><input name='agendaID' type='hidden' value='0' /><textarea name='content' maxlength='500' placeholder='500 character only.'></textarea></div>");
                $("#addAgendaForm").hide();
                $("#agendaContent").show();
                $("#btnAddAgenda").hide();
                $("#settingForm").hide();
                $("#btnAgendaSetting").show();
                $('#txtDate').val("");
            }
        };
        QDboardAgenda.init();
    };
    $.fn.CallQDboardAgenda = function (p) {
        $.QDashboardAgendaSingleton(p);
    };
})(jQuery);