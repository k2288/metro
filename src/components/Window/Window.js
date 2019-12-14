import React , {Component} from "react";
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"

class Window extends Component{

    state={
        active : false,
        resizeActive:false,
        currentX:null,
        currentY:null,
        initialX:null,
        initialY:null,
        xOffset : 0,
        yOffset : 0,
        positionStyle:"",
        width:"700px",
        height:"500px"
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
    }

    componentWillUnmount(){
       document.removeEventListener("touchstart", this.dragStart);
       document.removeEventListener("touchend", this.dragEnd);
       document.removeEventListener("touchmove", this.drag);

       document.removeEventListener("mousedown", this.dragStart);
       document.removeEventListener("mouseup", this.dragEnd);
       document.removeEventListener("mousemove", this.drag);
    }

    drag=(e)=>{

        if (this.state.resizeActive) {
            this.setState({
                width:e.pageX-this.window.current.getBoundingClientRect().left +"px",
                height:e.pageY-this.window.current.getBoundingClientRect().top +"px",
            })
        }

       if(this.state.active){
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
       
               
               this.setState({
                   positionStyle:`translate(${this.state.currentX}px, ${this.state.currentY}px)`
               })
               
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


    }

    render(){
        return (
            <div className="window resizable resizeable-element" 
                ref={this.window} 
                style={{position: "absolute", width: this.state.width, height: this.state.height, transform:this.state.positionStyle, zIndex: "2", cursor: "auto"}} data-role-resizeable="true">
                <div className="window-caption">
                    <span className="icon">
                        <span className="mif-anchor"></span>
                    </span>
                    <span className="title" ref={this.windowHeader}>{this.props.win.name}</span>
                    <div className="buttons">
                        <span className="button btn-max sys-button"></span>
                        <span className="button btn-min sys-button"></span>
                        <span className="button btn-close sys-button" onClick={()=>this.props.onCloseWindow(this.props.win.id)} ></span>
                    </div>
                </div>
                <div className="window-content">
                    {
                        this.props.win.component
                    }
                </div>
                <span className="resize-element" ref={this.resizer}></span>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    
}

const mapDispatchToProps=dispatch=>{
    return {
        onCloseWindow:(id)=>dispatch(actions.closeWindow(id))
    }
}

export default connect(null,mapDispatchToProps)( Window);