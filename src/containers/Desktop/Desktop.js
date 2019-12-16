import React, { Component } from "react"
import "./Desktop.css"
import DropDown from "../../components/DropDown/DropDown";
import Window from "../../components/Window/Window";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"
import ContextMenu from "../../components/ContextMenu/ContextMenu"
import moment from "jalali-moment"
import word from "../../assets/images/word.png"

class Desktop extends Component{
    state={
        time:"",
        date:""
    }

    componentDidMount=()=>{
        this.setClockAndDate();
        this.props.onGetRoot()
    }

    setClockAndDate=()=>{
        this.setState({
            time:moment().locale('fa').format('HH:mm'),
            date:moment().locale('fa').format('YYYY/MM/DD')
        })

        setTimeout(() => {
            this.setClockAndDate()
        }, 1000);
    }
    
    openMetro=()=>{
        this.props.history.push("/metro")
    }

    render(){
        return (
            <div className="desktop">
                <ContextMenu />
                <div className="window-area" >

                    {
                        this.props.folders.contents.map(folder=>{
                            return (
                                <div className="folder-wrapper" title={folder.summary}>
                                    <img className="folder-icon" src={word} />
                                    <span className="folder-name">{folder.title}</span>
                                </div>
                            )
                        })


                    }


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
                    <div className="task-bar-section tasks">
                        {
                            this.props.windows.map(win=>{
                                return  <span title={win.name} key={win.uniqueId} className="task-bar-item started" onClick={()=>this.props.onMinimize(win.uniqueId)}>
                                            <span className={win.icon}></span>
                                        </span>
                            })
                        }
                    </div>


                    <div id="tray">
                        <span id="system-time">{this.state.time}<br/>{this.state.date}</span>
                        {/* <span id="language">ENG</span> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        windows:state.desktop.windows,
        folders:state.desktop.desktopFolders
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddWindow:(win)=>dispatch(actions.addWindow(win)),
        onMinimize:(uniqueId)=>dispatch(actions.minimize(uniqueId)),
        onGetRoot:()=>dispatch(actions.getRoot())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Desktop);