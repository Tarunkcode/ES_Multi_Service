using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace es_url_shortner.data_access.Model.Domain
{

    public partial class LinksDatum
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LinkId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string DestinationUrl { get; set; }
        public string DomainUrl { get; set; }
    }
}
