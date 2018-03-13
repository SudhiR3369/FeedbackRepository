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
                Feedback.UIEvent();
                Feedback.GetResult();
            },

            UIEvent: function () {
                $('#btnFeedback').bind('click', ToggleDisplay);
                function ToggleDisplay() {
                    if ($('#divFeedbackForm').data('shown'))
                        hide();
                    else
                        display();
                }
                function display() {
                    if ($('#divFeedbackForm').children().length > 0) {
                        $('#divFeedbackForm').fadeIn(500, function () {
                            //$(document).bind('click', function () {
                            hide();
                            //});
                            $('#divFeedbackForm').data('shown', true)

                        });
                    }
                }

                function hide() {
                    $('#iconClose').on('click', function () {
                        $('#divFeedbackForm').fadeOut(500, function () {
                            //$('document').unbind('click');
                            $('#divFeedbackForm').data('shown', false);
                        });
                    });
                }

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

            },

            IsRead: function ($last, ID) {
                $last.children().css({
                    "display": "none"
                })
                $last.text("Read");
                $('#eachrow' + ID).css({
                    "font-weight": "",
                    "color": "green",
                    'pointer-events':'none'
                });

            },
            CheckRead: function () {
                // $('#tbl_feedbacklist').load('.datarow', function () {
                $('.datarow').each(function () {
                    var $this = $(this).children(':last');;
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
                Feedback.LoadChanges(dataObject);
                $('#sortName').off().on('change', function () {
                    var sortName = $(this).val();
                    $('#sortOrder').hide();

                    if (sortName !== "pleaseSelect") {
                        dataObject.SortName = sortName;
                        Feedback.LoadChanges(dataObject);
                        $('#sortOrder').show();
                    }
                });
                $('#sortOrder').off().on('change', function () {
                    dataObject.SortOrder = $(this).val();
                    Feedback.LoadChanges(dataObject);
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
                    dataObject.PageSize = '50';
                    dataObject.PageNumber= '1';

                    Feedback.LoadChanges(dataObject);


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

                $('#tbl_feedbacklist').off().on('click', '.checkedtd', function (e) {
                    var $this = $(this);
                    var ID = $this.attr('data-id');
                    var IsRead = $this.attr('read');
                    if (typeof (IsRead) !== "undefined" && IsRead != "True") {
                        Feedback.MarkAsRead(ID);
                    }
                    if (IsRead == "True" || IsRead != "true") {
                        e.stopPropagation();
                       // $(this).prop('disabled', true);
                    }
                    Feedback.LoadChanges(dataObject);
                })
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
                    //PortalID: SageFramePortalID,
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

            GetAllFeedback: function (data) {
                Feedback.config.method = "GetResult";

                Feedback.config.data = JSON.stringify({
                    data: data
                })

                Feedback.config.ajaxCallMode = 1;
                Feedback.ajaxCall(Feedback.config);
            },

            NotificationEmail:function(){
                Feedback.config.method = "NotificationEmail";
                Feedback.config.data = JSON.stringify({
                    //From: 'bdtrainee.engineer@gmail.com',
                    //sendTo: 'sudip.thapa@braindigit.com',
                    Subject: 'Feedback Notification',
                    Body:'<div><p>'+SageFrameUserName+ ' has sent a feedback.' + 'Click <a href='+ SageFrameHostURL+'/Webbuilder/home>'+ 'Here</a> to view Feedback list. </div></p>',
                   // CC: 'finalgoal123@gmail.com',
                   // BCC:''
                 

                })
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
                            //Feedback.GetResult();
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


                }
            },

            ClearFeedbackForm: function () {
                // $('#slcfeedback').defaultdata();
                $('#txtTitle').val('');
                $('#txtDesc').val('');
                $('#startDate').val('');
                $('#endDate').val('');
                $('#keyword').val('');
                $('#slcFeedback').val(1);
               
            },


            //Validation for Feedback Form

            //Feedback Form Ends Here


            //Feedback List Starts Here

            BindFeedbackList: function (data) {
                var feedbackList = data.d;
                var html = '';
                if (feedbackList.length > 0) {
                    var i = 1;
                    $.each(feedbackList, function (index, item) {
                        html += '<tr class="datarow" id="eachrow' + item.ID + '" style="font-weight:bold;">'
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
                        html += '<td ><p class="checkedtd" id="testid' + item.ID + '" data-id=' + item.ID + ' read="' + item.IsRead + '"> <i class="fa fa-check"  style="cursor:pointer;"></i></p></td>';
                        html += '</tr>';
                        i++;
                    });
                }
                else {
                    html += '<tr><td colspan="7"><h3>No Data to Display DumbAss.</h3></td></tr>';
                }
                $('#tbl_feedbacklist').html(html);
            }
        }
        Feedback.Init();
    }



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
