import { motion } from 'framer-motion';
import { MBTI_TYPES } from '../constants/mbtiTypes';

export const ResultCard = ({ type, nickname, confidence }) => {
  const typeInfo = MBTI_TYPES[type];

  const copyToClipboard = () => {
    const confValue = (confidence ?? 0) * 100;
    const text = `My MBTI prediction: ${type} (${typeInfo?.nickname || nickname}) with ${confValue.toFixed(2)}% confidence! Predicted by MBTI.ai`;
    navigator.clipboard.writeText(text);
    alert('Result copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className="p-10 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50 border border-primary-100 shadow-xl shadow-primary-100/50 text-center relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
      <div className="text-xs uppercase tracking-[0.3em] text-primary-600 font-black mb-4">
        Your Predicted Type
      </div>
      <div className="text-8xl font-black text-surface-900 mb-2 tracking-tighter">
        {type}
      </div>
      <div className="text-2xl font-bold text-surface-700 mb-2">
        {nickname || typeInfo?.nickname}
      </div>
      <div className="text-sm font-medium text-primary-500 uppercase tracking-widest mb-6">
        {typeInfo?.group}
      </div>
      <p className="text-surface-600 max-w-md mx-auto mb-8 leading-relaxed italic">
        "{typeInfo?.description}"
      </p>
      <div className="flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-700 text-sm font-bold shadow-sm">
          <span className="text-surface-500 font-medium">Confidence Score:</span>
          <span className="text-primary-900 text-base">{((confidence ?? 0) * 100).toFixed(2)}%</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs font-bold text-surface-400 hover:text-primary-600 transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span>📋</span> Copy result
        </button>
      </div>
    </motion.div>
  );
};
