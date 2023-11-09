using es_url_shortner.data_access.Model.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es_url_shortner.service.Repositories
{
    public interface IShortLink
    {
        Task <int> CreateShortLinks(string name, string path, string dest_url, string dom_url);

        Task<IEnumerable<LinksDatum>> FetchAllLinksDetails();
    }
}
