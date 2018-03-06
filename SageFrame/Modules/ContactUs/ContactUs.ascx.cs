/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2010 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SageFrame.Web;
using SageFrame.Framework;
using SageFrame.ContactUs;
using SageFrame.Message;
using SageFrame.Common;

namespace SageFrame.Modules.ContactUs
{
    public partial class ContactUs : BaseAdministrationUserControl
    {
        public string ModulePath = "";
        public int UserModuleID = 0;
        public int PortalID = 0;
        public string UserName = "";
        public string messageSubject = string.Empty;
        public string emailSucessMsg = string.Empty;
        private Random random = new Random();

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                IncludeCss("ContactUs", "/Modules/ContactUs/css/module.css");
                IncludeLanguageJS();
                if (!IsPostBack)
                {
                    GenerateRandomSum();

                   
                    UserName = GetUsername;
                    UserModuleID = Int32.Parse(SageUserModuleID);
                    PortalID = GetPortalID;
                    ModulePath = ResolveUrl(this.AppRelativeTemplateSourceDirectory);
                    //messageSubject = GetSageMessage("ContactUs", "ContactUsEmailSubject");
                    //emailSucessMsg = GetSageMessage("ContactUs", "ContactUsIsAddedSuccessfully");
                    //txtSuccessMessage.Text = string.Empty;
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }

        }

        private void GenerateRandomSum()
        {
            txtCaptchaSUM.Text = string.Empty;
            int firstInt = GenerateRandomCode(0, 10);
            int secondInt = GenerateRandomCode(11, 20);
            int sum = firstInt + secondInt;
            ltrFirst.Text = firstInt.ToString();
            ltrSecond.Text = secondInt.ToString();
            this.Session[SessionKeys.CatchaSum] = sum;
        }
        private int GenerateRandomCode(int min, int max)
        {
            return this.random.Next(min, max);
        }

        private bool ValidateSum()
        {
            string captchaSum = string.Empty;
            if (Session[SessionKeys.CatchaSum] != null)
            {
                captchaSum = Session[SessionKeys.CatchaSum].ToString();
            }
            this.Session[SessionKeys.CatchaSum] = null;
            if (!(captchaSum == txtCaptchaSUM.Text))
            {
                ShowMessage("", GetSageMessage("UserRegistration", "EnterTheCorrectCapchaCode"), "", SageMessageType.Error);
                txtSuccessMessageforcontact.Text = "<span class='errorMessage'><i class='fa fa-times' aria-hidden='true'></i>" + GetSageMessage("UserRegistration", "EnterTheCorrectCapchaCode") + "</span>";
                GenerateRandomSum();
                return false;
            }
            else
            {
                return true;
            }
        }

        protected void btnSubmitButton_Click(object sender, EventArgs e)
        {
            //txtSuccessMessage.Text = string.Empty;
            bool testValid = ValidateSum();
            if (testValid)
            {
                Submit();
                GenerateRandomSum();

            }
        }

        public void Submit()
        {
            try
            {
                string name = txtName.Text.Trim();
                string email = txtContactEmail.Text.Trim();
                string subject = GetSageMessage("ContactUs", "ContactUsEmailSubject");
                string message = txtMessage.Text.Trim();
                bool isActive = true;
                int portalID = GetPortalID;
                string addedBy = GetUsername;
                ContactUsController contactController = new ContactUsController();
                contactController.ContactUsAdd(name, email, subject, message, isActive, portalID, addedBy);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                //throw ex;
            }
            finally
            {
                string successMessage = emailSucessMsg;
                txtSuccessMessageforcontact.Text = "<span class='successMessage'><i class=\"fa fa-check\"></i>" + GetSageMessage("ContactUs", "ContactUsIsAddedSuccessfully") + "<i class=\"fa fa-times closethis\"></i></span>";
                ClearFields();
            }
        }

        private void ClearFields()
        {
            txtName.Text = string.Empty;
            txtContactEmail.Text = string.Empty;
            txtMessage.Text = string.Empty;
        }
    }
}