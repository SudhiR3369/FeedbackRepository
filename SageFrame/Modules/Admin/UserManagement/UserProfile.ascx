<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UserProfile.ascx.cs" Inherits="Modules_UserProfile" %>

<script type="text/javascript">
    //<![CDATA[
    $(document).ready(function () {

        $("#TabProfile").tabs();
        var btnSave = '<%=btnSave.ClientID%>';
        $('#' + btnSave).on("click", function () {
            ValidationRules();
            ClearField();
        });
        $('#' + '<%=txtBirthDate.ClientID%>').attr('readOnly', 'true');
        $('#' + '<%=txtBirthDate.ClientID %>').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+0'
        });
    });

    function ClearField() {

        $('#' + '<%=txtEmail1.UniqueID %>').text('');
        $('#' + '<%=txtResPhone.UniqueID %>').text('');
        $('#' + '<%=txtMobile.UniqueID %>').text('');
    }

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
                '<%=txtFName.UniqueID %>': "<br/>First Name should not be blank.",
                '<%=txtLName.UniqueID %>': "<br/>Last Name should not be blank.",
                '<%=txtEmail1.UniqueID %>': "<br/>Email should not be blank and must be in a correct format.",
                '<%=txtResPhone.UniqueID %>': "<br/>Please give Valid Phone No.",
                '<%=txtMobile.UniqueID %>': "<br/>Please give Valid Mobile No."
            }
        });
    }
    //]]>   

</script>

