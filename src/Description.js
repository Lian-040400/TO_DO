import React, {Component} from 'react';
class Description extends Component{
    render(){
        return(
            <span>{this.props.value}</span>
        );
    }
}
export {Description};