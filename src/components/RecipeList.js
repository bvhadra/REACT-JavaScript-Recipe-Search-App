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
          className={i === page ? 'current-page' : ''}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const renderResultsSummary = () => {
    if (totalResults > 0) {
      return (
        <p className="results-summary">
          {totalResults} recipe{totalResults !== 1 ? 's' : ''} found, {totalPages} Page{totalPages !== 1 ? 's' : ''}: Page {page} of results
        </p>
      );
    }
    return null;
  };

  return (
    <div className="recipe-list-container">
      <h2>Search Results</h2>
      {renderResultsSummary()}
      {totalResults > 0 ? (
        <>
          <h4>Select a recipe below:</h4>
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className="recipe-card">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h4>{recipe.strMeal}</h4>
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