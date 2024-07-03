'use client'

import DashboardHero from '@/app/Components/DashboardHero'
import Heading from '@/app/Components/Heading'
import AdminProtected from '@/app/hooks/adminProtected'
import AdminSidebar from "@/app/Components/AdminSidebar"
import React from 'react'
import AllUsers from '@/app/Components/AllUsers'
import EditCourse from '@/app/Components/EditCourse'
import { useParams, useSearchParams } from 'next/navigation'
type Props = {}

const Page = () => {
    const params = useParams()
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
                    <EditCourse id={params.id as string} />
                </div>
            </div>
            {/* </AdminProtected> */}
        </div>
    )
}
export default Page