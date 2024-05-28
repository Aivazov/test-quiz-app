// src/components/AddQuiz.tsx
import React from 'react';
import { Quiz } from '../../types';
import { addQuiz } from '../../assets/localStorageAsset';
// import BackToMainBtn from '../BackToMainBtn/BackToMainBtn';

interface AddQuizProps {
  onAddQuiz: (quiz: Quiz) => void;
}

const AddQuiz: React.FC<AddQuizProps> = ({ onAddQuiz }) => {
  const [title, setTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      console.log('No quiz title');
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
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <BackToMainBtn /> */}
      <div>
        <label className="text-3xl w-[40%]">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Add Quiz
      </button>
    </form>
  );
};

export default AddQuiz;
