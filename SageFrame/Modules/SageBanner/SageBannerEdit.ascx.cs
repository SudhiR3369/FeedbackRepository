using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.SageBanner;
using SageFrame.Pages;
using System.IO;

public partial class Modules_SageBanner_SageBannerEdit : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        BindBanner();
        GetPagesAndBindDDl();
    }
    private void BindBanner()
    {
        SageBannerController objCon = new SageBannerController();
        List<SageBannerInfo> listInfo = objCon.GetallBanner(GetPortalID, userModuleID, GetCurrentCultureName);
        gdvSageBanner.DataSource = listInfo;
        gdvSageBanner.DataBind();
    }
    protected void gdvSageBanner_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int ContentID = Int32.Parse(e.CommandArgument.ToString());
        if (e.CommandName == "ContentEdit")
        {
            EditContent(ContentID);
            BindBanner();
        }
        if (e.CommandName == "ContentDelete")
        {
            DeleteContent(ContentID);
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageBanner/ModuleLocalText", "ContentDeletedSucessfully"), "", SageMessageType.Success);
            BindBanner();
        }
    }
    protected void gdvSageBanner_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gdvSageBanner.PageIndex = e.NewPageIndex;
        BindBanner();
    }
    private void EditContent(int ID)
    {
        SageBannerController objCon = new SageBannerController();
        SageBannerInfo objInfo = objCon.GetBannerByID(ID);
        txtContentLinkUrl.Text = objInfo.LinkUrl;
        txtLinkBtnName.Text = objInfo.LinkButtonName;
        txtSloganTitle.Text = objInfo.BannerSloganTitle;
        chkIsActive.Checked = objInfo.IsActive;
        txtSlogan.Text = objInfo.BannerSlogan;
        hdnBannerID.Value = objInfo.BannerID.ToString();
        hdnImageName.Value = objInfo.BannerImageName;
        imgPreview.Visible = true;
        imgPreview.ImageUrl = "~/Modules/SageBanner/images/Thumbnail/small/" + objInfo.BannerImageName;
        pnlBannerForm.Visible = true;
        pnlBannerTbl.Visible = false;
        btnSaveContent.Text = "Update";
    }
    private void DeleteContent(int ID)
    {
        SageBannerController objCon = new SageBannerController();
        objCon.DeleteBannerByBannerID(ID, GetUsername);
    }
    private void ClearForm()
    {
        txtContentLinkUrl.Text = string.Empty;
        txtLinkBtnName.Text = string.Empty;
        txtContentLinkUrl.Text = string.Empty;
        txtSloganTitle.Text = string.Empty;
        chkIsActive.Checked = false;
        txtSlogan.Text = string.Empty;
        hdnBannerID.Value = "0";
        hdnImageName.Value = string.Empty;
        imgPreview.Visible = false;
        lblErrorMsg.Text = string.Empty;
        btnSaveContent.Text = "Save";
    }

    protected void btnAddNew_click(object sender, EventArgs e)
    {
        pnlBannerTbl.Visible = false;
        pnlBannerForm.Visible = true;
        ClearForm();
    }
    protected void btnSaveContent_Click(object sender, EventArgs e)
    {
        AddUpdateBanner();
      
    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        ClearForm();
        pnlBannerForm.Visible = false;
        pnlBannerTbl.Visible = true;
        BindBanner();
    }
    private void GetPagesAndBindDDl()
    {
        List<PageEntity> lstMenu = new List<PageEntity>();
        PageController objPageController = new PageController();
        lstMenu = objPageController.GetMenuFront(GetPortalID, false);
        ddlPageList.DataValueField = "PageName";
        ddlPageList.DataTextField = "PageName";
        ddlPageList.DataSource = lstMenu;
        ddlPageList.DataBind();
        ddlPageList.Items.Insert(0, new ListItem("Select page from current site", "0"));

    }
    private void AddUpdateBanner()
    {
        SageBannerInfo ObjInfo = new SageBannerInfo();
        ObjInfo.UserModuleID = userModuleID;
        ObjInfo.PortalID = GetPortalID;
        ObjInfo.AddedBy = GetUsername;
        ObjInfo.Culture = GetCurrentCultureName;
        ObjInfo.BannerID = Int32.Parse(hdnBannerID.Value.Trim());
        ObjInfo.BannerSloganTitle = txtSloganTitle.Text;
        ObjInfo.BannerSlogan = txtSlogan.Text;
        ObjInfo.LinkButtonName = txtLinkBtnName.Text;
        ObjInfo.IsActive = chkIsActive.Checked;
        if (ddlPageList.SelectedValue != "0")
        {
            ObjInfo.LinkUrl = GetHostURL +"/"+ ddlPageList.SelectedValue + ".aspx";
        }
        else
        {
            ObjInfo.LinkUrl = txtContentLinkUrl.Text;
        }
        SageBannerController objCon = new SageBannerController();
        if (ObjInfo.BannerID<=0)
        {
            if (fileCtlContentImage.HasFile)
            {
                ObjInfo.BannerImageName = SaveImage();
                objCon.InsertUpdateBanner(ObjInfo);
                pnlBannerForm.Visible = false;
                pnlBannerTbl.Visible = true;
                BindBanner();
                ClearForm();
                ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageBanner/ModuleLocalText", "UpdatedSuccesfully"), "", SageMessageType.Success);

            }
            else
            {
                lblErrorMsg.Text = "Required!";
            }
        }
        else
        {
            ObjInfo.BannerImageName = hdnImageName.Value;
            if (fileCtlContentImage.HasFile)
            {
                ObjInfo.BannerImageName = SaveImage();
            }
            objCon.InsertUpdateBanner(ObjInfo);
            pnlBannerForm.Visible = false;
            pnlBannerTbl.Visible = true;
            BindBanner();
            ClearForm();
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageBanner/ModuleLocalText", "Savedsuccesfully"), "", SageMessageType.Success);
        }
    }
    /// <summary>
    /// Save Image and retrurn current Image Name
    /// </summary>
    /// <returns></returns>
    private string SaveImage()
    {
        if (fileCtlContentImage.HasFile)
        {
            Random rnd = new Random();
            string FileName = rnd.Next(1,100).ToString()+"_Banner.jpg";
            string OrginalPath = Server.MapPath("~/Modules/SageBanner/images/Temp/");
            string ThumbNailSmall = Server.MapPath("~/Modules/SageBanner/images/Thumbnail/small/");
            string ThumbNailMedium = Server.MapPath("~/Modules/SageBanner/images/Thumbnail/medium/"); 
            string ThumbNailLarge = Server.MapPath("~/Modules/SageBanner/images/Thumbnail/large/");
            if (Directory.Exists(OrginalPath))// delete Temp Directory
            {
                string[] Icons = Directory.GetFiles(OrginalPath);
                foreach (string Images in Icons)
                {
                    File.SetAttributes(Images, System.IO.FileAttributes.Normal);
                    File.Delete(Images);
                }
                Directory.Delete(OrginalPath);
            }
            if (!Directory.Exists(OrginalPath))// create Empty Directory
            {
                Directory.CreateDirectory(OrginalPath);
            }
            if (!Directory.Exists(ThumbNailSmall))
            {
                Directory.CreateDirectory(ThumbNailSmall);
            }
            if (!Directory.Exists(ThumbNailMedium))
            {
                Directory.CreateDirectory(ThumbNailMedium);
            }
            if (!Directory.Exists(ThumbNailLarge))
            {
                Directory.CreateDirectory(ThumbNailLarge);
            }
            OrginalPath = OrginalPath + FileName;
            fileCtlContentImage.SaveAs(OrginalPath);
            ThumbNailSmall = ThumbNailSmall + FileName;
            ThumbNailMedium = ThumbNailMedium + FileName;
            ThumbNailLarge = ThumbNailLarge + FileName;
            PictureManager.CreateThmnail(OrginalPath, 320, ThumbNailSmall);
            PictureManager.CreateThmnail(OrginalPath, 768, ThumbNailMedium);
            PictureManager.CreateThmnail(OrginalPath, 1450, ThumbNailLarge);
            fileCtlContentImage.Dispose();
            return FileName;
        }
        else
        {
            return string.Empty;
        }
    }
    public string GetHostURL
    {
        get
        {
            string hostUrl = Page.Request.Url.Scheme + "://" + Request.Url.Authority + GetApplicationName;
            return hostUrl;
        }
    }
}