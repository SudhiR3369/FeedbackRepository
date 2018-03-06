<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SiteConfig.aspx.cs" Inherits="SiteConfig" Async="true" %>

<%@ Register Src="~/Modules/Admin/Advision/Advision.ascx" TagPrefix="advision" TagName="Advision" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Site configuration</title>
    <link href="css/SiteConfig.css" rel="stylesheet" />
    <script src="js/jquery-1.9.1.js"></script>
    <script src="js/jquery-ui-1.8.14.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="Modules/Admin/Advision/js/SocialMarketing.js"></script>
    <style>
        .ajaxLoader.visibleloader {
            display: block;
        }

        .ajaxLoader {
            display: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div style="text-align: center; z-index: 99999;" id="divLoader" class="ajaxLoader visibleloader">
            <div id="ajaxBusy">
                <div class="loading-holder" id="loader-wrapper">
                    <div class="loading-holder-center">
                        <div class="loading-stuff">
                            <span>
                                <img src="/Templates/Webbuilder//images/loading-icon.png" /></span>
                        </div>
                        <div class="loading-msg">Please wait...</div>
                    </div>
                </div>
            </div>
        </div>
        <%-- <asp:ScriptManager ID="ScriptManager1" runat="server">
                </asp:ScriptManager>
        <asp:UpdatePanel ID="ResultsUpdatePanel" runat="server">            
            <ContentTemplate>     --%>
        <div class="main_wrap">
            <div class="body">

                <div class=" welcome_text">
                    Welcome to
                                <span><a href="#">
                                    <img src="images/landinglogo.png" /></a> </span>
                    <br>
                    <span class="starter">Let's get to know a little bit more about your site.</span>
                </div>
                <div class="flexible-box">
                    <div runat="server" id="accessDeniedArea" class="AccessDenied">
                        access denied
                    </div>
                    <div runat="server" id="accessArea" class="Access">
                        <div class="divSteps">
                            <asp:Literal runat="server" ID="ltrStepMenu"></asp:Literal>
                        </div>
                        <div class="stepsWrapper">
                            <div class="messageHolder" id="messageHolder">
                                <asp:Literal runat="server" ID="ltrMessages"></asp:Literal>
                            </div>
                            <div class="messageHolder" id="mHolder">
                                <asp:Literal runat="server" ID="ltrWarning"></asp:Literal>
                            </div>
                            <div class="" runat="server" id="divPasswordChange">

                                <div class="sfFormwrapper twoColForm" id="tblChangePasswordSettings" runat="server">
                                    <h2>Create a new  username and password for your website</h2>
                                    <div class="sfFieldset ">
                                        <span class="formKey">
                                            <asp:Label ID="Label2" runat="server" CssClass="sfFormlabel" Text="Email"></asp:Label>
                                        </span>
                                        <span class="formValue">
                                            <asp:TextBox ID="txtUserName" MaxLength="50" runat="server" CssClass="sfInputbox" meta:resourcekey="EmailResource1" ValidationGroup="vgManagePassword"></asp:TextBox>
                                            <asp:RequiredFieldValidator ID="rfvEmailRequired" runat="server" ControlToValidate="txtUserName"
                                                Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="vgManagePassword" CssClass="sfRequired"
                                                meta:resourcekey="rfvEmailRequiredResource1"></asp:RequiredFieldValidator>
                                            <asp:RegularExpressionValidator ID="revEmail" runat="server" ControlToValidate="txtUserName"
                                                Display="Dynamic" SetFocusOnError="True" ErrorMessage="Email is not valid" ValidationGroup="vgManagePassword"
                                                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="sfRequired"
                                                meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                        </span>
                                    </div>
                                    <div class="sfFieldset">
                                        <span class="formKey">
                                            <asp:Label ID="lblNewPassword" runat="server" CssClass="sfFormlabel" Text="New Password"></asp:Label>
                                        </span>
                                        <span class="formValue">
                                            <asp:TextBox ID="txtNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox password"
                                                TextMode="Password" ValidationGroup="vgManagePassword"></asp:TextBox>
                                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtNewPassword"
                                                ErrorMessage="This field is required." CssClass="sfRequired" ValidationGroup="vgManagePassword"></asp:RequiredFieldValidator>
                                        </span>
                                    </div>
                                    <div class="sfFieldset">
                                        <span class="formKey">
                                            <asp:Label ID="lblRetypeNewPassword" runat="server" CssClass="sfFormlabel" Text="Re-type New Password"></asp:Label>
                                        </span>
                                        <span class="formValue">
                                            <asp:TextBox ID="txtRetypeNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox"
                                                TextMode="Password" ValidationGroup="vgManagePassword"></asp:TextBox>
                                            <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtRetypeNewPassword"
                                                ErrorMessage="Type password again." CssClass="sfRequired" ValidationGroup="vgManagePassword"></asp:RequiredFieldValidator>
                                            <label id="lblValidationmsg" class="sfRequired">
                                                <asp:CompareValidator ID="CompareValidator1" runat="server"
                                                    ControlToValidate="txtRetypeNewPassword"
                                                    CssClass="sfRequired"
                                                    ControlToCompare="txtNewPassword"
                                                    ErrorMessage="Retype password must match"
                                                    ValidationGroup="vgManagePassword"
                                                    ToolTip="Password must be the same" />
                                            </label>
                                        </span>
                                    </div>

                                    <div class="sfButtonwrapper">
                                        <asp:LinkButton ID="btnManagePasswordSave" runat="server" CssClass="ajaxLoaderInit icon-update sfBtn smlbtn-succ" Text="Save"
                                            OnClick="btnManagePasswordSave_Click" ValidationGroup="vgManagePassword" />
                                    </div>
                                    <div class="sfValidationsummary">
                                        <label id="lblChangepwdval" class="sfError">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="advisonSection" runat="server" id="divAdvisionSection">
                                <advision:Advision runat="server" ID="advision" />
                            </div>
                            <div class="templateGallery" runat="server" id="divTemplateSection">
                                <h2>Choose template</h2>
                                <asp:Literal runat="server" ID="ltrTemplateList"></asp:Literal>
                                <asp:HiddenField runat="server" ID="hdnTemplateName" Value="" />
                                <div class="hiddneButton" style="display: none;">
                                    <asp:Button runat="server" ID="btnSaveTemplates" OnClick="btnSaveTemplates_Click" CssClass="btnSaveTemplates" />
                                </div>

                                <div id="divonlineList" class="sfTemplate sfFormwrapper">

                                    <h3 runat="server" id="downloadTemplate">Choose free online template for download.
                                    </h3>
                                    <div class="clearfix ">
                                    </div>
                                    <div class="onlineTemplateList clearfix">
                                        <asp:HiddenField ID="hdnFileName" runat="server" />
                                        <asp:Repeater ID="rptrTemplateList" runat="server" OnItemDataBound="rptrTemplateList_ItemDataBound"
                                            OnItemCommand="rptrTemplateList_ItemCommand">
                                            <ItemTemplate>
                                                <div class="TemplateHolder">
                                                    <div class="TemplateImage">
                                                        <asp:Image ID="imgThubNail" runat="server" ImageUrl='<%#Eval("Thumb") %>' />
                                                    </div>
                                                    <div class="TemplateDetail">

                                                        <asp:Label ID="lblTemplateName" runat="server" Text='<%#Eval("FileName") %>' />
                                                        <asp:HiddenField ID="hdnUrl" runat="server" Value='<%#Eval("URL") %>' />
                                                    </div>
                                                    <div class="templateoverlay">
                                                        <asp:LinkButton CssClass="icon-download sfBtn" runat="server" ID="lnkDownLoad" CommandName="DownLoad"
                                                            CommandArgument='<%# Eval("URL")+","+ Eval("ThemeID")+","+Eval("FileName") %>'></asp:LinkButton>
                                                    </div>
                                                </div>
                                            </ItemTemplate>
                                            <FooterTemplate>
                                                <asp:Label ID="lblEmptyData" CssClass="sfDefaultInfo" Text="No Online Theme To Display"
                                                    runat="server" Visible="false">
                                                </asp:Label>
                                            </FooterTemplate>
                                        </asp:Repeater>
                                    </div>
                                    <div class="clear">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--  </ContentTemplate>
        </asp:UpdatePanel>--%>
    </form>
    <script>
        $(function () {
            var hdnTemplate = '<%=hdnTemplateName.ClientID%>';
            var text = $('#messageHolder').text().trim();
            if (text.length > 0) {
                $('#divPasswordChange').hide();
                $('#divTemplateSection').hide();
                window.location = window.location.href;
            }
            $('.sfTemplateholder').on('click', function () {
                var $this = $(this);
                $('#' + hdnTemplate).val($this.attr('data-templatename'));
                $('.btnSaveTemplates').trigger('click');
            });
            //setTimeout(function () {
            $('.ajaxLoader').removeClass('visibleloader');
            $(".main_wrap").show();
            //}, 200);
            $('.ajaxLoaderInit').on('click', function () {
                if (Page_ClientValidate("vgManagePassword")) {
                    $(".main_wrap").hide();
                    $('.ajaxLoader').addClass('visibleloader');
                }
            });
        });
    </script>
</body>
</html>
