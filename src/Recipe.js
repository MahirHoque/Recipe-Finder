import React from "react";

function Recipe(props) {
  return (
    <a href={props.item.recipe.url} target="_blank" className="recipeCard">
      <div className="recipeImageWrapper">
        <img alt="Recipe" src={props.item.recipe.image} />
      </div>
      <div className="colorOverlay">
        <div className="recipeInfo">
          <span className="recipeName">{props.item.recipe.label}</span>
          <p className="dietLabels">
            {props.item.recipe.dietLabels.length !== 0
              ? props.item.recipe.dietLabels.map(Label => <span>{Label}</span>)
              : ""}
          </p>
          <p className="calories">
            <span className="label">Calories:</span>{" "}
            {Math.floor(props.item.recipe.calories / props.item.recipe.yield)}{" "}
            (per serving)
          </p>
          <a
            target="_blank"
            href={props.item.recipe.url}
            className="recipeButton"
          >
            See the recipe
          </a>
        </div>
      </div>
    </a>
  );
}

export default Recipe;
