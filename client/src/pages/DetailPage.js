import React, {useState} from 'react'
import { useParams } from 'react-router';
import { useCallback, useContext, useEffect } from 'react';
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';
export default function DetailPage() {
  const {request, loading} = useHttp();
  const {token} = useContext(AuthContext);
  const [link, setLink] =  useState(null);
  const {id} = useParams();

const getLink = useCallback( async () => {
    try {
     const fetch = await request(`/api/link/${id}`, 'GET', null, {
            Authrization: `Bearer ${token}`
        });
        setLink(fetch);
    }
    catch (e) {

    }
}, [token, id, request]);

useEffect(() => {
    getLink();
}, [getLink])

    if(loading) {
        return <Loader/>
    }

    return (
       <>
        {!loading && link && <LinkCard link={link} />}
       </>
    )
}
