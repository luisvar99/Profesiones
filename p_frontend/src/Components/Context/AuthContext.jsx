import React, { useState } from 'react'
const { createContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        name:null,
        rol: 0
    })
    
    const data = {
        user,
        setUser
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export {AuthProvider};
export default AuthContext;
 
