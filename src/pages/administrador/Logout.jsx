import { use, useContext,useEffect } from "react";

import { useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Logout=()=>{
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const salir = ()=>{
            logout()
            navigate('/Login?message=Sesión cerrada exitosamente')
        }
        salir()
    },[])
    return (
        <></>
    );
};

export default Logout;