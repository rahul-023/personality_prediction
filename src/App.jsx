import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PredictorPage } from './pages/PredictorPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [page, setPage] = useState('predictor');

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 via-white to-surface-100 font-sans text-surface-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200 py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div
            className="font-black text-xl tracking-tight text-surface-900 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setPage('predictor')}
          >
            MBTI<span className="text-primary-600">.ai</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            <button
              onClick={() => setPage('predictor')}
              className={`transition-colors ${page === 'predictor' ? 'text-primary-600' : 'text-surface-500 hover:text-surface-800'}`}
            >
              Predictor
            </button>
            <button
              onClick={() => setPage('about')}
              className={`transition-colors ${page === 'about' ? 'text-primary-600' : 'text-surface-500 hover:text-surface-800'}`}
            >
              About
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <AnimatePresence mode="wait">
          {page === 'predictor' ? (
            <motion.div
              key="predictor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <PredictorPage />
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <AboutPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
