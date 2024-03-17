'use client'
import React from 'react'
import Heading from '../Components/Heading'
import CreateCourse from '../Components/CreateCourse'
import Sidebar from '../Components/AdminSidebar'

type Props = {

}

const page = (props: Props) => {
    return (
        <div>
            <Heading title='LearnZilla - Admin' description='abc' keywords='abc' />
            <div className='flex'>
                <div className='1500px:w-[16%] w-1/5'>
                    <Sidebar />
                </div>
                <div className='w-[85%]'>
                    <CreateCourse />
                </div>
            </div>
        </div>
    )
}

export default page
