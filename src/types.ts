export interface ContentProps {
  content: string;
  type: "paragraph" | "link";
}

export interface CommentProps {
  publishedAt: string;
  author: string;
  applause: number;
  comment: string;
  id: number;
}

export interface PostsProps {
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  },
  content: ContentProps[],
  id: number;
  publishedAt: string;
  comments: CommentProps[]
}