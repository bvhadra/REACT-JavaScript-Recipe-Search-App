import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipe(response.data.meals[0]);
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <h2>Recipe Details</h2>
        <h3>{recipe.strMeal}</h3>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>Ingredients</h3>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map(i => ({
              ingredient: recipe[`strIngredient${i}`],
              measure: recipe[`strMeasure${i}`],
            }))
            .filter(item => item.ingredient)
            .map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}           
        </ul>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back To Search Results</button>
      </div>
    </div>
  );
};

export default RecipeDetail;
