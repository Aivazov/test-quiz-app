// src/components/QuizComponent/QuizComponent.tsx
import React from 'react';
import { Quiz, Question } from '../../types';
// import AddQuestionForm from '../AddQuestion/AddQuestionForm';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';

interface QuizProps {
  quiz: Quiz;
  addQuestion: (question: Question) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, addQuestion }) => {
  const navigate = useNavigate();
  console.log(quiz);

  const handleAddQuestionClick = () => {
    navigate(`/quiz/${quiz.id}/add-question`);
  };

  return (
    <div>
      <h2 className="text-3xl w-[40%]">{quiz.title}</h2>
      <button
        onClick={handleAddQuestionClick}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Add Question
      </button>
      {/* <AddQuestionForm addQuestion={addQuestion} /> */}
      <ul className="flex flex-col justify-center gap-4 mt-4">
        {quiz.questions.map((question, index) => (
          <li
            key={index}
            className="border-black border-2 rounded-md text-xl py-2 px-3 flex justify-between items-center"
          >
            <p>{question.text}</p>
            <div className="flex flex-col justify-center items-center">
              <Link to={`/`}>
                <button>
                  <MdOutlineModeEditOutline />
                </button>
              </Link>
              <button>
                <RiDeleteBin6Line />
              </button>
            </div>
            {/* <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>{answer.text}</li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizComponent;
