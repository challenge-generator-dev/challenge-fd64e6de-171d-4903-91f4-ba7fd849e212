import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  category: string;
}

const API_URL = 'http://localhost:3000';

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id, 10));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setFetching(true);
      const response = await axios.get<Product>(`${API_URL}/products/${productId}`);
      const product = response.data;
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
      });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Error al cargar el producto';
      setError(message);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError('El precio debe ser un número positivo');
      return false;
    }
    const stock = parseInt(formData.stock, 10);
    if (isNaN(stock) || stock < 0) {
      setError('El stock debe ser un número entero positivo');
      return false;
    }
    if (!formData.category.trim()) {
      setError('La categoría es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        category: formData.category.trim(),
      };

      if (isEditing) {
        await axios.put(`${API_URL}/products/${id}`, payload);
      } else {
        await axios.post(`${API_URL}/products`, payload);
      }

      navigate('/products');
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : `Error al ${isEditing ? 'actualizar' : 'crear'} el producto`;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        <button
          onClick={() => navigate('/products')}
          className="btn btn-secondary"
        >
          Volver
        </button>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ingresa el nombre del producto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ej: Electrónica, Ropa, Alimentos"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              disabled={loading}
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading
              ? isEditing
                ? 'Actualizando...'
                : 'Creando...'
              : isEditing
              ? 'Actualizar Producto'
              : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}