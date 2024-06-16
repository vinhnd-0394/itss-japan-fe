import { useEffect, useState } from 'react';
import './ToeicPractice.css';
import { FaDownload } from 'react-icons/fa';
import { apiDownloadExamPdf, getTest } from './apis/api';

const AllToeicPractice = () => {
  const [tests, setTests] = useState([]);

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
          <h2>Danh sách các đề thi mẫu TOEIC cập nhật mới nhất</h2>
          <p>
            ★ Đề thi TOEIC được cập nhật mới nhất mang đến những kiến thức và
            trải nhiệm gần nhất với đề thi thật.
          </p>
        </div>
      </div>
      <div className="test-list">
        {tests.length > 0 &&
          tests.map((test) => (
            <div key={test._id} className="shadow-lg test-item">
              <span>{test.Name}</span>
              <div className="test-buttons">
                <button
                  className="view-button"
                  onClick={() => downloadExamPdf(test._id)}
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllToeicPractice;
