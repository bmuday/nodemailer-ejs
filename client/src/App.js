import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ContactForm from "./components/ContactForm";

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header" style={{ marginBottom: "50px" }}>
          <img
            src=""
            className="App-logo"
            alt="logo"
            style={{ height: "75px" }}
          />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ContactForm />
      </div>
    );
  }
}

export default App;
