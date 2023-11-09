import React from 'react';

import { createContext, useState, useEffect } from 'react';

export const Links_data_context = createContext({ db_instance: [], domain:'' });


export default function Links_data_provider({ children }) {
    let [data, setData] = useState([]);
    const dom = `http://${window.location.hostname}:${window.location.port}`;
    const url = `${dom}/api/GetAll`;
    const getAllData = async () => {
               await fetch(url).then(res => res.json()).then(result => setData(result)).catch(err => {
                console.log(err)
                alert('Data Collection Failed')
               })
    }

    
    useEffect(() => {
        
            getAllData();
       
    }, [])
    return <Links_data_context.Provider value={{ db_instance: data, domain: dom }}>{children}</Links_data_context.Provider>
}



