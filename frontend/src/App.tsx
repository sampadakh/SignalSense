import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TrendRadar } from './pages/TrendRadar';
import { Intelligence } from './pages/Intelligence';
import { Forecasts } from './pages/Forecasts';
import { Strategies } from './pages/Strategies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trends" element={<TrendRadar />} />
          <Route path="intelligence" element={<Intelligence />} />
          <Route path="forecasts" element={<Forecasts />} />
          <Route path="strategies" element={<Strategies />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
