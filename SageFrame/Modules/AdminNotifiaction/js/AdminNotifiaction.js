$(function () {
    $("#divNotification").on("click", function () {
        $("#divNotificationList").toggle();
    });
    $("#btnMarkRead").on("click", function () {
        var path = '';       
        path = "/Modules/AdminNotifiaction/Services/AdminNotificationWebService.asmx/NotificationMarkAsRead";
        $.ajax({
            type: "POST",
            url: path,
            async: false,
            data: JSON2.stringify({
                PortalID: SageFramePortalID,
                UserName: SageFrameUserName,
                secureToken: SageFrameSecureToken
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) { 
                
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    $(".notifierDetail").off().on("click", function () {

        var message = $(this).context.childNodes[0].data;

        $(this).find('.msgDetail').SimpleDialog({
            "title": message,
            "width": 700,
            "close": function () {
            }
        });
    });

});