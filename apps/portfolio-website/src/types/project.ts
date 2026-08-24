export type Collaborators = Record<string, string>;

export interface Project {
    id?: string;
    name: string;
    description: string;
    link: string;
    repo: string;
    user: string;
    color: string;

    tier?: string;
    category?: string;
    showOnHome?: boolean;
    homeSection?: string;
    projectType?: string;
    status?: string;
    sourceAvailability?: string;
    fullDescription?: string;
    highlights?: string[];
    aiInvolvement?: string;
    aiDisclosure?: string;
    projectContext?: string;
    myContributions?: string;
    privateNotes?: string;

    images?: string[];
    techstack?: string[];
    collaborators?: Collaborators;
    tags?: string[];
    favorite?: boolean;

    deployment?: string;
    demo?: string;
    logo?: string | null;
    favicon?: string | null;
}
