import Image from 'next/image';
import React from 'react'
import lena512jpg from "../../public/lena512color.jpg"
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { BiLogOutCircle } from 'react-icons/bi';
type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logoutHandler: () => void;
}
const SidebarProfile: React.FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    return (
        <div className='w-full'>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                }`} onClick={() => setActive(1)}>
                <Image height={20} width={20} src={user?.avatar?.url || avatar || lena512jpg} alt='' className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full' />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>My Account</h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                }`} onClick={() => setActive(2)}>
                <RiLockPasswordLine size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>Change password</h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                }`} onClick={() => setActive(3)}>
                <SiCoursera size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>Enrolled Courses</h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
                }`} onClick={() => logoutHandler()}>
                <BiLogOutCircle size={20} className='dark:text-white text-black' />
                <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>Log Out</h5>
            </div>
        </div>
    )
}

export default SidebarProfile