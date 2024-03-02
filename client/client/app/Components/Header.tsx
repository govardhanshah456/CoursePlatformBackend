'use client'
import React, { useState } from 'react'
import CustomModal from './CustomModal';
import Login from './Login';
import Signup from './Signup';

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

    return (
        <div className='w-full relative'>
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
        </div>
    )
}

export default Header