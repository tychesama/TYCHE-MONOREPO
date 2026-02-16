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

const ProfileDefault: React.FC<{ profile: any }> = () => {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api/latest"
      : "https://blog.tyche01.fun/api/latest")
      .then((res) => res.json())
      .then((data) => setLatestArticle(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ml-[10px] w-[875px] h-full flex items-center justify-center mt-[4px]">
      <div className="w-[875px] h-[550px] w-full flex items-start bg-[rgba(0,0,0,0.18)] backdrop-blur-[2px] rounded-lg shadow-[inset_0_6px_16px_rgba(0,0,0,0.45)]  rounded-xl shadow-inner overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between items-center text-[var(--color-text-main)]">
          {/* profile section */}
          <div className="w-full px-10 pt-10">
            <div className="w-full flex items-start gap-10">

              {/* profile image */}
              <div className="w-[320px] h-[320px] flex-shrink-0 rounded-full overflow-hidden bg-[rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.06)] shadow-[inset_0_10px_26px_rgba(0,0,0,0.55),_0_18px_40px_rgba(0,0,0,0.35)]">
                <img
                  src="/static/pfp_new.png"
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* text content */}
              <div className="flex-1 flex flex-col justify-center items-start gap-4 text-left">
                <p className="text-[34px] font-bold tracking-wide leading-tight">
                  Hi, my name is Joem!
                </p>
                <div className="text-justify text-sm text-[var(--color-text-subtle)] leading-relaxed max-w-[560px] space-y-4">
                  <p>
                    This website is still a work in progress. I am gradually building features,
                    refining the design, and experimenting with different ideas as I continue
                    learning and improving my development skills.
                  </p>
                  <p>
                    You may notice changes over time as new sections are added, layouts are
                    adjusted, and projects are updated. The goal is to create a space that
                    reflects both my work and my growth as a developer.
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* latest article card */}
          {latestArticle && (
            <div className="w-[875px] h-[175px] bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)] p-6 rounded-md flex items-center justify-center gap-4 shadow-md">
              <div className="flex flex-col gap-[10px] w-[600px] h-full divide-y divide-[var(--color-text-subtle)]">
                <Link
                  href={`https://blog.tyche01.fun/${latestArticle.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[600px] h-[90px] flex flex-row gap-[9px] items-start"
                >
                  <div
                    className="w-[6px] h-full rounded-sm transition-all duration-200"
                    style={{ backgroundColor: latestArticle.color }}
                  />

                  <div className="w-full h-full flex flex-col justify-center items-start min-w-0">
                    <p className="text-lg font-semibold text-[var(--color-text-main)] hover:text-[var(--color-text-subtle)] hover:underline truncate w-full">
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


                <div className="w-[600px] h-full text-sm text-[var(--color-text-subtle)] px-2 flex items-center gap-2">
                  <span>Latest article of my Blog!</span>
                  <span className="opacity-60">|</span>
                  <Link href="https://blog.tyche01.fun/" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-text-subtle)] hover:underline truncate">
                    Check out my Blog here!
                  </Link>
                  <span className="opacity-60">|</span>
                  <span className="text-sm text-[var(--color-text-subtle)]">
                    Check out my Social Media {"->"}
                  </span>
                </div>
              </div>

              <div className="w-[210px] h-full flex flex-col justify-center -mt-4">
                <p className="text-sm text-[var(--color-text-main)] mb-2">Links:</p>

                <div className="grid grid-cols-4 auto-rows-[40px] w-[190px] gap-[10px] ml-[15px]">
                  <a href="https://www.facebook.com/joem.tyche/" target="_blank" rel="noopener noreferrer" aria-label="facebook"
                    className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150">
                    <FaFacebook className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="https://www.linkedin.com/in/jose-emmanuel-idpan-0127a5319/" target="_blank" rel="noopener noreferrer" aria-label="linkedin"
                    className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150">
                    <FaLinkedin className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="" target="_blank" rel="noopener noreferrer" aria-label="twitter"
                    // className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150"
                    className="w-[40px] h-[40px] rounded-md 
             bg-[rgba(255,255,255,0.04)]
             border border-[rgba(255,255,255,0.01)]
             flex items-center justify-center
             opacity-40 pointer-events-none cursor-not-allowed">
                    <FaXTwitter className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="" target="_blank" rel="noopener noreferrer" aria-label="instagram"
                    // className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150"
                    className="w-[40px] h-[40px] rounded-md 
             bg-[rgba(255,255,255,0.04)]
             border border-[rgba(255,255,255,0.01)]
             flex items-center justify-center
             opacity-40 pointer-events-none cursor-not-allowed">
                    <FaInstagram className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="https://github.com/tychesama" target="_blank" rel="noopener noreferrer" aria-label="github_main"
                    className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150">
                    <FaGithub className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="https://github.com/joemtyche" target="_blank" rel="noopener noreferrer" aria-label="github_alt"
                    className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150">
                    <FaGithub className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="https://www.youtube.com/@tyche-sama" target="_blank" rel="noopener noreferrer" aria-label="youtube"
                    className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150">
                    <FaYoutube className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>

                  <a href="" target="_blank" rel="noopener noreferrer" aria-label="figma"
                    // className="group w-[40px] h-[40px] rounded-md bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255, 255, 255, 0)] border border-[rgba(255,255,255,0.01)] flex items-center justify-center hover:shadow-md transition-all duration-150"
                    className="w-[40px] h-[40px] rounded-md 
             bg-[rgba(255,255,255,0.04)]
             border border-[rgba(255,255,255,0.01)]
             flex items-center justify-center
             opacity-40 pointer-events-none cursor-not-allowed">
                    <FaFigma className="text-[24px] text-[var(--color-text-main)] group-hover:text-[var(--color-text-subtle)]" />
                  </a>
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
