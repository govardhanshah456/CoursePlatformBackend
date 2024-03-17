import React, { useState } from 'react'
import { styles } from '../Styles/styles';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInfo: React.FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }
    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <label htmlFor=''>
                    Course Name
                </label>
                <input type='text' name="" required value={courseInfo.name} onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })} id="name" placeholder='Enter COurse Name, ex- MERN Stack Mastery' className={styles.input} />
                <br />
                <div className='mb-5'>
                    <label className={`${styles.label}`}>Course Description</label>
                    <textarea name='' id='' cols={30} rows={8} placeholder='Enter Course Description' className={`${styles.input} !h-min py-2`} value={courseInfo.description} onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })} />
                </div>
            </form>
        </div>
    )
}

export default CourseInfo