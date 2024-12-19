import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const { attributes } = product;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative group bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 ${
        isHovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy"/>
      
      <div className="relative overflow-hidden rounded-2xl bg-gray-900">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-blue-400/30 to-purple-500/30 z-10"/>
        
        <img 
          src={attributes.image.small} 
          alt={attributes.name} 
          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:rotate-2"
        />

        <div className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium z-20 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse">
          {attributes.brand}
        </div>

        <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-medium z-20 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
          {attributes.estimatedMarketValue}€
        </div>
      </div>

      <div className="relative z-20 p-6 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/50 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 truncate">
          {attributes.name}
        </h2>
        
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-gray-800/80 text-blue-400 px-3 py-1 rounded-full backdrop-blur-sm border border-blue-500/20">
            {attributes.gender}
          </span>
          <span className="text-xs bg-gray-800/80 text-purple-400 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-500/20">
            {attributes.colorway}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center bg-gray-800/30 p-2 rounded-lg backdrop-blur-sm">
            <span className="text-gray-400">Retail</span>
            <span className="text-white font-medium">{attributes.retailPrice} €</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800/30 p-2 rounded-lg backdrop-blur-sm">
            <span className="text-gray-400">Market</span>
            <span className="text-blue-400 font-bold">{attributes.estimatedMarketValue} €</span>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-3 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-all duration-300 font-medium bg-[length:200%_100%] animate-gradient-x"
        >
          Ajouter à ma Wishlist
        </button>
      </div>
    </div>
  );
};

const ShoppingCart = ({ items, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.attributes.estimatedMarketValue, 0);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-gray-800/50 backdrop-blur-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          WishList
        </h2>
        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
          {items.length} articles
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p>Votre wishlist est vide</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-gray-800/30 p-4 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-colors duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"/>
                <div className="relative flex items-center gap-4">
                  <img 
                    src={item.attributes.image.thumbnail} 
                    alt={item.attributes.name}
                    className="w-16 h-16 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {item.attributes.name}
                    </h3>
                    <p className="text-blue-400">{item.attributes.estimatedMarketValue} €</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>  
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {total.toFixed(2)} €
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 text-center">
          Future Sneakers
        </h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border-0 focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border-0 focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-3 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-all duration-300 font-medium bg-[length:200%_100%] animate-gradient-x"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

const SneakersList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  useEffect(() => {
    fetch('http://54.37.12.181:1337/api/sneakers')
      .then(response => {
        if (!response.ok) throw new Error('Erreur de chargement');
        return response.json();
      })
      .then(data => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      if (!prev.some(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const brands = [...new Set(products.map(p => p.attributes.brand))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.attributes.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !filterBrand || product.attributes.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
          <p className="mt-4 text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-red-900/50 text-red-300 px-6 py-4 rounded-xl">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Future Sneakers
              </h1>
              <button
                onClick={handleLogout}
                className="sm:ml-4 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                Déconnexion
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-4 py-2 rounded-xl bg-gray-800 text-white border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Toutes les marques</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <input
                type="search"
                placeholder="Rechercher..."
                className="px-4 py-2 rounded-xl bg-gray-800 text-white border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <ShoppingCart 
              items={cartItems} 
              onRemove={removeFromCart}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <SneakersList /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
          