import React, { useState } from 'react';

export const TextInput = ({ value, onChange, onWarning }) => {
  const [localValue, setLocalValue] = useState(value || '');
  const charCount = localValue.length;
  const wordCount = localValue.trim() === '' ? 0 : localValue.trim().split(/\\s+/).length;

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 10000) {
      setLocalValue(val);
      onChange(val);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="mbti-text" className="text-sm font-semibold text-surface-700 tracking-wide">
        Writing Sample
      </label>
      <textarea
        id="mbti-text"
        value={localValue}
        onChange={handleChange}
        placeholder="Paste some of your writing here (at least 50 words for better accuracy)..."
        className="w-full h-64 p-4 rounded-xl border border-surface-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all resize-none text-surface-900 placeholder:text-surface-400"
        rows={10}
      />
      <div className="flex justify-between text-xs text-surface-500">
        <span>{charCount} / 10,000 characters</span>
        <span className={wordCount < 50 ? 'text-amber-600 font-medium' : ''}>
          {wordCount} words {wordCount < 50 && '(Recommend 50+)'}
        </span>
      </div>
    </div>
  );
};
