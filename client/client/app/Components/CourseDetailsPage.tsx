import { useGetCourseDetailsQuery } from '@/redux/features/course/courseApi';
import React, { useState } from 'react'
import Loader from './Loader';
import Heading from './Heading';
import Header from './Header';
import CourseDetailsCard from './CourseDetailsCard';

type Props = {
    id: string;
}

const CourseDetailsPage: React.FC<Props> = ({ id }: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetCourseDetailsQuery({})
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading title={data?.course?.name + "- ELearning"} description={"vyovyovo"} keywords={data?.course?.tags} />
                        <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
                        <CourseDetailsCard data={data?.course} />
                    </div>
                )
            }
        </>
    )
}

export default CourseDetailsPage