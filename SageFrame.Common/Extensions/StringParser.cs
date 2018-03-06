
using System;
using System.Collections.Generic;
using System.Linq;
///
/// Description              : Manipulate string contents
/// ----------------------------------------------------------
/// Developer                : Ozesh Thapa
/// Date Created             : Oct 20, 2016
/// ----------------------------------------------------------
/// Last Modified On         : Oct 20, 2016
/// Last Change Description  : Get and Remove content extensions added
///
namespace SageFrame.Common.Extensions.String
{

    public enum ExtractionType { FirstOccurance, All };



    public static class StringParser
    {

        /// <summary>
        /// Take Last N items
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="N"></param>
        /// <returns></returns>
        public static IEnumerable<T> TakeLast<T>(this IEnumerable<T> source, int N)
        {
            return source.Skip(Math.Max(0, source.Count() - N));
        }

        public static IEnumerable<T> TakeFirst<T>(this IEnumerable<T> source, int N)
        {
            return source.Take(N);
        }



        public static string GetSurrounding(this string sentence, string word, int wordCount)
        {
            int containedWordCount = sentence.WordCount();

            int firstHalf = 0;
            int secondHalf = 0;

            if (wordCount >= containedWordCount)
                wordCount = containedWordCount;

            wordCount += 1;
            firstHalf = wordCount / 2;
            secondHalf = firstHalf;
            int rem = wordCount % 2;
            if (rem > 0)
                firstHalf += rem;


            string beforeWithCount = sentence.GetBefore(word, firstHalf, includeWord: true);
            string afterWithCount = sentence.GetAfter(word, secondHalf, includeWord: false);

            return beforeWithCount + afterWithCount;
        }



        #region Get Sentence Before a Word or Position

        /// <summary>
        /// Get substring before the given position
        /// </summary>
        /// <param name="sentence"></param>
        /// <param name="position"></param>
        /// <returns></returns>
        public static string GetBefore(this string sentence, int position)
        {
            string extractedString = string.Empty;
            if (!string.IsNullOrEmpty(sentence))
            {
                if (position > 0 && position < sentence.Length)
                    extractedString = sentence.Substring(0, position);
            }

            return extractedString;
        }



        /// <summary>
        /// Get substring before the given position
        /// </summary>
        /// <param name="sentence">The sentence to process</param>
        /// <param name="word"></param>
        /// <param name="wordCount">Number of words to extract</param>
        /// <param name="includeWord">Include the word itself</param>
        /// <returns></returns>
        public static string GetBefore(this string sentence, string word, int wordCount, bool includeWord = false)
        {
            int containedWordCount = sentence.WordCount();

            if (wordCount >= containedWordCount)
                wordCount = containedWordCount;

            string extractedString = sentence.GetBefore(word, includeWord);

            if (!string.IsNullOrEmpty(extractedString))
            {

                string[] arrayWords = extractedString.SplitSentence();
                int containedCount = arrayWords.Length;
                if (containedCount < wordCount)
                    wordCount = containedCount;
                IEnumerable<string> lstWords = arrayWords.TakeLast(wordCount);

                extractedString = string.Join(" ", lstWords.ToArray());
            }

            return extractedString;



        }


        /// <summary>
        /// Get substring before the given word
        /// </summary>
        /// <param name="sentence"></param>
        /// <param name="word"></param>
        /// <param name="includeWord"></param>
        /// <returns></returns>
        public static string GetBefore(this string sentence, string word, bool includeWord = false)
        {
            string afterText = string.Empty;

            List<int> lstPositions = sentence.GetWordPositions(word, ExtractionType.FirstOccurance);

            if (lstPositions != null && lstPositions.Count > 0)
            {
                if (lstPositions[0] > 0)
                {
                    afterText = sentence.GetBefore(lstPositions[0]);

                    if (includeWord)
                        afterText += word;
                }
            }
            return afterText;

        }


        #endregion


        #region Get Sentence After a Word or Position

        public static string GetAfter(this string sentence, int position)
        {
            string extractedString = string.Empty;
            if (!string.IsNullOrEmpty(sentence))
            {
                if (position >= 0 && position < sentence.Length)
                    extractedString = sentence.Substring(position, sentence.Length - position);
            }
            return extractedString;
        }

        public static string GetAfter(this string sentence, string word, bool includeWord = true)
        {
            string afterText = string.Empty;

            List<int> lstPositions = sentence.GetWordPositions(word, ExtractionType.FirstOccurance);

            if (lstPositions != null && lstPositions.Count > 0)
            {
                if (lstPositions[0] > 0)
                {
                    afterText = sentence.GetAfter(lstPositions[0]);

                    if (!includeWord)
                        afterText = afterText.Substring(word.Length);

                }
            }
            return afterText;
        }


