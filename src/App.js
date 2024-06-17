import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [ingredient, setIngredient] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [searched, setSearched] = useState(false);

  const handleSearch = (ingredient) => {
    setIngredient(ingredient);
    setPage(1);
    setSearched(true);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!ingredient) return;
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const results = response.data.meals || [];
      setTotalResults(results.length);
      setRecipes(results.slice((page - 1) * 9, page * 9));
    };
    fetchRecipes();
  }, [ingredient, page]);

  return (
    <Router>
      <div className="App">
        <h1>Recipe Search</h1>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SearchForm onSearch={handleSearch} />
                <RecipeList 
                  recipes={recipes} 
                  page={page} 
                  setPage={setPage} 
                  totalResults={totalResults}
                  searched={searched}
                />
              </>
            } 
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
