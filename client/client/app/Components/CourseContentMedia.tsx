import React, { useState } from 'react'
import { styles } from '../Styles/styles';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
}

const CourseContentMedia: React.FC<Props> = ({ data, id, activeVideo, setActiveVideo }: Props) => {
    const [activeBar, setActiveBar] = useState(0)
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
                    <div></div>
                )
            }
        </div>
    )
}

export default CourseContentMedia