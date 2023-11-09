using es_url_shortner.utility.MyCache;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace es_url_shortner.utility.Utilities
{
    public class SingletonCache : IMyCache
    {
        //Shared resource that needs protection in a Multithreaded Environment
        //ConcurrentDictionary Collection is Thread-Safe
        private ConcurrentDictionary<object, object> concurrentDictionary = new ConcurrentDictionary<object, object>();
        //This variable is going to store the Singleton Instance
        //Initializing the Variable at the time of class start-up 
        //and make it ready to be used in the Future
        private static readonly SingletonCache singletonInstance = new SingletonCache();
        //The following Static Method is going to return the Singleton Instance
        //This is Thread-Safe as it uses Eager Loading
        public static SingletonCache GetInstance()
        {
            return singletonInstance;
        }
        //Constructor needs to be Private in order to restrict 
        //class instantiation from Outside of this class
        private SingletonCache()
        {
            Console.WriteLine("SingletonCache Instance Created");
        }
        //The following methods can be accessed from outside of the class by using the Singleton Instance

        //This method is used to add a Key-Value Pair into the Cache
        public bool Add(object key, object value)
        {
            return concurrentDictionary.TryAdd(key, value);
        }
        //This method is used to add or update a Key-Value Pair into the Cache
        //If the Key is not available then add the key-value pair
        //If the Key is already added, then update the value of that key
        public bool AddOrUpdate(object key, object value)
        {
            if (concurrentDictionary.ContainsKey(key))
            {
                concurrentDictionary.TryRemove(key, out object RemovedValue);
            }
            return concurrentDictionary.TryAdd(key, value);
        }
        //This method is used to return the value of the given key if present in the cache
        //Else return null
        public object Get(object key)
        {
            if (concurrentDictionary.ContainsKey(key))
            {
                return concurrentDictionary[key];
            }
            return null;
        }
        //This method is used to remove the given key from the cache
        //If removed return true else return false
        public bool Remove(object key)
        {
            return concurrentDictionary.TryRemove(key, out object value);
        }
        //This method is used to remove the given key from the cache
        //If removed return true else return false
        public void Clear()
        {
            // Removes all keys and values from the ConcurrentDictionary i.e. from the Cache
            concurrentDictionary.Clear();
        }
    }
}
