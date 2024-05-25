// src/utils/localStorageUtils.ts
import { Quiz } from '../types';

export const getQuizzes = (): Quiz[] => {
  const quizzes = localStorage.getItem('quizzes');
  return quizzes ? JSON.parse(quizzes) : [];
};

export const addQuiz = (quiz: Quiz): void => {
  const quizzes = getQuizzes();
  quizzes.push(quiz);
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const editQuiz = (
  id: string,
  title: string,
  questions: Quiz['questions']
): void => {
  const quizzes = getQuizzes();
  const quizIndex = quizzes.findIndex((quiz) => quiz.id === id);
  if (quizIndex !== -1) {
    quizzes[quizIndex] = { id, title, questions };
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }
};

export const deleteQuiz = (id: string): void => {
  const quizzes = getQuizzes();
  const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
  localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
};
