import React, {Component} from "react";
import {translate} from "./translate"

class EnglishInput extends Component{


    state={
        value:"",
        lastKey:"",
    }
    
    inputChangeHandler=(event)=>{
        if(this.state.lastKey){
            this.setState({value:this.state.value+this.state.lastKey});
        }else{
            this.setState({value:event.target.value});
        }
    }

    keyPressHandler=(event)=>{
        let word=translate(String.fromCharCode(event.which),event);
        if(word){
            this.setState({
                lastKey:word.toLowerCase()
            })
        }
        else{
            this.setState({lastKey:""});
        }
    }

    render(){
        return (
            <input 
                value={this.state.value}
                onKeyDown={(event)=>this.keyPressHandler(event)} 
                onChange={(event)=>this.inputChangeHandler(event)} 
                type={this.props.type} name={this.props.name}  placeholder={this.props.placeholder}  />
        );
    }
}

export default EnglishInput;