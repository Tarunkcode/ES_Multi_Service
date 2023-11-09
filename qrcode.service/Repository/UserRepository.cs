using es_url_shortner.data_access.Model.Domain;
using es_url_shortner.service.IRepository;
using excellentsoftwares_short_url.app.Migrations;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es_url_shortner.service.Repository
{
    public class UserRepository : IUser
    {
        private readonly url_shortnerContext _context;
        public UserRepository (url_shortnerContext context)
        {
            _context = context;
        }
        public async Task<bool> AddUserAsync(User details)
        {
            await _context.UserTable.AddAsync(details);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
