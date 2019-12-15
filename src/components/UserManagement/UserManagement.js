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

    editUser=(user,action)=>{
        this.props.onAddWindow({
            name:"تنظیمات",
            icon:"glyph glyph-settings",
            type:"USERS_MANAGMENT_PROPERTIES",
            component:<EditUser user={user}   />
        })
        
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
        this.props.onGetUsers(this.state.offset,this.state.pageSize);

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
            <div className="row">
                
                <div className="col-md-24" >
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="text-right">نام</th>
                                <th className="text-right">ایمیل</th>
                                <th className="text-right">نام کاربری</th>
                                <th className="text-right">وضعیت</th>
                            </tr>
                            </thead>
                            <tbody style={{fontSize:"10px"}}>
                            {
                                this.props.result.contents.map(user=>{
                                    return (
                                        <tr key={user.uuid} onContextMenuCapture={()=>this.props.onOpenContextMenu([
                                            {label:"ویرایش",callback:()=>this.editUser(user,"EDIT_USER")},
                                            {label:user.enabled?"غیر فعال کردن":"فعال کردن",callback:()=>this.editUser(user,"CHANGE_STATUS")},
                                            {label:"ویرایش نقش ها",callback:()=>this.editUser(user,"CHANGE_ROLES")},
                                            {label:"تغییر رمز عبور",callback:()=>this.editUser(user,"CHANGE_PASSWORD")}
                                        ])}>
                                            <td className="text-right"> {user.firstName} {user.lastName}</td>
                                            <td className="text-right">{user.email}</td>
                                            <td className="text-right">{user.username}</td>
                                            <td className="text-right">{
                                                user.enabled?<span className="label label-primary">فعال</span>:
                                                <span className="label label-danger">غیرفعال</span>
                                            }</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        </div>
                </div>

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
        onGetUsers:(offset,pageSize)=>dispatch(actions.getUsers(offset,pageSize)),
        onOpenContextMenu:(items)=>dispatch(actions.openContextMenu(items))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserManagement);