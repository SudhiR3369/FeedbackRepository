<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_ManageUser.ascx.cs"
    Inherits="SageFrame.Modules.Admin.UserManagement.ctl_ManageUser" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajax" %>
<script language="javascript" type="text/javascript">
    //<![CDATA[

    function ValidationRules() {
        $("#form1").validate({
            ignore: ':hidden',
            rules: {
                '<%=txtFName.UniqueID %>': { required: true },
                '<%=txtLName.UniqueID %>': { required: true },
                '<%=txtEmail1.UniqueID %>': { required: true, email: true },
                '<%=txtResPhone.UniqueID %>': { phone: true },
                '<%=txtMobile.UniqueID %>': { phone: true }
            },
            messages: {
                '<%=txtFName.UniqueID %>': "<br/>This field is required.",
                '<%=txtLName.UniqueID %>': "<br/>LThis field is required.",
                '<%=txtEmail1.UniqueID %>': "<br/>Email should not be blank and must be in a correct format.",
                '<%=txtResPhone.UniqueID %>': "<br/>Please give Valid Phone No.",
                '<%=txtMobile.UniqueID %>': "<br/>Please give Valid Mobile No."
            }
        });
    }
    function ValidateCheckBoxSelection(obj) {
        var valid = false;
        var gv = '#' + '<%=gdvUser.ClientID%>' + ' tr';
        $.each($(gv), function () {
            if ($(this).find("td:eq(0) input[type='checkbox']").prop("checked")) {
                valid = true;
            }
        });
        if (!valid)
            SageAlertDialog('Please select at least one user.', 'No user Selected');
        else {
            return ConfirmDialog(obj, 'Confirmation', 'Are you sure you want to delete the users?');
        }
        return valid;
    }
    $(function () {
        //ValidationRules();
        $('#' + '<%=txtFrom.ClientID%>').attr('readOnly', 'true');
        $('#' + '<%=txtTo.ClientID%>').attr('readOnly', 'true');
        $('#' + '<%=txtBirthDate.ClientID%>').attr('readOnly', 'true');
        $('#' + '<%=txtFrom.ClientID%>').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+0'
        });
        $('#' + '<%=txtTo.ClientID%>').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+0'
        });
        $('#' + '<%=txtBirthDate.ClientID %>').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+0'
        });
        var pwdID = '#' + '<%=txtPassword.ClientID%>';
        $(pwdID).val('');
        $(pwdID).on("change", function () {
            var len = $(this).val().length;
            if (len < 4 && len != 0) {
                $('#pwdlblmsg').show().text('Password must be at least 4 chars long.');
            }
            else {
                $('#pwdlblmsg').text('');
            }
        });
        var rolesID = '#' + '<%=lstAvailableRoles.ClientID%>';
        $(rolesID).on("change", function () {
            if ($(this).val() == null || $(this).val() == "") {
                $('#lblValidationmsg1').text("At least a role must be selected");
            }
        });
        $('.password').pstrength({ minchar: 4 });
        var newPwd = '#' + '<%=txtNewPassword.ClientID%>';
        var newPwdRetype = '#' + '<%=txtRetypeNewPassword.ClientID%>';
        $(newPwdRetype).on("change", function () {
            if ($(newPwd).val() != $(this).val()) {
                $('#lblChangepwdval').text("Passwords don't match");
            }
            else {
                $('#lblChangepwdval').text("");
            }
        });
        $(newPwd).on("change", function () {
            if ($(newPwdRetype).val() != $(this).val() && $(newPwdRetype).val() != "") {
                $('#lblChangepwdval').text("Passwords don't match");
            }
            else {
                $('#lblChangepwdval').text("");
            }
        });
        var userGrid = '#' + '<%=gdvUser.ClientID%>';
        $(userGrid).find("tr:first th.sfCheckbox input").bind("click", function () {
            if ($(this).prop("checked")) {
                $(userGrid).find("tr span.sfSelectall input").prop("checked", true);
            }
            else {
                $(userGrid).find("tr span.sfSelectall input").prop("checked", false);
            }
        });
        $(userGrid).find("tr:first th.sfIsactive input").bind("click", function () {
            if ($(this).prop("checked")) {
                $(userGrid).find("tr input.sfIsactive").prop("checked", true);
            }
            else {
                $(userGrid).find("tr input.sfIsactive").prop("checked", false);
            }
        });
    });

    function pageLoad(sender, args) {
        if (args.get_isPartialLoad()) {
            $('.password').pstrength({ minchar: 4 });
        }
    }
    //]]>	
</script>

