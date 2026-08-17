// Public project metadata for the primary portfolio account.
import { NextResponse } from "next/server";

const GITHUB_USERNAME = "tychesama";
const REPO_NAME_PATTERN = /^[A-Za-z0-9._-]{1,100}$/;

interface GitHubRepoResponse {
  private: boolean;
  updated_at: string;
}

interface GitHubCommitResponse {
  commit: {
    message: string;
    author: { name: string; date: string } | null;
  };
  html_url: string;
}

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_API_PAT;

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ user: string; repo: string }> },
) {
  const { user, repo } = await context.params;

  if (user.toLowerCase() !== GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "Repository owner is not allowed" },
      { status: 403 },
    );
  }

  if (!REPO_NAME_PATTERN.test(repo)) {
    return NextResponse.json(
      { error: "Invalid repository name" },
      { status: 400 },
    );
  }

  const requestedLimit = Number(
    new URL(request.url).searchParams.get("limit") ?? "5",
  );
  const limit = Math.min(10, Math.max(1,
    Number.isFinite(requestedLimit) ? Math.floor(requestedLimit) : 5,
  ));
  const headers = githubHeaders();
  const baseUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`;

  try {
    const repoRes = await fetch(baseUrl, {
      headers,
      next: { revalidate: 300 },
    });

    if (repoRes.status === 404) {
      return NextResponse.json(
        { error: "Public repository not found" },
        { status: 404 },
      );
    }

    if (!repoRes.ok) {
      console.error("GitHub repository request failed:", repoRes.status);
      return NextResponse.json(
        { error: "Unable to load repository data" },
        { status: 502 },
      );
    }

    const repoData = (await repoRes.json()) as GitHubRepoResponse;

    if (repoData.private) {
      return NextResponse.json(
        { error: "Public repository not found" },
        { status: 404 },
      );
    }

    const [langsRes, commitsRes] = await Promise.all([
      fetch(`${baseUrl}/languages`, {
        headers,
        next: { revalidate: 300 },
      }),
      fetch(`${baseUrl}/commits?per_page=${limit}`, {
        headers,
        next: { revalidate: 300 },
      }),
    ]);

    const languages = langsRes.ok
      ? ((await langsRes.json()) as Record<string, number>)
      : {};
    const commitsRaw = commitsRes.ok
      ? ((await commitsRes.json()) as GitHubCommitResponse[])
      : [];
    const commits = commitsRaw.map((commit) => ({
      message: commit.commit.message,
      url: commit.html_url,
      author: commit.commit.author?.name ?? "Unknown",
      date: commit.commit.author?.date ?? "",
    }));

    return NextResponse.json({
      repo: { updatedAt: repoData.updated_at },
      languages,
      collaborators: [],
      commits,
    });
  } catch (error) {
    console.error("GitHub project route failed:", error);
    return NextResponse.json(
      { error: "Unable to load repository data" },
      { status: 500 },
    );
  }
}
