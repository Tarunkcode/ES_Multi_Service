using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es_url_shortner.data_access.Model.DTO
{
    public class Add_Short_Links
    {
        public int LinkId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string DestinationUrl { get; set; }
        public string DomainUrl { get; set; }
    }
}
