import React, { useState } from 'react'
import { ThemeSwitcher } from './ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';

type Props = {}

const DashboardHeader = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
            <ThemeSwitcher />
            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />
                <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    3
                </span>
            </div>
        </div>
    )
}

export default DashboardHeader