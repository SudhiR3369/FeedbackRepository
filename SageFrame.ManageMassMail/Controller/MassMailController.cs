using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SageFrame.APIInvoker;
using System.Net.Http;
using SageFrame.Utilities;
using System.Web;
using SageFrame.DigiSphereInvoker.Utilities;
using SageFrame.Web;

namespace SageFrame.MassMail
{
    public class MassMailController
    {

        public List<MassMailFilterTypeInfo> GetFilterValueList(int filterTypeID)
        {
            MassMailProvider objProvider =new MassMailProvider();
            return objProvider.GetFilterValueList(filterTypeID);
        }
        public List<MassMailFilterTypeInfo> GetAllUsers(string username)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return objProvider.GetAllUsersForAutoComplete(username);
        }

        public List<MassMailInfo> GetMassmailList(int offset, int limit, int filterTypeID, string title, int status)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return objProvider.GetMassMailList(offset, limit, filterTypeID, title, status);          
        }

        public int AddUpdateMassMail(MassMailAddInfo objMassMail, string username)
        {
            MassMailProvider objProvider = new MassMailProvider();
            if(objMassMail.ScheduleType==1)
               objMassMail.ScheduledOn=DateTime.UtcNow.ToLocalTime().ToString();
 
            int status=objProvider.AddUpdateMassMail(objMassMail, username);
            if(status>0)
                 CallAPIForMail(objMassMail.ScheduledOn);
            return status;
        }

        public int DeleteMassMail(long massMailID, string username)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return objProvider.DeleteMassMail(massMailID, username);
        }

        public MassMailEditInfo GetMassMailDetailForEdit(long massmailID)
        {
            MassMailProvider objProvider = new MassMailProvider();
            MassMailEditInfo objInfo= objProvider.GetMassMailDetailForEdit(massmailID);
            return objInfo;
        }
        public MassMailSendInfo GetMailAndUserToSendMail(string SecheduleDate)
        {
            MassMailProvider objProvider = new MassMailProvider();
            MassMailSendInfo objInfo = objProvider.GetMailAndUserToSendMail(SecheduleDate);
            SageFrameConfig pagebase = new SageFrameConfig();
            objInfo.MailFrom =pagebase.GetSettingValueByIndividualKey(SageFrameSettingKeys.SuperUserEmail);
            objInfo.MessageBody = objInfo.MessageBody.Replace("##HostUrl##", GetCurrnetHostURL);
            return objInfo;
        }
        public int UpdateStausOfFailMail(long MailID, string FailMailAddress)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return objProvider.UpdateStausOfFailMail(MailID, FailMailAddress);

        }
        private void CallAPIForMail(string ScheduleOn)
        {
            try
            {
                FetchRest fetchRest = new FetchRest();
                string configurecode = Config.GetSetting("configurecode").ToString();
                string DomainName = HttpContext.Current.Request.Url.Host;
                string PostData = "{'sender':'" + DomainName + "','RequestType':1,'ExecuteOn':'" + ScheduleOn + "' }";
                string MassMailRequestURL = APIEndPoint.AutomatedTaskRequest;
                Uri URI = new Uri(MassMailRequestURL);
                HttpResponseMessage response = fetchRest.PostData(DomainName, configurecode, URI, PostData);
                if (response.IsSuccessStatusCode)
                {

                }
            }
            catch (Exception)
            {

               
            }
        }
        public static string GetCurrnetHostURL
        {
            get
            {
                return HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host;
            }
        }
    }
}
