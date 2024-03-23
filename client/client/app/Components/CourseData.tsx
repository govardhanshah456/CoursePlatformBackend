import React from 'react'
import { styles } from '../Styles/styles';
import { AddCircleOutline } from '@mui/icons-material';
import toast from 'react-hot-toast';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: React.FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    function handleBenefitChange(index: number, value: string, isBenefit: boolean = true): void {
        if (isBenefit) {
            const updatedBenefits = [...benefits]
            updatedBenefits[index].title = value
            setBenefits(updatedBenefits)
        }
        else {
            const updatedPrerequisuites = [...prerequisites]
            updatedPrerequisuites[index].title = value
            setPrerequisites(updatedPrerequisuites)
        }
    }

    function handleAddBenefits(event: any, isBenefit: boolean = true): void {
        if (isBenefit)
            setBenefits([...benefits, { title: "" }])
        else
            setPrerequisites([...prerequisites, { title: "" }])
    }

    const handleNext = () => {
        const util = () => {
            let output = true
            benefits.forEach((benefit) => {
                console.log(benefit)
                if (benefit.title == "")
                    output = false
            })
            let output1 = true
            prerequisites.forEach((prerequisite) => {
                console.log(prerequisite)
                if (prerequisite.title == "")
                    output1 = false;
            })
            return output && output1;
        }
        if (util())
            setActive(active + 1);
        else
            toast.error('Please Fill All The Fields')
    }
    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor='email'>
                    What are the benefits for students in this course?
                </label>
                <br />
                {
                    benefits.map((benefit: any, index: number) => (
                        <input type='text' key={index} name='Benefit' placeholder='anything' required className={`${styles.input} my-2`} value={benefit.title} onChange={(e) => handleBenefitChange(index, e.target.value)} />

                    ))

                }
                <AddCircleOutline className='dark:text-white text-black' style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }} onClick={handleAddBenefits} />
            </div>
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor='email'>
                    What Prerequisuites are required for students to enroll in this course?
                </label>
                <br />
                {
                    prerequisites.map((benefit: any, index: number) => (
                        <input type='text' key={index} name='Preqrequisuite' placeholder='anything' required className={`${styles.input} my-2`} value={benefit.title} onChange={(e) => handleBenefitChange(index, e.target.value, false)} />

                    ))

                }
                <AddCircleOutline className='dark:text-white text-black' style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }} onClick={(e) => handleAddBenefits(e, false)} />
            </div>
            <div className='w-full flex items-center justify-end' onClick={handleNext}>
                <input type='submit' value={"next"} className='w-full 800px:w-[100px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
            </div>
        </div >
    )
}

export default CourseData