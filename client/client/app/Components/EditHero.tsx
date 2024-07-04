import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useState } from 'react'

type Props = {}

const EditHero = (props: Props) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('')
    const { data } = useGetHeroDataQuery({})
    return (
        <div>

        </div>
    )
}

export default EditHero