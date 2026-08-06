"use client";

import { useEffect, useState } from "react";

interface Commit {
  message: string;
  author: string;
  date: string;
  link: string;
  repoName: string;
  repoLink: string;
  avatar: string;
}

interface RepoData {
  repoName: string;
  repoLink: string;
  commits: Commit[];
}

interface GitHubResponse {
  avatarUrl?: string;
  username?: string;
  commitsData?: RepoData[];
  error?: string;
}

type LoadStatus = "loading" | "success" | "error";

const ActivityDefault = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCommits() {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await fetch("/api/github", {
          cache: "no-store",
          signal: controller.signal,
        });

        const data = (await response.json()) as GitHubResponse;

        if (!response.ok) {
          throw new Error(
            data.error ?? `GitHub request failed with ${response.status}`,
          );
        }

        const fallbackAvatar = data.avatarUrl ?? "";

        const flatCommits = (data.commitsData ?? [])
          .flatMap((repo) =>
            (repo.commits ?? []).map((commit) => ({
              ...commit,
              repoName: repo.repoName,
              repoLink: repo.repoLink,
              avatar: commit.avatar || fallbackAvatar,
            })),
          )
          .sort(
            (first, second) =>
              new Date(second.date).getTime() -
              new Date(first.date).getTime(),
          );

        if (controller.signal.aborted) return;

        setAvatarUrl(data.avatarUrl ?? null);
        setUsername(data.username ?? null);
        setCommits(flatCommits);
        setStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Failed to load GitHub activity:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load GitHub activity.",
        );
        setStatus("error");
      }
    }

    void loadCommits();

    return () => {
      controller.abort();
    };
  }, []);

  function timeAgo(dateString: string): string {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    const difference = Math.max(
      0,
      Date.now() - date.getTime(),
    );

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 2) {
      return date.toLocaleDateString();
    }

    if (days >= 1) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    if (hours >= 1) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (minutes >= 1) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }

  return (
    <div className="group relative w-full">
      <div className="mt-1 flex h-[320px] w-full flex-col gap-px overflow-y-auto bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)] shadow-md scrollbar-hide">
        <div className="sticky -top-px z-10 bg-[var(--color-mini-card)] px-3 py-2 transition-transform duration-150 group-hover:-translate-y-px">
          <p className="text-xs font-semibold tracking-wide text-[var(--color-text-subtle)]">
            Sourced from GitHub
            {username ? ` · ${username}` : ""}
          </p>
        </div>

        {status === "loading" && (
          <div className="flex flex-1 items-center justify-center">
            <img
              src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
              alt="Loading GitHub activity"
              className="h-6 w-6"
            />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-1 items-center justify-center px-4 text-center">
            <p className="text-xs text-[var(--color-text-subtle)]">
              {errorMessage ?? "Unable to load GitHub activity."}
            </p>
          </div>
        )}

        {status === "success" && commits.length === 0 && (
          <div className="flex flex-1 items-center justify-center px-4 text-center">
            <p className="text-xs text-[var(--color-text-subtle)]">
              No recent public commits found.
            </p>
          </div>
        )}

        {status === "success" &&
          commits.map((commit) => (
            <a
              key={`${commit.repoName}:${commit.link}:${commit.date}`}
              href={commit.link || commit.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-fit items-center gap-3 bg-[var(--color-mini-card)] px-3 py-2 shadow-sm transition-shadow duration-150 hover:bg-[var(--color-mini-card-hover)] hover:shadow-md"
            >
              <img
                src={
                  commit.avatar ||
                  avatarUrl ||
                  "https://placehold.co/45x45"
                }
                alt={commit.author || "GitHub user"}
                className="h-[45px] w-[45px] flex-shrink-0 rounded-md object-cover"
              />

              <div className="flex min-w-0 flex-col">
                <div className="truncate text-sm font-semibold text-[var(--color-text-main)] hover:text-[var(--color-text-subtle)] hover:underline">
                  {commit.repoName}
                </div>

                <div className="w-full truncate text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] hover:underline">
                  {commit.message}
                </div>

                <span className="text-[0.7rem] text-[var(--color-text-subtle)]">
                  {timeAgo(commit.date)}
                </span>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default ActivityDefault;