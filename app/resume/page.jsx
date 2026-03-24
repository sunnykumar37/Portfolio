"use client"
import React from "react";
import {FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaJava, FaPython, FaCloud} from "react-icons/fa"
import { PiStudentDuotone } from "react-icons/pi";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si"
import { TbBrandCpp } from "react-icons/tb";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"



import {ScrollArea} from "@/components/ui/scroll-area"

import {motion} from "framer-motion"

const data = {
  title:"About me",
  description: "Passionate developer focused on creating scalable web applications, exploring AI technologies, and building impactful digital solutions.",
  info:[
    {
      fieldName:"Name",
      fieldValue:"Sunny Kumar"
    },
    {
      fieldName:"Phone",
      fieldValue:"+91 9138136866"
    },
    {
      fieldName:"Experiance",
      fieldValue:"1+ year"
    },
    {
      fieldName:"Nationality",
      fieldValue:"India"
    },
    {
      fieldName:"Email",
      fieldValue:"sunnyk28912@gmail.com"
    },
    {
      fieldName:"Languages",
      fieldValue:"English, Hindi"
    },
   
  ]
}

const education = {

  icons:<PiStudentDuotone />,
  title:"My education",
  description: "Currently pursuing a Bachelor's degree in Computer Science with a focus on software development, cloud computing, and AI-based systems.",
  items:[
    {
      institution:"Lovely Professional University, Punjab, India",
      degree:"B.Tech CSE",
      duration:"Since Aug' 23"
    },
    {
      institution:"Nalanda International School, Gohana, Haryana",
      degree:"Intermediate",
      duration:"Feb' 22 - Mar' 23"
    },
    {
      institution:"Nalanda International School, Gohana, Haryana",
      degree:"Matriculation",
      duration:"Apr' 20 - Mar' 21"
    },
   
  ]

}

const skills = {
  title:"My skills",
  description: "Skilled in MERN stack and Python full-stack development, with experience in cloud technologies and AI integration. Focused on building scalable, efficient, and modern web applications.",
  list:[
    {
      icon: <FaHtml5 />,
      name:"html 5"
    },
    {
      icon: <FaCss3 />,
      name:"Css"
    },
    {
      icon: <SiTailwindcss />,
      name:"Tailwind"
    },
    {
      icon: <FaJs />,
      name:"JavaScript"
    },
    {
      icon: <FaReact />,
      name:"React"
    },
    {
      icon: <FaFigma />,
      name:"Figma"
    },
    {
      icon: <FaNodeJs />,
      name:"NodeJs"
    },
    {
      icon: <FaJava />,
      name:"Java"
    },
    {
      icon: <TbBrandCpp />,
      name:"C/Cpp"
    },
    {
      icon: <FaPython />,
      name:"Python"
    },
    {
      icon: <SiNextdotjs />,
      name:"Nextjs"
    },
    {
      icon: <FaCloud />,
      name:"Cloud"
    },
  ]
}

const certifications = {
  title: "My Certifications",
  description: "Professional certifications focused on web development, data skills, and modern AI technologies.",
  items: [
    {
      institution: "Freecode camp",
      degree: "Front-end devloper bootcamp",
      duration: "2023"
    },
    {
      institution: "Freecode camp",
      degree: "Data Analyst bootcamp",
      duration: "2025"
    },
    {
      institution: "Cipher Schools",
      degree: "CPP with OOPs Programming Language",
      duration: "2025"
    },
    {
      institution: "Infosys",
      degree: "Chatgpt, Genrative AI & LLM",
      duration: "2025"
    }
  ]
}

const experiance = {
  title: "My Experience",
  description: "Hands-on experience in frontend and backend development, building scalable applications and interactive UI/UX.",
  items: [
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      duration: "2023 - Present",
      responsibilities: [
        "Developed and deployed responsive web applications using React and Next.js.",
        "Built RESTful APIs and integrated backend with Node.js, Express, and MongoDB.",
        "Ensured optimal UI/UX design with Tailwind CSS and Figma."
      ]
    },
    {
      company: "DeepCite",
      role: "MERN Stack Developer",
      duration: "Jun 25 - Aug 25"
    },
   
  ]
};


