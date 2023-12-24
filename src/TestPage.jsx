import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestPage.css';

const TestPage = () => {
  const [step, setStep] = useState(1);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      // Giảm thời gian đi mỗi giây
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer);
        // Xử lý khi hết thời gian
        console.log('Hết thời gian!');
      } else if (minutes === 0 && seconds === 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000); // 1000ms = 1 giây

    // Clear interval khi component unmount
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  const handleNextClick = () => {
    setStep(step + 1);
  };

  const handlePrevClick = () => {
    setStep(step - 1);
  };
  const handleSubmitAnswer = () => {
    setSubmitted(true);
    navigate('/result');
  };

  return (
    <div className="test-page">
      <div className="timer-container">
        <div className="timer">
          Thời gian: {hours} giờ {minutes} phút {seconds} giây
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="exam-title">Môn thi : Toeic IIG</div>
          <h3>Ngũ Duy Vinh 20205049</h3>
          <div className="test-grid">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`test-square ${i < 4 ? 'green-square' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button className="submit-button" onClick={handleSubmitAnswer}>
              Submit Your Answer
            </button>
          </div>
        </div>
        <div className="test-area">
          {step === 1 ? (
            <>
              <h2>Part 1: Listening</h2>
              <div className="resizable-container">
                <p className="paragraph">
                  In each question, you will look at a photograph and then
                  listen to 4 sentences. Choose the sentence that best describes
                  the photograph.
                </p>
              </div>
              {/* Question 1 */}
              <div className="question">
                <div className="options">
                  <span className="question-number">1.</span>
                  <label>
                    <input type="radio" name="question1" value="A" />A
                  </label>
                  <label>
                    <input type="radio" name="question1" value="B" />B
                  </label>
                  <label>
                    <input type="radio" name="question1" value="C" />C
                  </label>
                  <label>
                    <input type="radio" name="question1" value="D" />D
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="question">
                <div className="options">
                  <span className="question-number">2.</span>
                  <label>
                    <input type="radio" name="question2" value="A" />A
                  </label>
                  <label>
                    <input type="radio" name="question2" value="B" />B
                  </label>
                  <label>
                    <input type="radio" name="question2" value="C" />C
                  </label>
                  <label>
                    <input type="radio" name="question2" value="D" />D
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="question">
                <div className="options">
                  <span className="question-number">3.</span>
                  <label>
                    <input type="radio" name="question3" value="A" />A
                  </label>
                  <label>
                    <input type="radio" name="question3" value="B" />B
                  </label>
                  <label>
                    <input type="radio" name="question3" value="C" />C
                  </label>
                  <label>
                    <input type="radio" name="question3" value="D" />D
                  </label>
                </div>
              </div>
              <div className="button-container">
                <button className="prev-button" onClick={handlePrevClick}>
                  Prev
                </button>
                <button className="next-button" onClick={handleNextClick}>
                  Next
                </button>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <h2>Part 2: Reading</h2>
              <div className="resizable-container">
                <p className="paragraph">
                  Los Angeles: The O’Henry Gallery of art (4) ... oil paintings
                  by Lasandra Page until the end of October.
                  <br />
                  <br />
                  Page is well known for her portrayals of Italian coastal
                  scenes. Her work has been displayed in the Metropolitan Museum
                  of Art, the Musee D’Orsay, and the Uffizi. Ticket prices for
                  this traveling exhibit are $22 for adults and $12 for children
                  including regular admission. Another (5) ... displaying
                  Oaxacan pottery is at the museum until Nov.1. Museum hours are
                  10 a.m - 6 p.m daily.
                  <br />
                  <br />
                  The Silver Star Screen shows classic films of the 50s and 60s
                  every weekend. Bring a friend and reminisce about the “good
                  old days”! Enjoy favorites such as Casa Amarilla and Cold
                  Snow. Admission is $8 for adults, and (6) ... rates are
                  offered for children 12 and under.
                </p>
              </div>
              {/* Question 4 */}
              <div className="question">
                <div className="options">
                  <span className="question-number">4.</span>
                  <label>
                    <input type="radio" name="question4" value="A" />
                    A. discounted
                  </label>
                  <label>
                    <input type="radio" name="question4" value="B" />
                    B. included
                  </label>
                  <label>
                    <input type="radio" name="question4" value="C" />
                    C. abbreviated
                  </label>
                  <label>
                    <input type="radio" name="question4" value="D" />
                    D. targeted
                  </label>
                </div>
              </div>

              {/* Question 5*/}
              <div className="question">
                <div className="options">
                  <span className="question-number">5.</span>
                  <label>
                    <input type="radio" name="question5" value="A" />
                    A. coupon
                  </label>
                  <label>
                    <input type="radio" name="question5" value="B" />
                    B. market
                  </label>
                  <label>
                    <input type="radio" name="question5" value="C" />
                    C. show
                  </label>
                  <label>
                    <input type="radio" name="question5" value="D" />
                    D. decoration
                  </label>
                </div>
              </div>

              {/* Question 6 */}
              <div className="question">
                <div className="options">
                  <span className="question-number">6.</span>
                  <label>
                    <input type="radio" name="question6" value="A" />
                    A. exhibit
                  </label>
                  <label>
                    <input type="radio" name="question6" value="B" />
                    B. exhibited
                  </label>
                  <label>
                    <input type="radio" name="question6" value="C" />
                    C. was exhibiting
                  </label>
                  <label>
                    <input type="radio" name="question6" value="D" />
                    D. will be exhibiting
                  </label>
                </div>
              </div>
              <div className="button-container">
                <button className="prev-button" onClick={handlePrevClick}>
                  Prev
                </button>
                <button className="next-button" onClick={handleNextClick}>
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Part 3: Writing</h2>
              <div className="resizable-container">
                <p className="paragraph">
                  7. Do you agree and disagree with the following statement?
                  “Companies should give each employee the same benefits
                  package. Use specific reasons and examples to support your
                  opinion.
                </p>
                <div className="write-area">
                  <textarea
                    className="textarea"
                    placeholder="Write your answer here..."
                  ></textarea>
                </div>
              </div>
              <div className="button-container">
                <button className="prev-button" onClick={handlePrevClick}>
                  Prev
                </button>
                <button className="next-button" onClick={handleNextClick}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
