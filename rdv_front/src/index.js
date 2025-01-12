import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from './composants/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './middlewares/ProtectedRoute';
import { AuthProvider } from './middlewares/AuthContext';
import ErrorBoundary from './middlewares/ErrorBoundary'; // Importer ErrorBoundary
import BuggyComponent from './composants/BuggyComponent'; // Importer BuggyComponent

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
            <Route path="/bug" element={<BuggyComponent />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
