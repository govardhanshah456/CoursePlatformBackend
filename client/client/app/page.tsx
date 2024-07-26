'use client';

import React, { useState } from 'react'
import Heading from './Components/Heading';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Courses from './Components/Courses';
import Reviews from './Components/Reviews';
import Faq from './Components/Faq';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("signup")
  return (
    <div>
      <Heading title='LearnEasy' description='Upgrade your skills with Learn easy' keywords='Programming,MERN,ML,Redux' />
      <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero />
      <Courses />
      <Reviews />
      <Faq />
    </div>
  )
}

export default Page