<asp:Panel ID="pnlManageUser" runat="server" meta:resourcekey="pnlManageUserResource1">
    <asp:HiddenField ID="hdnEditUsername" runat="server" />
    <asp:HiddenField ID="hdnEditUserID" runat="server" />
    <asp:HiddenField ID="hdnCurrentEmail" runat="server" />
    <div class=" pullRight">
        <asp:LinkButton ID="imgBack" runat="server" Text="Back" CssClass="sfBtn smlbtn-danger icon-back"
            OnClick="imgBack_Click" ToolTip="Go Back" CausesValidation="False" meta:resourcekey="imgBackResource1" />
    </div>
    <ajax:TabContainer ID="TabContainerManageUser" runat="server" ActiveTabIndex="0"
        meta:resourcekey="TabContainerManageUserResource1">
        <ajax:TabPanel ID="tabUserInfo" runat="server" meta:resourcekey="tabUserInfoResource1">
            <HeaderTemplate>
                <asp:Label ID="lblUIH" runat="server" Text="User Information" meta:resourcekey="lblUIHResource1"></asp:Label>
            </HeaderTemplate>
            <ContentTemplate>
                <div id="tblUserInformationSettings" runat="server" class="sfFormwrapper twoColForm">
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblManageUsername" runat="server" CssClass="sfFormlabel" Text="Username"></asp:Label>
                        </span>
                        <span class="formValue disableval-span">
                            <asp:Label ID="txtManageUsername" runat="server"></asp:Label>
                        </span>
                    </div>
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblCreatedDate" runat="server" CssClass="sfFormlabel" Text="Created Date"></asp:Label>
                        </span>
                        <span class="formValue disableval-span">
                            <asp:Label ID="txtCreatedDate" runat="server" Text="Created Date"></asp:Label>
                        </span>
                    </div>
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblManageFirstName" runat="server" CssClass="sfFormlabel" Text="First Name"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtManageFirstName" runat="server" CssClass="sfInputbox"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" CssClass="sfRequired" runat="server"
                                ControlToValidate="txtManageFirstName" ErrorMessage="This field is required."
                                ValidationGroup="vgManageUserInfo"></asp:RequiredFieldValidator>
                        </span>
                    </div>
                   
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblLastLoginDate" runat="server" CssClass="sfFormlabel" Text="Last Login Date"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtLastLoginDate" ReadOnly="true" CssClass="inputdisable" runat="server" Text="Last Login Date"></asp:TextBox>
                        </span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="sfFieldset ">
                        <span class="formKey">
                            <asp:Label ID="lblManageLastName" runat="server" CssClass="sfFormlabel" Text="Last Name"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtManageLastName" runat="server" CssClass="sfInputbox"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" CssClass="sfRequired" runat="server"
                                ControlToValidate="txtManageLastName" ErrorMessage="This field is required." ValidationGroup="vgManageUserInfo"></asp:RequiredFieldValidator>
                        </span>
                    </div>
                 
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblLastActivity" runat="server" CssClass="sfFormlabel" Text="Last Activity"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtLastActivity" ReadOnly="true" CssClass="inputdisable" runat="server" Text="Last Activity"></asp:TextBox>
                        </span>
                    </div>
                      <div class="clearfix"></div>
                    <div class="sfFieldset ">
                        <span class="formKey">
                            <asp:Label ID="lblManageEmail" runat="server" CssClass="sfFormlabel" Text="Email"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtManageEmail" runat="server" CssClass="sfInputbox" MaxLength="50"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator4" CssClass="sfRequired" runat="server"
                                Display="Dynamic" ControlToValidate="txtManageEmail" ErrorMessage="This field is required."
                                ValidationGroup="vgManageUserInfo"></asp:RequiredFieldValidator>
                            <asp:RegularExpressionValidator Display="Dynamic" ID="RegularExpressionValidator2"
                                runat="server" ControlToValidate="txtManageEmail" CssClass="sfRequired" ErrorMessage="Enter valid email."
                                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="vgManageUserInfo"></asp:RegularExpressionValidator>
                        </span>
                    </div>
                    
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblLastPasswordChanged" runat="server" CssClass="sfFormlabel" Text="Last Password Changed"></asp:Label>
                        </span>
                        <span class="formValue">
                            <asp:TextBox ID="txtLastPasswordChanged" ReadOnly="true" CssClass="inputdisable" runat="server" Text="Last Password Changed"></asp:TextBox>
                        </span>
                    </div>
                   <div class="clearfix"></div>
                    <div class="sfFieldset">
                      <%--  <span class="formKey">
                            <asp:Label ID="lblIsUserActive" runat="server" CssClass="sfFormlabel" Text="Active"></asp:Label>
                        </span>--%>
                        <span class="formValue">
                            <asp:CheckBox ID="chkIsActive" runat="server" Text="Active"/>
                        </span>
                    </div>
                    <div class="sfButtonwrapper">
                        <asp:LinkButton Text="Update" CssClass="icon-update smlbtn-succ sfBtn" ID="imgUserInfoSave" runat="server"
                            OnClick="imgUserInfoSave_Click" ToolTip="Update" ValidationGroup="vgManageUserInfo"
                            meta:resourcekey="imgUserInfoSaveResource1" />
                    </div>
                </div>
            </ContentTemplate>
        </ajax:TabPanel>
        <ajax:TabPanel ID="tabUserRoles" runat="server" meta:resourcekey="tabUserRolesResource1">
            <HeaderTemplate>
                <asp:Label ID="lblURH" runat="server" Text="User Roles" meta:resourcekey="lblURHResource1"></asp:Label>
            </HeaderTemplate>
            <ContentTemplate>
                <div class="sfFormwrapper" id="tblUserRolesSettings" runat="server">
                    <ul class="select-shift clearfix">
                        <li>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblUnselected" runat="server" CssClass="sfFormlabel" Text="Unselected"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:ListBox ID="lstUnselectedRoles" runat="server" SelectionMode="Multiple" CssClass="sfListmenubig"></asp:ListBox>
                                </span>

                            </div>
                        </li>
                        <li class="shift-arrows">
                            <div class="sfFieldset">
                                <label class="icon-arrow-slimdouble-e sfBtn">
                                    <asp:Button ID="btnAddAllRole" runat="server" CausesValidation="False" OnClick="btnAddAllRole_Click" /></label>
                                <label class="icon-arrow-slim-e sfBtn">
                                    <asp:Button ID="btnAddRole" runat="server" CausesValidation="False" OnClick="btnAddRole_Click" />
                                </label>
                                <label class="icon-arrow-slim-w sfBtn">
                                    <asp:Button ID="btnRemoveRole" runat="server" CausesValidation="False" OnClick="btnRemoveRole_Click" /></label>
                                <label class=" icon-arrow-slimdouble-w sfBtn">
                                    <asp:Button ID="btnRemoveAllRole" runat="server" CausesValidation="False" OnClick="btnRemoveAllRole_Click" /></label>
                            </div>
                        </li>
                        <li>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblSelected" runat="server" CssClass="sfFormlabel" Text="Selected"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:ListBox ID="lstSelectedRoles" runat="server" SelectionMode="Multiple" CssClass="sfListmenubig"></asp:ListBox>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div class="sfButtonwrapper">
                        <asp:LinkButton ID="imgManageRoleSave" runat="server" OnClick="imgManageRoleSave_Click"
                            CssClass="icon-update sfBtn smlbtn-succ" Text="Update" meta:resourcekey="imgManageRoleSaveResource1" />
                    </div>
                </div>
            </ContentTemplate>
        </ajax:TabPanel>
        <ajax:TabPanel ID="tabUserPassword" runat="server" meta:resourcekey="tabUserPasswordResource1">
            <HeaderTemplate>
                <asp:Label ID="lblCPH" runat="server" Text="Change Password" meta:resourcekey="lblCPHResource1"></asp:Label>
            </HeaderTemplate>
            <ContentTemplate>
                <p class="sfNote">
                    <asp:Label ID="lblCPM" runat="server" Text="To change the password for this user, enter the new password and re-type the password to confirm it."
                        meta:resourcekey="lblCPMResource1"></asp:Label>
                </p>
                <div class="sfFormwrapper twoColForm" id="tblChangePasswordSettings" runat="server">
                    <div class="sfFieldset ">
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
                            </label>
                        </span>
                    </div>
                   
                    <div class="sfButtonwrapper">
                        <asp:LinkButton ID="btnManagePasswordSave" runat="server" CssClass="icon-update sfBtn smlbtn-succ" Text="Update"
                            OnClick="btnManagePasswordSave_Click" ValidationGroup="vgManagePassword" />
                    </div>
                    <div class="sfValidationsummary">
                        <label id="lblChangepwdval" class="sfError">
                        </label>
                    </div>
                </div>
            </ContentTemplate>
        </ajax:TabPanel>
        <ajax:TabPanel ID="tabUserProfile" runat="server" meta:resourcekey="tabUserProfileResource1">
            <HeaderTemplate>
                <asp:Label ID="lblUP" runat="server" Text="User Profile" meta:resourcekey="lblUPResource1"></asp:Label>
            </HeaderTemplate>
            <ContentTemplate>
                <div class=" sfUserprofile clearfix">
                    <div class="sfViewprofile">
                        <div>
                            <h2>User Info</h2>
                        </div>
                        <div class="sfFieldset userImageHolder sfCol_100">
                            <div class="sfProfileimage" runat="server" id="imgProfileEdit">
                                <asp:Image ID="imgUser" runat="server" AlternateText="Image" Style="max-height: 100px"
                                    meta:resourcekey="imgUserResource1" />
                                <asp:LinkButton ID="btnDeleteProfilePic" runat="server" OnClick="btnDeleteProfilePic_Click"
                                    CssClass="icon-close" meta:resourcekey="btnDeleteProfilePicResource1" />
                            </div>
                            <div class="profile-info-wrap">
                                <span class="label">
                                    <asp:Label ID="Label8" runat="server" CssClass="sfFormlabel" Text="Username"></asp:Label>
                                </span>
                                <span class="value">
                                    <asp:Label ID="lblDisplayUserName" runat="server" CssClass="sfFormlabel"></asp:Label></span>
                                <asp:Label ID="lblImage" runat="server" CssClass="sfFormlabel buttonClick" Text="Upload Image"></asp:Label>
                                <br>
                                
                                <asp:FileUpload ID="fuImage" ClientIDMode="Static" runat="server" />
                                <label for="fuImage">Choose File</label>
                                
                            </div>
                        </div>
                        <div class="sfFormwrapper twoColForm" id="tblEditProfile" runat="server">

                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="Label9" runat="server" CssClass="sfFormlabel" Text="First Name"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtFName" runat="server" CssClass="sfInputbox" Name="txtFName"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txtFName"
                                        Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired"
                                        ValidationGroup="rfvUser" meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="Label17" runat="server" CssClass="sfFormlabel" Text="Last Name"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtLName" runat="server" CssClass="sfInputbox" Name="txtLName"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="server" ControlToValidate="txtLName"
                                        Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired"
                                        ValidationGroup="rfvUser" meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>
                                </span>
                            </div>
                           
                            <div class="sfFieldset" style="display: none;">
                                <span class="formKey">
                                    <asp:Label ID="lblFullName" runat="server" CssClass="sfFormlabel" Text="FullName"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtFullName" runat="server" CssClass="sfInputbox"></asp:TextBox>
                                </span>
                            </div>
                              <div class="clearfix"></div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblBirthDate" runat="server" CssClass="sfFormlabel" Text="BirthDate"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox runat="server" ID="txtBirthDate" CssClass="sfInputbox sfBirthDate"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblGender" runat="server" CssClass="sfFormlabel" Text="Gender"></asp:Label>
                                </span>
                                <span class="formValue gender">
                                    <asp:RadioButtonList RepeatLayout="Flow" runat="server" ID="rdbGender" RepeatColumns="2">
                                        <asp:ListItem>Male</asp:ListItem>
                                        <asp:ListItem>Female</asp:ListItem>
                                    </asp:RadioButtonList>
                                </span>
                            </div>
                            <div class="clearfix"></div>
                            <div class="sfFieldset ">
                                <span class="formKey">
                                    <asp:Label ID="Label18" runat="server" CssClass="sfFormlabel" Text="Email"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtEmail1" runat="server" CssClass="sfInputbox" Name="txtEmail1" MaxLength="50"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat="server" ControlToValidate="txtEmail1"
                                        Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired" ValidationGroup="rfvUser"
                                        meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmail1"
                                        Display="Dynamic" ErrorMessage="Enter valid email." CssClass="sfRequired" Text="Enter valid email."
                                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="CreateUser"
                                        meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                </span>
                            </div>
                            <%--<div class="sfFieldset">
                                <span class="formKey"></span>
                                <span class="formKey">
                                    <asp:TextBox ID="txtEmail2" runat="server" CssClass="sfInputbox" MaxLength="50"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator3" runat="server" ControlToValidate="txtEmail2"
                                        Display="Dynamic" ErrorMessage="Enter valid email." CssClass="sfRequired" Text="Enter valid email."
                                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="rfvUser"
                                        meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey"></span>
                                <span class="formKey">
                                    <asp:TextBox ID="txtEmail3" runat="server" CssClass="sfInputbox" MaxLength="50"></asp:TextBox>

                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator4" runat="server" ControlToValidate="txtEmail3"
                                        Display="Dynamic" ErrorMessage="Enter valid email." CssClass="sfRequired" Text="Enter valid email."
                                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="rfvUser"
                                        meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                </span>
                            </div>--%>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblResPhone" runat="server" CssClass="sfFormlabel" Text="Res. Phone"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtResPhone" runat="server" CssClass="sfInputbox"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator6" runat="server" ControlToValidate="txtResPhone"
                                        Display="Dynamic" ErrorMessage="Please give Valid Phone No." CssClass="sfRequired" Text="Please give Valid Phone No."
                                        ValidationExpression="^[0-9][0-9 ]*$" ValidationGroup="rfvUser"
                                        meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                </span>
                            </div>
                              <div class="clearfix"></div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblMobilePhone" runat="server" CssClass="sfFormlabel" Text="Mobile"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtMobile" runat="server" CssClass="sfInputbox"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator5" runat="server" ControlToValidate="txtMobile"
                                        Display="Dynamic" ErrorMessage="Please give Valid Mobile No." CssClass="sfRequired" Text="Please give Valid Mobile No."
                                        ValidationExpression="^[0-9][0-9 ]*$" ValidationGroup="rfvUser"
                                        meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblLocation" runat="server" CssClass="sfFormlabel" Text="Location"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtLocation" runat="server" CssClass="sfInputbox"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblAboutYou" runat="server" CssClass="sfFormlabel" Text="About You"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtAboutYou" runat="server" CssClass="sfTextarea" TextMode="MultiLine"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblOthers" runat="server" CssClass="sfFormlabel" Text="Others"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtOthers" runat="server" CssClass="sfInputbox"
                                        TextMode="MultiLine"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey"></span>
                                <span class="formValue">
                                    <div class="sfButtonwrapper">
                                        <label class="icon-update sfBtn smlbtn-succ">
                                            Update
                                        <asp:Button ID="btnSave" runat="server" CssClass="icon-save sfBtn" OnClick="btnSave_Click"
                                            ValidationGroup="rfvUser" /></label>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="clearfix" style="display: none">
                        <div class="sfViewprofile">
                            <div class="sfFormwrapper" id="tblViewProfile" cellpadding="0" cellspacing="0" width="100%" runat="server">
                                <div>

                                    <h2>User Info</h2>

                                </div>
                                <div class="sfFieldset">
                                    <span class="formKey">
                                        <asp:Label ID="Label19" runat="server" CssClass="sfFormlabel" Text="Username"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewUserName" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                    <span class="formValue"></span>
                                </div>
                                <div class="sfFieldset">
                                    <span class="formKey">
                                        <asp:Label ID="Label20" runat="server" CssClass="sfFormlabel" Text="First Name"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewFirstName" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset">
                                    <span class="formKey">
                                        <asp:Label ID="Label22" runat="server" CssClass="sfFormlabel" Text="Last Name"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewLastName" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                               
                                <div class="sfFieldset" id="trviewFullName" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label26" runat="server" CssClass="sfFormlabel" Text="Full Name"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblviewFullName" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trviewBirthDate" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="lblBirthDateTest" runat="server" Text="Date of Birth" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label runat="server" ID="lblviewBirthDate" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trviewGender" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="lblGenderText" runat="server" Text="Gender" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label runat="server" ID="lblviewGender" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewLocation" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label27" runat="server" CssClass="sfFormlabel" Text="Location"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewLocation" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewAboutYou" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label28" runat="server" CssClass="sfFormlabel" Text="About You"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewAboutYou" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset">
                                    <span class="formKey">
                                        <h2>Contacts</h2>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewEmail" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label29" runat="server" CssClass="sfFormlabel" Text="Email"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewEmail1" runat="server" CssClass="sfFormlabel"></asp:Label>
                                        <asp:Label ID="lblViewEmail2" runat="server" CssClass="sfFormlabel"></asp:Label>
                                        <asp:Label ID="lblViewEmail3" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewResPhone" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label30" runat="server" CssClass="sfFormlabel" Text="Res. Phone"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewResPhone" runat="server" CssClass="sfInputbox"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewMobile" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label31" runat="server" CssClass="sfFormlabel" Text="Mobile"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewMobile" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset" id="trViewOthers" runat="server">
                                    <span class="formKey">
                                        <asp:Label ID="Label32" runat="server" CssClass="sfFormlabel" Text="Others"></asp:Label>
                                    </span>
                                    <span class="formValue">
                                        <asp:Label ID="lblViewOthers" runat="server" CssClass="sfFormlabel"></asp:Label>
                                    </span>
                                </div>
                                <div class="sfFieldset">
                                    <span class="formKey"></span>
                                    <span class="formValue">
                                        <div class="sfButtonwrapper">
                                            <asp:LinkButton ID="btnEdit" runat="server" CssClass="icon-edit sfBtn" OnClick="btnEdit_Click"
                                                Text="Edit" />
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="sfProfileimage" runat="server" id="imgProfileView">
                            <asp:Image ID="imgViewImage" runat="server" AlternateText="Image" Style="max-height: 100px"
                                meta:resourcekey="imgViewImageResource1" />
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </ajax:TabPanel>
    </ajax:TabContainer>

