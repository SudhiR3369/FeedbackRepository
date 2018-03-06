using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.DashboardLink;
using SageFrame.Pages;

public partial class Modules_UseFullLink_UsefullLinkEdit : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        BindContentGrid();
        IncludeJs("dashboardlinkscript", "/Modules/Admin/DashboardSideMenu/Js/DashboardLinkScript.js");
        if (!IsPostBack)
        {
            GetAndBindPages();
        }
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
        switch (e.CommandName)
        {
            case "ContentEdit":
                {

                    EditContent(ContentID);
                    BindContentGrid();
                    break;
                }
            case "ContentDelete":
                {

                    DeleteContent(ContentID);
                    ShowMessage(SageMessageTitle.Information.ToString(), "Link Deleted Successfully", "", SageMessageType.Success);
                    BindContentGrid();
                    break;
                }
            case "SortUp":
                {
                    DashboardLinkController ObjCon = new DashboardLinkController();
                    ObjCon.SortLink(ContentID, true);
                    BindContentGrid();
                    ShowMessage(SageMessageTitle.Information.ToString(), "Order Changed Successfully", "", SageMessageType.Success);
                    break;
                }
            case "SortDown":
                {
                    DashboardLinkController ObjCon = new DashboardLinkController();
                    ObjCon.SortLink(ContentID, false);
                    BindContentGrid();
                    ShowMessage(SageMessageTitle.Information.ToString(), "Order Changed Successfully", "", SageMessageType.Success);
                    break;
                }

        }


    }
    private void BindContentGrid()
    {
        DashboardLinkController objCon = new DashboardLinkController();
        List<DashboardLinkInfo> listMenu = objCon.GetallLinks(GetPortalID, userModuleID, GetCurrentCultureName);
        gdvContents.DataSource = listMenu;
        gdvContents.DataBind();

        var newList = listMenu.Where(x => x.IsParent == true);
        ddlParentPageList.DataSource = newList;
        ddlParentPageList.DataValueField = "LinkID";
        ddlParentPageList.DataTextField = "LinkTitle";
        ddlParentPageList.DataBind();
        ddlParentPageList.Items.Insert(0, new ListItem() { Value = "0", Text = "None" });
    }
    private void InsertUpdateContent()
    {
        DashboardLinkInfo objInfo = new DashboardLinkInfo();
        objInfo.LinkID = Int32.Parse(hdnContentID.Value);
        objInfo.LinkTitle = txtLinkTitle.Text;
        objInfo.IsParent = chkIsParent.Checked;

        objInfo.PageID = objInfo.IsParent ? 0 : Int32.Parse(ddlPageList.SelectedValue);

        objInfo.ParentLinkID = Int32.Parse(ddlParentPageList.SelectedValue);

        objInfo.IsActive = chkIsactiveContent.Checked;
        objInfo.UserModuleID = userModuleID;
        objInfo.PortalID = GetPortalID;
        objInfo.CultureCode = GetCurrentCultureName;
        DashboardLinkController objCon = new DashboardLinkController();
        objCon.AddUpdateLink(objInfo);
        if (hdnContentID.Value == "0")
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/DashboardSideMenu/ModuleLocalText", "Savedsuccesfully"), "", SageMessageType.Success);
        else
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/DashboardSideMenu/ModuleLocalText", "UpdatedSuccesfully"), "", SageMessageType.Success);
        btnSaveContent.Text = "Save";
        ClearAll();
    }

    private void EditContent(int ContentID)
    {
        ClearAll();
        divContentForm.Visible = true;
        divGridContents.Visible = false;
        btnSaveContent.Text = "Update";
        DashboardLinkController objCon = new DashboardLinkController();
        DashboardLinkInfo objInfo = objCon.GetLinkByID(ContentID);
        if (objInfo != null)
        {
            hdnContentID.Value = objInfo.LinkID.ToString();
            txtLinkTitle.Text = objInfo.LinkTitle;

            chkIsactiveContent.Checked = objInfo.IsActive;
            chkIsParent.Checked = objInfo.IsParent;
            if (objInfo.PageID != 0)
            {
                ddlPageList.SelectedValue = objInfo.PageID.ToString();
            }
            if (objInfo.ParentLinkID != 0)
            {
                ddlParentPageList.SelectedValue = objInfo.ParentLinkID.ToString();
            }
            else
            {
                ddlParentPageList.SelectedIndex = -1;
            }
        }


    }
    private void DeleteContent(int ContentID)
    {
        DashboardLinkController objCon = new DashboardLinkController();
        objCon.DeleteLinkByID(ContentID);
    }



    private void ClearAll()
    {
        hdnContentID.Value = "0";
        txtLinkTitle.Text = string.Empty;

        chkIsactiveContent.Checked = false;
        chkIsParent.Checked = false;

        ddlPageList.SelectedIndex = 0;
        ddlParentPageList.SelectedIndex = 0;
    }
    private void GetAndBindPages()
    {
        PageController objCon = new PageController();
        List<PageEntity> lstpage = objCon.GetMenuFront(GetPortalID, true);
        ddlPageList.DataSource = lstpage;
        ddlPageList.DataValueField = "PageID";
        ddlPageList.DataTextField = "PageName";
        ddlPageList.DataBind();
    }
}