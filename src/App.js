import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import SEO from './components/SEO';  // Import the SEO component
import image3 from './components/images/fruitandveg2.jpg';
import logo from './components/images/Recipe_Finder_App_Logo.png';
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
        <SEO 
          title="Recipe Finder - Healthy Meals for Developers"
          description="Discover quick and nutritious recipes perfect for busy software engineers and web developers."
          keywords="recipe finder, healthy meals, quick recipes, developer nutrition, software engineer diet, bidhan vhadra"
        />
        <header className="app-header">
          <div className="header-content">
            <a href="https://react-javascript-recipe-search.netlify.app/"><img src={logo} alt="Recipe Finder Logo" className="app-logo" /></a>
            <div className="header-text">
              <h1>Welcome to Recipe Finder</h1>
              <h3>Find delicious recipes by entering a key ingredient of your choice!</h3>
            </div>
          </div>
        </header>
        <div className="content">
          <main className="main-section">
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
          </main>
        </div>
        <div className="sub-footer">
          <img src={image3} alt="" /> 
        </div>
        <footer className="app-footer">
          <p>Developed by <a href="https://github.com/bvhadra">Bidhan Vhadra</a></p>
          <p>&copy; 2024 <a href="https://github.com/bvhadra/REACT-JavaScript-Recipe-Search-App">Recipe Finder</a></p>
        </footer>
      </div>
    </Router>
  );
};

export default App;