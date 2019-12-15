import React , { Component} from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import InputMask from "react-input-mask"
import Aux from "../../aux/Aux";
import moment from 'jalali-moment';
import Select from 'react-select';


class EditUser extends Component{

    state={
        user:{
            "uuid": "",
            "entityName": "",
            "firstName": "",
            "lastName": "",
            "nationalCode": "",
            "email": "",
            "username": "",
            "userLevel": "LOW",
            "registerDate": "",
            "accountNonExpired": false,
            "accountNonLocked": false,
            "credentialsNonExpired": false,
            "enabled": false,
            "birthDate": "",
            "authorities": [],
            "password":""
        }
    }


    componentDidMount=()=>{
        
        if(this.props.user){
            let user={...this.props.user};
            user.birthDate= user.birthDate? moment(user.birthDate).locale('fa').format('YYYY/MM/DD'):""
            this.setState({
                user:user
            })
        }



        this.props.onSearchRoles("");
    }

    submitHandler=(event)=>{

        if(this.state.user.uuid){
            let user={...this.state.user}
            if(user.birthDate){
                user.birthDate=moment.from(user.birthDate, 'fa', 'YYYY/MM/DD').format()
            }
            delete user.password;
            this.props.onEditUser(user,this.props.windowId);
        }else{
            this.props.onCreateUser(this.state.user,this.props.windowId)
        }
    }

    inputChangeHandler=(event)=>{
        
        let user={...this.state.user};
        let target =event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        user[event.target.name]=value;
        this.setState({
            user:user
        })

    }

    changeRoleHandler=(selectedOption)=>{
        console.log(selectedOption)
        
        let user={...this.state.user};
        user.authorities=selectedOption
        this.setState({
            user:user
        })
    }


