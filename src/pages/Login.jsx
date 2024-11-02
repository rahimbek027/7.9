import { useFormik } from "formik";
import React, { useState } from "react";
import { LoginSchema } from "../validation/LoginSchema";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { values, errors, handleSubmit, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        username: "",
        useremail: "",
        userpassword: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        localStorage.setItem("token", JSON.stringify(values));
        queryClient.invalidateQueries(["user"]);
        navigate("/");
      },
    });

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <form
          className="bg-white p-10 rounded-lg shadow-md md:w-1/2 w-full"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="pb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`${
                errors.username && touched.username
                  ? "border-red-500 placeholder:text-red-500 text-red-500"
                  : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {touched.username && errors.username ? (
              <span className="text-red-500 text-xs absolute bottom-1 left-0">
                {errors.username}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="pb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 relative"
              htmlFor="useremail"
            >
              Email
            </label>
            <input
              className={`${
                errors.useremail && touched.useremail
                  ? "border-red-500 placeholder:text-red-500 text-red-500"
                  : ""
              }
              shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="useremail"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.useremail}
            />
            {touched.useremail && errors.useremail ? (
              <span className="text-red-500 text-xs absolute bottom-1 left-0">
                {errors.useremail}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="pb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userpassword"
            >
              Password
            </label>
            <input
              className={`
              ${
                errors.userpassword && touched.userpassword
                  ? "border-red-500 placeholder:text-red-500 text-red-500"
                  : ""
              }
              shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline`}
              id="userpassword"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userpassword}
            />
            {touched.userpassword && errors.userpassword ? (
              <span className="text-red-500 text-[12px] absolute bottom-1 left-0">
                {errors.userpassword}
              </span>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded text-white mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
