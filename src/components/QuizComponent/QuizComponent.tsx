// src/components/QuizComponent/QuizComponent.tsx
import React, { useState } from 'react';
import { Quiz, Question } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

import Button, { ButtonProps } from '@mui/material/Button';
import { purple, green, blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

interface QuizProps {
  quiz: Quiz;
  addQuestion: (question: Question) => void;
  deleteQuestion: (questionIndex: number) => void;
  editQuizTitle: (newTitle: string) => void;
  buttonSize?: number; // Размер стороны квадратной кнопки в пикселях
}

const QuizComponent: React.FC<QuizProps> = ({
  quiz,
  addQuestion,
  deleteQuestion,
  editQuizTitle,
  buttonSize = 100,
}) => {
  const navigate = useNavigate();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(quiz.title);
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

  const handleConfirmDelete = async () => {
    if (questionIndexToDelete !== null) {
      deleteQuestion(questionIndexToDelete);
    }
    await setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleTitleEditClick = async () => {
    await setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSave = () => {
    // editQuizTitle(quiz.id, newTitle);
    editQuizTitle(newTitle);
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setNewTitle(quiz.title);
    setIsEditingTitle(false);
  };

  const ColorButton = styled(Button)<ButtonProps & { buttonSize: number }>(
    ({ theme, buttonSize }) => ({
      color: theme.palette.getContrastText(blue[500]),
      width: buttonSize,
      height: buttonSize,
      minWidth: buttonSize,
      backgroundColor: blue[500],
      '&:hover': {
        backgroundColor: blue[300],
      },
      '&:focus': {
        backgroundColor: blue[300],
      },
    })
  );

  return (
    <div>
      {isEditingTitle ? (
        <div className='flex items-center mb-4'>
          <input
            type='text'
            value={newTitle}
            onChange={handleTitleChange}
            className='border-2 border-none text-3xl mr-2'
          />
          <button
            onClick={handleTitleSave}
            className='bg-blue-500 text-white p-2 mr-2'
          >
            Save
          </button>
          <button
            onClick={handleTitleCancel}
            className='bg-gray-500 text-white p-2'
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className='flex items-center mb-4'>
          <h2 className='text-3xl w-[40%]'>{quiz.title}</h2>
        </div>
      )}

      <div className='flex gap-4 items-center'>
        <button
          onClick={handleAddQuestionClick}
          className='bg-blue-500 text-white p-2 rounded-[5px]'
        >
          Add Question
        </button>

        {/* <ColorButton
          onClick={handleAddQuestionClick}
          variant='contained'
          buttonSize={buttonSize}
          className='text-white'
        >
          Add Question
        </ColorButton> */}

        <button
          onClick={handleTitleEditClick}
          className='bg-yellow-500 text-black p-2 flex gap-2 items-center rounded-[5px]'
        >
          <MdOutlineModeEditOutline /> <span>Edit Title</span>
        </button>
        <button
          onClick={() => navigate(`/quiz/${quiz.id}/play`)}
          className='bg-green-500 text-white p-2 ml-2 rounded-[5px]'
        >
          Play Quiz
        </button>
      </div>
      <ul className='flex flex-col justify-center gap-4 mt-6'>
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
