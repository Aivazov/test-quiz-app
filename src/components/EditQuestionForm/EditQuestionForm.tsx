// src/components/EditQuestionForm/EditQuestionForm.tsx
import React from 'react';
import { Question, Answer } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizzes } from '../../assets/localStorageAsset';

interface EditQuestionFormProps {
  editQuestion: (
    quizId: string,
    questionIndex: number,
    question: Question
  ) => void;
}

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({
  editQuestion,
}) => {
  const { id, questionIndex } = useParams<{
    id: string;
    questionIndex: string;
  }>();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = React.useState('');
  const [answers, setAnswers] = React.useState<Answer[]>([
    { text: '', isCorrect: false },
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    const quizzes = getQuizzes();
    const quiz = quizzes.find((q) => q.id === id);
    if (quiz && questionIndex !== undefined) {
      const question = quiz.questions[parseInt(questionIndex)];
      setQuestionText(question.text);
      setAnswers(question.answers);
      setCorrectAnswerIndex(question.correctAnswerIndex);
    }
  }, [id, questionIndex]);

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], text };
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswerIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctAnswerIndex === null) {
      alert('Please select the correct answer');
      return;
    }
    const updatedAnswers = answers.map((answer, index) => ({
      ...answer,
      isCorrect: index === correctAnswerIndex,
    }));
    if (id && questionIndex !== undefined) {
      editQuestion(id, parseInt(questionIndex), {
        text: questionText,
        answers: updatedAnswers,
        correctAnswerIndex,
      });
      navigate(`/quiz/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question Text</label>
        <input
          type='text'
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className='border p-2 w-full'
        />
      </div>
      {answers.map((answer, index) => (
        <div key={index}>
          <label>Answer {index + 1}</label>
          <input
            type='text'
            value={answer.text}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className='border p-2 w-full'
          />
          <input
            type='radio'
            name='correctAnswer'
            checked={index === correctAnswerIndex}
            onChange={() => handleCorrectAnswerChange(index)}
          />
          Correct
        </div>
      ))}
      <div className='flex items-center gap-4'>
        <button
          type='button'
          onClick={handleAddAnswer}
          className='bg-blue-500 text-white p-2 mt-2'
        >
          Add Answer
        </button>
        <button type='submit' className='bg-green-500 text-white p-2 mt-2'>
          Apply
        </button>
      </div>
    </form>
  );
};

export default EditQuestionForm;
