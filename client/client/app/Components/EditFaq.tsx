import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import toast from 'react-hot-toast'

type Props = {}

const EditFaq = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true
    })
    const [question, setQuestion] = useState<any[]>([])
    const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation({})
    useEffect(() => {
        if (data) {
            setQuestion(data?.layout?.faq || [])
        }
        if (isSuccess) {
            toast.success("FAQ Updated Successfully!!!")
        }
        if (error) {
            toast.error((error as any)?.data?.message || "Unknown Error Occured")
        }
    }, [data, isSuccess, error])

    const toggleQuestion = (id: any) => {
        setQuestion((prevQuestion) => prevQuestion.map((q) => q._id === id ? { ...q, active: !q.active } : q))
    }

    const handleQuestionChange = (id: any, value: string) => {
        console.log(id)
        setQuestion((prevQuestion) => prevQuestion.map((q) => q._id === id ? { ...q, question: value } : q))
    }

    const handleAnswerChange = (id: any, value: string) => {
        setQuestion((prevQuestion) => prevQuestion.map((q) => q._id === id ? { ...q, answer: value } : q))
    }

    const newFaqHandler = () => {
        setQuestion([
            ...question,
            {
                _id: "temp-" + new Date(),
                question: "",
                answer: '',
                active: true
            }
        ])
    }

    const areQuestionsUnchanged = (questionsFromApi: any[], modifiedQuestionState: any[]) => {
        return JSON.stringify(questionsFromApi) === JSON.stringify(modifiedQuestionState)
    }

    const isQuestionEmpty = (questions: any[]) => {
        return questions.some((question) => question.question === "" || question.answer === "")
    }



    const handleEdit = async () => {
        if (!areQuestionsUnchanged(data?.layout?.faq, question) && !isQuestionEmpty(question)) {
            const questionsToSave = question.map(({ _id, ...rest }) => {
                // If it's a temporary ID, don't include it
                if (_id.startsWith('temp-')) {
                    return rest;
                }
                return { _id, ...rest };
            });
            await editHeroData({
                type: "FAQ",
                faq: questionsToSave
            })
        }
    }

    return (
        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
            <div className='mt-12'>
                <dl className='space-y-8'>
                    {
                        question?.map((q: any) => (
                            <div key={q._id} className={`${q._id !== question[0]?._id ? 'border-t' : ''} border-gray-200 pt-6`}>
                                <dt className='text-lg'>
                                    <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none' >
                                        <input className={`${styles.input} border-none`} value={q.question} onChange={(e) => handleQuestionChange(q._id, e.target.value)} placeholder='Add Questions.....' />
                                        <span className='ml-6 flex-shrink-0'>
                                            {q.active ? (
                                                <HiMinus size={20} onClick={() => toggleQuestion(q._id)} />
                                            ) : (
                                                <HiPlus size={20} onClick={() => toggleQuestion(q._id)} />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {q.active ? (
                                    <dd className='mt-2 pr-12'>
                                        <input className={`${styles.input} border-none`} value={q.answer} onChange={(e) => handleAnswerChange(q._id, e.target.value)} placeholder='Add Answer......' />
                                        <span className='ml-6 flex-shrink-0'>
                                            <AiOutlineDelete className='dark:text-white text-black text-[10px] cursor-pointer' size={20} onClick={() => {
                                                setQuestion((prevQuestions) => prevQuestions.filter((q1) => q1._id !== q._id))
                                            }} />
                                        </span>
                                    </dd>
                                ) : null}
                            </div>
                        ))
                    }
                </dl>
                <br />
                <br />
                <IoMdAddCircleOutline className='dark:text-white text-black text-[25px] cursor-pointer' onClick={newFaqHandler} />
            </div>
            <div className={`${styles.button}
             !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areQuestionsUnchanged(data?.layout?.faq, question) || isQuestionEmpty(question)
                    ? '!cursor-not-allowed' :
                    '!cursor-pointer !bg-[#42d383]'
                }
                !rounded absolute bottom-12 right-12`} onClick={(areQuestionsUnchanged(data?.layout?.faq, question) || isQuestionEmpty(question)) ? () => null : handleEdit}>
                Save
            </div>
        </div>
    )
}

export default EditFaq