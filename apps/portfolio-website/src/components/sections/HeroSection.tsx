"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaXTwitter, FaInstagram, FaGithub, FaYoutube, FaFigma } from "react-icons/fa6";

interface Article {
  id: string;
  title: string;
  date: Date;
  color: string;
  pinned: boolean;
  favorite: boolean;
  tags: string[];
  image: string;
  description: string;
}

const socialLinks = [
  { href: "https://www.facebook.com/joem.tyche/", icon: FaFacebook, label: "facebook", active: true },
  { href: "https://www.linkedin.com/in/jose-emmanuel-idpan-0127a5319/", icon: FaLinkedin, label: "linkedin", active: true },
  { href: "", icon: FaXTwitter, label: "twitter", active: false },
  { href: "", icon: FaInstagram, label: "instagram", active: false },
  { href: "https://github.com/tychesama", icon: FaGithub, label: "github_main", active: true },
  { href: "https://github.com/joemtyche", icon: FaGithub, label: "github_alt", active: true },
  { href: "https://www.youtube.com/@tyche-sama", icon: FaYoutube, label: "youtube", active: true },
  { href: "", icon: FaFigma, label: "figma", active: false },
];

const ProfileDefault: React.FC = () => {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api/latest"
        : "https://blog.tyche01.fun/api/latest"
    )
      .then((res) => res.json())
      .then((data) => setLatestArticle(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-[875px] mx-auto px-2 sm:px-0 mt-1">
      <div className="w-full sm:h-[550px] flex items-start bg-[rgba(0,0,0,0.18)] backdrop-blur-[2px] rounded-xl shadow-[inset_0_6px_16px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="w-full flex flex-col justify-between items-center text-[var(--color-text-main)]">

          {/* Profile section */}
          <div className="w-full px-5 sm:px-10 pt-8 sm:pt-10">
            {/* On mobile: stack vertically + center. On sm+: side by side */}
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

              {/* Profile image */}
              <div className="w-36 h-36 sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] flex-shrink-0 rounded-full overflow-hidden bg-[rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.06)] shadow-[inset_0_10px_26px_rgba(0,0,0,0.55),_0_18px_40px_rgba(0,0,0,0.35)]">
                <img
                  src="/static/pfp_new.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-top scale-[1.15] hover:scale-[1.20] transition-transform duration-300"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-center items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left pb-4 min-w-0">
                <p className="text-2xl sm:text-[34px] font-bold tracking-wide leading-tight">
                  Hi, my name is Joem!
                </p>
                <div className="w-full">
                  <p className="text-sm sm:text-base font-medium text-[var(--color-text-main)]/90 leading-relaxed">
                    Computer Science graduate from Ateneo de Davao University. I build practical web apps
                    across different stacks and I'm currently looking for full-stack, backend, or frontend work.
                  </p>
                  <div className="mt-3 sm:mt-4 space-y-3">
                    <div className="pl-4 border-l-2 border-[rgba(255,255,255,0.10)] text-left">
                      <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
                        I prefer simple layouts that prioritize speed, clarity, and usability.
                        Instead of heavy styling, I add subtle effects and small interactions that feel purposeful.
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-[rgba(255,255,255,0.08)] text-left">
                      <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
                        This site is where I keep refining components, experimenting with ideas, and documenting progress through projects and articles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest article card */}
          {latestArticle && (
            <div className="w-full mt-4 bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)] px-5 sm:px-6 py-5 sm:py-5 rounded-md shadow-md">
              {/* On mobile: stack article + socials. On sm+: side by side */}
              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-4">

                {/* Article info */}
                <div className="flex flex-col gap-[10px] w-full sm:flex-1 min-w-0 divide-y divide-[var(--color-text-subtle)]">
                  <Link
                    href={`https://blog.tyche01.fun/${latestArticle.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-row gap-[9px] items-start pb-2"
                  >
                    <div
                      className="w-[6px] min-h-[60px] self-stretch rounded-sm transition-all duration-200 shrink-0"
                      style={{ backgroundColor: latestArticle.color }}
                    />
                    <div className="flex flex-col justify-center items-start min-w-0 w-full">
                      <p className="text-base sm:text-lg font-semibold text-[var(--color-text-main)] hover:text-[var(--color-text-subtle)] hover:underline truncate w-full">
                        {latestArticle.title}
                      </p>
                      <p className="text-sm text-[var(--color-text-subtle)] truncate w-full">
                        {latestArticle.description}
                      </p>
                      <p className="text-xs text-[var(--color-text-subtle)] opacity-70 mt-1 ml-auto whitespace-nowrap">
                        {new Date(latestArticle.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>

                  <div className="hidden sm:flex w-full text-sm text-[var(--color-text-subtle)] pt-2 items-center gap-2 flex-wrap">
                    <span>Latest article of my Blog!</span>
                    <span className="opacity-60">|</span>
                    <Link
                      href="https://blog.tyche01.fun/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-text-subtle)] hover:underline"
                    >
                      Check out my Blog here!
                    </Link>
                    <span className="opacity-60 hidden sm:inline">|</span>
                    <span className="hidden sm:inline">Check out my Social Media {"->"}</span>
                  </div>
                </div>

                {/* Social links */}
                {/* Social links */}
                <div className="w-full sm:w-auto flex flex-col items-center sm:items-start border-t border-[var(--color-text-subtle)] sm:border-t-0 pt-4 sm:pt-0">
                  <p className="text-sm text-[var(--color-text-main)] mb-2">Links:</p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-[10px]">
                    {socialLinks.map(({ href, icon: Icon, label, active }) =>
                      active ? (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="group w-10 h-10 rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150"
                        >
                          <Icon className="text-2xl text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                        </a>
                      ) : (
                        <span
                          key={label}
                          aria-label={label}
                          className="w-10 h-10 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center opacity-40 cursor-not-allowed"
                        >
                          <Icon className="text-2xl text-[var(--color-text-main)]" />
                        </span>
                      )
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileDefault;