import './style.css';
import { QuizApp } from './quiz';

declare global {
  interface Window {
    quizApp?: QuizApp;
  }
}

const appRoot = document.getElementById('app');
if (!appRoot) {
  throw new Error('App root element not found');
}

const quiz = new QuizApp(appRoot);
quiz.init();

window.quizApp = quiz;
