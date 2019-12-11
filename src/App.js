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
    const sessionId=sessionStorage.getItem('JSESSIONID');
    if(sessionId){
      axios.defaults.headers.common['JSESSIONID'] =sessionId;
      axios.get("api/users/principle")
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      })
    }else{
      this.setState({
        authenticationIsChecked:true
      })
    }

  }

  render() {
    let routes=(
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Redirect to="/login" />
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
