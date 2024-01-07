// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { Signup } from './login/signup';
import { Login } from './login/login';
import { CreateBook } from './books/create-book';
import { MyBooks } from './books/my-books';
import { AllBooks } from './books/all-books';

export function App() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token && (
            <>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to="/my-books">My Books</Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.replace('/');
                  }}
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<CreateBook />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/books" element={<AllBooks />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
