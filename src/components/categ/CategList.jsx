import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography } from '@mui/material';

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase.config"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from '@mui/material/Modal';
import AddCateg from '../categ/AddCateg';
import EditCateg from '../categ/EditCateg';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


export default function CategList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "categoria");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
                                           
  useEffect(() => {
    getCategoria();
  }, []);

  const deleteApi = async (id) => {
    const userDoc = doc(db, "categoria", id);
    await deleteDoc(userDoc);
    Swal.fire("Deletado!", "Registro deletado", "success");
    getCategoria();
  };


  const deleteCategoria = (id) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };



  const getCategoria = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getCategoria();
    }
  };


  const editCategoria=(id,name)=>{
    const data={
      id:id,
      name:name
    }
    
    setFormid(data)
    handleEditOpen()
  }

  return (
    <>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddCateg closeEvent={handleClose}/>
        </Box>
      </Modal>

      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditCateg closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>

     

  
   
    </div>

    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <Typography
      gutterBottom
      variant='h5'
      component='div'
      sx={{padding:'20px'}}
      >
        Lista de Categorias
      </Typography>
      <Divider/>
      <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Buscar" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Adicionar
            </Button>
          </Stack>
          <Box height={10} />
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
             
                <TableCell align='left' style={{ minWidth: '100px' }}>
                  Nome
                </TableCell>
            
                <TableCell>
                  Actions
                </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                   
                        <TableCell  align='left'>
                          {row.name}
                        </TableCell>
                  
                        <TableCell>
                        <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={()=>{
                                editCategoria(row.id,row.name)
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteCategoria(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                 
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}