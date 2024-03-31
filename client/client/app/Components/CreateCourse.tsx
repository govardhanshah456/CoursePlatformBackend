'use client'
import React, { useState } from 'react'
import CourseInfo from './CourseInfo'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'

const CreateCourse = () => {
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfp] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
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
            suggestion: ""
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
            suggestion: CourseContent.suggestion
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
            CourseContent: formattedCourseContentData
        }
        setCourseData(data)
    }

    return (
        <div className='w-full flex min-h-screen'>
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
                        <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleSubmit} />
                    )
                }
            </div>
            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse