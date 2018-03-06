using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using SageFrame.Framework;
using SageFrame.Common;

namespace SageFrame.Captcha
{
  public  class CaptchaController
    {
        private Random random = new Random();

        public void GenerateCaptcha()
        {
            HttpContext httpContext = HttpContext.Current;
            int firstInt = GenerateRandomCode(0, 10);
            int secondInt = GenerateRandomCode(11, 20);
            int sum = firstInt + secondInt;
            string CapStr = firstInt.ToString() + " + " + secondInt.ToString();
            httpContext.Session[SessionKeys.CaptchaImageText] = CapStr;
            httpContext.Session[SessionKeys.CatchaSum] = sum;
        }
        public bool ValidedCaptcha(string InputCaptchaText)
        {
            string captchaText = string.Empty;
            HttpContext httpContext = HttpContext.Current;
            if (httpContext.Session[SessionKeys.CatchaSum] != null)
            {
                captchaText = httpContext.Session[SessionKeys.CatchaSum].ToString();
            }
            if (!string.IsNullOrEmpty(InputCaptchaText) && InputCaptchaText == captchaText)
            {
                httpContext.Session.Remove(SessionKeys.CaptchaImageText);
                httpContext.Session.Remove(SessionKeys.CatchaSum);
                return true;
            }
            else
            {
                GenerateCaptcha();
                return false;
            }
        }
        private int GenerateRandomCode(int min, int max)
        {
            return this.random.Next(min, max);
        }

    }

}
