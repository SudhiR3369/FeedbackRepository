using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.AdminNotification;
using System.Text;

public partial class Modules_AdminNotifiaction_AdminNotification : BaseAdministrationUserControl
{

    protected void Page_Load(object sender, EventArgs e)
    {
        //if (!IsPostBack)
        //{
        IncludeJs("AdminNotification", "/Modules/AdminNotifiaction/js/AdminNotifiaction.js");
        BindNotificationActiveList();
        //}

    }

    private void BindNotificationActiveList()
    {
        StringBuilder notification = new StringBuilder();
        AdminNotificationController controller = new AdminNotificationController();
      
        List<AdminNotificationInfo> objNotification = controller.GetAllActiveNotification(GetPortalID, string.Empty);
        int count = objNotification.Count;
        notification.Append("<div id='divNotification'><span><i class='fa fa-bell-o'></i></span>");
        if (count > 0)
        {
            notification.Append("<span class='notiNumbr'>");
            notification.Append(objNotification.Count);
            notification.Append("</span>");
        }
        notification.Append("</div>");
        if (count > 0)
        {
            notification.Append("<div id='divNotificationList' class='divNotificationList' style='display:none;'>");
            notification.Append("<ul>");
            foreach (AdminNotificationInfo item in objNotification)
            {

                notification.Append("<li>");

                if (item.PageUrl.Trim() != string.Empty)
                {
                    notification.Append("<a href=\"");
                    notification.Append(GetHostURL()).Append("/").Append(item.PageUrl);
                    notification.Append(SageFrameSettingKeys.PageExtension);
                    if (item.IsAdmin)
                    {
                        notification.Append("/ID/");
                        notification.Append(item.NotificationID);
                    }

                    notification.Append("\" >");
                    notification.Append(item.Message);
                    notification.Append("</a>");
                }
                else
                {
                    notification.Append("<div class='notifierDetail'>");
                    notification.Append(item.Message);
                    notification.Append("<span class='msgDetail notiPopup' style='display:none;'>" + item.MessageDetails + "</span>");
                    notification.Append("</div>");
                }

                notification.Append("</li>");

            }
            notification.Append("</ul>");

            notification.Append("<div class='sfButton'>");

            notification.Append("<span class='sfBtn sfMarkAsRead' id='btnMarkRead''/>mark as Read</span> ");
            notification.Append("</div>");
            notification.Append("</div>");
        }
        ltrNotification.Text = notification.ToString();
    }
}