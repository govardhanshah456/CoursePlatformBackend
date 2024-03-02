'use client';

import React, { useState } from 'react'
import Heading from './Components/Heading';
import Header from './Components/Header';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")
  return (
    <div>
      <Heading title='LearnEasy' description='Upgrade your skills with Learn easy' keywords='Programming,MERN,ML,Redux' />
      <Header route={route} setRoute={setRoute} open={true} setOpen={setOpen} activeItem={activeItem} />
    </div>
  )
}

export default Page