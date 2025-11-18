import { useState } from "react";
import getCookie from '../utils/CSRFToken'
import { getApiUrl } from "../utils/apiConfig";

const useDeleteRequest=()=>{
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const deleteData = async (endpoint,id) => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        const url=getApiUrl(`${endpoint}/${id}`)
        try {
            const res = await fetch(url,{
                method : 'DELETE',
                headers : {
                    'x-CSRFToken' : getCookie('csrftoken'),
                },
            })
            if (res.ok){
                setSuccess(true);
            }else{
                const result = await res.json()
                setError(result);    
            }
        } catch (err) {
            setError({error: 'error de red'+err})
        }finally{
            setLoading(false)
        }
    }
    return {deleteData,success,error,loading}

}

export default useDeleteRequest;