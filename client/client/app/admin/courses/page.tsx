'use client'

import DashboardHero from '@/app/Components/DashboardHero'
import Heading from '@/app/Components/Heading'
import AdminProtected from '@/app/hooks/adminProtected'
import AdminSidebar from "@/app/Components/AdminSidebar"
import React from 'react'
import AllCourses from '@/app/Components/AllCourses'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading title='LearnZilla - Admin' description='LearnZilla Online Learning Platform' keywords='NA' />
                <div className='flex h-screen'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]'>
                        <DashboardHero />
                        <AllCourses />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}