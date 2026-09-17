import React from 'react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-center">
      <div className="text-red-600 font-bold mb-2">Prediction Failed</div>
      <div className="text-red-500 text-sm mb-4">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-semibold text-red-700 hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
};
