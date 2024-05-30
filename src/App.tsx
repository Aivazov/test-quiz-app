// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList/QuizList';
import AddQuiz from './components/AddQuiz/AddQuiz';
import QuizContainer from './components/QuizContainer/QuizContainer';
import AddQuestionForm from './components/AddQuestion/AddQuestionForm';
import { Quiz, Question } from './types';
import {
  getQuizzes,
  addQuiz,
  deleteQuiz,
  editQuiz,
} from './assets/localStorageAsset';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  const handleAddQuiz = (quiz: Quiz) => {
    const existingQuiz = quizzes.find((q) => q.id === quiz.id);
    if (!existingQuiz) {
      addQuiz(quiz);
      setQuizzes([...quizzes, quiz]);
    }
  };

  const handleDeleteQuiz = (id: string) => {
    const isDeleting = window.confirm(
      'Are you sure you want to delete this Quiz?'
    );
    if (isDeleting) {
      deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    }
  };

  const handleAddQuestion = (quizId: string, question: Question) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === quizId) {
        const updatedQuiz = {
          ...quiz,
          questions: [...quiz.questions, question],
        };
        editQuiz(quizId, updatedQuiz.title, updatedQuiz.questions);
        return updatedQuiz;
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
  };

  const handleDeleteQuestion = (quizId: string, questionIndex: number) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === quizId) {
        const updatedQuestions = quiz.questions.filter(
          (_, index) => index !== questionIndex
        );
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        editQuiz(quizId, updatedQuiz.title, updatedQuestions);
        return updatedQuiz;
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
  };

  return (
    <Router>
      <div className="container mx-auto p-4 flex flex-row w-full">
        <Header />
        <main className="py-[10px] px-[30px] w-full">
          <Routes>
            <Route
              path="/"
              element={
                <QuizList quizzes={quizzes} onDeleteQuiz={handleDeleteQuiz} />
              }
            />
            <Route
              path="/add"
              element={<AddQuiz onAddQuiz={handleAddQuiz} quizzes={quizzes} />}
            />
            <Route
              path="/quiz/:id"
              element={
                <QuizContainer
                  addQuestion={handleAddQuestion}
                  deleteQuestion={handleDeleteQuestion}
                />
              }
            />
            <Route
              path="/quiz/:id/add-question"
              element={<AddQuestionForm addQuestion={handleAddQuestion} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
