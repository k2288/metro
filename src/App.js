import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route ,Switch , Redirect} from "react-router";
import axios from "./Axios-Hami";
import Desktop from "./containers/Desktop/Desktop";
import SignIn from "./containers/SignIn/SignIn";
import { connect } from "react-redux";
import * as actions from "./store/actions/index"



class App extends Component {


  componentDidMount=()=>{
    this.props.checkAuth();
  }

  checkAuth=()=>{
    axios.get("api/users/principle")
    .then(response=>{
      this.setState({
        isAuthenticated:true,
        authenticationIsChecked:true
      })
    })
    .catch(error=>{
        this.setState({
          isAuthenticated:false,
          authenticationIsChecked:true
        })
    })
    

  }

  render() {
    let routes=(
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Redirect to="/signin" />
      </Switch>

    )

    if(!this.props.authenticationIsChecked){
      return (
        <div className="starting-screen">
          <span className="mif-windows"></span>
        </div>
      )
    }else if(this.props.isAuthenticated){
      routes=(
        <Switch>
          
          <Route path="/"  exact component={Desktop} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <BrowserRouter basename="/">
        {
          routes
        }
      </BrowserRouter>
    );
  }
}

const mapStateToProps=state=>{
  return {
    authenticationIsChecked:state.global.authenticationIsChecked,
    isAuthenticated:state.global.isAuthenticated
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    checkAuth:()=>dispatch(actions.checkAuth())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
