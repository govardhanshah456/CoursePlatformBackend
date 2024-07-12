import { useGetUserAnalyticsQuery } from '@/redux/features/analytics/courseAnalytics'
import React from 'react'
import Loader from './Loader'
import { styles } from '../Styles/styles';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
    isDashboard?: boolean;
}

const UsersAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUserAnalyticsQuery({})
    const dummyData = [
        { name: "Jan", count: "10" },
        { name: "Feb", count: "20" },
        { name: "Mar", count: "10" },
        { name: "Apr", count: "10" },
        { name: "May", count: "10" },
        { name: "June", count: "10" },
        { name: "July", count: "10" },
        { name: "AUg", count: "10" },
        { name: "Sept", count: "10" },
        { name: "Oct", count: "10" },
        { name: "Nov", count: "10" },
        { name: "Dec", count: "10" }
    ]
    return (
        <>
            {
                isLoading ? <Loader />
                    : (
                        <div className={`${!isDashboard} ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"`}>
                            <div className={`${isDashboard} ? '!ml-8 mb-5' : '' `}>
                                <h1 className={`${styles.title} ${isDashboard ? '!text-[20px]' : ''} px-5 !text-start`}>
                                    Users Analytics
                                </h1>
                                {
                                    isDashboard ? (
                                        <p className={`${styles.label} px-5`}>
                                            Last 12 Months Analytics Data
                                        </p>
                                    ) : null
                                }
                            </div>
                            <div className={`w-full ${isDashboard ? 'h-[40vh]' : 'h-screen'} flex items-center justify-center`}>
                                <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? '50%' : '100%'}>
                                    <AreaChart data={dummyData} margin={{
                                        top: 20,
                                        right: 30,
                                        left: 0,
                                        bottom: 0
                                    }}>
                                        <XAxis dataKey={'name'} />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type={'monotone'} dataKey={'count'} stroke='#4d62d9' fill='#4d62d9' />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default UsersAnalytics