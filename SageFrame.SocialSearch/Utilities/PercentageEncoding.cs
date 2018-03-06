///
///    SOURCE : http://cropperplugins.codeplex.com/SourceControl/changeset/view/72088#1710422
///

using System;
using System.Collections.Generic;
using System.Text;

namespace SageFrame.SocialSearch.Utilities
{
    public class PercentageEncoding
    {

        /// <summary>
        /// Internal function to extract from a URL all query string
        /// parameters that are not related to oauth - in other words all
        /// parameters not begining with "oauth_".
        /// </summary>
        ///
        /// <remarks>
        ///   <para>
        ///     For example, given a url like http://foo?a=7&guff, the
        ///     returned value will be a Dictionary of string-to-string
        ///     relations.  There will be 2 entries in the Dictionary: "a"=>7,
        ///     and "guff"=>"".
        ///   </para>
        /// </remarks>
        ///
        /// <param name="queryString">The query string part of the Url</param>
        ///
        /// <returns>A Dictionary containing the set of
        /// parameter names and associated values</returns>
        public static Dictionary<String, String> ExtractQueryParameters(string queryString)
        {
            if (queryString.StartsWith("?"))
                queryString = queryString.Remove(0, 1);

            var result = new Dictionary<String, String>();

            if (string.IsNullOrEmpty(queryString))
                return result;

            foreach (string s in queryString.Split('&'))
            {
                if (!string.IsNullOrEmpty(s) && !s.StartsWith("oauth_"))
                {
                    if (s.IndexOf('=') > -1)
                    {
                        string[] temp = s.Split('=');
                        result.Add(temp[0], temp[1]);
                    }
                    else
                        result.Add(s, string.Empty);
                }
            }

            return result;
        }




        /// <summary>
        ///   This is an oauth-compliant Url Encoder.  The default .NET
        ///   encoder outputs the percent encoding in lower case.  While this
        ///   is not a problem with the percent encoding defined in RFC 3986,
        ///   OAuth (RFC 5849) requires that the characters be upper case
        ///   throughout OAuth.
        ///   
        ///   As per OAuth Core 1.0 Characters in the unreserved character set MUST NOT be encoded
        ///   UNRESERVED = ALPHA, DIGIT, '-', '.', '_', '~'
        /// </summary>
        ///
        /// <param name="value">The value to encode</param>
        ///
        /// <returns>the Url-encoded version of that string</returns>
        public static string EncodeURL(string value)
        {
            string unreservedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

            var result = new System.Text.StringBuilder();
            foreach (char symbol in value)
            {
                if (unreservedChars.IndexOf(symbol) != -1)
                    result.Append(symbol);
                else
                    result.Append('%' + String.Format("{0:X2}", (int)symbol));
            }
            return result.ToString();
        }


        public static string EncodeParameters(Dictionary<string, string> parameters)
        {
            if (parameters.Count == 0)
                return string.Empty;
            Dictionary<string, string>.KeyCollection.Enumerator keys = parameters.Keys.GetEnumerator();
            keys.MoveNext();
            StringBuilder sb = new StringBuilder(
                string.Format("{0}={1}", keys.Current, Uri.EscapeDataString(parameters[keys.Current])));
            while (keys.MoveNext())
                sb.AppendFormat("&{0}={1}", keys.Current, Uri.EscapeDataString(parameters[keys.Current]));
            return sb.ToString();
        }


    }
}
