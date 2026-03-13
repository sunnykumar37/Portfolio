import { NextResponse } from "next/server"

const REVALIDATE_SECONDS = 3600
const GITHUB_API_BASE = "https://api.github.com"
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
const DEFAULT_GITHUB_USERNAME = "sunnykumar37"

const FALLBACK_STATS = {
  projects: 0,
  technologies: 0,
  commits: 0
}

export const revalidate = 3600

const getGithubHeaders = (token) => {
  const baseHeaders = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-stats"
  }

  if (!token) {
    return baseHeaders
  }

  return {
    ...baseHeaders,
    Authorization: `Bearer ${token}`
  }
}

const getGithubJson = async (url, headers) => {
  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS }
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  return {
    ok: response.ok,
    status: response.status,
    data
  }
}

const isRateLimitResponse = (status, data) => {
  if (status !== 403) {
    return false
  }

  const message = typeof data?.message === "string" ? data.message.toLowerCase() : ""
  return message.includes("rate limit")
}

const fetchUserProfile = async (username, headers) => {
  const result = await getGithubJson(`${GITHUB_API_BASE}/users/${username}`, headers)
  return result.ok ? result.data : null
}

const fetchRepositories = async (username, headers) => {
  const repositories = []
  let page = 1

  while (true) {
    const result = await getGithubJson(
      `${GITHUB_API_BASE}/users/${username}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
      headers
    )

    if (!result.ok || !Array.isArray(result.data)) {
      break
    }

    repositories.push(...result.data)

    if (result.data.length < 100) {
      break
    }

    page += 1
  }

  return repositories
}

const getBaseTechnologyCount = (repositories) => {
  const technologies = new Set()

  repositories.forEach((repository) => {
    if (typeof repository.language === "string" && repository.language.trim()) {
      technologies.add(repository.language.trim().toLowerCase())
    }

    if (Array.isArray(repository.topics)) {
      repository.topics.forEach((topic) => {
        if (typeof topic === "string" && topic.trim()) {
          technologies.add(topic.trim().toLowerCase())
        }
      })
    }
  })

  return technologies.size
}

const getDetailedTechnologyCount = async (repositories, headers) => {
  const technologies = new Set()

  for (const repository of repositories) {
    const result = await getGithubJson(
      `${GITHUB_API_BASE}/repos/${repository.owner.login}/${repository.name}/languages`,
      headers
    )

    if (!result.ok) {
      if (isRateLimitResponse(result.status, result.data)) {
        return null
      }

      continue
    }

    if (!result.data || typeof result.data !== "object") {
      continue
    }

    Object.keys(result.data).forEach((language) => {
      if (language.trim()) {
        technologies.add(language.trim().toLowerCase())
      }
    })
  }

  return technologies.size
}

const getCommitCountFromSearch = async (username, headers) => {
  const query = encodeURIComponent(`author:${username}`)
  const result = await getGithubJson(
    `${GITHUB_API_BASE}/search/commits?q=${query}&per_page=1`,
    headers
  )

  if (!result.ok) {
    return null
  }

  return Number.isFinite(result.data?.total_count) ? result.data.total_count : null
}

const getCommitCountFromContributors = async (repositories, username, headers) => {
  let totalCommits = 0

  for (const repository of repositories) {
    const result = await getGithubJson(
      `${GITHUB_API_BASE}/repos/${repository.owner.login}/${repository.name}/contributors?per_page=100`,
      headers
    )

    if (!result.ok) {
      if (isRateLimitResponse(result.status, result.data)) {
        return null
      }

      continue
    }

    if (!Array.isArray(result.data)) {
      continue
    }

    const me = result.data.find(
      (contributor) =>
        contributor &&
        typeof contributor.login === "string" &&
        contributor.login.toLowerCase() === username.toLowerCase()
    )

    if (me && Number.isFinite(me.contributions)) {
      totalCommits += me.contributions
    }
  }

  return totalCommits
}

const getCommitCountFromGraphQL = async (username, token) => {
  if (!token) {
    return null
  }

  const query = `
    query CommitContributions($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-stats"
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: "2008-01-01T00:00:00Z",
        to: new Date().toISOString()
      }
    }),
    next: { revalidate: REVALIDATE_SECONDS }
  })

  if (!response.ok) {
    return null
  }

  const payload = await response.json()
  const total = payload?.data?.user?.contributionsCollection?.totalCommitContributions

  return Number.isFinite(total) ? total : null
}

const toSafeNumber = (value) => {
  return Number.isFinite(value) && value >= 0 ? value : 0
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN || ""
  const headers = getGithubHeaders(token)

  const [profile, repositories] = await Promise.all([
    fetchUserProfile(username, headers),
    fetchRepositories(username, headers)
  ])

  const projects = Math.max(
    toSafeNumber(profile?.public_repos),
    toSafeNumber(repositories.length)
  )

  const baseTechnologies = getBaseTechnologyCount(repositories)
  const detailedTechnologies = token
    ? await getDetailedTechnologyCount(repositories, headers)
    : null

  const technologies = Math.max(
    toSafeNumber(baseTechnologies),
    toSafeNumber(detailedTechnologies)
  )

  const [searchCommitCount, contributorCommitCount, graphQlCommitCount] = await Promise.all([
    getCommitCountFromSearch(username, headers),
    token ? getCommitCountFromContributors(repositories, username, headers) : null,
    getCommitCountFromGraphQL(username, token)
  ])

  const commits = Math.max(
    toSafeNumber(searchCommitCount),
    toSafeNumber(contributorCommitCount),
    toSafeNumber(graphQlCommitCount)
  )

  const payload = projects || technologies || commits
    ? { projects, technologies, commits }
    : FALLBACK_STATS

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=600`
    }
  })
}
