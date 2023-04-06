import React from 'react'
import Sidenav from '../components/Sidenav'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import PrescriList from '../components/prescr/PrescrList';

function User() {
  return (
    <>
    <Navbar/>
    <Box height={70}/>
    <Box sx={{display:"flex"}}>
    <Sidenav/>
   
    <Box component="main" sx={{flexGrow:1,p:3}}>
    <PrescriList/>
    </Box>
    
    </Box>
    
    </>
  )
}

export default User
