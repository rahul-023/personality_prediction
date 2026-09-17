import React from 'react';
import { motion } from 'framer-motion';

export const PredictButton = ({ onClick, disabled, loading }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className="w-full py-3 px-6 rounded-xl bg-primary-600 text-white font-bold shadow-sm
                 hover:bg-primary-700 hover:shadow-md disabled:bg-surface-300 disabled:cursor-not-allowed
                 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
    >
      {loading ? 'Analyzing...' : 'Predict Personality'}
    </motion.button>
  );
};
