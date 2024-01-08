// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { Signup } from './login/signup';
import { Login } from './login/login';
import { CreateBook } from './books/create-book';
import { MyBooks } from './books/my-books';
import { AllBooks } from './books/all-books';
import { Flex } from 'antd';

export function App() {
  const token = localStorage.getItem('token');

  return (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Flex role="navigation" style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      </Flex>
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
    </Flex>
  );
}

export default App;
