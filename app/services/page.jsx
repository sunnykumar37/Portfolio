"use client"

import { BsArrowDownRight } from "react-icons/bs"
import Link from "next/link"
import {motion} from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const data = [
  {
    num:"01",
    title:"Front-End",
    description:"I love frontend development services using React, Next.js, and Tailwind CSS. I specialize in building responsive, interactive, and high-performance web applications with clean UI/UX.",
    href:"/work?project=talksy"
  },
  {
    num:"02",
    title:"Back-End",
    description:"I specialize in building secure, scalable backend solutions using Node.js, Express, and MongoDB, ensuring efficient APIs and seamless data management.",
    href:"/work?project=taskmaster"
  },
  {
    num:"03",
    title:"UI/UX Design",
    description:"I create intuitive, visually appealing UI/UX designs focused on user experience, accessibility, and responsiveness for seamless digital interactions.",
    href:"/work?project=assignment-frontend"
  },
  {
    num:"04",
    title:"FullStack App",
    description:"I build scalable, high-performance full-stack applications using React, Next.js, Node.js, and MongoDB, ensuring seamless frontend-backend integration.",
    href:"/work?project=air-quality-dashboard"
  },
]


const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
          <motion.div initial={{opacity:0}}
          animate={{
            opacity:1,
            transition:{delay:2.4, duration:0.4, ease:"easeInOut"}
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-[60px]"
          >
              <TooltipProvider delayDuration={120}>
              {

                data.map((item, index) =>{
                  return <div key={index} className="flex flex-1 flex-col justify-center gap-4 sm:gap-6 group">
                    <div className="w-full flex justify-between items-center">
                    <div className="text-4xl sm:text-5xl font-extrabold text-outline text-transparent  group-hover:text-outline-hover">{item.num}</div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                          href={item.href}
                          aria-label={`View ${item.title} case study`}
                        >
                          <BsArrowDownRight className="text-primary text-2xl sm:text-3xl"/>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-accent text-primary border-accent font-semibold">
                        View case study
                      </TooltipContent>
                    </Tooltip>
                    </div>
                    <h2 className="text-[32px] sm:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{item.title}</h2>
                    <p className="text-sm sm:text-base text-white/80">{item.description}</p>
                    <div className="border-b border-white/30 w-full"></div>
                  </div>
                })

              }
              </TooltipProvider>
          </motion.div >
      </div>
    </section>
  )
}

export default Services
