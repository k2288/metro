import React , { Component} from "react"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"

class EditUser extends Component{


    submitHandler=(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        let data={}
        for (var [key, value] of formData.entries()) { 
            if(["accountNonExpired","accountNonLocked","enabled","credentialsNonExpired"].includes(key)){
                data[key]=value=="on"?true:false;
            }else{
                data[key]=value;
            }
            
        }

        data["authorities"]=[
            {
                "authority": "string",
                "entityName": "string",
                "title": "string",
                "uuid": "string"
              }
        ]
        
        console.log(data);
        if(data){
            this.props.onCreateUser(data,this.props.windowId)
        }
    }

    render(){
        return (
            <div className="bg-white p-4 m-2">
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
                <form onSubmit={this.submitHandler}>

                    <input type="hidden" name="entityName"  value="Users" />
                    <input type="hidden" name="registerDate"  value="2019-12-13T20:26:06.086Z" />
                    <input type="hidden" name="birthDate"  value="2019-12-13T20:26:06.086Z" />
                    <input type="hidden" name="uuid"  value="string" />
                    
                    <div className="form-group">
                        <label>نام : </label>
                        <input type="text" name="firstName"  />
                    </div>
                    <div className="form-group">
                        <label>نام خانوادگی :</label>
                        <input type="text" name="lastName"  />
                    </div>
                    <div className="form-group">
                        <label>کد ملی</label>
                        <input type="text" name="nationalCode"  />
                    </div>
                    <div className="form-group">
                        <label>ایمیل</label>
                        <input type="text" name="email"  />
                    </div>
                    <div className="form-group">
                        <label>پسورد</label>
                        <input type="text" name="password"  />
                    </div>
                    <div className="form-group">
                        <label>نام کاربری</label>
                        <input type="text" name="username"  />
                    </div>
                    <div className="form-group">
                        <label>accountNonExpired</label>
                        <input type="checkbox" name="accountNonExpired"  />
                    </div>
                    <div className="form-group">
                        <label>accountNonLocked</label>
                        <input type="checkbox" name="accountNonLocked"  />
                    </div>
                    <div className="form-group">
                        <label>enabled</label>
                        <input type="checkbox" name="enabled"  />
                    </div>
                    <div className="form-group">
                        <label>credentialsNonExpired</label>
                        <input type="checkbox" name="credentialsNonExpired"  />
                    </div>
                    {/* <div className="form-group">
                        <label>تاریخ تولد</label>
                        <input type="text" name="birthDate"  />
                    </div> */}
                    <div className="form-group">
                        <label>سطح کاربر </label>
                        <input type="radio" name="userLevel" value="LOW" />
                        low
                        <input type="radio" name="userLevel" value="HIGH" />
                        high
                    </div>

                    <button className="button">تایید</button>
                </form>
            </div>

        );
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.user.saveUserLoading,
        error:state.user.saveUserFailed
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onCreateUser:(data,windowId)=>dispatch(actions.createUser(data,windowId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditUser);