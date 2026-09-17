import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrediction } from '../hooks/usePrediction';
import { getModelInfo } from '../api/predict';
import { TextInput } from '../components/TextInput';
import { PredictButton } from '../components/PredictButton';
import { ResultCard } from '../components/ResultCard';
import { DichotomyBars } from '../components/DichotomyBars';
import { ConfidenceChart } from '../components/ConfidenceChart';
import { ModelBadge } from '../components/ModelBadge';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';

export const PredictorPage = () => {
  const [text, setText] = useState('');
  const [modelInfo, setModelInfo] = useState(null);
  const [validationError, setValidationError] = useState('');
  const { status, data, error, predict, reset } = usePrediction();

  useEffect(() => {
    getModelInfo().then(setModelInfo).catch(err => console.error('Failed to fetch model info:', err));
  }, []);

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [status]);

  const handlePredict = () => {
    if (text.trim().length < 20) {
      setValidationError('Please enter at least 20 characters.');
      return;
    }
    setValidationError('');
    predict(text);
  };

  const examples = [
    { label: 'Strategic', text: 'The current market trends indicate a clear shift towards decentralized systems. We must optimize our core architecture to leverage these changes, focusing on scalability and risk mitigation. A three-year roadmap is essential to maintain our competitive advantage.' },
    { label: 'Creative', text: 'I\'ve always felt that the world is more than just the things we can see. There\'s a hidden rhythm to everything, a melody that speaks to the soul. I want to spend my life capturing those fleeting moments of beauty and sharing them with others.' },
    { label: 'Practical', text: 'The procedure is straightforward: first, gather all required documentation. Second, verify the accuracy of the entries. Third, submit the form by the 5 PM deadline. Efficiency is key to avoiding unnecessary delays.' },
    { label: 'Spontaneous', text: 'Last weekend was absolutely wild! We hit that new club downtown and the music was unbelievable. I just love the energy of a crowd and the feeling of just going with the flow. Life is too short to spend it planning everything.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
      <header className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black tracking-tight text-surface-900"
        >
          MBTI <span className="text-primary-600">Predictor</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed"
        >
          Discover your personality type from your writing using advanced linguistic analysis
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <ModelBadge info={modelInfo} />
        </motion.div>
      </header>

      <main className="flex flex-col gap-12">
        <AnimatePresence mode="wait">
          {(status === 'idle' || status === 'error') && (
            <motion.div
              key="input-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-6 bg-white p-8 rounded-3xl border border-surface-200 shadow-xl shadow-surface-200/50"
            >
              <TextInput value={text} onChange={setText} />

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">Try an example:</span>
                <div className="flex flex-wrap gap-2">
                  {examples.map((ex) => (
                    <button
                      key={ex.label}
                      onClick={() => setText(ex.text)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface-100 text-surface-600 hover:bg-primary-100 hover:text-primary-700 transition-all active:scale-95"
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              {validationError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-red-500 text-center"
                >
                  {validationError}
                </motion.p>
              )}

              <PredictButton
                onClick={handlePredict}
                disabled={text.trim().length < 20}
                loading={status === 'loading'}
              />
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState message={error} onRetry={reset} />
            </motion.div>
          )}

          {status === 'success' && data && (
            <motion.div
              key="result-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.15 }}
              className="flex flex-col gap-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ResultCard
                  type={data.type}
                  nickname={data.nickname}
                  confidence={data.confidence}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-3xl border border-surface-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-surface-900 mb-6">Dichotomy Analysis</h3>
                  <DichotomyBars dichotomies={data.dichotomies} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-8 rounded-3xl border border-surface-200 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-surface-900 mb-6">Probability Distribution</h3>
                  <ConfidenceChart topK={data.top_k} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <button
                  onClick={reset}
                  className="text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center gap-2 group px-6 py-2 rounded-full hover:bg-primary-50"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Start over
                </button>
              </motion.div>

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-8 rounded-3xl bg-surface-50 border border-surface-200 text-surface-500 text-xs leading-relaxed"
              >
                <div className="font-bold text-surface-600 mb-2 uppercase tracking-wider">Disclaimer</div>
                "Predicted from text using a model with 64.7% accuracy on an imbalanced dataset.
                This tool is for educational purposes and not a professional psychological assessment."
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
