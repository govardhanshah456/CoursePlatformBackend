import React from 'react'
import { useSelector } from 'react-redux'
import Ratings from './Ratings'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import Link from 'next/link'
import { styles } from '../Styles/styles'

type Props = {
    data: any
}

const CourseDetailsCard: React.FC<Props> = ({ data }: Props) => {
    const user = useSelector((state: any) => state.auth)
    const discoutnPercentage = ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
    const discoutnPercentagePrice = discoutnPercentage.toFixed(0);
    const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id);
    return (
        <div>
            <div className='w-[90%] 800px:w-[90%] m-auto py-5'>
                <div className='w-full flex flex-col-reverse 800px:flex-row'>
                    <div className='w-full 800px:w-[65%] 800px:pr-5'>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            {data.name}
                        </h1>
                        <div className='flex items-center justify-between pt-3'>
                            <div className='flex items-center'>
                                <Ratings rating={data?.rating} />
                                <h5 className='text-black dark:text-white'>
                                    {data?.reviews?.length} Reviews
                                </h5>
                            </div>
                            <h5 className='text-black dark:text-white'>{data?.purchased} Students</h5>
                        </div>
                        <br />
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            What you will learn from this course?
                        </h1>
                        <div>
                            {data?.benefits?.map((item: any, index: number) => (
                                <div key={index} className='w-full flex 800px:items-center py-2'>
                                    <div className='w-[15px] mr-1'>
                                        <IoCheckmarkDoneOutline size={20} className='text-black dark:text-black' />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />

                        </div>
                        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                            What are the prerequisuites for starting this course?
                        </h1>
                        <div>
                            {data?.prerequisuites?.map((item: any, index: number) => (
                                <div key={index} className='w-full flex 800px:items-center py-2'>
                                    <div className='w-[15px] mr-1'>
                                        <IoCheckmarkDoneOutline size={20} className='text-black dark:text-black' />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                            <div>
                                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                    Course Overview
                                </h1>
                            </div>
                            <br />
                            <br />
                            <div className='w-full'>
                                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                    Course Details
                                </h1>
                                <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                                    {data?.description}
                                </p>
                            </div>
                            <br />
                            <br />
                            <div className='w-full'>
                                <div className='800px:flex items-center'>
                                    <Ratings rating={data.rating} />
                                    <div className='mb-2 800px:mb-[unset]' />
                                    <h5 className='text-[25px] font-Poppins text-black dark:text-white'>
                                        {
                                            Number.isInteger(data?.rating) ? data?.rating?.toFixed(1) + "Course Ratings" : data?.rating?.toFixed(2) + "Course Ratings"
                                        }

                                    </h5>
                                </div>
                                <br />
                                {data?.reviews && data?.reviews?.map((item: any, index: number) => (
                                    <div key={index} className='w-full pb-4'>
                                        <div className='flex'>
                                            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                                <h1 className='uppercase text-[18px] text-black dark:text-white'>
                                                    {item?.user?.name?.slice(0, 2)}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className='hidden 800px:block pl-2'>
                                            <div className='flex items-center'>
                                                <h5 className='text-[18px] pr-2 text-black dark:text-white'>{item?.user?.name}</h5>
                                                <Ratings rating={item?.rating} />
                                            </div>
                                            <p className='text-black dark:text-white'>{item?.comment}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {
                        data?.demoUrl && (
                            <div className='w-full 800px:w-[35%] relative'>
                                <div className='sticky top-[100px] left-0 z-50 w-full'>
                                    <video src={data?.demoUrl} />
                                    <div className='flex items-center'>
                                        <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                                            {data?.price === 0 ? "Free" : "$" + data?.price}
                                        </h1>
                                        <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                                            {data?.estimatedPrice}
                                        </h5>
                                        <h4 className='pl-5 pt-4 text-[22px] text-black dark:text-white'>
                                            {discoutnPercentagePrice}% off
                                        </h4>
                                    </div>
                                    <div className='flex items-center'>
                                        {
                                            isPurchased ? (
                                                <Link className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`} href={`course-access/${data?._id}`}>
                                                    Enter to Course
                                                </Link>
                                            ) : (
                                                <div className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}>
                                                    Buy Now
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsCard