"use client";
import { useEffect, useState } from "react";

interface ProfileProps {
  profile: {
    name: string;
    title: string;
    nickname: string;
    image: string;
    about: string;
  };
}

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

const ProfileDefault: React.FC<{ profile: any }> = ({ profile }) => {
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
    <div className="w-full h-[250px] flex flex-col justify-between items-center text-[var(--color-text-main)]">
      {/* profile section */}
      <div className="px-8 pt-6 rounded-lg flex items-start w-full ml-8 ">
        <div className="min-w-[275px] h-[320px] overflow-hidden">
          <img
            src="/assets/pfp.png"
            alt="Profile"
            className="w-[300px] h-[640px] object-cover object-top transform scale-x-[-1]"
          />
        </div>
        <div>
          <p className="mt-20 mb-4 text-[30px] font-bold tracking-wide text-[var(--color-primary)]">
            Hi, my name is {profile.nickname}.
          </p>
          <p className="text-base text-[var(--color-text-subtle)] leading-relaxed italic">
            {profile.about}
          </p>
        </div>
      </div>

      {/* latest article card */}
      {latestArticle && (
        <div className="w-[95%] min-h-[175px] bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)] p-6 rounded-md flex items-start gap-4 shadow-md">
          <img
            src={latestArticle.image}
            alt={latestArticle.title}
            className="w-[75px] h-[75px] rounded-md object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-[var(--color-text-subtle)]">
              {latestArticle.title}
            </p>
            <p className="text-sm text-[var(--color-text-subtle)]">
              {latestArticle.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDefault;
