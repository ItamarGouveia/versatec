import React from 'react'
import Sidenav from '../components/Sidenav'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import homeImg from '../assets/home.png'

function About() {
  return (
    <>
    
    <Navbar/>
    <Box sx={{display:"flex",alignItems:'center',justifyContent:'center'}}>
    <Sidenav/>
    <Box sx={{display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'}}>
      <Box sx={{height:90}}/>
    <img src={homeImg} alt='home'/>
    <h1>Sistema de Cadastro de Prescrição Médica</h1>
    </Box>
    </Box>
    
    </>
  )
}

export default About
