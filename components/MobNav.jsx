"use client"

import {Sheet, SheetTrigger, SheetContent} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {CiMenuFries} from "react-icons/ci"

const links= [
  {name: "home", path: "/"},
  {name: "services", path: "/services"},
  {name: "resume", path: "/resume"},
  {name: "work", path: "/work"},
  {name: "contact", path: "/contact"},
]

const MobNav = () => {

  const path = usePathname()

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center ">
         <div className="mt-20 mb-40 text-center text-2xl">
          <Link href="/">
          <h1 className="text-4xl font-semibold">Sunny Kumar<span className="text-accent">.</span> </h1>
          </Link>
         </div>
        <nav className="flex flex-col items-center gap-6"> 
          {links.map((item, index) =>{
         const isActive = item.path === path
         const isContactLink = item.path === "/contact"

          return(
            <Link 
            href={item.path}
             key={index}
           className={isContactLink
            ? `${isActive ? "bg-accent text-primary" : "border-accent text-accent"} capitalize font-medium rounded-xl border px-5 py-2 transition-all duration-300 hover:bg-accent hover:text-primary`
            : `${isActive ? "text-accent border-accent" : "text-white border-transparent"} capitalize font-medium border-b-2 pb-1 hover:text-accent transition-all duration-300`
           }>{item.name}</Link>
          )
         } )} </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobNav
