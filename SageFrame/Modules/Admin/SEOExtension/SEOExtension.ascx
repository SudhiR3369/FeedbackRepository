<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SEOExtension.ascx.cs"
    Inherits="Modules_Admin_SEOExtension_SEOExtension" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<h1>SEO Extension
</h1>
<div class="sfFormwrapper">
    <cc1:TabContainer ID="TabContainer1" runat="server" ActiveTabIndex="0"
        meta:resourcekey="TabContainer1Resource1">
        <cc1:TabPanel ID="tpGoogleAnalytics" runat="server"
            HeaderText="Google Analytics" meta:resourcekey="tpGoogleAnalyticsResource1">
            <ContentTemplate>
                <div class="sfFieldset">
                    <p class="sfNote">Note: Please put the javascript without &quot;&lt;script&gt;&quot; tag</p>
                </div>
                <div class="sfFormwrapper sfPadding">
                   
                        <div class="sfFieldset">
                            <div class="formKey" >
                                <asp:Label ID="lblvalue" runat="server" Text="Google JS" ToolTip="Javascript code provided by google, paste here."
                                    CssClass="sfFormlabel" meta:resourcekey="lblvalueResource1"></asp:Label>
                            </div>
                            <div class="formValue">
                                <asp:TextBox ID="txtvalue" runat="server" TextMode="MultiLine" Rows="10" ValidationGroup="GJSC"
                                    CssClass="sfTextarea sfFullwidth" 
                                    meta:resourcekey="txtvalueResource1"></asp:TextBox>
                                <asp:RequiredFieldValidator ID="rfvJS" runat="server" ControlToValidate="txtvalue"
                                    ErrorMessage="*" ValidationGroup="GJSC" CssClass="sfError"
                                    meta:resourcekey="rfvJSResource1"></asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">
                             
                                    <asp:CheckBox ID="chkIsActive" runat='server' ValidationGroup="GJSC"
                                    CssClass="sfCheckbox inline" meta:resourcekey="chkIsActiveResource1" Text="Is Active"/>
                               
                                
                                
                                     <asp:Label ID="lblisActive" runat="server" 
                                    CssClass="sfFormlabel" meta:resourcekey="lblisActiveResource1"></asp:Label>
                                
                            </div>
                           
                        </div>
                    
                </div>
                <div class="sfButtonwrapper ">
                    <label class="icon-update smlbtn-succ  sfBtn">
                        Update
                    <asp:Button ID="imbSave" runat="server" OnClick="imbSave_Click" ToolTip="Save"
                        CausesValidation="False" ValidationGroup="GJSC"
                        meta:resourcekey="imbSaveResource1" /></label>
                    <label class="icon-refresh smlbtn-secondary sfBtn">
                        Refresh
                    <asp:Button ID="imbRefresh" runat="server" ToolTip="Refresh" OnClick="imbRefresh_Click"
                        CausesValidation="False" meta:resourcekey="imbRefreshResource1" /></label>
                </div>
            </ContentTemplate>
        </cc1:TabPanel>
        <cc1:TabPanel ID="tpSitemap" runat="server" HeaderText="Sitemap"
            meta:resourcekey="tpSitemapResource1">
            <ContentTemplate>
                <div id="divSitemap" class="sfFormwrapper twoColForm sfPadding">
                    
                        <div class="sfFieldset">
                            <div class="formKey">
                                <asp:Label ID="lblPriorityValues" runat="server" Text="Priority Values"
                                    CssClass="sfFormlabel" meta:resourcekey="lblPriorityValuesResource1"></asp:Label>
                            </div>
                            <div class="formValue">
                                <asp:DropDownList ID="ddlPriorityValues" runat="server" CssClass="sfListmenu"
                                    meta:resourcekey="ddlPriorityValuesResource1">
                                    <asp:ListItem meta:resourcekey="ListItemResource1">0.0</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource2">0.1</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource3">0.2</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource4">0.3</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource5">0.4</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource6">0.5</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource7">0.6</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource8">0.7</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource9">0.8</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource10">0.9</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource11">1.0</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey">
                                <asp:Label ID="lblChangeFequency" runat="server" Text="Change Frequency"
                                    CssClass="sfFormlabel" meta:resourcekey="lblChangeFequencyResource1"></asp:Label>
                            </div>
                            <div class="formValue">
                                <asp:DropDownList ID="ddlChangeFrequency" runat="server" CssClass="sfListmenu"
                                    meta:resourcekey="ddlChangeFrequencyResource1">
                                    <asp:ListItem meta:resourcekey="ListItemResource12">Always</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource13">Hourly</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource14">Daily</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource15">Weekly</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource16">Monthly</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource17">Yearly</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource18">Never</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <div class="formKey buttonClick">
                                <asp:Label ID="lblDisplay" runat="server" Text="Generate Sitemap"
                                    CssClass="sfFormlabel" meta:resourcekey="lblDisplayResource1"></asp:Label>
                            </div>
                            <div class="formValue">
                                <label class="sfLocale icon-generate smlbtn-primary sfBtn">
                                    Generate
                                <asp:Button ID="BtnGenerateSitemap" runat="server" Text=""
                                    OnClick="btnGenerateSitemap_Click"
                                    meta:resourcekey="BtnGenerateSitemapResource1" /></label>
                            </div>
                        </div>
                    
                        <div class="sfFieldset">
                            <div class="formKey">
                                <asp:Label ID="lblDisplaySearchEngine" runat="server" Text="Submit Sitemap to Search Engines"
                                    CssClass="sfFormlabel" meta:resourcekey="lblDisplaySearchEngineResource1"></asp:Label>
                            </div>
                            <div class="formValue">
                                <div class="sfCheckbox">
                                    <asp:CheckBoxList ID="chkSubmitSitemap" runat="server" RepeatDirection="Vertical" RepeatLayout="UnorderedList"
                                        ValidationGroup="checkselected"
                                        meta:resourcekey="chkSubmitSitemapResource1">
                                        <asp:ListItem meta:resourcekey="ListItemResource19">Google</asp:ListItem>
                                        <asp:ListItem meta:resourcekey="ListItemResource20">Yahoo</asp:ListItem>
                                        <asp:ListItem meta:resourcekey="ListItemResource21">Bing</asp:ListItem>
                                        <asp:ListItem meta:resourcekey="ListItemResource22">Ask</asp:ListItem>
                                    </asp:CheckBoxList>
                                </div>
                            </div>
                        </div>
                    <div class="clearfix"></div>
                        <div class="sfFieldset">
                            
                            <div class="formKey">
                                <label class="icon-send smlbtn-succ sfBtn">
                                    Submit
                                <asp:Button ID="btnSubmit" runat="server"
                                    OnClick="btnSubmit_Click" meta:resourcekey="btnSubmitResource1" />
                                </label>
                            </div>
                        </div>
                    
                </div>
            </ContentTemplate>
        </cc1:TabPanel>
        <cc1:TabPanel ID="tpRobots" runat="server" HeaderText="Robots"
            meta:resourcekey="tpRobotsResource1">
            <ContentTemplate>
                <div id="divRobots" class="tabular">
                    <div class="sfFormwrapper">
                        <div class="sfFieldset">
                            <div class="sfCheckbox">
                                <asp:CheckBoxList ID="chkChoice" runat="server" RepeatDirection="Vertical" RepeatLayout="UnorderedList" RepeatColumns="1"
                                    ValidationGroup="checkselected" meta:resourcekey="chkChoiceResource1">
                                    <asp:ListItem meta:resourcekey="ListItemResource23">Google</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource24">Yahoo</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource25">Bing</asp:ListItem>
                                    <asp:ListItem meta:resourcekey="ListItemResource26">Msn</asp:ListItem>
                                </asp:CheckBoxList>
                            </div>
                        </div>
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfLocale icon-generate smlbtn-primary sfBtn">
                                Generate Robots
                            
                            
                                <asp:Button ID="btnGenerateRobots" runat="server" ValidationGroup="checkselected"
                                    Text="" OnClick="btnGenerateRobots_Click"
                                    meta:resourcekey="btnGenerateRobotsResource1"></asp:Button></label>
                          </span>
                        </div>
                        <div class="sfFieldset">
                            <div class="sfFormwrapper sfGridwrapper">

                                <asp:GridView ID="gdvRobots" runat="server" AutoGenerateColumns="False"
                                    Width="100%" meta:resourcekey="gdvRobotsResource1">
                                    <Columns>
                                        <asp:TemplateField HeaderText="Path Not To Crawl"
                                            meta:resourcekey="TemplateFieldResource1">
                                            <ItemTemplate>
                                                <asp:CheckBox ID="chkPath" runat="server" meta:resourcekey="chkPathResource1" />
                                                <asp:Label ID="lblTabPath" runat="server" Text='<%# Eval("TabPath") %>'
                                                    meta:resourcekey="lblTabPathResource1"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                    <AlternatingRowStyle CssClass="sfEven" />
                                    <RowStyle CssClass="sfOdd" />
                                </asp:GridView>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </cc1:TabPanel>
    </cc1:TabContainer>
</div>