<div class="sfEditprofile">

    <div id="sfUserProfile" runat="server" class="sfFormwrapper sfUserprofile clearfix">
        <div id="TabProfile">
            <ul>
                <li><a href="#ProfileSetting">Profile</a></li>
                <li><a href="#Changepswd">Change Password</a></li>
            </ul>
            <div id="ProfileSetting" class="sfFormwrapper clearfix display-flex">
                <div class="sfImagewrapper">
                    <div class="edit-profile-image" runat="server" id="imgProfileEdit">
                        <label class="sfLocale icon-close">
                            <asp:Button ID="btnDeleteProfilePic" runat="server" OnClick="btnDeleteProfilePic_Click"
                                meta:resourcekey="btnDeleteProfilePicResource1" /></label><br />
                    </div>
                    <div class="user-profile-image-wrapper">
                        <asp:Image ID="imgUser" runat="server" meta:resourcekey="imgUserResource1" />

                    </div>

                    <div class="user-profile-image-info">
                        <p class="sfDisplayName">
                            <asp:Label ID="Label1" runat="server" CssClass="sfFormlabel" Text="User Name" meta:resourcekey="Label1Resource1"></asp:Label>
                            <asp:Label ID="lblDisplayUserName" runat="server" CssClass="sfFormlabel sfDefaultName"></asp:Label>
                        </p>
                        <asp:FileUpload ID="fuImage" runat="server" meta:resourcekey="fuImageResource1" />
                        <asp:Label runat="server" ID="lblUploadIamge" AssociatedControlID="fuImage">Choose File</asp:Label>
                    </div>
                </div>
                <div class="sfProfilewrapper">
                    <div id="tblEditProfile" runat="server" class="sfFormwrapper twoColForm">

                        <div class="left-content">
                        <h4>Personal Details</h4>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="Label3" runat="server" CssClass="sfFormlabel" Text="First Name" meta:resourcekey="Label3Resource1"></asp:Label>
                                </span>
                                <span class="formValue medium-box">
                                    <asp:TextBox ID="txtFName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFNameResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="Label17" runat="server" CssClass="sfFormlabel" Text="Last Name" meta:resourcekey="Label17Resource1"></asp:Label>
                                </span>
                                <span class="formValue ">
                                    <asp:TextBox ID="txtLName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtLNameResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset last" style="display: none;">
                                <span class="formKey">
                                    <asp:Label ID="lblFullName" runat="server" CssClass="sfFormlabel" Text="Full Name"
                                        meta:resourcekey="lblFullNameResource1"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtFullName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFullNameResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblBirthDate" runat="server" CssClass="sfFormlabel" Text="Birth Date"
                                        meta:resourcekey="lblBirthDateResource1"></asp:Label>
                                </span>
                                <span class="formValue custom-inputbox large-box datepicker-input-box" runat="server">
                                    <asp:TextBox runat="server" ID="txtBirthDate" CssClass="sfInputbox" meta:resourcekey="txtBirthDateResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset checkbox  last" style="display: none;" runat="server">
                                <span class="formKey buttonClick">
                                    <asp:Label ID="lblGender" runat="server" CssClass="sfFormlabel" Text="Gender" meta:resourcekey="lblGenderResource1"></asp:Label>
                                </span>
                                <div class="form_control" runat="server">
                                    <div class="checkbox_wrap">
                                        <asp:RadioButtonList runat="server" ID="rdbGender" meta:resourcekey="rdbGenderResource1"
                                            RepeatDirection="Horizontal">
                                            <asp:ListItem Selected="True" meta:resourcekey="ListItemResource1">Male</asp:ListItem>
                                            <asp:ListItem meta:resourcekey="ListItemResource2">Female</asp:ListItem>
                                        </asp:RadioButtonList>
                                    </div>
                                </div>
                            </div>

                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblLocation" runat="server" CssClass="sfFormlabel" Text="Location"
                                        meta:resourcekey="lblLocationResource1"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtLocation" runat="server" CssClass="sfInputbox" meta:resourcekey="txtLocationResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="lblAboutYou" runat="server" CssClass="sfFormlabel" Text="About You"
                                        meta:resourcekey="lblAboutYouResource1"></asp:Label>
                                </span>
                                <span class="formValue">
                                    <asp:TextBox ID="txtAboutYou" runat="server" CssClass="sfInputbox" TextMode="MultiLine"
                                        meta:resourcekey="txtAboutYouResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="clearfix"></div>
                        </div>

                        <div class="right-content">
                        <h4>Contacts</h4>
                            <div class="sfFieldset">
                                <span class="formKey">
                                    <asp:Label ID="Label18" runat="server" CssClass="sfFormlabel" Text="Email" meta:resourcekey="Label18Resource1"></asp:Label>
                                </span>
                                <span class="formValue medium-box">
                                    <asp:TextBox ID="txtEmail1" runat="server" CssClass="sfInputbox" MaxLength="50"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="revEmail1" runat="server" ControlToValidate="txtEmail1"
                                        Display="Dynamic" SetFocusOnError="True" ValidationGroup="rfvUserProfile"
                                        ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="sfError"></asp:RegularExpressionValidator>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                <span class="formKey small-box">
                                    <asp:Label ID="lblResPhone" runat="server" CssClass="sfFormlabel" Text="Res. Phone"
                                        meta:resourcekey="lblResPhoneResource1"></asp:Label>
                                </span>
                                <span class="formValue small-box">
                                    <asp:TextBox ID="txtResPhone" runat="server" CssClass="sfInputbox" meta:resourcekey="txtResPhoneResource1"></asp:TextBox>
                                </span>
                            </div>
                            <div class="sfFieldset">
                                                            <span class="formKey">
                                                                <asp:Label ID="lblOthers" runat="server" CssClass="sfFormlabel" Text="Others" meta:resourcekey="lblOthersResource1"></asp:Label>
                                                            </span>
                                                            <span class="formValue">
                                                                <asp:TextBox ID="txtOthers" runat="server" CssClass="sfInputbox" OnTextChanged="txtOthers_TextChanged"
                                                                    TextMode="MultiLine" meta:resourcekey="txtOthersResource1"></asp:TextBox>
                                                            </span>
                                                        </div>
                            <div class="sfFieldset alignLevel">
                                <span class="formKey">
                                    <asp:Label ID="lblMobilePhone" runat="server" CssClass="sfFormlabel" Text="Mobile"
                                        meta:resourcekey="lblMobilePhoneResource1"></asp:Label>
                                </span>
                                <span class="formValue medium-box">
                                    <asp:TextBox ID="txtMobile" runat="server" CssClass="sfInputbox" meta:resourcekey="txtMobileResource1"></asp:TextBox>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class="button_wrapper clearfix" id="divSaveProfile" runat="server">
                        <label class="sfLocale btn green-btn save-profile-edit">
                            Save
            <asp:Button runat="Server" ID="btnSave" OnClick="btnSave_Click"
                ValidationGroup="rfvUserProfile" meta:resourcekey="btnSaveResource1" /></label>

                        <asp:LinkButton ID="lnkCancel" Visible="false" CssClass="btn cancel" runat="server" Text="Cancel" OnClick="lnkCancel_Click"
                            meta:resourcekey="lnkCancelResource1"></asp:LinkButton>
                    </div>




                </div>
            </div>
            <div id="Changepswd">
                <div id="tblChangePasswordSettings" class="sfFormwrapper twoColForm" runat="server">
                    <div class="sfFieldset">
                        <span class="formKey">
                            <asp:Label ID="lblNewPassword" runat="server" CssClass="sfFormlabel" Text="New Password"
                                meta:resourcekey="lblNewPasswordResource1"></asp:Label>
                        </span>
                        <span class="formValue small-box" runat="server">

                            <asp:TextBox ID="txtNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox password"
                                TextMode="Password" ValidationGroup="vgManagePassword" meta:resourcekey="txtNewPasswordResource1" oncopy="return false" onpaste="return false" oncut="return false"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtNewPassword"
                                ErrorMessage="Password is required." CssClass="sfRequired" ValidationGroup="vgManagePassword"
                                meta:resourcekey="RequiredFieldValidator1Resource1"></asp:RequiredFieldValidator>
                        </span>
                    </div>
                    <div class="sfFieldset" id="Tr2" runat="server">
                        <span class="formKey" runat="server">
                            <asp:Label ID="lblRetypeNewPassword" runat="server" CssClass="sfFormlabel" Text="Retype New Password"
                                meta:resourcekey="lblRetypeNewPasswordResource1"></asp:Label>
                        </span>
                        <span class="formValue small-box" runat="server">
                            <asp:TextBox ID="txtRetypeNewPassword" runat="server" MaxLength="20" CssClass="sfInputbox"
                                TextMode="Password" ValidationGroup="vgManagePassword" meta:resourcekey="txtRetypeNewPasswordResource1" oncopy="return false" onpaste="return false" oncut="return false"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtRetypeNewPassword"
                                ErrorMessage="Type password again." CssClass="sfRequired" ValidationGroup="vgManagePassword"
                                Display="Dynamic" meta:resourcekey="RequiredFieldValidator5Resource1"></asp:RequiredFieldValidator>
                            <asp:CompareValidator ID="cvPassword" runat="server" ErrorMessage="Password Doesn't Match"
                                ControlToValidate="txtRetypeNewPassword" ControlToCompare="txtNewPassword" ValidationGroup="vgManagePassword"
                                Display="Dynamic"></asp:CompareValidator>
                            <label id="lblValidationmsg" class="sfRequired">
                            </label>
                        </span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="button_wrapper" runat="server">
                        <div runat="server">
                            <div class="sfButtonwrapper">
                                <label class="sfLocale btn green-btn save-profile-edit">
                                    Save
                                <asp:Button ID="btnManagePasswordSave" runat="server" ValidationGroup="vgManagePassword"
                                    OnClick="btnManagePasswordSave_Click" meta:resourcekey="btnManagePasswordSaveResource1" />
                                </label>
                            </div>
                            <div class="sfValidationsummary">
                                <label id="lblChangepwdval">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="divUserInfo" runat="server" visible="false">
        <div class="user_profile">
            <div class="sfViewprofile sfPadding clearfix">
                <table id="tblViewProfile" style="display: none;" cellpadding="0" cellspacing="0" width="100%" runat="server">
                    <tr>
                        <td width="15%">
                            <asp:Label ID="Label2" runat="server" CssClass="sfFormlabel" Text="User Name" meta:resourcekey="Label2Resource1"></asp:Label>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label4" runat="server" CssClass="sfFormlabel" Text="First Name" meta:resourcekey="Label4Resource1"></asp:Label>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label5" runat="server" CssClass="sfFormlabel" Text="Last Name" meta:resourcekey="Label5Resource1"></asp:Label>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr id="trviewFullName" runat="server" visible="true">
                        <td class="style1">
                            <asp:Label ID="Label6" runat="server" CssClass="sfFormlabel" Text="FullName" meta:resourcekey="Label6Resource1"></asp:Label>
                        </td>
                        <td colspan="2" class="style1">
                            <asp:Label ID="lblviewFullName" runat="server" meta:resourcekey="lblviewFullNameResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trviewBirthDate" runat="server">
                        <td runat="server">
                            <asp:Label ID="lblBirthDateTest" runat="server" Text="BirthDate" CssClass="sfFormlabel"
                                meta:resourcekey="lblBirthDateTestResource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label runat="server" ID="lblviewBirthDate" meta:resourcekey="lblviewBirthDateResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trviewGender" runat="server">
                        <td runat="server">
                            <asp:Label ID="lblGenderText" runat="server" Text="Gender" CssClass="sfFormlabel"
                                meta:resourcekey="lblGenderTextResource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label runat="server" ID="lblviewGender" meta:resourcekey="lblviewGenderResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr runat="server" id="trViewLocation" visible="true">
                        <td>
                            <asp:Label ID="Label7" runat="server" CssClass="sfFormlabel" Text="Location" meta:resourcekey="Label7Resource1"></asp:Label>
                        </td>
                        <td>
                            <asp:Label runat="server" ID="lblViewLocation" meta:resourcekey="lblviewGenderResource1"></asp:Label></td>
                    </tr>
                    <%--<tr runat="server" id="trtwostep" visible="true">
                        <td>
                            <asp:Label ID="Label15" runat="server" CssClass="sfFormlabel" Text="Two step Verification enabled ? "></asp:Label>
                        </td>
                        <td colspan="2"></td>
                    </tr>--%>
                    <tr runat="server" id="trViewAboutYou" visible="true">
                        <td>
                            <asp:Label ID="Label8" runat="server" CssClass="sfFormlabel" Text="About You" meta:resourcekey="Label8Resource1"></asp:Label>
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblViewAboutYou" runat="server" meta:resourcekey="lblViewAboutYouResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trViewEmail" runat="server">
                        <td>
                            <asp:Label ID="Label9" runat="server" CssClass="sfFormlabel" Text="Email" meta:resourcekey="Label9Resource1"></asp:Label>
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblViewEmail1" runat="server" meta:resourcekey="lblViewEmail1Resource1"></asp:Label><br />
                            <asp:Label ID="lblViewEmail2" runat="server" meta:resourcekey="lblViewEmail2Resource1"></asp:Label><br />
                            <asp:Label ID="lblViewEmail3" runat="server" meta:resourcekey="lblViewEmail3Resource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trViewResPhone" runat="server">
                        <td>
                            <asp:Label ID="Label10" runat="server" CssClass="sfFormlabel" Text="Res. Phone" meta:resourcekey="Label10Resource1"></asp:Label>
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblViewResPhone" runat="server" meta:resourcekey="lblViewResPhoneResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trViewMobile" runat="server">
                        <td>
                            <asp:Label ID="Label11" runat="server" CssClass="sfFormlabel" Text="Mobile" meta:resourcekey="Label11Resource1"></asp:Label>
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblViewMobile" runat="server" meta:resourcekey="lblViewMobileResource1"></asp:Label>
                        </td>
                    </tr>
                    <tr id="trViewOthers" runat="server">
                        <td>
                            <asp:Label ID="Label12" runat="server" CssClass="sfFormlabel" Text="Others" meta:resourcekey="Label12Resource1"></asp:Label>
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblViewOthers" runat="server" meta:resourcekey="lblViewOthersResource1"></asp:Label>
                        </td>
                    </tr>
                </table>
            </div>


            <div class="sfButtonwrapper user_profile_editbtn" id="divEditprofile" visible="false" runat="server">
                <label class="sfLocale sfBtn icon-edit">
                    <asp:Button runat="server" ID="btnEdit" OnClick="btnEdit_Click"
                        meta:resourcekey="btnEditResource1" />
                </label>
            </div>
            <div class="user_profile_pic" runat="server" id="imgProfileView">
                <asp:Image ID="imgViewImage" runat="server" Width="120px" meta:resourcekey="imgViewImageResource1" />
            </div>
            <div class="user_profile_fullname">

                <asp:Label ID="lblViewFirstName" runat="server" meta:resourcekey="lblViewFirstNameResource1"></asp:Label>
                <asp:Label ID="lblViewLastName" runat="server" meta:resourcekey="lblViewLastNameResource1"></asp:Label>
            </div>
            <div class="user_profile_username">
                <asp:Label ID="lblViewUserName" runat="server" meta:resourcekey="lblViewUserNameResource1"></asp:Label>
            </div>
        </div>
    </div>
</div>
