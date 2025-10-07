"use client"

import {motion} from "framer-motion"

import React, {useState} from "react"

import { BsArrowUpRight, BsGithub } from "react-icons/bs"

import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const projects = [
  {
    num: "01",
    category:"fullstack",
    title:"UNIBee",
    description:"Smart URL shortener with analytics.",
    stack:[{name:"Html 5"}, {name:"Css"},{name:"Javascripts"}],
    image:"/s1.png",
    repo:"https://github.com/sunnykumar37/UNIbee-URLSHORTNER",
    github:"https://UNIBee.vercel.app"
  },
  {
    num: "02",
    category:"fullstack",
    title:"Local-Attraction-Recommender ",
    description:"An intelligent web app that suggests nearby tourist attractions based on user interests and location preferences.",
    stack:[{name:"Html 5"}, {name:"Css"},{name:"React"},{name:"Javascripts"},{name:"GSAP"}],
    image:"/s2.png",
    repo:"https://github.com/sunnykumar37/Local-Attraction-Recommender",
    github:"https://local-attraction-recommender.vercel.app"
  },
  {
    num: "03",
    category:"frontend",
    title:"Assignment-Frontend",
    description:"Created a frontend from figma as a assignment for the company.",
    stack:[{name:"Html 5"}, {name:"Css"},{name:"React"},{name:"Javascripts"},{name:"GSAP"}],
    image:"/s3.png",
    repo:"https://github.com/sunnykumar37/Assignment-FrontEnd",
    github:"https://assignment-front-end-enm9.vercel.app/Pages/ProfessionalResumeServicesLandingPage.html"
  },
  {
    num: "04",
    category:"fullstack",
    title:"Air-Quality-Dashboard",
    description:"A modern web project utilizing Streamlit, Python, and Visualizations to create smooth scroll effects and animations. ",
    stack:[{name:"Streamlit"}, {name:"Python"},{name:"Numpy"},{name:"Matplotlib"},{name:"Pandas"}],
    image:"/s4.png",
    repo:"https://github.com/sunnykumar37/Air-Quality-Dashboard",
    github:"https://air-quality-dashboard.vercel.app/"
  },
  
]


const Works = () => {

  const [project, setProject] = useState(projects[0])

  const handelSlideChange = (swiper) => {
    const currIndex = swiper.activeIndex
    setProject(projects[currIndex])
  }

  return (
    <motion.section 
    initial={{opacity:0}}
    animate={{opacity:1, transition:{delay: 1.4, duration:0.5, ease:"easeInOut"}}}
    className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
     <div className="container mx-auto">
      
    <div className="flex flex-col xl:flex-row xl:gap-[30px]">

      <div className="w-full xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
        <div className="flex flex-col gap-[30px] h-[50%]">
          <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
            {project.num}
          </div>
          <div>
            <h2 className="text-[42px] font-bold leading-none text-white hover:text-accent transition-all duration-500 capitalize">{project.category} project</h2>
            <p className="text-white/60">{project.description}</p>
            <ul className="flex gap-3">
              {
                project.stack.map((item, index) =>{
                  return <li key={index} className="text-xl text-accent">
                        {item.name}
                        {index !== project.stack.length - 1 && ","}
                  </li>
                })
              }
            </ul>
            <div className="border border-white/30"></div>
            <div className="py-2">
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5">
              <h3 className="text-xl text-white/50 ">Check it out!!...</h3>
              <div className="h-10 w-10 hover:bg-white rounded-full border items-center flex justify-center">
              <BsArrowUpRight className="text-accent text-3xl hover:text-black   transition-transform duration-300 hover:rotate-45" />
              </div>
              </Link>

              <Link href={project.repo} className="flex items-center gap-5">
              <h3 className="text-xl text-white/50 ">Check the repository!!...</h3>
              <div className="h-10 w-10 hover:bg-white rounded-full border items-center flex justify-center">
              <BsGithub className="text-accent text-3xl hover:text-black " />
              </div>
              </Link>

            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[50%]">
        
        <Swiper 
        spaceBetween={30}
        slidesPerView={1}
        className="xl:h-[520px] mb-12"
        onSlideChange = {handelSlideChange}
        >
          {projects.map((item, index) =>{
            return (<SwiperSlide key={index} className="w-full">
              <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
              <div></div>
                <div className=" relativew-full h-full">

                  <Image src={item.image} fill  alt="img" className="object-contain"/>

                </div>
              </div>
            </SwiperSlide>)
          })}
        
      
          
        </Swiper>

      </div>
    </div>

     </div>

    </motion.section>
  )
}

export default Works
