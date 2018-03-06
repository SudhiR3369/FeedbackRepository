<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ctl_SageSearchSetting.ascx.cs"
    Inherits="Modules_SageSearch_ctl_SageSearchSetting" %>
<div class="sfFormwrapper twoColForm">
    
        <div class="sfFieldset">
            <div class="formKey ">
                <asp:Label ID="lblSearchButtonType" runat="server" Text="Button Type:" CssClass="sfFormlabel buttonClick"
                    ToolTip="Choose one of them Button, or Image or Link"></asp:Label>
            </div>
            <div class="sfFieldset" class="cssClassRadioBtnWrapper">
                <asp:RadioButtonList ID="rdblSearchButtonType" ToolTip="Choose one of them Button, or Image or Link"
                    RepeatLayout="Table" runat="server" RepeatColumns="3" RepeatDirection="Horizontal"
                    CssClass="cssClassRadioBtn">
                </asp:RadioButtonList>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:Label ID="lblSearchButtonText" runat="server" Text="Button Text:" CssClass="sfFormlabel"
                    ToolTip="like Search/Go/..."></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtSearchButtonText" MaxLength="20" ToolTip="like Search/Go/..."
                    runat="server" CssClass="sfInputbox"></asp:TextBox>
            </div>
        </div>
    <div class="clearfix"></div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:Label ID="lblSearchButtonImage" runat="server" Text="Button Image:" CssClass="sfFormlabel"
                    ToolTip="like imbSearch.png <br/> Before Setting the image name you must be sure that the image is in your template of adjusted size. This image will play role when you set the button type is Image"></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtSearchButtonImage" ToolTip="like imbSearch.png <br/> Before Setting the image name you must be sure that the image is in your template of adjusted size. This image will play role when you set the button type is Image"
                    runat="server" CssClass="sfInputbox"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:Label ID="lblSearchResultPageName" runat="server" Text="Result Page Name:" CssClass="sfFormlabel"
                    ToolTip="Note You shure that this page is exists on your portal and Serch result module is placed on the page."></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtSearchResultPageName" ToolTip="Note You shure that this page is exists on your portal and Serch result module is placed on the page."
                    runat="server" CssClass="sfInputbox"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:Label ID="lblSearchResultPerPage" runat="server" Text="Result Per Page:" CssClass="sfFormlabel"
                    ToolTip="10/20/30 etc"></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtSearchResultPerPage" ToolTip="10/20/30 etc" runat="server" CssClass="sfInputbox"
                    MaxLength="5"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey">
                <asp:Label ID="lblMaxSearchChracterAllowedWithSpace" runat="server" Text="Number of Character allowed:"
                    CssClass="sfFormlabel" ToolTip="Like 50/100/200 or its upto you the default value is 200<br/>Note Count include with space."></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtMaxSearchChracterAllowedWithSpace" ToolTip="Like 50/100/200 or its upto you the default value is 200<br/>Note Count include with space."
                    runat="server" CssClass="sfInputbox" MaxLength="10"></asp:TextBox>
            </div>
        </div>
        <div class="sfFieldset" runat="server" visible="false">
            <div class="formKey">
                <asp:Label ID="lblMaxResultCharacter" runat="server" Text="Number of Result Character allowed:"
                    CssClass="sfFormlabel" ToolTip="Note Count include with space."></asp:Label>
            </div>
            <div class="formValue">
                <asp:TextBox ID="txtMaxResultCharacter" ToolTip="Note Count include with space."
                    runat="server" CssClass="sfInputbox" MaxLength="10"></asp:TextBox>
            </div>
        </div>
    
</div>
<div class="sfButtonwrapper ">
    <label class="sfBtn smlbtn-succ icon-save">
        Save
        <asp:Button ID="imbSave" runat="server" OnClick="imbSave_Click" /></label>
    <%-- <asp:Label ID="lblSave" runat="server" Text="Save" AssociatedControlID="imbSave"
        Style="cursor: pointer;"></asp:Label>--%>
    <label class="sfBtn smlbtn-danger icon-close">
        Cancel
        <asp:Button ID="imbCancel" runat="server" OnClick="imbCancel_Click" /></label>
    
</div>
