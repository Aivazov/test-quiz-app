// src/components/QuizList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../types';

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList: React.FC<QuizListProps> = ({ quizzes }) => {
  const [searchRequest, setSearchRequest] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(e.target.value);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchRequest.toLowerCase())
  );

  return (
    <div>
      <div className=" mb-7 flex items-center w-full">
        <h1 className="text-3xl w-[37%]">Quiz List</h1>
        <input
          className="border-black border-2 rounded-[4px] text-xl py-1 px-3"
          type="text"
          placeholder="Search Quiz..."
          onChange={handleSearchChange}
          value={searchRequest}
        />
        {/* <Link to="/add" className="bg-green-500 text-white p-2 rounded">Add Quiz</Link> */}
      </div>
      <ul className="w-full flex flex-col justify-center gap-4">
        {filteredQuizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="border-black border-2 rounded-md text-xl py-2 px-3"
          >
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
