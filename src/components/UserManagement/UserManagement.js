import React , { Component} from "react"
import axios from "../../Axios-Hami"
import RingIndicator from "../RingIndicator/RingIndicator"
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"
import EditUser from "./EditUser";

class UserManagement extends Component {

    state={
        offset:0,
        pageSize:10,
        result:null,

    }

    editUser=(user)=>{
        
        // this.props.onAddWindow(
        //     {
        //         name:'  ویرایش کاربر',
        //         component:<EditUser user={user} windowId={id}  />
        //     }
        // )
    }

    createUser=()=>{
    
        // this.props.onAddWindow(
        //     {
        //         name:'ایجاد کاربر',
        //         component:<EditUser  windowId={id}  />
        //     }
        // )
    }


    componentDidMount=()=>{
        // this.props.onGetUsers(this.state.offset,this.state.pageSize);

        // axios.get(`/api/users/${this.state.offset}/${this.state.pageSize}`)
        //     .then(resp=>{
        //         this.setState({
        //             result:resp.data
        //         })
        //     })
        //     .catch(err=>{
        //         console.log(err.response.data)
        //     })
    }

    render(){

        if(this.props.loading){
            return <RingIndicator />
        }

        return (
            <div>
                <button className="button" onClick={this.createUser} >New User</button>
                <table className="table">
                    <thead>
                    <tr>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>نام کاربری</th>
                        <th>فعال/غیر فعال</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.result.contents.map(user=>{
                                return (
                                    
                                    <tr key={user.uuid}>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            {
                                               user.enable?
                                               <span className="fg-green mif-checkmark"></span>
                                               :
                                               <span className="fg-red mif-minus js-archive-record"></span>
                                            }
                                        </td>
                                        <td>
                                            <button className="button" onClick={()=>this.editUser(user)} >Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        result:state.user.users,
        loading:state.user.getUserLoading,
        error:state.user.getUserFailed
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAddWindow:(win)=>dispatch(actions.addWindow(win)),
        onGetUsers:(offset,pageSize)=>dispatch(actions.getUsers(offset,pageSize))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserManagement);