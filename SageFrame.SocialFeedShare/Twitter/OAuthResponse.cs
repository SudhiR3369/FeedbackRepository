using System;
using System.Collections.Generic;

namespace SageFrame.TwitterAPI
{
    /// <summary>
    /// A Class to hold an OAuth Response
    /// </summary>
    public class OAuthResponse
    {
        /// <summary>
        ///   All of the text in the response. This is useful if the app wants
        ///   to do its own parsing.
        /// </summary>
        public string AllText { get; set; }
        private Dictionary<String, String> _params;


        /// <summary>
        ///   A Dictionary of response parameters.
        /// </summary>
        public string this[string ix] { get { return _params[ix]; } }



        public OAuthResponse(string alltext)
        {
            AllText = alltext;
            _params = new Dictionary<String, String>();
            var kvpairs = alltext.Split('&');
            foreach (var pair in kvpairs)
            {
                var kv = pair.Split('=');
                _params.Add(kv[0], kv[1]);
            }
            // expected keys:
            //   oauth_token, oauth_token_secret, user_id, screen_name, etc
        }
    }
}
