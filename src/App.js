import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { Route ,Switch , Redirect} from "react-router"
import axios from "./Axios-Hami";
import Desktop from "./containers/Desktop/Desktop"
import SignIn from "./containers/SignIn/SignIn"



class App extends Component {

  state={
    authenticationIsChecked:false,
    isAuthenticated:false

  }

  componentDidMount=()=>{
    this.checkAuth();
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
      if(error.response.data.statusCode===401){
        this.setState({
          isAuthenticated:false,
          authenticationIsChecked:true
        })
      }
    })
    

  }

  render() {
    let routes=(
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Redirect to="/signin" />
      </Switch>

    )

    if(!this.state.authenticationIsChecked){
      return ("loading");
    }else if(this.state.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/" exactcComponent={Desktop} />
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

export default App;
