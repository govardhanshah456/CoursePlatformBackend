import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles';
import Image from 'next/image';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

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
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }

    }
    const { data } = useGetHeroDataQuery("categories", {
        refetchOnMountOrArgChange: true
    })
    const [categoriesResponse, setCategoriesResponse] = useState<any[]>([]);
    useEffect(() => {
        if (data?.layout?.categories) {
            setCategoriesResponse(data?.layout?.categories || [])
        }
    }, [data])
    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDragging(true)
    }
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }
    console.log(courseInfo.thumbnail)
    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                <label htmlFor='' className={`${styles.label}`}>
                    Course Name
                </label>
                <input type='text' name="" required value={courseInfo.name} onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })} id="name" placeholder='Enter COurse Name, ex- MERN Stack Mastery' className={styles.input} />
                <br />
                <div className='mb-5'>
                    <label className={`${styles.label}`}>Course Description</label>
                    <textarea name='' id='' cols={30} rows={8} placeholder='Enter Course Description' className={`${styles.input} !h-min py-2`} value={courseInfo.description} onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })} />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div>
                        <label className={`w-[45%] ${styles.label}`}>
                            Course Price
                        </label>
                        <input type='number' name='' required value={courseInfo.price} onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })} id='price' placeholder='29' className={`${styles.input}`} />
                    </div>
                    <div>
                        <label className={`w-[45%] ${styles.label}`}>
                            Estimated Course Price
                        </label>
                        <input type='number' name='' value={courseInfo.estimatedPrice} onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })} id='estimatedPrice' placeholder='29' className={`${styles.input}`} />
                    </div>
                </div>
                <br />
                <div>
                    <label className={`w-[45%] ${styles.label}`}>
                        Course Tags
                    </label>
                    <input type='text' name='' value={courseInfo.tags} onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })} id='tags' placeholder='ML,MERN' className={`${styles.input}`} />
                </div>
                <br />
                <div className='w-[50%]'>
                    <label className={`w-[45%] ${styles.label}`}>
                        Course Categories
                    </label>
                    <select name="" id="" className={styles.input} value={courseInfo.category} onChange={(e: any) => setCourseInfo({ ...courseInfo, category: e.target.value })}>
                        <option value="">Select Categories</option>
                        {
                            categoriesResponse.map((cat) => (
                                <option value={cat.title} key={cat._id}>
                                    {cat._id}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <br />

                <div className='w-full flex justify-between'>
                    <div>
                        <label className={`w-[45%] ${styles.label}`}>
                            Course Level
                        </label>
                        <input type='text' name='' value={courseInfo.level} onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })} id='level' placeholder='Easy,Medium,Hard' className={`${styles.input}`} />
                    </div>
                    <div>
                        <label className={`w-[45%] ${styles.label}`}>
                            Demo URL
                        </label>
                        <input type='text' name='' value={courseInfo.demoUrl} onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })} id='demoUrl' placeholder='http://a.com' className={`${styles.input}`} />
                    </div>
                </div>
                <br />
                <div className='w-full'>

                    <label className={`${styles.label} w-full min-h-[10vh] dark:border-white border-black p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                        }`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        {
                            courseInfo.thumbnail ? (
                                <img src={courseInfo.thumbnail.url ? courseInfo.thumbnail.url : courseInfo.thumbnail} alt="" className='max-h-full w-full object-cover' />
                            ) : (
                                <span className='text-black dark:text-white'>
                                    Drag and Drop thumbnail here or click to browse
                                    <input type='file' accept='image/a' id='file' className='hidden' onChange={handleFileChange} title='file' placeholder='file' />
                                </span>
                            )
                        }
                    </label>

                </div>
                <br />
                <br />
                <div className='w-full flex items-center justify-end'>
                    <input type='submit' value={"next"} className='w-full 800px:w-[100px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                </div>
            </form>
        </div>
    )
}

export default CourseInfo