import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TemplateGallery } from './components/template-gallery/template-gallery';
import { VideoEditor } from './components/video-editor/video-editor';
import { WalkthroughGuide, WalkthroughProvider } from './components/onboarding';

export default function App() {
  return (
    <WalkthroughProvider>
      <WalkthroughGuide />
      <Router>
        <Routes>
          <Route path="/" element={<TemplateGallery />} />
          <Route path="/editor" element={<VideoEditor />} />
        </Routes>
      </Router>
    </WalkthroughProvider>
  );
}