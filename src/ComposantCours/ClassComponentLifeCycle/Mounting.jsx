import React,{ Component } from "react";

export default class Mounting extends React.Component {
   
  constructor(props) {
    super(props);
    console.log("je suis le constructeur");
    this.state = { likes: 0 };
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log(props.name);
    console.log("getting props and init states !!!");
    return null;
  }
  componentDidMount() {
    console.log("component did mount !!!");
  }
 

  render() {
    return (
      <div>
        {console.log("rendering")}
        <p>Like : {this.state.likes}</p>
        
      </div>
    );
  }
   
}