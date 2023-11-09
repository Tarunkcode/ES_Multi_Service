using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es_url_shortner.service.IRepository
{
    public interface IQrService
    {
       public Task<string> GenerateQr(string qrText);
    }
}
