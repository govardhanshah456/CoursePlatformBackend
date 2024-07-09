import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import toast from 'react-hot-toast'

type Props = {}

const EditCategories = (props: Props) => {
    const { data, refetch } = useGetHeroDataQuery("categories", {
        refetchOnMountOrArgChange: true
    })
    const [editHeroData, { isSuccess, error }] = useEditHeroDataMutation({})
    const [categories, setCategories] = useState<any[]>([]);
    useEffect(() => {
        if (data?.layout?.categories) {
            setCategories(data?.layout?.categories || []);
        }
        if (isSuccess) {
            toast.success("FAQ Updated Successfully!!!")
            refetch()
        }
        if (error) {
            toast.error((error as any)?.data?.message || "Unknown Error Occured")
        }
    }, [data, error, isSuccess, refetch])

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategories) => prevCategories.map((cat) => cat._id === id ? { ...cat, title: value } : cat))
    }

    const addNewCategoryHandler = () => {
        setCategories([...categories, {
            title: ""
        }])
    }

    const isAnyCategoryEmpty = (categories: any[]) => {
        return categories.some((category) => category.title === "")
    }

    const areCategoriesChanged = (propsCategories: any[], categoriesState: any[]) => JSON.stringify(propsCategories) !== JSON.stringify(categoriesState)

    const handleEdit = async () => {
        if (!areCategoriesChanged(data?.layout?.categories, categories) && !isAnyCategoryEmpty(categories)) {
            await editHeroData({
                type: "categories",
                categories
            })
        }
    }

    return (
        <div className='mt-[120px] text-center'>
            <h1 className={`${styles.title}`}>All Categories</h1>
            {
                categories.map((category, index) => (
                    <div className='p-3' key={index}>
                        <div className='flex items-center w-full justify-center'>
                            <input
                                className={`${styles.input} !w-[unset] !border-name !text-[20px]`}
                                value={category.title}
                                onChange={(e) => handleCategoriesAdd(category._id, e.target.value)}
                                placeholder='Enter Category Title......'
                            />
                            <AiOutlineDelete className='dark:text-white text-black text-[18px] cursor-pointer' onClick={() => setCategories((prevCategory) => prevCategory.filter((categoryItem) => categoryItem._id !== category._id))} />

                        </div>
                    </div>
                ))
            }
            <br />
            <br />
            <div className='w-full flex justify-center'>
                <IoMdAddCircleOutline className='dark:text-white text-black text-[25px] cursor-pointer' onClick={addNewCategoryHandler} />
            </div>
            <div className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
            ${areCategoriesChanged(data?.layout?.categories, categories) || isAnyCategoryEmpty(categories)
                    ? '!cursor-not-allowed' : '!cursor-pointer !bg-[#42d383]'
                }
            !rounded absolute bottom-12 right-12`} onClick={areCategoriesChanged(data?.layout?.categories, categories) || isAnyCategoryEmpty(categories) ? () => null : handleEdit}>
                Save
            </div>
        </div>
    )
}

export default EditCategories