using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.ImageFlow;
public partial class Modules_SageImageFlow_ImageFlowSetting : BaseUserControl
{
    int UserModuleID = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        UserModuleID = Int32.Parse(SageUserModuleID);
        IncludeCss("SageImageFlow", "/Modules/SageImageFlow/css/Module.css");
        GetSettingAndBind();
    }
    private void GetSettingAndBind()
    {
        ImageFlowController ObjCon = new ImageFlowController();
        ImageFlowSettingInfo objInfo = ObjCon.GetSetting(UserModuleID, GetPortalID);
        if (objInfo != null)
        {
            ddlStyle.SelectedValue = objInfo.Style;
            txtSpacing.Text = objInfo.Spacing;
            chkArrow.Checked = objInfo.Arrow;
            chkAutoPlay.Checked = objInfo.AutoPlay;
            chkLooping.Checked = objInfo.Looping;
            chkClickable.Checked = objInfo.Clickable;
            chkScrollwheel.Checked = objInfo.ScrollWheel;
        }
    }
    protected void btnUpdateSetting_Click(object sender, EventArgs e)
    {
        AddUpdateSetting();
    }
    private void AddUpdateSetting()
    {
        ImageFlowSettingInfo objInfo = new ImageFlowSettingInfo();
        objInfo.Style = ddlStyle.SelectedValue;
        objInfo.Spacing = txtSpacing.Text.Trim();
        objInfo.Arrow = chkArrow.Checked;
        objInfo.AutoPlay = chkAutoPlay.Checked;
        objInfo.Looping = chkLooping.Checked;
        objInfo.Clickable = chkClickable.Checked;
        objInfo.ScrollWheel = chkScrollwheel.Checked;
        objInfo.UserModuleID = UserModuleID;
        objInfo.PortalID = GetPortalID;
        ImageFlowController ObjCon = new ImageFlowController();
        ObjCon.AddUpdateSetting(objInfo);
        ShowMessage(SageMessageTitle.Information.ToString(), SageMessage.GetSageModuleLocalMessageByVertualPath("Modules/SageImageFlow/ModuleLocalText", "SettingUpdatedSuccessfully"), "", SageMessageType.Success);
    }
}