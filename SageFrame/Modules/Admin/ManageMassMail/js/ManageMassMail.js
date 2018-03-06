var MassMailManage;

(function ($) {
    var $validator;
    var filtersVerified = false;
    var selectedUsers = [];
    var currentMassMailID = 0;
    var userList = [];
    var addNew = true;
    var uploadable = false;
    var filterValues = [];
    var offset = 1;
    var limit = 10;
    var massMailID = 0;
    var currentPage = 0;
    $.MassMailManage = function (p) {
        p = $.extend({ modulePath: '', DataObj: '', userModuleID: '' }, p);

        MassMailManage = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/ManageMassMail.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            init: function () {
                MassMailManage.ClearAddDetail();
                MassMailManage.InitEvents();
                MassMailManage.RefreshData();

            },

            RefreshData: function () {
                massMailID = 0;
                $('#ddlFilterType').val(0);
                $("#txtMassMailTitle").val('');
                offset = 1;
                limit = 10;
                MassMailManage.GetMailList(0,limit,0);
            },

            GetMailList: function (offset,limit,current) {
                var fitlerTypeID = $('#ddlFilterType option:selected').val();
                var mailTitle = $.trim($('#txtMassMailTitle').val());
                var status = $('#ddlStatus option:selected').val();
                offset = current*limit;
                limit = limit;
                currentPage = current;
                MassMailManage.config.method = "GetMassMailList";
                MassMailManage.config.url = MassMailManage.config.baseURL+MassMailManage.config.method;
                MassMailManage.config.data = JSON2.stringify({
                    offset: offset,
                    limit:limit,
                    filterTypeID: fitlerTypeID,
                    status: status,
                    mailTitle: mailTitle,
                    authInfo: MassMailManage.GetAuthInfo()
                });
                MassMailManage.config.ajaxCallMode = MassMailManage.GetMailListSuccessCall;
                MassMailManage.ajaxCall(MassMailManage.config);
            },
            GetMailListSuccessCall: function (data) {
                var html = '<tr><th>S.N</th><th>Title</th><th>Subject</th><th>Status</th><th>Sechudule Type</th><th>Sechedule On</th><th>Action</th></tr>'
                var TotalRow = 0;
                if (data.d.length > 0) {
                    $.each(data.d, function (index, item) {
                        TotalRow = item.RowTotal;
                        html += '<tr>';
                        html += '<td>' + item.RowNum + '</td>'
                        html += '<td>' + item.MessageTitle + '</td>'
                        html += '<td>' + item.Subject + '</td>'
                        html += '<td>' + item.Status + '</td>'
                        if (item.ScheduleType == 1) {
                            html += '<td>Instant</td>'
                            html += '<td></td>'
                        }
                        else {
                            html += '<td>Custom</td>'
                            html += '<td>' + item.ScheduledOn + '</td>'
                        }
                      
                        html += '<td><a class="editMassMail icon-edit" href="Javascript:void(0);" data-mailid="' + item.MassMailID + '"></a>'
                        html += '<a class="deleteMassMail icon-delete" href="Javascript:void(0);" data-mailid="' + item.MassMailID + '"></td>'
                        html += '</tr>';
                    });
                } else {
                    html+='<tr><td colspan="7">NO DATA TO DISPLAY</tr>'
                }
                $('#tblMassMailList').html(html);
                if (TotalRow >limit) {
                    $('#divMailPagination').show().pagination(TotalRow, {
                        items_per_page:limit,
                        current_page: currentPage,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: MassMailManage.GetMailList,
                            limit: limit,
                        },
                        prev_text: false,
                        next_text: false
                    });

                }
                else {
                    $('#divMailPagination').hide();
                }
            },
            EditMail: function (MailID) {
                massMailID = MailID;
                MassMailManage.config.url = MassMailManage.config.baseURL + "GetMassMailDetailForEdit";
                MassMailManage.config.data = JSON2.stringify({ massmailID: massMailID, authInfo: MassMailManage.GetAuthInfo() });
                MassMailManage.config.ajaxCallMode = MassMailManage.GetMailDetailSuccessCall;
                MassMailManage.config.async = false;

                MassMailManage.ajaxCall(MassMailManage.config);
            },



            GetMailDetailSuccessCall: function (data) {
                if (data != null && data.d != null) {
                    MassMailManage.ClearAddDetail();
                    MassMailManage.ToogleMassMailContainers(true);

                    var obj = data.d;
                    $('#txtMailTitle').val(obj.MessageTitle);
                    $('#ddlFormFilterType').val(obj.FilterTypeID);
                    $('#ddlFormFilterType').trigger('change');

                    $("#ddlFormFilterValue option:selected").removeAttr("selected");
                    var uniqueVals = obj.FilterValue.split(',');
                    $("#ddlFormFilterValue").find("option").each(function () {
                        if ($.inArray(this.value, uniqueVals) != -1) {
                            $(this).click();
                            $(this).prop('selected', true);
                        }
                    });

                    $('#txtSubject').val(obj.Subject);
                    $('#txtBody').val(obj.MessageBody);
                    if (obj.ScheduleType == 1) {
                        $('#rbInstant').prop('checked', true);
                        $('#txtSchedule').attr('disabled', 'disabled');
                        $('#txtSchedule').datetimepicker('destroy');
                        $('#divScheduleForm').fadeOut();
                    }
                    else {
                        $('#rbCustom').prop('checked', true);
                        $('#txtSchedule').removeAttr('disabled');
                        $('#txtSchedule').datetimepicker();
                        $('#divScheduleForm').fadeIn();
                        $('#txtSchedule').val(obj.ScheduledOn);
                    }

                    if (obj.AdditionalUsers.length > 0) {
                        var html = '';
                        $.each(obj.AdditionalUsers, function (index, item) {
                            html += '<div><span class="userLabel" data-users=' + item.TypeID + '>' + item.TypeName + '</span> <i  class="fa fa-times canceluser"></i></div> ';
                        });       
                        $('#divSelectedUsers').html(html);
                    }
                }
            },

            DeleteMail: function (MailID) {
                SageConfirmDialog('Are you sure you want to delete this mail?').done(function () {
                    var mailID = MailID;
                    MassMailManage.config.url = MassMailManage.config.baseURL + "DeleteMassMail";
                    MassMailManage.config.data = JSON2.stringify({ massmailID: mailID, authInfo: MassMailManage.GetAuthInfo() });
                    MassMailManage.config.ajaxCallMode = MassMailManage.DeleteMassMailSuccessCall;
                    MassMailManage.config.async = false;
                    MassMailManage.ajaxCall(MassMailManage.config);
                });
              
            },

            DeleteMassMailSuccessCall: function (data) {
                var result = data.d;
                if (data.d == 1) {
                   SageFrame.messaging.show("Mail deleted Successfully", "Success");
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.RefreshData();
                }

                else if (data.d == -2) {
                    SageFrame.messaging.show("Exception occured!!", "Error");
                }
                else if (data.d == -1) {
                    SageFrame.messaging.show("User not authorized to perform the task", "Alert");
                }
                else {
                    SageFrame.messaging.show("Error Occured while deleting mail", "Error");
                }
            },

            SelectFirstItem: function (selectID) {
                $("#" + selectID).val($("#" + selectID + " option:first").val());
            },

            ajaxSuccess: function (data) {

            },
            ajaxFailure: function () { },

            ajaxCall: function (config) {
                $.ajax({
                    type: MassMailManage.config.type,
                    contentType: MassMailManage.config.contentType,
                    async: MassMailManage.config.async,
                    cache: MassMailManage.config.cache,
                    url: MassMailManage.config.url,
                    data: MassMailManage.config.data,
                    dataType: MassMailManage.config.dataType,
                    success: MassMailManage.config.ajaxCallMode,
                    error: MassMailManage.ajaxFailure,
                    complete: function () {
                        FormFieldComplete();
                    }
                });
            },
            ajaxCallClassic: function (config) {
                $.ajax({
                    type: MassMailManage.config.type,
                    contentType: MassMailManage.config.contentType,
                    async: MassMailManage.config.async,
                    cache: MassMailManage.config.cache,
                    url: MassMailManage.config.url,
                    data: MassMailManage.config.data,
                    dataType: MassMailManage.config.dataType,
                    success: MassMailManage.config.ajaxCallMode,
                    error: MassMailManage.ajaxFailure
                });
            },

            InitEvents: function () {
                $('#tblMassMailList').off('click', '.editMassMail');
                $('#tblMassMailList').on('click', '.editMassMail', function () {
                    var ID = $(this).data('mailid');
                     MassMailManage.EditMail(ID);
                });
                $('#tblMassMailList').off('click', '.deleteMassMail');
                $('#tblMassMailList').on('click', '.deleteMassMail', function () {
                    var ID = $(this).data('mailid');
                     MassMailManage.DeleteMail(ID);
                });
                $('#txtBody').ckeditor("config");


                $('#txtSchedule').datetimepicker({
                    formatTime: 'HH:mm:ss',
                    formatDate: 'yyyy-MM-dd',
                    //defaultDate:'8.12.1986', // it's my birthday
                    defaultDate: '+03.01.1970', // it's my birthday
                    defaultTime: '10:00',
                    timepickerScrollbar: false
                });


                $('#ddlFormFilterType').on('change', function () {
                    $("#ddlFormFilterValue option:selected").removeAttr("selected");
                    var filterTypeID = $('#ddlFormFilterType option:selected').val();
                    if (filterTypeID !=1) {
                        $('#filterValue').addClass('disabled');
                        $('#ddlFormFilterValue').attr('disabled', 'disabled');
                        $('#ddlFormFilterValue').html('');
                        $('.divMailRecipientGroup').fadeOut();
                    }
                    else {
                        $('.divMailRecipientGroup').fadeIn();
                        $('#filterValue').removeClass('disabled');
                        $('#ddlFormFilterValue').removeAttr('disabled');
                        MassMailManage.config.url = MassMailManage.config.baseURL + "GetFilterValue";
                        MassMailManage.config.data = JSON2.stringify({ filterTypeID: filterTypeID, authInfo: MassMailManage.GetAuthInfo() });
                        MassMailManage.config.ajaxCallMode = MassMailManage.GetFilterValueSuccessCall;
                        MassMailManage.config.async = false;
                        MassMailManage.ajaxCall(MassMailManage.config);
                    }
                });

                $('.rbSchedule').on('click', function () {
                    var val = $('input[name="schedule"]:checked').val();
                    if (val == 1) {
                        $('#txtSchedule').datetimepicker('destroy');
                        $('#txtSchedule').attr('disabled', 'disabled');
                        $('#divScheduleForm').fadeOut();
                    } else {
                        $('#txtSchedule').datetimepicker();
                        $('#txtSchedule').removeAttr('disabled');
                        $('#divScheduleForm').fadeIn();
                    }
                });

                $('#btnSearchMail').on('click', function () {
                    offset = 1;
                    limit = 10;
                    MassMailManage.GetMailList(0,limit,0);
                }),

                    $('#btnRefreshData').on('click', function () {
                        MassMailManage.RefreshData();
                    });

                $('#btnNewMassMail').on('click', function () {
                    $validator.resetForm();
                    massMailID = 0;

                    MassMailManage.ClearAddDetail();
                    $('#txtBody').val('');
                    MassMailManage.ToogleMassMailContainers(true);
                });

                $('#btnCancelMassMailManage').off().on('click', function () {
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.ClearAddDetail();
                  
                });
                $('#divMailManage').on('click', '.canceluser', function () {
                     $(this).parent().remove();
                });


                $("#txtAdditionalUsers").autocomplete({

                    minLength: 2,
                    source: function (request, response) {
                        MassMailManage.GetAllUsers(request, response);
                    },
                    change: function (event, ui) {
                        var terms = split(this.value);
                        var itemsToRemove = [];
                        for (var i = 0; i < terms.length; i++) {
                            var currentTerm = terms[i];
                            var ok = false;
                            for (var j = 0; j < selectedUsers.length; j++) {
                                if (selectedUsers[j].label === currentTerm)
                                     ok = true;
                            }
                            if (!ok)
                                itemsToRemove.push(currentTerm);
                        }

                        if (itemsToRemove.length) {
                            for (var i = 0; i < itemsToRemove.length; i++)
                                removeArrayItem(terms, itemsToRemove[i]);
                            $(this).val(terms.join(", "));
                        }

                    },

                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (event, ui) {
                        var IsDuplicate = false;
                        $('#divSelectedUsers').children('div').each(function () {
                           if ($(this).children('span').data('users') == ui.item.value)
                               IsDuplicate = true;
                        })
                        if (!IsDuplicate) {
                            var html = '<div><span class="userLabel" data-users=' + ui.item.value + '>' + ui.item.label + '</span> <i  class="fa fa-times canceluser"></i></div> ';
                            $('.selectedUers').append(html);
                        }
                       return false;
                    },

                });

                $('#btnSaveMassMail').on('click', function () {
                    var msgBody = $.trim($('#txtBody').val());
                    var valid = true;
                    if ($validator.form() && msgBody.length > 0) {
                        valid = true;
                    }
                    else {
                        valid = false;
                    }
                    if (msgBody.length == 0) {
                        valid = false;
                        $("#txtBody").after('<label class="sfError" id="lblErrorBody" style="display: inline;"><br/>* Required Field</label>');
                    }
                    else {
                        if ($('#lblErrorBody').length > 0)
                            $('#lblErrorBody').remove();
                    }

                    if (valid == true) {
                        MassMailManage.SaveMailDetail();
                      
                    }
                })


            },

            SaveMailDetail: function () {
                var mailTitle = $.trim($('#txtMailTitle').val());
                var filterTypeID = $('#ddlFormFilterType option:selected').val();
                var filterTypeValues = '';
                if ($('#ddlFormFilterValue').val() != null)
                    filterTypeValues = $('#ddlFormFilterValue').val().join(',');
                var additionUsers = '';
                $('#divSelectedUsers').children('div').each(function () {
                    additionUsers += $(this).children('span').data('users')+',';
                })
                if(additionUsers!='')
                     additionUsers = additionUsers.substring(0, additionUsers.length - 1);
                //if (selectedUsers.length > 0) {
                //    for (var i = 0; i < selectedUsers.length; i++) {
                //        additionUsers += selectedUsers[i].value + ',';
                //    }
                //    additionUsers = additionUsers.substring(0, additionUsers.length - 1);
                //}
               
                var scheduleType = $('input[name="schedule"]:checked').val();
                var schdeuleOn = $.trim($('#txtSchedule').val());

                var subject = $.trim($('#txtSubject').val());
                var msgBody = $.trim($('#txtBody').val());


                var objMassMail = {
                    MassMailID: massMailID,
                    MessageTitle: mailTitle,
                    FilterTypeID: filterTypeID,
                    FilterValue: filterTypeValues,
                    AdditionalUser: additionUsers,
                    Subject: subject,
                    MessageBody: msgBody,
                    ScheduleType: scheduleType,
                    ScheduledOn: schdeuleOn
                };
                MassMailManage.config.url = MassMailManage.config.baseURL + "AddUpdateMassMail";
                MassMailManage.config.data = JSON2.stringify({ objMassMail: objMassMail, authInfo: MassMailManage.GetAuthInfo() });
                MassMailManage.config.ajaxCallMode = MassMailManage.AddUpdateMassMailSuccessMsg;
                MassMailManage.ajaxCall(MassMailManage.config);

            },

            AddUpdateMassMailSuccessMsg: function (data) {
                var result = data.d;
                if (data.d == 1) {
                    SageFrame.messaging.show("Mail generated Successfully", "Success");
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.RefreshData();
                }
                else if (data.d == 2) {
                    SageFrame.messaging.show("Mail updated Successfully", "Success");
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.RefreshData();
                }
                else if (data.d == 3) {
                    SageFrame.messaging.show("Mail re-generated Successfully", "Success");
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.RefreshData();
                }

                else if (data.d == -2) {
                    SageFrame.messaging.show("Exception occured!!", "Error");
                }
                else if (data.d == -1) {
                    SageFrame.messaging.show("User not authorized to perform the task", "Alert");
                }
                else {
                    SageFrame.messaging.show("Error Occured while generating mail", "Error");
                }
            },

            GetFilterValueSuccessCall: function (data) {
                var valueList = data.d;
                var filterValues = '';
                $.each(valueList, function (index, item) {
                    filterValues += "<option value=\"";
                    filterValues += item.TypeID;
                    filterValues += "\">";
                    filterValues += item.TypeName;
                    filterValues += "</option>";
                });

                $('#ddlFormFilterValue').html(filterValues);
            },

            ClearAddDetail: function () {
                $('#txtMailTitle').val('');
                $('#ddlFormFilterType').val(1);
                $('#ddlFormFilterType').trigger('change');
                $('#divSelectedUsers').html('');
                $('#txtSchedule').val('');
                $('#txtSubject').val('');
                //$('#txtBody').val('');
                $('#rbInstant').prop('checked', true);
                $('#txtSchedule').attr('disabled', 'disabled');
                $('#txtSchedule').datetimepicker('destroy');
                $('.selectedUers').html('');
                $('#divScheduleForm').fadeOut();
            },

            GetAllUsers: function (request, response) {
                var lastItem = extractLast(request.term);
                this.config.url = this.config.baseURL + "GetAllUsers";
                this.config.data = JSON2.stringify({ username: lastItem, authInfo: MassMailManage.GetAuthInfo() });
                this.config.ajaxCallMode = function (data) {
                       response($.ui.autocomplete.filter(
                        $.map(data, function (item) {
                            var obj = data.d;
                            userList = [];
                            $.each(obj, function (index, item) {
                                var itemExists = false;
                                $('#divSelectedUsers').children('div').each(function () {
                                    if ($(this).children('span').data('users') == item.TypeID)
                                        itemExists = true;
                                })
                                if (!itemExists)
                                    userList.push({ "value": item.TypeID, "label": item.TypeName });
                            });
                            return userList;
                        }), lastItem));
                };
                this.ajaxCall(this.config);

            },

            NotifySF: function (message, type) {
                SageFrame.messaging.show(message, type);
            },

            SaveSiteDetail: function () {

            },

            ToogleMassMailContainers: function (edit) {

                if (edit) {
                    $('#divMailManage').toggle(true);
                    $('#divMassMailList').toggle(false);
                }
                else {
                    $('#divMassMailList').toggle(true);
                    $('#divMailManage').toggle(false);
                }
            },

            GetAuthInfo: function () {
                var authInfo = {
                    UserModuleID: MassMailManage.config.userModuleID,
                    PortalID: SageFramePortalID,
                    Username: SageFrameUserName,
                    SecureToken: SageFrameSecureToken
                };
                return authInfo;
            },
        };

        $validator = $("#form1").validate({

            rules: {
                mailTitle: {
                    required: true
                },
                subject: {
                    required: true
                },
                body: {
                    required: true
                },

                scheduleOn: {
                    required: true
                },
                slcMembershipDateType: {
                    selectcheck: true
                },
                ddlFormFilterValue: {
                    selectcheck: true,
                    required: true
                }

            },
            messages: {
                mailTitle: {
                    required: "*Required Field"
                },
                subject: {
                    required: "*Required Field"
                },
                body: {
                    required: "*Required Field"
                },
                scheduleOn: {
                    required: "*Required Field"
                },
                ddlFormFilterValue: {
                    required: "* Please select at least one product"
                }

            },
            ignore: ':hidden, :disabled',
        });

        jQuery.validator.addMethod('selectcheck', function (value) {
            //debugger;
            return (value != '0');
        }, "*");


        MassMailManage.init();
    }
    $.fn.MassMailManage = function (p) {
        $.MassMailManage(p);
    };
})(jQuery);


function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function removeArrayItem(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

removeDuplicatesFromObjArray = function (arr, field) {
    var u = [];
    arr.reduce(function (a, b) {
        if (a[field] !== b[field]) u.push(b);
        return b;
    }, []);
    return u;
}