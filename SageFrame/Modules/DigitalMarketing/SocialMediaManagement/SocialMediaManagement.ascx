<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SocialMediaManagement.ascx.cs" Inherits="Modules_DigitalMarketing_SocialMediaManagement_SocialMediaManagement" %>

<script type="text/javascript">

    var txtFeedContentID = '<%=txtFeedContent.ClientID%>';
    var hdnMessageID = '<%=hdnSelectedMessageID.ClientID%>';
    var lblCurrentSelectedPost = '<%=lblPostTitle.ClientID%>';



    $(function () {
        $(this).SocialMediaManagement({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>',
            divFB: '<%=divFacebook.ClientID%>',
            divTwitter: '<%=divTwitter.ClientID%>',
            divLinkedIn: '<%=divLinkedIn.ClientID%>'
        });
    });
</script>


<div class="box-heading">
    <h2 class="box-title">Social Share</h2>

    <div class="control-wrap top-right-icons float-right">
        <span><i class="fa fa-info-circle mediaInstructor" aria-hidden="true"></i></span>
        <span><i class="fa fa-cogs mediaSettings" aria-hidden="true"></i></span>
    </div>
</div>


<div class="formFeeds">


    <div class="sfFormwrapper">

        <div>
            <div class="pnlPostMediaCounter sfCol_33 sfFixed">

                <div class="sfModuleHeader box-head">
                    <div class="head-left">
                        <h2>Total Posts</h2>
                    </div>
                </div>

                <div id="dvPostMediCounterContent" class="sfModulecontent clearfix">
                </div>

            </div>

            <div class="sfModuleHeader box-head">
                <div class="head-left">
                    <div class="boxTitle">Add Post (Customize post)</div>
                </div>

            </div>
        </div>

        <div class="sfModulecontent clearfix">

            <div class="control-wrap flex-start float-left full-width-box flex-wrap">
                <label class="full-width-box">Selected Post</label>
                <div class="custom-inputbox large-box">
                    <asp:TextBox ID="lblPostTitle" runat="server" EnableViewState="true" ViewStateMode="Enabled">  </asp:TextBox>

                </div>
                <div class="custom-textbox x-large-box">
                    <asp:TextBox ID="txtFeedContent" runat="server" onkeypress="return VerifyContentMessage(event,txtFeedContentID,hdnMessageID,lblCurrentSelectedPost)" CssClass="sfInputBox postContent" TextMode="MultiLine" AutoPostBack="false" EnableViewState="true" ViewStateMode="Enabled" />
                </div>
            </div>

            <asp:HiddenField ID="hdnSelectedMessageID" runat="server" Value='0' />

            <input type="hidden" id="hdnCurrentPost" data-messageid="" value="" />
            <div class="divShareList checkslider-btn">
                <div id="divFacebook" runat="server">
                    <asp:CheckBox ID="cbFacebook" runat="server" OnCheckedChanged="cbFacebook_CheckedChanged" AutoPostBack="true" Checked="false" Text="Facebook" />
                </div>
                <div id="divTwitter" runat="server">
                    <asp:CheckBox ID="cbTwitter" runat="server" OnCheckedChanged="cbTwitter_CheckedChanged" AutoPostBack="true" Checked="false" Text="Twitter" />
                </div>
                <div id="divLinkedIn" runat="server">
                    <asp:CheckBox ID="cbLinkedIn" runat="server" OnCheckedChanged="cbLinkedIn_CheckedChanged" AutoPostBack="true" Checked="false" Text="Linked In" />
                </div>
                <div id="divGooglePlus" runat="server" visible="false">
                    <asp:CheckBox ID="cbGooglePLus" runat="server" Visible="false" AutoPostBack="true" Checked="false" Text="Google Plus" />
                </div>
            </div>
            <div class="sfButtonwrapper">
                <asp:LinkButton ID="btnShare" runat="server" OnClick="btnShare_Click" CssClass="icon-share sfBtn smlbtn-succ" Text="Share" ValidationGroup="required"></asp:LinkButton>
                <asp:LinkButton ID="btnClear" runat="server" OnClick="btnClear_Click" CssClass="icon-clear sfBtn smlbtn-danger" Text="Clear" ValidationGroup="required"></asp:LinkButton>
            </div>

        </div>



    </div>


    <div class="postSuggested">

        <div class="sfModuleHeader box-head">

            <div class="head-left">
                <div class="boxTitle">Trending</div>
            </div>
            <div class="head-right">
                <%--<span><i class="fa fa-cogs" aria-hidden="true"></i></span>--%>
                <%--<span><i class="fa fa-history refreshFeedBacks" aria-hidden="true"></i></span>--%>
            </div>
        </div>


        <div class="sfModulecontent clearfix">
            <asp:Literal runat="server" ID="ltrSearchContainer"></asp:Literal>

            <div id="searchContainer" class="sfGridwrapper">
            </div>
        </div>


    </div>


    <div class="sfDivFlying mediaSettingsView" style="display: none;">
        <h3 class="hNewItem"></h3>



        <div class="mediaSettingElement">
        </div>

        <div class="sfButtonwrapper sftype1 " id="divAdd">
            <label id="lblFlyingAddNew" class="icon-addnew sfBtn smlbtn-succ">Update</label>
            <label id="closeDivFlying" class=" icon-close sfBtn smlbtn-danger">Cancel</label>
        </div>


    </div>






</div>

