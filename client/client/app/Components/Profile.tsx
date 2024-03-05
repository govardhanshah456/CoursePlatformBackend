import React, { useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { redirect } from 'next/navigation';
import ProfileInfo from './ProfileInfo';
type Props = {
    user: any;
}
const Profile: React.FC<Props> = ({ user }) => {
    const [active, setActive] = useState(1)
    const [avatar, setAvatar] = useState(user?.avatar || null)
    const [logout, setLogout] = useState(false)
    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false
    })
    const logoutHandler = () => {
        setLogout(true);
        redirect("/")
    }
    return (
        <div className='w-[85%] flex mx-auto'>
            <div className='w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#000000a] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky top-[30px] left-[30px]'>
                <SidebarProfile user={user} active={active} avatar={avatar} setActive={setActive} logoutHandler={logoutHandler} />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ProfileInfo user={user} avatar={avatar} />
                    </div>
                )
            }
        </div>
    )
}

export default Profile