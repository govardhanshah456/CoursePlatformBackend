import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles'
import { HiMinus, HiPlus } from 'react-icons/hi'

type Props = {}

const Faq = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {})
    const [question, setQuestion] = useState<any[]>([])
    useEffect(() => {
        if (data) {
            setQuestion(data?.layout?.faq || [])
        }
    }, [data])

    const toggleQuestion = (id: any) => {
        setQuestion((prevQuestion) => prevQuestion.map((q) => q._id === id ? { ...q, active: !q.active } : q))
    }

    return (
        <div>
            <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
                <h1 className={`${styles.title} 800px:text-[40px]`}>Frequently Asked Question</h1>
                <div className='mt-12'>
                    <dl className='space-y-8'>
                        {
                            question?.map((q: any) => (
                                <div key={q._id} className={`${q._id !== question?.[0]?._id ? 'border-t' : ''} border-gray-200 pt-6`}>
                                    <dt className='text-lg'>
                                        <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none' >
                                            {/* <input className={`${styles.input} border-none`} value={q.question} onChange={(e) => handleQuestionChange(q._id, e.target.value)} placeholder='Add Questions.....' /> */}
                                            <span className='ml-6 flex-shrink-0'>
                                                {q.active ? (
                                                    <HiMinus size={20} onClick={() => toggleQuestion(q._id)} />
                                                ) : (
                                                    <HiPlus size={20} onClick={() => toggleQuestion(q._id)} />
                                                )}
                                            </span>
                                        </button>
                                    </dt>
                                </div>
                            ))
                        }
                    </dl>
                    <br />
                    <br />
                </div>

            </div>
        </div>
    )
}

export default Faq