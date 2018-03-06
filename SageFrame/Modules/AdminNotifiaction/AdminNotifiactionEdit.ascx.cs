using System;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Pages;
using SageFrame.AdminNotification;
using System.Web.UI;


public partial class Modules_AdminNotifiaction_AdminNotifiactionEdit :BaseAdministrationUserControl
{  
    int userModuleID = 0;
    int status = 0; 
    protected void Page_Load(object sender, EventArgs e)
    {
        IncludeCss("AdminNotification", "/Modules/AdminNotifiaction/css/module.css");
        if (!IsPostBack) 
        {
            if (!string.IsNullOrEmpty(SageUserModuleID))
                userModuleID = int.Parse(SageUserModuleID);
            else
            {
                Control ctl = this.Parent;
                HiddenField hdnParentUserModuleID = (HiddenField)ctl.FindControl("hdnUserModuleID");
                userModuleID = int.Parse(hdnParentUserModuleID.Value);
            }
          
            BindNotification();
        }        
    }
    private void BindNotification()
    {
        AdminNotificationController controller = new AdminNotificationController();
        List<AdminNotificationInfo> listInfo = controller.GetNotificationList(GetPortalID,string.Empty);
        gdvNotification.DataSource = listInfo;
        gdvNotification.DataBind();
    }
    protected void gdvNotification_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int NotificationID = Int32.Parse(e.CommandArgument.ToString());
        if (e.CommandName == "Edit")
        {
            EditNotification(NotificationID);
           // BindNotification();
        }
        if (e.CommandName == "Delete")
        {
            DeleteNotification(NotificationID);
            BindNotification();
        }
    }
    protected void gdvNotification_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gdvNotification.PageIndex = e.NewPageIndex;
        BindNotification();
    }
    private void EditNotification(int ID)
    {
        AdminNotificationController controller = new AdminNotificationController();
        AdminNotificationInfo objInfo = controller.GetNotificationDetail(GetPortalID,ID);
        if (objInfo != null)
        {
            txtName.Text = objInfo.Name;
            txtMessage.Text = objInfo.Message; 
            status = objInfo.Status;
            chkIsActive.Checked = objInfo.IsActive;
            txtPageUrl.Text = objInfo.PageUrl;
            hdnNotificationID.Value = objInfo.NotificationID.ToString();
        }
        pnlNotificationForm.Visible = true;
        pnlNotificationGrid.Visible = false;
        btnSaveContent.Text = "Update";
    }
    private void DeleteNotification(int ID)
    {
        AdminNotificationController controller = new AdminNotificationController();
        controller.DeleteNotification(ID,GetPortalID, GetUsername);
        ShowMessage("", "Notification Deleted Successfully", "", SageMessageType.Success);
        
    }
    private void ClearForm()
    {
        txtName.Text = string.Empty;
        txtMessage.Text = string.Empty;
        chkIsActive.Checked = false;
        txtPageUrl.Text = string.Empty;      
        hdnNotificationID.Value = "0";
        btnSaveContent.Text = "Save";
    }

    protected void btnAddNew_click(object sender, EventArgs e)
    {
        pnlNotificationGrid.Visible = false;
        pnlNotificationForm.Visible = true;
        ClearForm();
    }
    protected void btnSaveContent_Click(object sender, EventArgs e)
    {
        AddUpdateNotification();

    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        ClearForm();
        pnlNotificationForm.Visible = false;
        pnlNotificationGrid.Visible = true;
        BindNotification();
    }   
    private void AddUpdateNotification()
    {
        AdminNotificationInfo ObjInfo = new AdminNotificationInfo();
        ObjInfo.NotificationID =Int32.Parse(hdnNotificationID.Value.Trim());
        ObjInfo.Name = txtName.Text;
        ObjInfo.Message = txtMessage.Text;
        ObjInfo.PageUrl = txtPageUrl.Text;
        ObjInfo.Status = status;
        ObjInfo.NotifyUserName = string.Empty;
        ObjInfo.IsActive = chkIsActive.Checked;        
        AdminNotificationController controller = new AdminNotificationController();        
        int result= controller.AddUpdateNotification(GetPortalID,GetUsername,ObjInfo);
        pnlNotificationForm.Visible = false;
        pnlNotificationGrid.Visible = true;
        BindNotification();
        ClearForm();
        if (result == 1)
        {
            ShowMessage("", "Notification Saved Successfully", "", SageMessageType.Success);
        }
        else if (result == 2)
        {
            ShowMessage("", "Notification Updated Successfully", "", SageMessageType.Success);
        }
        else if (result == -1)
        {
            ShowMessage("", "Notification Name Already Exist", "", SageMessageType.Alert);
        }
        else
        {
            ShowMessage("", "Error occured", "", SageMessageType.Alert);
        }
    }


    protected void gdvNotification_RowEditing(object sender, GridViewEditEventArgs e)
    {

    }    

    protected void gdvNotification_RowDeleted(object sender, GridViewDeletedEventArgs e)
    {

    }

    protected void gdvNotification_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {

    }
}