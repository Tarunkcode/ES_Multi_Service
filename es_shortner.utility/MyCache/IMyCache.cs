using System;
using System.Collections.Generic;
using System.Text;

namespace es_url_shortner.utility.MyCache
{
    public interface IMyCache
    {
        bool Add(object key, object value);
        bool AddOrUpdate(object key, object value);
        object Get(object key);
        bool Remove(object key);
        void Clear();
    }
}
