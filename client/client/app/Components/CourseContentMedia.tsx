import React, { useState } from 'react'
import { styles } from '../Styles/styles';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import lena512color from "../../public/lena512color.jpg"

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user?: any;
}

const CourseContentMedia: React.FC<Props> = ({ data, user, id, activeVideo, setActiveVideo }: Props) => {
    const [activeBar, setActiveBar] = useState(0)
    const [comment, setComment] = useState("");
    const [review, setReview] = useState("")
    const hasReviewed = data?.reviews?.some((review: any) => review?.user?._id === user?._id)
    const [rating, setRating] = useState(0)
    return (
        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
            {data[activeVideo]?.title}
            <video src={data[activeVideo]?.videoUrl} />
            <div className='w-full flex items-center justify-between my-3'>
                <div onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)} className={`${styles.button} !w-[unset] !min-h-[40px] !py-unset ${activeVideo === 0 && "!cursor-no-drop opacity-[.0]"} text-white `}>
                    <AiOutlineArrowLeft className='mr-2' />
                    Prev Lesson
                </div>
                <div onClick={() => setActiveVideo(data && data?.length - 1 === activeVideo ? activeVideo : activeVideo + 1)} className={`${styles.button} !w-[unset] !min-h-[40px] !py-unset ${activeVideo === data?.length - 1 && "!cursor-no-drop opacity-[.0]"} text-white `}>
                    <AiOutlineArrowRight className='ml-2' />
                    Next Lesson
                </div>
            </div>
            <h1 className='pt-2 text-[25px] font-[600]'>{data[activeVideo]?.title}</h1>
            <br />
            <div className='w-full p-4 flex items-center justify-center bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
                {
                    ["Overview", "Resources", "Q&A", "Reviews"].map((text: any, index: number) => (
                        <h5 className={` dark:text-white text-black 800px:text-[20px] cursor-pointer ${activeBar === index && "text-red-500"}`} key={index} onClick={() => setActiveBar(index)}>{text}</h5>
                    ))
                }

            </div>
            <br />
            {
                activeBar === 0 && (
                    <p className='text-[18px] whitespace-pre-line mb-3 dark:text-white text-black'>
                        {data[activeVideo]?.description}
                    </p>
                )
            }
            {
                activeBar === 1 && (
                    <div>
                        {
                            data[activeVideo]?.links?.map((item: any, index: number) => (
                                <div className='mb-5' key={index}>
                                    <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                                        {item.title && item.title + ": "}
                                    </h2>
                                    <a className='inline-block text-[#4395c4] 800px:pl-2' href={item.url}>
                                        {item.url}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <>
                        <div className='flex w-full'>
                            <Image src={user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />
                            <textarea name='' value={comment} onChange={(e) => setComment(e.target.value)} id="" cols={40} rows={5} placeholder='write your question' className='outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins' />
                        </div>
                        <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5`}>
                            Submit
                        </div>
                        <br />
                        <br />

                    </>
                )
            }
            {
                activeBar === 3 && (
                    <>
                        <div className='w-full'>
                            {
                                !hasReviewed && (
                                    <>
                                        <div className='w-full flex'>
                                            <Image src={user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />
                                            <div className='w-full'>
                                                <h5 className='pl-3 text-[20px] font-[500] dark:text-white text-black'>Give a rating <span className='text-red-500'>*</span></h5>
                                                <div className='flex w-full ml-2 pb-2'>
                                                    {
                                                        [1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                                            <AiFillStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                                        ) : (
                                                            <AiOutlineStar key={i} className='mr-1 cursor-pointer' color='rgb(246,186,0)' size={25} onClick={() => setRating(i)} />
                                                        ))
                                                    }
                                                </div>
                                                <textarea name='' value={review} onChange={(e) => setReview(e.target.value)} id="" cols={40} rows={5} placeholder='write your question' className='outline-none bg-transparent ml-3 border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins' />
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-end'>
                                            <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5`}>
                                                Submit
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CourseContentMedia