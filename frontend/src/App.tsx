import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import DetailPage from './pages/Detail';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import MyInfo from './pages/MyInfo';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/detail" element={<StudentDetail />} />
              <Route path="/myinfo" element={<MyInfo />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
