import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { canAccess, TIER_LABEL } from './access';

// Usage: <ProtectedRoute minTier={2}>...</ProtectedRoute>
// minTier defaults to 1 (any logged-in role).
export default function ProtectedRoute({ children, minTier = 1 }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="min-h-screen flex items-center justify-center text-text-dim">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!canAccess(user, minTier)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <h2 className="font-display font-bold text-lg mb-2">Access restricted</h2>
          <p className="text-text-mid text-sm mb-1">
            This module requires <span className="text-text-hi">{TIER_LABEL[minTier]}</span> access.
          </p>
          <p className="text-text-dim text-xs">Your role: {user.role}</p>
        </div>
      </div>
    );
  }
  return children;
}
