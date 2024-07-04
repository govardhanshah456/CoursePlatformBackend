import Image from 'next/image';
import React from 'react';
import image from "../../public/fotor-ai-20240704212936.jpg";

type Props = {};

const Hero = () => {
    return (
        <div className={`h-screen w-full flex items-center justify-center dark:bg-gray-900 dark:text-white`}>
            <div className='flex flex-row items-center justify-center z-10'>
                <div className='w-1/2'>
                    <Image height={500} width={500} src={image} alt="Hero Image" className="w-full h-auto max-w-md rounded-md mb-4" />
                </div>
                <div className='w-1/2 pl-12'>
                    <h1 className={`text-4xl font-bold mb-2 text-left dark:text-white`}>Improve Your Online Learning Experience Better Instantly</h1>
                    <p className={`text-lg mb-4 text-left dark:text-gray-400`}>We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them.</p>
                    <div className="mb-4">
                        <input type="text" placeholder="Search Courses.." className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 dark:focus:ring-blue-500`} />
                    </div>
                    <div className={`text-gray-400 text-left dark:text-white`}>500K+ People already trusted us. <a href="#" className={`underline dark:hover:text-blue-500`}>View Courses</a></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;