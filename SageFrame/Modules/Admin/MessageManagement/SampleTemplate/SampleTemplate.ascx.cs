using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public partial class Modules_Admin_MessageManagement_SampleTemplate_SampleTemplate : BaseUserControl
{
    public string HostUrl;
    protected void Page_Load(object sender, EventArgs e)
    {
       HostUrl=GetHostURL();
    }
   
}