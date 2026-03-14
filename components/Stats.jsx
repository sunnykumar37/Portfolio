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
      text: "Years in this domain"
    },
    {
      id: "projects",
      num: counts.projects,
      text: "Projects completed"
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
    <section className="pt-8 sm:pt-12 xl:pt-8 xl:pb-0">
    
    <div className="container mx-auto mt-2 xl:-mt-20">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 max-w-[92vw] mx-auto xl:max-w-none">
        {stats.map((item) => {
          return(
            <div key={item.id} className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center text-center sm:text-left justify-center xl:justify-start min-w-0">
              <CountUp end={item.num} duration={5} delay={1} separator="," redraw className="text-3xl sm:text-5xl xl:text-6xl font-extrabold leading-none" />
              <p className="max-w-[120px] sm:max-w-[170px] text-[11px] sm:text-base leading-tight">{item.text}</p>
            </div>
          )
        })}
      </div>
    </div>
    
    </section>
  )
}

export default Stats
