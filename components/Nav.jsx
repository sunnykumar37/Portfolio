"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {name: "home", path: "/"},
  {name: "services", path: "/services"},
  {name: "resume", path: "/resume"},
  {name: "work", path: "/work"},
  {name: "contact", path: "/contact"},
]

const Nav = () => {

  const path = usePathname()

  return (
    <nav className="flex items-center gap-5 xl:gap-7">
      
      {
        links.map((item, index) => {
          const isActive = item.path === path
          const isContactLink = item.path === "/contact"

          return (
            <Link href={ item.path} key={index}
             className={isContactLink
              ? `${isActive ? "bg-accent text-primary" : "border-accent text-accent"} capitalize font-medium rounded-xl border px-4 py-2 transition-all duration-300 hover:bg-accent hover:text-primary`
              : `${isActive ? "text-accent border-accent" : "text-white border-transparent"} capitalize font-medium border-b-2 pb-1 hover:text-accent transition-all duration-300`
             }
            >{item.name}</Link>
          )
        })
      }

    </nav>
  )
}

export default Nav


//avi app me routes banane hai