"use client"
import { useEffect, useState } from "react"
import CountUp from "react-countup"

const defaultCounts = {
  projects: 0,
  technologies: 0,
  commits: 0
}

const Stats = () => {
  const [counts, setCounts] = useState(defaultCounts)

  useEffect(() => {
    let isMounted = true

    const loadStats = async () => {
      try {
        const response = await fetch("/api/github-stats")

        if (!response.ok) {
          return
        }

        const data = await response.json()

        if (!isMounted) {
          return
        }

        setCounts({
          projects: Number.isFinite(data.projects)
            ? data.projects
            : defaultCounts.projects,
          technologies: Number.isFinite(data.technologies)
            ? data.technologies
            : defaultCounts.technologies,
          commits: Number.isFinite(data.commits)
            ? data.commits
            : defaultCounts.commits
        })
      } catch {
      }
    }

    loadStats()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = [
    {
      id: "years",
      num: 2,
      text: "Year of working in this domain"
    },
    {
      id: "projects",
      num: counts.projects,
      text: "Project completed"
    },
    {
      id: "technologies",
      num: counts.technologies,
      text: "Technologies mastered"
    },
    {
      id: "commits",
      num: counts.commits,
      text: "Code commits"
    }
  ]

  return (
    <section className="pt-16 xl:pt-8 xl:pb-0">
    
    <div className="container mx-auto -mt-20">
      <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
        {stats.map((item) => {
          return(
            <div key={item.id} className="flex flex-1 gap-4 items-center justify-center xl:justify-start">
              <CountUp end={item.num} duration={5} delay={1} separator="," redraw className="text-4xl xl:text-6xl font-extrabold " />
              <p className="max-w-[150px]">{item.text}</p>
            </div>
          )
        })}
      </div>
    </div>
    
    </section>
  )
}

export default Stats
