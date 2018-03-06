<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ModuleControlsDetails.ascx.cs"
    Inherits="SageFrame.Modules.Admin.Extensions.Editors.ModuleControlsDetails" %>
<%@ Register Src="~/Controls/sectionheadcontrol.ascx" TagName="sectionheadcontrol"
    TagPrefix="sfe" %>

<asp:UpdatePanel ID="udpModuleControlSettings" runat="server">
    <ContentTemplate>
        <div class="sfCollapsewrapper">
            <div id="divModuleControlSetting" runat="server" class="sfCollapsecontent">
                <div class="sfMarginTopPri">
                    <h2>Module Control Settings</h2>
                    <p class="sfNote">
                        <asp:Label ID="lblModuleControlSettingsHelp" runat="server" Text="In this section, you can set up more advanced settings for Module Controls on this Module."
                            meta:resourcekey="lblModuleControlSettingsHelpResource1"></asp:Label>
                    </p>
                    <div class="sfFormwrapper twoColForm">
                        <div class="sfFieldset fieldComplete fieldActive" id="rowModuleEdit" runat="server" visible="False">
                            <div class="formKey textType">
                                <asp:Label ID="lblModuleEdit" runat="server" Text="Module" CssClass="sfFormlabel"></asp:Label>
                            </div>

                            <div class="formValue activeField" runat="server">
                                <asp:Label ID="lblModuleD" runat="server"></asp:Label></div>
                        </div>
                        <div class="sfFieldset fieldComplete fieldActive" id="rowDefinitionEdit" runat="server" visible="False">
                            <div class="formKey textType">
                                <asp:Label ID="lblDefinitionEdit" runat="server" Text="Definition" CssClass="sfFormlabel"></asp:Label>
                            </div>

                            <div class="formValue activeField">
                                <asp:Label ID="lblDefinitionD" runat="server"></asp:Label>
                            </div>
                        </div>
                        <div class="sfFieldset" id="rowSource" runat="server" visible="False">
                            <div class="formKey">
                                <asp:Label ID="lblSource" runat="server" Text="Source" CssClass="sfFormlabel"></asp:Label></div>

                            <div class="formValue" valign="top" runat="server">
                                <asp:DropDownList ID="ddlSource" runat="server" CssClass="sfListmenu" AutoPostBack="True"
                                    OnSelectedIndexChanged="ddlSource_SelectedIndexChanged" />
                            </div>
                            </div>
                            <div class="sfFieldset">
                                <div class="formKey">
                                    <asp:Label ID="lblKey" runat="server" Text="Key *" CssClass="sfFormlabel"></asp:Label></div>

                            <div class="formValue">
                                <asp:TextBox ID="txtKey" runat="server" CssClass="sfInputbox"
                                    meta:resourcekey="txtKeyResource1"></asp:TextBox>
                                <asp:RequiredFieldValidator Display="Dynamic" ID="rfvModulekey" runat="server" ControlToValidate="txtKey"
                                    ValidationGroup="vdgExtension" ErrorMessage="This field is required." SetFocusOnError="True"
                                    CssClass="sfRequired" meta:resourcekey="rfvModulekeyResource1"></asp:RequiredFieldValidator>
                            </div>
                                </div>
                                <div class="sfFieldset">
                                    <div class="formKey">
                                        <asp:Label ID="lblTitle" runat="server" Text="Title *"
                                            CssClass="sfFormlabel"></asp:Label>
                                    </div>

                                    <div class="formValue">
                                        <asp:TextBox ID="txtTitle" runat="server" CssClass="sfInputbox"
                                            meta:resourcekey="txtTitleResource1"></asp:TextBox>
                                        <asp:RequiredFieldValidator Display="Dynamic" ID="rfvModuleTitle" runat="server" ControlToValidate="txtTitle"
                                            ValidationGroup="vdgExtension" ErrorMessage="*" SetFocusOnError="True"
                                            CssClass="sfRequired" meta:resourcekey="rfvModuleTitleResource1"></asp:RequiredFieldValidator>
                                    </div>
                                </div>
                                <div class="sfFieldset">
                                    <div class="formKey">
                                        <asp:Label ID="lblType" runat="server" Text="Type"
                                            CssClass="sfFormlabel"></asp:Label>
                                    </div>
                                    
                                    <div class="formValue">
                                        <asp:DropDownList ID="ddlType" runat="server" CssClass="sfListmenu"
                                            meta:resourcekey="ddlTypeResource1" />
                                        <asp:Label ID="lblErrorControlType" runat="server" CssClass="sfError"
                                            Text="*" Visible="False" meta:resourcekey="lblErrorControlTypeResource1"></asp:Label>
                                    </div>
                                </div>
                                <div class="sfFieldset" id="rowDisplayOrder" runat="server" visible="False">
                                    <div class="formKey">
                                        <asp:Label ID="lblDisplayOrder" runat="server" Text="Display Order" CssClass="sfFormlabel"></asp:Label></div>

                            <div class="formValue">
                                <asp:TextBox ID="txtDisplayOrder" runat="server" CssClass="sfInputbox"
                                    MaxLength="2" Text="0"></asp:TextBox></div>
                            </div>
                                        <div class="sfFieldset">
                                            <div class="formKey">
                                                <asp:Label ID="lblIcon" runat="server" Text="Icon"
                                                    CssClass="sfFormlabel"></asp:Label>
                                            </div>

                                            <div class="formValue">
                                                <asp:DropDownList ID="ddlIcon" runat="server" CssClass="sfListmenu"
                                                    meta:resourcekey="ddlIconResource1" />
                                            </div>
                                        </div>
                                        <div class="sfFieldset">
                                            <div class="formKey">
                                                <asp:Label ID="lblHelpURL" runat="server" Text="Help URL"
                                                    CssClass="sfFormlabel"></asp:Label>
                                            </div>

                                            <div class="formValue">
                                                <asp:TextBox ID="txtHelpURL" runat="server" CssClass="sfInputbox"
                                                    meta:resourcekey="txtHelpURLResource1"></asp:TextBox>
                                                <asp:RegularExpressionValidator ID="revHelpUrl" runat="server" ControlToValidate="txtHelpURL"
                                                    CssClass="sfRequired" ErrorMessage="The Help Url is not valid." SetFocusOnError="True"
                                                    ValidationExpression="^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&amp;?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$"
                                                    meta:resourcekey="revHelpUrlResource1"></asp:RegularExpressionValidator>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div runat="server" id="pUpdatePane" visible="False"
                            class="sfButtonwrapper ">
                            <asp:LinkButton ID="imbUpdateModlueControl" runat="server" CssClass="icon-save smlbtn-succ sfBtn"
                                OnClick="imbUpdateModlueControl_Click" ValidationGroup="vdgExtension"
                                meta:resourcekey="imbUpdateModlueControlResource1" Text="Save" />

                            <asp:LinkButton ID="imbCancelModlueControl" runat="server" CausesValidation="False" Text="Cancel"
                                OnClick="imbCancelModlueControl_Click" CssClass="icon-close smlbtn-danger sfBtn"
                                meta:resourcekey="imbCancelModlueControlResource1" />

                        </div>
    </ContentTemplate>
</asp:UpdatePanel>
