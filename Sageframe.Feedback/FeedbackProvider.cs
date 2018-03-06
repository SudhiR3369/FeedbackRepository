using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SageFrame.Common;
using SageFrame.Utilities;
using SageFrame.Web;
using SageFrame.Web.Utilities;
using System.Data.SqlClient;

namespace Sageframe.Feedback
{
    public class FeedbackProvider
    {
        public void Insert(FeedbackDetails data)
        {
            try
            {
                List<KeyValuePair<string, object>> para = new List<KeyValuePair<string, object>>();
                // para.Add(new KeyValuePair<string, object>("@id", data.ID));
                para.Add(new KeyValuePair<string, object>("@name", data.Name));
                //para.Add(new KeyValuePair<string, object>("@username", data.Username));
                //para.Add(new KeyValuePair<string, object>("@emailID", data.EmailID));
                para.Add(new KeyValuePair<string, object>("@category", data.Category));
                para.Add(new KeyValuePair<string, object>("@title", data.Title));
                para.Add(new KeyValuePair<string, object>("@description", data.Description));
                para.Add(new KeyValuePair<string, object>("@domain", data.Domain));
                //para.Add(new KeyValuePair<string, object>("@sentBy", data.SentBy));
                // para.Add(new KeyValuePair<string, object>("@receivedOn", data.ReceivedOn));
                //para.Add(new KeyValuePair<string, object>("@rating", data.Rating));
                //para.Add(new KeyValuePair<string, object>("@userModuleID", data.UserModuleID));
                //para.Add(new KeyValuePair<string, object>("@portalID", data.PortalID));
                //para.Add(new KeyValuePair<string, object>("@cultureCode", data.CultureCode));
                SQLHandler SQL = new SQLHandler();
                SQL.ExecuteNonQuery("usp_Feedback_Insert", para);
            }
            catch
            {
                throw;
            }
        }


        public List<FeedbackDetails> GetAllFeedbacks(FeedbackDetails obj)
        {
            try
            {
                List<KeyValuePair<string, object>> para = new List<KeyValuePair<string, object>>();
                para.Add(new KeyValuePair<string, object>("@sortName", obj.sortName));
                para.Add(new KeyValuePair<string, object>("@sortOrder", obj.sortDate));
                SQLHandler SQL = new SQLHandler();
                return SQL.ExecuteAsList<FeedbackDetails>("usp_feedback_Getdata", para);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
