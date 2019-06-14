import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      errorMessage: "",
      spinner: false,
      newSmurfName: "",
      newSmurfAge: "",
      newSmurfHeight: ""
    };
  }

  fetchSmurfs() {
    this.setState({ spinner: true });
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState({
          smurfs: response.data
        });
      })
      .catch(err => {
        this.setState({ errorMessage: "Could not get smurfs" });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  componentDidMount() {
    this.fetchSmurfs();
  }

  addNewSmurf(res) {
    this.setState({ smurfs: res });
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/">View All Smurfs</NavLink>
            <NavLink to="add_smurf">Add Smurf</NavLink>
          </nav>
        </header>
        <Route
          path="/add_smurf"
          render={() => <SmurfForm addNewSmurf={this.addNewSmurf} />}
        />
        <Route
          exact
          path="/"
          render={() => <Smurfs smurfs={this.state.smurfs} />}
        />
        {this.state.spinner && <div>Smurfs are loading...</div>}
      </div>
    );
  }
}

export default App;
