// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList/QuizList';
import AddQuiz from './components/AddQuiz/AddQuiz';
import QuizContainer from './components/QuizContainer/QuizContainer';
import { Quiz } from './types';
import { getQuizzes, addQuiz, deleteQuiz } from './assets/localStorageAsset';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  const handleAddQuiz = (quiz: Quiz) => {
    const existingQuiz = quizzes.find((q) => q.id === quiz.id);

    if (!existingQuiz) {
      //checking for avoid double rendering of the quizzes
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

  return (
    <Router>
      <div className='container mx-auto p-4 flex flex-row w-full'>
        <Header />
        <main className='py-[10px] px-[30px] w-full'>
          {/* <h1 className="text-3xl mb-4">Quiz App</h1> */}
          <Routes>
            <Route
              path='/'
              element={
                <QuizList quizzes={quizzes} onDeleteQuiz={handleDeleteQuiz} />
              }
            />
            <Route
              path='/add'
              element={<AddQuiz onAddQuiz={handleAddQuiz} quizzes={quizzes} />}
            />
            <Route path='/quiz/:id' element={<QuizContainer />} />
            <Route
              path='/quiz/:id/add-question'
              element={<AddQuestionForm addQuestion={addQuestion} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
