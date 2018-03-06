<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TopStickyBarModuleEditor.ascx.cs"
    Inherits="Controls_TopStickyBarModuleEditor" %>
<%@ Register Src="LoginStatus.ascx" TagName="LoginStatus" TagPrefix="uc1" %>
<div class="sfTopbar clearfix">
    <ul class="left">
        <li>
            <div class="sfLogo" runat="server" id="divLogo">
                <asp:HyperLink ID="hypLogo" runat="server">Dashboard</asp:HyperLink>
                <asp:Label runat="server" ID="lblVersion" CssClass="sfVersionText" Visible="false"></asp:Label>
  <%--              <asp:HyperLink ID="lblHideLogo" runat="server" CssClass="fa fa-pencil-square-o ChangeSmallLogo"></asp:HyperLink>
                <input type="hidden" runat="server" id="hdnIsShown" class="hdnVersionShow" />

                <div id="fileUploadWrap" style="display: none;" title="Change dashboard logo">
                    <asp:Label ID="lblFileupload" runat="server" Text="File Upload">
                    </asp:Label>
                    <asp:FileUpload ID="fileUpload" runat="server" />
                    <label for="lblFileupload">Choose file</label><br>
                    <asp:Label Text="Show Version" runat="server"></asp:Label>
                    <asp:CheckBox ID="chkIsShown" runat="server" CssClass="chkShowVersion" /><br>
                    <asp:Button ID="btnFileUpload" runat="server" CssClass="smlbtn-succ icon-update" OnClick="fileUpload_Click" Text="Submit" />
                </div>--%>
            </div>
        </li>
    </ul>
    <div class="sfEditPage" style="display:none;">
        <div class="themeSettingPart">
            <div class="iconSettingTheme">
                <span class="themeIcon"></span>
            </div>
            <div id="cpanel" runat="server">
                <div id="divCpanel" class="templateChangeWrapper" style="display: none;">
                    <div id="signin_menu" class="clearfix">
                        <ul>
                            <li>
                                <h6 class="sfLocalee">Customize:</h6>
                                <p>
                                    <label class="sfLocalee">
                                        Themes:</label>
                                    <asp:DropDownList ID="ddlThemes" runat="server" meta:resourcekey="ddlThemesResource1">
                                    </asp:DropDownList>
                                </p>
                                <p>
                                    <label class="sfLocalee">
                                        Screen:</label>
                                    <asp:DropDownList ID="ddlScreen" runat="server" meta:resourcekey="ddlScreenResource1">
                                        <asp:ListItem Value="0" meta:resourcekey="ListItemResource1">fluid</asp:ListItem>
                                        <asp:ListItem Value="1" meta:resourcekey="ListItemResource2">wide</asp:ListItem>
                                        <asp:ListItem Value="2" meta:resourcekey="ListItemResource3">narrow</asp:ListItem>
                                    </asp:DropDownList>
                                </p>
                                <p>
                                    <label class="sfLocalee">
                                        Layouts:</label>
                                    <asp:DropDownList ID="ddlLayout" runat="server" meta:resourcekey="ddlLayoutResource1">
                                    </asp:DropDownList>
                                </p>
                                <p>
                                    <asp:Button ID="btnApply" OnClick="btnApply_Click" runat="server" Text="Apply" CssClass="sfBtn"
                                        meta:resourcekey="btnApplyResource1" />
                                </p>
                                <div class="sfMode">
                                    <h6 class="sfLocalee">Mode:</h6>
                                    <label class="sfLocale">
                                        <input id="rdbEdit" name="mode" type="radio" />
                                        Edit</label>
                                    <label class="sfLocale">
                                        <input id="rdbLayout" name="mode" type="radio" />
                                        Layout</label>
                                    <label class="sfLocale">
                                        <input id="rdbNone" name="mode" type="radio" />
                                        None</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <span class="sfCpanel icon-themesetting signin"></span>
                </div>
            </div>
        </div>
    </div>
    <ul class="right">
        <li class="quickhidetopStickbar" style="display: none;">
            <div class="hidetopstickybar">
                <i class="fa fa-arrow-up" aria-hidden="true" title="hide tostick bar"></i>
            </div>
        </li>
        <li class="sfEditPage">
            <asp:HyperLink ID="hypEdit" runat="server" CssClass="fa fa-pencil-square-o">Default Page</asp:HyperLink>
        </li>
        <li class="sfDashBoard">
            <asp:HyperLink ID="hlnkDashboard" CssClass="icon-dashboard" runat="server" meta:resourcekey="hlnkDashboardResource1"> Dashboard</asp:HyperLink>
        </li>
        <li class="loggedin">
            <span class="user_image">
                <img alt="Username" src="<%=userImage %>" />
                <asp:Literal ID="litUserName" runat="server">
                </asp:Literal>

            </span>&nbsp;<span class="userName"><%= userName%></span>
        </li>
        <li class="logout">
            <span class='myProfile  fa fa-cog'></span>
            <div class="myProfileDrop Off" style="display: none;">
                <ul>
                    <li>
                        <asp:HyperLink runat="server" ID="lnkAccount" Text="Logged As">
                             <i class="fa fa-user" aria-hidden="true"></i> Profile
                        </asp:HyperLink>

                    </li>
                    <li>
                        <uc1:LoginStatus ID="LoginStatus1" runat="server" />
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</div>
