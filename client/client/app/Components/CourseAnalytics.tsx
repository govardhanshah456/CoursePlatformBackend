import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/courseAnalytics'
import React from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList
} from "recharts"
import Loader from './Loader'
import { styles } from '../Styles/styles'
type Props = {}

const CourseAnalytics = (props: Props) => {
    const { data, isLoading, error } = useGetCourseAnalyticsQuery({});
    const dummyData = [
        { name: 'July 2023', uv: 2 },
        { name: 'June 2023', uv: 3 },
        { name: 'May 2023', uv: 4 },
        { name: 'April 2023', uv: 5 },
        { name: 'March 2023', uv: 3 },
    ]
    const minValue = 0;
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='h-screen flex flex-col'>
                        <div className='mt-[150px]'>
                            <h1 className={`${styles.title} px-5 !text-start`}>
                                Course Analytics
                            </h1>
                            <p className={`${styles.label} px-5`}>
                                Last 6 months analytics data
                            </p>
                        </div>
                        <div className='w-full h-[90%] flex items-center justify-center'>
                            <ResponsiveContainer width={"90%"} height={"50%"}>
                                <BarChart width={150} height={300} data={dummyData}>
                                    <XAxis dataKey={"name"}>
                                        <Label offset={0} position={"insideBottom"} />
                                    </XAxis>
                                    <YAxis domain={[minValue, "auto"]} />
                                    <Bar dataKey={"uv"} fill='#3faf82'>
                                        <LabelList dataKey={"uv"} position={"top"} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CourseAnalytics