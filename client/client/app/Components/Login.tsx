'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../Styles/styles';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}
const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please Enter Your Email."),
    password: Yup.string().required("Please Enter Your password").min(6)
})
const Login: React.FC<Props> = ({ setRoute, setOpen }) => {

    const [show, setShow] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [setOpen]);
    const [login, { isSuccess, error }] = useLoginMutation()
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({ email, password })
        }
    })
    useEffect(() => {
        if (isSuccess) {
            const message = "Login Successfull!"
            toast.success(message);
            setOpen(false)
        }
        if (error) {
            const message = (error as any)?.data?.message || "Unknown Occured";
            toast.error(message)
        }
    }, [isSuccess, error, setOpen])
    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
        <div className='w-full'>
            <button className='dark:text-white text-black flex justify-end absolute top-0 right-0 m-4' onClick={() => setOpen(false)}>
                <AiOutlineClose size={20} />
            </button>
            <h1 className={`${styles.title}`}>
                Login with LearnEasy
            </h1>
            <form onSubmit={handleSubmit}>
                <label className={`${styles.label}`} htmlFor='email'>
                    Enter your Email
                </label>
                <input type="email" name="email" value={values.email} onChange={handleChange} id="email" placeholder='login@email.com' className={
                    `${errors.email && touched.email && "border-red-500"} ${styles.input}`
                }
                />
                {
                    errors.email && touched.email && (
                        <span className='text-red-500 pt-2 block'>{errors.email}</span>
                    )
                }
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor='email'>
                        Enter your Password
                    </label>
                    <input type={show ? "text" : "password"} name="password" value={values.password} onChange={handleChange} id="password" placeholder='password!#@' className={
                        `${errors.password && touched.password && "border-red-500"} ${styles.input}`
                    }
                    />
                    {
                        errors.email && touched.email && (
                            <span className='text-red-500 pt-2 block'>{errors.email}</span>
                        )
                    }

                </div>
                <div className='w-full mt-5'>
                    <input type='submit' value="Login" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    or Join With
                </h5>
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer ml-2' />
                </div>
                <h5 className='text-center pt-4 font-Poppins text-[14px] dark:text-white text-black'>
                    Dont have account?{" "}
                    <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("signup")}>
                        Sign Up
                    </span>
                </h5>
            </form>
        </div>
    )
}

export default Login