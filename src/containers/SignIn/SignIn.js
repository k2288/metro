import React, { Component } from "react";
import "./SignIn.css";
import axios from "../../Axios-Hami";
import EnglishInput from "../../components/EnglishInput/EnglishInput";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index.js"
import RingIndicator from "../../components/RingIndicator/RingIndicator"


class SignIn extends Component{


    submitHandler=()=>{
        event.preventDefault();
        const data = new FormData(event.target);
        if(data){
            this.props.onAuth(data)
        }
    }



    render(){

        let loginForm=(
            <div>
                <div className="icon-container">
                </div>
                <form onSubmit={this.submitHandler} className="login-form  p-6 mx-auto  ">
                    <div className="form-group">
                        <EnglishInput
                            name="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group" style={{display:"flex"}}>
                        <EnglishInput
                            name="password"
                            type="password"
                            placeholder="Password"

                        />
                        <div  >
                            <button className="button">
                                <span className="mif-arrow-right "></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

        if(this.props.error){
            loginForm=(
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <p style={{color:"white",marginBottom:"20px",fontWeight:"bold"}}>{this.props.error.message}</p>
                    <button className="button" style={{    width: "20%"}} onClick={this.props.onBackSignIn} > 
                        ok
                    </button>
                </div>
            )
        }


        return (
            <div className="signin-screen">
                {
                    this.props.loading?
                        <RingIndicator />
                        :
                    loginForm
                }

                
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
      onBackSignIn:()=>dispatch(actions.backToSignIn())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)( SignIn);