'use client'

import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import Header from '../Components/Header'
import Heading from '../Components/Heading'
import CourseCard from '../Components/CourseCard'

type Props = {}

const Page = (props: Props) => {
    const params = useSearchParams()
    const search = params?.get('title');
    const { data, isLoading } = useGetAllCoursesQuery(undefined, {})
    const { data: categoriesData } = useGetHeroDataQuery("categories", {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState([]);
    const [category, setCategory] = useState("All")

    useEffect(() => {
        if (category === "All") {
            setCourse(data?.courses);
        }
        if (category !== "All") {
            setCourse(data?.courses?.filter((cr: any) => cr.categories === category))
        }
        if (search) {
            setCourse(data?.courses?.filter((cr: any) => cr?.name?.toLowerCase().includes(search?.toLowerCase())))
        }
    }, [category, data?.courses, search])
    const categories = categoriesData?.layout?.categories;
    return (
        <div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                        <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
                            <Heading title='All Courses' description='' keywords='' />
                            <br />
                            <div className='w-full flex items-center flex-wrap'>
                                <div className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={() => setCategory("All")}>
                                    All
                                </div>
                                {
                                    categories && categories?.map((item: any, index: number) => (
                                        <div key={index}>
                                            <div className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={() => setCategory(item.title)}>
                                                {item?.title}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                course && course?.length === 0 && (
                                    <p>{search ? "No Courses Found!" : "No COurses Found of iven category!"}</p>
                                )
                            }
                            <br />
                            <br />
                            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1550px:gap-[35px] mb-12 border-0'>
                                {
                                    course && course?.length > 0 && course.map((cr: any, index: number) => (
                                        <CourseCard course={cr} key={index} />
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Page