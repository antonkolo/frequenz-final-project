export type User = {
  id: number;
  handle: string;
  passwordHash: string;
  createdAt: string;
};

export type Sample = {
  id: number;
  title: string;
  userId: number;
  sourceUrl: string;
  createdAt: string;
  editedAt: string;
};

export type Category = {
  id: number;
  name: string;
};
