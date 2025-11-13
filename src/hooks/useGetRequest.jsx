import { useState } from "react";
const BASE_URL = "https://semillitasampiu-api-production.up.railway.app/api/";

const useGetRequest=()=>{
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const getData=async(endpoint,id=null,params='')=>{
        setLoading(true)
        setError(null)
        setData([])

        const url=`${BASE_URL}${endpoint}${id ? `/${id}` : ''}/${params ? `?${params}` : ''}`

        try {
            const res=await fetch(url)
            const result=await res.json()
            if(!res.ok){
                setError(result)
            }else{
                setData(result)
            }
        } catch (err) {
            setError({error: 'error de red'+err})
        }finally{
            setLoading(false)
        }
    }
    return {getData,data,error,loading}
}
export default useGetRequest;