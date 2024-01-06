import React ,{useState,useEffect} from 'react'
import {Form,Input,message}  from 'antd'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../services'
import "../styles/RegisterPage.css";
// import { useState } from 'react'
const Register=()=> {

    const navigate=useNavigate()
    const [Loading,setLoading]=useState(false);
    //submit
    const submitHandler=async (values)=>{
       try{
        setLoading(true);
        await axios.post(`${backend_url}/register`,values);
         message.success("registratiion successful");
         setLoading(false);
         navigate('/login');
       }
       catch(error)
       {
        setLoading(false);
        // console.log(error);
        message.error('something went wrong');
       }
    };

  //prevent for login
  useEffect(()=>{
    if(localStorage.getItem('user'))
    {
         navigate("/");
    }
  },[navigate]);

  

  return (
    <>
    <div className='register-page '>
        {Loading && <spinner/>}
        <Form className='register-form' layout='vertical' onFinish={submitHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to="/login" >Already Register ? Login here! </Link>
                <button className='btn btn-primary'>Register</button>
            </div>
        </Form>
      
    </div>
    </>
  )
}

export default Register







