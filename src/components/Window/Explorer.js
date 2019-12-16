import React , { Component } from "react"
import Aux from "../../aux/Aux"
import CheckboxTree from "react-checkbox-tree";
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import EditUser from "../UserManagement/EditUser"

class Explorer extends Component{

    state={
        checked: [],
        expanded: [],
    }

    render(){
        return (
            <Aux>
                <div className="row" style={{margin:"0 10px"}}>
                    <div className="col-md-6 col-xs-6">
                        <input  
                        style={{margin:"0" ,minHeight:"27px",height:"27px"}} 
                        className="form-control" type="search" placeholder="جستجو ..."/>
                    </div>
                    <div className="col-md-18 col-xs-18">
                        <ol className="breadcrumb" style={{margin:"0",border:"solid 1px black",padding:"3px 10px",fontSize:"12px"}}>
                            <li>مدیریت کاربران</li>
                            <li>کاربران</li>
                        </ol>
                    </div>
                </div>
                <div className="row" style={{margin:"10px 10px"}}>

                     <div className="col-md-6 col-xs-6" style={{direction:"ltr"}}>
                        <CheckboxTree
                            nodes={this.props.win.nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                     </div>
                     <div className="col-md-18 col-xs-18">
                     {
                        React.cloneElement(
                            this.props.win.component,
                            {
                                windowId:this.props.win.uniqueId
                            }
                        )
                    }
                     </div>
                </div>
                {/* <div className="row" onContextMenuCapture={()=>this.props.onOpenContextMenu([
                        {label:"کاربر جدید",callback:()=>{
                            this.props.onAddWindow({
                                name:"کاربر جدید",
                                icon:"glyph glyph-settings",
                                type:"USERS_MANAGMENT_NEW_USER",
                                component:<EditUser />
                            })
                        }},
                    ])} style={{height:"inherit"}}>
                    
                </div> */}
            </Aux>
                
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddWindow:(win)=>dispatch(actions.addWindow(win)),
        onOpenContextMenu:(items)=>dispatch(actions.openContextMenu(items))
    }
}

export default  connect(null,mapDispatchToProps) (Explorer);