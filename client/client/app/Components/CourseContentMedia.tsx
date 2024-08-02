import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import lena512color from "../../public/lena512color.jpg"
import toast from 'react-hot-toast';
import { useAddNewAnswerMutation, useAddNewQuestionMutation, useAddReplyToReviewMutation, useAddReviewMutation, useGetCourseDetailsQuery } from '@/redux/features/course/courseApi';
import { BiMessage } from 'react-icons/bi';
import Ratings from './Ratings';
import socketIo from "socket.io-client"
const socketUrl = process.env.NEXT_WEB_SOCKET_SERVER_URI || ''
const socketId = socketIo(socketUrl, { transports: ["wesSocket"] })
type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user?: any;
    refetch?: any;
}

const CourseContentMedia: React.FC<Props> = ({ data, refetch, user, id, activeVideo, setActiveVideo }: Props) => {
    const [activeBar, setActiveBar] = useState(0)
    const [comment, setComment] = useState("");
    const [review, setReview] = useState("")
    const { data: courseData, refetch: refetchOnCourseCahnge } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true })
    const course = courseData?.course
    const hasReviewed = course?.reviews?.some((review: any) => review?.user?._id === user?._id)
    const [rating, setRating] = useState(0)
    const [addNewQuestion, { isSuccess, error, isLoading: questionLoading }] = useAddNewQuestionMutation()
    const [addNewAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading }] = useAddNewAnswerMutation()
    const handleQuestion = () => {
        if (comment.length === 0) {
            toast.error("Question can't be Empty!")
        }
        else {
            addNewQuestion({ question: comment, courseId: id, contentId: data[activeVideo]._id })
        }
    }
    const handleAnswerSubmit = () => {
        if (answer.length === 0) {
            toast.error("Answer can't be Empty!")
        }
        else {
            addNewAnswer({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: answerId })
        }
    }
    const [isReplyActive, setIsReplyActive] = useState(false)
    const [answer, setAnswer] = useState("");
    const [answerId, setAnswerId] = useState(0);
    const [reply, setReply] = useState("")
    useEffect(() => {
        if (isSuccess) {
            setComment("")
            toast.success("Question Added Successfully");
            refetch()
            socketId.emit("sendNotification", {
                title: "New Question Received",
                message: `You have a new question in ${data[activeVideo]?.title}`,
                userId: user._id
            })
        }
        if (error) {
            toast.error((error as any)?.data?.message || "Error while adding question")
        }
    }, [isSuccess, error, refetch, data, activeVideo, user._id])
    const [addReview, { isLoading: reviewLoading, isSuccess: reviewSuccess, error: reviewError }] = useAddReviewMutation()
    useEffect(() => {
        if (answerSuccess) {
            setAnswer("")
            setAnswerId(-1)
            toast.success("Answer Added Successfully");
            refetch()
            if (user?.role !== "admin") {
                socketId.emit("sendNotification", {
                    title: "New Question Reply Received",
                    message: `You have a new reply on question ${data[activeVideo]?.title}`,
                    userId: user._id
                })
            }
        }
        if (answerError) {
            toast.error((answerError as any)?.data?.message || "Error while adding answer")
        }
    }, [answerSuccess, answerError, refetch, user?.role, user._id, data, activeVideo])
    const handleReviewSubmit = () => {
        if (review.length === 0) {
            toast.error("Review can't be empty!")
        }
        else {
            addReview({ courseId: id, review, rating })
        }
    }
    useEffect(() => {
        if (reviewSuccess) {
            toast.success("Answer Added Successfully");
            setReview("");
            setRating(0)
            refetchOnCourseCahnge()
            socketId.emit("sendNotification", {
                title: "New Review Received",
                message: `You have a new review in ${data[activeVideo]?.title}`,
                userId: user._id
            })

        }
        if (reviewError) {
            toast.error((reviewError as any)?.data?.message || "Error while adding Review")
        }
    }, [refetchOnCourseCahnge, reviewSuccess, reviewError, data, activeVideo, user._id])
    const [reviewId, setReviewId] = useState("")
    const [addReplyToReview, { isSuccess: replySuccess, isLoading: replyLoading, error: replyError }] = useAddReplyToReviewMutation()
    const handleReplySubmit = () => {
        if (reply.length === 0) {
            toast.error("Reply can't be empty!")
        }
        else {
            addReplyToReview({ comment: reply, courseId: id, reviewId })
        }
    }
    useEffect(() => {
        if (replySuccess) {
            toast.success("Answer Added Successfully");
            setReply("");
            setReviewId("");
            refetchOnCourseCahnge()

        }
        if (replyError) {
            toast.error((replyError as any)?.data?.message || "Error while adding Review")
        }
    }, [refetchOnCourseCahnge, replySuccess, replyError])
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
                        <div onClick={questionLoading ? () => { } : handleQuestion} className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            Submit
                        </div>
                        <br />
                        <br />
                        <div className='w-full h-[1px] bg-[#ffffff3b]'></div>
                        <div>
                            <CommentReply data={data} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} user={user} setAnswerId={setAnswerId} />
                        </div>
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
                                            <div onClick={reviewLoading ? () => { } : handleReviewSubmit} className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${reviewLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                Submit
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            <br />
                            <div className='w-full h-[1px] bg-[#ffffff3b]'>
                                <div className='w-full'>
                                    {
                                        course?.reviews && course?.review?.map((item: any, index1: number) => (
                                            <div key={index1} className='w-full my-5'>
                                                <div className='w-full flex'>
                                                    <div>
                                                        <Image src={item?.user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />

                                                    </div>
                                                    <div className='w-[50px] h-[50px]'>
                                                        <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                                            <h1 className='uppercase text-[18px]'>
                                                                {item?.user?.name?.slice(0, 2)}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                    <div className='pl-3 text-black dark:text-white'>
                                                        <h5 className='text-[20px]'>{item?.user?.name}</h5>
                                                        <Ratings rating={item?.rating} />
                                                        <p>{item?.comment}</p>
                                                    </div>
                                                </div>
                                                {
                                                    user?.role === "admin" && (
                                                        <span onClick={() => { setIsReplyActive(true); setReviewId(item._id) }} className={`${styles.label} !ml-10 cursor-pointer`}>
                                                            Add Reply
                                                        </span>
                                                    )
                                                }
                                                {
                                                    isReplyActive && (
                                                        <div className='w-full flex relative'>
                                                            <input value={reply} onChange={(e) => setReply(e.target.value)} type="text" name="" id="" className={`${styles.input} !border-[0px] rounded-none w-[90%] ml-[3%] !border-b dark:text-white text-black ${replyLoading ? "cursor-not-allowed" : "cursor-pointer"}`} />
                                                            <button className='absolute right-0 bottom-1' onClick={replyLoading ? () => { } : handleReplySubmit}></button>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    item?.commentReplies?.map((item1: any, index1: number) => (
                                                        <>
                                                            <div key={index1} className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'>
                                                                <div>
                                                                    <Image src={item1?.user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />
                                                                </div>
                                                                <div className='pl-2'>
                                                                    <h5 className='text-[20px]'>{item1?.user?.name}</h5>
                                                                    <p>{item1.comment}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <br />

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CourseContentMedia

const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setAnswerId }: any) => {
    return (
        <>
            <div className='w-full my-3'>
                {
                    data[activeVideo]?.questions?.map((item: any, index: number) => (
                        <CommentItem setAnswerId={setAnswerId} key={index} data={data} activeVideo={activeVideo} item={item} index={index} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} />
                    ))
                }
            </div>
        </>
    )
}

const CommentItem = ({ data, setAnswerId, activeVideo, item, index, answer, setAnswer, handleAnswerSubmit }: any) => {
    const [replya, setReplya] = useState(false)
    return (
        <>
            <div className='my-4'>
                <div className='flex mb-2'>
                    <div>
                        <Image src={item?.user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />

                    </div>
                    <div className='w-[50px] h-[50px]'>
                        <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                            <h1 className='uppercase text-[18px]'>
                                {item?.user?.name?.slice(0, 2)}
                            </h1>
                        </div>
                    </div>
                    <div className='pl-3 text-black dark:text-white'>
                        <h5 className='text-[20px]'>{item?.user?.name}</h5>
                        <p>{item?.question}</p>
                    </div>
                </div>
                <div className='w-full flex'>
                    <span onClick={() => { setReplya(!replya); setAnswerId(item._id) }} className='800px:pl-16 text-black dark:text-white cursor-pointer mr-2'>
                        {!replya ? item?.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                    </span>
                    <BiMessage size={20} className='cursor-pointer dark:text-white text-black' />
                    <span className='pl-1 mt-[-4px] cursor-pointer dark:text-white text-black'>
                        {item?.questionReplies?.length}
                    </span>
                </div>
                {
                    replya && (
                        item?.questionReplies?.map((item: any, index1: number) => (
                            <>
                                <div key={index1} className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'>
                                    <div>
                                        <Image src={item?.user?.avatar?.url || lena512color} width={50} height={50} alt='' className='w-[50px] h-[50px] rounded-full object-cover' />
                                    </div>
                                    <div className='pl-2'>
                                        <h5 className='text-[20px]'>{item?.user?.name}</h5>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </>
                        ))
                    )
                }
                <>
                    <div className='w-full flex relative dark:text-white text-black'>
                        <input type='text' placeholder='Enter your answer...' value={answer} onChange={(e) => setAnswer(e.target.value)} className='block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%]' />
                        <button className='absolute right-0 bottom-1' type='submit' onClick={handleAnswerSubmit} disabled={answer === ''}>Submit</button>
                    </div>
                </>
            </div>
        </>
    )
} 