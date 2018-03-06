﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="EditPackageDefinition.ascx.cs"
    Inherits="SageFrame.Modules.Admin.Extensions.Editors.EditPackageDefinition" %>

<script language="javascript" type="text/javascript">
    //<![CDATA[    
    function DisplaySubmission() {
        SageFrame.messaging.show("The package has been created", "Success");
    }
    //]]>	
</script>

<div class="sfCollapsewrapper">
    <div id="divPackageSettings" runat="server" class="sfCollapsecontent">
        <div>         
            <p class="sfNote">
                <asp:Label ID="lblPackageSettingsHelp" runat="server" Text="In this section you can configure the package information for the Package."
                    meta:resourcekey="lblPackageSettingsHelpResource1"></asp:Label>
            </p>
            <div class="sfFormwrapper twoColForm">
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblPackageName" runat="server" Text="Package Name *" CssClass="sfFormlabel"
                            meta:resourcekey="lblPackageNameResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtPackageName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtPackageNameResource1"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfvPackageName" runat="server" ControlToValidate="txtPackageName"
                            ValidationGroup="vdgExtension" ErrorMessage="This field is required." CssClass="sfRequired"
                            SetFocusOnError="True" meta:resourcekey="rfvPackageNameResource1"></asp:RequiredFieldValidator>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblFriendlyName" runat="server" Text="Friendly Name *" CssClass="sfFormlabel"
                            meta:resourcekey="lblFriendlyNameResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtFriendlyName" runat="server" CssClass="sfInputbox" meta:resourcekey="txtFriendlyNameResource1"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="rfvFriendlyName" CssClass="sfRequired" runat="server"
                            ControlToValidate="txtFriendlyName" ValidationGroup="vdgExtension" ErrorMessage="This field is required."
                            SetFocusOnError="True" meta:resourcekey="rfvFriendlyNameResource1"></asp:RequiredFieldValidator>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblDescription" runat="server" Text="Description" CssClass="sfFormlabel"
                            meta:resourcekey="lblDescriptionResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtDescription" runat="server" CssClass="sfInputbox" Rows="5" TextMode="MultiLine"
                            meta:resourcekey="txtDescriptionResource1"></asp:TextBox>
                    </div>
                </div>
                <div class="sfFieldset version">
                    <div class="formKey">
                        <asp:Label ID="lblVersion" runat="server" Text="Version" CssClass="sfFormlabel" meta:resourcekey="lblVersionResource1"></asp:Label>
                    </div>
                    <div class="formValue ">
                        <asp:DropDownList ID="ddlFirst" runat="server" CssClass="sfListmenu sfAuto" meta:resourcekey="ddlFirstResource1">
                        </asp:DropDownList>
                        <asp:DropDownList ID="ddlSecond" runat="server" CssClass="sfListmenu sfAuto" meta:resourcekey="ddlSecondResource1">
                        </asp:DropDownList>
                        <asp:DropDownList ID="ddlLast" runat="server" CssClass="sfListmenu sfAuto" meta:resourcekey="ddlLastResource1">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblLicense" runat="server" Text="License" CssClass="sfFormlabel" meta:resourcekey="lblLicenseResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtLicense" runat="server" CssClass="sfInputbox" Rows="5" TextMode="MultiLine"
                            meta:resourcekey="txtLicenseResource1"></asp:TextBox>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblReleaseNotes" runat="server" Text="Release Notes" CssClass="sfFormlabel"
                            meta:resourcekey="lblReleaseNotesResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtReleaseNotes" runat="server" CssClass="sfInputbox" Rows="5" TextMode="MultiLine"
                            meta:resourcekey="txtReleaseNotesResource1"></asp:TextBox>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblOwner" runat="server" Text="Owner:" CssClass="sfFormlabel" meta:resourcekey="lblOwnerResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtOwner" runat="server" CssClass="sfInputbox" meta:resourcekey="txtOwnerResource1"></asp:TextBox>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblOrganization" runat="server" Text="Organization" CssClass="sfFormlabel"
                            meta:resourcekey="lblOrganizationResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtOrganization" runat="server" CssClass="sfInputbox" meta:resourcekey="txtOrganizationResource1"></asp:TextBox>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblUrl" runat="server" Text="Url" CssClass="sfFormlabel" meta:resourcekey="lblUrlResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtUrl" runat="server" CssClass="sfInputbox" meta:resourcekey="txtUrlResource1"></asp:TextBox>
                        <asp:RegularExpressionValidator ID="revUrl" runat="server" ControlToValidate="txtUrl"
                            CssClass="sfError" ErrorMessage="The Url is not valid." SetFocusOnError="True"
                            ValidationExpression="^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&amp;?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$"
                            meta:resourcekey="revUrlResource1"></asp:RegularExpressionValidator>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblEmail" runat="server" Text="Email" CssClass="sfFormlabel" meta:resourcekey="lblEmailResource1"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:TextBox ID="txtEmail" runat="server" CssClass="sfInputbox" meta:resourcekey="txtEmailResource1"></asp:TextBox>
                        <asp:RegularExpressionValidator ID="revEmail" runat="server" ErrorMessage="Email address is not valid."
                            CssClass="sfError" ControlToValidate="txtEmail" SetFocusOnError="True" ValidationExpression="^[a-zA-Z][a-zA-Z0-9_-]+@[a-zA-Z]+[.]{1}[a-zA-Z]+$"
                            meta:resourcekey="revEmailResource1"></asp:RegularExpressionValidator>
                    </div>
                </div>
                <div class="sfFieldset">
                    <div class="formKey">
                        <asp:Label ID="lblSelectPackage" runat="server" CssClass="sfFormlabel" Text="Select Modules"></asp:Label>
                    </div>
                    <div class="formValue">
                        <asp:UpdatePanel ID="Upanel1"  Class="flexer" runat="server"  UpdateMode="Conditional">
                            <ContentTemplate>
                                <div class='sfAvailableModules'>
                                    <asp:ListBox ID="lbAvailableModules" runat="server" CssClass="sfListmenubig" SelectionMode="Multiple"
                                        Height="200"></asp:ListBox>
                                </div>
                                <div class="sfSelectleftright sfSelectarrow">

                                    <asp:LinkButton class="icon-arrow-slim-e circleBtn" ID="add" runat="server" OnClick="add_Click" />

                                    <asp:LinkButton class="icon-arrow-slim-w circleBtn" ID="remove" runat="server" OnClick="remove_Click" />
                                </div>
                                <div class='sfSelectedModules'>
                                    <asp:ListBox ID="lbModulesList" CssClass="sfListmenubig" runat="server" SelectionMode="Multiple"
                                        Height="200"></asp:ListBox>
                                    <asp:RequiredFieldValidator ID="rfvModulesList" runat="server" ControlToValidate="lbModulesList"
                                        ValidationGroup="vdgExtension" ErrorMessage="* Please choose items" SetFocusOnError="True"
                                        CssClass="sfError" meta:resourcekey="rfvModulesListResource1"></asp:RequiredFieldValidator>
                                </div>
                            </ContentTemplate>
                            <Triggers>
                                <asp:AsyncPostBackTrigger ControlID="add" EventName="Click" />
                                <asp:AsyncPostBackTrigger ControlID="remove" EventName="Click" />
                            </Triggers>
                        </asp:UpdatePanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sfButtonwrapper ">
        <label class="icon-install-module smlbtn-succ sfBtn">
            <asp:Button ID="imbCreate" runat="server"
                meta:resourcekey="imbCreateResource1" OnClick="imbCreate_Click" ValidationGroup="vdgExtension" />Download Package</label>
        <label class="icon-close sfBtn smlbtn-danger">
            Cancel
            <asp:Button ID="btnCancelled" runat="server" AlternateText="Cancel"
                meta:resourcekey="btnCancelResource2" UseSubmitBehavior="false"
                OnClientClick="javascript:return window.location=CancelURL;" /></label>
    </div>
</div>

