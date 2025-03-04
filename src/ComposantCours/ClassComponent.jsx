
import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            value :"valeur du state"
        }
        
    }

    render(){
        return <>
        
        <h1>Hello {this.props.name} from class component</h1>
        <p>new element de state {this.state.value}</p>
        
        
        </>
    }


}