var AdminContactUs;

(function ($) {
    $.AdminContactUsView = function (p) {
        p = $.extend({
            modulePath: '',
            userModuleID: '',
            userName: ''
        }, p);

        var credentialID = 0;
        var $validator;
        AdminContactUs = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: '/Modules/WebBuilder/services/WebService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                userName: p.userName
            },


            ajaxSuccess: function (data) {
                switch (AdminContactUs.config.ajaxCallMode) {                    
                }
            },

            ajaxFailure: function () {
            },

            ajaxCall: function (config) {
                $.ajax({
                    type: AdminContactUs.config.type,
                    contentType: AdminContactUs.config.contentType,
                    async: AdminContactUs.config.async,
                    cache: AdminContactUs.config.cache,
                    url: AdminContactUs.config.url,
                    data: AdminContactUs.config.data,
                    dataType: AdminContactUs.config.dataType,
                    success: AdminContactUs.config.ajaxCallMode,
                    error: AdminContactUs.ajaxFailure
                });
            },

            init: function () {
               // AdminContactUs.BindEvents();
                AdminContactUs.GetContactUsDataList();
                $("#btnSearch").on("click", function () {
                    AdminContactUs.GetContactUsDataList();
                });
                $("body").on("click", "#btnCancelView", function () {
                    $("#divViewContact").hide();
                    $("#divContactList").show();                   
                });
            },
            ClearField: function () {               
            },
            GetContactUsDataList: function () {
                var offset_ = 1;
                var current_ = 1;
                var perpage = ($("#tblContactUS_pagesize").length > 0) ? $("#tblContactUS_pagesize :selected").text() : 10;
                this.config.url = this.config.baseURL;
                this.config.method = "GetContactUsData";
                var authInfo = {
                    UserModuleID: p.UserModuleID,
                    PortalID: SageFramePortalID,
                    Username: SageFrameUserName,
                    SecureToken: SageFrameSecureToken
                };
                this.config.data = {
                    email: $("#txtEmail").val().trim(),
                    name: $("#txtName").val().trim()
                };
                var data = this.config.data;
                $("#tblContactUS").sagegrid({
                    url: this.config.url,
                    functionMethod: this.config.method,
                    colModel: [
                                { display: '#', name: 'RowNum', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'center', controlclass: '' },
                                { display: 'ID', name: 'ContactUsID', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'center', hide: true },
                                { display: 'First Name', name: 'ClientTransactionID', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'center' },
                                { display: 'Last Name', name: 'FullName', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center' },
                                { display: 'Message', name: 'Message', cssclass: 'cssClassHide', controlclass: '', coltype: 'label', align: 'center', hide: true },
                                { display: 'Email', name: 'Email', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center' },
                                { display: 'Telephone', name: 'Telephone', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'left', hide: true },
                                { display: 'Subject', name: 'Subject', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center' },
                                { display: 'Address', name: 'Address', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center', hide: true },
                                { display: 'Website', name: 'Website', cssclass: 'cssClassHeadNumber', controlclass: '', coltype: 'label', align: 'center', hide: true },
                                { display: 'Actions', name: 'action', cssclass: 'cssClassHeadNumber', coltype: 'label', align: 'center' }
                    ],

                    buttons: [
                                { display: 'Detail', cssclass: 'fa fa-file-text-o', name: '_detail', enable: true, _event: 'click', trigger: '3', callMethod: 'AdminContactUs.GetDetail', arguments: '1,2,3,4,5,6,7,8,9,10,11,12' },
                    ],
                    rp: perpage,
                    nomsg: "No Records Found!",
                    param: data, current: current_,
                    pnew: offset_,
                    hidePagination: false,
                    NormalPaging: false,
                    sortcol: { 10: { sorter: false } }
                });
            },           
            GetDetail: function (tblID, argus) {
                html = '<div class="content_heading"><h2>Contact Information</h2></div><div class="details_wrap inline">';
                html += "<div class='body'>";
                html += "<div class='detail_group'><span class='detail_label'>First Name</span>";
                html += "<div class='detail'>";
                html += argus[4].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Last Name</span>";
                html += "<div class='detail'>";
                html += argus[5].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Email</span>";
                html += "<div class='detail'>";
                html += argus[7].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Telephone</span>";
                html += "<div class='detail'>";
                html += argus[8].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Address</span>";
                html += "<div class='detail'>";
                html += argus[10].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>WebSite</span>";
                html += "<div class='detail'>";
                html += argus[11].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Subject</span>";
                html += "<div class='detail'>";
                html += argus[8].trim();
                html += "</div></div>";
                html += "<div class='detail_group'><span class='detail_label'>Message</span>";
                html += "<div class='detail'>";          
                html += argus[6].trim();
                html += "</div></div>";
                html += '<div class="detail_group clearfix">'; //Commented by Kamlesh
                html +='<button type="button" id="btnCancelView" class="sfBtn smlbtn-danger cancel">'; //Commented by Kamlesh
                html += '<i class="fa fa-times"></i>Cancel</button>'; //Commented by Kamlesh
                html += '</div>';
                html += '</div>';
                html += '</div>';
                $("#divViewContact").html("");
                $("#divViewContact").html(html);
                $("#divContactList").hide();
                $("#divViewContact").show();
            }
        };
        AdminContactUs.init();
    }

    $.fn.AdminContactUsManage = function (p) {
        $.AdminContactUsView(p);
    };
})(jQuery);