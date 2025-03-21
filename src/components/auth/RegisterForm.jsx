import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [months] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
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


    const generateYears = () => {
        let years = []
        let startYear = 2025
        let endYear = 1905
        for(startYear; startYear >= endYear; startYear--){
            years.push(startYear)
        }
        return years

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
        <h2 className="text-2xl text-center">Create a new account</h2>
        <p className="text-center text-gray-600">It's quick and easy.</p>
        <hr className="border-0 h-[1px] bg-gray-300 w-full my-3" />
        <div className="grid mb-1 gap-2 grid-cols-1 md:grid-cols-2">
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="w-full mt-3  p-3 outline-0 focus:border-blue-500 border border-gray-200 rounded-md"
          />
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="text"
            placeholder="Surname"
            className="w-full mt-3  p-3 outline-0 focus:border-blue-500 border border-gray-200 rounded-md"
          />
        </div>

        <label
          htmlFor=""
          className="text-gray-700 flex items-center gap-1 text-sm"
        >
          Date of birth <BsFillPatchQuestionFill />
        </label>

        <div className="grid gap-2   grid-cols-1   md:grid-cols-3">
          <select
            name="date"
            id=""
            className="p-3 border-gray-300 outline-0 focus:border-blue-600 border rounded-md"
          >
            {Array.from({ length: 30 }).map((_, index) => {
              return (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              );
            })}
          </select>
          <select
            name="date"
            id=""
            className="p-3 border-gray-300 outline-0 focus:border-blue-600 border rounded-md"
          >
            {months?.map((item, index) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            name="date"
            id=""
            className="p-3 border-gray-300 outline-0 focus:border-blue-600 border rounded-md"
          >
            {generateYears()?.map((item,index)=>{
                return <option value={item} key={index}>
                    {item}
                </option>
            })}
          </select>
        </div>

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
            <FaEye
              onClick={() => setShowPass(false)}
              size={20}
              cursor={"pointer"}
              className={`absolute   top-1/2 right-3 -translate-y-1/2 text-gray-800`}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPass(true)}
              size={20}
              cursor={"pointer"}
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

export default RegisterForm