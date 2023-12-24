import { Route, Routes } from 'react-router-dom';
import './App.css';
import Courses from './Courses';
import ToeicPractice from './ToeicPractice';
import TestPage from './TestPage';
import Header from './Header';
import ToeicResult from './ToeicResult';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/toeic-practice" element={<ToeicPractice />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ToeicResult />} />
      </Routes>
    </div>
  );
}

export default App;
