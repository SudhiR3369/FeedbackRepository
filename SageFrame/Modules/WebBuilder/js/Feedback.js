//FeedBack ko kei rahasyamaya kura haru
(function ($) {
    $.Feedback = function (p) {
        p = $.extend
          ({
              CultureCode: '',
              UserModuleID: '1'
          }, p);



        var Feedback = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                // url: "http://172.18.12.119:8090/Modules/WebBuilder/services/Feedback.asmx/",
                url: SageFrameAppPath + "/Modules/WebBuilder/services/Feedback.asmx/",
                ajaxCallMode: 0,
                baseUrl: '',
                //  baseURL: SageFrameAppPath + '/Modules/Registration/WebService/RegistrationService.asmx/',
                // Path: SageFrameAppPath + '/Modules/Registration/',
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,

                SecureToken: SageFrameSecureToken,
                ID: 0,
                //ProfileImageName: '',
            },


            Init: function () {
                //Feedback.GetAllFeedback();
                //Feedback.SelectOption();
                //Feedback.SearchFeedList();

                Feedback.GetResult();
                Feedback.UIEvent();
            },

            UIEvent: function () {
                //$('#divFeedbackForm').dialog({
                //    autoOpen: false,
                //    modal: true,
                //    show: 'blind',
                //    hide: 'blind'
                //});

 

                $('#btnFeedback').off().on('click', function () {
                    Feedback.ClearFeedbackForm();
                    //WebManagement.ShowStickeyHeaderOption('pagesettingshow');
                    //$('.headerControls').removeClass('clicked');
                    //$(this).addClass('clicked');
                    //PopUpSetting('feedback', 0, 500, 0, 0, 'Feedback', $('#divFeedbackForm'), $(this));
                    $('#divFeedbackForm').fadeIn(300);
                    Feedback.ResetFeedbackForm();
                //    var selectDOM = $('#divFeedbackForm').html();
                //    var option={
                //        data: selectDOM,
                //        showheading: true,
                //        heading: 'Feedback Form',
                //        width: '40%',
                //        height: '50%',
                //        onappend: function ($wrapper) {
                //            $('#btnSubmit').on('click', function () {
                //                alert('askfjkasdjfkaj');
                //            });
                //}
                //    }
                //    FullPagePopup(option);
                //    })
                });


                $('#btnClose').on('click', function (e) {
                    Feedback.ClearFeedbackForm();
                    $('#divFeedbackForm').hide();
                    Feedback.ResetFeedbackForm();
                });

                

                $('#divFeedbackForm').draggable({
                    handle: '.popup-header',
                    containment: '.main-container',
                  //  revert: true,
                    connectWith: '.editor-col',
                    cursor: 'pointer'
                    //start: function (e, ui) {
                    //    $('#divFeedbackForm').css({
                    //        "position": "fixed"
                    //    });
                    //},
                    //stop: function (event, ui) {
                    //    AutoAlignDragger(ui.helper);
                    //}
                });

                function AutoAlignDragger($helper) {
                    var offsets = $helper.position();
                    var top = offsets.top;
                    var screenHeight = ScreenDimension().height;
                    if ((screenHeight - 100) < top) {
                        $helper.css('top', (screenHeight - 100) + "px");
                    }
                    else if ($('.main-top-row').height() > top) {
                        $helper.css('top', $('.main-top-row').height() + 10 + "px");
                    }
                }
            


                //$('#iconClose').on('click', function () {
                //    $('#divFeedbackForm').fadeOut(300);
                //});

                //$('#btnFeedback').bind('click', ToggleDisplay);
                //function ToggleDisplay() {
                //    Feedback.ClearFeedbackForm();
                //    if ($('#divFeedbackForm').data('shown'))
                //        hide();
                //    else
                //        display();
                //}
                //function display() {
                //    if ($('#divFeedbackForm').children().length > 0) {
                //        $('#divFeedbackForm').fadeIn(500, function () {
                //            //$(document).bind('click', function () {
                //            hide();
                //            //});
                //            $('#divFeedbackForm').data('shown', true)

                //        });
                //    }
                //}

             

                //});

                //function hide() {
                //    $('#iconClose').on('click', function () {
                //        $('#divFeedbackForm').fadeOut(500, function () {
                //            //$('document').unbind('click');
                //            $('#divFeedbackForm').data('shown', false);
                //        });
                //    });
                //}

                $('#btnSubmit').off().on('click', function (e) {
                    e.preventDefault();
                    if (validator.form()) {
                        Feedback.SubmitFeedBack();
                        Feedback.ClearFeedbackForm();
                    }
                });

                $('#btnReset').on('click', function () {
                    Feedback.ClearFeedbackForm();
                });


                //$('#btnCancel').on('click', function () {
                //    $('#divFeedbackForm').hide();
                //});


            },

            ResetFeedbackForm: function () {
                $('#divFeedbackForm').css({
                    'position': 'fixed',
                    'top': '20%',
                    'left': 'auto',
                    'right': '30%'
                });
            },

            IsRead: function ($last, ID) {
                $last.css({
                  //  "display": "none",
                    'pointer-events': 'none'
                })
                $last.text("Read");
                $('#eachrow' + ID).css({
                    "font-weight": "",
                    "color": "green"
                  
                });

            },
            CheckRead: function () {
                // $('#tbl_feedbacklist').load('.datarow', function () {
                $('.datarow').each(function () {
                    var $this = $(this).children().last(); // or $(this).children(':last')
                    var $last = $this.children();
                    var ID = $last.attr('data-id');
                    var IsRead = $last.attr('read');
                    if (IsRead === "True" || IsRead == "true") {
                        Feedback.IsRead($last, ID);
                    }
                })

                // });
            },
            LoadChanges: function (obj) {
                Feedback.GetAllFeedback(obj);
                Feedback.CheckRead();
            },
            GetResult: function () {
                var dataObject = {
                    SortName: 'date',
                    SortOrder: '',
                    Keyword: '',
                    PageSize: '30',
                    PageNumber: '1',
                    StartDate: '1753-01-01',
                    EndDate: '9999-12-31',
                    IsRead: null
                }

                //Loads the list for first time with default parameters.
                Feedback.LoadChanges(dataObject);


                //Parametrs for filter and sorting the list.
                $('#sortName').off().on('change', function () {
                    var sortName = $(this).val();
                    $('#sortOrder').hide();

                    if (sortName !== "Select Type") {
                        dataObject.SortName = sortName;
                        Feedback.LoadChanges(dataObject);
                        $('#sortOrder').show();
                    }
                });
                $('#sortOrder').off().on('change', function () {
                    var sortDate = $(this).val();

                    if (sortDate !== "Select Order") {
                        dataObject.SortOrder = sortDate;
                        Feedback.LoadChanges(dataObject);
                    }
                });

                $('#pageSize').off().on('change', function (e) {
                    var pageSize = $(this).val();
                    if (typeof (pageSize !== "select")) {
                        dataObject.PageSize = pageSize;
                        Feedback.LoadChanges(dataObject);
                    }
                    else {
                        Feedback.LoadChanges(dataObject.PageSize);
                    }
                });
                $('#startDate').datepicker();//.datepicker("setDate", new Date());
                $('#startDate').change(function () {
                    var startdate = $(this).val();
                    if (typeof (startdate) !== "undefined") {
                        dataObject.StartDate = startdate;
                    }
                });

                $('#endDate').datepicker();//.default("setDate", new Date());
                $('#endDate').change(function () {
                    var endDate = $(this).val();
                    if (endDate !== null && typeof (endDate) !== "undefined") {
                        dataObject.EndDate = endDate;
                    }
                });

                $('#btnGetFeedback').off().on('click', function () {
                    var keyword = $('#keyword').val();
                    if (keyword !== "NULL") {
                        dataObject.Keyword = keyword;
                        $('#keyword').val('');
                    }
                    Feedback.LoadChanges(dataObject);
                    Feedback.ClearFeedbackForm();
                });

                //Resets List Parameters
                $('#btnResetFeedbackList').on('click', function () {
                    dataObject.StartDate = '1753-01-01';
                    dataObject.EndDate = '9999-12-31';
                    dataObject.IsRead = null;
                    dataObject.SortName = 'date';
                    dataObject.SortOrder = '';
                    dataObject.Keyword = '';
                    dataObject.PageSize = '25';
                    dataObject.PageNumber = '1';

                    Feedback.LoadChanges(dataObject);
                    Feedback.ClearFeedbackForm();
                    $('#sortOrder').hide();
                    $('#pageSize').val(1);
                    

                });

                $('#checkRead').off().on('click', function () {
                    var isChecked = $(this).is(':checked');
                    if (!isChecked) {
                        dataObject.IsRead = 'False';
                    }
                    else {
                        dataObject.IsRead = 'True';
                    }
                    // Feedback.GetAllFeedback(dataObject);
                });

                $('#tbl_feedbacklist').off('click').on('click', '.checkedtd', function (e) {
                    var $this = $(this);
                    var ID = $this.attr('data-id');
                    var IsRead = $this.attr('read');
                    if (typeof (IsRead) !== "undefined" && IsRead != "True") {
                        Feedback.MarkAsRead(ID);
                    }
                    //if (IsRead == "True" || IsRead != "true") {
                    //    e.stopPropagation();
                    //    // $(this).prop('disabled', true);
                    //}
                    Feedback.LoadChanges(dataObject);
                });

                $('#tbl_feedbacklist').on('click', '.view', function (e) {
                    var ID = $(this).attr('data-id');
                    Feedback.GetFeedbackByID(ID);

                });
            },
            MarkAsRead: function (ID) {
                Feedback.config.method = "MarkasRead"
                Feedback.config.data = JSON.stringify({
                    ID: ID
                });
                Feedback.config.ajaxCallMode = 4;
                Feedback.ajaxCall(Feedback.config);
            },
            SubmitFeedBack: function () {
                Feedback.config.method = "InsertFeedback"
                var Submit = {
                    //  ID: parseInt(config.ID),
                    Title: $.trim($('#txtTitle').val()),
                    Description: $.trim($('#txtDesc').val()),
                    Category: $('#slcFeedback option:selected').text(),
                    //UserModuleID: webBuilderUserModuleID,
                    //PortalID: SageFramePortalID,s
                    //CultureCode: SageFrameCurrentCulture,
                    Name: SageFrameUserName,
                    Domain: SageFrameHostURL
                }
                Feedback.config.data = JSON.stringify({
                    submit: Submit
                    //secureToken: SageFrameSecureToken,-
                    //UserName: SageFrameUserName
                });
                Feedback.config.ajaxCallMode = 3;
                Feedback.ajaxCall(Feedback.config);
            },


            GetFeedbackByID: function (ID) {
                Feedback.config.method = 'GetFeedbackByID';
                Feedback.config.data = JSON.stringify({
                    ID: ID
                });
                Feedback.config.ajaxCallMode = 6;
                Feedback.ajaxCall(Feedback.config);
            },

            GetAllFeedback: function (data) {
                Feedback.config.method = "GetResult";

                Feedback.config.data = JSON.stringify({
                    data: data
                })

                Feedback.config.ajaxCallMode = 1;
                Feedback.ajaxCall(Feedback.config);
            },

            BindFeedbackForm: function (data) {
                Feedback.ClearFeedbackForm();
                data = data.d;
                if (data != null) {
                    $('#divFeedbackForm').show();                    
                    $('#slcFeedback option:contains(' + data.Category + ')').prop({'selected': true});
                    $('#slcFeedback').prop('disabled', true);
                    $('#txtTitle').val(data.Title).attr('readonly', true);
                    $('#txtDesc').val(data.Description).attr('readonly', true);
                    $('#btnSubmit').hide();
                    $('#btnReset').hide();
                    $('#checkRead').prop('checked', false)

                }

            },

            //Feedback List Binding is Here
            BindFeedbackList: function (data) {
                var feedbackList = data.d;
                var html = '';
                if (feedbackList.length > 0) {
                    var i = 1;
                    $.each(feedbackList, function (index, item) {
                        html += '<tr class="datarow" id="eachrow' + item.ID + '"  style="font-weight:bold;">'
                        html += '<td>' + i + '</td>';
                        html += '<td>' + item.Name + '</td>';
                        html += '<td>' + item.EmailID + '</td>';
                        html += '<td>' + item.Category + '</td>';
                        html += '<td>' + item.Title + '</td>';
                        html += '<td>' + item.Description + '</td>';
                        html += '<td>' + item.Domain + '</td>';
                        html += '<td>' + item.IsRead + '</td>';
                        html += '<td>' + item.ReceivedDate + '</td>';
                        html += '<td>' + item.Rating + '</td>'
                        html += '<td><a class="view" href="Javascript:void(0);" data-id="' + item.ID + '"><i class="fa fa-eye"></i></a></td>'
                        html += '<td ><p class="checkedtd" '+item.ID+' data-id=' + item.ID + ' read="' + item.IsRead + '"> <i class="fa fa-check"  style="cursor:pointer;"></i></p></td>';

                        html += '</tr>';
                        i++;
                    });

                }
                else {
                    html += '<tr><td colspan="7"><h3>No Data to Display DumbAss.</h3></td></tr>';
                }
                $('#tbl_feedbacklist').html(html);
            },


            //Notifies Admin about the reported Feedback

            NotificationEmail: function () {
                Feedback.config.method = "NotificationEmail";
                Feedback.config.data = JSON.stringify({
                    //From: 'bdtrainee.engineer@gmail.com',
                    //sendTo: 'sudip.thapa@braindigit.com',
                    Subject: 'Feedback Notification',
                    Body: '<div><p>' + SageFrameUserName + ' has sent a feedback.' + 'Click <a href=' + SageFrameHostURL + '/Webbuilder/home>' + 'Here</a> to view Feedback list. </div></p>',
                    // CC: 'finalgoal123@gmail.com',
                    // BCC:''
                });
                Feedback.config.ajaxCallMode = 5;
                Feedback.ajaxCall(Feedback.config);

            },

            ajaxCall: function (config) {
                $.ajax({
                    type: config.type,
                    contentType: config.contentType,
                    cache: config.cache,
                    async: config.async,
                    url: config.url + config.method,
                    data: config.data,
                    dataType: config.dataType,
                    success: Feedback.ajaxSuccess,
                    error: function () { alert("kuch toh gadhbadh hai!!"); }
                })
            },
            ajaxSuccess: function (data) {
                switch (Feedback.config.ajaxCallMode) {
                    case 1:
                        {
                            Feedback.BindFeedbackList(data);
                            break;
                        }
                    case 2:
                        {
                            alert("yeta filter gareko function call garne");
                            break
                        }
                    case 3:
                        {
                            alert("Feedback Added Successfully!!");
                            Feedback.GetResult();
                               Feedback.NotificationEmail();
                            break;
                        }
                    case 4: {
                        //alert("Successfull!");
                        break;
                    }

                    case 5: {
                        alert("Mail toh Giyo");
                        break;
                    }
                    case 6: {
                        Feedback.BindFeedbackForm(data);
                        break;
                    }
                }
            },


            //Setting Default value
            ClearFeedbackForm: function () {
                $('#txtTitle').val('').attr('readonly', false);
                $('#txtDesc').val('').attr('readonly', false);
                $('#startDate').val('');
                $('#endDate').val('');
                $('#keyword').val('');
                $('#slcFeedback').val(1).attr({'disabled':false});
                $('#sortName').val('Select Type');
                $('#sortOrder').val('Select Order');
                $('#btnCancel').hide();
                $('#btnSubmit').show();
                $('#btnReset').show();
                //removes validation error messages
                validator.resetForm();
                
                $('#checkRead').attr(':checked', false);
            }
        }
        Feedback.Init();
    }


    //Validation for Feedback Form
    var validator =
      $("#form1").validate({
          ignore: ":hidden",
          rules: {
              Title: {
                  required: true,
                  minlength: 2
              },
              Description: {
                  required: true

              }
          },
          messages: {
              Title: {
                  required: "*Titles is Required",
              },
              Description: {
                  required: "*Description is Required"
              }
          }
      });


    $.fn.Feedback = function (p) {
        $.Feedback(p);
    };
})(jQuery)
