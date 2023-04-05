import { useContext } from "react"
import { AuthGoogleContext } from "../context/authGoogle"
import { Navigate } from "react-router-dom"
import '../index.css'
import {GoogleLogo} from 'phosphor-react'
import imgLogin from '../assets/home.png'

function Login(){

const {signInGoogle,signed}= useContext(AuthGoogleContext)

async function loginGoogle(){
  await signInGoogle()
}

if(!signed){
  return(
    <div className="container">
      <div className="content">
      <h1 className="title">iPrescrição</h1>
      <img src={imgLogin} alt='main'/>
      <p>
      O sistema web iPrescrição é uma plataforma desenvolvida para 
      facilitar e otimizar o processo de prescrição médica. 
      Com ele, médicos e profissionais da saúde têm acesso a 
      um ambiente seguro e intuitivo para realizar prescrições 
      de medicamentos de forma digital.


      </p>

      <button onClick={loginGoogle} className="button">
        <GoogleLogo/>
        Entrar com o Google</button>
    </div>
    </div>
  )
}else{
  return <Navigate to="/home"/>
}


  

}

export default Login
  