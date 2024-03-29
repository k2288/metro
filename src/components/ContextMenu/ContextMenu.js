import React ,{Component} from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"

class ContextMenu extends Component {
    state = {
        visible: false,
    };
    
    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    _handleContextMenu = (event) => {
        event.preventDefault();
        
        this.setState({ visible: true });
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;
        
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        
        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }
        
        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }
        
        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }
        
        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
        this.props.onCloseContextMenu();
    };

    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) this.setState({ visible: false, });
        this.props.onCloseContextMenu();
    };

    click=(item)=>{
        this.props.onCloseContextMenu();
        item.callback();
    }
    
    render() {
        const { visible } = this.state;
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="contextMenu" style={{zIndex:this.props.zIndex+1}}>
                {
                    this.props.items.map(item=>{
                        return <div onClick={()=>this.click(item)} key={item.label} className="contextMenu--option">{item.label}</div>
                    })
                }
                {/* <div className="contextMenu--option">Share this</div>
                <div className="contextMenu--option">New window</div>
                <div className="contextMenu--option">Visit official site</div>
                <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
                <div className="contextMenu--option">Settings</div>
                <div className="contextMenu--separator" />
                <div className="contextMenu--option">About this app</div> */}
            </div>
    };
}

const mapStateToProps=state=>{
    return {
        zIndex:state.desktop.lastZIndex,
        visible:state.desktop.contextMenuVisible,
        items:state.desktop.contextMenuItems
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onCloseContextMenu:()=>dispatch(actions.closeContextMenu())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContextMenu);