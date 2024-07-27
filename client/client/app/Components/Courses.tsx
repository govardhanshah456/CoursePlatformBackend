import { useGetUsersAllCoursesQuery } from '@/redux/features/course/courseApi'
import React from 'react'
import CourseCard from './CourseCard';

type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto`}>
                <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight'>
                    Expand Your Career
                </h1>
                <span className='text-gradient'>Opportunity</span>
                <br />
                Opportunity With Our Courses
                <br />
                <br />
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1550px:gap-[35px] mb-12 border-0'>
                    {
                        data && data?.courses && data?.courses?.length > 0 && data?.courses?.map((course: any, index: number) => (
                            <CourseCard course={course} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses