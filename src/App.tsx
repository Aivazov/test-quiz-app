// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList/QuizList';
import AddQuiz from './components/AddQuiz/AddQuiz';
import QuizContainer from './components/QuizContainer/QuizContainer';
import { Quiz } from './types';
import { getQuizzes, addQuiz } from './assets/localStorageAsset';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(getQuizzes());
  }, []);

  const handleAddQuiz = (quiz: Quiz) => {
    addQuiz(quiz);
    setQuizzes([...quizzes, quiz]);
  };

  return (
    <Router>
      <div className="container mx-auto p-4 flex flex-row w-full">
        <Header />
        <main className="py-[10px] px-[30px] w-full">
          {/* <h1 className="text-3xl mb-4">Quiz App</h1> */}
          <Routes>
            <Route path="/" element={<QuizList quizzes={quizzes} />} />
            <Route
              path="/add"
              element={<AddQuiz onAddQuiz={handleAddQuiz} />}
            />
            <Route path="/quiz/:id" element={<QuizContainer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
