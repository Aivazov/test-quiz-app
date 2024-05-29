// src/components/AddQuiz.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../../types';
import { addQuiz } from '../../assets/localStorageAsset';

interface AddQuizProps {
  onAddQuiz: (quiz: Quiz) => void;
  quizzes: Quiz[]; // Добавлен массив викторин для проверки уникальности названия
}

const AddQuiz: React.FC<AddQuizProps> = ({ onAddQuiz, quizzes }) => {
  const [title, setTitle] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('No quiz title');
      return;
    }

    // Проверка уникальности названия викторины
    const isDuplicateTitle = quizzes.some(
      (quiz) => quiz.title.toLowerCase() === title.toLowerCase()
    );
    if (isDuplicateTitle) {
      console.log('Quiz with this title already exists');
      alert('Quiz with this title already exists');
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions: [],
    };
    addQuiz(newQuiz);
    onAddQuiz(newQuiz);
    setTitle('');
    navigate(`/quiz/${newQuiz.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='text-3xl w-[40%]'>Quiz Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border p-2 w-full'
        />
      </div>
      <button type='submit' className='bg-blue-500 text-white p-2 mt-2'>
        Add Quiz
      </button>
    </form>
  );
};

export default AddQuiz;
