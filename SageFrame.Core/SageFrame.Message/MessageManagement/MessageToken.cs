#region "Copyright"

/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/

#endregion

#region "References"

using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Xml;
using System.Web;
using System.Data;
using SageFrame.Message;
using System.Web.Security;
using SageFrame.Web;
using SageFrame.UserManagement;
using System.Web;

#endregion



namespace SageFrameClass.MessageManagement
{
    /// <summary>
    /// Handles  message token
    /// </summary>
    public class MessageToken
    {
        /// <summary>
        /// Returns list of all the tokens from the message token.xml.
        /// </summary>
        /// <returns>list of tokens.</returns>
        public static NameValueCollection GetListOfAllowedTokens()
        {
            NameValueCollection allowedTokens = new NameValueCollection();
            try
            {
                XmlDocument doc = new XmlDocument();
                doc.Load("SageFrame\\App_GlobalResources\\MessageToken.xml");
                foreach (XmlNode node in doc.SelectSingleNode("messagetokens").ChildNodes)
                {
                    if ((node.NodeType != XmlNodeType.Comment))
                    {
                        allowedTokens.Add(node.Attributes["value"].Value, node.Attributes["key"].Value);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return allowedTokens;
        }       

        /// <summary>
        /// Replaces all the messagetoken in a messagetemple with  their respective values.
        /// </summary>
        /// <param name="messageTemplate">Message template.</param>
        /// <param name="username">User's name.</param>
        /// <param name="PortalID">portalID.</param>
        /// <returns>Replaced message template.</returns>
        public static string ReplaceAllMessageToken(string messageTemplate, string username, Int32 PortalID)
        {
            MessageManagementController objController = new MessageManagementController();
            MessageManagementInfo objInfo = objController.GetUserDetailsByUserName(username, PortalID);
            messageTemplate = messageTemplate.Replace("##Username##", username);
            messageTemplate = messageTemplate.Replace("##UserEmail##", objInfo.Email);
            messageTemplate = messageTemplate.Replace("##UserFirstName##", objInfo.FirstName);
            messageTemplate = messageTemplate.Replace("##UserLastName##", objInfo.LastName);
            messageTemplate = messageTemplate.Replace("##HostUrl##", GetCurrnetHostURL);
            messageTemplate = messageTemplate.Replace("##UserActivationCode##", EncryptionMD5.Encrypt(objInfo.UserID.ToString()) );
            return messageTemplate;
        }
        /// <summary>
        /// Replaces all the message token in messagetemplate
        /// </summary>
        /// <param name="messageTemplate">Message template.</param>
        /// <param name="messageTokenValueDT">Message token values.</param>
        /// <returns>Replacef message template.</returns>
        public static string ReplaceAllMessageToken(string messageTemplate, DataTable messageTokenValueDT)
        {
            string messageToken = string.Empty;
            string messateTokenValue = string.Empty;
            for (int i = 0; i < messageTokenValueDT.Columns.Count; i++)
            {
                messageToken = messageTokenValueDT.Columns[i].ColumnName.ToString();
                messateTokenValue = messageTokenValueDT.Rows[0][i].ToString();
                switch (messageToken)
                {
                    case "##UserActivationCode##":
                        messateTokenValue = EncryptionMD5.Encrypt(messateTokenValue);
                        break;
                }
                messageTemplate = messageTemplate.Replace(messageToken, messateTokenValue);
               messageTemplate = messageTemplate.Replace("##HostUrl##", GetCurrnetHostURL);
            }
            return messageTemplate;
        }


        /// <summary>
        /// Replaces token from template.
        /// </summary>
        /// <param name="template">Template.</param>
        /// <param name="token">Token.</param>
        /// <param name="value">Value to be replace.</param>
        /// <returns>Token replaced value</returns>
        public static string ReplaceToken(string template, string token, string value)
        {
            return template.Replace(token, value);
        }
        public static  string GetCurrnetHostURL
        {
           get {
                return HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + GetCurrentApplicationName;
            }
        }
        public static string GetCurrentApplicationName
        {
            get
            {
                return (HttpContext.Current.Request.ApplicationPath == "/" ? "" : HttpContext.Current.Request.ApplicationPath);
            }
        }
    }
}
