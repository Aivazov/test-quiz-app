// src/components/QuizComponent/QuizComponent.tsx
import React, { useState } from 'react';
import { Quiz, Question } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

interface QuizProps {
  quiz: Quiz;
  addQuestion: (question: Question) => void;
  deleteQuestion: (questionIndex: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({
  quiz,
  addQuestion,
  deleteQuestion,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionIndexToDelete, setQuestionIndexToDelete] = useState<
    number | null
  >(null);

  const handleAddQuestionClick = () => {
    navigate(`/quiz/${quiz.id}/add-question`);
  };

  const handleDeleteButtonClick = (index: number) => {
    setQuestionIndexToDelete(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (questionIndexToDelete !== null) {
      deleteQuestion(questionIndexToDelete);
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className='text-3xl w-[40%]'>{quiz.title}</h2>
      <button
        onClick={handleAddQuestionClick}
        className='bg-blue-500 text-white p-2 mt-2'
      >
        Add Question
      </button>
      <button
        onClick={() => navigate(`/quiz/${quiz.id}/play`)}
        className='bg-green-500 text-white p-2 mt-2 ml-2'
      >
        Play Quiz
      </button>
      <ul className='flex flex-col justify-center gap-4 mt-4'>
        {quiz.questions.map((question, index) => (
          <li
            key={index}
            className='border-black border-2 rounded-md text-xl py-2 px-3 flex justify-between items-center'
          >
            <p>{question.text}</p>
            <div className='flex flex-col justify-center items-center'>
              <Link to={`/quiz/${quiz.id}/edit-question/${index}`}>
                <button>
                  <MdOutlineModeEditOutline />
                </button>
              </Link>
              <button onClick={() => handleDeleteButtonClick(index)}>
                <RiDeleteBin6Line />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <ConfirmModal
          message='Are you sure you want to delete the question?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default QuizComponent;
