'use client'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../Styles/styles';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';


type Props = {
    setRoute: (route: string) => void;
}

type verifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
}
const Verification: React.FC<Props> = ({ setRoute }) => {
    const [activation, { isSuccess, error }] = useActivationMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("Account Activated Successfully, Login Here");
            setRoute("Login")
        }
        if (error) {
            const message = (error as any)?.data?.message || "Unknown Error Occured"
            toast.error(message)
        }
    })
    const [invalidError, setInvalidError] = useState<boolean>(false)
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    const token = useSelector((state: any) => state.auth.token)
    console.log(token)
    const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: ""
    })
    const verificationHandler = async () => {
        const finalValue = Object.values(verifyNumber).join("")

        if (finalValue.length !== 6) {
            setInvalidError(true);
            return;
        }
        await activation({
            activationCode: finalValue,
            token
        })
    }

    const handleInputChange = (index: number, value: string) => {
        const updateNumber = { ...verifyNumber, [index]: value }
        setVerifyNumber(updateNumber)
        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
        else if (value.length === 1 && index < 5)
            inputRefs[index + 1].current?.focus()
    }
    return (
        <div>
            <h2 className={`${styles.title}`}>
                Verify Your Account
            </h2>
            <br />
            <div className='w-full flex items-center justify-center mt-2'>
                <div className='w-[100px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
                    <VscWorkspaceTrusted size={40} />
                </div>
            </div>
            <br />
            <br />
            <div className='m-auto flex items-center justify-around'>
                {Object.keys(verifyNumber).map((key, index) => (
                    <input type="text" key={key} ref={inputRefs[index]}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"
                            }`}
                        maxLength={1}
                        value={verifyNumber[key as keyof verifyNumber]}
                        onChange={(e) => handleInputChange(index, e.target.value)} />
                ))}
                {invalidError &&
                    (
                        <div className='flex justify-end items-end absolute left-auto bottom-[85px] text-red-500'>
                            Please Fill All The Boxes
                        </div>
                    )}
            </div>
            <br />
            <br />
            <div className='w-full flex justify-center'>
                <button className={`${styles.button}`} onClick={verificationHandler}>Verify OTP</button>
            </div>
        </div>
    )
}

export default Verification