import React, { Component } from "react";
import "./SignIn.css";
import axios from "../../Axios-Hami";
import EnglishInput from "../../components/EnglishInput/EnglishInput";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index.js"


class SignIn extends Component{


    submitHandler=()=>{
        event.preventDefault();
        const data = new FormData(event.target);
        if(data){

            this.props.onAuth(data)

            
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

const mapStateToProps=state=>{
    return {
      loading:state.auth.loading,
      error:state.auth.error,
    }
  };
  
const mapDispatchToProps=dispatch=>{
    return {
      onAuth:(data)=>dispatch(actions.auth(data)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)( SignIn);