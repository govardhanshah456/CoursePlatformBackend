import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { FiMenu } from 'react-icons/fi';
type Props = {
    activeItem: number;
    isMobile: boolean;
}
export const navData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policies",
        url: "/policies"
    },
    {
        name: "FAQ",
        url: "/faq"
    }
]
const Navitems: React.FC<Props> = ({ activeItem, isMobile }) => {
    const [open, setOpen] = useState(false);
    const drawerRef = useRef(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !(drawerRef as any).current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [open]);
    return (
        <>
            <div className='hidden 800px:flex'>
                {
                    navData && navData.map((item, index) => (
                        <Link href={`${item.url}`} key={index} passHref>
                            <span className={`${activeItem === index ? 'dark:text-[#37a39a] text-[crimson]' : 'dark:text-white text-black'} text-[18px] px-6 font-Poppins font-[400]`}>
                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {isMobile && (
                <div className='800px:hidden mt-5 flex justify-end'>
                    <button
                        onClick={toggleDrawer}
                        className='bg-transparent border-[3px] dark:text-white font-bold py-2 px-4 rounded mb-[20px]'
                    >
                        <FiMenu size={20} /> {/* FiMenu icon component */}
                    </button>
                    <Menu
                        id="menu"
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {navData.map((item, index) => (
                            <Link href={`${item.url}`} key={index} passHref>
                                <MenuItem onClick={handleClose}>
                                    {item.name}
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </div>
            )}
        </>
    )
}

export default Navitems