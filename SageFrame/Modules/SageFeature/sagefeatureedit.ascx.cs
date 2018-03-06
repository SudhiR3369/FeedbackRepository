using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.SageFeature;
using System.IO;

public partial class SageFeatureEdit : BaseUserControl
{
    public int userModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        userModuleID = int.Parse(SageUserModuleID);
        IncludeCss("SageFeatureEditcss", "/Modules/SageFeature/css/sagefeature.css");
        BindFeatureGrid();
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        AddUpdateFeauture();
        BindFeatureGrid();
        ClearForm();
        divFeatureForm.Visible = false;
        divFeatureTable.Visible = true;
    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        ClearForm();
        divFeatureForm.Visible = false;
        divFeatureTable.Visible = true;
      
    }
    protected void btnAddNew_Click(object sender, EventArgs e)
    {
        ClearForm();
        divFeatureForm.Visible = true;
        divFeatureTable.Visible = false;
    }
    protected void gdvFeature_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int ContentID = Int32.Parse(e.CommandArgument.ToString());
        if (e.CommandName == "ContentEdit")
        {
            EditContent(ContentID);
           
        }
        if (e.CommandName == "ContentDelete")
        {
            DeleteContent(ContentID);
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageFeature/ModuleLocalText", "ContentDeletedSucessfully"), "", SageMessageType.Success);
            BindFeatureGrid();
        }
    }
    protected void gdvFeature_PageIndexChanging1(object sender, GridViewPageEventArgs e)
    {
        gdvFeature.PageIndex = e.NewPageIndex;
        BindFeatureGrid();
    }
   
    private void AddUpdateFeauture()
    {
        SageFeatureInfo ObjInfo = new SageFeatureInfo();
        ObjInfo.UserModuleID = userModuleID;
        ObjInfo.PortalID = GetPortalID;
        ObjInfo.Culture = GetCurrentCulture();
        ObjInfo.FeatID = Int32.Parse(hdnFeatureID.Value);
        ObjInfo.Title = txtTitle.Text;
        ObjInfo.Description = txtDescription.Text;
        ObjInfo.IsActive = chkIsActive.Checked;
        ObjInfo.AddedBy = GetUsername;
        ObjInfo.ImageName = txtHdnImageName.Text;

        if (fileUploadFeatImage.HasFile)
        {
            ObjInfo.ImageName = SaveImage();
        }
        SageFeatureController objCon = new SageFeatureController();
        objCon.AddUpdate(ObjInfo);
        if (ObjInfo.FeatID > 0)
        {
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageFeature/ModuleLocalText", "UpdatedSuccess"), "", SageMessageType.Success);
        }
        else
        {
            ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageFeature/ModuleLocalText", "Savedsuccess"), "", SageMessageType.Success);
        }
    }
    private string SaveImage()
    {
        string FileName = string.Empty;
        try
        {
            FileName = DateTime.Now.ToString("yyyyMMddhhmmss") + fileUploadFeatImage.FileName.Replace(" ", "").Replace("-", "").Replace("_", "");
            string SavePath = Server.MapPath("/Modules/SageFeature/img/");
            if (!Directory.Exists(SavePath))
            {
                Directory.CreateDirectory(SavePath);
            }
            SavePath = SavePath + FileName;
            fileUploadFeatImage.SaveAs(SavePath);
            string thumLarge = Server.MapPath("/Modules/SageFeature/img/ThumbLarge/");
            if (!Directory.Exists(thumLarge))
            {
                Directory.CreateDirectory(thumLarge);
            }
            thumLarge = thumLarge + FileName;
            PictureManager.CreateThmnail(SavePath, 500, thumLarge);

            File.SetAttributes(SavePath, FileAttributes.Normal);
            if (File.Exists(SavePath))
                File.Delete(SavePath);
            return FileName;
        }
        catch
        {
            return FileName;
        }
    }
    private void ClearForm()
    {
        hdnFeatureID.Value = "0";
        txtTitle.Text = string.Empty;
        txtDescription.Text = string.Empty;
        chkIsActive.Checked = false;
        txtHdnImageName.Text = string.Empty;
        btnSave.Text = "Save";
    }
    private void BindFeatureGrid()
    {
        SageFeatureController objCon = new SageFeatureController();
        List<SageFeatureInfo> lst = objCon.GetallData(userModuleID, GetPortalID, GetCurrentCulture());
        gdvFeature.DataSource = lst;
        gdvFeature.DataBind();
    }
    private void DeleteContent(int ID)
    {
        SageFeatureController objCon = new SageFeatureController();
        objCon.DeleteByID(ID);
    }
    private void  EditContent(int ID)
    {
        SageFeatureController objCon = new SageFeatureController();
        SageFeatureInfo objInfo = objCon.GetByID(ID);
        hdnFeatureID.Value =objInfo.FeatID.ToString();
        txtTitle.Text = objInfo.Title;
        txtDescription.Text = objInfo.Description;
        chkIsActive.Checked = objInfo.IsActive;
        txtHdnImageName.Text = objInfo.ImageName;
        btnSave.Text = "Update";      
        imgPreview.ImageUrl = "/Modules/SageFeature/img/ThumbLarge/" + objInfo.ImageName;
        divFeatureForm.Visible = true;
        divFeatureTable.Visible = false;
    }

   
}