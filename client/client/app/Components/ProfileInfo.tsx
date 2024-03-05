import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import lena512jpg from "../../public/lena512color.jpg"
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../Styles/styles';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
type Props = {
    user: any;
    avatar: string | null;
}
const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
    const [name, setName] = useState(user && user.name)
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
    console.log(user)
    const [loadUser, setLoadUser] = useState(false)
    const { } = useLoadUserQuery(undefined, {
        skip: loadUser ? false : true
    })
    useEffect(() => {
        if (isSuccess) {
            console.log("hellllo")
            setLoadUser(true)
        }
        if (error) {
            console.log(error)
        }
    }, [isSuccess, error])
    const imageHandler = async (e: any) => {
        const fileReader = new FileReader()
        console.log("here")
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result
                updateAvatar(
                    avatar
                )
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    const [editProfile, { isSuccess: success, error: errors }] = useEditProfileMutation()
    useEffect(() => {
        if (success) {
            toast.success("Update Name Successfully")
        }
        if (errors) {
            toast.error((errors as any)?.data?.message || "Unknown Error Occured");
        }
    }, [success, errors])
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await editProfile({ name, email: user?.email })
    }
    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='relative'>
                    <Image width={120} height={120} src={user?.avatar?.url || lena512jpg} alt="" className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full' />
                    <input type='file' name='' id='avatar' className='hidden' onChange={imageHandler} accept='image/png,image/jpg,image/jpeg,image/webp' />
                    <label htmlFor='avatar'>
                        <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                            <AiOutlineCamera size={20} className='z-1 text-white' />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                    <div className='800px:w-[50%] m-auto block pb-4'>
                        <div className='w-[100%]'>
                            <label className='block pb-2 dark:text-white  text-black'>Full Name</label>
                            <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='w-[100%] pt-2'>
                            <label className='block pb-2 dark:text-white  text-black'>Full Name</label>
                            <input type='text' readOnly className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={user?.email} />
                        </div>
                        <input className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`} required value={'Update'} type='submit' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfileInfo