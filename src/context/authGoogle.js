import {createContext, useState,useEffect} from 'react'
import { GoogleAuthProvider, getAuth,signInWithPopup } from "firebase/auth"
import {app} from '../firebase.config'
import { Navigate } from 'react-router-dom'

const provider = new GoogleAuthProvider()

export const AuthGoogleContext = createContext() 

export const AuthGoogleProvider = ({children}) =>{
    const auth = getAuth(app)
    const [user,setUser] = useState(null)

    useEffect(() =>{
        const loadStoreAuth = ()=>{
            const sessionToken = sessionStorage.getItem("AAuthFirebase:token")
            const sessionUser = sessionStorage.getItem("AAuthFirebase:user")
            if(sessionToken && sessionUser){
                setUser(sessionUser)
            }
        }
        loadStoreAuth()
    },[])

    const signInGoogle =() =>{
        signInWithPopup(auth, provider)
            .then((result) => {
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
             setUser(user)
             sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.email;
              const credential = GoogleAuthProvider.credentialFromError(error);
            });
      }

      function sair(){
        sessionStorage.clear()
        setUser(null)
        return <Navigate to='/'/>
      }
      return(
        <AuthGoogleContext.Provider value={{signInGoogle, signed: !!user, user,sair}}>

        {children}
        </AuthGoogleContext.Provider>
      )
}