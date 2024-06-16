import { useEffect, useState } from 'react';
import './ToeicPractice.css';
import { FaDownload } from 'react-icons/fa';
import { apiDownloadExamPdf, getTestByRoadmap } from './apis/api';

const ToeicPractice = () => {
  const hash = window.location.hash.substring(1);

  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function fetchTest() {
      const response = await getTestByRoadmap(hash);
      setTests(response || []);
      console.log(response);
    }
    fetchTest();
  }, [hash]);

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
    // <div className="toeic-practice">
    //   <div className="practice-content">
    //     <img
    //       src="/images/english-course.jpg"
    //       alt="English Course"
    //       className="practice-image"
    //     />
    //     <div className="practice-text">
    //       <h2>Các bài thi trong lộ trình</h2>
    //       <p>
    //         ★ Cách tốt nhất giúp cải thiện điểm số là thi thử thật nhiều, làm nhiều đề thi sẽ giúp bạn có sự tự tin khi làm bài thi thật.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="test-list">
    //     {tests.length > 0 &&
    //       tests.map((test) => (
    //         <div key={test._id} className="shadow-lg test-item">
    //           <span>{test.Name}</span>
    //           <div className="test-buttons">
    //             <button
    //               className="view-button"
    //               onClick={() => downloadExamPdf(test._id)}
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth={1.5}
    //                 stroke="currentColor"
    //                 className="size-6"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
    //                 />
    //               </svg>
    //             </button>
    //             {/* <button className="edit-button" onClick={handleDoClick}>
    //               Do
    //             </button> */}
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
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

export default ToeicPractice;
