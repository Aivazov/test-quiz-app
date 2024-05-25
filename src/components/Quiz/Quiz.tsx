import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizzes, editQuiz } from '../../assets/localStorageAsset';
import { Quiz, Question } from '../../types';
import AddQuestionForm from '../AddQuestion/AddQuestionForm';

const QuizComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const quizzes = getQuizzes();
    const quiz = quizzes.find((quiz) => quiz.id === id);
    if (quiz) {
      setQuiz(quiz);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddQuestion = (question: Question) => {
    if (quiz) {
      const updatedQuiz = { ...quiz, questions: [...quiz.questions, question] };
      editQuiz(quiz.id, updatedQuiz.title, updatedQuiz.questions);
      setQuiz(updatedQuiz);
    }
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.filter(
        (_, index) => index !== questionIndex
      );
      const updatedQuiz = { ...quiz, questions: updatedQuestions };
      editQuiz(quiz.id, updatedQuiz.title, updatedQuiz.questions);
      setQuiz(updatedQuiz);
    }
  };

  const handleEditQuestion = (
    questionIndex: number,
    updatedQuestion: Question
  ) => {
    if (quiz) {
      const updatedQuestions = quiz.questions.map((q, index) =>
        index === questionIndex ? updatedQuestion : q
      );
      const updatedQuiz = { ...quiz, questions: updatedQuestions };
      editQuiz(quiz.id, updatedQuiz.title, updatedQuiz.questions);
      setQuiz(updatedQuiz);
    }
  };

  if (!quiz) return null;

  return (
    <div>
      <h1 className="text-2xl">{quiz.title}</h1>
      <AddQuestionForm addQuestion={handleAddQuestion} />
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index}>
            {question.text}
            <button
              onClick={() => handleDeleteQuestion(index)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => {
                const newQuestionText = prompt(
                  'Edit question text',
                  question.text
                );
                if (newQuestionText) {
                  handleEditQuestion(index, {
                    ...question,
                    text: newQuestionText,
                  });
                }
              }}
              className="ml-2 text-blue-500"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizComponent;
