using es_url_shortner.service.IRepository;
using es_url_shortner.utility.Utilities;
using QRCoder;
using System;
using System.Collections.Generic;

using System.Text;
using System.Threading.Tasks;
//using ;
namespace es_url_shortner.service.Repository
{
    public class QrService : IQrService
    {
       public async Task<string> GenerateQr(string qrText)
        {
            QRCodeData qrCodeData;
            using (QRCodeGenerator qrGenerator = new QRCodeGenerator())
            {
                qrCodeData = qrGenerator.CreateQrCode(qrText, QRCodeGenerator.ECCLevel.Q);
            }

            // Image Format
            var imgType = Base64QRCode.ImageType.Png;

            var qrCode = new Base64QRCode(qrCodeData);
            //Base64 Format
            string qrCodeImageAsBase64 = qrCode.GetGraphic(20, SixLabors.ImageSharp.Color.DeepPink.ToString(), SixLabors.ImageSharp.Color.White.ToString(), true, imgType);

            string QrUri = $"data:image/{imgType.ToString().ToLower()};base64,{qrCodeImageAsBase64}";

            return QrUri;
        }
    }
}
