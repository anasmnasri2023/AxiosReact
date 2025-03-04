import React from "react";

export default class Unmouting extends React.Component {
    constructor(props) {
      super(props);
     
      this.addLikes = this.addLikes.bind(this);
      this.removeLikes = this.removeLikes.bind(this);
      this.state = { likes: 0 };
    }
    removeLikes() {
      this.setState((oldState) => ({
        likes: oldState.likes + -1,
      }));
    }
  
    addLikes() {
      this.setState((oldState) => ({
        likes: oldState.likes + 1,
      }));
    }
  
    render() {
      return (
        <div>
          <button onClick={this.addLikes}>ADD</button>
          {this.state.likes !== 0 && (
            <button onClick={this.removeLikes}>REMOVE</button>
          )}
          {[...Array(this.state.likes)].map((value, index) => (
            <Cell key={index} id={index} />
          ))}
        </div>
      );
    }
  }

  class Cell extends React.Component {
   
    componentWillUnmount() {
      console.log("number " + this.props.id + " is dead");
    }
  
    render() {
      return <h1>Cell {this.props.id}</h1>;
    }
  }