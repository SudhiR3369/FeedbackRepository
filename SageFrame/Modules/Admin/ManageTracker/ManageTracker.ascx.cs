using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Web.Utilities;
using System.IO;
using System.Xml;
using System.Configuration;
using System.Data.SqlClient;
using System.Globalization;

public partial class Modules_ManageTracker_ManageTracker : BaseAdministrationUserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
         if (!IsPostBack)
            BindFrequency();
    }

    protected void btnRunScript_Click(object sender, EventArgs e)
    {
        string Frequency = ddlFrequency.SelectedItem.Text;
        string Job = string.Empty;
        string FilePath = Server.MapPath("~/Install/Job/ManageTracker.sql");
        string[] DBInfo = GetDataBaseInfo();
        DateTime StartDate = GetDate();
        string SDate = string.Format("{0:yyyy-MM-dd}", StartDate);

        StreamReader sr = new StreamReader(FilePath);
        if (File.Exists(FilePath))
        {

            Job = sr.ReadToEnd();
            Job = Job.Replace("'Frequency'", "'" + Frequency + "'")
                .Replace("'DatabaseName'", "'" + DBInfo[0] + "'")
                .Replace("'ManageTracker'", "'" + DBInfo[0] + "'")
               .Replace("StartingDate", SDate);

            SQLHandler sageSQLHandler = new SQLHandler();
            sageSQLHandler.ExecuteScript(Job, true);
        }
        sr.Close();
    }

    public DateTime GetDate()
    {
        string Frequency = ddlFrequency.SelectedItem.Value;
        DateTime Date = DateTime.Now;
        switch (Frequency)
        {
            case "0":
                Date = DateTime.Now.AddDays(1);
                break;
            case "1":
                Date = DateTime.Now.AddDays(7);
                break;
            case "2":
                Date = DateTime.Now.AddDays(30);
                break;
            case "3":
                Date = DateTime.Now.AddDays(365);
                break;
        }

        return Date;


    }
    public string[] GetDataBaseInfo()
    {
        string DBName = string.Empty;
        string DBServer = string.Empty;
        string ConnectionString = ConfigurationManager.ConnectionStrings["SageFrameConnectionString"].ConnectionString;
        SqlConnectionStringBuilder connBuilder = new SqlConnectionStringBuilder();
        connBuilder.ConnectionString = ConnectionString;
        DBServer = connBuilder.DataSource;
        DBName = connBuilder.InitialCatalog;
        string[] DBInfo = new string[] { DBName, DBServer };
        return DBInfo;
    }
    public void BindFrequency()
    {

        ddlFrequency.Items.Add(new ListItem("Daily", "0"));
        ddlFrequency.Items.Add(new ListItem("Weekly", "1"));
        ddlFrequency.Items.Add(new ListItem("Monthly", "2"));
        ddlFrequency.Items.Add(new ListItem("Yearly", "3"));
    }

}