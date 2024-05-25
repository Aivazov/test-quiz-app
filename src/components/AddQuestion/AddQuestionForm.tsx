// src/components/AddQuestionForm.tsx
import React, { useState } from 'react';
import { Question, Answer } from '../../types';

// interface Answer {
//   text: string;
//   isCorrect: boolean;
// }

interface AddQuestionFormProps {
  addQuestion: (question: Question) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addQuestion }) => {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerText, setAnswerText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: answerText, isCorrect }]);
    setAnswerText('');
    setIsCorrect(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuestion({ text: questionText, answers });
    setQuestionText('');
    setAnswers([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Answer:</label>
        <input
          type="text"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          className="border p-2"
        />
        <label>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
          Correct
        </label>
        <button
          type="button"
          onClick={handleAddAnswer}
          className="ml-2 bg-green-500 text-white p-2"
        >
          Add Answer
        </button>
      </div>
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2">
        Add Question
      </button>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            {answer.text} {answer.isCorrect ? '(Correct)' : ''}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default AddQuestionForm;
