import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MBTI_TYPES } from '../constants/mbtiTypes';

export const LoadingState = () => {
  const [step, setStep] = useState(0);
  const messages = [
    'Analyzing linguistic patterns...',
    'Extracting personality markers...',
    'Evaluating cognitive functions...',
    'Calculating dichotomy scores...',
    'Finalizing prediction...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-20 gap-8 text-center">
      <div className="relative w-24 h-24">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-l-primary-500"
        />
        {/* Inner pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-2 rounded-full border-2 border-primary-200"
        />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-ping" />
        </div>
      </div>

      <div className="h-8 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-surface-600 font-medium"
          >
            {messages[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
