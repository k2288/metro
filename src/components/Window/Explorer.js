import React , { Component } from "react"
import Aux from "../../aux/Aux"
import CheckboxTree from "react-checkbox-tree";

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
                        <input  style={{margin:"0" ,minHeight:"32px"}} className="form-control" type="search" placeholder="Search Quick ... &nbsp;"/>
                    </div>
                    <div className="col-md-18 col-xs-18">
                        <ol className="breadcrumb" style={{margin:"0",border:"solid 1px black",padding:"7px"}}>
                            <li><a href="#">لیست کاربران</a></li>
                            <li className="active">کاربران</li>
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
            </Aux>
                
        )
    }
}

export default Explorer;