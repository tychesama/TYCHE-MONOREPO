// Public GitHub activity for the primary portfolio account.
import { NextResponse } from "next/server";

const GITHUB_USERNAME = "tychesama";

interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubApiCommit {
  commit: {
    message: string;
    author: { name: string; date: string } | null;
    committer: { name: string; date: string } | null;
  };
  html_url: string;
  author: { login: string; avatar_url: string } | null;
  committer: { login: string; avatar_url: string } | null;
}

function githubHeaders(token?: string): HeadersInit {
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function GET() {
  try {
    const headers = githubHeaders(process.env.GITHUB_API_PAT);
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&per_page=5`,
      { headers, next: { revalidate: 300 } },
    );

    if (!reposRes.ok) {
      console.error("GitHub public repository request failed:", reposRes.status);
      return NextResponse.json(
        { error: "Unable to load GitHub activity" },
        { status: 502 },
      );
    }

    const reposRaw = (await reposRes.json()) as GitHubRepo[];
    const repos = reposRaw.filter(
      (repo) =>
        !repo.private &&
        repo.owner.login.toLowerCase() === GITHUB_USERNAME,
    );

    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=5`,
          { headers, next: { revalidate: 300 } },
        );

        if (commitsRes.status === 409 || !commitsRes.ok) {
          if (commitsRes.status !== 409) {
            console.error(
              `GitHub commit request failed for ${repo.full_name}:`,
              commitsRes.status,
            );
          }

          return {
            repoName: repo.name,
            repoLink: repo.html_url,
            commits: [],
          };
        }

        const commitsRaw = (await commitsRes.json()) as GitHubApiCommit[];
        const commits = commitsRaw.map((commit) => {
          const authorName =
            commit.author?.login ??
            commit.commit.author?.name ??
            commit.committer?.login ??
            commit.commit.committer?.name ??
            "Unknown";
          const date =
            commit.commit.author?.date ??
            commit.commit.committer?.date ??
            "";
          const avatar =
            commit.author?.avatar_url ??
            commit.committer?.avatar_url ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}`;

          return {
            message: commit.commit.message,
            author: authorName,
            date,
            link: commit.html_url,
            avatar,
          };
        });

        return {
          repoName: repo.name,
          repoLink: repo.html_url,
          commits,
        };
      }),
    );

    return NextResponse.json({
      username: GITHUB_USERNAME,
      avatarUrl: repos[0]?.owner.avatar_url ?? null,
      commitsData,
    });
  } catch (error) {
    console.error("GitHub activity route failed:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub activity" },
      { status: 500 },
    );
  }
}
