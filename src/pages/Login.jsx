import { useContext } from "react"
import { AuthGoogleContext } from "../context/authGoogle"
import { Navigate } from "react-router-dom"




function Login(){

const {signInGoogle,signed}= useContext(AuthGoogleContext)

async function loginGoogle(){
  await signInGoogle()
}

if(!signed){
  return(
    <div>
      <h1>Acesse sua conta</h1>
      <p>
        Utilizando autenticação social, como a do Google você <br/>
        facilita a vida do usuário permitindo utilizar sua aplicação sem fazer cadastro.
      </p>

      <button onClick={loginGoogle}>Entrar com o Google</button>
    </div>
  )
}else{
  return <Navigate to="/home"/>
}


  

}

export default Login
  