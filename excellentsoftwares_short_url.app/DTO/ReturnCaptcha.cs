using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace excellentsoftwares_short_url.app.DTO
{
    public class ReturnCaptcha
    {
        public string captchaBase64 { get; set; }
        public string accesskey { get; set; }
        public string err { get; set; }
    }
}
