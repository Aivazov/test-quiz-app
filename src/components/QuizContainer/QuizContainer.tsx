// src/components/Quiz/QuizContainer.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question } from '../../types';
import QuizComponent from '../QuizComponent/QuizComponent';
import { getQuizzes, editQuiz } from '../../assets/localStorageAsset';

const QuizContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizzes = getQuizzes();
  const quiz = quizzes.find((q) => q.id === id);

  const addQuestion = (question: Question) => {
    if (!quiz) return;

    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, question],
    };

    editQuiz(quiz.id, updatedQuiz.title, updatedQuiz.questions);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return <QuizComponent quiz={quiz} addQuestion={addQuestion} />;
};

export default QuizContainer;
