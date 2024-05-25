// src/utils/localStorageUtils.ts
import { Quiz } from '../types';

const QUIZZES_KEY = 'quizzes';

export const getQuizzes = (): Quiz[] => {
  const quizzes = localStorage.getItem(QUIZZES_KEY);
  return quizzes ? JSON.parse(quizzes) : [];
};

export const addQuiz = (title: string) => {
  const quizzes = getQuizzes();
  const newQuiz: Quiz = { id: Date.now().toString(), title, questions: [] };
  quizzes.push(newQuiz);
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
};

export const deleteQuiz = (id: string) => {
  const quizzes = getQuizzes().filter((quiz) => quiz.id !== id);
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
};

export const editQuiz = (id: string, newTitle: string) => {
  const quizzes = getQuizzes();
  const quiz = quizzes.find((quiz) => quiz.id === id);
  if (quiz) {
    quiz.title = newTitle;
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
  }
};
