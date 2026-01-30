import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Articles from './pages/Articles.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Projects from './pages/Projects.jsx';
import Admin from './pages/Admin.jsx';
import Support from './pages/Support.jsx';
import FloatingButton from './components/FloatingButton.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/support" element={<Support />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <FloatingButton />
    </>
  );
};

export default App;