</asp:Panel>
<asp:Panel ID="pnlUser" runat="server" meta:resourcekey="pnlUserResource1">
    <div class="sfFormwrapper clearfix">
        <h1>
            <%--<asp:Label ID="lblAddUserHeading" runat="server" Text="Add User" meta:resourcekey="lblAddUserHeadingResource1"></asp:Label>--%>
            Add User
        </h1>
        <%--        <p class="sfInformation">
            <i class="icon-info sfNote"></i>&nbsp; All <span class="sfRequired">* </span>are
            required fields
        </p>--%>
        <div>
            <div class="sfFormwrapper twoColForm">
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblUsername" runat="server" CssClass="sfFormlabel" Text="Username"
                            meta:resourcekey="lblUsernameResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtUserName" EnableViewState="False" runat="server" CssClass="sfInputbox"
                            meta:resourcekey="txtUserNameResource1"></asp:TextBox><br />
                        <asp:RequiredFieldValidator ID="rfvUsername" runat="server" ControlToValidate="txtUserName"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired" ValidationGroup="CreateUser"
                            meta:resourcekey="rfvUsernameResource1"></asp:RequiredFieldValidator>
                    </span>
                </div>
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblEmail" runat="server" CssClass="sfFormlabel" Text="Email" meta:resourcekey="lblEmailResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtEmail" runat="server" MaxLength="50" CssClass="sfInputbox" meta:resourcekey="txtEmailResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvEmail" runat="server" ControlToValidate="txtEmail"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired" ValidationGroup="CreateUser"
                            meta:resourcekey="rfvEmailResource1"></asp:RequiredFieldValidator>
                        <asp:RegularExpressionValidator ID="revEmail" runat="server" ControlToValidate="txtEmail"
                            Display="Dynamic" ErrorMessage="Enter valid email." CssClass="sfRequired" Text="Enter valid email."
                            ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ValidationGroup="CreateUser"
                            meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                    </span>
                </div>
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblFirstName" runat="server" CssClass="sfFormlabel" Text="First Name"
                            meta:resourcekey="lblFirstNameResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtFirstName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFirstNameResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvFirstName" runat="server" ControlToValidate="txtFirstName"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired"
                            ValidationGroup="CreateUser" meta:resourcekey="rfvFirstNameResource1"></asp:RequiredFieldValidator>
                    </span>
                </div>
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblLastName" runat="server" CssClass="sfFormlabel" Text="Last Name"
                            meta:resourcekey="lblLastNameResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtLastName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtLastNameResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txtLastName"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired"
                            ValidationGroup="CreateUser" meta:resourcekey="RequiredFieldValidator6Resource1"></asp:RequiredFieldValidator>
                    </span>
                </div>
                <div class="sfFieldset ">
                    <span class="formKey">
                        <asp:HiddenField ID="hdnPassword" runat="server" />
                        <asp:Label ID="lblPassword" runat="server" CssClass="sfFormlabel" Text="Password (min 4 chars)"
                            meta:resourcekey="lblPasswordResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtPassword" runat="server" MaxLength="20" CssClass="sfInputbox password"
                            TextMode="Password" meta:resourcekey="txtPasswordResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvPassword" runat="server" ControlToValidate="txtPassword"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired" ValidationGroup="CreateUser"
                            meta:resourcekey="rfvPasswordResource1"></asp:RequiredFieldValidator>
                        <span id="pwdlblmsg" class="sfRequired"></span>
                    </span>
                </div>
                 
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblRetypePassword" runat="server" CssClass="sfFormlabel" Text="Re-type Password"
                            meta:resourcekey="lblRetypePasswordResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtRetypePassword" MaxLength="20" runat="server" CssClass="sfInputbox"
                            TextMode="Password" meta:resourcekey="txtRetypePasswordResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvRetypePassword" CssClass="sfRequired" runat="server"
                            Display="Dynamic" ControlToValidate="txtRetypePassword" ErrorMessage="This field is required."
                            ValidationGroup="CreateUser" meta:resourcekey="rfvRetypePasswordResource1"></asp:RequiredFieldValidator>
                        <asp:CompareValidator ID="cvRetypePassword" runat="server" ControlToCompare="txtPassword"
                            Display="Dynamic" ControlToValidate="txtRetypePassword" ErrorMessage="Retyped password doesnot match."
                            ValidationGroup="CreateUser" meta:resourcekey="cvRetypePasswordResource1"></asp:CompareValidator>
                    </span>
                </div>

                <%--<div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblSecurityQuestion" runat="server" CssClass="sfFormlabel" Text="Security Question"
                            meta:resourcekey="lblSecurityQuestionResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtSecurityQuestion" runat="server" CssClass="sfInputbox" meta:resourcekey="txtSecurityQuestionResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvSecurityQuestion" runat="server" ControlToValidate="txtSecurityQuestion"
                            Display="Dynamic" ErrorMessage="This field is required."
                            CssClass="sfRequired"
                            ValidationGroup="CreateUser" meta:resourcekey="rfvSecurityQuestionResource1"></asp:RequiredFieldValidator>
                    </span>
                </div>
                <div class="sfFieldset">
                    <span class="formKey">
                        <asp:Label ID="lblSecurityAnswer" runat="server" CssClass="sfFormlabel" Text="Security Answer"
                            meta:resourcekey="lblSecurityAnswerResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:TextBox ID="txtSecurityAnswer" runat="server" CssClass="sfInputbox" meta:resourcekey="txtSecurityAnswerResource1"></asp:TextBox>
                        <br />
                        <asp:RequiredFieldValidator ID="rfvSecurityAnswer" runat="server" ControlToValidate="txtSecurityAnswer"
                            Display="Dynamic" ErrorMessage="This field is required." CssClass="sfRequired"
                            ValidationGroup="CreateUser" meta:resourcekey="rfvSecurityAnswerResource1"></asp:RequiredFieldValidator>
                    </span>
                </div>--%>
                <div class="sfFieldset ">
                    <span class="formKey">
                        <asp:Label ID="lblSLM" runat="server" Text="Select Roles" CssClass="sfFormlabel"
                            meta:resourcekey="lblSLMResource1"></asp:Label>
                        <span class="sfRequired">*</span>
                    </span>
                    <span class="formValue">
                        <asp:ListBox ID="lstAvailableRoles" CssClass="sfListmenu multipleselect" runat="server" SelectionMode="Multiple"
                            Rows="10" meta:resourcekey="lstAvailableRolesResource1"></asp:ListBox>
                        <label id="lblValidationmsg1" class="sfRequired">
                        </label>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="sfButtonwrapper">
        <asp:LinkButton ID="imbCreateUser" Text="Save" CssClass="icon-save sfBtn smlbtn-succ"
            ValidationGroup="CreateUser" runat="server" ToolTip="Add Users" OnClick="imbCreateUser_Click"
            meta:resourcekey="imbCreateUserResource1" />
        <asp:LinkButton ID="imbBackinfo" runat="server" OnClick="imgBack_Click" ToolTip="Back"
            Text="Cancel" CssClass="icon-close smlbtn-danger sfBtn" meta:resourcekey="imbBackinfoResource1" />
    </div>
