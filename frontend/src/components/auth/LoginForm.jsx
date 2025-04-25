import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [formFields,setFormFields] = useState({
        email:'',password:''
    })

    const [showEye,setShowEye] = useState(false)
    const [showPass,setShowPass] = useState(false)
    // destructure 
    const {email,password} = formFields


    const handleChange = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name] : e.target.value
        })
    }



    useEffect(()=>{
        if(password.length > 0){
            setShowEye(true)
        }else{
            setShowEye(false)
        }
    },[password])


  return (
    <>
      <form className="p-3 shadow-xl rounded-md bg-white">
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email address or phone number"
          className="w-full mt-3  p-3 outline-0 focus:border-blue-500 border border-gray-200 rounded-md"
        />
        <div className="relative">
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 my-2 outline-0 focus:border-blue-500 border border-gray-200 rounded-md"
          />

          {showPass ? (
            <FaEye onClick={()=>setShowPass(false)}
            size={20}

            cursor={'pointer'}
              className={`absolute   top-1/2 right-3 -translate-y-1/2 text-gray-800`}
            />  
          ) : (
            <FaEyeSlash
            onClick={()=>setShowPass(true)}
            size={20}
            cursor={'pointer'}
              className={`absolute  top-1/2 right-3 -translate-y-1/2 text-gray-800`}
            />
          )}

          {/* <FaEyeSlash onClick={()=>setShow(!show)} className={`absolute ${!show && 'hidden'} top-1/2 right-3 -translate-y-1/2 text-gray-800`} cursor={'pointer'} size={20} /> */}
        </div>

        <Button
          variant="contained"
          className="w-full my-2"
          style={{ padding: "12px", fontWeight: "bold" }}
        >
          Log in
        </Button>

        <Link
          to={"/"}
          className="text-blue-700 text-center block my-2 hover:underline"
        >
          Forgotten password ?
        </Link>

        <hr className="border-0 h-[1px] bg-gray-300" />
        <Link className="text-white" to={"/register"}>
          <Button
            variant="contained"
            style={{
              padding: "12px",
              background: "#42B72A",
              margin: "1rem auto",
              display: "block",
            }}
            className="my-2"
          >
            Create New Account
          </Button>
        </Link>
      </form>
    </>
  );
}

export default LoginForm