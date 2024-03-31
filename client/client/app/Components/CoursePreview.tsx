import React from 'react'
import { styles } from '../Styles/styles';
import Ratings from './Ratings';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
}

const CoursePreview: React.FC<Props> = ({ active, setActive, courseData, handleCourseCreate }) => {
    const discountPercentage = (((courseData?.estimatedprice - courseData?.price) / courseData?.price) * 100).toFixed(2)
    const handleNext = () => {
        handleCourseCreate()
    }
    return (
        <div className='w-[90%] m-auto py05 mb-5'>
            <div className='w-full relative'>
                <div className='w-full mt-10'>
                    <video src={courseData.demoUrl} height={'500'} width={'315'} />
                </div>
                <div className='flex items-center'>
                    <h1 className='pt-5 text-[25px]'>
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>
                    <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
                        {courseData?.estimatedPrice}
                    </h5>
                    <h4 className='pl-5 pt-4 text-[22px]'>
                        {discountPercentage}% off
                    </h4>
                </div>
                <div className='flex items-center'>
                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
                        Buy Now {courseData?.price}$
                    </div>
                </div>
                <div className='flex items-center'>
                    <input type="text" className={`${styles.input} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`} />
                    <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
                        Apply
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full 800px:pr-5'>
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        {courseData?.name}
                    </h1>
                    <div className='flex items-center justify-between pt-3'>
                        <div className='flex items-center'>
                            <Ratings rating={0} />
                            <h5>0 Reviews</h5>
                        </div>
                        <h5>0 Students</h5>
                    </div>
                    <br />
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        What you will learn from this course?
                    </h1>
                </div>
                {courseData?.benefits?.map((item: any, index: any) => (
                    <div className='w-full flex 800px:items-center py-2' key={index}>
                        <div className='w-[15px] mr-1'>
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className='pl-2'>{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                <br />
                <h1 className='text-[25px] font-Poppins font-[600]'>
                    Prerequisites
                </h1>
                {courseData?.prerequisites?.map((item: any, index: any) => (
                    <div className='w-full flex 800px:items-center py-2' key={index}>
                        <div className='w-[15px] mr-1'>
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className='pl-2'>{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                <div className='w-full'>
                    <h1 className='text-[25px] font-Poppins font-[600]'>
                        Course Details
                    </h1>
                    {courseData?.description}
                </div>
                <br />
                <br />
                <div className='w-full flex items-center justify-end' >
                    <div className='w-full 800px:w-[100px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' onClick={() => handleNext()}>Next</div>
                </div>
            </div>
        </div>
    )
}

export default CoursePreview
