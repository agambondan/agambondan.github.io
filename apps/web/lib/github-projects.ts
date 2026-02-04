import fallbackProjects from "./github-projects.fallback.json";

export type GithubProject = {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
};

type GithubRepoResponse = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

const GITHUB_USERNAME = "agambondan";
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const FETCH_TIMEOUT_MS = 5000;

let cachedProjects: GithubProject[] | null = null;

function normalizeRepo(repo: GithubRepoResponse): GithubProject {
  return {
    name: repo.name,
    description: repo.description ?? "",
    html_url: repo.html_url,
    language: repo.language ?? "Unknown",
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at,
    topics: repo.topics ?? []
  };
}

function sortRepos(repos: GithubProject[]): GithubProject[] {
  return repos.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }

    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

export async function getGithubProjects(limit = 6): Promise<GithubProject[]> {
  if (process.env.GITHUB_PROJECTS_SOURCE === "fallback") {
    cachedProjects = sortRepos([...fallbackProjects] as GithubProject[]);
    return cachedProjects.slice(0, limit);
  }

  if (cachedProjects) {
    return cachedProjects.slice(0, limit);
  }

  try {
    const timeoutSignal =
      typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
        ? AbortSignal.timeout(FETCH_TIMEOUT_MS)
        : undefined;

    const response = await fetch(GITHUB_REPOS_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "agambondan-github-pages"
      },
      next: { revalidate: 86400 },
      signal: timeoutSignal
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const payload = (await response.json()) as GithubRepoResponse[];
    const filtered = payload
      .filter((repo) => !repo.fork && !repo.archived)
      .map(normalizeRepo);

    cachedProjects = sortRepos(filtered);
    return cachedProjects.slice(0, limit);
  } catch (_error) {
    cachedProjects = sortRepos([...fallbackProjects] as GithubProject[]);
    return cachedProjects.slice(0, limit);
  }
}
