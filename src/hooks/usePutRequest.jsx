import { useState } from "react";
import getCookie from '../utils/CSRFToken'

const BASE_URL = "https://semillitasampiu-api-production.up.railway.app/api/";

const usePutRequest=()=>{
    const [response,setResponse] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const putData = async(endpoint,id,data,isFormData = false)=>{
        setLoading(true)
        setError(null)
        setResponse(null)
        const url=`${BASE_URL}${endpoint}/${id}/`
        const headers = {
            'x-CSRFToken' : getCookie('csrftoken'),
        };
        if (!isFormData){
            headers['Content-Type'] = 'application/json'
        }
        try {
            const res=await fetch(url,{
                method: 'PUT',
                headers,
                body: isFormData?data:JSON.stringify(data),
            })
            const result=await res.json()
            if (!res.ok){
                setError(result)
            }else{
                setResponse(result)
            }
        }catch(err){
            setError({error: 'error de red'+err})
        }finally{
            setLoading(false);
        }
    }
    return {putData,response,error,loading}
}
export default usePutRequest;