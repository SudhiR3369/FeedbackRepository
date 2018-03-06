<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LogoSetting.ascx.cs" Inherits="Modules_Logo_LogoSetting" %>

<script type="text/javascript">
    //<![CDATA[    
    var moduleID = '<%=moduleID%>';
    var portalID = '<%=portalID%>';
    var resolvedUrl = '<%=resolvedUrl%>';
    var currentDirectory = '<%=currentDirectory%>';
    var culture = '<%=culture %>';
    //]]>	
</script>

<div class="sfFormwrapper sfPadding">

        <div class="sfFieldset">
            <div class="formKey buttonClick">
                <span class="sfFormlabel">
                    Logo</span>
            </div>
            <div class="formValue">
                <input type="file" id="fluLogo" />
                <label for="fluLogo">Choose File</label>
                <div id="divLogoIcon" style="max-height: 150px;margin-top:10px">
                </div>
            </div>
        </div>
        
        <div class="sfFieldset">
            <div class="formKey textType">
                <asp:Label ID="lblLogoText" CssClass="sfFormlabel" runat="server" Text="Logo Text"></asp:Label>
            </div>
            <div class="formValue">
                <textarea id="txtLogoText" class="sfTextarea"></textarea>
            </div>
        </div>
        <div class="sfFieldset">
            <div class="formKey textType">
                <span class="sfFormlabel">
                    Navigate URL</span>
            </div>
            <div class="formValue">
                <input type="text" id="txtUrl" class="sfInputbox" value="http://" />
            </div>
        </div>
        <div class="sfFieldset textType">
            <div class="formKey">
                <span class="sfFormlabel">
                    Slogan</span>
            </div>
            <div class="formValue">
                <textarea id="txtSlogan" class="sfTextarea"></textarea>
            </div>
        </div>
       
            <div class="sfButtonwrapper">
                <div class="sftype1">
                    <label id="btnSaveLogo" class="smlbtn-succ sfLocale icon-save sfBtn">
                        Save</label>
                </div>
            </div>
        
</div>
