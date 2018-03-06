using SageFrame.AutomatedSearch.Controller;
using SageFrame.AutomatedSearch.Entities;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public partial class Modules_AutomatedSearch_AutomatedSearch : BaseUserControl
{
    public string userModuleID = string.Empty;
    public string modulePath = string.Empty;
    public int portalID = 0;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            userModuleID = SageUserModuleID;
            portalID = GetPortalID;
            modulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);

            IncludeCss("AutomatedSearch", "/Modules/AutomatedSearch/css/AutomatedSearch.css");

            IncludeJs("AutomatedSearch", "/Modules/AutomatedSearch/js/AutomatedSearch.js");
        }
        GetViewDetails();
    }

    public void GetViewDetails()
    {
        AutomatedSearchController automatedSearchController = new AutomatedSearchController();
        List<List<AutomatedSearchDetailInfo>> lstGroupInfo = automatedSearchController.GetSearchViewDetail();

        StringBuilder viewContents = new StringBuilder();
        viewContents.Append("<div id ='viewContainer' >");


        //viewContents.Append("<div>Search Format : <label><b><div id='extLess'></div></b></label></div>");
        viewContents.Append("<div class='sfRowfilter'>");
        viewContents.Append("<div class='sfFieldset'><label class='sfFormlabel'>Search Format : </label></div>");
        viewContents.Append("<div class='formValue'><label class='sfFormlabel'><div id='extLess'></div></label></div>");
        viewContents.Append("</div>");


        if (lstGroupInfo != null && lstGroupInfo.Count > 0)
        {
            StringBuilder sb = new StringBuilder();

            foreach (List<AutomatedSearchDetailInfo> lstSubItems in lstGroupInfo)
            {
                AutomatedSearchDetailInfo first = lstSubItems.First();
                int searchConfigID = first.SearchConfigurationID;
                string tableName = first.SearchName;
                string moduleName = first.ModuleName;

                sb.Append("<div id='" + tableName + "_" + searchConfigID + "'>");

                sb.Append("<div class='sfRowfilter'>");
                sb.Append("<div class='sfFieldset'><label class='sfFormlabel'>Table Name : </label></div>");
                sb.Append("<div class='formValue'><label class='sfFormlabel'>" + tableName + "</label></div>");
                sb.Append("</div>");

                sb.Append("<div class='sfRowfilter'>");
                sb.Append("<div class='sfFieldset'><label class='sfFormlabel'>Module Name : </label></div>");
                sb.Append("<div class='formValue'><label class='sfFormlabel'>" + moduleName + "</label></div>");
                sb.Append("</div>");

                int count = lstSubItems.Count(x => x.ColumnUrl != string.Empty);

                string qsEnabled = "False";
                if (count > 0) qsEnabled = "True";


                sb.Append("<div class='sfRowfilter'>");
                sb.Append("<div class='sfFieldset'><label class='sfFormlabel'>Query String Enabled : </label></div>");
                sb.Append("<div class='formValue'><label class='sfFormlabel'>" + qsEnabled + "</label></div>");
                sb.Append("</div>");

                #region Sub Columns

                StringBuilder searchColumns = new StringBuilder();
                searchColumns.Append("<div class='sfRowfilter searchColumnView'>");
                searchColumns.Append("<div class='sfFieldset'><label class='sfFormlabel'>Search Columns : </label></div>");
                searchColumns.Append("<div class='formValue'>");


                StringBuilder qsColumns = new StringBuilder();
                qsColumns.Append("<div class='sfRowfilter qsColumnView'>");
                qsColumns.Append("<div class='sfFieldset'><label class='sfFormlabel'>Query String Columns : </label></div>");
                qsColumns.Append("<div class='formValue'>");

                foreach (AutomatedSearchDetailInfo item in lstSubItems)
                {
                    if (string.IsNullOrEmpty(item.ColumnUrl.Trim()))
                    {
                        searchColumns.Append("<div class='columnItemView'>");
                        searchColumns.Append("    <label>" + item.ColumnName + "</label>");
                        searchColumns.Append("</div>");
                    }
                    else
                    {
                        qsColumns.Append("<div class='qsItemView'>");
                        qsColumns.Append("    <label> Column Name : " + item.ColumnUrl + "</label>");
                        qsColumns.Append("    <label> Column Alias : " + item.ColumnName + "</label>");
                        qsColumns.Append("</div>");
                    }
                }
                searchColumns.Append("</div>");
                searchColumns.Append("</div>");


                qsColumns.Append("</div>");
                qsColumns.Append("</div>");

                sb.Append(searchColumns.ToString());
                sb.Append(qsColumns.ToString());
                #endregion

                #region Buttons

                StringBuilder buttons = new StringBuilder();
                buttons.Append("<div class='sfButtonwrapper btnSettingViewAction button-paddleft'>");
                buttons.Append("    <button type='button' class='btnViewEdit icon-edit sfBtn smlbtn-primary' data-table='" + tableName + "' id='btnEdit_" + tableName + "'>Edit</button>");
                buttons.Append("    <button type='button' class='btnViewDelete icon-delete sfBtn smlbtn-danger' data-searchid='" + searchConfigID + "' id='btnDelete_" + tableName + "'>Delete</button>");
                buttons.Append("</div>");
                sb.Append(buttons.ToString());
                #endregion

                sb.Append("</div>");
            }

            viewContents.Append(sb.ToString());
        }
        else
        {
            StringBuilder emtpyContent = new StringBuilder();
            emtpyContent.Append("<div>No settings are configured yet</div>");
            viewContents.Append(emtpyContent.ToString());
        }
        viewContents.Append("</div>");

        ltrViewContainer.Text = viewContents.ToString();


    }


}