import React, { Component } from "react";
import "./SignIn.css";
import axios from "../../Axios-Hami";
import { translate, translateToEnglish } from "../../utils/translate"

class SignIn extends Component{
    state={
            username:"",
            englishUsername:"",
            password:""
        }

    
    inputChangeHandler=(event,input)=>{
        switch (input){
            case "USERNAME":
                this.setState({username:translateToEnglish(event.target.value)});
                break;
            case "PASSWORD":
                this.setState({password:event.target.value});
                break;
        }

    }

    submitHandler=()=>{
        event.preventDefault();
        const data = new FormData(event.target);
        if(this.state.username && this.state.password){
            axios({
                method: 'post',
                url: 'login',
                data: data
                })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
            axios.post("/login",data, {
                headers: { 'Content-Type': 'multipart/form-data' }})
            .then(response=>{
                console.log(response);
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }

    keyPressHandler=(event)=>{
        // let word= translate(event.keyCode);
        
        console.log(event.target.value);
        
        let word=translate(String.fromCharCode(event.which),event);
        if(word){
            this.setState({
                englishUsername:this.state.username+word.toLowerCase()
            })
            console.log(event.which);
            console.log(word.toLowerCase());
        }
        // if(word){
        //     this.setState({
        //         username:this.state.username+word
        //     })
        // }else{
        //     this.setState({
        //         username:event.target.value
        //     })
        // }  
    }

    render(){
        return (
            <div className="h-vh-100 ">
                <form onSubmit={this.submitHandler} className="login-form bg-white p-6 mx-auto border bd-default win-shadow ">
                    <span className="mif- user mif-4x place-right" style={{marginTop: "-10px"}}></span>
                    <h2 className="text-light">Login to service</h2>
                    <hr className="thin mt-4 mb-4 bg-white" />
                    <div className="form-group">
                        <input 
                        // onKeyDown={(event)=>this.keyPressHandler(event)} 
                        value={this.state.username}
                        onChange={(event)=>this.inputChangeHandler(event,"USERNAME")} 
                        type="text" name="username"  placeholder="Enter your username..."  />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Enter your password..."  />
                    </div>
                    <div className="form-group mt-10">
                        <button className="button">Submit form</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;