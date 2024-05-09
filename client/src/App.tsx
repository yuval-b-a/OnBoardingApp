import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/layout/HomePage';
import { AboutPage } from './components/layout/AboutPage';
import { ProductsPage } from './components/layout/ProductsPage';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from './components/layout/Navbar';
import { LoginButton } from './components/general/LoginButton';

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (error) {
    return (
      <div className="App">
        Error: {error.message}
      </div>
    )
  }

  if (isLoading) {
    return (<div className="App">Loading...</div>)
  }

  if (isAuthenticated) {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <HomePage />
        <LoginButton />
      </div>
    )
  }
}

export default App;
