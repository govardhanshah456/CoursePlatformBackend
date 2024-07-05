import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../Styles/styles';
import toast from 'react-hot-toast';

type Props = {}

const EditHero = (props: Props) => {
    const [image, setImage] = useState<any>('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('')
    const { data, refetch } = useGetHeroDataQuery("Banner", { refetchOnMountOrArgChange: true })
    const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation({})
    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title);
            setSubTitle(data?.layout?.banner?.subTitle);
            setImage(data?.layout?.banner?.image)
        }
        if (isSuccess) {
            toast.success("Hero Page Data Updated!");
            refetch()
        }
        if (error) {
            toast.error((error as any)?.data?.message || 'Unknown error occured')
        }
    }, [data, error, isSuccess, refetch])

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleEdit = async () => {
        await editHeroData({
            type: "Banner",
            image,
            title,
            subTitle
        })
    }
    console.log((data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle), image)
    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between p-8 bg-gray-900 text-white mt-[180px]">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0 margin-right:160px">
                <div className="relative">
                    <Image
                        width={500}
                        height={700}
                        src={image.url}
                        alt=""
                        className="object-contain z-10 "
                    />
                    <input
                        type="file"
                        name=""
                        id="banner"
                        accept="image/*"
                        onChange={handleUpdate}
                        className='hidden'
                    />
                    <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
                        <AiOutlineCamera className="text-white text-[18px] cursor-pointer" />
                    </label>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl lg:text-3xl font-bold mb-4 bg-transparent text-white w-full resize-none text-center border-none outline-none focus:bg-gray-800/30 transition-colors"
                    rows={2}
                ></textarea>
                <textarea
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="text-lg mb-6 bg-transparent text-gray-400 w-full resize-none border-none outline-none focus:bg-gray-800/30 transition-colors"
                    rows={3}
                ></textarea>
            </div>

            <br />
            <br />
            <br />
            <br />
            <div className={`${styles.button}
             !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${(data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle)
                    ? '!cursor-pointer !bg-[#42d383]' :
                    '!cursor-not-allowed'
                }
                !rounded absolute bottom-12 right-12`} onClick={(data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle) ? handleEdit : () => null}>
                Save
            </div>
        </div>



    )
}

export default EditHero