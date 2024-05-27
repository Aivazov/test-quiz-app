// src/components/QuizList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../types';

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  return (
    <div>
      <Link to="/add" className="bg-green-500 text-white p-2 rounded">Add Quiz</Link>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`} className="text-blue-500">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;