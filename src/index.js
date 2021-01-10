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
      maximumCalories: "1000",
      vegan: false,
      vegetarian: false,
      formSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
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

  sendQuery() {
    let healthLabels = [];
    if (this.state.vegan) {
      healthLabels.push("health=vegan");
    }
    if (this.state.vegetarian) {
      healthLabels.push("health=vegetarian");
    }
    let healthLabelsString = healthLabels.join("&");
    healthLabelsString =
      healthLabelsString.length > 0 ? "&" + healthLabelsString : "";
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
        <img
          class="Logo"
          alt="RecipeBOX Logo"
          src="https://www.dropbox.com/s/rbq6wgv9w0fjhts/LogoV1.svg?raw=1"
        />
        <form className="selectionForm" onSubmit={this.handleSubmit}>
          <div className="mainItemContainer">
            <label className="mainItemLabel">Show me recipes with</label>
            <input
              type="text"
              name="mainItem"
              placeholder="ingredient name (try 'salmon'..)"
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
              <label>Maximum Calories (per serving)</label>
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

        <div>{this.state.formSubmitted && this.sendQuery()}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
