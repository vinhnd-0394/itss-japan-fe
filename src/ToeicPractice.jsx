import { useEffect, useState } from 'react';
import './ToeicPractice.css';
import { FaDownload } from 'react-icons/fa';
import { apiDownloadExamPdf, getTest } from './apis/api';

const ToeicPractice = () => {
  // const [questions, setQuestions] = useState({});
  const [tests, setTests] = useState([]);

  // useEffect(() => {
  //   async function fetchQuestion() {
  //     const response = await getQuestions();
  //     setQuestions(response);
  //   }
  //   fetchQuestion();
  // }, []);

  useEffect(() => {
    async function fetchTest() {
      const response = await getTest();
      setTests(response);
    }
    fetchTest();
  }, []);

  const downloadExamPdf = async (testId) => {
    try {
      const pdfBlob = await apiDownloadExamPdf(testId);
      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'toeic-exam.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  return (
    <div className="toeic-practice">
      <div className="practice-content">
        <img
          src="/images/english-course.jpg"
          alt="English Course"
          className="practice-image"
        />
        <div className="practice-text">
          <h2>Lộ trình từ 0 đến 100 điểm TOEIC</h2>
          <p>
            ★ Lộ trình này giúp bạn lấy lại gốc tiếng anh một cách nhanh chóng
            thông qua các bài test
          </p>
        </div>
      </div>
      <div className="test-list">
        {tests.length > 0 &&
          tests.map((test) => (
            <div key={test._id} className="shadow-lg test-item">
              <span>{test.Name}</span>
              <div className="test-buttons">
                <button onClick={() => downloadExamPdf(test._id)}>
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
        {tests.length > 0 &&
          tests.map((test) => (
            <div key={test._id} className="shadow-lg test-item">
              <span>{test.Name}</span>
              <div className="test-buttons">
                <button onClick={() => downloadExamPdf(test._id)}>
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
        {tests.length > 0 &&
          tests.map((test) => (
            <div key={test._id} className="shadow-lg test-item">
              <span>{test.Name}</span>
              <div className="test-buttons">
                <button onClick={() => downloadExamPdf(test._id)}>
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToeicPractice;
