export const Role = {
  Account: 'account',
  Profile: 'profile',
  Refresh: 'refresh',
} as const;

export type Role = typeof Role[keyof typeof Role];
