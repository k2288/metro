import React, { Component } from "react"
import "./Desktop.css"
import DropDown from "../../components/DropDown/DropDown";
import Window from "../../components/Window/Window";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"

class Desktop extends Component{

    
    openMetro=()=>{
        this.props.history.push("/metro")
    }

    render(){
        return (
            <div className="desktop">
                <div className="window-area">
                    {
                        
                        this.props.windows.map(win=>{
                            return <Window key={win.uniqueId} win={win} />
                        })
                    }
                </div>
                <div className="task-bar">
                    <button className="task-bar-item" id="start-menu-toggle" onClick={this.openMetro}>
                        <span className="mif-windows"></span>
                    </button>
                        {/* <DropDown >
                            <div className="start-menu-inner h-100">
                                <div className="explorer">
                                    <ul className="v-menu w-100 bg-brandColor2 fg-white">
                                        <li><a >Youtube window</a></li>
                                        <li><a onClick={()=>this.props.onAddWindow({
                                            id:new Date(),
                                            name:"new window"
                                        })} >New window</a></li>
                                        <li><a >Custom buttons</a></li>
                                        <li><a >Modal window</a></li>
                                    </ul>
                                </div>
                            </div>
                        </DropDown> */}
                    <div className="task-bar-section tasks"></div>
                    <div className="task-bar-section system-tray ml-auto">
                        <button className="task-bar-item" id="open-charm" ><span className="mif-comment"></span></button>
                        <span style={{lineHeight: "40px"}} className="pr-4">
                            <span data-role="clock" className="w-auto fg-white reduce-1" data-show-date="false"></span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        windows:state.desktop.windows
    }
}

const mapDispatchToProps=dispach=>{
    return {
        onAddWindow:(win)=>dispach(actions.addWindow(win))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Desktop);