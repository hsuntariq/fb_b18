import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { PiWarningOctagonFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [months] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [myDate] = useState(new Date());
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    f_name: "",
    l_name: "",
    date: myDate.getDate(),
    month: myDate.getMonth(),
    year: myDate.getFullYear(),
    gender: "",
  });

  const [showEye, setShowEye] = useState(false);
  const [showPass, setShowPass] = useState(false);
  // destructure
  const { email, password, f_name, l_name, date, month, year, gender } =
    formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const generateYears = () => {
    let years = [];
    let startYear = 2025;
    let endYear = 1905;
    for (startYear; startYear >= endYear; startYear--) {
      years.push(startYear);
    }
    return years;
  };

  useEffect(() => {
    if (password.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [password]);

  const handleBlur = (name) => {
    if (name == "f_name" && !f_name) {
      setError("f_name");
    }
    if (name == "l_name" && !l_name) {
      setError("l_name");
    }
  };

  return (
    <>
      <form className="p-3 shadow-xl rounded-sm text-gray-700 bg-white">
        <h2 className="text-2xl text-center">Create a new account</h2>
        <p className="text-center text-gray-600">It's quick and easy.</p>
        <hr className="border-0 h-[1px] bg-gray-300 w-full my-3" />
        <div className="grid mb-1 gap-2 grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <input
              onBlur={() => handleBlur("f_name")}
              name="f_name"
              value={f_name}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className={`w-full mt-3  p-2 outline-0  border  rounded-sm text-gray-700 
                  ${
                    error == "f_name" && !f_name
                      ? "border-red-600"
                      : "border-gray-300 focus:border-blue-500"
                  } 
                
              `}
            />
            {error == "f_name" && !f_name && (
              <PiWarningOctagonFill
                size={20}
                className="absolute -translate-y-[15%] text-red-600 top-1/2 right-3"
              />
            )}
          </div>
          <div className="relative">
            <input
              name="l_name"
              value={l_name}
              onBlur={() => handleBlur("l_name")}
              onChange={handleChange}
              type="text"
              placeholder="Surname"
              className={`w-full mt-3  p-2 outline-0  border  rounded-sm text-gray-700 
               
              ${
                error == "l_name" && !l_name
                  ? "border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              } 
             `}
            />

            {error == "l_name" && !l_name && (
              <PiWarningOctagonFill
                size={20}
                className="absolute -translate-y-[15%] text-red-600 top-1/2 right-3"
              />
            )}
          </div>
        </div>
        <label
          htmlFor=""
          className="text-gray-700 my-2 flex items-center gap-1 text-sm"
        >
          Date of birth <BsFillPatchQuestionFill />
        </label>

        <div className="grid gap-2   grid-cols-3">
          <select
            name="date"
            value={date}
            onChange={handleChange}
            id=""
            className="p-2 border-gray-300 outline-0 focus:border-blue-600 border rounded-sm text-gray-700"
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
            name="month"
            value={month}
            onChange={handleChange}
            id=""
            className="p-2 border-gray-300 outline-0 focus:border-blue-600 border rounded-sm text-gray-700"
          >
            {months?.map((item, index) => {
              return <option value={index}>{item}</option>;
            })}
          </select>
          <select
            name="year"
            value={year}
            onChange={handleChange}
            id=""
            className="p-2 border-gray-300 outline-0 focus:border-blue-600 border rounded-sm text-gray-700"
          >
            {generateYears()?.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <label
          htmlFor=""
          className="text-gray-700 my-2 flex items-center gap-1 text-sm"
        >
          Gender <BsFillPatchQuestionFill />
        </label>

        <div className="grid gap-2   grid-cols-2">
          <div className="flex justify-between items-center p-2 rounded-sm text-gray-700 border border-gray-300">
            <label>Female</label>
            <input
              name="gender"
              value={"female"}
              onChange={handleChange}
              type="radio"
              id=""
            />
          </div>
          <div className="flex justify-between items-center p-2 rounded-sm text-gray-700 border border-gray-300">
            <label>Male</label>
            <input
              name="gender"
              value={"male"}
              onChange={handleChange}
              type="radio"
              id=""
            />
          </div>
        </div>

        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email address or phone number"
          className="w-full mt-3  p-2 outline-0 focus:border-blue-500 border border-gray-300 rounded-sm text-gray-700"
        />
        <div className="relative">
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 my-2 outline-0 focus:border-blue-500 border border-gray-300 rounded-sm text-gray-700"
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

        <p className="text-gray-500 text-[0.8rem] font-[500] my-3">
          People who use our service may have uploaded your contact information
          to Facebook. Learn more.
        </p>
        <p className="text-gray-500 text-[0.8rem] font-[500] my-3">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS notifications from us and can opt
          out at any time.
        </p>

        <Button
          variant="contained"
          className="w-1/2 my-2 mx-auto"
          style={{
            padding: "8px",
            margin: "auto",
            display: "block",
            fontWeight: "bold",
            background: "#42B72A",
          }}
        >
          Sign Up
        </Button>

        <Link
          to={"/"}
          className="text-blue-600 text-center block my-2 hover:underline"
        >
          Already have an account?
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
