using System.Web.UI;
using System.Web.UI.HtmlControls;
namespace SageFrame.Common.Helper
{
    public class MetaTagHelper
    {


       /// <summary>
       /// 
       /// </summary>
       /// <param name="contentTitle"></param>
       /// <param name="shortDescription"></param>
       /// <param name="imageUrl"></param>
       /// <param name="contentType"></param>
       /// <param name="page"></param>
        private void AddUpdateMetaTag(string contentTitle, string shortDescription, string imageUrl, string contentType, Page page)
        {
            // suppose all meta are not present 
            bool ogTitle = false, ogDescription = false, ogImage = false, TwitterTitle = false, TwitterDescription = false, TwitterImage = false, Title = false, Description = false, Image = false, OGTYPE = false, TWITTERCARD = false, TYPE = false;
            ControlCollection cntrlColl = page.Header.Controls;
            int controlsLength = cntrlColl.Count;
            for (int i = 0; i < controlsLength; i++)
            {
                Control controls = cntrlColl[i];
                if (controls.GetType() == typeof(HtmlMeta))
                {
                    HtmlMeta meta = (HtmlMeta)controls;
                    AttributeCollection attColl = meta.Attributes;
                    string property = string.Empty;
                    if (attColl["property"] != null)
                        property = attColl["property"].ToString();
                    //for Og tag
                    if (!string.IsNullOrEmpty(property))
                    {
                        switch (property)
                        {
                            case "og:title":
                                meta.Content = contentTitle;
                                ogTitle = true;
                                break;
                            case "og:description":
                                meta.Content = shortDescription;
                                ogDescription = true;
                                break;
                            case "og:image":
                                meta.Content = imageUrl;
                                ogImage = true;
                                break;
                            case "og:type":
                                meta.Content = contentType;
                                OGTYPE = true;
                                break;
                        }
                    }

                    switch (meta.Name)
                    {
                        // for twitter
                        case "twitter:title":
                            meta.Content = contentTitle;
                            TwitterTitle = true;
                            break;
                        case "twitter:description":
                            meta.Content = shortDescription;
                            TwitterDescription = true;
                            break;
                        case "twitter:image":
                            meta.Content = imageUrl;
                            TwitterImage = true;
                            break;
                        //for normal
                        case "title":
                            meta.Content = contentTitle;
                            Title = true;
                            break;
                        case "description":
                            meta.Content = shortDescription;
                            Description = true;
                            break;
                        case "image":
                            meta.Content = imageUrl;
                            Image = true;
                            break;
                        case "twitter:card":
                            meta.Content = contentType;
                            TWITTERCARD = true;
                            break;
                        case "type":
                            meta.Content = contentType;
                            TYPE = true;
                            break;

                    }
                }
            }
            if (!ogTitle)
            {
                AppendMeta(id, "OGTITLE", "property", "og:title", contentTitle, cntrlColl);
            }
            if (!ogDescription)
            {
                AppendMeta(id, "OGDESCRIPTION", "property", "og:description", shortDescription, cntrlColl);
            }
            if (!ogImage)
            {
                AppendMeta(id, "OGIMAGE", "property", "og:image", imageUrl, cntrlColl);
            }
            if (!TwitterTitle)
            {
                AppendMeta(id, "TWITTERTITLE", name, "twitter:title", contentTitle, cntrlColl);
            }
            if (!TwitterDescription)
            {
                AppendMeta(id, "TWITTERDESCRIPTION", name, "twitter:description", shortDescription, cntrlColl);
            }
            if (!TwitterImage)
            {
                AppendMeta(id, "TWITTERIMAGE", name, "twitter:image", imageUrl, cntrlColl);
            }
            if (!Title)
            {
                AppendMeta(id, "TITLE", name, "title", contentTitle, cntrlColl);
            }
            if (!Description)
            {
                AppendMeta(id, "DESCRIPTION", name, "description", shortDescription, cntrlColl);
            }
            if (!Image)
            {
                AppendMeta(id, "IMAGE", name, "image", imageUrl, cntrlColl);
            }
            if (!OGTYPE)
            {
                AppendMeta(id, "OGTYPE", "property", "og:type", contentType, cntrlColl);
            }
            if (!TWITTERCARD)
            {
                AppendMeta(id, "TWITTERCARD", name, "twitter:card", contentType, cntrlColl);
            }
            if (!TYPE)
            {
                AppendMeta(id, "TYPE", name, "type", contentType, cntrlColl);
            }
            page.Title = contentTitle;
        }
        const string id = "id";
        const string name = "name";
        const string property = "property";

        private void AppendMeta(string metaIDKey, string metaIDValue, string metaNameKey, string metaNameValue, string content, ControlCollection cntrlColl)
        {
            HtmlMeta meta = new HtmlMeta();
            meta.Attributes.Add(metaIDKey, metaIDValue);
            meta.Attributes.Add(metaNameKey, metaNameValue);
            meta.Content = content;
            cntrlColl.Add(meta);
        }
    }
}
