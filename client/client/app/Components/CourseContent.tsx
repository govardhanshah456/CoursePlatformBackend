import React, { FC, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { styles } from '../Styles/styles';
import axios from "axios"
import { useUploadVideoMutation } from '@/redux/features/course/courseApi';
import toast from 'react-hot-toast';
import Loader from './Loader';
import UploadPercent from './UploadPercent';
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
    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed]
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed)
    }
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | any>(null)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadVideo, { isSuccess, error }] = useUploadVideoMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("Uploading Completed Successfully")
        }
        if (error) {
            toast.error("error Occured")
        }
    })
    const handleFileChange = async (e: any, index: number) => {
        try {
            setUploading(true);
            const formData = new FormData();
            const videoFile = e.target.files[0]
            formData.append('file', videoFile)
            console.log(formData.get('file'))
            const config = {
            };
            // const response = await axios.post('http://localhost:8000/api/v1/upload-video', formData)
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:8000/api/v1/upload-video', true);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    console.log(percentComplete)
                    setUploadProgress(percentComplete);
                }
            };
            let response: any = null;
            xhr.onload = () => {
                // Upload complete
                if (xhr.status === 200) {
                    console.log('Upload complete');
                    setUploadProgress(100);
                    response = JSON.parse(xhr.responseText)
                    const updatedData = [...courseContentData]
                    console.log(response)
                    updatedData[index].videoUrl = response?.result?.secure_url
                    console.log(updatedData[index])
                    setCourseContentData(updatedData);
                    setUploading(false);
                } else {
                    console.error('Upload failed');
                }
            };

            xhr.onerror = () => {
                console.error('Upload error');
            };

            xhr.send(formData);


        } catch (error) {
            console.log(error)
            setUploading(false);
            const updatedData = [...courseContentData]
            updatedData[index].videoUrl = ''
            setCourseContentData(updatedData);
        }
    };
    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {
                        const showSectionInput = (!!!index) || item.videoSection !== courseContentData[index - 1].videoSection;
                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                                    }`}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <input type="text" className={`text-[20px] ${item.videoSection === "Untitled Section" ? 'w-[170px]' : 'w-min'
                                                    } font-Poppins dark:text-white text-black bg-transparent outline-none`}
                                                    value={item.videoSection}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData]
                                                        updatedData[index].videoSection = e.target.value
                                                        setCourseContentData(updatedData)
                                                    }}
                                                />
                                            </>
                                        )
                                    }
                                    <div className='flex w-full items-center justify-between my-8'>
                                        {
                                            isCollapsed[index] ? (
                                                <>
                                                    {item.title ? (
                                                        <p className='font-Poppins dark:text-white text-black'>
                                                            {index + 1}.{item.title}
                                                        </p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        <div className='flex items-center'>
                                            <AiOutlineDelete className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? 'cursor-pointer' : "cursor-no-drop"} `}
                                                onClick={() => {
                                                    if (!!index) {
                                                        const updatedData = [...courseContentData]
                                                        updatedData.splice(index, 1)
                                                        setCourseContentData(updatedData)
                                                    }
                                                }} />
                                            <MdOutlineKeyboardArrowDown fontSize={'large'} className='dark:text-white text-black' style={{
                                                transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)'
                                            }} onClick={() => handleCollapseToggle(index)} />
                                        </div>
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className='my-3'>
                                                    <label className={styles.label}>Video Title</label>
                                                    <input type='text' placeholder='Project Plan' className={`${styles.input}`} value={item.title} onChange={(e) => {
                                                        const updatedData = [...courseContentData]
                                                        updatedData[index].title = e.target.value
                                                        setCourseContentData(updatedData)
                                                    }} />
                                                </div>
                                                <div className='mb-3'>
                                                    <label className={`${styles.label} dark:text-white text-black`}>Upload Video<br /></label>
                                                    <input type='file' onChange={(e) => handleFileChange(e, index)} className='dark:text-white text-black' />
                                                    <br />
                                                    {uploading && uploadProgress != 100 && (
                                                        <UploadPercent percentage={uploadProgress} />
                                                    )}
                                                    {
                                                        uploadProgress === 100 && item.videoUrl === "" && (
                                                            <p className='dark:text-white text-black'>Please wait while video is processing...</p>
                                                        )
                                                    }
                                                    {!uploading && item.videoUrl != "" && (
                                                        <div>
                                                            <p className='dark:text-white text-black'>Video uploaded successfully!</p>
                                                            <video src={item.videoUrl} controls />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        )
                    })

                }
            </form>
        </div>
    )
}

export default CourseContent
