'use client'
import React, { useEffect, useState } from 'react'
import CustomModal from './CustomModal';
import Login from './Login';
import Signup from './Signup';
import Verification from './Verification';
import Link from 'next/link';
import Navitems from './Navitems';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HiOutlineUserCircle } from 'react-icons/hi';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}
const Header: React.FC<Props> = ({ open, setOpen, route, setRoute, activeItem }) => {
    const [active, setActive] = useState(false)
    const [openSiebar, setOpenSidebar] = useState(false)
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='w-full relative'>
            <div className={`${active ? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500' : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'}`}>
                <div className='w-[95%] 880px:w-[92%] m-auto py-2 h-full'>
                    <div className='w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href={'/'} className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                                LearnZilla
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            <Navitems activeItem={activeItem} isMobile={isMobile} />
                            <ThemeSwitcher />
                            <HiOutlineUserCircle size={25} className='cursor-pointer dark:text-white text-black' onClick={() => setOpen(true)} />
                        </div>
                    </div>
                </div>
            </div>
            {
                route === 'Login' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === 'signup' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Signup}
                                />
                            )
                        }
                    </>
                )
            }
            {
                route === 'verification' && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Header