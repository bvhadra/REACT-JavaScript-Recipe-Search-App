import React from 'react';
import { Link } from 'react-router-dom';
import './styles/RecipeList.css';

const RecipeList = ({ recipes, page, setPage, totalResults, searched }) => {
  const totalPages = Math.ceil(totalResults / 9);

  const handleFirst = () => setPage(1);
  const handlePrevious = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);
  const handleLast = () => setPage(totalPages);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          disabled={i === page}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="recipe-list-container">
      <h1>Search Results</h1>
      {totalResults > 0 ? (
        <>
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className="recipe-card">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h3>{recipe.strMeal}</h3>
              </Link>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handleFirst} disabled={page === 1}>First</button>
            <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
            {renderPagination()}
            <button onClick={handleNext} disabled={page === totalPages}>Next</button>
            <button onClick={handleLast} disabled={page === totalPages}>Last</button>
          </div>
        </>
      ) : (
        searched && <p>No recipes found. Please choose another ingredient.</p>
      )}
    </div>
  );
};

export default RecipeList;
