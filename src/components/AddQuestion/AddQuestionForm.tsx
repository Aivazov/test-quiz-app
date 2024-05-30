// src/components/AddQuestion/AddQuestionForm.tsx
import React, { useState } from 'react';
import { Question, Answer } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';

interface AddQuestionFormProps {
  addQuestion: (quizId: string, question: Question) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addQuestion }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: '', isCorrect: false },
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], text };
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswerIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctAnswerIndex === null) {
      alert('Please select the correct answer');
      return;
    }
    const updatedAnswers = answers.map((answer, index) => ({
      ...answer,
      isCorrect: index === correctAnswerIndex,
    }));
    if (id) {
      addQuestion(id, {
        text: questionText,
        answers: updatedAnswers,
        correctAnswerIndex,
      });
      navigate(`/quiz/${id}`);
    }
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
      {answers.map((answer, index) => (
        <div key={index}>
          <label>Answer {index + 1}</label>
          <input
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={index === correctAnswerIndex}
            onChange={() => handleCorrectAnswerChange(index)}
          />
          Correct
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAnswer}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Add Answer
      </button>
      <button type="submit" className="bg-green-500 text-white p-2 mt-2">
        Apply
      </button>
    </form>
  );
};

export default AddQuestionForm;
