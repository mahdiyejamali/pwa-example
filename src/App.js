import React, { Component } from "react";
import "./App.css";

import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    //PWA-1 have a local sever running with GET /posts
    fetch("http://localhost:3000/posts")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    return (
      <div className="App">
        <h4 style={{ marginTop: "20px" }}>Items List</h4>

        <div style={{ width: "50%", marginLeft: "25%", marginTop: "20px" }}>
          {this.state.data.length ? (
            <ListGroup>
              {this.state.data.map(post => (
                <ListGroup.Item>{post.title}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            "No Data!"
          )}
        </div>
      </div>
    );
  }
}

export default App;
