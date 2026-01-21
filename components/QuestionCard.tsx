
import React, { useState } from 'react';
import { PCAQuestion } from '../types';

interface QuestionCardProps {
  question: PCAQuestion;
  onAnswer: (correct: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
    onAnswer(selectedId === question.correctOptionId);
  };

  const getOptionClasses = (optionId: string) => {
    let base = "p-4 border rounded-xl transition-all cursor-pointer ";
    if (isSubmitted) {
      if (optionId === question.correctOptionId) {
        return base + "bg-green-50 border-green-500 ring-2 ring-green-500";
      }
      if (optionId === selectedId && optionId !== question.correctOptionId) {
        return base + "bg-red-50 border-red-500 ring-2 ring-red-500";
      }
      return base + "bg-gray-100 border-gray-200 opacity-50";
    }
    if (selectedId === optionId) {
      return base + "border-blue-500 bg-blue-50 ring-2 ring-blue-500 shadow-md";
    }
    return base + "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {question.section}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
            {question.topic}
          </span>
          {question.caseStudy && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Case Study: {question.caseStudy}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
          {question.scenario}
        </h3>

        <div className="space-y-4 mb-8">
          {question.options.map((option) => (
            <div
              key={option.id}
              onClick={() => !isSubmitted && setSelectedId(option.id)}
              className={getOptionClasses(option.id)}
            >
              <div className="flex items-start">
                <span className="font-bold mr-3 mt-1 text-gray-500">
                  {option.id.toUpperCase()}.
                </span>
                <p className="text-gray-700 leading-relaxed">{option.text}</p>
              </div>
            </div>
          ))}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
              selectedId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 animate-slideUp">
            <div className="flex items-center mb-3">
              <i className={`fas ${selectedId === question.correctOptionId ? 'fa-check-circle text-green-500' : 'fa-info-circle text-blue-500'} text-xl mr-2`}></i>
              <h4 className="font-bold text-blue-900">Explanation</h4>
            </div>
            <p className="text-blue-800 leading-relaxed mb-4">
              {question.explanation}
            </p>
            <div className="flex justify-between items-center text-sm text-blue-600 font-medium italic">
              <span>Correct Answer: {question.correctOptionId.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
