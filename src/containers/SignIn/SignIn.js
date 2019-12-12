import React, { Component } from "react";
import "./SignIn.css";
import axios from "../../Axios-Hami";
import EnglishInput from "../../components/EnglishInput/EnglishInput";

class SignIn extends Component{


    submitHandler=()=>{
        event.preventDefault();
        const data = new FormData(event.target);
        if(data){
            axios.post("/login",data)
            .then(response=>{
                console.log(response);

                
                console.log(this.props.history);
            })
            .catch(error=>{
                console.log(error);
            })
        }
    }



    render(){
        return (
            <div className="h-vh-100 ">
                <form onSubmit={this.submitHandler} className="login-form bg-white p-6 mx-auto border bd-default win-shadow ">
                    <span className="mif- user mif-4x place-right" style={{marginTop: "-10px"}}></span>
                    <h2 className="text-light">Login to service</h2>
                    <hr className="thin mt-4 mb-4 bg-white" />
                    <div className="form-group">
                        <EnglishInput
                            name="username"
                            type="text"
                            placeholder="Enter your username"

                        />
                    </div>
                    <div className="form-group">
                        <EnglishInput
                            name="password"
                            type="password"
                            placeholder="Enter your password.."

                        />
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