import { useGetCourseContentQuery } from '@/redux/features/course/courseApi'
import React, { useState } from 'react'
import Loader from './Loader'
import Heading from './Heading'
import CourseContentMedia from './CourseContentMedia'
import Header from './Header'
import CourseCOntentList from './CourseCOntentList'

type Props = {
    id: string;
    user: any;
}

const CourseContentFull: React.FC<Props> = ({ id, user }: Props) => {
    const { data, isLoading, refetch } = useGetCourseContentQuery(id, {
        refetchOnMountOrArgChange: true
    })
    const courseContentData = data?.content
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState('Login')
    const [activeVideo, setActiveVideo] = useState(0);
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Header route={route} setRoute={setRoute} activeItem={1} open={open} setOpen={setOpen} />
                        <div className='w-full grid 800px:grid-cols-0'>
                            <Heading title={data[activeVideo]?.title} description="God Knows I Want to Break Free" keywords={data[activeVideo]?.tags} />
                            <div className='col-span-7'>
                                <CourseContentMedia refetch={refetch} data={courseContentData} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} user={user} />
                            </div>
                            <div className='hidden 800px:block 800px:col-span-3'>
                                <CourseCOntentList setActiveVide={setActiveVideo} data={data} activeVideo={activeVideo} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CourseContentFull