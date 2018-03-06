(function ($) {
    $.RatingView = function (p) {
        p = $.extend({
            AverageRating: 0.0,
            RatingPoint: '',
            RatingTitle: '',
            IsGuestRatingEnable: '',
            IsRatingChangeable: '',
            UserRating:0.0,
            userModuleID:0
        }, p);
        var Rating = {
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
                    type: Rating.config.type,
                    contentType: Rating.config.contentType,
                    async: Rating.config.async,
                    cache: Rating.config.cache,
                    url: Rating.config.url,
                    data: Rating.config.data,
                    dataType: Rating.config.dataType,
                    success: Rating.config.ajaxCallMode,
                    error: Rating.ajaxFailure
                });
            },
            init: function () {               
                $("#ratingTitle").html(p.RatingTitle);
                var changeable = p.IsRatingChangeable;
                $("#divAvgRating").starbox({
                    average: p.AverageRating,
                    changeable: false,
                    ghosting: false,
                    buttons: p.RatingPoint
                });
                $("#divRating").starbox({
                    average: p.UserRating,
                    changeable: changeable,
                    autoUpdateAverage: true,
                    ghosting: true,
                    buttons: p.RatingPoint
                }).bind('starbox-value-changed', function (event, value) {
                    p.UserRating = value;
                    var ratingValue = "";
                    if (SageFrameUserName == 'anonymoususer')
                    {
                        var loginPage = '/sf/sfLogin.aspx';
                        ratingValue += '<h2>You must be logged in for rating.</h2>';
                        ratingValue += '<a href="' + loginPage + '">Go to Login.</a>';
                        $("#divRatingPopUp").AddPopUP(ratingValue);
                    }
                    else if (changeable.toLowerCase() != 'true' && p.UserRating > 0 && SageFrameUserName != 'anonymoususer') {
                        ratingValue += '<h2>You have already rated before.</h2>';
                        $("#divRatingPopUp").AddPopUP(ratingValue);
                    }
                    else {
                        ratingValue += '<div class="divRatingPopUpWrap">';
                        ratingValue += '<h2>Your Rating</h2>';
                        ratingValue += '<div id="divPopUPRating"></div>';
                        ratingValue += '<div class="sfButtonwrapper">';
                        ratingValue += '<label id="btnSaveRatingSetting" class="icon-save sfBtn">';
                        ratingValue += 'Submit</label>';
                        ratingValue += '</div></div>';
                        $("#divRatingPopUp").AddPopUP(ratingValue);
                        $('#divPopUPRating').starbox({
                            average: value,
                            changeable: changeable,
                            autoUpdateAverage: true,
                            ghosting: true,
                            buttons: p.RatingPoint
                        }).bind('starbox-value-changed', function (event, value) {
                            p.UserRating = value;
                        });
                    }
                });
                $("#divPageRating").on("click","#btnSaveRatingSetting", function () {
                    Rating.SaveUserRating();
                });
            },
            SaveUserRating: function () {
                var url = window.location.pathname;                
                var pageName = getPageName(url);
                var ratingPoint = p.UserRating;
                this.config.method = "SavePageRating";
                this.config.url = this.config.baseURL + this.config.method;
                this.config.data = JSON2.stringify({
                    pageName: pageName,
                    ratingPoint: ratingPoint,
                    authInfo: authInfo
                });
                this.config.ajaxCallMode = Rating.SaveUserRatingSuccess;
                this.ajaxCall(this.config);
            },
            SaveUserRatingSuccess: function (data) {
                if (data.d == 1) {
                    $("#divRatingPopUp").CancelPopUP();
                    $("#divRating").starbox({ average: p.UserRating });
                    SageFrame.messaging.show("Rating Saved Successfully", "Success");                    
                } else if (data.d == 2) {
                    $("#divRatingPopUp").CancelPopUP();
                    $("#divRating").starbox({ average: p.UserRating });
                    SageFrame.messaging.show("Rating Updated Successfully", "Success");
                }
                else if (data.d == -100) {
                    $("#divRatingPopUp").CancelPopUP();
                    SageFrame.messaging.show("You are not uthorized to save.", "Alert");
                }
                else {
                    $("#divRatingPopUp").CancelPopUP();
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
        Rating.init();
    };
    function getPageName(url) {
        var index = url.lastIndexOf("/") + 1;
        var filenameWithExtension = url.substr(index);
        var filename = filenameWithExtension.split(".")[0]; // <-- added this line
        return filename;                                    // <-- added this line
    }
    $.fn.RatingViewManage = function (p) {
        $.RatingView(p);
    };
})(jQuery);