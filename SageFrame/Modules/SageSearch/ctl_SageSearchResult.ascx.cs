#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using SageFrame.Web;
using SageFrame.Search;
using SageFrame.Web.Common.SEO;
using System.Text;
using System.IO;
using SageFrame.Core.SageFrame.Search;
#endregion

public partial class Modules_SageSearch_ctl_SageSearchResult : BaseAdministrationUserControl
{
    Button btnPageBack = null;
    Button btnPageNext = null;
    public bool dataFound = false;
    public int PortalID;
    public string CulturalName;
    public string baseURL;
    public string UserName;
    public int viewPerPage = 10;
    string IDOfTxtBox = string.Empty;
    public int RowTotal = 0;

    public string SageSearchResultPage
    {
        get
        {
            string strResqltPage = string.Empty;
            if (ViewState["__mSageSearchRPage"] != null)
            {
                strResqltPage = ViewState["__mSageSearchRPage"].ToString();
            }
            return strResqltPage;
        }
        set
        {
            ViewState["__mSageSearchRPage"] = value;
        }
    }
    protected void Page_Init(object sender, EventArgs e)
    {
        IncludeJs("SageSearch", "/Modules/SageSearch/js/searchResult.js", "/Modules/SageSearch/js/Paging/jquery.pagination.js");
        IncludeCss("SageSearch", "/Modules/SageSearch/css/module.css");

        //if (!IsPostBack)
        //{
        //    Session["SageDtv"] = null;
        //    GetSearchResult();
        //}

        //GetSearchResult();
        GenrateSageSerchForm();
        SetSearchText();
        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "SearchVariable", " var SagePageExtension='" + SageFrameSettingKeys.PageExtension + "';", true);
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            CulturalName = GetCurrentCultureName;
            PortalID = GetPortalID;
            UserName = GetUsername;
            baseURL = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
            if (!IsPostBack)
            {
                Session["SageDtv"] = null;
                GetSearchResult();
            }

