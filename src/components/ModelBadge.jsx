import React from 'react';

export const ModelBadge = ({ info }) => {
  if (!info) return null;

  return (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white border border-surface-200 shadow-sm text-[11px] text-surface-500 font-medium">
      <span className="text-surface-900 font-bold">{info.model}</span>
      <span className="w-1 h-1 rounded-full bg-surface-300" />
      <span>Accuracy: <span className="text-surface-900">{(info.accuracy * 100).toFixed(2)}%</span></span>
      <span className="w-1 h-1 rounded-full bg-surface-300" />
      <span>{info.rows.toLocaleString()} samples</span>
    </div>
  );
};
