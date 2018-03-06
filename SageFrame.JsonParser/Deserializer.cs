using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace SageFrame.JsonParser
{
    public class Deserializer
    {

        /// <summary>
        /// Deserialize JSON data as a dynamic content
        /// </summary>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        public static dynamic DeserializeJSON(string jsonData)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Deserialize<dynamic>(jsonData);
        }


        /// <summary>
        /// Deserialize JSON Object based on the JSON Object Key
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="jsonData"></param>
        /// <returns></returns>
        public static T DeserializeJSON<T>(string key,string jsonData)
        {
            JArray jarray = (JArray)JObject.Parse(jsonData)[key];
            return jarray.ToObject<T>();
        }


        public static T DeserializeJSON<T>(string jsonData)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Deserialize<T>(jsonData);
        }


        public static void ParseJSON(string jsonData)
        {
            JArray blogPostArray = JArray.Parse(jsonData);
        }




  


      



        public static T DeserializeObject<T>(string jsonData)
        { return JsonConvert.DeserializeObject<T>(jsonData); }
    }
}
