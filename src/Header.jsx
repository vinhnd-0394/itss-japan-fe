import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-left">
        <Link to="/" className="toeic">
          TOIEC
        </Link>
        <div className="nav-links">
          <Link to="/toeic-practice">Thi Thử</Link>
          <Link to="/">Lộ Trình Học</Link>
          <Link to="/">Tài Liệu</Link>
          <Link to="/">Hỗ Trợ</Link>
        </div>
      </div>
      <div className="header-right">
        <p className="user">
          Xin chào, Vinh <button>Thoát</button>
        </p>
      </div>
    </header>
  );
};

export default Header;
