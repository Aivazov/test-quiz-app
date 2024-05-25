import React, { useState } from 'react';
import { addQuiz } from '../../assets/localStorageAsset';

const AddQuizForm: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuiz(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz title"
        className="border p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white p-2">
        Add Quiz
      </button>
    </form>
  );
};

export default AddQuizForm;
