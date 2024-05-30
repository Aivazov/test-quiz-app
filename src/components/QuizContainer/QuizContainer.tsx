// src/components/QuizContainer/QuizContainer.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question } from '../../types';
import QuizComponent from '../QuizComponent/QuizComponent';
import { getQuizzes } from '../../assets/localStorageAsset';

interface QuizContainerProps {
  addQuestion: (quizId: string, question: Question) => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ addQuestion }) => {
  const { id } = useParams<{ id: string }>();
  const quizzes = getQuizzes();
  const quiz = quizzes.find((q) => q.id === id);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <QuizComponent
      quiz={quiz}
      addQuestion={(question) => addQuestion(quiz.id, question)}
    />
  );
};

export default QuizContainer;
