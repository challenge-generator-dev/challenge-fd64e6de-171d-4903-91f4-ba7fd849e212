import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ProductList } from './pages/ProductList';
import { ProductForm } from './pages/ProductForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: 'new',
        element: <ProductForm />,
      },
      {
        path: 'edit/:id',
        element: <ProductForm />,
      },
    ],
  },
]);