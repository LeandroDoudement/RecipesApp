import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchRecipes';

export default function RecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  // const [error, setError] = useState('');
  const location = useLocation();
  const sete = 7;
  const oito = 8;
  const type = location.pathname.slice(1, sete);
  let dataRecipe = [];
  let ingredients = [];
  let a = '';

  useEffect(() => {
    if ((type === 'meals/')) {
      const id = location.pathname.slice(sete);
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

      fetchDrinks(url)
        .then((response) => setDataMeals(response.meals))
        // .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }

    if ((type === 'drinks')) {
      const id = location.pathname.slice(oito);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      fetchDrinks(url)
        .then((response) => setDataDrinks(response.drinks))
        // .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [location.pathname, type]);
  if ((type === 'drinks') && (dataDrinks.length > 0)) {
    dataRecipe = dataDrinks;
  }

  if ((type === 'meals/') && (dataMeals.length > 0)) {
    dataRecipe = dataMeals;
    const ytVideo = dataRecipe[0].strYoutube;
    a = ytVideo.replace('watch?v=', 'embed/');
  }

  if ((dataDrinks.length > 0) || (dataMeals.length > 0)) {
    const ingredientsAll = [
      `${dataRecipe[0].strIngredient1} - ${dataRecipe[0].strMeasure1}`,
      `${dataRecipe[0].strIngredient2} - ${dataRecipe[0].strMeasure2}`,
      `${dataRecipe[0].strIngredient3} - ${dataRecipe[0].strMeasure3}`,
      `${dataRecipe[0].strIngredient4} - ${dataRecipe[0].strMeasure4}`,
      `${dataRecipe[0].strIngredient5} - ${dataRecipe[0].strMeasure5}`,
      `${dataRecipe[0].strIngredient6} - ${dataRecipe[0].strMeasure6}`,
      `${dataRecipe[0].strIngredient7} - ${dataRecipe[0].strMeasure7}`,
      `${dataRecipe[0].strIngredient8} - ${dataRecipe[0].strMeasure8}`,
      `${dataRecipe[0].strIngredient9} - ${dataRecipe[0].strMeasure9}`,
      `${dataRecipe[0].strIngredient10} - ${dataRecipe[0].strMeasure10}`,
      `${dataRecipe[0].strIngredient11} - ${dataRecipe[0].strMeasure11}`,
      `${dataRecipe[0].strIngredient12} - ${dataRecipe[0].strMeasure12}`,
      `${dataRecipe[0].strIngredient13} - ${dataRecipe[0].strMeasure13}`,
      `${dataRecipe[0].strIngredient14} - ${dataRecipe[0].strMeasure14}`,
      `${dataRecipe[0].strIngredient15} - ${dataRecipe[0].strMeasure15}`,
      `${dataRecipe[0].strIngredient16} - ${dataRecipe[0].strMeasure16}`,
      `${dataRecipe[0].strIngredient17} - ${dataRecipe[0].strMeasure17}`,
      `${dataRecipe[0].strIngredient18} - ${dataRecipe[0].strMeasure18}`,
      `${dataRecipe[0].strIngredient19} - ${dataRecipe[0].strMeasure19}`,
      `${dataRecipe[0].strIngredient20} - ${dataRecipe[0].strMeasure20}`,
    ];
    console.log(ingredientsAll);
    ingredients = ingredientsAll
      .filter((ingre) => (ingre !== 'null - null') && (ingre !== 'null - ') && (
        ingre !== 'undefined - undefined') && (ingre !== ' - '));
  }

  return (
    <div>
      <h1>RecipeDetails</h1>
      { (dataRecipe.length > 0) && (
        <div>
          {((!isLoading) && (type === 'meals/')) && (
            <>
              <h2 data-testid="recipe-title">{ dataRecipe[0].strMeal }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strMealThumb }
                alt={ dataRecipe[0].idMeal }
                height="150px"
              />
              <h2 data-testid="recipe-category">{ dataRecipe[0].strCategory }</h2>
            </>
          )}
          {((!isLoading) && (type === 'drinks')) && (
            <>
              <h2 data-testid="recipe-title">{ dataRecipe[0].strDrink }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strDrinkThumb }
                alt={ dataRecipe[0].idDrink }
                height="150px"
              />
              <h2 data-testid="recipe-category">
                { `${dataRecipe[0].strCategory} - ${dataRecipe[0].strAlcoholic}` }
              </h2>
            </>
          )}

          <ol>
            {ingredients.map((ing, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ing}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">{ dataRecipe[0].strInstructions }</p>
          { (type === 'meals/') && (
            <iframe title="video" data-testid="video" src={ a } />
          )}
        </div>
      )}
    </div>
  );
}