const Resume = () => {
  return (
    <motion.div initial={{opacity:0}}
    animate={{opacity:1,
      transition:{delay:1,duration:0.4,ease:"easeIn"}
    }}
    className="flex items-start justify-center pt-0 pb-4 sm:pb-6"
    >
     <div className="container  mx-auto">

<Tabs defaultValue="data" className="flex mt-0 flex-col xl:flex-row gap-6 sm:gap-8 xl:gap-[60px] text-white rounded-xl">

  <TabsList  className="h-auto bg-transparent p-0 w-full max-w-full sm:max-w-[380px] mx-auto xl:mx-0 grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-6">
    <TabsTrigger value="education" className="border rounded-xl w-full py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-accent">Education</TabsTrigger>
    <TabsTrigger value="skills" className="border rounded-xl w-full py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-accent ">Skills</TabsTrigger>
    <TabsTrigger value="certifications" className="border rounded-xl w-full py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-accent ">Certifications</TabsTrigger>
    <TabsTrigger value="data" className="border rounded-xl w-full py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-accent ">About me</TabsTrigger>
    <TabsTrigger value="experiance" className="border rounded-xl w-full py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 data-[state=active]:bg-accent">Experiance</TabsTrigger>
  </TabsList>

    <div className="min-h-0 mt-0 w-full">

    <TabsContent value="education" className="text-white ">
      
    <div className="flex flex-col gap-6 sm:gap-[30px] text-center xl:text-left">
      <h1 >{education.icons}</h1>
        <h3 className="text-3xl sm:text-4xl font-bold">{education.title}</h3>
        <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>

        <ScrollArea className="h-[300px] sm:h-[400px]">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-[30px]">
            {
              education.items.map((item, index) => {
                return <div key={index}>
                  <li className="bg-[#232329] min-h-[160px] sm:h-[184px] py-5 sm:py-6 px-6 sm:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                    <span className="text-accent">{item.degree}</span>
                    <span className="text-accent">{item.duration}</span>
                    <div className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-accent"></span>
                      <p className="text-white/60 ">{item.institution}</p>
                    </div>
                  </li>
                </div>
              })
            }
          </ul>
        </ScrollArea>

      </div>

    </TabsContent>

    <TabsContent value="skills" className="text-white">
      
    <div className="flex flex-col gap-6 sm:gap-[30px] text-center xl:text-left">
      
      <h3 className="text-3xl sm:text-4xl font-bold">{skills.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>

      <ScrollArea className="h-[300px] sm:h-[400px]">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-[30px]">
          {
            skills.list.map((item, index) => {
              return <div key={index}>
                <li className="bg-[#232329] min-h-[150px] sm:h-[184px] py-5 sm:py-6 px-5 sm:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                <span className="text-white">
                  {React.cloneElement(item.icon, { size: 40 })}
                </span>

                  <span className="text-white">{item.name}</span>
                
                </li>
              </div>
            })
          }
        </ul>
      </ScrollArea>

    </div>

    </TabsContent>
    <TabsContent value="certifications" className="text-white">

    <div className="flex flex-col gap-6 sm:gap-[30px] text-center xl:text-left">

      <h3 className="text-3xl sm:text-4xl font-bold">{certifications.title}</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{certifications.description}</p>

      <ScrollArea className="h-[300px] sm:h-[400px]">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-[30px]">
          {
            certifications.items.map((item, index) => {
              return <div key={index}>
                <li className="bg-[#232329] min-h-[160px] sm:h-[184px] py-5 sm:py-6 px-6 sm:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                  <span className="text-accent">{item.degree}</span>
                  <span className="text-accent">{item.duration}</span>
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <p className="text-white/60 ">{item.institution}</p>
                  </div>
                </li>
              </div>
            })
          }
        </ul>
      </ScrollArea>

    </div>

    </TabsContent>
    <TabsContent value="data" className="text-white">

    <div className="flex flex-col gap-6 sm:gap-[30px] text-center xl:text-left">
      
        <h3 className="text-3xl sm:text-4xl font-bold">{data.title}</h3>
        <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{data.description}</p>

         
          <ul className="grid lg:grid-cols-2 gap-2 sm:gap-[30px]">
            {
              data.info.map((item, index) => {
                return <li key={index} className="py-2 sm:py-6 px-2 sm:px-8 flex flex-col justify-center items-center lg:items-start gap-0.5 sm:gap-1">
                    <span className="text-accent">{item.fieldName}</span>
                    <span className="text-accent break-words">{item.fieldValue}</span>
                  
                  </li>
              })
            }
          </ul>
         

      </div>

    </TabsContent>
    <TabsContent value="experiance" className="text-white">
      <div className="flex flex-col gap-6 sm:gap-[30px] text-center xl:text-left">
        <h3 className="text-3xl sm:text-4xl font-bold">{experiance.title}</h3>
        <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experiance.description}</p>

        <ScrollArea className="h-[300px] sm:h-[400px]">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-[30px]">
            {
              experiance.items.map((item, index) => {
                return <div key={index}>
                  <li className="bg-[#232329] min-h-[160px] sm:h-[184px] py-5 sm:py-6 px-6 sm:px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                    <span className="text-accent">{item.duration}</span>
                    <h3 className="text-lg sm:text-xl w-full min-h-[60px] text-center lg:text-left">{item.role}</h3>
                    <div className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-accent"></span>
                      <p className="text-white/60 ">{item.company}</p>
                    </div>
                  </li>
                </div>
              })
            }
          </ul>
        </ScrollArea>

      </div>
    </TabsContent>

    </div>

</Tabs>

     </div>
    </motion.div>
  )
}

export default Resume

// 1 55 28
