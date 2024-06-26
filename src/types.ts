// src/types.ts
export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface AddQuizProps {
  onAddQuiz: (quiz: Quiz) => void;
  quizzes: Quiz[]; // Добавляем свойство quizzes
}
