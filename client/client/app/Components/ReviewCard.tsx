import React from 'react'
import Ratings from './Ratings';
import Image from 'next/image';

type Props = {
    item: any;
}

const ReviewCard: React.FC<Props> = ({ item }: Props) => {
    return (
        <div className='w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
            <div className='flex w-full'>
                <Image src={item?.avatar} width={50} height={50} className='w-[50px] h-[50px] rounded-full object-cover' alt='' />
                <div className='800px:flex justify-between w-full hidden'>
                    <div className='pl-4'>
                        <h5 className='text-black dark:text-whit text-[20px]'>
                            {item.name}
                        </h5>
                        <h6 className='text-black dark:text-whit text-[20px]'>
                            {item.profession}
                        </h6>
                    </div>
                    <Ratings rating={item.rating} />
                </div>
            </div>
            <p className='pt-2 px-2 font-Poppins text-black dark:text-white'>
                {item.content}
            </p>
        </div>
    )
}

export default ReviewCard