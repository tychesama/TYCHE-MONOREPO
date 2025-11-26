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

    const commitsData = await Promise.all(
      repos.map(async (repo) => {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/commits?per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_API_PAT}`,
              Accept: "application/vnd.github+json",
            },
            cache: "no-store",
          }
        );

        const commitsRaw = await commitsRes.json();

        const commits = Array.isArray(commitsRaw)
          ? commitsRaw.map((c) => ({
            message: c.commit.message,
            author: c.commit.author?.name || "Unknown",
            date: c.commit.author?.date || "",
            link: c.html_url,
          }))
          : []; // fallback to empty if API returned error object

        return {
          repoName: repo.name,
          repoLink: repo.html_url,
          commits,
        };
      })
    );


    return NextResponse.json({ commitsData });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}