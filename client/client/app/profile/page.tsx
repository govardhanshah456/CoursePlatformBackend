/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState, FC } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../Components/Heading'
import Header from '../Components/Header'
import Profile from '../Components/Profile'
import { useSelector } from 'react-redux'
type Props = {

}
const page: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0)
    const [route, setRoute] = useState("signup")
    const { user } = useSelector((state: any) => state.auth)
    return (
        <div>
            <Protected>
                <Heading title={`${user?.name} profile`} description='Upgrade your skills with Learn easy' keywords='Programming,MERN,ML,Redux' />
                <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={activeItem} />
                <Profile user={user} />
            </Protected>
        </div>
    )
}

export default page