// src/components/AddQuiz/AddQuizForm.tsx
import React, { useState } from 'react';
import { Quiz } from '../../types';
import { addQuiz } from '../../assets/localStorageAsset';

const AddQuizForm: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title,
      questions: [],
    };
    addQuiz(newQuiz);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Quiz Title</label>
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

export default AddQuizForm;
