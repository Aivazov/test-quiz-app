// src/components/AddQuestionForm.tsx
import React, { useState } from 'react';
import { Question, Answer } from '../../types';

interface AddQuestionFormProps {
  addQuestion: (question: Question) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addQuestion }) => {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [newAnswerIsCorrect, setNewAnswerIsCorrect] = useState(false);

  const handleAddAnswer = () => {
    if (newAnswerText.trim() !== '') {
      setAnswers([
        ...answers,
        { text: newAnswerText, isCorrect: newAnswerIsCorrect },
      ]);
      setNewAnswerText('');
      setNewAnswerIsCorrect(false);
    }
  };

  const handleRemoveAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.some((answer) => answer.isCorrect)) {
      alert('Please select a correct answer.');
      return;
    }
    addQuestion({ text: questionText, answers });
    setQuestionText('');
    setAnswers([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Answers</label>
        {answers.map((answer, index) => (
          <div key={index} className="flex items-center">
            <span>
              {answer.text} {answer.isCorrect && '(Correct)'}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveAnswer(index)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center">
          <input
            type="text"
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            className="border p-2 w-full"
          />
          <label className="ml-2">
            <input
              type="checkbox"
              checked={newAnswerIsCorrect}
              onChange={(e) => setNewAnswerIsCorrect(e.target.checked)}
              className="ml-2"
            />
            Correct
          </label>
          <button
            type="button"
            onClick={handleAddAnswer}
            className="ml-2 text-blue-500"
          >
            Add Answer
          </button>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Add Question
      </button>
    </form>
  );
};

export default AddQuestionForm;
