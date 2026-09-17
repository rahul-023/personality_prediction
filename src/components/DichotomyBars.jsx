import { motion } from 'framer-motion';
import { DICHOTOMIES } from '../constants/dichotomies';

export const DichotomyBars = ({ dichotomies }) => {
  if (!dichotomies) return null;

  return (
    <div className="flex flex-col gap-8 w-full mt-4">
      {Object.entries(DICHOTOMIES).map(([key, config]) => {
        const data = dichotomies[key];
        if (!data) return null;

        const score = data.score ?? 0.5; // Default to neutral if score is missing
        const leftPercent = (1 - score) * 100;
        const rightPercent = score * 100;

        return (
          <div key={key} className="flex flex-col gap-3">
            <div className="flex justify-between text-xs font-black uppercase tracking-wider text-surface-500">
              <span>{config.labels[config.left]}</span>
              <span>{config.labels[config.right]}</span>
            </div>
            <div className="relative h-5 w-full bg-surface-100 rounded-full overflow-hidden flex border border-surface-200 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${leftPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary-300 rounded-full"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rightPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary-600 rounded-full"
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-white shadow-sm"
                style={{ left: `${leftPercent}%` }}
              />
            </div>
            <div className="text-center text-sm font-bold text-surface-800 py-1 bg-surface-50 rounded-lg border border-surface-100">
              {data.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
