// Activity Route
import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubApiCommit {
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    } | null;
    committer: {
      name: string;
      date: string;
    } | null;
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
  committer: {
    login: string;
    avatar_url: string;
  } | null;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_API_PAT;

    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_API_PAT is not configured" },
        { status: 500 },
      );
    }

    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const reposRes = await fetch(
      "https://api.github.com/user/repos?affiliation=owner&sort=pushed&per_page=5",
      {
        headers,
        cache: "no-store",
      },
    );

    if (!reposRes.ok) {
      const details = await reposRes.text();

      console.error(
        "GitHub repository request failed:",
        reposRes.status,
        details,
      );

      return NextResponse.json(
        {
          error: "Failed to fetch GitHub repositories",
          status: reposRes.status,
        },
        { status: reposRes.status },
      );
    }

    const repos = (await reposRes.json()) as GitHubRepo[];

    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=5`,
          {
            headers,
            cache: "no-store",
          },
        );

        // Empty Git repositories can return 409.
        if (commitsRes.status === 409) {
          return {
            repoName: repo.name,
            repoLink: repo.html_url,
            commits: [],
          };
        }

        if (!commitsRes.ok) {
          const details = await commitsRes.text();

          console.error(
            `GitHub commit request failed for ${repo.full_name}:`,
            commitsRes.status,
            details,
          );

          return {
            repoName: repo.name,
            repoLink: repo.html_url,
            commits: [],
          };
        }

        const commitsRaw =
          (await commitsRes.json()) as GitHubApiCommit[];

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
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              authorName,
            )}`;

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

    const profile = repos[0]?.owner;

    return NextResponse.json({
      username: profile?.login ?? null,
      avatarUrl: profile?.avatar_url ?? null,
      commitsData,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error";

    console.error("GitHub activity route failed:", error);

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}