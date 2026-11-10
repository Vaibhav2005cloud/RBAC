// Single source of truth for role -> access tier on the frontend.
// Must mirror ROLE_TIER in backend/main.py. The backend is the real enforcer;
// this only controls what the UI shows.
export const ROLE_TIER = {
  'Field Officer': 1,
  'Analyst': 2,
  'Commissioner': 2,
  'Administrator': 3,
};

export const TIER_LABEL = {
  1: 'Public overview',
  2: 'Analyst tools',
  3: 'Admin only',
};

export function tierOf(user) {
  return user ? (user.tier ?? ROLE_TIER[user.role] ?? 0) : 0;
}

export function canAccess(user, minTier) {
  return tierOf(user) >= minTier;
}
