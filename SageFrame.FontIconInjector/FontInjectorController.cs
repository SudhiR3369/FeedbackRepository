using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace SageFrame.FontIconInjector
{
    public class FontInjectorController
    {
        public List<string> GetAllfontList()
        {
            MatchCollection matches = GetFontMatchesList();
            int len = matches.Count;
            StringBuilder html = new StringBuilder();
            List<string> objListFontClasses = new List<string>();
            for (int i = 0; i < len; i++)
            {
                objListFontClasses.Add(matches[i].ToString().Replace(":before", string.Empty));
            }
            return objListFontClasses;
        }

        public MatchCollection GetFontMatchesList()
        {
            string cssFilePath = HttpContext.Current.Server.MapPath("~/") + "Administrator/Templates/Default/css/font-awesome.min.css";
            string fontAwesome = System.IO.File.ReadAllText(cssFilePath);
            string value = ("fa(-[a-z]{1,20}){0,1}(-[a-z]{1,20}){0,1}(-[a-z]{0,20}){0,1}:before");
            return Regex.Matches(fontAwesome, value);
        }
        public string GetFontDOM()
        {
            MatchCollection matches = GetFontMatchesList();
            int len = matches.Count;
            StringBuilder html = new StringBuilder();
            for (int i = 0; i < len; i++)
            {
                string fontClass = matches[i].ToString().Replace(":before", string.Empty);
                html.Append("<li>");
                html.Append("<i class='fa ");
                html.Append(fontClass);
                html.Append("' data-class='");
                html.Append(fontClass);
                html.Append("'></i>");
                html.Append("</li>");
            }
            return html.ToString();
        }
    }
}
