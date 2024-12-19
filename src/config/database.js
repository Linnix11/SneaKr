import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const API_URL = "http://54.37.12.181:1337/api";

const App = () => {
  const [sneakers, setSneakers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get(`${API_URL}/sneakers`);
        setSneakers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des sneakers");
        setLoading(false);
      }
    };
    
    fetchSneakers();
  }, []);

  const addToCollection = async (sneakerId, userId) => {
    try {
      await axios.post("/api/collections", {
        user_id: userId,
        sneaker_id: sneakerId
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout à la collection:", err);
    }
  };

  const addToWishlist = async (sneakerId, userId) => {
    try {
      await axios.post("/api/wishlists", {
        user_id: userId,
        sneaker_id: sneakerId
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout à la wishlist:", err);
    }
  };

  const filteredSneakers = sneakers.filter(sneaker => 
    sneaker.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sneaker.attributes.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Sneakers Collection</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="search"
              placeholder="Rechercher des sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSneakers.map((sneaker) => (
            <Card key={sneaker.id}>
              <CardHeader>
                <CardTitle>{sneaker.attributes.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={`${API_URL}${sneaker.attributes.image.data.attributes.url}`}
                  alt={sneaker.attributes.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4 flex justify-between gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => addToCollection(sneaker.id)}
                    className="flex-1"
                  >
                    Collection
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => addToWishlist(sneaker.id)}
                    className="flex-1"
                  >
                    Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;