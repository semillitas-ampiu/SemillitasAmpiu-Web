import { useState } from "react";
import getCookie from '../utils/CSRFToken'

const usePostRequest=()=>{
    const [response,setResponse] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const clearState = () => {
        setResponse(null);
        setError(null);
    }
    const postData = async (url, data, isFormData = false) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        const headers = {
            'X-CSRFToken': getCookie('csrftoken'),
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers,
                body: isFormData ? data : JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) {
                setError(result);
            } else {
                setResponse(result);
            }
        } catch (err) {
            setError({ error: 'error de red' });
            console.error('error de red: ', err);
        } finally {
            setLoading(false);
        }
    };

    return { postData, response, error, loading, clearState };
}

export default usePostRequest;