import { useState } from "react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking and Typing Mark Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["let", "int", "define", "make"],
    answer: "let",
  },
  {
    question: "Which one is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: "React",
  },
  {
    question: "What is used to style a website?",
    options: ["HTML", "Python", "CSS", "Node.js"],
    answer: "CSS",
  },
];

export default function SkillTestPage() {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionIndex, option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = option;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const passed = score >= 3; // minimum 3 out of 5 to pass

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Skill Test</h1>
      <p className="text-gray-600 text-center mb-6">Answer all questions below to test your skills.</p>

      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <h2 className="font-semibold mb-2">
            {i + 1}. {q.question}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((option, j) => (
              <button
                key={j}
                onClick={() => handleOptionSelect(i, option)}
                className={`border p-2 rounded-lg text-left ${
                  userAnswers[i] === option
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow font-semibold"
        >
          Submit Test
        </button>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-xl font-bold mb-2">
            Your Score: {score} / {questions.length}
          </p>
          <p
            className={`text-lg font-medium ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed ? "Congratulations! You are qualified. 🎉" : "You did not qualify. Try again!"}
          </p>
        </div>
      )}
    </div>
  );
}
