import CourseContentFull from '@/app/Components/CourseContentFull';
import Loader from '@/app/Components/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
    params: any
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {})
    useEffect(() => {
        if (data) {
            const isPurchased = data?.user?.courses?.find((item: any) => item._id === id)
            if (!isPurchased) {
                redirect("/")
            }
        }
    }, [data, id])
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <CourseContentFull id={id} />
                )
            }
        </>
    )
}

export default Page