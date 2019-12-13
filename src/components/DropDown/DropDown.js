import React , {Component} from "react"

class DropDown extends Component{


    state={
        startMenuToggle:false
    }

    constructor(props){
        super(props);
        this.dropdown = React.createRef();
    }

    componentDidMount(){
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.dropdown.current && !this.dropdown.current.contains(event.target)) {
            this.setState({
                startMenuToggle: false,
            });
        }
    };

    toggleHandler=()=>{
        this.setState({
            startMenuToggle:!this.state.startMenuToggle
        })
    }

    state={
        startMenuToggle:false
    }

    render(){

        let tabBarSectionClass="task-bar-section";
        let toggleClass="task-bar-item";
        let startMenuStyle={
            display:"none"
        }
        if(this.state.startMenuToggle){
            tabBarSectionClass="task-bar-section active-container";
            toggleClass="task-bar-item active-toggle active-control";
            startMenuStyle={
                display:"block"
            }
        }
        return (
            <div className={tabBarSectionClass} ref={this.dropdown}>
                <button className={toggleClass} id="start-menu-toggle" onClick={this.toggleHandler}>
                    <span className="mif-windows"></span>
                </button>
                <div className="start-menu" data-role="dropdown" data-toggle-element="#start-menu-toggle" style={startMenuStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default DropDown;