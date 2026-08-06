# joemidpan.com Monorepo



## Overview

This repository is a **monorepo** containing multiple projects, including:
npm run dev:all
- **Portfolio** – The original project, intended to showcase myself and my works.
- **Blog** – A place to document thoughts, learnings, and updates.
- **Home** – Landing page for my website, which will be a hub for my future project deployments.

```



---



## Build



```bash

npm run build:home

- Projects I’ve undertaken

npm run build:blog

```


## Repository Structure

This monorepo contains the following main projects:
- portfolio
- home page
- blog

Each project is self-contained with its own configuration, while sharing common utilities where appropriate.

---


---


- Document learnings and developments within the blog section.  
## Lint




```bash

npm run lint:home

npm run lint:portfolio

npm run lint:blog

```



---



## Workspace commands



You can also run scripts directly in a workspace:



```bash

npm --workspace apps/home-page run dev

npm --workspace apps/portfolio-website run build

npm --workspace apps/portfolio-website run lint:fix

```



---



## Repository structure



```

apps/

  home-page/           Vite landing page / project hub

  portfolio-website/   Next.js portfolio site

  blog/                Next.js blog

shared/

  icons/               Shared icon components

  ui/                  Shared UI components, hooks, and styles

```



Each app is self-contained with its own configuration. Shared code is linked through TypeScript path aliases and bundler aliases, not separate npm packages.



---



## Origins



- The project began as a portfolio, inspired by suggestions from internship peers and my own interest in building a personal site.  

- Design decisions started without the use of Figma or other design tools; initial sketches were created with pen, paper, and even simple tools like Paint.

- Design is now further developed using Figma for ease of use. 

- joemidpan.com is my first deployed website with a domain.  

- Over time, the portfolio grew to include multiple projects and sections, evolving beyond its original purpose.



---



## Purpose



The site serves as a compilation of:



- My past works

- Projects I've undertaken

- A personal showcase of skills and experience



The focus is on simplicity and functionality, providing a clear representation of myself and my work.



---



## Future Plans



- Continue expanding the monorepo with new projects, past work compilations, and updates.  

- Maintain a clean and simple design philosophy that prioritizes clarity and usability.  

- Document learnings and developments within the blog section.


