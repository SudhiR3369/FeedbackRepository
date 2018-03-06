using SageFrame.Common.Extensions.String;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace SageFrame.Common.Extensions
{
    public class FileParser
    {

        /// <summary>
        /// Combines contents of multiple files into one single string
        /// </summary>
        /// <param name="filePaths"></param>
        /// <param name="separator"></param>
        /// <returns></returns>
        public string CombileContents(char separator = ',', bool skipErrorFiles = false, params string[] filePaths)
        {
            StringBuilder fullContent = new StringBuilder();

            try
            {
                if (filePaths == null || filePaths.Length <= 0) throw new Exception("Invalid file path");

                string currentContent = string.Empty;

                foreach (var filePath in filePaths)
                {
                    if (File.Exists(filePath))
                    {
                        currentContent = File.ReadAllText(filePath).Trim();

                        if (!string.IsNullOrEmpty(currentContent))
                        {
                            fullContent.Append(currentContent).Append(separator);
                            currentContent = string.Empty;
                        }
                    }
                    else
                    {
                        if (!skipErrorFiles) throw new Exception("Invalid file path: " + filePath);
                    }
                }

                string content = fullContent.ToString();

                content = content.TrimEnd(',');
                return content;
            }
            catch
            {
                return string.Empty;
            }
        }



        


        /// <summary>
        /// [ Customized ] : Combines contents of multiple files into one single string 
        /// </summary>
        /// <param name="separator"></param>
        /// <param name="skipErrorFiles"></param>
        /// <param name="filePaths"></param>
        /// <returns></returns>
        public string CombineContentsInBetween(char separator = ',', bool skipErrorFiles = false, params string[] filePaths)
        {
            StringBuilder fullContent = new StringBuilder();

            try
            {
                if (filePaths == null || filePaths.Length <= 0) throw new Exception("Invalid file path");

                string currentContent = string.Empty;

                foreach (var filePath in filePaths)
                {
                    if (File.Exists(filePath))
                    {

                        IEnumerable<string> totalLines = File.ReadLines(filePath);

                        if (totalLines != null && totalLines.Count() > 0)
                        {
                            totalLines = totalLines.Skip(1).Take(totalLines.Count() - 2);
                            currentContent = string.Join("", totalLines).Trim().TrimEnd(',');
                            fullContent.Append(currentContent).Append(separator);
                            currentContent = string.Empty;

                        }
                      
                    }
                    else
                    {
                        if (!skipErrorFiles) throw new Exception("Invalid file path: " + filePath);
                    }
                }

                string content = fullContent.ToString();

                content = content.TrimEnd(',');
                return content;
            }
            catch
            {
                return string.Empty;
            }
        }


    
    }
}
