import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ user: string; repo: string }> }

) {
  const { user, repo } = await context.params;


  // Choose token, prefer GITHUB_API_PAT then fallback to GITHUB_API_PAT2
  const token =
    process.env.GITHUB_API_PAT || process.env.GITHUB_API_PAT2 || "";

  const headers = {
    ...(token && { Authorization: `token ${token}` }),
    "User-Agent": "Next.js App",
  };

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ?? "5";

    const [repoRes, langsRes, collabRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${user}/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${user}/${repo}/languages`, { headers }),
      fetch(`https://api.github.com/repos/${user}/${repo}/collaborators`, { headers }),
      fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=${limit}`, { headers }),
    ]);

    // if primary token fails (bad credentials / rate limit), retry with secondary
    if (repoRes.status === 401 || repoRes.status === 403) {
      const fallbackHeaders = {
        ...(process.env.GITHUB_API_PAT2 && {
          Authorization: `token ${process.env.GITHUB_API_PAT2}`,
        }),
        "User-Agent": "Next.js App",
      };

      return GETwithHeaders(user, repo, fallbackHeaders, limit);
    }

    const [repoData, langs, collaborators, commitsRaw] = await Promise.all([
      repoRes.json(),
      langsRes.json(),
      collabRes.json(),
      commitsRes.json(),
    ]);

    const commits = Array.isArray(commitsRaw)
      ? commitsRaw.map((c: any) => ({
          message: c.commit.message,
          url: c.html_url,
          author: c.commit.author.name,
          date: c.commit.author.date,
        }))
      : [];

    return NextResponse.json({
      repo: { updatedAt: repoData.updated_at },
      languages: langs,
      collaborators: Array.isArray(collaborators)
        ? collaborators.map((c: any) => ({
            login: c.login,
            avatar_url: c.avatar_url,
            html_url: c.html_url,
          }))
        : [],
      commits,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

// helper function to retry with fallback headers
async function GETwithHeaders(
  user: string,
  repo: string,
  headers: Record<string, string>,
  limit: string
) {
  const [repoRes, langsRes, collabRes, commitsRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${user}/${repo}`, { headers }),
    fetch(`https://api.github.com/repos/${user}/${repo}/languages`, { headers }),
    fetch(`https://api.github.com/repos/${user}/${repo}/collaborators`, { headers }),
    fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=${limit}`, { headers }),
  ]);

  const [repoData, langs, collaborators, commitsRaw] = await Promise.all([
    repoRes.json(),
    langsRes.json(),
    collabRes.json(),
    commitsRes.json(),
  ]);

  const commits = Array.isArray(commitsRaw)
    ? commitsRaw.map((c: any) => ({
        message: c.commit.message,
        url: c.html_url,
        author: c.commit.author.name,
        date: c.commit.author.date,
      }))
    : [];

  return NextResponse.json({
    repo: { updatedAt: repoData.updated_at },
    languages: langs,
    collaborators: Array.isArray(collaborators)
      ? collaborators.map((c: any) => ({
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
        }))
      : [],
    commits,
  });
}
