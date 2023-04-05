import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import { db,storage } from "../../firebase.config"
import { ref,uploadBytes, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import Swal from "sweetalert2";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

export default function AddPrescr({ closeEvent }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState()
    const [cardFile, setCardFile] = useState();

    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "receitas");

    const [imgURL,setImgURL] = useState("")
    const [progress,setProgress] = useState(0)

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
  

    const handleUploadFile = (e) => {
        setCardFile(e.target.files[0]);
        setImage(e.target.value)

  
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }
    const getPrescr = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    
    

    const createPrescr = async () => { 

        if(cardFile == null)return
        
        const imageRef = ref(storage, `images/${v4() + cardFile.name}`)
       
        const uploadTask = uploadBytesResumable(imageRef,cardFile)
        uploadTask.on(
            "state_changed",
            snapshot =>{
                const progress = (snapshot.bytesTransferred /snapshot.totalBytes) *100
                setProgress(progress)
            },
            error =>{
                alert(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url =>{
                 setImgURL(url)
                })
            }
        )
        await addDoc(empCollectionRef, {
            name: name,
            email: email,
            image: imgURL,
            category: category,
            description: description
        })
        getPrescr()
        closeEvent()
        
        Swal.fire("Enviado", "Seu registro foi salvo com sucesso", 'success')
    
    }

    const currencies = [
        {
            value: 'Categoria 1',
            label: 'Categoria 1',
        },
        {
            value: 'Categoria 2',
            label: 'Categoria 2',
        },

    ];


    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align='center'>
                Adicionar Prescrição
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
                    <TextField id="outlined-basic"
                        label="Email"
                        type="email"
                        variant="outlined"
                        size="small"
                        onChange={handleChangeEmail}
                        sx={{ minWidth: "100%" }}
                        value={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic"
                        
                        variant="outlined"
                        type="file"
                        onChange={handleUploadFile} 
                        accept=".png, .jpg, .jpeg"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        value={image}
                    />
                    <progress value={progress} max="100"/>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        select
                        label="Categoria"
                        variant='outlined'
                        size='small'
                        onChange={handleChangeCategory}
                        value={category}
                        sx={{ minWidth: "100%" }}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Descrição"
                        minRows={4}
                        defaultValue=""
                        style={{ width: '100%' }}
                        onChange={handleChangeDescription}
                        value={description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createPrescr}>
                            Salvar
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}

