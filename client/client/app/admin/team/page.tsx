'use client'

import DashboardHero from '@/app/Components/DashboardHero'
import Heading from '@/app/Components/Heading'
import AdminProtected from '@/app/hooks/adminProtected'
import AdminSidebar from "@/app/Components/AdminSidebar"
import React from 'react'
import AllUsers from '@/app/Components/AllUsers'
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            {/* <AdminProtected> */}
            <Heading title='LearnZilla - Admin' description='LearnZilla Online Learning Platform' keywords='NA' />
            <div className='flex h-[100%]'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%]'>
                    <DashboardHero />
                    <AllUsers isAdmin={true} />
                </div>
            </div>
            {/* </AdminProtected>s */}
        </div>
    )
}
export default page