'use client';

import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types/types';

export const UserContext = createContext<User | undefined>(undefined);

export default function AppWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | undefined;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext<User | undefined>(UserContext);
}
