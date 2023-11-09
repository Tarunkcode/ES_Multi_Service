using es_url_shortner.data_access.Model.Domain;
using es_url_shortner.service.IRepository;
using es_url_shortner.utility.Utilities;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Threading.Tasks;


using System.Numerics;
using SixLabors.Fonts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Drawing.Processing;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.PixelFormats;

namespace es_url_shortner.service.Repository
{
   public class Captcha : ICaptcha
    {
        private string captchaStr;
        public string GenerateCaptchaCode()
        {
            try
            {
                this.captchaStr = CaptchaUtility.GenerateCaptchaCodeX(6);
             
                return captchaStr;
            }
            catch (Exception ex)
            {
                string msg = ex.Message.ToString();
                return msg;
            }
        }

        public string TextToImageCaptcha(string text)
        {
       
            byte[] byt = Encoding.UTF8.GetBytes(text);

           
            Font font = SystemFonts.CreateFont("Arial", 75);
            //SolidBrush brush = new SolidBrush(SixLabors.ImageSharp.Color.Black);
            SixLabors.ImageSharp.PointF textPosition = new SixLabors.ImageSharp.PointF(100, 100);
            //Rgba32 lineColor = Rgba32.ParseHex("#ffff");
            Rgba32 textColor = Rgba32.ParseHex("#000f");

          

            using (var image = new Image<Rgba32>(400, 200))
            {

                image.Mutate(ctx => ctx.DrawText(text, font, textColor, textPosition ));
              
              
                image.Save("output.png");

                byte[] imageBytes = File.ReadAllBytes("output.png");

                // Convert the image bytes to a Base64 string
                string base64String = Convert.ToBase64String(imageBytes);
               
                return base64String;
            }



        }
    }
}
