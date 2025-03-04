import React from "react";

export default class Methods extends React.Component {
 
    constructor(props) {
        super(props);
        console.log(this);
        this.state = { likes: 0 ,msg :"" };
     //  this.addLikes = this.addLikes.bind(this)
      }
   
     
       
      addLikes=() => {
        console.log(this) ;
        this.setState((oldState) => ({
               likes :oldState.likes + 1, msg : "incrementation"
           }));
      }
      displayMessage() {
        console.log("hello it's me !!!");
      }
    
      render() {
        return (
          <div>
            <p>Like : {this.state.likes}</p>
            <p>Message : {this.state.msg}</p>
            <button onClick={this.addLikes}>Like</button>
            <button onClick={this.displayMessage}>Click me</button>
          </div>
        );
      }
}