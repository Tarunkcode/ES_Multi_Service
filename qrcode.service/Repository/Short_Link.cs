
using es_url_shortner.data_access.Model.Domain;
using excellentsoftwares_short_url.app.Migrations;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es_url_shortner.service.Repositories
{
    public class Short_Link : IShortLink
    {
        public readonly url_shortnerContext _db;
        public Short_Link(url_shortnerContext db)
        {
            _db = db;
        }
        public async Task<int> CreateShortLinks(string name,string path,string dest_url,string dom_url )
        {
            int iResult=0;
            string msg="";



            string sql = "exec sp_Sale_Link '" + name + "','" + path + "','" + dest_url + "','" + dom_url + "','" + iResult + "','" + msg + "'";
            var result = await _db.Database.ExecuteSqlRawAsync(sql);



            return int.Parse(result.ToString());
        }


        public async Task<IEnumerable<LinksDatum>> FetchAllLinksDetails()
        {
            return await _db.LinksData.ToListAsync();
        }
    }
}