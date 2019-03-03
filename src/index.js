import React from "react";
import ReactDOM from "react-dom";
import Result from "./Result";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mainItem: "",
      numOfIngredients: "5",
      maximumCalories: "500",
      vegan: false,
      vegetarian: false,
      formSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.helperFunction = this.helperFunction.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({
          [name]: checked,
          formSubmitted: false
        })
      : this.setState({
          [name]: value,
          formSubmitted: false
        });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      formSubmitted: true
    });
  }

  helperFunction() {
    let healthLabels = [];
    if (this.state.vegan) {
      console.log("veganselected");
      healthLabels.push("health=vegan");
    }
    if (this.state.vegetarian) {
      console.log("vegetariannselected");
      healthLabels.push("health=vegetarian");
    }
    let healthLabelsString = healthLabels.join("&");
    healthLabelsString =
      healthLabelsString.length > 0 ? "&" + healthLabelsString : "";
    console.log(healthLabelsString);
    return (
      <Result
        mainItem={this.state.mainItem}
        numOfIngredients={this.state.numOfIngredients}
        maximumCalories={this.state.maximumCalories}
        healthLabels={healthLabelsString}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <form className="selectionForm" onSubmit={this.handleSubmit}>
          <div className="mainItemContainer">
            <label className="mainItemLabel">Show me recipes with</label>
            <input
              type="text"
              name="mainItem"
              placeholder="e.g. broccoli"
              value={this.state.mainItem}
              onChange={this.handleChange}
            />
          </div>
          <div className="queryDetails">
            <span>Refine Search</span>
            <div className="inputContainer">
              <label>Maximum number of Ingredients</label>
              <input
                type="text"
                name="numOfIngredients"
                placeholder=""
                value={this.state.numOfIngredients}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputContainer">
              <label>Maximum Calories</label>
              <input
                type="text"
                name="maximumCalories"
                placeholder=""
                value={this.state.maximumCalories}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputContainer checkboxContainer">
              <label>
                Vegan
                <input
                  type="checkbox"
                  name="vegan"
                  checked={this.state.vegan}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Vegetarian
                <input
                  type="checkbox"
                  name="vegetarian"
                  checked={this.state.vegetarian}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="buttonContainer">
            <button>Find Recipes</button>
          </div>
        </form>

        <div>{this.state.formSubmitted && this.helperFunction()}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
