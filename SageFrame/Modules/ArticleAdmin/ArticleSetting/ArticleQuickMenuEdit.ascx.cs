using SageFrame.Web;
using System;
using System.Web.UI.WebControls;
using SageFrame.ArticleManagement;

public partial class Modules_ArticleAdmin_ArticleSetting_ArticleQuickMenuEdit : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        BindContentGrid();
    }
    protected void btnAddNew_click(object sender, EventArgs e)
    {
        ClearAll();
        divContentForm.Visible = true;
        divGridContents.Visible = false;
    }
    protected void btnSaveContent_Click(object sender, EventArgs e)
    {

        InsertUpdateContent();
        ClearAll();
        divContentForm.Visible = false;
        divGridContents.Visible = true;
        BindContentGrid();
    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        ClearAll();
        divContentForm.Visible = false;
        divGridContents.Visible = true;
    }

    protected void gdvContents_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gdvContents.PageIndex = e.NewPageIndex;
        BindContentGrid();
    }
    protected void gdvContents_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int ContentID = Int32.Parse(e.CommandArgument.ToString());
        if (e.CommandName == "ContentEdit")
        {
            EditContent(ContentID);
            BindContentGrid();
        }
        if (e.CommandName == "ContentDelete")
        {
            DeleteContent(ContentID);
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/ArticleAdmin/ArticleSetting/ModuleLocalText", "DeletedSuccess"), "", SageMessageType.Success);
            BindContentGrid();
        }
    }
    private void BindContentGrid()
    {
        ArticleQuickMenuController objCon = new ArticleQuickMenuController();
        gdvContents.DataSource = objCon.GetAllQuickMenu(GetPortalID, GetCurrentCultureName);
        gdvContents.DataBind();
    }
    private void InsertUpdateContent()
    {
        ArticleQuickMenuInfo objInfo = new ArticleQuickMenuInfo();
        objInfo.MenuID = Int32.Parse(hdnContentID.Value);
        objInfo.MenuTitle = txtLinkTitle.Text;
        objInfo.MenuUrl = txtLinkURL.Text;
        objInfo.MenuDescription = txtMenuDescription.InnerText;
        objInfo.IsActive = chkIsactiveContent.Checked;
        objInfo.UserModuleID = userModuleID;
        objInfo.PortalID = GetPortalID;
        objInfo.CultureCode = GetCurrentCultureName;
        ArticleQuickMenuController objCon = new ArticleQuickMenuController();
        objCon.AddUpdateQuickMenu(objInfo);
        if (hdnContentID.Value == "0")
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/ArticleAdmin/ArticleSetting/ModuleLocalText", "Savedsuccesfully"), "", SageMessageType.Success);
        else
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/ArticleAdmin/ArticleSetting/ModuleLocalText", "UpdatedSuccesfully"), "", SageMessageType.Success);
        btnSaveContent.Text = "Save";
        ClearAll();
    }
    private void EditContent(int ContentID)
    {
        ClearAll();
        divContentForm.Visible = true;
        divGridContents.Visible = false;
        btnSaveContent.Text = "Update";
        ArticleQuickMenuController objCon = new ArticleQuickMenuController();
        ArticleQuickMenuInfo objInfo = objCon.GetQuickMenuByID(ContentID);
        if (objInfo != null)
        {
            hdnContentID.Value = objInfo.MenuID.ToString();
            txtLinkTitle.Text = objInfo.MenuTitle;
            txtLinkURL.Text = objInfo.MenuUrl;
            txtMenuDescription.InnerText = objInfo.MenuDescription;
            chkIsactiveContent.Checked = objInfo.IsActive;

        }


    }
    private void DeleteContent(int ContentID)
    {
        ArticleQuickMenuController objCon = new ArticleQuickMenuController();
        objCon.DeleteQuickMenuByID(ContentID);
    }



    private void ClearAll()
    {
        hdnContentID.Value = "0";
        txtLinkTitle.Text = string.Empty;
        txtLinkURL.Text = string.Empty;
        chkIsactiveContent.Checked = false;
    }
}