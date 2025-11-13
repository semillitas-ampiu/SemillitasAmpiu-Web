import { createContext,useState } from "react";

const AuthContext = createContext()

const AuthProvider=({children})=>{
    const [usuario,setUsuario] = useState(()=>{
        try {
            const storedUsuario = localStorage.getItem('usuario')
            if (storedUsuario && storedUsuario !== "undefined") {
                return JSON.parse(storedUsuario);
            }
            return null;
        } catch (error) {
            console.error('Error al Carcar Usuario desde Almacenamiento Local', error)
            return null
        }
    })
    const login=(usuarioData)=>{
        setUsuario(usuarioData.user)
        localStorage.setItem('usuario',JSON.stringify(usuarioData.user))
        localStorage.setItem('token',usuarioData.access)
    }
    const logout=()=>{
        setUsuario(null)
        localStorage.clear()
    }

    return <AuthContext.Provider value= {{usuario,login,logout}}>
        {children}
    </AuthContext.Provider>
}
export {AuthProvider,AuthContext}