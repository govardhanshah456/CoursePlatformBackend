'use client'

import CourseDetailsPage from '@/app/Components/CourseDetailsPage'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const params = useParams()
    return (
        <div>
            <CourseDetailsPage id={params.id as string} />
        </div>
    )
}

export default Page