        public static string GetAfter(this string sentence, string word, int wordCount, bool includeWord = true)
        {
            int containedWordCount = sentence.WordCount();

            if (wordCount >= containedWordCount)
                wordCount = containedWordCount;

            string extractedString = sentence.GetAfter(word, includeWord);

            if (!string.IsNullOrEmpty(extractedString))
            {
                string[] arrayWords = extractedString.SplitSentence();
                int containedCount = arrayWords.Length;
                if (containedCount < wordCount)
                    wordCount = containedCount;

                IEnumerable<string> lstWords = arrayWords.TakeFirst(wordCount);

                extractedString = string.Join(" ", lstWords.ToArray());
            }
            return extractedString;
        }



        #endregion


        /// <summary>
        /// Get content including the two parameters
        /// </summary>
        /// <param name="content">String content</param>
        /// <param name="startString">Starting parameter</param>
        /// <param name="endString">Ending parameter</param>
        /// <returns></returns>
        public static string GetIncluding(this string content, string startString, string endString)
        {
            int Start, End;
            if (content.Contains(startString) && content.Contains(endString))
            {
                Start = content.IndexOf(startString, 0);
                End = content.IndexOf(endString, Start) + endString.Length;
                return content.Substring(Start, End - Start);
            }
            else
            {
                return "";
            }
        }



        /// <summary>
        /// Count the number of words in a sentence
        /// </summary>
        /// <param name="sentence">Sentence or paragraph</param>
        /// <returns>Number of words</returns>
        public static int WordCount(this string sentence)
        {
            if (!string.IsNullOrEmpty(sentence.Trim()))
                return sentence.SplitSentence().Length;
            else
                return 0;
        }


        public static string[] SplitSentence(this string sentence)
        {
            char[] delimiters = new char[] { ' ', '\r', '\n' };
            return sentence.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);
        }


        /// <summary>
        /// Get list of positions of the specified word
        /// </summary>
        /// <param name="sentence"></param>
        /// <param name="word"></param>
        /// <returns>List of positions</returns>
        public static List<int> GetWordPositions(this string sentence, string word, ExtractionType extractionType = ExtractionType.All)
        {
            int pos = 0;
            List<int> lstCount = new List<int>();

            bool enableBreak = false;
            if (extractionType == ExtractionType.FirstOccurance)
                enableBreak = true;

            while ((pos < sentence.Length) && (pos = sentence.IndexOf(word, pos)) > -1)
            {
                lstCount.Add(pos);
                pos += word.Length;
                if (enableBreak)
                    break;
            }
            return lstCount;
        }


        /// <summary>
        /// Get the content between thw two paramters
        /// </summary>
        /// <param name="content">String content</param>
        /// <param name="startString">Starting content</param>
        /// <param name="endString">Ending content</param>
        /// <returns></returns>
        public static string GetBetween(this string content, string startString, string endString)
        {
            int Start, End;
            if (content.Contains(startString) && content.Contains(endString))
            {
                Start = content.IndexOf(startString, 0) + startString.Length;
                End = content.IndexOf(endString, Start);
                return content.Substring(Start, End - Start);
            }
            else
                return "";
        }




        /// <summary>
        /// Removes the content between two parameters
        /// </summary>
        /// <param name="content">String content</param>
        /// <param name="startString">Starting parameter</param>
        /// <param name="endString">Ending parameter</param>
        /// <returns></returns>
        public static string RemoveBetween(this string content, string startString, string endString)
        {
            int Start, End;
            if (content.Contains(startString) && content.Contains(endString))
            {
                Start = content.IndexOf(startString, 0) + startString.Length;
                End = content.IndexOf(endString, Start);
                return content.Remove(Start, End - Start);
            }
            else
                return "";
        }




        /// <summary>
        /// Remove the contents including the two starting and ending parameters
        /// </summary>
        /// <param name="content"></param>
        /// <param name="startString">Starting parameter</param>
        /// <param name="endString">Ending parameter</param>
        /// <returns></returns>
        public static string RemoveIncluding(this string content, string startString, string endString)
        {
            int Start, End;
            if (content.Contains(startString) && content.Contains(endString))
            {
                Start = content.IndexOf(startString, 0);
                End = content.IndexOf(endString, Start) + endString.Length;
                return content.Remove(Start, End - Start);
            }
            else
            {
                return "";
            }
        }




        /// <summary>
        /// Remove the last character from a string
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string TrimLastCharacter(this string str)
        {
            if (string.IsNullOrEmpty(str))
                return str;
            else
                return str.TrimEnd(str[str.Length - 1]);
        }


    }
}
