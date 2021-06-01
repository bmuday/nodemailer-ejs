import React, { Component } from "react";
import axios from "axios";
import { Spinner, UncontrolledAlert } from "reactstrap";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpinning: false,
      response: "",
    };
    this.checkSpinning = this.checkSpinning.bind(this);
    this.checkAlert = this.checkAlert.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSpinning: true,
    });

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    axios({
      method: "POST",
      url: "http://localhost:4000/api/send",
      data: {
        name: name,
        email: email,
        message: message,
      },
    }).then((response) => {
      this.setState({
        isSpinning: false,
      });

      this.setState({
        response: response.data.msg,
      });
    });
  }

  checkAlert() {
    if (this.state.response !== "") {
      if (this.state.response === "success") {
        this.resetForm();
        return (
          <div>
            <UncontrolledAlert color="success">Message Sent!</UncontrolledAlert>
          </div>
        );
      } else {
        return (
          <div>
            <UncontrolledAlert color="danger">
              Message failed to send
            </UncontrolledAlert>
          </div>
        );
      }
    }
  }

  checkSpinning() {
    if (this.state.isSpinning) {
      return (
        <div
          className="col-sm-4 offset-sm-4"
          style={{ paddingLeft: "100px", paddingTop: "150px" }}
        >
          <Spinner
            style={{ width: "10rem", height: "10rem" }}
            type="grow"
            color="info"
          />
        </div>
      );
    } else
      return (
        <div className="col-sm-4 offset-sm-4">
          {this.checkAlert()}
          <form
            id="contact-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                rows="5"
                id="message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
  }

  resetForm() {
    //Simple way to reset the form
    document.getElementById("contact-form").reset();
  }

  render() {
    return this.checkSpinning();
  }
}

export default ContactForm;
