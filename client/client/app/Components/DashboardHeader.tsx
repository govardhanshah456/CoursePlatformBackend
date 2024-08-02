import React, { useEffect, useState } from 'react'
import { ThemeSwitcher } from './ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';
import socketIo from "socket.io-client"
const socketUrl = process.env.NEXT_WEB_SOCKET_SERVER_URI || ''
const socketId = socketIo(socketUrl, { transports: ["wesSocket"] })
type Props = {}

const DashboardHeader = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([])
    useEffect(() => {
        if (socketId) {
            socketId.on("notification", (msg: any) => {
                setNotifications([...notifications, msg])
            })

        }
    })
    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
            <ThemeSwitcher />
            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />
                <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    {notifications && notifications.length}
                </span>
            </div>

            {
                open && notifications && notifications.map((item: any, index: any) => (
                    <div key={index} className='dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#000000f]'>
                        <div className='w-full items-center justify-between p-2'>
                            <p className='dark:text-white text-black'>{item.title}</p>
                            <p className='px-2 text-black dark:text-white'>{item.message}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DashboardHeader