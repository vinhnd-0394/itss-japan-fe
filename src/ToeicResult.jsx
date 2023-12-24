import React, { useState } from 'react';
import './ToeicResult.css'; // Nhập tệp CSS mới
import QuestionDetail from './QuestionDetail'; // Nhập component QuestionDetail

const ToeicResult = () => {
  const [selectedPartIndex, setSelectedPartIndex] = useState(null);
  const tests = Array.from({ length: 7 }, (_, i) => ({
    part: `Part ${i + 1}`,
    score: `${15 - i}/15 câu`,
    questions: [
      {
        question: 'How old are you?',
        answers: [
          { text: 'Hello', correct: false },
          { text: 'i am 20 years old', correct: true },
          { text: 'Hi, i am Vinh', correct: false },
          { text: 'i’m fine, thank you', correct: false }
        ]
      },
      {
        question: 'How old are you?',
        answers: [
          { text: 'Hello', correct: false },
          { text: 'i am 20 years old', correct: true },
          { text: 'Hi, i am Vinh', correct: false },
          { text: 'i’m fine, thank you', correct: false }
        ]
      },
      // Thêm các câu hỏi khác nếu cần
    ]
  }));

  const handleViewClick = (index) => {
    setSelectedPartIndex(selectedPartIndex === index ? null : index);
  };

  return (
    <div className="toeic-result">
      <div className="result-content">
        Ngũ Duy Vinh 20205049
        <div className="result-text">
          550/990
        </div>
      </div>
      <div className="result-list">
        {tests.map((test, index) => (
          <div key={index} className="result-item">
            <div className="result-header">
              <span>{`${test.part} : ${test.score}`}</span>
              <div className="result-buttons">
                <button className="view-button" onClick={() => handleViewClick(index)}>
                  {selectedPartIndex === index ? 'Hide' : 'View'}
                </button>
              </div>
            </div>
            {selectedPartIndex === index && (
              <QuestionDetail
                part={test.part}
                questions={test.questions}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToeicResult;
