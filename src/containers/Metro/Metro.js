import React ,{ Component } from "react"
import "./Metro.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import UserManagement from "../../components/UserManagement/UserManagement"


class Metro extends Component{

    openWindow=()=>{
        this.props.onAddWindow({
            id:new Date(),
            name:"user management",
            component:<UserManagement />
        })

        this.props.history.replace("/")
    }

    render(){
        
        return (
            <div className="bg-dark fg-white h-vh-100 ">
                <div className="container-fluid start-screen h-100" style={{overflow: "auto"}}>
                        <h1 className="start-screen-title">Start</h1>

                        <div className="tiles-area clear" style={{marginTop: "-50px"}}> 
                        {/* style={{width: "1920px"}} */}
                            <div className="tiles-grid tiles-group size-2 fg-white" data-group-title="General" style={{left: "0px"}}>
                                <a  onClick={this.openWindow}  data-role="tile" className="bg-indigo fg-white tile-medium" data-role-tile="true" style={{opacity: "1", transform: "scale(1)", transition: "all 0.3s ease 0s"}}>
                                    <span className="mif-user icon"></span>
                                    <span className="branding-bar">Users</span>
                                    <span className="badge-bottom"></span>
                                </a>
                               
                                <div data-role="tile" className="bg-cyan fg-white tile-medium" data-role-tile="true" style={{opacity: "1", transform: "scale(1)", transition: "all 0.3s ease 0s"}}>
                                    <span className="mif-table icon"></span>
                                    <span className="branding-bar">Tables</span>
                                </div>
                            </div>
                        
                        </div>
                    </div>
            </div>
        )
    }
}

const mapDispatchToProps=dispach=>{
    return {
        onAddWindow:(win)=>dispach(actions.addWindow(win))
    }
}

export default connect(null,mapDispatchToProps)( Metro);