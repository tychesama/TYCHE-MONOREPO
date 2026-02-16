export type Collaborators = Record<string, string>;

export interface Project {
    name: string;
    description: string;
    link: string;
    repo: string;
    user: string;
    color: string;

    images?: string[];
    techstack?: string[];
    collaborators?: Collaborators;

    deployment?: string;
    documentation?: string;
}
