using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace es_url_shortner.data_access.Model.Domain
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int srno { get; set; }
 
        public string userId { get; set; }
        public string uName { get; set; }
        public string email { get; set; }
        public string phoneNo { get; set; }
        public string password { get; set; }
        public bool isCaptchaEnable { get; set; }
    }
}
