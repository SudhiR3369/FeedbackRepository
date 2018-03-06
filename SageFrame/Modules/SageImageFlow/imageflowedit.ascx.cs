using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.ImageFlow;

public partial class Modules_SageImageFlow_ImageFlowEdit : BaseUserControl
{
    int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = Int32.Parse(SageUserModuleID);
        BindContentGrid();
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
                    break;
                }

            case "ContentDelete":
                {
                    DeleteContent(ContentID);
                    ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "ContentDeletedSucessfully"), "", SageMessageType.Success);
                    BindContentGrid();
                    break;
                }
            case "SortUp":
                {
                    ImageFlowController objCon = new ImageFlowController();
                    objCon.ChangeDisplayOrder(ContentID, true);
                    BindContentGrid();
                    ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "DisplayOrderChanged"), "", SageMessageType.Success);
                    break;
                }
            case "SortDown":
                {
                    ImageFlowController objCon = new ImageFlowController();
                    objCon.ChangeDisplayOrder(ContentID, false);
                    BindContentGrid();
                    ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "DisplayOrderChanged"), "", SageMessageType.Success);
                    break;
                }
        }
    }
    private void BindContentGrid()
    {

        ImageFlowController objCon = new ImageFlowController();
        List<ImageFlowInfo> listInfo = objCon.GetAllImages(userModuleID, GetPortalID, GetCurrentCultureName);
        dhnTotalItem.Value = listInfo.Count.ToString();
        gdvContents.DataSource = listInfo;
        gdvContents.DataBind();
    }
    private void EditContent(int ID)
    {
        ImageFlowController objCon = new ImageFlowController();
        ImageFlowInfo objInfo = objCon.GetImagesByID(ID);
        divBannerFrom.Visible = true;
        divGridContents.Visible = false;
        btnSaveContent.Text = "Update";
        hdnBannerID.Value = objInfo.BannerID.ToString();
        txtTitle.Text = objInfo.Title;
        txtDescription.Text = objInfo.Description;
        chkIsactiveContent.Checked = objInfo.IsActive;
        if (objInfo.ImageName != string.Empty)
        {
            hdnImageName.Text = objInfo.ImageName;
            imgPreview.ImageUrl = "~/Modules/SageImageFlow/images/Thumbnail/small/" + objInfo.ImageName;
        }

    }
    private void DeleteContent(int ID)
    {
        ImageFlowController objCon = new ImageFlowController();
        objCon.DeleteImagesByID(ID);
    }

    protected void btnAddNew_click(object sender, EventArgs e)
    {
        divGridContents.Visible = false;
        divBannerFrom.Visible = true;
        ClearAll();
    }
    protected void btnSaveContent_Click(object sender, EventArgs e)
    {
        AddUpdateBanner();
        BindContentGrid();
    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        ClearAll();
        divGridContents.Visible = true;
        divBannerFrom.Visible = false;
    }
    private void AddUpdateBanner()
    {
        ImageFlowController objCon = new ImageFlowController();
        ImageFlowInfo objInfo = new ImageFlowInfo();
        objInfo.BannerID = Int32.Parse(hdnBannerID.Value);
        objInfo.Title = txtTitle.Text;
        objInfo.Description = txtDescription.Text;
        objInfo.IsActive = chkIsactiveContent.Checked;
        objInfo.UserModuleID = userModuleID;
        objInfo.CultureCode = GetCurrentCultureName;
        objInfo.PortalID = GetPortalID;
        objInfo.AddedBy = GetUsername;
        objInfo.ImageName = hdnImageName.Text;
        if (fileBannerImage.HasFile)
        {
            objInfo.ImageName = SaveImage();  
        }
       objCon.AddUpdateImages(objInfo);
        if(objInfo.BannerID>0)
             ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "ContentUpdatedSuccessfully"), "", SageMessageType.Success);
        else
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "ContentSavedsuccesfully"), "", SageMessageType.Success);

        ClearAll();
        divGridContents.Visible = true;
        divBannerFrom.Visible = false;

    }
    /// <summary>
    /// Save Image and retrurn current Image Name
    /// </summary>
    /// <returns></returns>
    private string SaveImage()
    {
        if (fileBannerImage.HasFile)
        {
            string FileName = fileBannerImage.FileName;
           if (FileName .Length> 20)
            {
                FileName = Path.GetExtension(FileName);
            }          
            FileName =System.DateTime.Now.ToString("yyyy_MM_dd_hh_mm_ss") + FileName;
            string OrginalPath = Server.MapPath("~/Modules/SageImageFlow/images/Temp/");
            string ThumbNailSmall = Server.MapPath("~/Modules/SageImageFlow/images/Thumbnail/small/");
            string ThumbNailLarge = Server.MapPath("~/Modules/SageImageFlow/images/Thumbnail/large/");
            
            if (!Directory.Exists(OrginalPath))// create Empty Directory
            {
                Directory.CreateDirectory(OrginalPath);
            }
            if (!Directory.Exists(ThumbNailSmall))
            {
                Directory.CreateDirectory(ThumbNailSmall);
            }
            if (!Directory.Exists(ThumbNailLarge))
            {
                Directory.CreateDirectory(ThumbNailLarge);
            }
            OrginalPath = OrginalPath + FileName;
            fileBannerImage.SaveAs(OrginalPath);
            ThumbNailSmall = ThumbNailSmall + FileName;
         
            ThumbNailLarge = ThumbNailLarge + FileName;
            PictureManager.CreateThmnail(OrginalPath, 320, ThumbNailSmall);
            PictureManager.CreateThmnail(OrginalPath, 768, ThumbNailLarge);
            fileBannerImage.Dispose();
            if (File.Exists(OrginalPath))
            {
                File.Delete(OrginalPath);
            }       
            return FileName;
        }
        else
        {
            return string.Empty;
        }
    }

    private void ClearAll()
    {
        hdnBannerID.Value = "0";
        hdnImageName.Text = string.Empty;
        txtTitle.Text = string.Empty;
        txtDescription.Text = string.Empty;
        chkIsactiveContent.Checked = false;
        btnSaveContent.Text = "Save";
        imgPreview.ImageUrl = "~/Modules/SageImageFlow/img/placeholder.gif";
    }
}