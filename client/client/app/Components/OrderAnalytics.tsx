import { useGetOrderAnalyticsQuery } from '@/redux/features/analytics/courseAnalytics';
import React from 'react'
import Loader from './Loader';
import { styles } from '../Styles/styles';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
    isDashboard?: boolean;
}

const OrderAnalytics = ({ isDashboard }: Props) => {
    const dummyData = [
        { name: "Introduction to Python", count: 234 },
        { name: "Advanced Machine Learning", count: 178 },
        { name: "Web Development Bootcamp", count: 312 },
        { name: "Data Science with R", count: 256 },
        { name: "Graphic Design Basics", count: 129 },
        { name: "Digital Marketing Strategies", count: 210 },
        { name: "Cybersecurity Fundamentals", count: 87 },
        { name: "Project Management Essentials", count: 143 },
        { name: "Business Analytics", count: 165 },
        { name: "Creative Writing Workshop", count: 198 }
    ];
    const { data, isLoading } = useGetOrderAnalyticsQuery({});
    return (
        <div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={`${isDashboard ? "h-[50vh]" : 'h-screen'} flex flex-col`}>
                        <div className={isDashboard ? 'mt-[0px] pl-[40px] mb-2' : 'mt-[50px]'}>
                            <h1 className={`${styles.title} ${isDashboard ? '!text-[20px]' : ''} px-5 !text-start`}>
                                Order Analytics
                            </h1>
                            {
                                !isDashboard ? (
                                    <p className={`${styles.label} px-5`}>
                                        Last 12 Months Order Analytics
                                    </p>
                                ) : null
                            }
                        </div>
                        <div className={`w-full ${!isDashboard ? 'h-[90%]' : 'h-full'} flex items-center justify-center`}>
                            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? '100%' : '50%'}>
                                <LineChart width={500} height={500} data={dummyData} margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                    <CartesianGrid strokeDasharray={"3 3"} />
                                    <XAxis dataKey={"name"} />
                                    <YAxis />
                                    <Tooltip />
                                    {
                                        !isDashboard ? <Legend /> : null
                                    }
                                    <Line type={'monotone'} dataKey={'count'} stroke='#82ca9d' />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default OrderAnalytics