import React, { FC, useState } from 'react'

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false))
    const [activeSection, setActiveSection] = useState(1)
    const handleSubmit = () => {

    }
    return (
        <div>

        </div>
    )
}

export default CourseContent
