import React , {Component} from "react";
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import "./Window.css"

class Window extends Component{

    state={
        active : false,
        resizeActive:false,
        currentX:300,
        currentY:30,
        initialX:null,
        initialY:null,
        xOffset : 300,
        yOffset : 30,
        width:700,
        height:500,
        zIndex:1
    }

    constructor(props){
       super(props);
       this.windowHeader=React.createRef();
       this.resizer=React.createRef();
       this.window=React.createRef();

    }


    
    componentDidMount(){
       document.addEventListener("touchstart", this.dragStart);
       document.addEventListener("touchend", this.dragEnd);
       document.addEventListener("touchmove", this.drag);

       document.addEventListener("mousedown", this.dragStart);
       document.addEventListener("mouseup", this.dragEnd);
       document.addEventListener("mousemove", this.drag);

        

        if(this.props.win){
            if(this.props.win.x && this.props.win.y){
                this.setState({
                    currentX:this.props.win.x,
                    currentY:this.props.win.y,
                    xOffset:this.props.win.x,
                    yOffset:this.props.win.y
                })
            }

            if(this.props.win.height){
                this.setState({
                    height:this.props.win.height
                })
            }
            if(this.props.win.width){
                this.setState({
                    width:this.props.win.width
                })
            }
        }
    }

    componentWillUnmount(){
       document.removeEventListener("touchstart", this.dragStart);
       document.removeEventListener("touchend", this.dragEnd);
       document.removeEventListener("touchmove", this.drag);

       document.removeEventListener("mousedown", this.dragStart);
       document.removeEventListener("mouseup", this.dragEnd);
       document.removeEventListener("mousemove", this.drag);
    }

    windowCLick=()=>{
        this.props.onSetActive(this.props.win.uniqueId)
    }

    drag=(e)=>{

        if (this.state.resizeActive) {
            this.setState({
                width:e.pageX-this.window.current.getBoundingClientRect().left ,
                height:e.pageY-this.window.current.getBoundingClientRect().top 
            })
        }

       if(this.state.active && !this.props.win.maximize){
               e.preventDefault();
         
               if (e.type === "touchmove") {
       
                   this.setState((prevState, props) => ({
                       currentX:e.touches[0].clientX -prevState.initialX,
                       currentY:e.touches[0].clientY -prevState.initialY
                   }))
               } else {
       
                   this.setState((prevState, props) => ({
                       currentX:e.clientX -prevState.initialX,
                       currentY:e.clientY -prevState.initialY
                   }))
                 
               }
               this.setState((prevState, props) => ({
                   xOffset:e.clientX - prevState.currentX,
                   yOffset:e.clientY - prevState.currentY
               }))
               
           }
    }

    dragStart=(e)=>{

        if (e.type === "touchstart") {

            this.setState((prevState, props) => ({
                initialX:e.touches[0].clientX - prevState.xOffset,
                initialY:e.touches[0].clientY - prevState.yOffset
            }))
        } else {

            this.setState((prevState, props) => ({
                initialX:e.clientX - prevState.xOffset,
                initialY:e.clientY - prevState.yOffset
            }))
        }

        if (e.target === this.windowHeader.current) {
            this.setState({
                active:true
            })
        }
        if (e.target === this.resizer.current) {
            this.setState({
                resizeActive:true
            })
        }


    }

    dragEnd=(e)=>{
       
        this.setState({
            xOffset : this.state.currentX,
            yOffset : this.state.currentY
        })
       

       this.setState({
           active:false
       })

        this.setState({
            resizeActive:false
        })
        this.props.onSetPosition(this.props.win.uniqueId,{
            x:this.state.currentX,
            y:this.state.currentY,
            height:this.state.height,
            width:this.state.width
        })


    }

    render(){
        let windowClass="window"
        if(this.props.win.maximize){
            windowClass="window maximized"
        }
        return (
            <div className={windowClass} 
                
                onMouseDown={this.windowCLick}
                ref={this.window} 
                style={{position: "absolute", width: this.state.width+"px", height: this.state.height+"px", transform:`translate(${ this.props.win.maximize?0: this.state.currentX}px, ${this.props.win.maximize?0:this.state.currentY}px)`, zIndex: this.props.win.zIndex, cursor: "auto",display: this.props.win.minimize?"none":"inherit"}} data-role-resizeable="true">
                <div className="window-caption">
                    <span className="icon">
                        <span className="mif-anchor"></span>
                    </span>
                    <span className="title" ref={this.windowHeader}>{this.props.win.name}</span>
                    <div className="buttons">
                        <span className="button btn-max sys-button" onClick={()=>this.props.onMaximize(this.props.win.uniqueId)}></span>
                        <span className="button btn-min sys-button" onClick={()=>this.props.onMinimize(this.props.win.uniqueId)}></span>
                        <span className="button btn-close sys-button" onClick={()=>this.props.onCloseWindow(this.props.win.uniqueId)} ></span>
                    </div>
                </div>
                <div className="window-content">
                    {
                        React.cloneElement(
                            this.props.win.component,
                            {
                                windowId:this.props.win.uniqueId
                            }
                        )
                    }
                </div>
                <span className="resize-element" ref={this.resizer}></span>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        windows:state.desktop.windows,
        lastZIndex:state.desktop.lastZIndex
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onCloseWindow:(uniqueId)=>dispatch(actions.closeWindow(uniqueId)),
        onSetPosition:(uniqueId,data)=>dispatch(actions.setPosition(uniqueId,data)),
        onSetActive:(uniqueId)=>dispatch(actions.setActive(uniqueId)),
        onMinimize:(uniqueId)=>dispatch(actions.minimize(uniqueId)),
        onMaximize:(uniqueId)=>dispatch(actions.maximize(uniqueId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( Window);