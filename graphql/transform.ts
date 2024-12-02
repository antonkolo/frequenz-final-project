export type PostgresToGraphql<T extends { id: number }> = Omit<T, 'id'> & {
  id: string;
};

export function postgresToGraphql<T extends { id: number }>(
  entity: T | null | undefined,
): PostgresToGraphql<T> | null {
  if (!entity) return null;

  return {
    ...entity,
    id: String(entity.id),
  } as PostgresToGraphql<T>;
}
