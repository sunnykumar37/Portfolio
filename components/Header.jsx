import Link from "next/link"
import Nav from "./Nav"
import MobNav from "./MobNav"

const header = () => {
  return (

      <header className="py-5 sm:py-6 xl:py-12 text-white">
        <div className="container mx-auto flex items-center justify-between">
            <Link href="/">
                <h1 className="text-3xl sm:text-4xl font-bold">Sunny Kumar
                  <span className="text-accent">.</span>
                </h1>
            </Link>

            {/* only for desktop  */}
            <div className="hidden xl:flex items-center">
            <Nav />
            </div>

            <div className="xl:hidden"> 
              <MobNav />
            </div>

        </div>
      </header>
    
  )
}

export default header
