import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

function Result(props) {
  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let apiCall = `https://api.edamam.com/search?q=${props.mainItem}&ingr=${
      props.numOfIngredients
    }&to=30&calories=${props.maximumCalories}${
      props.healthLabels
    }&app_id=b799c48a&app_key=b917ce57cc53784adc911e148f8d31fa`;
    console.log(apiCall);
    fetch(apiCall)
      .then(response => {
        if (!response.ok) {
          throw Error("please enter a valid input");
        }
        return response.json();
      })
      .then(response => {
        console.log(response);
        setAlldata(response.hits);
        setLoading(false);
      })
      .catch(function(error) {
        setError(true);
        //alert("error");
      });
  }, []);

  const recipeList =
    alldata.length !== 0
      ? alldata.map(Item => <Recipe key={Item.recipe.uri} item={Item} />)
      : "We did not find any matches, try searching again with different criteria";

  console.log(props.mainItem, props.healthLabels);
  return (
    <div className="generatedRecipe">
      {loading ? (
        error ? (
          "please enter a valid input"
        ) : (
          <div className="gridLoader">loading...</div>
        )
      ) : (
        <div className="recipeList">{recipeList}</div>
      )}
    </div>
  );
}

export default Result;
