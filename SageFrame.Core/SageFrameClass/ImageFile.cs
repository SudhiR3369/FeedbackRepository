#region "Copyright"

/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/

#endregion

#region "References"

using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using SageFrame.Web;

#endregion


/// <summary>
/// Summary description for ImageFile
/// </summary>
public class ImageFile
{
    /// <summary>
    /// Gets or sets Image thumbnail file name.
    /// </summary>
    public string ThumbImageFileName { get; set; }

    /// <summary>
    /// Gets or sets file name.
    /// </summary>
    public string FileName { get; set; }

    /// <summary>
    /// Gets or sets image size.
    /// </summary>
    public string Size { get; set; }

    /// <summary>
    /// Gets or sets created date in string format.
    /// </summary>
    private string _CreatedDate;
    public string CreatedDate
    {
        get
        {
            if (string.IsNullOrEmpty(this._CreatedDate)) return string.Empty;
            else return DateTimeHelper.GetLocalTime(_CreatedDate).ToShortDateString();
        }
        set
        {
            if ((this._CreatedDate != value))
            {
                this._CreatedDate = value;
            }
        }
    }
}
