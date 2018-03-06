using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SageFrame.Web.Utilities;
using System;
using System.Data;

namespace SageFrame.MassMail

{
    public class MassMailProvider
    {
        internal List<MassMailFilterTypeInfo> GetFilterValueList(int filterTypeID)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@FilterTypeID", filterTypeID));
            SQLHandler objHandler = new SQLHandler();
            try
            {
                return objHandler.ExecuteAsList<MassMailFilterTypeInfo>("[dbo].[usp_SCAdmin_GetFilterValues]", Param);
            }
            catch (Exception ex)
            {
                return null;
                //base.ProcessExcetion(ex);
            }

        }
        internal List<MassMailFilterTypeInfo> GetAllUsersForAutoComplete(string username)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@Username", username));
            SQLHandler objHandler = new SQLHandler();
            try
            {
                return objHandler.ExecuteAsList<MassMailFilterTypeInfo>("[dbo].[usp_SCAdmin_GetAllUsersForAutoComplete]", Param);
            }
            catch (Exception ex)
            {
                return null;
                //base.ProcessExcetion(ex);
            }
        }

        internal List<MassMailInfo> GetMassMailList(int offset, int limit, int filterTypeID, string title, int status)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@offset", offset));
            Param.Add(new KeyValuePair<string, object>("@limit   ", limit));
            Param.Add(new KeyValuePair<string, object>("@FilterTypeID", filterTypeID));
            Param.Add(new KeyValuePair<string, object>("@MailTitle", title));
            Param.Add(new KeyValuePair<string, object>("@Status", status));
            SQLHandler objHandler = new SQLHandler();
            try
            {
                return objHandler.ExecuteAsList<MassMailInfo>("[dbo].[usp_SCAdmin_GetMassMailList]", Param);
            }
            catch (Exception ex)
            {
                return null;
                //base.ProcessExcetion(ex);
            }
        }

        internal int AddUpdateMassMail(MassMailAddInfo objMassMail, string username)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@MassMailID", objMassMail.MassMailID));
            Param.Add(new KeyValuePair<string, object>("@MessageMailTitle", objMassMail.MessageTitle));
            Param.Add(new KeyValuePair<string, object>("@FilterTypeID", objMassMail.FilterTypeID));
            Param.Add(new KeyValuePair<string, object>("@FilterValue", objMassMail.FilterValue));
            Param.Add(new KeyValuePair<string, object>("@AdditionalUser", objMassMail.AdditionalUser));
            Param.Add(new KeyValuePair<string, object>("@Subject", objMassMail.Subject));
            Param.Add(new KeyValuePair<string, object>("@MessageBody", objMassMail.MessageBody));
            Param.Add(new KeyValuePair<string, object>("@ScheduleType", objMassMail.ScheduleType));
            Param.Add(new KeyValuePair<string, object>("@ScheduledOn", objMassMail.ScheduledOn));
            Param.Add(new KeyValuePair<string, object>("@Username", username));

            SQLHandler objHandler = new SQLHandler();
            try
            {
                return objHandler.ExecuteNonQuery("[dbo].[usp_SCAdmin_AddUpdateMassMail]", Param, "@output");
            }
            catch (Exception ex)
            {
                return -2;
                //base.ProcessExcetion(ex);
            }
        }

        internal int DeleteMassMail(long massMailID, string username)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@MassMailID", massMailID));
            Param.Add(new KeyValuePair<string, object>("@Username", username));

            SQLHandler objHandler = new SQLHandler();
            try
            {
                return objHandler.ExecuteNonQuery("[dbo].[usp_SCAdmin_DeleteMassMail]", Param, "@output");
            }
            catch (Exception ex)
            {
                return -2;
                //base.ProcessExcetion(ex);
            }
        }

        internal MassMailEditInfo GetMassMailDetailForEdit(long massmailID)
        {
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@MassMailID", massmailID));

            SQLHandler objHandler = new SQLHandler();
            try
            {

                DataSet ds = objHandler.ExecuteAsDataSet("[dbo].[usp_SCAdmin_GetMailDetailByMassMailID]", Param);

                if (ds != null && ds.Tables.Count > 0)
                {
                    MassMailEditInfo objMail = DataSourceHelper.FillObject<MassMailEditInfo>(ds.Tables[0].CreateDataReader());
                    List<MassMailFilterTypeInfo> lstAdditionalUsers = new List<MassMailFilterTypeInfo>();
                    lstAdditionalUsers = DataSourceHelper.FillCollection<MassMailFilterTypeInfo>(ds.Tables[1]);

                    objMail.AdditionalUsers = lstAdditionalUsers;
                    return objMail;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
                //base.ProcessExcetion(ex);
            }
        }
        internal MassMailSendInfo GetMailAndUserToSendMail(string SecheduleDate)
        {
            const string sp = "[dbo].[Admin_MassMail_GetMailForSend]";
            List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
            Param.Add(new KeyValuePair<string, object>("@ScheduleDate", SecheduleDate));
            SQLHandler objHandler = new SQLHandler();
            try
            {
                DataSet ds = objHandler.ExecuteAsDataSet(sp, Param);
                if (ds != null && ds.Tables.Count > 0)
                {
                    MassMailSendInfo objMail = DataSourceHelper.FillObject<MassMailSendInfo>(ds.Tables[0].CreateDataReader());
                    List<UserInfo> lstUsers = new List<UserInfo>();
                    lstUsers = DataSourceHelper.FillCollection<UserInfo>(ds.Tables[1]);
                    objMail.MailToUsers = lstUsers;
                    return objMail;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        internal int UpdateStausOfFailMail(long MailID ,string FailMailAddress)
        {
            try
            {
                const string sp = "[dbo].[Admin_MassMail_UpdateStatusOfSendMail]";
                List<KeyValuePair<string, object>> Param = new List<KeyValuePair<string, object>>();
                Param.Add(new KeyValuePair<string, object>("@FailMailAddress", FailMailAddress));
                Param.Add(new KeyValuePair<string, object>("@MailID", MailID));
                SQLHandler objHandler = new SQLHandler();
                objHandler.ExecuteNonQuery(sp, Param);
                return 1;
            }
            catch (Exception)
            {
                return -2;
            }

           
        }
       
    }
}
