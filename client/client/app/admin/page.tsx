'use client'
import React from 'react'
import Heading from '../Components/Heading'
import AdminSidebar from '../Components/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'

const page = () => {
    return (
        <div>
            {/* <AdminProtected> */}
            <Heading title="LearnZilla - Admin" description='LearnZilla is a platform for students  to learn courses' keywords='any' />
            <div className='flex h-[200vh]'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[65%]'>

                </div>
            </div>
            {/* </AdminProtected> */}
        </div>
    )
}

export default page