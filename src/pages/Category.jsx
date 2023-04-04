import React from 'react'
import Sidenav from '../components/Sidenav'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import CategList from '../components/categ/CategList';

function Category() {
  return (
    <>
    
    <Navbar/>
    <Box height={70}/>
    <Box sx={{display:"flex"}}>
    <Sidenav/>
    
    
    <Box component="main" sx={{flexGrow:1,p:3}}>
    <CategList/>
    </Box>
    
    </Box>
    
    </>
  )
}

export default Category
