import React from 'react';

export const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-black text-surface-900">About the Model</h1>
        <p className="text-surface-500">How the MBTI personality prediction works</p>
      </header>

      <main className="flex flex-col gap-8 text-surface-700 leading-relaxed">
        <section className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <h2 className="text-xl font-bold text-surface-900 mb-3">The Pipeline</h2>
          <p>
            This application uses a Machine Learning pipeline consisting of <strong>TF-IDF</strong> (Term Frequency-Inverse Document Frequency)
            vectorization followed by a <strong>Logistic Regression</strong> classifier.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5 text-sm">
            <li><strong>Preprocessing:</strong> Tokenization, stopword removal, and URL stripping.</li>
            <li><strong>Vectorization:</strong> Converts free-form text into numerical features based on word importance.</li>
            <li><strong>Classification:</strong> Predicts one of the 16 MBTI types based on learned patterns.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <h2 className="text-xl font-bold text-surface-900 mb-3">Dataset & Limitations</h2>
          <p>
            The model was trained on the <code>mbti_1.csv</code> dataset from Kaggle, containing 8,675 records.
          </p>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
            <strong>Important:</strong> The dataset is heavily imbalanced, meaning some types (like INFP, INFJ, INTP)
            are over-represented. This can bias the model towards those types.
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
          <h2 className="text-xl font-bold text-surface-900 mb-3">Disclaimer</h2>
          <p className="text-sm italic">
            This tool is for educational and entertainment purposes only. It is not a clinical psychological
            assessment and should not be used for professional personality profiling.
          </p>
        </section>
      </main>
    </div>
  );
};
