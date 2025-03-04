import React from "react";

export default class Update extends React.Component {

    constructor(props) {
        super(props);
        this.addLikes = this.addLikes.bind(this);
        this.state = { likes: 0, name: "init" };
        console.log("Update & mounting...");
      }
    
      static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps");
        return null;
      }
      shouldComponentUpdate(props, state) {
        if (state.likes > 2) {
          console.log("shouldComponentUpdate");
          console.log(state.likes);
          return false;
        } else {
          return true;
        }
      }
    
      getSnapshotBeforeUpdate(a, b) {
        console.log(a);
        console.log(b);

        return { a, b };
      }
      componentDidUpdate() {
        console.log("current state " + this.state.likes);
      }
      addLikes() {
        console.log(this);
        this.setState((oldState) => ({  likes: oldState.likes + 1, name: "setState",}));
       
      }
      SayHello(){
         console.log("Hello world");
      }
      render() {
        return (
          <div>
            {console.log("rendering")}
            <p>Like : {this.state.likes}</p>
            <p>Name : {this.state.name}</p>
            <button onClick={this.addLikes}>Like</button>
            <button onClick={this.SayHello}>Say hello</button>
         
          </div>
        );
      }
}