(function ($) {
    $.RatingSettingView = function (p) {
        p = $.extend({           
            userModuleID: 0
        }, p);
        var $validator;
        var RatingSetting = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: '/Modules/PageRating/Services/RatingWebService.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: RatingSetting.config.type,
                    contentType: RatingSetting.config.contentType,
                    async: RatingSetting.config.async,
                    cache: RatingSetting.config.cache,
                    url: RatingSetting.config.url,
                    data: RatingSetting.config.data,
                    dataType: RatingSetting.config.dataType,
                    success: RatingSetting.config.ajaxCallMode,
                    error: RatingSetting.ajaxFailure
                });
            },
            init: function () {
                RatingSetting.GetRatingSettings();
                $("#btnSaveRatingSetting").on("click", function () {
                    if ($validator.form()) {
                        RatingSetting.SaveRatingSettings();
                    }
                });
            },
            GetRatingSettings: function () {               
                this.config.method = "GetRatingSettings";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({                    
                    authInfo: authInfo
                });
                this.config.ajaxCallMode = RatingSetting.GetRatingSettingSuccess;
                this.ajaxCall(this.config);
            },
            GetRatingSettingSuccess: function (data) {
                var obj=data.d;
                if (obj != null)
                {
                    $("#txtRatingTitle").val(obj.RatingTitle);
                    $("#txtRatingPoint").val(obj.RatingPoint);
                    $("#chkEnableRatingEdit").prop("checked", obj.IsRatingEditEnable);
                }
            },
            SaveRatingSettings: function () {
                var ratingTitle = $("#txtRatingTitle").val();
                var ratingPoint = $("#txtRatingPoint").val();
                var chkEnableRatingEdit = $("#chkEnableRatingEdit").prop("checked");
                var objSetting={
                    RatingTitle:ratingTitle,
                    RatingPoint:ratingPoint,
                    IsRatingEditEnable: chkEnableRatingEdit
                }
                this.config.method = "SaveRatingSettings";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    objSetting:objSetting,
                    authInfo: authInfo
                });
                this.config.ajaxCallMode = RatingSetting.SaveRatingSettingSuccess;
                this.ajaxCall(this.config);
            },
            SaveRatingSettingSuccess: function (data) {
                if (data.d == 1) {
                    SageFrame.messaging.show("Saved Successfully", "Success");                   
                } else if (data.d == 2) {
                    SageFrame.messaging.show("Updated Successfully", "Success");
                }
                else if (data.d == -100) {
                    SageFrame.messaging.show("You are not uthorized to save.", "Alert");
                }
                else {
                    SageFrame.messaging.show("Error Occured.", "Alert");
                }
            }
        };
        var authInfo = {
            UserModuleID: p.userModuleID,
            PortalID: SageFramePortalID,
            Username: SageFrameUserName,
            SecureToken: SageFrameSecureToken
        };
        $validator = $("#form1").validate({
            rules: {
                txtRatingTitle: {
                    required: true
                },
                txtRatingPoint: {
                    required: true,
                    digits: true,
                    maxlength: 2,
                    multiple5:true
                }
            },
            messages: {
                txtRatingTitle: {
                    required: "Required Field"
                },
                txtRatingPoint: {
                    required: "Required Field",
                    multiple5: "Digits less than equal to 20 and multiple of 5"
                }
            },
            ignore: ':hidden, :disabled'
        });
        jQuery.validator.addMethod('multiple5', function (value) {
            var isValid = false;
            if (value <= 20) {
                if ((value % 5) == 0) {
                    isValid = true
                }
            }
            return isValid;
        }, "*");
        RatingSetting.init();
    };
    $.fn.RatingSettingViewManage = function (p) {
        $.RatingSettingView(p);
    };
})(jQuery);