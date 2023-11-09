using System;

using System.Text;

namespace es_url_shortner.utility.Utilities
{
    public static class CaptchaUtility
    {
        public static string GenerateCaptchaCodeX(int n)
        {
            Random rand = new Random();

            // Characters to be included
            string chrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            // Generate n characters from above set and
            // add these characters to captcha.
            StringBuilder captcha = new StringBuilder();
            while (n-- > 0)
            {
                int index = rand.Next(62);
                captcha.Append(chrs[index]);
            }

            return captcha.ToString();
        }

   
    }
}
