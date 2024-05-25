// src/App.tsx
import React from 'react';
import QuizList from './components/QuizList/QuizList';
import AddQuizForm from './components/AddQuiz/AddQuizForm';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Test Quiz App</h1>
      {/* <AddQuizForm /> */}
      <QuizList />
    </div>
  );
};

export default App;
