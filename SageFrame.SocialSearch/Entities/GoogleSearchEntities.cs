using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SageFrame.SocialSearch.Entities.GoogleSearch
{
    public class Image
    {
        public string url { get; set; }
    }

    public class Verification
    {
        public string adHocVerified { get; set; }
    }

    public class Actor
    {
        public string id { get; set; }
        public string displayName { get; set; }
        public string url { get; set; }
        public Image image { get; set; }
        public Verification verification { get; set; }
    }

    public class Verification2
    {
        public string adHocVerified { get; set; }
    }

    public class Actor2
    {
        public Verification2 verification { get; set; }
    }

    public class Replies
    {
        public int totalItems { get; set; }
        public string selfLink { get; set; }
    }

    public class Plusoners
    {
        public int totalItems { get; set; }
        public string selfLink { get; set; }
    }

    public class Resharers
    {
        public int totalItems { get; set; }
        public string selfLink { get; set; }
    }

    public class Image2
    {
        public string url { get; set; }
        public string type { get; set; }
        public int height { get; set; }
        public int width { get; set; }
    }

    public class FullImage
    {
        public string url { get; set; }
        public string type { get; set; }
    }

    public class Attachment
    {
        public string objectType { get; set; }
        public string displayName { get; set; }
        public string content { get; set; }
        public string url { get; set; }
        public Image2 image { get; set; }
        public FullImage fullImage { get; set; }
    }

    public class Object
    {
        public string objectType { get; set; }
        public Actor2 actor { get; set; }
        public string content { get; set; }
        public string url { get; set; }
        public Replies replies { get; set; }
        public Plusoners plusoners { get; set; }
        public Resharers resharers { get; set; }
        public List<Attachment> attachments { get; set; }
    }

    public class Provider
    {
        public string title { get; set; }
    }

    public class Item2
    {
        public string type { get; set; }
    }

    public class Access
    {
        public string kind { get; set; }
        public string description { get; set; }
        public List<Item2> items { get; set; }
    }

    public class Item
    {
        public string kind { get; set; }
        public string etag { get; set; }
        public string title { get; set; }
        public string published { get; set; }
        public string updated { get; set; }
        public string id { get; set; }
        public string url { get; set; }
        public Actor actor { get; set; }
        public string verb { get; set; }
        public Object @object { get; set; }
        public Provider provider { get; set; }
        public Access access { get; set; }
    }

  
}
