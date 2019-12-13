import React, { Component } from "react"
import "./Desktop.css"
import DropDown from "../../components/DropDown/DropDown";

class Desktop extends Component{

    render(){
        return (
            <div className="desktop">
                <div className="window-area">

                <div className="window resizable resizeable-element" id="window-157623205983199" data-role-draggable="true" data-role="resizeable" style={{position: "absolute", width: "393px", height: "212px", top: "265px", left: "144px", zIndex: "2", cursor: "auto"}} data-role-resizeable="true"><div className="window-caption"><span className="icon"><span className="mif-apps"></span></span><span className="title">apps</span><div className="buttons"><span className="button btn-max sys-button"></span><span className="button btn-min sys-button"></span><span className="button btn-close sys-button"></span></div></div><div className="window-content">New window content</div><span className="resize-element"></span></div>

                </div>
                <div className="task-bar">
                        <DropDown >
                            <div className="start-menu-inner h-100">
                                <div className="explorer">
                                    <ul className="v-menu w-100 bg-brandColor2 fg-white">
                                        <li><a >Youtube window</a></li>
                                        <li><a >New window</a></li>
                                        <li><a >Custom buttons</a></li>
                                        <li><a >Modal window</a></li>
                                    </ul>
                                </div>
                            </div>
                        </DropDown>
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

export default Desktop;