'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../Styles/styles';
type Props = {
    setRoute: (route: string) => void;
}
const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please Enter Your Email."),
    password: Yup.string().required("Please Enter Your password").min(6)
})
const Login: React.FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false)
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            setRoute("verification")
        }
    })
    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
        <div className='w-full'>
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
                <h5 className='text-center pt-4 font-Poppins text-[14px]'>
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