    render(){
        return (
            <Aux >
                <form >
                <div className="row" style={{marginTop:"15px"}}>
                    {
                        this.props.error?
                        
                            <div>
                                <h3>
                                    {this.props.error.message}
                                </h3>
                                {
                                    this.props.error.subErrors?
                                    this.props.error.subErrors.map((err,index)=>{
                                        return <li key={index}>
                                            {err.message}
                                        </li>
                                    }):null
                                }
                            </div>
                        :
                        null
                    }
                        <div className="col-md-24 col-xs-24">
                            <ul className="nav nav-tabs" role="tablist" style={{overflowY:"initial"}}>
                                <li role="presentation" className="active"><a href="#general" aria-controls="general" role="tab" data-toggle="tab">عمومی</a></li>
                                <li role="presentation"><a href="#state" aria-controls="state" role="tab" data-toggle="tab">وضعیت</a></li>
                                <li role="presentation"><a href="#role" aria-controls="role" role="tab" data-toggle="tab">نقش</a></li>
                                
                            </ul>
                            
                            
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="general">
                                    <div className="row">

                                        <div className="col-md-12 col-xs-12">
                                            <div className="form-group">
                                                <label htmlFor="lastName">ایمیل</label>
                                                <input type="text" className="form-control" name="email" onChange={this.inputChangeHandler} value={this.state.user.email} id="email" placeholder="ایمیل کاربر را وارد کنید" />
                                            </div>
                                            {   !this.props.user?
                                                <div className="form-group">
                                                    <label htmlFor="username">نام کاربری</label>
                                                    <input type="text" className="form-control" name="username" value={this.state.user.username} onChange={this.inputChangeHandler} id="username" placeholder="نام کاربری را وارد کنید" />
                                                </div>
                                                :null
                                            }

                                            {   !this.props.user?
                                                <div className="form-group">
                                                    <label htmlFor="username">رمز عبور</label>
                                                    <input type="text" className="form-control" name="password" value={this.state.user.password} onChange={this.inputChangeHandler} id="username" placeholder="نام کاربری را وارد کنید" />
                                                </div>
                                                :null
                                            }
                                            
                                        </div>
                                        <div className="col-md-12 col-xs-12">
                                            <input type="hidden" name="entityName"  value="Users" />
                                            <input type="hidden" name="registerDate"  value="2019-12-13T20:26:06.086Z" />
                                            <input type="hidden" name="uuid"  value="string" />

                                            <div className="form-group">
                                                <label htmlFor="firstName">نام</label>
                                                <input type="text" className="form-control" name="firstName" value={this.state.user.firstName} onChange={this.inputChangeHandler} id="firstName"  placeholder="نام کاربر را وارد کنید" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lastName">نام خانوادگی</label>
                                                <input type="text" className="form-control" name="lastName" value={this.state.user.lastName} onChange={this.inputChangeHandler} id="lastName" placeholder="نام خانوادگی کاربر را وارد کنید" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nationalCode">کدملی</label>
                                                <InputMask mask="9999999999" value={this.state.user.nationalCode?this.state.user.nationalCode:""} onChange={this.inputChangeHandler} >
                                                    <input type="text" className="form-control" name="nationalCode"  id="nationalCode" placeholder="کدملی کاربر را وارد کنید" />
                                                </InputMask>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="birthDate">تاریخ تولد</label>
                                                <InputMask mask="9999/99/99" onChange={this.inputChangeHandler} value={this.state.user.birthDate} >
                                                    <input type="text" className="form-control" name="birthDate" id="birthDate" placeholder="تاریخ تولد  را وارد کنید" />
                                                </InputMask>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="state">
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12">
                                            <div className="form-group">
                                                <p className="form-group-label">سطح کاربر </p>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="userLevel"  value="LOW" onChange={this.inputChangeHandler} checked={this.state.user.userLevel==="LOW"}/>
                                                        <span>Low</span>
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="userLevel" value="MEDIUM" onChange={this.inputChangeHandler} checked={this.state.user.userLevel==="MEDIUM"}  />
                                                        <span>MEDIUM</span>
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="userLevel" value="HIGH" onChange={this.inputChangeHandler} checked={this.state.user.userLevel==="HIGH"}  />
                                                        <span>High</span>
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="userLevel" value="VERY_HIGH" onChange={this.inputChangeHandler} checked={this.state.user.userLevel==="VERY_HIGH"}  />
                                                        <span>VERY_HIGH</span>
                                                    </label>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-md-12 col-xs-12">

                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="accountNonExpired" onChange={this.inputChangeHandler} checked={this.state.user.accountNonExpired} />
                                                    <span>accountNonExpired</span>
                                                </label>
                                            </div>


                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="accountNonLocked" onChange={this.inputChangeHandler} checked={this.state.user.accountNonLocked} />
                                                    <span>accountNonLocked</span>
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="enabled" onChange={this.inputChangeHandler} checked={this.state.user.enabled} />
                                                    <span>enabled</span>
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="credentialsNonExpired" onChange={this.inputChangeHandler} checked={this.state.user.credentialsNonExpired} />
                                                    <span>credentialsNonExpired</span>
                                                </label>
                                            </div>


                                           </div>

                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="role">
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12">
                                            <Select
                                                getOptionLabel={option=>option.title}
                                                getOptionValue={option=>option.uuid }
                                                isMulti
                                                value={this.state.user.authorities}
                                                onChange={this.changeRoleHandler}
                                                options={this.props.roles.contents}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
                <div className="row" style={{position: "absolute",bottom: "10px"}}>
                    <div className="col-md-24 col-xs-24">
                        <button type="button" onClick={this.submitHandler} className="btn btn-default no-outline">تایید</button>
                    </div>
                </div>
                </form>
            </Aux>

        );
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.user.saveUserLoading,
        error:state.user.saveUserFailed,
        roles:state.user.searchedRole
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onCreateUser:(data,windowId)=>dispatch(actions.createUser(data,windowId)),
        onSearchRoles:(term)=>dispatch(actions.searchRoles(term)),
        onEditUser:(data,windowId)=>dispatch(actions.editUser(data,windowId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);