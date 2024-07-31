import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
    data?: any;
    activeVideo?: number;
    setActiveVide?: any;
    isDemo?: boolean;
}

const CourseCOntentList: React.FC<Props> = ({ data, activeVideo, isDemo, setActiveVide }: Props) => {
    const videoSections: string[] = [
        ...new Set<string>(data?.map((item: any) => item.videoSection))
    ]
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>())
    let totalCount: number = 0;
    const toggleSection = (section: string) => {
        const newVisibleSection = new Set(visibleSections)
        if (newVisibleSection.has(section)) {
            newVisibleSection.delete(section)
        }
        else {
            newVisibleSection.add(section);
        }
        setVisibleSections(newVisibleSection)
    }
    return (
        <div className={`mt-[15px] w-full ${!isDemo && 'ml-[-30px] sticky top-24 left-0 z-30'}`}>
            {
                videoSections.map((section: string, sectionIndex: number) => {
                    const isSectionVisible = visibleSections.has(section);
                    const sectionVideos: any[] = data?.filter((item: any) => item?.videoSection === section);
                    const sectionVideoCount: number = sectionVideos.length;
                    const videoLength: number = sectionVideos.reduce((totalLength: number, item: any) => totalLength + item?.videoLength)
                    const sectionStartIndex: number = totalCount;
                    totalCount += sectionVideoCount;

                    const sectionContentHour: number = videoLength / 60;
                    return (
                        <>
                            <div key={section} className={`${!isDemo && 'border-b border-[#ffffff8e] pb-2'}`}>
                                <div className='w-full flex justify-between items-center'>
                                    <h2 className='text-[22px] text-black dark:text-white'>{section}</h2>
                                    <button onClick={() => toggleSection(section)} className='mr-4 cursor-pointer text-black dark:text-white'>
                                        {
                                            isSectionVisible ? (
                                                <BsChevronUp size={20} />
                                            ) : (
                                                <BsChevronDown size={20} />
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                            <h5 className='text-black dark:text-white'>
                                {sectionVideoCount} Lessons
                                {videoLength < 60 ? (
                                    videoLength
                                ) : (
                                    sectionContentHour.toFixed(2)
                                )}
                                {videoLength > 60 ? "hours" : "minutes"}
                            </h5>
                            <br />
                            {isSectionVisible && (
                                <div className='w-full'>
                                    {
                                        sectionVideos.map((item: any, index: number) => {
                                            const videoIndex: number = sectionStartIndex + index;
                                            const contentLength: number = item.videoLength / 60;
                                            return (
                                                <div onClick={() => !isDemo ? null : setActiveVide(videoIndex)} key={index} className={`w-full ${videoIndex === activeVideo && "bg-slate-800"} cursor-pointer transition-all p-2`}>
                                                    <div className='flex items-start'>
                                                        <div>
                                                            <MdOutlineOndemandVideo size={25} className='mr-2' color='#1cdada' />
                                                        </div>
                                                        <h1 className='text-[18px] inline-block break-words text-black dark:text-white'>
                                                            {item.title}
                                                        </h1>
                                                    </div>
                                                    <h5 className='pl-8 text-black dark:text-white'>
                                                        {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength}
                                                        {item.videoLength > 60 ? "hours" : "minutes "}
                                                    </h5>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )}
                        </>
                    )
                })
            }
        </div>
    )
}

export default CourseCOntentList