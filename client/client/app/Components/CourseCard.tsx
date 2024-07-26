import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Ratings from './Ratings';

type Props = {
    course: any;
    isProfile?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, isProfile }: Props) => {
    return (
        <Link href={!isProfile ? `course/${course._id}` : `course-access/${course._id}`}>
            <div className='w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
                <Image src={course?.thumbnail?.ur} width={500} height={500} objectFit='contain' className='rounded w-full' alt='' />
                <br />
                <h1 className='font-Poppins text-[16px] text-black dark:text-white'>
                    {course.name}
                </h1>
                <div className='w-full flex items-center justify-between pt-2'>
                    <Ratings rating={course.rating} />
                    <h5 className={`text-black dark:text-white ${isProfile ? "hidden 800px:inline" : ""
                        }`}>
                        {course.purchased} Students
                    </h5>
                </div>
                <div className='w-full flex items-center justify-between pt-3'>
                    <div className='flex'>
                        <h3 className='text-black dark:text-white'>
                            {course.price === 0 ? "Free" : "$" + course.price}
                        </h3>
                        <div className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white '>
                            {course.estimatedPrice}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard