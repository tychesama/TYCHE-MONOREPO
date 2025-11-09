import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  html_url: string;
}

interface GitHubCommit {
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
}

export async function GET() {
  try {
    // 1. Fetch user profile for avatar + username
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { error: await userRes.text() },
        { status: userRes.status }
      );
    }

    const userData = await userRes.json();
    const username = userData.login as string;
    const avatarUrl = userData.avatar_url as string;

    // 2. Fetch repos
    const reposRes = await fetch(
      "https://api.github.com/user/repos?sort=updated&per_page=5",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!reposRes.ok) {
      return NextResponse.json(
        { error: await reposRes.text() },
        { status: reposRes.status }
      );
    }

    const repos: GitHubRepo[] = await reposRes.json();

    // 3. Fetch commits per repo
    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
              Accept: "application/vnd.github+json",
            },
            cache: "no-store",
          }
        );

        const commits: GitHubCommit[] = await commitsRes.json();

        return {
          repoName: repo.name,
          repoLink: repo.html_url,
          commits: commits.map((c) => ({
            message: c.commit.message,
            author: c.commit.author.name,
            date: c.commit.author.date,
            link: c.html_url,
          })),
        };
      })
    );

    // 4. Return everything including pfp
    return NextResponse.json({
      username,
      avatarUrl,
      commitsData,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
