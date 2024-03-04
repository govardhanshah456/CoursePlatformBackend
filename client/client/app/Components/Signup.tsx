'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../Styles/styles';
import { useActivationMutation, useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}
const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter Your name."),
    email: Yup.string().email("Invalid Email").required("Please Enter Your Email."),
    password: Yup.string().required("Please Enter Your password").min(6)
})
const Signup: React.FC<Props> = ({ setRoute, setOpen }) => {
    const [show, setShow] = useState(false)
    const [register, { isError, data, error, isSuccess }] = useRegisterMutation()

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration Successful."
            toast.success(message)
            setRoute("verification")
        }
        if (isError) {
            const message = (error as any)?.data?.message || "unknown error occured";
            toast.error(message)
        }
    }, [data?.message, error, isError, isSuccess, setRoute])

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                email,
                password,
                name
            }
            await register(data)
        }
    })
    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
        <div className='w-full'>
            <button className='dark:text-white text-black flex justify-end absolute top-0 right-0 m-4' onClick={() => setOpen(false)}>
                <AiOutlineClose size={20} />
            </button>
            <h1 className={`${styles.title}`}>
                Join LearnEasy
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Name
                    </label>
                    <input type="name" name="name" value={values.name} onChange={handleChange} id="name" placeholder='Signup@name.com' className={
                        `${errors.name && touched.name && "border-red-500"} ${styles.input}`
                    }
                    />
                    {
                        errors.name && touched.name && (
                            <span className='text-red-500 pt-2 block'>{errors.name}</span>
                        )
                    }
                </div>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Email
                    </label>
                    <input type="email" name="email" value={values.email} onChange={handleChange} id="email" placeholder='Signup@email.com' className={
                        `${errors.email && touched.email && "border-red-500"} ${styles.input}`
                    }
                    />
                    {
                        errors.email && touched.email && (
                            <span className='text-red-500 pt-2 block'>{errors.email}</span>
                        )
                    }
                </div>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Password
                    </label>
                    <input type={show ? "text" : "password"} name="password" value={values.password} onChange={handleChange} id="password" placeholder='password!#@' className={
                        `${errors.password && touched.password && "border-red-500"} ${styles.input}`
                    }
                    />
                    {
                        errors.password && touched.password && (
                            <span className='text-red-500 pt-2 block'>{errors.password}</span>
                        )
                    }

                </div>
                <div className='w-full mt-5'>
                    <input type='submit' value="Sign Up" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    or Join With
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer ml-2' />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px] dark:text-white text-black'>
                    Already have an account?{" "}
                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("Login")}>
                        Sign in
                    </span>
                </h5>
            </form >
        </div >
    )
}

export default Signup