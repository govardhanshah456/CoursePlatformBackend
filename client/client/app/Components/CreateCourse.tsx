'use client'
import React, { useEffect, useState } from 'react'
import CourseInfo from './CourseInfo'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/course/courseApi'
import toast from 'react-hot-toast'

const CreateCourse = () => {
    const [active, setActive] = useState(0)
    const [createCourse, { isLoading, error, isSuccess }] = useCreateCourseMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success('Created Course Successfully')
        }
        if (error) {
            toast.error((error as any)?.data?.message || 'Unknown Error Ocucured')
        }
    })
    const [courseInfo, setCourseInfp] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
        categories: ""
    })
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                },
            ],
            suggestion: "",
            videoLength: ""
        }
    ])
    const [courseData, setCourseData] = useState({})
    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit: any) => ({ title: benefit.title }))
        const formattedPrerequisites = prerequisites.map((benefit: any) => ({ title: benefit.title }))
        const formattedCourseContentData = courseContentData.map((CourseContent: any) => ({
            videoUrl: CourseContent.videoUrl,
            title: CourseContent.title,
            description: CourseContent.descrition,
            videoSection: CourseContent.videoSection,
            links: CourseContent.links,
            suggestion: CourseContent.suggestion,
            videoLength: CourseContent.videoLength
        }))
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            thumbnail: courseInfo.thumbnail,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
            categories: courseInfo.categories
        }
        setCourseData(data)
    }
    const handleCourseCreate = async () => {
        console.log(courseData)
        if (!isLoading) {
            await createCourse(courseData)
        }
    }
    return (
        <div className='w-full flex min-h-[100%]'>
            <div className='w-[80%]'>
                {
                    active === 0 && (
                        <CourseInfo courseInfo={courseInfo} setCourseInfo={setCourseInfp} active={active} setActive={setActive} />
                    )
                }
                {
                    active === 1 && (
                        <CourseData active={active} setActive={setActive} benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit} />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate} />
                    )
                }
            </div>
            <div className='w-[20%] mt-[100px] h-[100%] fixed z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse