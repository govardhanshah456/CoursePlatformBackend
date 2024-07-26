import Image from 'next/image'
import React from 'react'
import { styles } from '../Styles/styles'
import ReviewCard from './ReviewCard'

type Props = {}
const reviews: any[] = []
const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center'>
                <div className='800px:w-[50%] w-full'>
                    <Image src={require("C:/Users/govar/Desktop/React_Project/client/client/public/fotor-ai-20240704212936.jpg")} width={700} height={700} alt='' />

                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className='text-gradient'>Our Strength</span>
                        <br /> See What They Say About Us
                    </h3>
                </div>
                <p className={styles.label}>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc eget neque condimentum nulla quisque enim pretium. Urna fames diam a nam placerat dictumst. Fringilla maecenas inceptos quis pellentesque turpis phasellus. Tellus nam vehicula, id dolor vitae ante orci. Etiam non senectus inceptos enim mattis. Auctor enim mi finibus magnis montes posuere nam.
                </p>
            </div>
            <br />
            <br />
            <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0'>
                {reviews.map((review, index) => (
                    <ReviewCard key={index} item={review} />
                ))}


            </div>
        </div>
    )
}

export default Reviews