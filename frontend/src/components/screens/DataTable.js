import React, { useState } from 'react'
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { trashUser } from '../../reduxstore/authActions';
import { useSelector } from "react-redux"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form'


export default function DataTable() {  
  const [post, setPost] = useState([]);
  const [open, setOpen] = React.useState(false);   
  const [formdata, setFormdata] = useState([]);

  const { userInfo } = useSelector((state) => state.auth) 


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()  
  React.useEffect( () => { 
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
      }
    if (userInfo) {
      axios.post(`http://localhost:3002/api/allusers/`, {}, config).then((response) => {
        setPost(response.data);
      });     
    }
  }, [userInfo]); 

  const submitForm = (data) => { 
      data.email = data.email.toLowerCase();
      console.log(data);
  }
  const onformChange = (e) => {
    console.log(e.target)
  };


  const alert = ( <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Edit"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" style={{ width: '40vw'}}> 
                    {/*

                    <form>
                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        className='form-input'                       
                        value={formdata?.name}
                        onChange = {onformChange}
                        name="name"
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name="email"
                        className='form-input'                         
                        value={formdata?.email} 
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='dob'>DOB</label>
                      <input
                        type='date'
                        name="dob"
                        className='form-input' 
                        value={formdata?.dob}  
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='gender'>Gender</label>
                      <select className='form-input' name="gender" value={formdata?.gender} required>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                  </form>  
                    */}

                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>cancel</Button>
                  <Button onClick={handleClose} autoFocus>
                    save
                  </Button>
                </DialogActions>
              </Dialog>
    );
   
  return (
    <>
      {alert}
       <Table style={{}}>
            <Thead>
              <Tr style={{ textAlign: "left"}}>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>DOB</Th>
                <Th>Gender</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                post.map( (row, index) => {
                  return ( 
                    <Tr key={index}>
                      <Td>{row.name}</Td>
                      <Td>{row.email}</Td>
                      <Td>{row?.dob}</Td>
                      <Td>{row?.gender}</Td> 
                      <Td> <EditIcon onClick={handleClickOpen} /> <DeleteForeverIcon onClick ={ () => dispatch( trashUser({ _id: row._id }) ) } /> </Td> 
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table> 
      }
    </>
  );
}
