import React, { useEffect, useState } from 'react';
import {
  getQuizzes,
  deleteQuiz,
  editQuiz,
} from '../../assets/localStorageAsset';
import { Quiz } from '../../types';
import AddQuizForm from '../AddQuiz/AddQuizForm';

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const quizzesFromStorage = getQuizzes();
    setQuizzes(quizzesFromStorage);
  }, []);

  const handleDelete = (id: string) => {
    deleteQuiz(id);
    setQuizzes(getQuizzes());
  };

  const handleEdit = (id: string) => {
    const newTitle = prompt('New quiz title');
    if (newTitle) {
      editQuiz(id, newTitle);
      setQuizzes(getQuizzes());
    }
  };

  const handleAddQuiz = () => {
    setQuizzes(getQuizzes());
  };

  return (
    <div>
      <h1 className="text-2xl">Available Quizzes</h1>
      <AddQuizForm onAddQuiz={handleAddQuiz} />
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            {quiz.title}
            <button
              onClick={() => handleEdit(quiz.id)}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(quiz.id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
