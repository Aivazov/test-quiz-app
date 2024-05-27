// src/components/Quiz/Quiz.tsx
import React, { useState } from 'react';
import { Quiz, Question } from '../../types';
import AddQuestionForm from '../AddQuestion/AddQuestionForm';

interface QuizProps {
  quiz: Quiz;
  addQuestion: (question: Question) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, addQuestion }) => {
  return (
    <div>
      <h2>{quiz.title}</h2>
      <AddQuestionForm addQuestion={addQuestion} />
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>{answer.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizComponent;
