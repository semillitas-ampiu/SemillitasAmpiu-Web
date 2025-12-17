import { useState, useCallback } from "react";
import { getApiUrl } from "../utils/apiConfig";

const useGetRequest=()=>{
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const getData=useCallback(async(endpoint,id=null,params='', signal=null)=>{
        setLoading(true)
        setError(null)
        setData([])

        const url=getApiUrl(`${endpoint}${id ? `/${id}` : ''}/${params ? `?${params}` : ''}`)

        try {
            const res=await fetch(url, { signal })
            const result=await res.json()
            if(!res.ok){
                setError(result)
            }else{
                setData(result)
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                // Request was cancelled, don't update state
                return;
            }
            setError({error: 'error de red'+err})
        }finally{
            setLoading(false)
        }
    },[])
    return {getData,data,error,loading}
}
export default useGetRequest;