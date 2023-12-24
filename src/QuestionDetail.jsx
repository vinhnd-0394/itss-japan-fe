import React from 'react';
import './QuestionDetail.css'; // Nhập tệp CSS mới

const QuestionDetail = ({ part, questions }) => {
  return (
    <div className="question-detail">
      <h2>{part}</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-item">
          <p><strong>{`Câu ${index + 1}. ${question.question}`}</strong></p>
          <div className="answers">
            {question.answers.map((answer, i) => (
              <div key={i} className={`answer ${answer.correct ? 'correct' : ''}`}>
                {String.fromCharCode(65 + i)}. {answer.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionDetail;
