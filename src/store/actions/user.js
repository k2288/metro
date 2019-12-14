import * as actionTypes from "./actionTypes"
import axios from "../../Axios-Hami"
import * as actions from "./index"

const saveUserSuccess=()=>{
    return {
        type:actionTypes.SAVE_USER_SUCCESS
    }
}

const saveUserStart=()=>{
    return {
        type:actionTypes.SAVE_USER_START
    }
}

const saveUserFailed=(err)=>{
    return {
        type:actionTypes.SAVE_USER_FAILED,
        error:err
    }
}

export const createUser=(user,windowId)=>{
    return dispatch=>{
        dispatch(saveUserStart())
        axios.post("api/users/create",user)
            .then(resp=>{
                dispatch(saveUserSuccess());
                dispatch(actions.closeWindow(windowId))
                dispatch(actions.getUsers())
            })
            .catch(err=>{
                // dispatch(actions.handlerError())
                dispatch(saveUserFailed(err.response.data))
            })
    }
}

const getUsersStart=()=>{
    return {
        type:actionTypes.GET_USERS_START
    }
}

const getUsersFailed=(err)=>{
    return {
        type:actionTypes.GET_USERS_FAILED,
        error:err
    }
}

const getUsersSuccess=(users)=>{
    return{
        type:actionTypes.GET_USERS_SUCCESS,
        users:users
    }
}


export const getUsers=(offset,pageSize)=>{
    return dispatch=>{
        dispatch(getUsersStart())
        axios.get(`/api/users/${offset}/${pageSize}`)
        .then(resp=>{
            dispatch(getUsersSuccess(resp.data))
        })
        .catch(err=>{
            dispatch(getUsersFailed(err.response.data))
        })
    }
}