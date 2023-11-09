using es_url_shortner.data_access.Model.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace es_url_shortner.service.IRepository
{
    public interface IUser
    {
       Task<bool> AddUserAsync(User details);
    }
}