            //GetSearchResult();
        }
        catch (Exception)
        {
        }
    }

    protected void Page_PreRender(object sender, EventArgs e)
    {
        SageFrameSearch con = new SageFrameSearch();
        SageFrameSearchSettingInfo objSearchSettingInfo = con.LoadSearchSettings(GetPortalID, GetCurrentCultureName);
        string ClientID = string.Empty;
        if (objSearchSettingInfo.SearchButtonType == 0)
        {
            ClientID = ((Button)this.FindControl("btnSageSearchWord")).ClientID;
        }
        else if (objSearchSettingInfo.SearchButtonType == 1)
        {
            ClientID = ((ImageButton)this.FindControl("btnSageSearchWord")).ClientID;
        }
        else if (objSearchSettingInfo.SearchButtonType == 2)
        {
            ClientID = ((LinkButton)this.FindControl("btnSageSearchWord")).ClientID;
        }
        ((TextBox)this.FindControl(IDOfTxtBox)).Attributes.Add("onkeypress", "return clickButton(event,'" + ClientID + "')");
    }

    private void SetSearchText()
    {
        if (Request.QueryString["searchword"] != null && Request.QueryString["searchword"].ToString() != string.Empty)
        {
            #region "Get Data From Form Page"
            foreach (Control ctl in pnlSearchWord.Controls)
            {
                if (ctl.HasControls())
                {
                    foreach (Control mctl in ctl.Controls)
                    {
                        if (mctl.HasControls())
                        {
                            foreach (Control nctl in mctl.Controls)
                            {
                                if (nctl.GetType() == typeof(TextBox))
                                {
                                    TextBox txtSearch = (TextBox)nctl;
                                    if (txtSearch != null)
                                    {
                                        txtSearch.Text = Request.QueryString["searchword"].ToString();
                                        break;
                                    }
                                }
                            }

                        }
                    }
                }
            }
            #endregion
        }
    }

    private void GenrateSageSerchForm()
    {
        try
        {
            if (pnlSearchWord.Controls.Count == 1)
            {
                SageFrameSearch con = new SageFrameSearch();
                SageFrameSearchSettingInfo objSearchSettingInfo = con.LoadSearchSettings(GetPortalID, GetCurrentCultureName);
                viewPerPage = objSearchSettingInfo.SearchResultPerPage;

                HtmlGenericControl sagePagingContainer = new HtmlGenericControl("ul");
                sagePagingContainer.Attributes.Add("class", "sfSearchheader");


                HtmlGenericControl sageUl = new HtmlGenericControl("ul");
                sageUl.Attributes.Add("class", "sfSearchheader");

                HtmlGenericControl sageLi = new HtmlGenericControl("li");
                //sageUl.Attributes.Add("class", "sfSearchheader");


                TextBox txtSageSearch = new TextBox();
                txtSageSearch.CssClass = "sfInputbox";
                txtSageSearch.MaxLength = objSearchSettingInfo.MaxSearchChracterAllowedWithSpace;
                IDOfTxtBox = "txtSage_" + this.Page.Controls.Count.ToString();
                txtSageSearch.ID = IDOfTxtBox;
                RequiredFieldValidator ReqV = new RequiredFieldValidator();
                ReqV.ControlToValidate = IDOfTxtBox;
                ReqV.ErrorMessage = "*";
                ReqV.CssClass = "sfError";
                ReqV.ValidationGroup = "grp_SageSearch";
                sageLi.Controls.Add(ReqV);
                sageLi.Controls.Add(txtSageSearch);
                HtmlGenericControl sageLiButton = new HtmlGenericControl("li");
                string SearchReasultPageName = objSearchSettingInfo.SearchResultPageName;
                HtmlGenericControl buttonWrapper = new HtmlGenericControl("span");
                buttonWrapper.Attributes.Add("class", "search sfBtn smlbtn-succ");
                if (!SearchReasultPageName.Contains(SageFrameSettingKeys.PageExtension))
                {
                    SearchReasultPageName += SageFrameSettingKeys.PageExtension;
                }
                SageSearchResultPage = SearchReasultPageName.Replace(" ", "-");
                if (objSearchSettingInfo.SearchButtonType == 0)
                {
                    Button btnSageSearch = new Button();
                    btnSageSearch.ID = "btnSageSearchWord";
                    btnSageSearch.Text = "Search";
                    btnSageSearch.CssClass = "sfBtn";
                    btnSageSearch.Click += new EventHandler(btnSageSearch_Click);
                    btnSageSearch.ValidationGroup = "grp_SageSearch_" + SageUserModuleID.ToString();
                    buttonWrapper.Controls.Add(btnSageSearch);
                    sageLiButton.Controls.Add(buttonWrapper);
                }
                else if (objSearchSettingInfo.SearchButtonType == 1)
                {
                    ImageButton btnSageSearch = new ImageButton();
                    btnSageSearch.ID = "btnSageSearchWord";
                    btnSageSearch.AlternateText = objSearchSettingInfo.SearchButtonText;
                    string SearchButtonImageUrl = objSearchSettingInfo.SearchButtonImage;
                    btnSageSearch.ImageUrl = GetTemplateImageUrl(SearchButtonImageUrl, true);
                    btnSageSearch.CssClass = "sfBtn";
                    btnSageSearch.ValidationGroup = "grp_SageSearch_" + SageUserModuleID.ToString();
                    btnSageSearch.Click += new ImageClickEventHandler(btnSageSearch_Click);
                    buttonWrapper.Controls.Add(btnSageSearch);
                    sageLiButton.Controls.Add(buttonWrapper);
                }
                else if (objSearchSettingInfo.SearchButtonType == 2)
                {
                    LinkButton btnSageSearch = new LinkButton();
                    btnSageSearch.ID = "btnSageSearchWord";
                    btnSageSearch.Text = "Search";
                    //btnSageSearch.CssClass = "sfBtn";
                    btnSageSearch.Click += new EventHandler(btnSageSearch_Click);
                    btnSageSearch.ValidationGroup = "grp_SageSearch_" + SageUserModuleID.ToString();
                    buttonWrapper.Controls.Add(btnSageSearch);
                    sageLiButton.Controls.Add(buttonWrapper);
                }

                HtmlGenericControl prevbuttonWrapper = new HtmlGenericControl("span");
                HtmlGenericControl nextbuttonWrapper = new HtmlGenericControl("span");
                prevbuttonWrapper.Attributes.Add("class", "sfBtn smlbtn-succ");
                nextbuttonWrapper.Attributes.Add("class", "sfBtn smlbtn-succ");



                HtmlGenericControl sagePager = new HtmlGenericControl("li");

                btnPageBack = new Button();
                btnPageBack.ID = "btnPageBack";
                btnPageBack.Text = "Previous";
                btnPageBack.CssClass = "sfBtn";
                btnPageBack.Click += BtnPageBack_Click;
                //btnPageBack.ValidationGroup = "grp_SageSearch_" + SageUserModuleID.ToString();

                prevbuttonWrapper.Controls.Add(btnPageBack);
                sagePager.Controls.Add(prevbuttonWrapper);

                btnPageNext = new Button();
                btnPageNext.ID = "btnPageNext";
                btnPageNext.Text = "Next";
                btnPageNext.CssClass = "sfBtn ";
                btnPageNext.Click += BtnPageNext_Click;
                //btnPageBack.ValidationGroup = "grp_SageSearch_" + SageUserModuleID.ToString();

                nextbuttonWrapper.Controls.Add(btnPageNext);
                sagePager.Controls.Add(nextbuttonWrapper);

                sageUl.Controls.Add(sageLi);
                sageUl.Controls.Add(sageLiButton);
                //sageUl.Controls.Add(sagePager);

                sagePagingContainer.Controls.Add(sagePager);

                pnlSearchWord.Controls.Add(sageUl);

                pnlSearchPaging.Controls.Add(sagePagingContainer);
            }
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private void BtnPageNext_Click(object sender, EventArgs e)
    {
        string searchWord = string.Empty;
        if (Request.QueryString["searchword"] != null)
            searchWord = Request.QueryString["searchword"].ToString();

        int offset = 1;
        string pageNo = "1";

        if (Request.QueryString["page"] != null) pageNo = Request.QueryString["page"].ToString();

        int.TryParse(pageNo, out offset);
        offset++;

        string reqURL = Request.Url.ToString();
        string redirectURL = Page.Request.Url.ToString().Split('?')[0] + "?searchword=" + searchWord.ToString() + "&page=" + offset.ToString();
        Response.Redirect(redirectURL);

    }

    private void BtnPageBack_Click(object sender, EventArgs e)
    {

        string searchWord = string.Empty;
        if (Request.QueryString["searchword"] != null)
            searchWord = Request.QueryString["searchword"].ToString();

        int offset = 1;
        string pageNo = "1";
        if (Request.QueryString["page"] != null)
            pageNo = Request.QueryString["page"].ToString();

        int.TryParse(pageNo, out offset);
        offset--;
        if (offset <= 0)
            offset = 1;
        string reqURL = Request.Url.ToString();
        string redirectURL = Page.Request.Url.ToString().Split('?')[0] + "?searchword=" + searchWord.ToString() + "&page=" + offset.ToString();
        Response.Redirect(redirectURL);


    }

    void btnSageSearch_Click(object sender, ImageClickEventArgs e) { GetSearchParameter(); }

    void btnSageSearch_Click(object sender, EventArgs e) { GetSearchParameter(); }

    private void TogglePaging(bool show)
    {
        if (btnPageBack != null) btnPageBack.Visible = show;
        if (btnPageNext != null) btnPageNext.Visible = show;
    }

    private void GetSearchParameter()
    {
        try
        {
            string SearchKey = string.Empty;
            #region "Get Data From Page"
            foreach (Control ctl in pnlSearchWord.Controls)
            {
                if (ctl.HasControls())
                {
                    foreach (Control mctl in ctl.Controls)
                    {
                        if (mctl.HasControls())
                        {
                            foreach (Control nctl in mctl.Controls)
                            {
                                if (nctl.GetType() == typeof(TextBox))
                                {
                                    TextBox txtSearch = (TextBox)nctl;
                                    if (txtSearch != null)
                                    {
                                        SearchKey = txtSearch.Text.Trim();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            #endregion
            //Remove unwanted html text from the Search text
            SearchKey = RemoveUnwantedSearchText(SearchKey);
            SageFrameSearch SFS = new SageFrameSearch();
            if (SFS.CheckIgnorWords(SearchKey, GetCurrentCultureName))
            {
                //Call Search function to get result
                if (SearchKey != string.Empty)
                {
                    SearchData(SearchKey, "1");
                }
                else
                {
                    ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("SageFrameSearch", "PleaseFillValidTextToSearch"), "", SageMessageType.Alert);
                }
            }
            else
            {
                ShowMessage(SageMessageTitle.Notification.ToString(), GetSageMessage("SageFrameSearch", "PleaseFillValidTextToSearch"), "", SageMessageType.Alert);
            }

        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    private string RemoveUnwantedSearchText(string SearchKey)
    {
        try
        {
            SEOHelper seoHelper = new SEOHelper();
            return seoHelper.RemoveUnwantedHTMLTAG(SearchKey);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private void SearchData(string SearchKey, string page)
    {
        try
        {
            //Now Send to The Result Page;
            string strURL = string.Empty;
            SearchKey = Server.HtmlEncode(SearchKey);
            SageFrameSearch objSearch = new SageFrameSearch();
            if (objSearch.SearchPageExists(GetPortalID, Path.GetFileNameWithoutExtension(SageSearchResultPage)))
            {
                if (!IsParent)
                {
                    strURL = GetParentURL + "/portal/" + GetPortalSEOName + "/" + SageSearchResultPage + "?searchword=" + SearchKey + "&page=" + page;
                }
                else
                {
                    strURL = GetParentURL + "/" + SageSearchResultPage + "?searchword=" + SearchKey + "&page=" + page;
                }
            }
            else
            {
                if (!IsParent)
                {
                    strURL = GetParentURL + "/sf/portal/" + GetPortalSEOName + "/Search-Result" + SageFrameSettingKeys.PageExtension + "?searchword=" + SearchKey + "&page=" + page;
                }
                else
                {
                    strURL = GetParentURL + "/sf/Search-Result" + SageFrameSettingKeys.PageExtension + "?searchword=" + SearchKey + "&page=" + page;
                }
            }
            Session["SageDtv"] = null;
            Response.Redirect(strURL, false);
        }
        catch (Exception ex)
        {
            ProcessException(ex);
        }
    }

    public void GetSearchResult()
    {

        //int offset, int limit, string Searchword, string SearchBy, string CultureName, bool IsUseFriendlyUrls, int PortalID
        int offset = 1;
        string searchContent = string.Empty;

        if (Request.QueryString["searchword"] != null)
            searchContent = Request.QueryString["searchword"].ToString().Trim();

        bool isUseFriendlyURL = true;
        string pageNo = "1";

        if (Request.QueryString["page"] != null) pageNo = Request.QueryString["page"].ToString();

        int.TryParse(pageNo, out offset);

        if (offset <= 1) offset = 1;

        if (searchContent != string.Empty)
        {
            try
            {
                SageFrameSearch stb = new SageFrameSearch();
                List<SageFrameSearchInfo> lstSearchInfo = stb.SageSearchBySearchWord(offset, viewPerPage, searchContent, UserName, CulturalName, isUseFriendlyURL, PortalID);


                if (offset <= 1)
                {
                    btnPageBack.Parent.Visible = false;
                    //btnPageBack.Visible = false;
                }


                if (lstSearchInfo != null && lstSearchInfo.Count > 0)
                {
                    RowTotal = lstSearchInfo.Count;

                    if (lstSearchInfo.Count < viewPerPage)
                    {
                        btnPageNext.Parent.Visible = false;
                    }
                    else
                        btnPageNext.Parent.Visible = true;

                    //TogglePaging(true);
                }
                else
                {
                    if (offset > 1)
                    {
                        btnPageNext.Parent.Visible = false;
                    }
                    else
                    {
                        btnPageNext.Parent.Visible = false;
                        btnPageBack.Parent.Visible = false;
                    }

                    //TogglePaging(false);
                }

                StringBuilder sb = new StringBuilder();
                sb.Append("<h2 id='h2SearchResult'>");
                sb.Append("<span class='sfSearchWord'>Page No: " + offset + " ( " + RowTotal + " results found for  '" + searchContent + "')</span>");
                sb.Append("</h2>");

                sb.Append("<div class='sfSearchResultWrapper'>");

                sb.Append("<div id='divSageSearchResult' class='sfSearchlist'>");
                sb.Append("<ul id='ulSearchResult'>");

                if (lstSearchInfo != null && lstSearchInfo.Count > 0)
                {
                    foreach (SageFrameSearchInfo searchInfo in lstSearchInfo)
                    {
                        string htmlContent = searchInfo.HTMLContent;

                        //int position1 = 0;
                        //while ((position1 < htmlContent.Length) && (position1 = htmlContent.IndexOf(searchContent, position1)) != -1)
                        //{
                        //    position1 += searchContent.Length();
                        //}


                        string pageName = searchInfo.PageName;

                        //int rowTotal = searchInfo.RowTotal;
                        string searchWord = searchInfo.SearchWord;
                        string tabPath = searchInfo.TabPath;
                        string updatedOn = searchInfo.UpdatedContentOn;
                        string queryString = searchInfo.URL.Replace('#', '&');
                        string userModuleTitle = searchInfo.UserModuleTitle;

                        string fullURL = GetHostURL() + tabPath + SageFrameSettingKeys.PageExtension + queryString;

                        sb.Append("<li id='liSearchResult' class='sfSearchList'>");
                        sb.Append("<a href = '" + fullURL + "'>");
                        sb.Append("<p id='htmContent' class='sfResultDetail'>" + htmlContent + "</p>");
                        sb.Append("<p class='sfResultDate'>" + updatedOn + "</p>");
                        sb.Append("</a> ");
                        sb.Append("</li>");

                    }
                }
                sb.Append("</ul>");
                sb.Append("</div>");

                sb.Append("<div id='Pagination'>");
                sb.Append("</div>");
                sb.Append("<div class='clear'>");
                sb.Append("</div>");
                sb.Append("</div>");

                ltrSearchResult.Text = sb.ToString();
            }
            catch (Exception e)
            {

                btnPageBack.Parent.Visible = false;
                btnPageNext.Parent.Visible = false;
                throw e;
            }
        }
        else
        {
            btnPageNext.Parent.Visible = false;
            btnPageBack.Parent.Visible = false;

        }


    }


}