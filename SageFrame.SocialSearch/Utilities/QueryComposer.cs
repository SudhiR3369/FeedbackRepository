
using SageFrame.SocialSearch.Entities;

namespace SageFrame.SocialSearch.Utilities
{
    public class QueryComposer
    {


        public static string ComposeQuery(QueryInfo queryInfo)
        {
            string query = string.Empty;
            if (queryInfo != null)
            {
                if (queryInfo.Containing != null && queryInfo.Containing.Length > 0)
                    query += MultiplexWords(queryInfo.Containing, "OR") + " ";

                if (queryInfo.NotContaining != null && queryInfo.NotContaining.Length > 0)
                    query += PreAppendWords(queryInfo.NotContaining, "-") + " ";

                if (queryInfo.HashTags != null && queryInfo.HashTags.Length > 0)
                    query += MultiplexWords(queryInfo.HashTags, "OR") + " ";

                if (queryInfo.Emoticons != null && queryInfo.Emoticons.Length > 0)
                    query += MultiplexWords(queryInfo.Emoticons, string.Empty) + " ";

                if (queryInfo.IncludeRetweets)
                    query += "include:retweets ";
            }
            return query.Trim();

        }

        /// <summary>
        /// Concatinate words separated by the operateOn into a single string
        /// </summary>
        /// <param name="words"></param>
        /// <param name="operateOn"></param>
        /// <returns></returns>
        public static string MultiplexWords(string[] words, string operateOn = "OR")
        {
            try
            {
                string output = string.Empty;
                operateOn = $" {operateOn.Trim() } ";

                if (words != null && words.Length > 0)
                {
                    foreach (string word in words)
                        if (word != null)
                        {
                            string name = word.Trim();
                            if (name != string.Empty)
                                output += name + operateOn;
                        }
                    output = output.Remove(output.Length - operateOn.Length, operateOn.Length) + " ";
                }
                return output.Trim();
            }
            catch (System.Exception)
            {
                return string.Empty;
            }
        }


        /// <summary>
        /// Pre append the word array with a delimeter into a single sentence
        /// </summary>
        /// <param name="words">"A","B","C"</param>
        /// <param name="operateOn">"-"</param>
        /// <returns>"-A -B -C"</returns>
        public static string PreAppendWords(string[] words, string operateOn = "-")
        {
            try
            {
                string output = string.Empty;
                operateOn = $" {operateOn.Trim() }";

                if (words != null && words.Length > 0)
                {
                    foreach (string word in words)
                        if (!string.IsNullOrEmpty(word))
                        {
                            string name = word.Trim();
                            if (name != string.Empty)
                                output += operateOn + name.Trim();
                        }
                    //output = output.Remove(output.Length - operateOn.Length, operateOn.Length) + " ";
                }
                return output.Trim();
            }
            catch (System.Exception)
            {
                return string.Empty;
            }
        }


    }
}
