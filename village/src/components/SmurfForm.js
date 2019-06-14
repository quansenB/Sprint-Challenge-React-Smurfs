import React, { Component } from "react";
import axios from "axios";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: "",
      errorMessage: ""
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const newSmurf = {
      name: this.state.name,
      age: this.state.age,
      heigth: this.state.height + "cm"
    };

    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then(response => {
        this.props.addNewSmurf(response);
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.log(error.message);
      })
      .finally(() => {
        this.setState({
          name: "",
          age: "",
          height: ""
        });
      });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
            type="string"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
            type="number"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
            type="number"
          />
          <button type="submit">Add to the village</button>
        </form>
        {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
      </div>
    );
  }
}

export default SmurfForm;
