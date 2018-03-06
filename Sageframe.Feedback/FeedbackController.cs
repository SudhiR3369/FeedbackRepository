﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sageframe.Feedback
{
   public class FeedbackController
    {
        public void Insert(FeedbackDetails data)
        {
            FeedbackProvider FD = new FeedbackProvider();
            FD.Insert(data);

        }
        public List<FeedbackDetails> GetAllFeedbacks(FeedbackDetails obj)
        {
            FeedbackProvider FP = new FeedbackProvider();
            return FP.GetAllFeedbacks(obj);
        }
    }
}
