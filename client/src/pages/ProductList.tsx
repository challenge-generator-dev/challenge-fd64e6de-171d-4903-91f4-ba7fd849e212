import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const API_URL = 'http://localhost:3000';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Product[]>(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al cargar productos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al eliminar producto';
      alert(message);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>Gestión de Productos</h1>
        <Link to="/products/new" className="btn btn-primary">
          Nuevo Producto
        </Link>
      </header>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos registrados.</p>
          <Link to="/products/new" className="btn btn-secondary">
            Crear primer producto
          </Link>
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-small"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteLoading === product.id}
                    className="btn btn-small btn-danger"
                  >
                    {deleteLoading === product.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}