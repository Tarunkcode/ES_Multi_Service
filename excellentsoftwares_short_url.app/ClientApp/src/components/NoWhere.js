import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Links_data_context } from '../AppContext/short_linksContext';
export default function NoWhere() {
    let { db_instance } = useContext(Links_data_context);
    let { id } = useParams();
    const history = useHistory();
    let pathname = window.location.pathname;
    useEffect(() => {
     
        if (pathname !== '/home') {
        if (pathname && pathname != '/' && pathname.includes(':') == false) {
            history.push(`/:${pathname.substring(1)}`)
            }
        }
    }, [pathname.includes(':') == false])
    useEffect(() => {
       
        if (db_instance && db_instance.length > 0) {

            let got = db_instance.find((ele) => {
                return ele.path == id.substring(1)
            })
            if (got && got.destinationUrl) {

                window.location.replace(`http://${got.destinationUrl}`);
            } else {

            }
        }
    }, [db_instance && db_instance.length > 0])
    return (
        <div></div>
        )
}