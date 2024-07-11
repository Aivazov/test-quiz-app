// src/components/QuizPlay/QuizPlay.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Quiz, Question } from '../../types';
import { getQuizzes } from "../../assets/localStorageAsset";
import AddBtn from "../Buttons/AddBtn/AddBtn";

const QuizPlay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quizzes = getQuizzes();
  const quiz = quizzes.find((q) => q.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswerIndex === selectedAnswers[index]) {
        score += 1;
      }
    });
    setScore(score);
  };

  if (score !== null) {
    return (
      <div>
        <h2 className='text-3xl'>Quiz Completed</h2>
        <p className='text-xl'>
          Your score: {score} / {quiz.questions.length}
        </p>
        <AddBtn btnName='Back to Quiz List' handleFunc={() => navigate("/")} />

        {/* <button
          onClick={() => navigate("/")}
          className='bg-blue-500 text-white p-2 mt-2'
        >
          Back to Quiz List
        </button> */}
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h2 className='text-3xl'>{quiz.title}</h2>
      <div className='mt-4'>
        <p className='text-xl'>{currentQuestion.text}</p>
        <ul>
          {currentQuestion.answers.map((answer, index) => (
            <li key={index} className='mt-2'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name={`question-${currentQuestionIndex}`}
                  checked={selectedAnswers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className='mr-2'
                />
                {answer.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4 flex justify-between'>
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className='bg-gray-500 text-white p-2'
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <AddBtn btnName='Next' handleFunc={handleNextQuestion} />
        ) : (
          // <button
          //   onClick={handleNextQuestion}
          //   className='bg-blue-500 text-white p-2'
          // >
          //   Next
          // </button>
          <AddBtn btnName='Finish' handleFunc={handleFinishQuiz} />
          // <button
          //   onClick={handleFinishQuiz}
          //   className='bg-green-500 text-white p-2'
          // >
          //   Finish
          // </button>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;
