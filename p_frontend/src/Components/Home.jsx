import React, { useContext, useEffect } from 'react'
import AuthContext from './Context/AuthContext';

export default function Home() {
    
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
      console.log(user);
    }, [])
    
  return (
    <div>{user.name}</div>
  )
}
