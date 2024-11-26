export type User = {
  id: number;
  handle: string;
  createdAt: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Sample = {
  id: number;
  title: string;
  userId: number;
  sourceUrl: string;
  createdAt: string;
  editedAt: string;
  description: string;
  fileKey: string;
  user?: User;
};

export type Category = {
  id: number;
  name: string;
  sampleCategories?: SampleCategory[];
};

export type SampleCategory = {
  id: number;
  sampleId: Sample['id'];
  categoryId: Category['id'];
  sample?: Sample;
};

export type SampleLike = {
  id: number;
  sampleId: Sample['id'];
  userId: User['id'];
};

export type Session = {
  id: number;
  token: string;
  userId: number;
};

export type Context = {
  sessionTokenCookie?: { value: string };
};
