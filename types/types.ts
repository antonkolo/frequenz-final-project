export type Sample = {
  id: number;
  title: string;
  userId: User['id'];
  sourceUrl: string;
  createdAt: string;
  editedAt: string;
};

export type User = {
  id: number;
  handle: string;
  passwordHash: string;
  createdAt: string;
};
