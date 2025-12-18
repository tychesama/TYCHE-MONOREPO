export type ArticleItem = {
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