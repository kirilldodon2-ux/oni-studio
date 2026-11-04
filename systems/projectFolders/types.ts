export type ProjectMedia = { src: string; kind: "image" | "video" };

export type FolderProject = {
  id: string;
  title: string;
  year: string;
  creator?: string;
  description: string;
  descriptionRu?: string;
  cover: string;
  media: ProjectMedia[];
  caseHref?: string;
};

export type ProjectFolder = {
  id: string;
  title: string;
  items: FolderProject[];
};