</asp:Panel>
<asp:Panel ID="pnlUserList" runat="server" meta:resourcekey="pnlUserListResource1">
    <div class="sfButtonwrapper sfPadding">
        <asp:LinkButton ID="imgAddUser" runat="server" OnClick="imgAddUser_Click" Text="Add User"
            CssClass="icon-addnew smlbtn-primary sfBtn" ToolTip="Add User" meta:resourcekey="imgAddUserResource1" />
        <%-- This is currently remove from --%>
        <asp:LinkButton Visible="false" ID="imgBtnSettings" CssClass="icon-settings smlbtn-def sfBtn" Text="User Settings"
            runat="server" ToolTip="UserSettings" OnClick="imgBtnSettings_Click" meta:resourcekey="imgBtnSettingsResource1" />

        <asp:LinkButton ID="imgBtnExportUser" CssClass="icon-user-export smlbtn-def sfBtn" Text="User Export"
            runat="server" ToolTip="UserExport" OnClick="imgBtnExportUser_Click" />
        <asp:LinkButton ID="imgBtnImportUser" CssClass="icon-user-import smlbtn-def sfBtn" Text="User Import"
            runat="server" ToolTip="UserImport" OnClick="imgBtnImportUser_Click" />
        <asp:LinkButton ID="imgBtnSuspendedIP" CssClass="icon-user-suspended smlbtn-def sfBtn" Text="Suspended User"
            runat="server" ToolTip="SuspendedUser" OnClick="imgBtnSuspendedIP_Click" />
    </div>
    <div class="sfFormwrapper sfUsersearch sfTableOption">
        <div class="sfRowfilter">
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblSearchUserRole" runat="server" CssClass="sfFormlabel" Text="Select Role"
                        meta:resourcekey="lblSearchUserRoleResource1"></asp:Label>
                </span>
                <span class="formValue">
                    <asp:DropDownList ID="ddlSearchRole" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlSearchRole_SelectedIndexChanged"
                        CssClass="sfListmenu" meta:resourcekey="ddlSearchRoleResource1">
                    </asp:DropDownList>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblSearchUser" runat="server" CssClass="sfFormlabel" Text="Search User"
                        meta:resourcekey="lblSearchUserResource1"></asp:Label>
                </span>
                <span class="formValue">
                    <asp:TextBox ID="txtSearchText" runat="server" OnTextChanged="txtSearchText_TextChanged"
                        CssClass="sfInputbox" MaxLength="50" meta:resourcekey="txtSearchTextResource1"></asp:TextBox>
                    <ajax:AutoCompleteExtender runat="server" ID="aceSearchText" TargetControlID="txtSearchText"
                        ServicePath="~/SageFrameWebService.asmx" ServiceMethod="GetUsernameList" MinimumPrefixLength="1"
                        DelimiterCharacters="" Enabled="True" />
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <label class="sfFormlabel">
                        From</label>
                </span>
                <span class="formValue">
                    <asp:TextBox ID="txtFrom" runat="server" CssClass="sfInputbox sfInputdate" meta:resourcekey="txtFromResource1"></asp:TextBox>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <label class="sfFormlabel">
                        To</label>
                </span>
                <span class="formValue">
                    <asp:TextBox ID="txtTo" runat="server" CssClass="sfInputbox sfInputdate" meta:resourcekey="txtToResource1"></asp:TextBox>
                </span>
            </div>
            <div class="sfFieldset">
                <asp:LinkButton ID="imgSearch" Text="Search" CssClass="icon-search smlbtn-primary sfBtn" runat="server"
                    OnClick="imgSearch_Click" ToolTip="Search" meta:resourcekey="imgSearchResource1" />
            </div>
        </div>
        <%-- <table cellpadding="0" cellspacing="0" border="0" width="100%" class="sfTableOption1">
            <tr>
                <td></td>
                <td></td>
                <td width="80"></td>
                <td></td>
                <td>
                    <label class="sfFormlabel">
                        From</label>
                </td>
                <td></td>
                <td>
                    <label class="sfFormlabel">
                        To</label>
                </td>
                <td></td>
                <td></td>
            </tr>
        </table>--%>

        <div class="sfRowfilter sfSorting">
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="Label1" runat="server" Text="Filter Mode" CssClass="sfFormlabel"
                        meta:resourcekey="lblShowModeResource1"></asp:Label>
                </span>
                <span class="formValue">
                    <asp:RadioButtonList ID="rbFilterMode" RepeatLayout="Flow" CssClass="sfRadiobutton sfRadioHidden" RepeatDirection="Horizontal"
                        runat="server" AutoPostBack="True" OnSelectedIndexChanged="rbFilterMode_SelectedIndexChanged"
                        meta:resourcekey="rbFilterModeResource1">
                        <asp:ListItem Text="All" Selected="True" Value="0" meta:resourcekey="ListItemResource1"></asp:ListItem>
                        <asp:ListItem Text="Approved" Value="1" meta:resourcekey="ListItemResource2"></asp:ListItem>
                        <asp:ListItem Text="Unapproved" Value="2" meta:resourcekey="ListItemResource3"></asp:ListItem>
                    </asp:RadioButtonList>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblSRow" runat="server" Text="Show rows" CssClass="sfFormlabel" meta:resourcekey="lblSRowResource1"></asp:Label>
                </span>
                <span class="formValue">
                    <asp:DropDownList ID="ddlRecordsPerPage" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlRecordsPerPage_SelectedIndexChanged"
                        CssClass="sfListmenu sfAuto sfListmenusmall" meta:resourcekey="ddlRecordsPerPageResource1">
                        <asp:ListItem Value="10" meta:resourcekey="ListItemResource4">10</asp:ListItem>
                        <asp:ListItem Value="25" meta:resourcekey="ListItemResource5">25</asp:ListItem>
                        <asp:ListItem Value="50" meta:resourcekey="ListItemResource6">50</asp:ListItem>
                        <asp:ListItem Value="100" meta:resourcekey="ListItemResource7">100</asp:ListItem>
                        <asp:ListItem Value="150" meta:resourcekey="ListItemResource8">150</asp:ListItem>
                        <asp:ListItem Value="200" meta:resourcekey="ListItemResource9">200</asp:ListItem>
                        <asp:ListItem Value="250" meta:resourcekey="ListItemResource10">250</asp:ListItem>
                    </asp:DropDownList>
                </span>
            </div>
        </div>

        <%-- <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sfTableOption2">
            <tr>
                <td width="100">
                    <asp:Label ID="lblShowMode" runat="server" Text="Filter Mode" CssClass="sfFormlabel"
                        meta:resourcekey="lblShowModeResource1"></asp:Label>
                </td>
                <td></td>
                <td width="175"></td>
            </tr>
        </table>--%>
    </div>
    <div class="sfGridwrapper">
        <asp:GridView ID="gdvUser" runat="server" AutoGenerateColumns="False" OnRowCommand="gdvUser_RowCommand"
            AllowPaging="True" CssClass="mainGrid" AllowSorting="True" GridLines="None" OnRowDataBound="gdvUser_RowDataBound"
            Width="100%" EmptyDataText="User not found" DataKeyNames="UserId,Username" OnPageIndexChanging="gdvUser_PageIndexChanging"
            meta:resourcekey="gdvUserResource1">
            <Columns>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource1">
                    <ItemTemplate>
                        <asp:CheckBox ID="chkBoxItem" runat="server" CssClass="sfSelectall" />
                        <asp:Label runat="server" ID="lblChecckBox" AssociatedControlID="chkBoxItem"></asp:Label>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <input id="chkBoxHeader" runat="server" type="checkbox" />
                        <label for="chkBoxHeader"></label>
                    </HeaderTemplate>
                    <HeaderStyle CssClass="sfCheckbox"></HeaderStyle>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="S.N" meta:resourcekey="TemplateFieldResource2">
                    <ItemTemplate>
                        <%#Container.DataItemIndex+1 %>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource3">
                    <ItemTemplate>
                        <asp:LinkButton ID="lnkUsername" runat="server" CommandArgument='<%# Container.DataItemIndex %>'
                            CommandName="EditUser" Text='<%# Eval("Username") %>' z meta:resourcekey="lnkUsernameResource1"></asp:LinkButton>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblUsername" runat="server" meta:resourcekey="lblUsernameResource2"
                            Text="Username"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource4">
                    <ItemTemplate>
                        <%# Eval("FirstName")%>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblFirstName" runat="server" meta:resourcekey="lblFirstNameResource2"
                            Text="First Name"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource5">
                    <ItemTemplate>
                        <%# Eval("LastName")%>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblLastName" runat="server" meta:resourcekey="lblLastNameResource2"
                            Text="Last Name"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource6">
                    <ItemTemplate>
                        <%# Eval("Email")%>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblEmail" runat="server" meta:resourcekey="lblEmailResource2" Text="Email"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource7">
                    <ItemTemplate>
                        <asp:HiddenField ID="hdnIsActive" runat="server" Value='<%# Eval("IsActive") %>' />
                        <input id="chkBoxIsActiveItem" class="sfIsactive" runat="server" type="checkbox" />
                    </ItemTemplate>
                    <HeaderTemplate>
                        <input id="chkBoxIsActiveHeader" runat="server" type="checkbox"></input>
                        <asp:Label ID="lblIsActive" runat="server" meta:resourcekey="lblIsActiveResource1"
                            Text="Active"></asp:Label>
                    </HeaderTemplate>
                    <HeaderStyle CssClass="sfIsactive" />
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource8">
                    <ItemTemplate>
                        <asp:LinkButton ID="imgEdit" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                            CommandName="EditUser" CssClass="icon-edit" ToolTip="Edit User" meta:resourcekey="imgEditResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfEdit" />
                </asp:TemplateField>
                <asp:TemplateField meta:resourcekey="TemplateFieldResource9">
                    <ItemTemplate>
                        <asp:LinkButton ID="imgDelete" runat="server" CausesValidation="False" CommandArgument='<%# Container.DataItemIndex %>'
                            CommandName="DeleteUser" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to delete the user?');"
                            CssClass="icon-delete" ToolTip="Delete User" meta:resourcekey="imgDeleteResource1" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfDelete" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfEven" />
            <EmptyDataRowStyle CssClass="sfEmptyrow" />
            <PagerStyle CssClass="sfPagination" />
            <RowStyle CssClass="sfOdd" />
        </asp:GridView>

        <div class="sfButtonwrapper sfPadding">
            <asp:LinkButton Text="Update" CssClass="icon-update sfBtn smlbtn-succ" ID="imgBtnSaveChanges"
                runat="server" OnClick="imgBtnSaveChanges_Click" ToolTip="Update changes" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to save the changes?');"
                meta:resourcekey="imgBtnSaveChangesResource1" />

            <asp:LinkButton ID="imgBtnDeleteSelected" Text="Delete Selected Users" CssClass="icon-delete sfBtn sfBtn smlbtn-danger"
                runat="server" OnClientClick="return ValidateCheckBoxSelection(this)" OnClick="imgBtnDeleteSelected_Click"
                ToolTip="Delete all seleted" meta:resourcekey="imgBtnDeleteSelectedResource1" />

        </div>

    </div>
