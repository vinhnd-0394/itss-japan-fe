import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoadmap } from './apis/api';
import { useEffect, useState } from 'react';

import './Courses.css';

// const courses = [
//   {
//     id: 1,
//     level: 'Mới bắt đầu',
//     score: '0->300 Điểm',
//     description:
//       'Luyện tập cơ bản cho người mới bắt đầu, tập trung vào các kỹ năng cơ bản để đạt điểm từ 0-300 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 2,
//     level: 'Mới bắt đầu',
//     score: '0->300 Điểm',
//     description:
//       'Luyện tập cơ bản cho người mới bắt đầu, tập trung vào các kỹ năng cơ bản để đạt điểm từ 0-300 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 3,
//     level: 'Mới bắt đầu',
//     score: '0->300 Điểm',
//     description:
//       'Luyện tập cơ bản cho người mới bắt đầu, tập trung vào các kỹ năng cơ bản để đạt điểm từ 0-300 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 4,
//     level: 'Trung bình',
//     score: '300->500 Điểm',
//     description:
//       'Luyện tập trung cấp, nâng cao kỹ năng nghe và đọc hiểu để đạt điểm từ 300-500 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 5,
//     level: 'Trung bình',
//     score: '300->500 Điểm',
//     description:
//       'Luyện tập trung cấp, nâng cao kỹ năng nghe và đọc hiểu để đạt điểm từ 300-500 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 6,
//     level: 'Trung bình',
//     score: '300->500 Điểm',
//     description:
//       'Luyện tập trung cấp, nâng cao kỹ năng nghe và đọc hiểu để đạt điểm từ 300-500 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 7,
//     level: 'Khá',
//     score: '500->700 Điểm',
//     description:
//       'Luyện tập nâng cao, tập trung vào các kỹ năng phức tạp để đạt điểm từ 500-700 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 8,
//     level: 'Khá',
//     score: '500->700 Điểm',
//     description:
//       'Luyện tập nâng cao, tập trung vào các kỹ năng phức tạp để đạt điểm từ 500-700 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 9,
//     level: 'Khá',
//     score: '500->700 Điểm',
//     description:
//       'Luyện tập nâng cao, tập trung vào các kỹ năng phức tạp để đạt điểm từ 500-700 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 10,
//     level: 'Giỏi',
//     score: '700->850 Điểm',
//     description:
//       'Luyện tập chuyên sâu, tập trung vào các kỹ năng nghe và đọc hiểu nâng cao để đạt điểm từ 700-850 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 11,
//     level: 'Giỏi',
//     score: '700->850 Điểm',
//     description:
//       'Luyện tập chuyên sâu, tập trung vào các kỹ năng nghe và đọc hiểu nâng cao để đạt điểm từ 700-850 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 12,
//     level: 'Giỏi',
//     score: '700->850 Điểm',
//     description:
//       'Luyện tập chuyên sâu, tập trung vào các kỹ năng nghe và đọc hiểu nâng cao để đạt điểm từ 700-850 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 13,
//     level: 'Xuất sắc',
//     score: '850->990 Điểm',
//     description:
//       'Luyện tập ở mức độ xuất sắc, tập trung vào các kỹ năng tổng hợp để đạt điểm từ 850-990 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 14,
//     level: 'Xuất sắc',
//     score: '850->990 Điểm',
//     description:
//       'Luyện tập ở mức độ xuất sắc, tập trung vào các kỹ năng tổng hợp để đạt điểm từ 850-990 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
//   {
//     id: 15,
//     level: 'Xuất sắc',
//     score: '850->990 Điểm',
//     description:
//       'Luyện tập ở mức độ xuất sắc, tập trung vào các kỹ năng tổng hợp để đạt điểm từ 850-990 trong kỳ thi TOEIC',
//     progress: '12/30',
//   },
// ];

const Courses = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);
  useEffect(() => {
    async function fetchTest() {
      const response = await getRoadmap();
      setRoadmap(response);
      console.log(response);
    }
    fetchTest();
  }, []);
  const handleCourseClick = (roadmapId) => {
    navigate('/roadmap/toeic-practice#'+roadmapId);
  };

  const renderCourses = (level) => {
    return roadmap
      .filter((course) => course.level === level)
      .map((course) => (
        <div
          key={course.id}
          className="course-card cursor-pointer"
          onClick={()=>{handleCourseClick(course._id);}}
        >
          <img src="/images/english-course.jpg" alt="English Course" />
          <div className="course-info">
            <div className="info-part1">
              <h3>{course.name}</h3>
              <div className="divider"></div>
              <p className="text-sm">
                {course.description.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="progress-container">
              <span className="progress">{course.progress}</span>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="courses-container">
      <section>
        <h2>Mới bắt đầu</h2>
        <div className="courses">{renderCourses('start')}</div>
      </section>
      <section>
        <h2>Trung bình</h2>
        <div className="courses">{renderCourses('medium')}</div>
      </section>
      <section>
        <h2>Khá</h2>
        <div className="courses">{renderCourses('rather')}</div>
      </section>
      <section>
        <h2>Giỏi</h2>
        <div className="courses">{renderCourses('good')}</div>
      </section>
    </div>
  );
};

export default Courses;
