export const Role = {
  Account: 'account',
  Profile: 'profile',
} as const;

export type Role = typeof Role[keyof typeof Role];
