import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProductService } from '@/services/productService';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        await ProductService.getProducts();
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to the API. Please ensure the backend is running.');
        setLoading(false);
      }
    };

    checkApiAvailability();
  }, []);

  if (loading) {
    return <div className="loading">Loading application...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Management</h1>
        <nav>
          <button
            onClick={() => navigate('/')}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Products
          </button>
          <button
            onClick={() => navigate('/new')}
            className={location.pathname === '/new' ? 'active' : ''}
          >
            Add Product
          </button>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;