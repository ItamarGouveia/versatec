import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

import { db } from "../../firebase.config"


import Swal from "sweetalert2";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

export default function AddCategoria({ closeEvent }) {
    const [name, setName] = useState("")
    
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "categoria");

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    
    const getCategoria = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

    const createCategoria = async () => {
        await addDoc(empCollectionRef,{
            name:name,
       
        })
        closeEvent()
        
        Swal.fire("Enviado","Seu registro foi salvo com sucesso",'success')
        
    }

 

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align='center'>
                Adicionar Categoria
            </Typography>
            <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon></CloseIcon>
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic"
                        label="Nome"
                        variant="outlined"
                        onChange={handleChangeName}
                        size="small"
                        sx={{ minWidth: "100%" }}
                        value={name}
                    />
                </Grid>
                
               
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createCategoria}>
                            Salvar
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}

