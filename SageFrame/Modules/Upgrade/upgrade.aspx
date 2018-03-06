<%@ Page Language="C#" AutoEventWireup="true" CodeFile="upgrade.aspx.cs" Inherits="upgrade" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%--<script src="http://172.18.12.43:8018/js/jquery-1.9.1.js"></script>--%>
    <script src="../../../../js/jquery-1.9.1.js"></script>
    <script src="../../../../js/jquery-ui-1.8.14.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
    <link href="/..../../../css/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="css/module.css" />
    <script type="text/javascript">
        //<![CDATA[   
        var ModuleFilePath = "../Modules/Upgrade/";
        $(document).ready(function () {
            var options = {
                type: "POST",
                url: '<%=appPath%>' + "/Upgrade",
                data: "{installerZipFile:'<%=ViewState["fileName"]%>',userName:'<%=ViewState["userName"]%>'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var applicationPath = '<%=applicationPath%>';
                    if (msg.d == "done") {
                        $.ajax({
                            type: "POST",
                            url: '<%=appPath%>' + "/UpdateMessage",
                            data: "{MessageID:'<%=ViewState["messageID"]%>',userName:'<%=ViewState["userName"]%>'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                $("#dialog").show();
                                $("#dialog").dialog({
                                    closeOnEscape: false,
                                    open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); }
                                });
                                window.location = applicationPath;
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                            }
                        });

                    }
                }
            };
            $.ajax(options);
            $.ajaxSetup({ cache: false });
        });
        //]]>	
    </script>

</head>
<body>
    <div class="sfUpgradeWrap clearfix">
        <h1>upgrading...</h1>
        <p>This might take a while</p>
        <div class="sfFormwrapper sfPadding clearfix">
            <div id="reportDiv">
                <div class="sfUpgPreloader">
                    <img src="<%=upgradingGif %>" alt="" />
                </div>
                <div class="sfUpgProcessStatus">
                </div>
                <span class="sfUpgLogo">
                    <img src="<%=imagePath %>" alt="sageframe" /></span>
            </div>
            <div id="dialog" title="Success" style="display: none">
                <p>Update Successfully.</p>
            </div>
        </div>
    </div>
</body>
</html>
