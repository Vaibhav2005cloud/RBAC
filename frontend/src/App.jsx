import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const CommandCenter = lazy(() => import('./pages/CommandCenter'));
const CognitiveTwin = lazy(() => import('./pages/CognitiveTwin'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Predictor = lazy(() => import('./pages/Predictor'));
const Allocation = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Allocation })));
const Explainable = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Explainable })));
const WhatIf = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.WhatIf })));
const Copilot = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Copilot })));
const Reports = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Reports })));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-dim">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute minTier={1}><CommandCenter /></ProtectedRoute>} />
              <Route path="digital-twin" element={<ProtectedRoute minTier={1}><CognitiveTwin /></ProtectedRoute>} />
              <Route path="analytics" element={<ProtectedRoute minTier={2}><Analytics /></ProtectedRoute>} />
              <Route path="predictor" element={<ProtectedRoute minTier={1}><Predictor /></ProtectedRoute>} />
              <Route path="allocation" element={<ProtectedRoute minTier={2}><Allocation /></ProtectedRoute>} />
              <Route path="explainable" element={<ProtectedRoute minTier={2}><Explainable /></ProtectedRoute>} />
              <Route path="whatif" element={<ProtectedRoute minTier={2}><WhatIf /></ProtectedRoute>} />
              <Route path="copilot" element={<ProtectedRoute minTier={2}><Copilot /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute minTier={2}><Reports /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