</asp:Panel>
<asp:Panel ID="pnlSettings" runat="server" meta:resourcekey="pnlSettingsResource1" Visible="false">
    <div class="sfFormwrapper">
        <h2>
            <asp:Label ID="Label7" runat="server" Text="User Settings" meta:resourcekey="Label7Resource1"></asp:Label>
        </h2>
        <div class="sfFormwrapper ">

            <div class="sfFieldset">
                <span class="formKey">
                    <div class="sfFormwrapper sfRowfilter">
                        <div class="sfFieldset" style="display: none">
                            <span class="formKey">
                                <asp:Label runat="server" ID="lblDupNames" CssClass="sfFormlabel" meta:resourcekey="lblDupNamesResource1">Allow Duplicate UserNames Across Portals</asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:CheckBox ID="chkEnableDupNames" runat="server" meta:resourcekey="chkEnableDupNamesResource1" />
                            </span>
                        </div>
                        <div class="sfFieldset">
                            <span class="formKey">
                                <asp:Label runat="server" ID="lblDupEmail" CssClass="sfFormlabel" meta:resourcekey="lblDupEmailResource1">Allow Duplicate Email</asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:CheckBox ID="chkEnableDupEmail" runat="server" meta:resourcekey="chkEnableDupEmailResource1" />
                            </span>
                        </div>
                        <div class="sfFieldset" style="display: none">
                            <span class="formKey">
                                <asp:Label runat="server" ID="lblDupRoles" CssClass="sfFormlabel" meta:resourcekey="lblDupRolesResource1">Enable Duplicate Roles Across Portals</asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:CheckBox ID="chkEnableDupRole" runat="server" meta:resourcekey="chkEnableDupRoleResource1" />
                            </span>
                        </div>
                        <div class="sfFieldset">
                            <span class="formKey">
                                <asp:Label runat="server" ID="lblEnableCaptcha" CssClass="sfFormlabel" meta:resourcekey="lblEnableCaptchaResource1">Enable Captcha For User Registration</asp:Label>
                            </span>
                            <span class="formValue">
                                <asp:CheckBox ID="chkEnableCaptcha" runat="server" meta:resourcekey="chkEnableCaptchaResource1" />
                            </span>
                        </div>
                    </div>
                </span>
                <span class="formKey">
                    <asp:Panel ID="pnlPasswordEncTypes" runat="server" GroupingText="Password Storage Mode"
                        CssClass="sfPasswordstorage" meta:resourcekey="pnlPasswordEncTypesResource1"
                        Visible="false">
                        <asp:RadioButtonList ID="rdbLst" RepeatLayout="Flow" runat="server" meta:resourcekey="rdbLstResource1">
                            <asp:ListItem Value="2" meta:resourcekey="ListItemResource11">One Way Hashed</asp:ListItem>
                            <asp:ListItem Value="3" meta:resourcekey="ListItemResource12">Encrypted</asp:ListItem>
                        </asp:RadioButtonList>
                    </asp:Panel>
                </span>
            </div>
        </div>

        <div class="sfButtonwrapper">
            <label class="sfLocale icon-update smlbtn-succ sfBtn">
                Update
            <asp:Button ID="btnSaveSetting" runat="server" OnClick="btnSaveSetting_Click"
                ToolTip="Save" meta:resourcekey="btnSaveSettingResource1" /></label>
            <asp:LinkButton ID="btnCancel" runat="server" Text="Cancel" OnClick="btnCancel_Click"
                ToolTip="Cancel" meta:resourcekey="btnCancelResource1" CssClass="icon-close smlbtn-danger sfBtn" />
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlUserImport" runat="server">
    <div class="sfFormwrapper">
        <h2>User Import</h2>
        <span class="sfNote">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            Note: The values in the textbox are the respective column name for the label given. 
        </span>
        <div class="sfFormwrapper twoColForm">
            <div class="sfFieldset">
                <span class="formKey">
                    <label class="sfFormlabel">
                        User Import File</label>
                </span>
                <span class="formValue">
                    <asp:FileUpload ID="fuUserImport" runat="server" CssClass="sfUploadfile" />
                    <label ID="lblUserImport" for='<%=fuUserImport.ClientID%>'>Choose File</label>
                </span>
            </div>
            <div class="clearfix"></div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportUserName" runat="server" CssClass="sfFormlabel">UserName</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportUserName" runat="server" CssClass="sfInputbox" Text="UserName"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportUserNameRequired" runat="server" ControlToValidate="txtImportUserName"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportFirstName" runat="server" CssClass="sfFormlabel">First Name</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportFirstName" runat="server" CssClass="sfInputbox" Text="FirstName"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportFirstNameRequired" runat="server" ControlToValidate="txtImportFirstName"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportLastName" runat="server" CssClass="sfFormlabel">Last Name</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportLastName" runat="server" CssClass="sfInputbox" Text="LastName"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportLastNameRequired" runat="server" ControlToValidate="txtImportLastName"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportEmail" runat="server" CssClass="sfFormlabel">Email</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportEmail" runat="server" CssClass="sfInputbox" Text="Email"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportEmailRequired" runat="server" ControlToValidate="txtImportEmail"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportPassword" runat="server" CssClass="sfFormlabel">Password</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportPassword" runat="server" CssClass="sfInputbox" Text="Password"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportPasswordRequired" runat="server" ControlToValidate="txtImportPassword"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportPasswordSalt" runat="server" CssClass="sfFormlabel">Password Salt</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportPasswordSalt" runat="server" CssClass="sfInputbox" Text="PasswordSalt"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportPasswordSaltRequired" runat="server" ControlToValidate="txtImportPasswordSalt"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportPasswordFormat" runat="server" CssClass="sfFormlabel">Password Format</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportPasswordFormat" runat="server" CssClass="sfInputbox" Text="PasswordFormat"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportPasswordFormatRequired" runat="server" ControlToValidate="txtImportPasswordFormat"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportRoleName" runat="server" CssClass="sfFormlabel">Role Name</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportRoleName" runat="server" CssClass="sfInputbox" Text="RoleName"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportRoleNameRequired" runat="server" ControlToValidate="txtImportRoleName"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportPortalID" runat="server" CssClass="sfFormlabel">PortalID</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportPortalID" runat="server" CssClass="sfInputbox" Text="PortalID"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportPortalIDRequired" runat="server" ControlToValidate="txtImportPortalID"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>
            <div class="sfFieldset">
                <span class="formKey">
                    <asp:Label ID="lblImportIsApproved" runat="server" CssClass="sfFormlabel">IsActive</asp:Label>
                </span>

                <span class="formValue">
                    <asp:TextBox ID="txtImportIsApproved" runat="server" CssClass="sfInputbox" Text="IsActive"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="rfvImportIsApprovedRequired" runat="server" ControlToValidate="txtImportIsApproved"
                        Display="Dynamic" ErrorMessage="This field is required." ValidationGroup="ImportUserValidation" CssClass="sfError"></asp:RequiredFieldValidator>
                </span>
            </div>

        </div>
        <div class="sfButtonwrapper">
            <span class="formKey">
                <label id="lblImport" class="sfLocale icon-user-import smlbtn-succ sfBtn">
                    Import
            <asp:Button runat="server" ID="btnUserImport" OnClick="btnUserImport_Click" ValidationGroup="ImportUserValidation" />
                </label>
                <label id="lblCancel" class="sfLocale icon-close smlbtn-danger sfBtn">
                    Cancel
            <asp:Button runat="server" ID="btnImportCancel" OnClick="btnImportCancel_Click" />
                </label>
                <label id="lblDuplicateUser" class="sfLocale icon-excel sfBtn" runat="server">
                    Export Duplicate User
            <asp:Button runat="server" ID="btnDuplicateUser" OnClick="btnDuplicateUser_Click" />
                </label>
            </span>
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlSuspendedIP" runat="server" class="sfFormwrapper">
    <h2>Suspended IP Settings</h2>
    <div class="sfTableWrapper">
        <asp:GridView ID="gdvSuspendedIP" runat="server" AutoGenerateColumns="False"
            AllowPaging="True" AllowSorting="True" GridLines="None" Width="100%" EmptyDataText="Suspended IP not found" OnPageIndexChanging="gdvSuspendedIP_PageIndexChanging" PageSize="6"
            OnRowDataBound="gdvSuspendedIP_RowDataBound">
            <Columns>
                <asp:TemplateField HeaderText="S.N">
                    <ItemTemplate>
                        <asp:HiddenField ID="hdnIPAddressID" runat="server" Value='<%# Eval("IPAddressID") %>' />
                        <%#Container.DataItemIndex+1 %>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <%# Eval("IpAddress")%>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblIpAddress" runat="server"
                            Text="Ip Address"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <%# Eval("SuspendedTime")%>
                    </ItemTemplate>
                    <HeaderTemplate>
                        <asp:Label ID="lblSuspendedTime" runat="server"
                            Text="Suspended Time"></asp:Label>
                    </HeaderTemplate>
                </asp:TemplateField>
                <asp:TemplateField>
                    <HeaderTemplate>
                        <asp:Label ID="lblIsSuspended" runat="server" Text="IP Suspended"></asp:Label>
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:HiddenField ID="hdnIsSuspended" runat="server" Value='<%# Eval("IsSuspended") %>' />
                        <input id="chkBoxIsSuspendedItem" runat="server" type="checkbox" />
                    </ItemTemplate>
                    <HeaderStyle CssClass="sfIsactive" />
                </asp:TemplateField>
            </Columns>
            <AlternatingRowStyle CssClass="sfOdd" />
            <EmptyDataRowStyle CssClass="sfEmptyrow" />
            <PagerStyle CssClass="sfPagination" />
            <RowStyle CssClass="sfOdd" />
        </asp:GridView>
    </div>
    <div class="sfButtonwrapper">
        <div id="divSave" runat="server" style="float: left;">
            <label id="lblSaveChanges" class="sfLocale icon-save sfBtn smlbtn-succ">
                Save changes
            <asp:Button runat="server" ID="btnSaveChanges" OnClick="btnSaveChanges_Click" OnClientClick="return ConfirmDialog(this, 'Confirmation', 'Are you sure you want to save the changes?');" />
            </label>
        </div>
        <label id="lblCancelSuspendedUser" class="sfLocale icon-close smlbtn-danger sfBtn">
            Cancel
            <asp:Button runat="server" ID="btnCancelSuspendedUser" OnClick="btnCancelSuspendedUser_Click" />
        </label>
    </div>
</asp:Panel>
