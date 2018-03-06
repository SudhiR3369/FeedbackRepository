<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SEOManage.ascx.cs" Inherits="Modules_Admin_SEOManagement_SEOManage" %>
<script type="text/javascript">
    //<![CDATA[   
    $(function () {
        $(this).SEOMetaManage({
            userModuleID: '<%=userModuleID%>',
            pageExtension: '<%=pageExtension%>'
        });
     });
    //]]>
</script>
<h1 class="box-title">Page Meta Tag Suggestor</h1>
<div class="divSEOManage">
    <div id="anlalyzePage" style="display: none;">
        <h3>AnalyzingPage</h3>
        <div class="Results" id="Results">
            <ul>
                <li>
                    <span data-progress="parsingpage" class="analyzingDetail">Parsing Page</span><span class="finished"></span>
                </li>
                <li>
                    <span data-progress="parsingp" class="analyzingDetail">Remove unnecessary script</span><span class="ongoing"></span>
                </li>
                <li>
                    <span data-progress="parsingrepitition" class="analyzingDetail">Anlayzing repetative</span><span class="notFinished"></span>
                </li>
                <li>
                    <span data-progress="parsingheadings" class="analyzingDetail">Counting Headings</span><span class="notFinished"></span>
                </li>
                <li>
                    <span data-progress="parsingimages" class="analyzingDetail">Parsing Images</span><span class="notFinished"></span>
                </li>
            </ul>
        </div>
    </div>
    <div class="sfFormwrapper" id="divSEOForm">

        <div class="easy-grid-top-filter flex-start">
            <div class="control-wrap">
                <label class="sfFormlabel">Select a page name</label>
                <div class="custom-select">
                    <asp:Literal ID="ltrPagenames" runat="server"></asp:Literal>
                </div>

            </div>
        </div>

        <div class="sfFieldset">
            <div class="formKey selectKey"></div>
            <div class="formValue">
            </div>
            <span id="spnCreateSuggestions" style="display: none;" class="sfBtn  icon-generate smlbtn-primary">Analyze
            </span>
            <%-- <div class="formValue">
                    <div class="sfButtonWrapper ">
                        
                    </div>
                </div>--%>
        </div>



        <%--        <div class="Selector">
            Please choose the necessary field for SEO suggestions
            <div class="">
                <ul>
                    <li>
                        <span class="fieldName">Title</span><span class="chkName"><input type="checkbox" id="chkTitle" checked="checked" /></span>
                        <span class="fieldName">Description</span><span class="chkName"><input type="checkbox" id="chkTitle" checked="checked" /></span>
                        <span class="fieldName">Images</span><span class="chkName"><input type="checkbox" id="chkTitle" checked="checked" /></span>
                    </li>
                </ul>
            </div>
        </div>--%>
        <div class="stepWrapper">
            <div class="PageAnalyzeWrapper" style="display: none;">
                <div class="siteImageHolder">
                </div>
                <div class="siteDetailHolder">
                    <div class="siteDetails">
                        <h2 class="box-title">Overview</h2>
                        <div class="address">
                            <label>Page Link: </label>
                            <a target="_blank" href="" id="overviewLink"></a>
                        </div>
                        <ul>
                            <li id="pagespeed" class="details">
                                <span class="title">Page speed</span>
                                <span class="result">0 kbps</span>
                            </li>
                            <li id="RequestsDetail" class="details">
                                <span class="title">Requests </span>
                                <span class="result">0</span>
                            </li>
                            <li id="loadTimeDetail" class="details">
                                <span class="title">Load Time</span>
                                <span class="result">0 ms</span>
                            </li>
                            <li id="imageDetails" class="details">
                                <span class="title">Image Count</span>
                                <span class="result">0</span>
                            </li>
                            <li id="headingDetail" class="details">
                                <span class="title">Heading Count</span>
                                <span class="result">0</span>
                            </li>
                            <li id="anchorCountDetail" class="details">
                                <span class="title">Link Count</span>
                                <span class="result">0</span>
                            </li>
                        </ul>
                    </div>
                    <div class="siteUrl">
                        <div id="iframeholder" class="zoom">
                        </div>
                    </div>
                </div>
                <div class="storedResult">
                    <h2 class="storagePageHeader box-title">Last saved data</h2>
                    <span class="sfBtn icon-generate smlbtn-primary" id="metatagdivFlying">Generate Suggestion</span>
                    <%--<span id="pageNameddl" class="selectedPageName"></span>page--%>
                    <ul class="ulStoredData storagePage">
                        <asp:Literal runat="server" ID="ltrStoredSEO"></asp:Literal>
                    </ul>
                    <ul class="ulprevStoredData" style="display: none;">
                        <li class="icon-nodata">You haven't save SEO for this page before</li>
                    </ul>
                    <div class="sfDivFlying seomanagement" style="display: none;">
                        <input type="hidden" id="hdnMenuID" />
                        <span>Please give some keyword to suggest.</span>
                        <input id="txtSeoWord" class="sfInputbox sfFullwidth" type="text" placeholder="SEO words" />
                        <span class="info icon-info">Use space for multiple keywords</span>
                        <div class="sfButtonwrapper sftype1 " id="divAdd">
                            <label id="displaySuggestion" class="icon-addnew sfBtn smlbtn-primary">
                                Suggest</label>
                            <label id="closeDivFlying" class="sfDivFlyingClose icon-close sfBtn smlbtn-danger">
                                Cancel</label>
                        </div>
                    </div>
                </div>
                <div class="seoissues">
                    <h2 class="storagePageHeader box-title">Common SEO Issues</h2>
                    <ul>
                        <li id="typeIssue" style="display: none;">
                            <div class="Key">Type</div>
                            <div class="Value"></div>
                            <div class="Result"></div>
                        </li>
                        <li id="titleIssue">
                            <div class="Key">Title</div>
                            <div class="Value">
                                The title of your Page <span id="titleText" class="titleText">title</span>is <span id="titleCount" class="titleCount">0</span> character long.
                                Most Search engines will truncate meta tiles 60 - 70  characters.
                            </div>
                            <div class="Result"></div>
                        </li>
                        <li id="brokenLinkIssue">
                            <div class="Key">Broken Links</div>
                            <div class="Value"></div>
                            <div class="Result"></div>
                            <div class="moreValue" style="display: none;"></div>
                        </li>
                        <li id="HeadingIssues">
                            <div class="Key">Headings</div>
                            <div class="Value"></div>
                            <div class="Result"></div>
                        </li>
                        <li id="ImageIssue">
                            <div class="Key">Images</div>
                            <div class="Value"></div>
                            <div class="Result"></div>
                            <div class="moreValue" style="display: none; position: absolute;"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <%--        <div class="dynamicForm" style="display: none;">--%>
        <div class="dynamicForm" style="display: none;">
            <span class="icon-close" id="closesuggestions"></span>

            <div id="SearchSuggestions" class="sfFieldset">
                <p class="info sfNote">Use space for multiple keywords</p>
                <div class="formKey">
                    <span class="sfFormlabel">Search possible sentence with word </span>
                </div>
                <div class="formValue">
                    <input id="txtSeoText" class="sfInputbox sfFullwidth" type="text" />

                </div>

                <div class="sfButtonwrapper sftype1" id="divAdd">
                    <label id="suggest" class="icon-addnew sfBtn smlbtn-primary">
                        Suggest</label>
                </div>
            </div>
            <div class="metacollectionwrap">
                <asp:Literal ID="ltrTags" runat="server"></asp:Literal>
                <div id="divHeaderWrapper" style="">
                </div>
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="btnSaveSEOMetaTag" class="icon-save sfBtn smlbtn-succ sfBtn">
                    Save</label>
            </div>
        </div>
        <div>
            <ul class="Steps">
                <li>All the portal pages whose meta tag can be analyze for SEO are listed in the dropdownlist</li>
                <li>By selecting "Select a Page" opens the Page Meta tag Sugestor working steps </li>
                <li>If any page is choosed then the page is analyzed </li>


            </ul>

            <div class="page-looks">
                <h3>Page looks</h3>
                <ul>

                    <li>Page overview  of approximate speed, requests, page load time, images count , heading count of the selected page</li>
                    <li>Last Saved data of type, title, image and description</li>
                    <li>Pages headings count, imaga status , link status ,title etc are shown in common seo issue</li>

                </ul>
            </div>
            <div class="generate-suggestion">
                <h3>Generate Suggestion</h3>
                <ul>
                    <li>Please give some keyword to suggest in the SEO words textbox. to use multiple keywords use space in between the keywords</li>
                    <li>Title suggestio: select a title type or give your own</li>
                    <li>Select title of the page from the text extracted from your site. Keeping your titles under 55 characters, you can expect at least 95% of your titles to display properly.</li>
                    <li>Select Image  so that they appear in the social share while sharing</li>
                    <li>Select description of the page from the text extracted from your site. The description should optimally be between 150-160 characters.</li>
                </ul>
            </div>
        </div>
    </div>


</div>
<div class="iframeHolder" style="display: none;">
</div>
<div id="frequentWords">
</div>
<div id="frequentUsedparaGraph">
</div>

<div id="imagewrapper">
</div>
<div id="anchorWrapper">
</div>
<%--<p >
    The title of your page has a length of characters. Most search engines will truncate titles to 60 characters.

The title relevancy to webpage content is 0%. The title tag should match the content on your webpage. 

The meta description of your page has a length of 4 characters. Most search engines prefer an meta descriptions between 80 and 150 characters. Consider the use of a greater description.

Webpage has too many heading tags.

Webpage has 49 heading tags. The search engines uses the heading tags for the keywords, but excessive use of heading tags can be flagged as SPAM. For best practice try not to use more than 30 heading tags in the webpage and no heading tags longer than 120 characters.

Title: title length warning
http://www.seocentro.com/tools/seo/seo-analyzer-result.html
</p>--%>